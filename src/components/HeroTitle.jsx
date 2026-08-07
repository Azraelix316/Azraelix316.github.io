import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './component_styles/HeroTitle.css';

const DEFAULT_DATA = [
  {
    specialty: 'React & Web',
    projects: [
      { name: 'Portfolio Website', path: '/projects/web' },
      { name: 'Interactive UI Systems', path: '/projects/web' },
      { name: 'Responsive Design', path: '/projects/web' }
    ]
  },
  {
    specialty: 'Data Visualization',
    projects: [
      { name: 'FRC Championship Flow Field', path: '/projects/frc' },
      { name: 'p5.js Physics Simulations', path: '/projects/p5js' },
      { name: 'Neural Network Visualizer', path: '/projects/p5js' }
    ]
  },
  {
    specialty: 'Robotics & Control',
    projects: [
      { name: 'FRC 2026 Team Systems', path: '/projects/frc' },
      { name: 'VEX Autonomous Programming', path: '/projects/vex' },
      { name: 'Control Algorithms', path: '/projects/vex' }
    ]
  },
  {
    specialty: 'Quantum Computing',
    projects: [
      { name: 'Quantum Circuit Simulator', path: '/projects/quantum' },
      { name: 'Bloch Sphere Visualization', path: '/projects/quantum' },
      { name: 'Algorithm Implementation', path: '/projects/quantum' }
    ]
  },
  {
    specialty: 'CAD & Modeling',
    projects: [
      { name: '3D Robot Designs', path: '/projects/modeling' },
      { name: 'VEX Competition Bot', path: '/projects/modeling' },
      { name: 'Engineering Simulations', path: '/projects/modeling' }
    ]
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
    new Array(data[0].projects.length).fill(true)
  );
  const [currentDisplay, setCurrentDisplay] = useState(data[0]);

  useEffect(() => {
    const timer = setInterval(() => {
      const nextIndex = (activeDataIndex + 1) % data.length;
      const nextData = data[nextIndex];

      setSpecialtyVisible(false);

      currentDisplay.projects.forEach((_, i) => {
        setTimeout(() => {
          setSkillsVisible((prev) => {
            const updated = [...prev];
            updated[i] = false;
            return updated;
          });
        }, 100 + i * 100);
      });

      const fadeOutDuration = 100 + currentDisplay.projects.length * 100 + 200;

      setTimeout(() => {
        setActiveDataIndex(nextIndex);
        setCurrentDisplay(nextData);
        setSkillsVisible(new Array(nextData.projects.length).fill(false));

        setSpecialtyVisible(true);

        nextData.projects.forEach((_, i) => {
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
        {currentDisplay.projects.map((project, idx) => (
          <li
            key={idx}
            className={`skill-item ${skillsVisible[idx] ? 'flip-in' : 'flip-out'}`}
          >
            <span className="list-marker">&gt;</span>
            <Link to={project.path} className="project-link">
              {project.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HeroTitle;