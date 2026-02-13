import React, { useEffect, useState } from 'react';
import './Navbar.css';

const Navbar = ({ onNavClick, logoColor }) => {
    const [hidden, setHidden] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerWidth <= 768) {
                setHidden(window.scrollY > window.innerHeight * 0.8);
            } else {
                setHidden(false);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, []);

    return (
        <nav className={`navbar-container ${hidden ? 'navbar-hidden' : ''}`}>
            <div className="logo clickable" onClick={() => onNavClick('home')}>
                <img
                    src={logoColor === 'white' ? '/logo-1-beyaz.png' : '/logo-1-beyaz.png'}
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
