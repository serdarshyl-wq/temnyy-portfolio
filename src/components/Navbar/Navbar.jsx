import React from 'react';
import './Navbar.css';

const Navbar = ({ onNavClick, logoColor }) => {
    return (
        <nav className="navbar-container">
            <div className="logo clickable" onClick={() => onNavClick('home')}>
                <img
                    src={logoColor === 'white' ? '/logo-1-beyaz.png' : '/logo-1-siyah.png'}
                    alt="TEMNYY Logo"
                    className="navbar-logo-img"
                    style={{ height: '40px', width: 'auto' }}
                />
            </div>
            <ul className="nav-links">

                <li className="nav-link clickable" onClick={() => onNavClick('about')}>About</li>
                <li className="nav-link clickable" onClick={() => onNavClick('work')}>Work</li>
                <li className="nav-link clickable" onClick={() => onNavClick('contact')}>Contact</li>
            </ul>
        </nav>
    );
};

export default Navbar;
