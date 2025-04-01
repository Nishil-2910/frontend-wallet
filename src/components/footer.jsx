import React from "react";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-light text-dark pt-4 pb-4">
      <div className="px-lg-5 container-fluid">
        <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-4">
          <a
            href="#"
            className="text-decoration-none text-muted d-flex align-items-center"
          >
            <FaXTwitter className="me-2" />
            (Twitter)
          </a>
          <a
            href="#"
            className="text-decoration-none text-muted"
            style={{ cursor: "pointer" }}
          >
            ↑ Back to Top
          </a>
        </div>
        <div className="g-4 row mt-1">
          <div className="col-md-4 col-12">
            <h5 className="fw-bold d-flex align-items-center">
              <img
                alt="BNB Chain"
                src="https://bscscan.com/assets/bsc/images/svg/logos/chain-light.svg?v=25.3.3.0"
                style={{ width: "30px", height: "30px", marginRight: "10px" }}
              />
              Powered by BNB Beacon Chain
            </h5>
            <p className="text-muted">
              BscScan is a Block Explorer and Analytics Platform for BNB Smart
              Chain.
            </p>
            <button
              type="button"
              className="d-flex align-items-center btn"
              style={{ backgroundColor: "#e9ecef", borderRadius: "10px" }}
            >
              <img
                alt="MetaMask"
                src="https://bscscan.com/images/svg/brands/metamask.svg"
                style={{ width: "20px", height: "20px", marginRight: "8px" }}
              />
              Add BSC Network
            </button>
          </div>
          <div className="col-md-2 col-6">
            <h6 className="fw-bold">Company</h6>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="text-decoration-none text-muted">
                  Delegate to BscScan
                  <span
                    className="badge ms-2 rounded-pill"
                    style={{ background: "#0784c3" }}
                  >
                    Staking
                  </span>
                </a>
              </li>
              <li>
                <a href="#" className="text-decoration-none text-muted">
                  Brand Assets
                </a>
              </li>
              <li>
                <a href="#" className="text-decoration-none text-muted">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-decoration-none text-muted">
                  Terms &amp; Privacy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-decoration-none text-muted d-flex align-items-center"
                >
                  Bug Bounty
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 512 512"
                    className="ms-1"
                    height="12"
                    width="12"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M432,320H400a16,16,0,0,0-16,16V448H64V128H208a16,16,0,0,0,16-16V80a16,16,0,0,0-16-16H48A48,48,0,0,0,0,112V464a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V336A16,16,0,0,0,432,320ZM488,0h-128c-21.37,0-32.05,25.91-17,41l35.73,35.73L135,320.37a24,24,0,0,0,0,34L157.67,377a24,24,0,0,0,34,0L435.28,133.32,471,169c15,15,41,4.5,41-17V24A24,24,0,0,0,488,0Z"></path>
                  </svg>
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-2 col-6">
            <h6 className="fw-bold">Community</h6>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="text-decoration-none text-muted">
                  API Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-decoration-none text-muted">
                  Knowledge Base
                </a>
              </li>
              <li>
                <a href="#" className="text-decoration-none text-muted">
                  Network Status
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-decoration-none text-muted d-flex align-items-center"
                >
                  Learn BSC
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 512 512"
                    className="ms-1"
                    height="12"
                    width="12"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M432,320H400a16,16,0,0,0-16,16V448H64V128H208a16,16,0,0,0,16-16V80a16,16,0,0,0-16-16H48A48,48,0,0,0,0,112V464a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V336A16,16,0,0,0,432,320ZM488,0h-128c-21.37,0-32.05,25.91-17,41l35.73,35.73L135,320.37a24,24,0,0,0,0,34L157.67,377a24,24,0,0,0,34,0L435.28,133.32,471,169c15,15,41,4.5,41-17V24A24,24,0,0,0,488,0Z"></path>
                  </svg>
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-4 col-12">
            <h6 className="fw-bold">Products &amp; Services</h6>
            <ul className="list-unstyled">
              <li>
                <a
                  href="#"
                  className="text-decoration-none text-muted d-flex align-items-center"
                >
                  Advertise
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 512 512"
                    className="ms-1"
                    height="12"
                    width="12"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M432,320H400a16,16,0,0,0-16,16V448H64V128H208a16,16,0,0,0,16-16V80a16,16,0,0,0-16-16H48A48,48,0,0,0,0,112V464a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V336A16,16,0,0,0,432,320ZM488,0h-128c-21.37,0-32.05,25.91-17,41l35.73,35.73L135,320.37a24,24,0,0,0,0,34L157.67,377a24,24,0,0,0,34,0L435.28,133.32,471,169c15,15,41,4.5,41-17V24A24,24,0,0,0,488,0Z"></path>
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-decoration-none text-muted d-flex align-items-center"
                >
                  Explorer as a Service (EaaS)
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 512 512"
                    className="ms-1"
                    height="12"
                    width="12"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M432,320H400a16,16,0,0,0-16,16V448H64V128H208a16,16,0,0,0,16-16V80a16,16,0,0,0-16-16H48A48,48,0,0,0,0,112V464a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V336A16,16,0,0,0,432,320ZM488,0h-128c-21.37,0-32.05,25.91-17,41l35.73,35.73L135,320.37a24,24,0,0,0,0,34L157.67,377a24,24,0,0,0,34,0L435.28,133.32,471,169c15,15,41,4.5,41-17V24A24,24,0,0,0,488,0Z"></path>
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-decoration-none text-muted d-flex align-items-center"
                >
                  API Plans
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 512 512"
                    className="ms-1"
                    height="12"
                    width="12"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M432,320H400a16,16,0,0,0-16,16V448H64V128H208a16,16,0,0,0,16-16V80a16,16,0,0,0-16-16H48A48,48,0,0,0,0,112V464a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V336A16,16,0,0,0,432,320ZM488,0h-128c-21.37,0-32.05,25.91-17,41l35.73,35.73L135,320.37a24,24,0,0,0,0,34L157.67,377a24,24,0,0,0,34,0L435.28,133.32,471,169c15,15,41,4.5,41-17V24A24,24,0,0,0,488,0Z"></path>
                  </svg>
                </a>
              </li>
              <li>
                <a href="#" className="text-decoration-none text-muted">
                  Priority Support
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-decoration-none text-muted d-flex align-items-center"
                >
                  Blockscan
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 512 512"
                    className="ms-1"
                    height="12"
                    width="12"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M432,320H400a16,16,0,0,0-16,16V448H64V128H208a16,16,0,0,0,16-16V80a16,16,0,0,0-16-16H48A48,48,0,0,0,0,112V464a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V336A16,16,0,0,0,432,320ZM488,0h-128c-21.37,0-32.05,25.91-17,41l35.73,35.73L135,320.37a24,24,0,0,0,0,34L157.67,377a24,24,0,0,0,34,0L435.28,133.32,471,169c15,15,41,4.5,41-17V24A24,24,0,0,0,488,0Z"></path>
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-4 border-top pt-1">
          <div className="row align-items-center">
            <div className="col-12 col-md-6 d-flex justify-content-between align-items-center mb-3 mb-md-0">
              <p className="text-muted m-0">
                BscScan © 2025 (BSC-C) | ⛏ Built by Team
                <a
                  href="#"
                  className="text-decoration-none ms-1"
                  style={{ color: "#0784c3e6" }}
                >
                  Etherscan
                </a>
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 512 512"
                  className="ms-1"
                  height="12"
                  width="12"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M432,320H400a16,16,0,0,0-16,16V448H64V128H208a16,16,0,0,0,16-16V80a16,16,0,0,0-16-16H48A48,48,0,0,0,0,112V464a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V336A16,16,0,0,0,432,320ZM488,0h-128c-21.37,0-32.05,25.91-17,41l35.73,35.73L135,320.37a24,24,0,0,0,0,34L157.67,377a24,24,0,0,0,34,0L435.28,133.32,471,169c15,15,41,4.5,41-17V24A24,24,0,0,0,488,0Z"></path>
                </svg>
              </p>
            </div>
            <div className="col-12 col-md-6 d-flex justify-content-start justify-content-md-end">
              <p className="me-1">Donations:</p>
              <a href="#" className="text-decoration-none">
                <span style={{ color: "#0784c3e6" }}> 0x71c765...d8976f </span>
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 512 512"
                  height="1em"
                  width="1em"
                  className="text-danger"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
