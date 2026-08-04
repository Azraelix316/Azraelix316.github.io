// FeatureSection.jsx
import React from 'react';
import './component_styles/FeatureSection.css';
const FeatureSection = ({ content, animation, reversed = false }) => {
  return (
    <section className={`feature-row ${reversed ? 'reversed' : ''}`}>
      <div className="feature-text">
        {content}
      </div>
      <div className="feature-animation">
        {animation}
      </div>
    </section>
  );
};

export default FeatureSection;