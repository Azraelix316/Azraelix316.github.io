import React, { useState } from 'react';
import Contact from './Contact';
import './component_styles/Navbar.css';

const MENU_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'About Me', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Research', href: '#research' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Fixed Header with Hamburger Toggle Button */}
      <header className="navbar-header">
        <button 
          className={`hamburger-btn ${isOpen ? 'open' : ''}`} 
          onClick={toggleMenu}
          aria-label="Toggle Navigation Menu"
        >
          <span className="hamburger-line" />
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>
      </header>

      {/* Darkened Screen Overlay / Backdrop */}
      <div 
        className={`menu-backdrop ${isOpen ? 'visible' : ''}`} 
        onClick={toggleMenu}
      />

      {/* Pop-out Navigation Modal */}
      <div className={`menu-modal ${isOpen ? 'open' : ''}`}>
        <nav className="menu-nav">
          <ul className="menu-list">
            {MENU_ITEMS.map((item, index) => (
              <li key={item.label} className="menu-item">
                <a 
                  href={item.href} 
                  className={`menu-link ${isOpen ? 'reveal' : ''}`}
                  style={{ animationDelay: `${0.15 + index * 0.08}s` }}
                  onClick={toggleMenu}
                >
                  {/* The horizontal bar overlay that slides away to unveil the text */}
                  <span 
                    className="link-uncover-bar" 
                    style={{ animationDelay: `${0.15 + index * 0.08}s` }}
                  />
                  <span className="link-text">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="menu-contact">
          <Contact />
        </div>
      </div>
    </>
  );
};

export default Navbar;