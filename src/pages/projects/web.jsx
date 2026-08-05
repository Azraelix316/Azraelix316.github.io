import React from 'react';
import ProjectPage from '../project';

const WebProject = () => {
  return (
    <ProjectPage
      title="Web Design & Development"
      subtitle="PORTFOLIO > WEB"
      description="Full-stack web applications and responsive design projects. Building performant, accessible, and visually engaging web experiences using modern frameworks and best practices."
      image="assets/Screenshot 2025-06-15 185634-min.png"
      imageAlt="Web Design Project"
      features={[
        {
          icon: "◆",
          title: "Responsive Design",
          description: "Mobile-first design approach ensuring seamless experiences across all devices and screen sizes."
        },
        {
          icon: "◆",
          title: "Performance Optimization",
          description: "Code splitting, lazy loading, and optimization techniques for fast page loads and smooth interactions."
        },
        {
          icon: "◆",
          title: "Accessibility & UX",
          description: "Building inclusive, user-friendly interfaces that work for everyone with semantic HTML and ARIA."
        }
      ]}
    />
  );
};

export default WebProject;
