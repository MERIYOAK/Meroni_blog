import React, { useEffect, useState } from "react";
import "./nav.css";
import { FaBars } from "react-icons/fa";
import { TbLetterX } from "react-icons/tb";
import { Link } from "react-router-dom";
import { useAuth } from '../../../context/AuthContext';
import { BiSolidUserCircle } from "react-icons/bi";
import LoadingSpinner from "../../../utils/loading_spinner/LoadingSpinner";

function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1200);
  const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll2 = () => {
      const currentScrollPos = window.scrollY;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setIsMenuOpen(false);
      setPrevScrollPos(currentScrollPos);
    };

    if (isSmallScreen) {
      window.addEventListener('scroll', handleScroll2);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll2);
    };
  }, [prevScrollPos, isSmallScreen]);

  useEffect(() => {
    const handleScroll = () => {
      const nav = document.querySelector("header");
      if (window.scrollY > 0) {
        nav.classList.add("window-scroll");
      } else {
        nav.classList.remove("window-scroll");
      }
    };

    if (!isSmallScreen) {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isSmallScreen]);



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

  const { state } = useAuth();
  const { isAuthenticated, user } = state;

  return (
    <header className={`header ${visible ? 'visible' : 'hidden'}`}>
      <Link to="/" className="logo">Meroni<span className="logo_span">blog</span></Link>
      <nav
        className={isSmallScreen && !isMenuOpen ? "navbar__hidden" : "navbar"}
      >
        <Link to="/" onClick={handleMenuClose}>My Journey</Link>
        <Link to="/finance" onClick={handleMenuClose}>Finance</Link>
        <Link to="/philosophy" onClick={handleMenuClose}>Philosophy</Link>
        <Link to="/science" onClick={handleMenuClose}>Science</Link>
        <Link to="/tech" onClick={handleMenuClose}>Tech</Link>
        <Link to="/art" onClick={handleMenuClose}>Art</Link>
        <Link to="/politics" onClick={handleMenuClose}>Politics</Link>
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
      <div className="profile">
        {isAuthenticated ? (
          <Link to="/user_profile" onClick={handleMenuClose} >
            {user.imageUrl ? (
              <img src={user.imageUrl} alt="Profile" className="profile_picture" />
            ) : <LoadingSpinner />}
          </Link>
        ) : (
          <Link to="/sign_up" onClick={handleMenuClose}>
            <BiSolidUserCircle className="profile_picture" />
          </Link>
        )}
      </div>
    </header>
  );
}

export default Nav


