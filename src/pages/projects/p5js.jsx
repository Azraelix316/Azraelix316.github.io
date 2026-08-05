import React from 'react';
import ProjectPage from '../project';

const P5JSProject = () => {
  return (
    <ProjectPage
      title="p5.js Interactive Visualizations"
      subtitle="PORTFOLIO > DATA VISUALIZATION"
      description="Creative coding projects using p5.js to build interactive, generative art and data visualizations. Exploring physics simulations, particle systems, and real-time visual effects."
      image="/src/assets/hero.png"
      imageAlt="p5.js Visualization"
      features={[
        {
          icon: "◆",
          title: "Physics Simulations",
          description: "Realistic particle systems and force-based simulations with collision detection and dynamics."
        },
        {
          icon: "◆",
          title: "Generative Art",
          description: "Algorithmic art generation using procedural techniques and mathematical patterns."
        },
        {
          icon: "◆",
          title: "Interactive Experiences",
          description: "User-driven visualizations that respond to input and create dynamic, engaging experiences."
        }
      ]}
    />
  );
};

export default P5JSProject;
