// FeatureSection.jsx
import React from 'react';
import './component_styles/FeatureSection.css';
const FeatureSection = ({ title, text, animation, reversed = false }) => {
  return (
    <section className={`feature-row ${reversed ? 'reversed' : ''}`}>
      <div className="feature-text">
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
      <div className="feature-animation">
        {animation}
      </div>
    </section>
  );
};

export default FeatureSection;