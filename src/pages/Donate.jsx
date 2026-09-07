import React from 'react';
import './Donate.scss';

const Donate = () => {
    return (
        <div className="container donate-container">
            <h1 className="mb-lg">Your Contribution Makes a Difference</h1>
            <p className="donate-subtitle">
                Every donation helps us continue our work serving the community. Whether big or small, your generosity supports our programs and services that benefit hundreds of families.
            </p>

            {/* Embedded Zeffy Donation Card */}
            <div className="donate-card donate-card-wide">
                <iframe
                    title="Donation form powered and secured by Zeffy"
                    src="https://www.zeffy.com/embed/donation-form/support-umca-building-a-stronger-community-together"
                    allow="payment"
                    className="zeffy-embed-iframe"
                />
            </div>

            <div className="donate-external-link">
                <p>
                    Having trouble viewing the form?{' '}
                    <a
                        href="https://www.zeffy.com/en-US/donation-form/support-umca-building-a-stronger-community-together"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Open donation page in a new tab ↗
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Donate;
