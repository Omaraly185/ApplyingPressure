import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./Header.css";
import $ from "jquery";

function Header() {
  // const [isOpen, setIsOpen] = useState(true);
  // const handleClick = () => setIsOpen(!isOpen);

  $(document).ready(function () {
    $("li").slideDown();
    $(".menu")
      .off("click")
      .on("click", function () {
        if ($(window).width() < 750) {
          $("li").slideToggle("50");
        }
      });
  });

  $(window)
    .off("resize")
    .on("resize", function () {
      if ($(window).width() > 750) {
        $(document).ready(function () {
          $("li").slideDown();
        });
      }
    });
  return (
    <>
      <div className="navbar">
        <Link to="/" className="logo">
          AP
        </Link>
        <div
          className={
            "active"
            // `${isOpen ? 'toggle':'active'}`
          }
        >
          <ul className="defaultFont">
            <li>
              <Link className="header-routing" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="header-routing" to="/Book_Now">
                Book
              </Link>
            </li>
            <li>
              <a className="header-routing" href="/Monthly">
                Monthly
              </a>
            </li>
            <li>
              <a className="header-routing" href="/ContactUS">
                Contact Us
              </a>
            </li>
          </ul>
        </div>
      </div>
      <button
        className="menu"
        id="toggleButton"
        // onClick={() => {
        //       setIsOpen(!isOpen);
        //     }}
      >
        <div className="menu-line"></div>
        <div className="menu-line"></div>
        <div className="menu-line"></div>
      </button>
    </>
  );
}

export default Header;
