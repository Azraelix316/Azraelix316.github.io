import React, { useEffect, useRef, useState } from 'react';
import './component_styles/RevealCurtain.css';

const RevealCurtain = ({ activeSection = 'black-hole' }) => {
  const curtainRef = useRef(null);
  const [mouseX, setMouseX] = useState(window.innerWidth * 0.3);

  const tooltips = {
    'black-hole': {
      title: 'Black Hole Physics',
      equations: [
        'Paczyński-Wiita Acceleration:',
        'a = (GM) / (r - Rs)²',
        '',
        'Schwarzschild Radius:',
        'Rs = 2GM / c²',
        '',
        'Shakura-Sunyaev Temperature:',
        'T = ((3GMṀ / 8πσr³)(1 - √(Rs/r)))^0.25',
        '',
        'Stefan-Boltzmann Law:',
        'L = σT⁴',
        '',
        'Constants:',
        'G = 6.6743 × 10⁻¹¹ m³/(kg·s²)',
        'c = 299,792,458 m/s',
        'σ = 5.67 × 10⁻⁸ W/(m²·K⁴)'
      ]
    },
    'flow-field': {
      title: 'Flow Field Dynamics',
      equations: [
        'Vector Field Force Calculation:',
        'F = Σ(team.gravity / (d² + ε))',
        '',
        'Particle Dynamics:',
        'v_new = v_old + a·dt',
        'v_damped = v × 0.98',
        'x_new = x + v·dt',
        '',
        'Speed Limiting:',
        'if |v| > v_max:',
        '  v = (v / |v|) × v_max',
        '',
        'Perlin Noise Integration:',
        'noise_x = Perlin(offset_x, time)',
        'v_x += noise_x × 0.015',
        '',
        'Batching (300 batches × 30 particles):',
        'Central velocity calculated once',
        'Particles offset around center'
      ]
    },
    'neural-net': {
      title: 'Neural Network',
      equations: [
        'Signal Propagation:',
        'position = lerp(start, end, progress)',
        'progress += speed',
        '',
        'Node Activation:',
        'activation = lerp(current, 1.0, dt)',
        '',
        'Layer Spacing:',
        'spacing = (width - padding) / (layers - 1)',
        '',
        'Pulse Speed:',
        'speed ∈ [0.015, 0.03]',
        '',
        'Glow Effect:',
        'halo_radius = node_radius × 3.5',
        'halo_alpha = activation × 100'
      ]
    }
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMouseX(e.clientX);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const tooltip = tooltips[activeSection] || tooltips['black-hole'];

  return (
    <div 
      ref={curtainRef}
      className="reveal-curtain-container"
    >
      {/* Diagonal trapezoid curtain with padding - everything inside is inverted and clipped */}
      <div 
        className="curtain-rect-invert"
        style={{
          clipPath: `polygon(-2000px ${window.innerHeight}px, ${mouseX * ((window.innerWidth + window.innerHeight) / window.innerWidth) - window.innerHeight}px ${window.innerHeight}px, ${mouseX * ((window.innerWidth + window.innerHeight) / window.innerWidth)}px 0px, ${window.innerWidth + 1000}px 0px, ${window.innerWidth + 1000}px ${window.innerHeight}px, -2000px ${window.innerHeight}px)`      
        }}
          >
        {/* Tooltip rendered inside curtain - automatically clipped by curtain's clip-path */}
        <div 
          className="curtain-tooltip"
          style={{
            left: `${window.innerWidth * 0.75}px`,
            top: `${window.innerHeight * 0.25}px`,
          }}
        >
          <div className="tooltip-header">{tooltip.title}</div>
          <div className="tooltip-equations">
            {tooltip.equations.map((eq, i) => (
              <div key={i} className={`equation-line ${eq === '' ? 'spacer' : ''}`}>
                {eq}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevealCurtain;
