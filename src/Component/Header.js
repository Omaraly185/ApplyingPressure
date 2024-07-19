import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import AP from "../Pages/ContactUs/AP.png";
import $ from "jquery";

function Header() {
  const navbarRef = useRef(null);
  const menuButtonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(e.target) &&
        !menuButtonRef.current.contains(e.target) &&
        $(window).width() < 750
      ) {
        $(".domanip").slideUp();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside); // Cleanup listener on unmount
  }, []);

  $(document).ready(function () {
    $(".dommanip").slideDown();
    $(".menu")
      .off("click")
      .on("click", function () {
        if ($(window).width() < 750) {
          $(".dommanip").slideToggle("50");
        }
      });
  });

  $(window)
    .off("resize")
    .on("resize", function () {
      if ($(window).width() > 750) {
        $(document).ready(function () {
          $(".dommanip").slideDown();
        });
      }
    });

  return (
    <>
      <nav className="navbar" ref={navbarRef} aria-label="Main navigation">
        <Link to="/" className="logo" aria-label="Home">
          <img
            style={{ borderRadius: "100%", width: 65 }}
            src={AP}
            alt="Applying Pressure Logo"
          />
        </Link>
        <div className="active">
          <ul className="defaultFont" role="menu">
            <li className="dommanip" role="none">
              <Link
                className="header-routing"
                to="/"
                title="Home"
                role="menuitem"
              >
                Home
              </Link>
            </li>
            <li className="dommanip" role="none">
              <Link
                className="header-routing"
                to="/Book_Now"
                title="Book Now"
                role="menuitem"
              >
                Book
              </Link>
            </li>
            <li className="dommanip" role="none">
              <Link
                className="header-routing"
                to="/Ceramic-Coating"
                title="Ceramic Coating"
                role="menuitem"
              >
                Ceramic Coating
              </Link>
            </li>
            <li className="dommanip" role="none">
              <a
                className="header-routing"
                href="/Monthly"
                title="Monthly Services"
                role="menuitem"
              >
                Monthly
              </a>
            </li>
            <li className="dommanip" role="none">
              <a
                className="header-routing"
                href="/ContactUS"
                title="Contact Us"
                role="menuitem"
              >
                Contact Us
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <button
        className="menu"
        id="toggleButton"
        ref={menuButtonRef}
        aria-label="Toggle Menu"
      >
        <div className="menu-line"></div>
        <div className="menu-line"></div>
        <div className="menu-line"></div>
      </button>
    </>
  );
}

export default Header;
