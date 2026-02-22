import React from 'react';
import { Link } from 'react-router-dom';
import {
    FaFacebookF, FaTwitter, FaInstagram, FaYoutube,
    FaMapMarkerAlt, FaEnvelope, FaPhone, FaRegClock,
    FaAngleRight
} from 'react-icons/fa';
import './Footer.scss';
import logo from '../assets/logo.png';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-container">


                {/* Column 2: Quick Links */}
                <div className="footer-column">
                    <h2>Quick Links</h2>
                    <ul className="quick-links">
                        <li><Link to="/programs"><FaAngleRight className="link-icon" /> Programs</Link></li>
                        <li><Link to="/about"><FaAngleRight className="link-icon" /> About Us</Link></li>
                        <li><Link to="/news"><FaAngleRight className="link-icon" /> News</Link></li>
                        <li><Link to="/get-involved"><FaAngleRight className="link-icon" /> Get Involved</Link></li>
                    </ul>
                </div>

                {/* Column 3: Contact Us */}
                <div className="footer-column">
                    <h2>Contact Us</h2>
                    <ul className="contact-list">
                        <li>
                            <FaMapMarkerAlt className="contact-icon" />
                            <span>Maryland, United States</span>
                        </li>
                        <li>
                            <FaEnvelope className="contact-icon" />
                            <a href="mailto:infoumcacentral@gmail.com">infoumcacentral@gmail.com</a>
                        </li>
                        <li>
                            <FaPhone className="contact-icon contact-icon-flipped" />
                            <a href="tel:+12407030117">+1(240) 7030117</a>
                        </li>
                        <li>
                            <FaRegClock className="contact-icon" />
                            <span>Mon - Fri: 9:00 AM - 5:00 PM</span>
                        </li>
                    </ul>
                </div>

                {/* Column 4: Follow Us */}
                <div className="footer-column">
                    <h2>Follow Us</h2>
                    <div className="social-icons-row">
                        <a href="https://www.facebook.com/UMCAUSA" target="_blank" rel="noopener noreferrer" className="social-circle" aria-label="Facebook">
                            <FaFacebookF />
                        </a>
                        <a href="https://x.com/umca_usa" target="_blank" rel="noopener noreferrer" className="social-circle" aria-label="Twitter">
                            <FaTwitter />
                        </a>
                        <a href="https://www.instagram.com/umcausa/" target="_blank" rel="noopener noreferrer" className="social-circle" aria-label="Instagram">
                            <FaInstagram />
                        </a>
                        <a href="https://www.youtube.com/@UMCAUSA" target="_blank" rel="noopener noreferrer" className="social-circle" aria-label="YouTube">
                            <FaYoutube />
                        </a>
                    </div>
                </div>
            </div>

            <div className="copyright-row">
                <small>UMCA © {new Date().getFullYear()} All rights reserved. Serving humanity with compassion.</small>
            </div>
        </footer>
    );
};

export default Footer;
