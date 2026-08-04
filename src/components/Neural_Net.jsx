// NeuralNet.jsx
import React, { useEffect, useRef } from 'react';

const NeuralNet = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // 1. Pass the DOM element reference to window
    window.p5TargetContainer = containerRef.current;

    // 2. Load p5.js CDN
    const p5Script = document.createElement('script');
    p5Script.src = 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.min.js';
    p5Script.async = false;

    p5Script.onload = () => {
      // 3. Load your neural_net.js script
      const mySketchScript = document.createElement('script');
      mySketchScript.src = '/public/neural_net.js';
      mySketchScript.async = false;
      document.body.appendChild(mySketchScript);
    };

    document.body.appendChild(p5Script);

    // Cleanup on unmount
    return () => {
      document.querySelectorAll('canvas').forEach((c) => c.remove());
      delete window.p5TargetContainer;
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="neural-net-wrapper"
      style={{ 
        width: '100%', 
        height: '100%', 
        minHeight: '400px', 
        position: 'relative' 
      }} 
    />
  );
};

export default NeuralNet;