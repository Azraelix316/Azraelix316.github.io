// BlackHole.jsx
import React, { useEffect } from 'react';

const BlackHole = () => {
  useEffect(() => {
    // 1. Load p5 library script globally
    const p5Script = document.createElement('script');
    p5Script.src = 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.min.js';
    p5Script.async = false; // Execute in order

    // 2. Load your script right after p5 finishes loading
    p5Script.onload = () => {
      const mySketchScript = document.createElement('script');
      mySketchScript.src = '/public/black_hole.js'; // Points to public/black_hole.js
      mySketchScript.async = false;
      document.body.appendChild(mySketchScript);
    };

    document.body.appendChild(p5Script);

    // Clean up canvas on component unmount
    return () => {
      document.querySelectorAll('canvas').forEach((canvas) => canvas.remove());
    };
  }, []);

  return <div id="p5-container" />;
};

export default BlackHole;