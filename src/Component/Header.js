import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

function Header() {
  const navbarRef = useRef(null);
  const menuButtonRef = useRef(null);
  const activeRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    if (typeof window !== 'undefined') {
      const windowWidth = window.innerWidth;
      if (windowWidth < 800) {
        setIsMenuOpen(!isMenuOpen);
        // Toggle the menu-open class on the active element
        if (activeRef.current) {
          activeRef.current.classList.toggle('menu-open');
        }
      }
    }
  };

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    const handleClickOutside = (e) => {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(e.target) &&
        !menuButtonRef.current.contains(e.target) &&
        window.innerWidth < 800 &&
        isMenuOpen
      ) {
        setIsMenuOpen(false);
        if (activeRef.current) {
          activeRef.current.classList.remove('menu-open');
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    const initializeMenu = () => {
      const windowWidth = window.innerWidth;
      setIsMobile(windowWidth < 800);

      if (windowWidth >= 800) {
        // Desktop: ensure menu is closed and remove mobile classes
        setIsMenuOpen(false);
        if (activeRef.current) {
          activeRef.current.classList.remove('menu-open');
        }
      }
    };

    const handleResize = () => {
      const windowWidth = window.innerWidth;
      setIsMobile(windowWidth < 800);

      if (windowWidth >= 800) {
        // Desktop: close mobile menu
        setIsMenuOpen(false);
        if (activeRef.current) {
          activeRef.current.classList.remove('menu-open');
        }
      }
    };

    // Use a small timeout to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      initializeMenu();
    }, 100);

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <nav className="navbar" ref={navbarRef} aria-label="Main navigation">
        <Link href="/" className="logo" aria-label="Home">
          <img
            style={{ borderRadius: "100%", width: 100 }}
            src="/images/AP.png"
            alt="Applying Pressure Logo"
          />
        </Link>
        <div className="active" ref={activeRef}>
          <ul className="defaultFont" role="menu">
            <li className="dommanip" role="none">
              <Link
                className="header-routing"
                href="/"
                title="Home"
                role="menuitem"
              >
                Home
              </Link>
            </li>
            <li className="dommanip" role="none">
              <Link
                className="header-routing"
                href="/Book_Now"
                title="Monthly Services"
                role="menuitem"
              >
                Book
              </Link>
            </li>
            <li className="dommanip" role="none">
              <Link
                className="header-routing"
                href="/ceramic-coating"
                title="Ceramic Coating"
                role="menuitem"
              >
                Ceramic Coating
              </Link>
            </li>
            <li className="dommanip" role="none">
              <Link
                className="header-routing"
                href="/contactus"
                title="Contact Us"
                role="menuitem"
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
        onClick={handleMenuToggle}
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
