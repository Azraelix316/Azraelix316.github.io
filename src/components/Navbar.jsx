import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { triggerTransition } from '../App';
import Contact from './Contact';
import './component_styles/Navbar.css';

const MENU_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'About Me', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleMenuLinkClick = (e, href) => {
    e.preventDefault();
    
    // Close menu immediately
    setIsOpen(false);
    
    // Trigger curtain transition
    triggerTransition();
    
    // Navigate after curtain covers screen (600ms into the 1.2s animation)
    setTimeout(() => {
      navigate(href);
    }, 600);
  };

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
                  onClick={(e) => handleMenuLinkClick(e, item.href)}
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