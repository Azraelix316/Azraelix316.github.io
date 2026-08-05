import React from 'react';
import '../components/component_styles/AboutPage.css';

const AboutPage = () => {
  return (
    <main className="about-page">
      <div className="grid-bg"></div>
      
      <section className="about-hero">
        <div className="about-content">
          <div className="about-text">
            <span className="about-index">01 // ABOUT</span>
            <h1 className="about-title">About Me</h1>
            <p className="about-intro">
              I'm a software engineer and roboticist passionate about building intelligent systems that bridge the gap between complex engineering and elegant design.
            </p>
          </div>
        </div>
      </section>

      <section className="about-sections">
        <div className="about-section">
          <h2 className="section-title">Background</h2>
          <p className="section-text">
            With experience spanning robotics, full-stack development, quantum computing, and data visualization, I approach problems from multiple disciplines. My journey has been driven by curiosity about how systems work and how to make them work better.
          </p>
        </div>

        <div className="about-section">
          <h2 className="section-title">Skills & Expertise</h2>
          <div className="skills-grid">
            <div className="skill-card">
              <h3>Frontend Development</h3>
              <p>React, TypeScript, p5.js, Three.js, D3.js</p>
            </div>
            <div className="skill-card">
              <h3>Backend & Systems</h3>
              <p>Node.js, Python, C++, SQL, APIs</p>
            </div>
            <div className="skill-card">
              <h3>Robotics & Hardware</h3>
              <p>VEX, FRC, CAD, Control Systems, Embedded C</p>
            </div>
            <div className="skill-card">
              <h3>Data & AI</h3>
              <p>Machine Learning, Data Visualization, Mathematical Modeling, Quantum Algorithms</p>
            </div>
          </div>
        </div>

        <div className="about-section">
          <h2 className="section-title">Philosophy</h2>
          <p className="section-text">
            I believe in writing clean, maintainable code that solves real problems. Whether it's optimizing a robot's control loop, designing an intuitive user interface, or visualizing complex data, I focus on the intersection of technical excellence and user experience.
          </p>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
