// HudCursor.jsx
import React, { useEffect, useState } from 'react';
import './component_styles/HudCursor.css';

const HudCursor = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    // Only hide cursor if we detect ACTUAL touch (not just touch capability)
    // Modern laptops often report touch capability but are not touch devices
    const handleTouchStart = () => {
      setShowCursor(false);
    };

    const handleMouseMove = (e) => {
      // If we get mouse movement, we're on a non-touch device
      setShowCursor(true);
      setPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchstart', handleTouchStart, { once: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouchStart);
    };
  }, []);

  if (!showCursor) {
    return null;
  }

  return (
    <div
      className="hud-cursor-wrapper"
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
      }}
    >
      <div className="hud-cursor-dot" />
    </div>
  );
};

export default HudCursor;