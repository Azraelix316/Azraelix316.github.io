import React, { useState } from 'react';
import './component_styles/ScrollCaret.css';

const ScrollCaret = () => {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(-1);

  const scrollToNextSection = () => {
    // Finds all feature sections on the page
    const sections = document.querySelectorAll('.feature-row, .feature-section');
    
    if (sections.length === 0) return;

    const scrollPosition = window.scrollY + window.innerHeight / 2;
    let nextIndex = currentSectionIndex + 1;

    // Find which section we're currently in
    let currentIndex = -1;
    for (let i = 0; i < sections.length; i++) {
      const sectionTop = sections[i].offsetTop;
      const sectionBottom = sectionTop + sections[i].offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        currentIndex = i;
        break;
      }
    }

    // If we found current section, go to next; otherwise start from first
    if (currentIndex !== -1) {
      nextIndex = currentIndex + 1;
    }

    // If we're at or past the last section, cycle back to first
    if (nextIndex >= sections.length) {
      nextIndex = 0;
    }

    setCurrentSectionIndex(nextIndex);
    sections[nextIndex].scrollIntoView({ behavior: 'smooth' });
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