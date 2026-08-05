import React from 'react';
import './component_styles/ScrollCaret.css';

const ScrollCaret = () => {
  const scrollToNextSection = () => {
    // Find the landing page container and scroll it
    const landingPage = document.querySelector('.landing-page');
    if (landingPage) {
      landingPage.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
    }
  };

  return (
    <button 
      className="scroll-caret-container" 
      onClick={scrollToNextSection}
      aria-label="Scroll to next section"
    >
      <span className="caret-text">Scroll Down</span>
      <svg 
        className="caret-icon" 
        width="20" 
        height="12" 
        viewBox="0 0 20 12" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M1 1L10 10L19 1" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};

export default ScrollCaret;