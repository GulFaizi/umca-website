import React from 'react';
import { Link } from 'react-router-dom';
import './Card.scss';
import Button from './Button';

const Card = ({
    title,
    description,
    image,
    link,
    buttonText = "Learn More",
    target,
    rel,
    category,
    date
}) => {
    const formattedDate = date ? new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    }) : null;

    return (
        <article className="card">
            <div className="card-image-wrap">
                <img src={image} alt={title} className="card-image" loading="lazy" />
                {category && <span className="card-badge">{category}</span>}
            </div>
            <div className="card-content">
                {formattedDate && (
                    <div className="card-meta">
                        <span className="card-date">{formattedDate}</span>
                    </div>
                )}
                <h3 className="card-title">
                    {link ? (
                        <Link to={link} target={target} rel={rel} className="card-title-link">
                            {title}
                        </Link>
                    ) : (
                        title
                    )}
                </h3>
                <p className="card-description">{description}</p>
                {buttonText && (
                    <Button
                        to={link}
                        variant="outline"
                        className="card-btn"
                        target={target}
                        rel={rel}
                    >
                        {buttonText}
                    </Button>
                )}
            </div>
        </article>
    );
};

export default Card;

