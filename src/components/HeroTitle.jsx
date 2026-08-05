import React, { useState, useEffect } from 'react';
import './component_styles/HeroTitle.css';

const DEFAULT_DATA = [
  {
    specialty: 'React',
    skills: ['Interactive Web Applications', 'Component Architecture', 'Real-time Dashboards']
  },
  {
    specialty: 'AI & ML',
    skills: ['Neural Networks & Deep Learning', 'LLM Agents & Workflows', 'Computer Vision Systems']
  },
  {
    specialty: 'Data Visualization',
    skills: ['p5.js Physics Simulations', 'Interactive D3.js Visualizations', 'WebGL Rendering']
  },
  {
    specialty: 'Robotics',
    skills: ['VEX Autonomous Programming', 'FRC Team Systems', 'Control Algorithms']
  },
  {
    specialty: 'C++',
    skills: ['High-Performance Systems', 'Physics Engines', 'Embedded Programming']
  },
  {
    specialty: 'Quantum Computing',
    skills: ['Quantum Algorithms', 'Circuit Design & Simulation', 'Bloch Sphere Visualization']
  }
];

const HeroTitle = ({
  name = 'Jared',
  data = DEFAULT_DATA,
  intervalMs = 4000
}) => {
  const [activeDataIndex, setActiveDataIndex] = useState(0);
  const [specialtyVisible, setSpecialtyVisible] = useState(true);
  const [skillsVisible, setSkillsVisible] = useState(
    new Array(data[0].skills.length).fill(true)
  );
  const [currentDisplay, setCurrentDisplay] = useState(data[0]);

  useEffect(() => {
    const timer = setInterval(() => {
      const nextIndex = (activeDataIndex + 1) % data.length;
      const nextData = data[nextIndex];

      setSpecialtyVisible(false);

      currentDisplay.skills.forEach((_, i) => {
        setTimeout(() => {
          setSkillsVisible((prev) => {
            const updated = [...prev];
            updated[i] = false;
            return updated;
          });
        }, 100 + i * 100);
      });

      const fadeOutDuration = 100 + currentDisplay.skills.length * 100 + 200;

      setTimeout(() => {
        setActiveDataIndex(nextIndex);
        setCurrentDisplay(nextData);
        setSkillsVisible(new Array(nextData.skills.length).fill(false));

        setSpecialtyVisible(true);

        nextData.skills.forEach((_, i) => {
          setTimeout(() => {
            setSkillsVisible((prev) => {
              const updated = [...prev];
              updated[i] = true;
              return updated;
            });
          }, 100 + i * 100);
        });
      }, fadeOutDuration);

    }, intervalMs);

    return () => clearInterval(timer);
  }, [activeDataIndex, currentDisplay, data, intervalMs]);

  return (
    <div className="hero-title-container">
      {/* Visual Anchor */}
      <span className="hero-index">01 // PORTFOLIO</span>
      {/* Main Header */}
      <h1 className="hero-greeting">
        Hi, I'm <span className="hero-name">{name}</span>
      </h1>

      {/* Subtitle */}
      <div className="hero-subtitle">
        <span className="subtitle-prefix">Specializing in</span>
        <span className={`specialty-text ${specialtyVisible ? 'flip-in' : 'flip-out'}`}>
          {currentDisplay.specialty}
        </span>
      </div>

      {/* Skills List */}
      <ul className="skills-list">
        {currentDisplay.skills.map((skill, idx) => (
          <li
            key={idx}
            className={`skill-item ${skillsVisible[idx] ? 'flip-in' : 'flip-out'}`}
          >
            <span className="list-marker">&gt;</span>
            <span className="skill-title">{skill}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HeroTitle;