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

  // Tracks visibility state for the specialty title
  const [specialtyVisible, setSpecialtyVisible] = useState(true);

  // Tracks visibility state for each individual project item in the list
  const [projectsVisible, setProjectsVisible] = useState(
    new Array(data[0].projects.length).fill(true)
  );

  // Stores the active specialty and projects currently rendered on screen
  const [currentDisplay, setCurrentDisplay] = useState(data[0]);

  useEffect(() => {
    const timer = setInterval(() => {
      const nextIndex = (activeDataIndex + 1) % data.length;
      const nextData = data[nextIndex];

      // --- STEP 1: Cascade Fade-Out ---
      // Fade out specialty title
      setSpecialtyVisible(false);

      // Stagger fade-out for existing project list items (100ms apart)
      currentDisplay.projects.forEach((_, i) => {
        setTimeout(() => {
          setProjectsVisible((prev) => {
            const updated = [...prev];
            updated[i] = false;
            return updated;
          });
        }, 100 + i * 100);
      });

      // --- STEP 2: Swap Data & Cascade Fade-In ---
      // Total duration of fade-out phase
      const fadeOutDuration = 100 + currentDisplay.projects.length * 100 + 200;

      setTimeout(() => {
        // Update content to the new specialty & project list
        setActiveDataIndex(nextIndex);
        setCurrentDisplay(nextData);
        setProjectsVisible(new Array(nextData.projects.length).fill(false));

        // Wave In 1: Specialty Title updates first
        setSpecialtyVisible(true);

        // Wave In 2: Each project flips in with an additional 100ms delay per item
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
      {/* 1. Main Greeting Header */}
      <h1 className="hero-greeting">
        Hi, I'm <span className="hero-name">{name}</span>
      </h1>

      {/* 2. Subtitle with Specializing in... */}
      <div className="hero-subtitle">
        <span className="subtitle-prefix">Specializing in</span>
        <span className={`specialty-text ${specialtyVisible ? 'flip-in' : 'flip-out'}`}>
          {currentDisplay.specialty}
        </span>
      </div>

      {/* 3. Staggered Wave Project List */}
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