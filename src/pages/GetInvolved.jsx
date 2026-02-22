import React from 'react';
import { FaHandshake, FaUserPlus, FaHandsHelping, FaDonate, FaHandHoldingHeart } from 'react-icons/fa';
import Button from '../components/Button';
import './GetInvolved.scss';

const ActionCard = ({ title, desc, icon: Icon, theme }) => {
    return (
        <div className={`action-card ${theme}`}>
            <div className="action-card-icon-wrapper">
                <Icon className="action-card-icon" />
            </div>
            <h3 className="action-card-title">{title}</h3>
            <p className="action-card-desc">{desc}</p>
        </div>
    );
};

const GetInvolved = () => {
    return (
        <div className="involved-page">

            {/* Hero Section */}
            <div className="involved-hero">
                <div className="container involved-hero-container">
                    <FaHandHoldingHeart className="involved-icon-main" />
                    <h1 className="involved-title">Get Involved</h1>
                    <p className="involved-subtitle">
                        UMCA's strength lies in its people. We invite you to join us in making a difference.
                    </p>
                </div>
            </div>

            <div className="container cards-container">
                {/* Interactive Cards Section */}
                <div className="cards-grid">
                    <ActionCard
                        title="Become a Member"
                        desc="Join our community"
                        icon={FaUserPlus}
                        theme="primary"
                    />
                    <ActionCard
                        title="Volunteer"
                        desc="Share your time"
                        icon={FaHandsHelping}
                        theme="accent"
                    />
                    <ActionCard
                        title="Donate"
                        desc="Support our programs"
                        icon={FaDonate}
                        theme="primary"
                    />
                    <ActionCard
                        title="Partner With Us"
                        desc="Collaborate with us"
                        icon={FaHandshake}
                        theme="accent"
                    />
                </div>
            </div>

            {/* Bottom Footer Text / Call to Action */}
            <div className="involved-footer">
                <div className="container involved-footer-container">
                    <h2 className="involved-footer-title">
                        Together, we can nurture faith, serve humanity, and build a better future.
                    </h2>
                    <p className="involved-footer-text">
                        Ready to take the next step? Choose an option above or contact us directly.
                    </p>
                    <Button to="/contact" variant="primary">Contact Us Today</Button>
                </div>
            </div>

        </div>
    );
};

export default GetInvolved;
