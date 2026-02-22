import React from 'react';
import Button from '../components/Button';
import './Donate.scss';

const Donate = () => {
    return (
        <div className="container donate-container">
            <h1 className="mb-lg">Your Contribution Makes a Difference</h1>
            <p className="donate-subtitle">
                Every donation helps us continue our work serving the community. Whether big or small, your generosity supports our programs and services that benefit hundreds of families.
            </p>

            <div className="donate-card">
                <h3 className="donate-card-title">Donate via Zelle</h3>
                <p className="donate-card-text">
                    You can easily send us a donation through Zelle by scanning the QR code below.
                </p>

                <div className="qr-placeholder">
                    <span className="qr-text-main">[QR Code Placeholder]</span>
                    <span className="qr-text-sub">Image will go here</span>
                </div>

                <div className="donate-footer">
                    <strong>Zelle Email/Phone:</strong> donate@umca.example.com
                </div>
            </div>
        </div>
    );
};

export default Donate;
