import React from 'react';
import './Contact.scss';
import {
    FaMapMarkerAlt,
    FaEnvelope,
    FaPhone,
    FaRegClock,
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
                            <p className="contact-text">Maryland, United States</p>
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
                            <a href="tel:+12407030117" className="contact-link">+1(240) 7030117</a>
                        </div>
                    </div>

                    {/* Office Hours */}
                    <div className="contact-item">
                        <div className="contact-icon-wrapper">
                            <FaRegClock />
                        </div>
                        <div>
                            <h3 className="contact-title">Office Hours</h3>
                            <p className="contact-text">Monday – Friday: 9:00 AM – 5:00 PM</p>
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
