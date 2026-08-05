// ObsidianNetwork.jsx
import React, { useEffect, useRef } from 'react';

const ObsidianNetwork = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let p5Instance = null;

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

    // Load p5 core library, then obsidian_network.js sketch
    loadScript('https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.min.js', 'p5-core-script')
      .then(() => loadScript('/obsidian_network.js', 'obsidian-network-sketch-script'))
      .then(() => {
        if (window.initObsidianNetwork && containerRef.current) {
          p5Instance = window.initObsidianNetwork(containerRef.current);
        }
      });

    return () => {
      if (p5Instance) {
        p5Instance.remove();
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="obsidian-network-wrapper"
      style={{ width: '100%', height: '100%', minHeight: '400px', position: 'relative' }}
    />
  );
};

export default ObsidianNetwork;
