// FeatureText.jsx
import React from 'react';
import './component_styles/FeatureText.css';

const FeatureText = ({ index = '02', tag = 'MODULE // FEATURE', title, text }) => {
  return (
    <div className="feature-text-container">
      {/* HUD Telemetry Tag */}
      <div className="feature-text-tag">
        <span className="tag-index">{index}</span>
        <span className="tag-label">// {tag}</span>
      </div>

      {/* Title */}
      <h2 className="feature-text-title">{title}</h2>

      {/* Description Body */}
      <p className="feature-text-body">{text}</p>
    </div>
  );
};

export default FeatureText;