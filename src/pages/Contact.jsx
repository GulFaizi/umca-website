import React from 'react';
import './Contact.scss';
import {
    FaMapMarkerAlt,
    FaEnvelope,
    FaPhone,
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaYoutube
} from 'react-icons/fa';

const Contact = () => {

    return (
        <div className="contact-page">
            <div className="container contact-container">
                <p className="contact-header">
                    We welcome your questions, feedback, and involvement.
                </p>

                <div className="contact-list">
                    {/* Address */}
                    <div className="contact-item">
                        <div className="contact-icon-wrapper">
                            <FaMapMarkerAlt />
                        </div>
                        <div>
                            <h3 className="contact-title">Address</h3>
                            <p className="contact-text">3434 Washington Blvd Arlington VA 22201</p>
                        </div>
                    </div>

                    {/* Email */}
                    <div className="contact-item">
                        <div className="contact-icon-wrapper">
                            <FaEnvelope />
                        </div>
                        <div>
                            <h3 className="contact-title">Email</h3>
                            <a href="mailto:infoumcacentral@gmail.com" className="contact-link">infoumcacentral@gmail.com</a>
                        </div>
                    </div>

                    {/* Phone */}
                    <div className="contact-item">
                        <div className="contact-icon-wrapper">
                            <FaPhone className="icon-flipped" />
                        </div>
                        <div>
                            <h3 className="contact-title">Phone</h3>
                            <a href="tel:+15713378802" className="contact-link">+1 (571) 337-8802</a>
                        </div>
                    </div>

                </div>

                <div>
                    <h3 className="social-header">Follow Us</h3>
                    <div className="social-links">
                        <a href="https://www.facebook.com/UMCAUSA" target="_blank" rel="noopener noreferrer" className="social-btn facebook">
                            <FaFacebookF />
                        </a>
                        <a href="https://x.com/umca_usa" target="_blank" rel="noopener noreferrer" className="social-btn twitter">
                            <FaTwitter />
                        </a>
                        <a href="https://www.instagram.com/umcausa/" target="_blank" rel="noopener noreferrer" className="social-btn instagram">
                            <FaInstagram />
                        </a>
                        <a href="https://www.youtube.com/@UMCAUSA" target="_blank" rel="noopener noreferrer" className="social-btn youtube">
                            <FaYoutube />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
