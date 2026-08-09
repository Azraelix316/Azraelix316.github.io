import React from 'react';
import { useNavigate } from 'react-router-dom';
import { triggerTransition } from '../App';
import '../components/component_styles/ProjectsIndex.css';

const ProjectsIndex = () => {
  const navigate = useNavigate();

  const projects = [
    {
      id: 'vex',
      title: 'VEX Over Under',
      category: 'ROBOTICS',
      description: 'Competitive robotics - autonomous programming and mechanical design.',
      icon: '◇'
    },
    {
      id: 'frc',
      title: 'FRC Team Participation',
      category: 'ROBOTICS',
      description: 'FIRST Robotics Competition with system integration and team leadership.',
      icon: '◇'
    },
    {
      id: 'p5js',
      title: 'p5.js Visualizations',
      category: 'DATA VIZ',
      description: 'Interactive physics simulations and generative art with p5.js.',
      icon: '◇'
    },
    {
      id: 'modeling',
      title: 'Mathematical Modeling',
      category: 'RESEARCH',
      description: 'Competition-level mathematical modeling and data analysis.',
      icon: '◇'
    },
    {
      id: 'web',
      title: 'Web Design',
      category: 'WEB',
      description: 'Full-stack web applications with responsive design and performance.',
      icon: '◇'
    },
    {
      id: 'quantum',
      title: 'Quantum Computing',
      category: 'RESEARCH',
      description: 'Quantum algorithms and circuit visualization with quantum advantage.',
      icon: '◇'
    }
  ];

  const handleProjectClick = (projectId) => {
    triggerTransition();
    setTimeout(() => {
      navigate(`/project/${projectId}`);
    }, 600);
  };

  return (
    <main className="projects-index">
      <div className="grid-bg"></div>
      
      <section className="projects-header">
        <h1>Projects</h1>
        <p className="header-subtitle">Explore my portfolio of work across robotics, data visualization, and quantum computing.</p>
      </section>

      <section className="projects-list">
        {projects.map((project) => (
          <button 
            key={project.id} 
            onClick={() => handleProjectClick(project.id)} 
            className="project-card-link"
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
          >
            <article className="project-card">
              <div className="card-icon">{project.icon}</div>
              <div className="card-content">
                <span className="card-category">{project.category}</span>
                <h2 className="card-title">{project.title}</h2>
                <p className="card-description">{project.description}</p>
              </div>
              <div className="card-arrow">→</div>
            </article>
          </button>
        ))}
      </section>
    </main>
  );
};

export default ProjectsIndex;
