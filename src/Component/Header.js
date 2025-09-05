import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import AP from "../Pages/ContactUs/AP.png";

function Header() {
  const navbarRef = useRef(null);
  const menuButtonRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(e.target) &&
        !menuButtonRef.current.contains(e.target) &&
        window.innerWidth < 800
      ) {
        setIsMenuOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth > 800) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleMenu = () => {
    if (window.innerWidth < 800) {
      setIsMenuOpen(!isMenuOpen);
    }
  };

  return (
    <>
      <nav className="navbar" ref={navbarRef} aria-label="Main navigation">
        <Link to="/" className="logo" aria-label="Home">
          <img
            style={{ borderRadius: "100%", width: 100 }}
            src={AP}
            alt="Applying Pressure Logo"
          />
        </Link>
        <div className={`active ${isMenuOpen ? 'menu-open' : ''}`}>
          <ul className="defaultFont">
            <li className="dommanip">
              <Link
                className="header-routing"
                to="/"
                title="Home"
              >
                Home
              </Link>
            </li>
            <li className="dommanip">
              <Link
                className="header-routing"
                to="/Book_Now"
                title="Monthly Services"
              >
                Book
              </Link>
            </li>
            <li className="dommanip">
              <Link
                className="header-routing"
                to="/Ceramic-Coating"
                title="Ceramic Coating"
              >
                Ceramic Coating
              </Link>
            </li>
            <li className="dommanip">
              <Link
                className="header-routing"
                to="/ContactUS"
                title="Contact Us"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <button
        className="menu"
        id="toggleButton"
        ref={menuButtonRef}
        aria-label="Toggle Menu"
        onClick={toggleMenu}
      >
        <div className="menu-line"></div>
        <div className="menu-line"></div>
        <div className="menu-line"></div>
      </button>
    </>
  );
}

export default Header;
