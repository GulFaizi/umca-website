import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import Button from './Button';
import './Navbar.scss';
import logo from '../assets/logo.png';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <nav className="navbar">
            <div className="container nav-container">
                <Link to="/" className="nav-logo nav-logo-link">
                    <img src={logo} alt="UMCA Logo" className="nav-logo-img" />
                    <span className="nav-logo-text">UMCA</span>
                </Link>

                <div className="nav-mobile-icon" onClick={toggleMenu}>
                    {isOpen ? <FaTimes /> : <FaBars />}
                </div>

                <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
                    <li className="nav-item">
                        <NavLink to="/" className={({ isActive }) => (isActive ? 'active-link' : 'nav-link')} onClick={toggleMenu}>Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/about" className={({ isActive }) => (isActive ? 'active-link' : 'nav-link')} onClick={toggleMenu}>About</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/programs" className={({ isActive }) => (isActive ? 'active-link' : 'nav-link')} onClick={toggleMenu}>Programs</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/our-team" className={({ isActive }) => (isActive ? 'active-link' : 'nav-link')} onClick={toggleMenu}>Our Team</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/news" className={({ isActive }) => (isActive ? 'active-link' : 'nav-link')} onClick={toggleMenu}>News</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/get-involved" className={({ isActive }) => (isActive ? 'active-link' : 'nav-link')} onClick={toggleMenu}>Get Involved</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/contact" className={({ isActive }) => (isActive ? 'active-link' : 'nav-link')} onClick={toggleMenu}>Contact</NavLink>
                    </li>
                    <li className="nav-btn">
                        <Button to="/donate" variant="primary">Donate Now</Button>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
