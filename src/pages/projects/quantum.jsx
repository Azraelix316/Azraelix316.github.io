import React from 'react';
import ProjectPage from '../project';

const QuantumProject = () => {
  return (
    <ProjectPage
      title="Quantum Computing"
      subtitle="PORTFOLIO > RESEARCH"
      description="Quantum algorithm research and implementation exploring quantum gates, circuits, and solving problems with quantum advantage. Visualizing quantum states and circuit execution."
      image="/assets/quantum/simon_linear_oracle_circuit.png"
      imageAlt="Quantum Circuit"
      features={[
        {
          icon: "◆",
          title: "Quantum Algorithms",
          description: "Implementing algorithms like Simon's, Deutsch-Jozsa, and phase kickback for quantum advantage."
        },
        {
          icon: "◆",
          title: "Circuit Design",
          description: "Designing and optimizing quantum circuits for specific computational tasks and problems."
        },
        {
          icon: "◆",
          title: "Visualization",
          description: "Creating visualizations of quantum states, Bloch spheres, and circuit operations for understanding."
        }
      ]}
    />
  );
};

export default QuantumProject;
