import React, { useEffect, useState } from "react";
import "./nav.css";
import { FaBars } from "react-icons/fa";
import { TbLetterX } from "react-icons/tb";
import { Link } from "react-router-dom";

function Nav() {
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const nav = document.querySelector("header");
    if (window.scrollY > 0) {
      nav.classList.add("window-scroll");
    } else {
      nav.classList.remove("window-scroll");
    }
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1200);

  function handleMenuOpen() {
    setIsMenuOpen(true);
  }

  function handleMenuClose() {
    setIsMenuOpen(false);
  }

  useEffect(() => {
    function handleResize() {
      setIsSmallScreen(window.innerWidth < 1200);
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className="header">
      <Link to="/" className="logo">Meroni</Link>
      <nav
        className={isSmallScreen && !isMenuOpen ? "navbar__hidden" : "navbar"}
      >
        <Link to="/">My Journey</Link>
        <Link to="/finance">Finance</Link>
        <Link to="/philosophy">Philosophy</Link>
        <Link to="/science">Science</Link>
        <Link to="/tech">Tech</Link>
        <Link to="/art">Art</Link>
        <Link to="/politics">Politics</Link>
      </nav>
      <div className="mobile__menu">
        {!isMenuOpen && (
          <button className="open__menu" onClick={handleMenuOpen}>
            <FaBars />
          </button>
        )}
        {isMenuOpen && (
          <button className="close__menu" onClick={handleMenuClose}>
            <TbLetterX />
          </button>
        )}
      </div>
    </header>
  );
}

export default Nav


