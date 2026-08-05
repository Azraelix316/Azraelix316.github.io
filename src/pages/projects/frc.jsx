import React from 'react';
import ProjectPage from '../project';

const FRCProject = () => {
  return (
    <ProjectPage
      title="FRC Team Participation"
      subtitle="PORTFOLIO > ROBOTICS"
      description="FIRST Robotics Competition involvement showcasing complex system integration, team collaboration, and rapid prototyping under competitive pressure. Building robots that compete at the highest levels of collegiate robotics."
      image="/assets/FRC.jpg"
      imageAlt="FRC Robot"
      features={[
        {
          icon: "◆",
          title: "System Integration",
          description: "Coordinating mechanical, electrical, and software systems for cohesive robot operation."
        },
        {
          icon: "◆",
          title: "Team Leadership",
          description: "Collaborating across disciplines to design, build, and deploy robots in competition."
        },
        {
          icon: "◆",
          title: "Rapid Iteration",
          description: "Agile development and quick adaptation to competitive challenges and game rule changes."
        }
      ]}
    />
  );
};

export default FRCProject;
