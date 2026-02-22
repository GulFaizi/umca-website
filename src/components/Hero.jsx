import React from 'react';
import Button from './Button';
import './Hero.scss';

const Hero = () => {
    return (
        <div className="hero-container">
            <div className="hero-content">
                <h1>Welcome to UMCA</h1>
                <p>United Muslim Community of America - Serving Humanity with Compassion, Dignity, Justice, and Excellence</p>
                <div className="hero-btns">
                    <Button to="/programs" variant="primary" className="hero-btn">
                        Our Programs
                    </Button>
                    <Button to="/about" variant="secondary" className="hero-btn">
                        Learn More
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Hero;
