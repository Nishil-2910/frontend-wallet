import { useEffect } from "react";
import { BsFileEarmarkBinary } from "react-icons/bs";
import { CiServer } from "react-icons/ci";
import { FaMapSigns } from "react-icons/fa";
import { FaMagnifyingGlassChart, FaSignature } from "react-icons/fa6";
import { GoDownload, GoShieldLock, GoSync } from "react-icons/go";
import { LuSquareArrowOutUpRight } from "react-icons/lu";
import { MdOutlineLocalGasStation } from "react-icons/md";
import { TbFileInvoice, TbFilterSearch } from "react-icons/tb";
import '../assets/css/NavBar.css';

function NavBar() {
  useEffect(() => {
    const setupHoverDropdowns = () => {
      const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
      
      dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
          e.preventDefault();
        });
        
        const parent = toggle.closest('.dropdown');
        parent.addEventListener('mouseenter', () => {
          parent.classList.add('show');
          parent.querySelector('.dropdown-menu').classList.add('show');
        });
        
        parent.addEventListener('mouseleave', () => {
          parent.classList.remove('show');
          parent.querySelector('.dropdown-menu').classList.remove('show');
        });
      });
    };

    setupHoverDropdowns();
  }, []);

  return (
    <>
      <header className="header border-bottom d-print-none">
        <nav className="navbar navbar-expand-lg navbar-light py-3 py-lg-0">
          <div className="container-fluid px-lg-5 position-relative">
            <a
              className="navbar-brand"
              href="/"
              target="_parent"
              aria-label="BscScan"
            >
              <img
                width="135"
                data-img-theme="light"
                src="https://bscscan.com/assets/bsc/images/svg/logos/logo-light.svg?v=25.3.3.0"
                alt="BscScan Logo"
              />
            </a>

            <div className="d-flex align-items-center gap-4">
              <a className="link-dark d-block d-lg-none text-decoration-none" href="#">
                <i className="far fa-user-circle me-1"></i> Sign In
              </a>

              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
            </div>

            <div
              className="collapse navbar-collapse justify-content-end"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav gap-1 gap-lg-0 pt-4 pt-lg-0">
                <li className="nav-item">
                  <a
                    href="/"
                    className="nav-link active"
                    aria-current="page"
                  >
                    Home
                  </a>
                </li>

                {/* Blockchain */}
                <li className="nav-item dropdown">
                  <a
                    href="#"
                    className="nav-link dropdown-toggle"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Blockchain
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-border"
                    style={{ minWidth: "14rem" }}
                  >
                    <li>
                      <a href="#" className="dropdown-item">
                        Transactions
                      </a>
                    </li>
                    <li>
                      <a href="#" className="dropdown-item">
                        Pending Transactions
                      </a>
                    </li>
                    <li>
                      <a href="#" className="dropdown-item">
                        Contract Internal Transactions
                      </a>
                    </li>
                    <li>
                      <a href="#" className="dropdown-item">
                        View Blobs
                      </a>
                    </li>
                    <li>
                      <a href="#" className="dropdown-item">
                        AA Transactions <span className="badge border bg-light text-muted">Beta</span>
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <a href="#" className="dropdown-item">
                        View Blocks
                      </a>
                    </li>
                    <li>
                      <a href="#" className="dropdown-item">
                        Forked Blocks (Reorgs)
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <a href="#" className="dropdown-item">
                        Top Accounts
                      </a>
                    </li>
                    <li>
                      <a href="#" className="dropdown-item">
                        Verified Contracts
                      </a>
                    </li>
                  </ul>
                </li>
                {/* End Blockchain */}

                {/* Validators */}
                <li className="nav-item dropdown">
                  <a
                    href="#"
                    className="nav-link dropdown-toggle"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Validators
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-border"
                    style={{ minWidth: "14rem" }}
                  >
                    <li>
                      <a href="#" className="dropdown-item">
                        Validators Leaderboard
                      </a>
                    </li>
                    <li>
                      <a href="#" className="dropdown-item">
                        View Validators Set Info
                      </a>
                    </li>
                  </ul>
                </li>
                {/* End Validators */}

                {/* Tokens */}
                <li className="nav-item dropdown">
                  <a
                    href="#"
                    className="nav-link dropdown-toggle"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Tokens
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-border"
                    style={{ minWidth: "14rem" }}
                  >
                    <li>
                      <a href="#" className="dropdown-item">
                        Top Tokens <span className="small text-muted">(BEP-20)</span>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="dropdown-item">
                        Token Transfers <span className="small text-muted">(BEP-20)</span>
                      </a>
                    </li>
                  </ul>
                </li>
                {/* End Tokens */}

                {/* NFTs */}
                <li className="nav-item dropdown">
                  <a
                    href="#"
                    className="nav-link dropdown-toggle"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    NFTs
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-border"
                    style={{ minWidth: "14rem" }}
                  >
                    <li>
                      <a href="#" className="dropdown-item">
                        Top NFTs
                      </a>
                    </li>
                    <li>
                      <a href="#" className="dropdown-item">
                        Top Mints
                      </a>
                    </li>
                    <li>
                      <a href="#" className="dropdown-item">
                        Latest Trades
                      </a>
                    </li>
                    <li>
                      <a href="#" className="dropdown-item">
                        Latest Transfers
                      </a>
                    </li>
                    <li>
                      <a href="#" className="dropdown-item">
                        Latest Mints
                      </a>
                    </li>
                  </ul>
                </li>
                {/* End NFTs */}

                {/* Resources */}
                <li className="nav-item dropdown">
                  <a
                    href="#"
                    className="nav-link dropdown-toggle"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Resources
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-border"
                    style={{ minWidth: "14rem" }}
                  >
                    <li>
                      <a href="#" className="dropdown-item">
                        Charts &amp; Stats
                      </a>
                    </li>
                    <li>
                      <a href="#" className="dropdown-item">
                        Top Statistics
                      </a>
                    </li>
                  </ul>
                </li>
                {/* End Resources */}

                {/* Developers */}
                <li className="nav-item dropdown">
                  <a
                    href="#"
                    className="nav-link dropdown-toggle"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Developers
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-border"
                    style={{ minWidth: "14rem" }}
                  >
                    <li>
                      <a href="#" className="dropdown-item" target="_blank" rel="noreferrer">
                        API Plans
                        <LuSquareArrowOutUpRight/>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="dropdown-item" target="_blank" rel="noreferrer">
                        API Documentation
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <a href="#" className="dropdown-item">
                        Code Reader <span className="badge border bg-light text-muted">Beta</span>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="dropdown-item">
                        Verify Contract
                      </a>
                    </li>
                    <li>
                      <a href="#" className="dropdown-item">
                        Similar Contract Search
                      </a>
                    </li>
                    <li>
                      <a href="#" className="dropdown-item">
                        Contract Diff Checker
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <a href="#" className="dropdown-item">
                        Vyper Online Compiler
                      </a>
                    </li>
                    <li>
                      <a href="#" className="dropdown-item">
                        Bytecode to Opcode
                      </a>
                    </li>
                    <li>
                      <a href="#" className="dropdown-item">
                        Broadcast Transaction
                      </a>
                    </li>
                  </ul>
                </li>
                {/* End Developers */}

                {/* More */}
                <li className="nav-item dropdown position-initial">
                  <a
                    href="#"
                    className="nav-link dropdown-toggle"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    More
                  </a>
                  <div className="dropdown-menu dropdown-menu-border dropdown-menu-mega" style={{ left: "-1270px" }}>
                    <div>
                      <div className="row custom-lg-nowrap">
                        <div className="col-lg order-last order-lg-first">
                          <div className="d-flex flex-column bg-light h-100 rounded-3 p-lg-5 p-md-4 p-sm-4 custom-p-xs">
                            <div>
                              <h6>Tools &amp; Services</h6>
                              <p>
                                Discover more of BscScan's tools and services in
                                one place.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="col-sm py-lg-5 p-md-3 p-sm-3 p-xs-3">
                          <h6 className="px-3 mb-3 custom-mt-xs">Tools</h6>
                          <ul className="list-unstyled">
                            <li>
                              <a href="#" className="dropdown-item d-flex align-items-center">
                                <BsFileEarmarkBinary className="dropdown-item-icon me-1"/>
                                Input Data Decoder <span className="badge border bg-light text-muted ms-1">Beta</span>
                              </a>
                            </li>
                            <li>
                              <a href="#" className="dropdown-item d-flex align-items-center">
                                <GoSync className="dropdown-item-icon me-1"/>
                                Unit Converter
                              </a>
                            </li>
                            <li>
                              <a href="#" className="dropdown-item d-flex align-items-center">
                                <GoDownload className=" dropdown-item-icon me-1"/>
                                CSV Export
                              </a>
                            </li>
                            <li>
                              <a href="#" className="dropdown-item d-flex align-items-center">
                                <TbFileInvoice className="dropdown-item-icon me-1"/> 
                                Account Balance Checker
                              </a>
                            </li>
                          </ul>
                        </div>

                        <div className="col-sm py-lg-5 p-md-3 p-sm-3 p-xs-3">
                          <h6 className="px-3 mb-3 custom-mt-xs">Explore</h6>
                          <ul className="list-unstyled">
                            <li>
                              <a href="#" className="dropdown-item d-flex align-items-center">
                                <MdOutlineLocalGasStation className="dropdown-item-icon me-1"/> 
                                Gas Tracker
                              </a>
                            </li>
                            <li>
                              <a href="#" className="dropdown-item d-flex align-items-center">
                                <CiServer className="dropdown-item-icon me-1"/> 
                                Node Tracker
                              </a>
                            </li>
                            <li>
                              <a href="#" className="dropdown-item d-flex align-items-center">
                                <FaMapSigns className="dropdown-item-icon me-1"/> 
                                Label Cloud
                              </a>
                            </li>
                            <li>
                              <a href="#" className="dropdown-item d-flex align-items-center">
                                <FaMagnifyingGlassChart className="dropdown-item-icon me-1"/> 
                                Domain Name Lookup
                              </a>
                            </li>
                          </ul>
                        </div>

                        <div className="col-sm py-lg-5 p-md-3 p-sm-3 p-xs-3">
                          <h6 className="px-3 mb-3 custom-mt-xs">Services</h6>
                          <ul className="list-unstyled">
                            <li>
                              <a href="#" className="dropdown-item d-flex align-items-center">
                                <GoShieldLock className="dropdown-item-icon me-1"/>
                                Token Approvals <span className="badge border bg-light text-muted ms-1">Beta</span>
                              </a>
                            </li>
                            <li>
                              <a href="#" className="dropdown-item">
                                <FaSignature className="dropdown-item-icon me-1"/>
                                Verified Signature
                              </a>
                            </li>
                            <li>
                              <a href="#" className="dropdown-item d-flex align-items-center">
                                <TbFilterSearch className="dropdown-item-icon me-1"/>
                                Advanced Filter <span className="badge border bg-light text-muted ms-1">Beta</span>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                {/* End More */}

                <li className="nav-item dropdown d-block d-lg-none">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Explorers
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-border"
                    style={{ minWidth: "100rem" }}
                  >
                    <li>
                      <a className="dropdown-item active" href="#">
                        Bsc Mainnet
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        opBNB Mainnet
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Bsc Testnet
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        opBNB Testnet
                      </a>
                    </li>
                  </ul>
                </li>

                <li className="nav-item align-self-center d-none d-lg-block">
                  <span className="text-secondary">|</span>
                </li>

                <li className="nav-item d-none d-lg-block">
                  <a className="nav-link" href="#">
                    <i className="far fa-user-circle me-1"></i> Sign In
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}

export default NavBar;