import React from 'react';
import './Button.scss';
import { Link } from 'react-router-dom';

const Button = ({ children, to, onClick, variant = 'primary', className = '', target, rel, ...rest }) => {
    const buttonClass = `button ${variant} ${className}`.trim();

    if (to) {
        if (to.startsWith('http') || to.startsWith('mailto')) {
            return (
                <a href={to} className={buttonClass} target={target || "_blank"} rel={rel || "noopener noreferrer"} {...rest}>
                    {children}
                </a>
            );
        }
        return (
            <Link to={to} className={buttonClass} target={target} rel={rel} {...rest}>
                {children}
            </Link>
        );
    }

    return (
        <button className={buttonClass} onClick={onClick} {...rest}>
            {children}
        </button>
    );
};

export default Button;

