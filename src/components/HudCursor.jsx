// HudCursor.jsx
import React, { useEffect, useState } from 'react';
import './component_styles/HudCursor.css';

const HudCursor = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    // Detect hover over interactive elements to expand/lock cursor
    const handleMouseOver = (e) => {
      if (
        e.target.tagName === 'BUTTON' ||
        e.target.tagName === 'A' ||
        e.target.closest('a') ||
        e.target.closest('button') ||
        e.target.classList.contains('interactive')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <div
      className={`hud-cursor-wrapper ${isHovered ? 'hovered' : ''} ${
        isClicked ? 'clicked' : ''
      }`}
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
      }}
    >
      {/* 1. Center Precision Dot */}
      <div className="hud-center-dot" />

      {/* 2. Outer Dotted Radial Circle */}
      <svg className="hud-dotted-ring" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="46" />
      </svg>

      {/* 3. Primary Clockwise Arc with Trailing Point */}
      <div className="hud-arc-container arc-outer">
        <svg viewBox="0 0 100 100">
          {/* Top-Right Arc */}
          <path d="M 50 10 A 40 40 0 0 1 90 50" fill="none" />
        </svg>
        {/* Trailing Point positioned directly at arc start */}
        <div className="arc-trail-dot dot-outer" />
      </div>

      {/* 4. Secondary Counter-Clockwise Inner Arc with Trailing Point */}
      <div className="hud-arc-container arc-inner">
        <svg viewBox="0 0 100 100">
          {/* Bottom-Left Arc */}
          <path d="M 50 82 A 32 32 0 0 1 18 50" fill="none" />
        </svg>
        {/* Trailing Point positioned directly at inner arc start */}
        <div className="arc-trail-dot dot-inner" />
      </div>
    </div>
  );
};

export default HudCursor;