import React from 'react';
import './Button.scss';
import { Link } from 'react-router-dom';

const Button = ({ children, to, onClick, variant = 'primary', className = '' }) => {
    const buttonClass = `button ${variant} ${className}`.trim();

    if (to) {
        if (to.startsWith('http') || to.startsWith('mailto')) {
            return <a href={to} className={buttonClass} target="_blank" rel="noreferrer">{children}</a>;
        }
        return <Link to={to} className={buttonClass}>{children}</Link>;
    }

    return (
        <button className={buttonClass} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;
