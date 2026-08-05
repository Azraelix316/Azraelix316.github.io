import React from 'react';
import ProjectPage from '../project';

const VEXProject = () => {
  return (
    <ProjectPage
      title="VEX Over Under"
      subtitle="PORTFOLIO > ROBOTICS"
      description="VEX Robotics competition showcasing design innovation, competitive engineering, and autonomous programming. This season's robot was built to excel in both autonomous and driver-controlled periods."
      image="/src/assets/vex_smoke_bot_angle.png"
      imageAlt="VEX Robot"
      features={[
        {
          icon: "◆",
          title: "Autonomous Programming",
          description: "Advanced autonomous routines using sensor feedback and odometry for precise field navigation."
        },
        {
          icon: "◆",
          title: "Mechanical Design",
          description: "Optimized drivetrain and mechanisms engineered for speed, reliability, and durability."
        },
        {
          icon: "◆",
          title: "Control Systems",
          description: "Real-time control algorithms for coordinated multi-subsystem operation during matches."
        }
      ]}
    />
  );
};

export default VEXProject;
