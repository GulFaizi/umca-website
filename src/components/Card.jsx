import React from 'react';
import { Link } from 'react-router-dom';
import './Card.scss';
import Button from './Button';

const Card = ({ title, description, image, link, buttonText = "Learn More" }) => {
    return (
        <div className="card">
            <img src={image} alt={title} className="card-image" />
            <div className="card-content">
                <h3 className="card-title">{title}</h3>
                <p className="card-description">{description}</p>
                {buttonText && (
                    <Button to={link} variant="outline" className="card-btn">{buttonText}</Button>
                )}
            </div>
        </div>
    );
};

export default Card;
