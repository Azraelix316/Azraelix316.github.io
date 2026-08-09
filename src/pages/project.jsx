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
      description: "Description of the first feature",
      featureImage: null
    },
    {
      icon: "◆",
      title: "Feature Two",
      description: "Description of the second feature",
      featureImage: null
    },
    {
      icon: "◆",
      title: "Feature Three",
      description: "Description of the third feature",
      featureImage: null
    }
  ]
}) => {
  return (
    <main className="project-page">
      <div className="grid-bg"></div>
      
      {/* Hero Section - Image with overlay text + TOC */}
      <section className="project-hero">
        <div className="hero-wrapper">
          {/* Hero with stacked layout (75% width) */}
          <div className="hero-main">
            {/* Hero Image Background */}
            <div className="hero-image-background">
              <img src={image} alt={imageAlt} className="hero-bg-image" />
            </div>
            
            {/* Hero Content Overlay */}
            <div className="hero-content-overlay">
              <span className="project-index">{subtitle}</span>
              <h1 className="project-title">{title}</h1>
              <p className="project-description">{description}</p>
            </div>
          </div>

          {/* Table of Contents (25% width) */}
          <div className="toc-sidebar">
            <h3 className="toc-title">Contents</h3>
            <nav className="toc-list">
              {features.map((feature, index) => (
                <a key={index} href={`#feature-${index}`} className="toc-item">
                  <span className="toc-number">{String(index + 1).padStart(2, '0')}</span>
                  <span className="toc-text">{feature.title}</span>
                </a>
              ))}
            </nav>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="project-features">
        <div className="features-container">
          <div className="features-header">
            <h2>Key Features</h2>
            <div className="header-line"></div>
          </div>
          
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} id={`feature-${index}`} className="feature-card">
                {feature.featureImage && (
                  <div className="card-image">
                    <img src={feature.featureImage} alt={feature.title} />
                  </div>
                )}
                <div className="card-content">
                  <div className="card-header">
                    <span className="feature-icon">{feature.icon}</span>
                    <h3>{feature.title}</h3>
                  </div>
                  <p className="card-description">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProjectPage;
