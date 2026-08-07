// NeuralNet.jsx
import React, { useEffect, useRef } from 'react';

const NeuralNet = () => {
  const containerRef = useRef(null);
  const p5InstanceRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Kill any existing canvases and p5 instances EVERY SINGLE TIME
    const killExistingCanvases = () => {
      const allCanvases = document.querySelectorAll('.neural-net-wrapper canvas');
      allCanvases.forEach(canvas => {
        try {
          canvas.remove();
        } catch (e) {}
      });

      if (p5InstanceRef.current) {
        try {
          p5InstanceRef.current.remove();
        } catch (e) {}
        p5InstanceRef.current = null;
      }

      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };

    // Kill first
    killExistingCanvases();

    // Wait a tick then create new one
    const timer = setTimeout(() => {
      const loadScript = (src, id) => {
        return new Promise((resolve) => {
          if (document.getElementById(id)) {
            resolve();
            return;
          }
          const script = document.createElement('script');
          script.id = id;
          script.src = src;
          script.async = false;
          script.onload = () => resolve();
          document.body.appendChild(script);
        });
      };

      loadScript('https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.min.js', 'p5-core-script')
        .then(() => loadScript('/neural_net.js', 'neural-net-sketch-script'))
        .then(() => {
          if (window.initNeuralNet && containerRef.current) {
            p5InstanceRef.current = window.initNeuralNet(containerRef.current);
          }
        });
    }, 50);

    return () => {
      clearTimeout(timer);
      killExistingCanvases();
    };
  });

  return (
    <div 
      ref={containerRef} 
      className="neural-net-wrapper"
      style={{ width: '100%', height: '100%', minHeight: '400px', position: 'relative' }}
    />
  );
};

export default NeuralNet;