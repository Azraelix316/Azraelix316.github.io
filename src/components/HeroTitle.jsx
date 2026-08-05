import React, { useState, useEffect } from 'react';
import './component_styles/HeroTitle.css';

const DEFAULT_DATA = [
  {
    specialty: 'React',
    projects: ['Design System Component Library', 'Real-time Dashboard UI', 'SaaS Marketing Engine']
  },
  {
    specialty: 'AI & ML',
    projects: ['LLM Workflow Agent', 'Computer Vision Pipeline', 'Neural Net Visualizer']
  },
  {
    specialty: 'Data Visualization',
    projects: ['p5.js Black Hole Simulator', 'WebGL Galaxy Renderer', 'D3.js Financial Graphs']
  },
  {
    specialty: 'C++',
    projects: ['Custom Physics Engine', 'Audio DSP Plugin', 'High-Frequency Order Book']
  }
];

const HeroTitle = ({
  name = 'Jared',
  data = DEFAULT_DATA,
  intervalMs = 4000
}) => {
  const [activeDataIndex, setActiveDataIndex] = useState(0);
  const [specialtyVisible, setSpecialtyVisible] = useState(true);
  const [projectsVisible, setProjectsVisible] = useState(
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
          setProjectsVisible((prev) => {
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
        setProjectsVisible(new Array(nextData.projects.length).fill(false));

        setSpecialtyVisible(true);

        nextData.projects.forEach((_, i) => {
          setTimeout(() => {
            setProjectsVisible((prev) => {
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

      {/* Project List */}
      <ul className="project-list">
        {currentDisplay.projects.map((project, idx) => (
          <li
            key={idx}
            className={`project-item ${projectsVisible[idx] ? 'flip-in' : 'flip-out'}`}
          >
            <span className="list-marker">&gt;</span>
            <span className="project-title">{project}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HeroTitle;