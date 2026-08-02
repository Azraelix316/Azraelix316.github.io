// Black_Hole.jsx
import React, { useEffect, useRef } from 'react';

const BlackHole = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // 1. Store the exact DOM node globally before script loads
    window.p5TargetContainer = containerRef.current;

    // 2. Load p5 library
    const p5Script = document.createElement('script');
    p5Script.src = 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.min.js';
    p5Script.async = false;

    p5Script.onload = () => {
      // 3. Load your sketch (Note: '/black_hole.js', NOT '/public/black_hole.js')
      const mySketchScript = document.createElement('script');
      mySketchScript.src = '/public/black_hole.js'; 
      mySketchScript.async = false;
      document.body.appendChild(mySketchScript);
    };

    document.body.appendChild(p5Script);

    // Cleanup when component unmounts
    return () => {
      document.querySelectorAll('canvas').forEach((c) => c.remove());
      delete window.p5TargetContainer;
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="black-hole-wrapper"
      style={{ 
        width: '100%', 
        height: '400px', // High-level container must have a height!
        position: 'relative',
        overflow: 'hidden'
      }}
    />
  );
};

export default BlackHole;