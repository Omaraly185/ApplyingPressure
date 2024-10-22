import React from "react";
import "./footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <Link to="/privacy-policy" className="footer-link">
          Privacy Policy
        </Link>
        <span className="divider">-</span>
        <Link to="/terms-conditions" className="footer-link">
          Terms & Conditions
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
