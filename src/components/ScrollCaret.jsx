import React from 'react';
import './component_styles/ScrollCaret.css';

const ScrollCaret = () => {
  const scrollToNextSection = () => {
    // Finds all feature sections on the page
    const sections = document.querySelectorAll('.feature-row, .feature-section');
    const scrollPosition = window.scrollY + window.innerHeight / 2;

    // Find the first section that is below the current scroll position
    for (let section of sections) {
      const top = section.offsetTop;
      if (top > scrollPosition) {
        section.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }

    // Fallback: If at the top or section finding fails, scroll down 1 full viewport
    window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' });
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