import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <a href="tel:+19295285191" className="footer-link phone-link">
          (929) 528-5191
        </a>
        <span className="divider">-</span>
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
