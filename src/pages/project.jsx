import React from 'react';
import '../components/component_styles/ProjectPage.css';

const ProjectPage = ({ 
  title = "Project Title",
  subtitle = "PROJECT > CATEGORY",
  description = "Detailed project description goes here. This section can contain information about the project's goals, methodology, technologies used, and key achievements.",
  image = "/placeholder.png",
  imageAlt = "Project image",
  features = [
    {
      icon: "◆",
      title: "Feature One",
      description: "Description of the first feature"
    },
    {
      icon: "◆",
      title: "Feature Two",
      description: "Description of the second feature"
    },
    {
      icon: "◆",
      title: "Feature Three",
      description: "Description of the third feature"
    }
  ]
}) => {
  return (
    <main className="project-page">
      <div className="grid-bg"></div>
      
      {/* Hero Section */}
      <section className="project-hero">
        <div className="project-content">
          <div className="project-text">
            <span className="project-index">{subtitle}</span>
            <h1 className="project-title">{title}</h1>
            <p className="project-description">{description}</p>
          </div>
          
          <div className="project-image-container">
            <div className="graph-paper-frame">
              <img src={image} alt={imageAlt} className="project-image" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="project-features">
        <div className="features-header">
          <h2>Key Features</h2>
          <div className="header-line"></div>
        </div>
        
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="card-header">
                <span className="feature-icon">{feature.icon}</span>
                <h3>{feature.title}</h3>
              </div>
              <p className="card-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default ProjectPage;
