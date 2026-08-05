import React from 'react';
import ProjectPage from '../project';

const ModelingProject = () => {
  return (
    <ProjectPage
      title="Mathematical Modeling"
      subtitle="PORTFOLIO > RESEARCH"
      description="Competition-level mathematical modeling projects tackling real-world problems through rigorous mathematical analysis and computational approaches. Published research in applied mathematics."
      image="/assets/MCM_screenshot_summary.png"
      imageAlt="Mathematical Model"
      features={[
        {
          icon: "◆",
          title: "Problem Analysis",
          description: "Breaking down complex real-world problems into mathematical frameworks and abstractions."
        },
        {
          icon: "◆",
          title: "Computational Solutions",
          description: "Implementing algorithms and numerical methods to solve mathematical models efficiently."
        },
        {
          icon: "◆",
          title: "Data-Driven Insights",
          description: "Analyzing datasets and validating models against empirical observations."
        }
      ]}
    />
  );
};

export default ModelingProject;
