import React, { useEffect, useState } from "react";
import "./nav.css";
import { FaBars } from "react-icons/fa";
import { TbLetterX } from "react-icons/tb";
import { Link } from "react-router-dom";
import { useAuth } from '../../../context/AuthContext';
import { BiSolidUserCircle } from "react-icons/bi";
import axios from 'axios';
import BASE_URL from '../../../../config';

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
  const [imageUrl, setImageUrl] = useState('');

  let isRegeneratingUrl = false;

  useEffect(() => {
    setImageUrl(localStorage.getItem('imageUrl'));
    const fetchImageUrl = async () => {
      if (isAuthenticated) {
        const user_id = user.id;
        try {
          const response = await axios.get(`${BASE_URL}/userImageUrl/${user_id}`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
              'sessionId': localStorage.getItem('sessionId'),
              'userRole': localStorage.getItem('userRole')
            }
          });
          if (response.status === 200 && response.data.preSignedUrl.user_id === user_id) {
            const imageUrl = response.data.preSignedUrl.imageUrl;
            console.log('Fetched image URL:', imageUrl);
            setImageUrl(imageUrl);
            localStorage.setItem('imageUrl', imageUrl);
          } else {
            console.error('Failed to fetch image URL');
          }
        } catch (error) {
          console.error('Error fetching image URL:', error);
        }
      }
    };

    // Check if the stored URL is expired and regenerate if needed
    const storedImageUrl = localStorage.getItem('imageUrl');
    if (storedImageUrl && !isRegeneratingUrl) {
      const img = new Image();
      img.src = storedImageUrl;

      img.onload = () => {
        console.log('Image loaded successfully');
      };

      img.onerror = async () => {
        isRegeneratingUrl = true;
        console.log('Regenerating image URL...');
        await fetchImageUrl();
        isRegeneratingUrl = false;
        console.log('Image URL regenerated successfully');
      };
    }

  }, [isAuthenticated, user]);


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
            <img src={imageUrl} alt="Profile" className="profile_picture" />
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


