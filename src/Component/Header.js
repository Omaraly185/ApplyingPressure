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
      <div className="navbar" ref={navbarRef}>
        <Link to="/" className="logo">
          <img
            style={{ borderRadius: "100%", width: 65 }}
            src={AP}
            alt="Logo"
          />
        </Link>
        <div className="active">
          <ul className="defaultFont">
            <li className="dommanip">
              <Link className="header-routing" to="/">
                Home
              </Link>
            </li>
            <li className="dommanip">
              <Link className="header-routing" to="/Book_Now">
                Book
              </Link>
            </li>
            <li className="dommanip">
              <Link className="header-routing" to="/Ceramic-Coating">
                Ceramic Coating
              </Link>
            </li>
            <li className="dommanip">
              <a className="header-routing" href="/Monthly">
                Monthly
              </a>
            </li>
            <li className="dommanip">
              <a className="header-routing" href="/ContactUS">
                Contact Us
              </a>
            </li>
          </ul>
        </div>
      </div>
      <button className="menu" id="toggleButton" ref={menuButtonRef}>
        <div className="menu-line"></div>
        <div className="menu-line"></div>
        <div className="menu-line"></div>
      </button>
    </>
  );
}

export default Header;
