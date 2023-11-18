import React, { useRef, useEffect } from 'react'
import './footer.css'
import { Link } from 'react-router-dom';
import { FaFacebookF } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { IoLogoTwitter } from "react-icons/io";
import { BsWhatsapp } from "react-icons/bs";

function Footer() {
    const footerRef = useRef(null);

    useEffect(() => {
        // Scroll to the top of the page when the component mounts
        window.scrollTo(0, 0);
    }, []);

    return (
        <footer className="footer">
            <div className="waves">
                <div className="wave" id="wave1"></div>
                <div className="wave" id="wave2"></div>
                <div className="wave" id="wave3"></div>
                <div className="wave" id="wave4"></div>
            </div>
            <ul className="social-icon">
                <li className="social-icon__item">
                    <a className="social-icon__link" href="https://www.facebook.com/meron.michael.79" target="_blank" rel="noopener noreferrer">
                        <FaFacebookF />
                    </a>
                </li>
                <li className="social-icon__item">
                    <a className="social-icon__link" href="https://wa.me/244922706107" target="_blank" rel="noopener noreferrer">
                        <BsWhatsapp />
                    </a>
                </li>
                <li className="social-icon__item">
                    <a className="social-icon__link" href="https://www.linkedin.com/in/meron-michael-4b94a7221" target="_blank" rel="noopener noreferrer">
                        <FaLinkedin />
                    </a>
                </li>
                <li className="social-icon__item">
                    <a className="social-icon__link" href="https://www.twitter.com/MeronMichael15" target="_blank" rel="noopener noreferrer">
                        <IoLogoTwitter />
                    </a>
                </li>
            </ul>
            <ul className="menu" ref={footerRef}>
                <li className="menu__item"><Link className="menu__link" to='/'>Home</Link></li>
                <li className="menu__item"><Link className="menu__link" to='/finance'>Finance</Link></li>
                <li className="menu__item"><Link className="menu__link" to='/philosophy'>Philosophy</Link></li>
                <li className="menu__item"><Link className="menu__link" to='/science'>Science</Link></li>
                <li className="menu__item"><Link className="menu__link" to='/tech'>Tech</Link></li>
                <li className="menu__item"><Link className="menu__link" to='/art'>Art</Link></li>
                <li className="menu__item"><Link className="menu__link" to='/politics'>Politics</Link></li>
            </ul>
            <div className='editorial'>
                <a href='http://localhost:3000/editorial_privileges' className="menu__link">Editorial privileges</a>
            </div>
            <p>&copy;2023 Meroni | All Rights Reserved</p>
            <div className='go_to_top_container'>
                <a onClick={() => window.scrollTo(0, 0)} className='go_to_top'><span className='up'>&uarr;</span></a>
            </div>
        </footer>
    )
}

export default Footer