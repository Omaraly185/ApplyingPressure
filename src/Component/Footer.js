import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <Link href="/privacy-policy" className="footer-link">
          Privacy Policy
        </Link>
        <span className="divider">-</span>
        <Link href="/terms-conditions" className="footer-link">
          Terms & Conditions
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
