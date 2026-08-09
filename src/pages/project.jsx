import React, { useState } from 'react';
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
  const [isImageHovered, setIsImageHovered] = useState(false);

  return (
    <main className="project-page">
      <div className="grid-bg"></div>
      
      {/* Hero Section */}
      <section className="project-hero">
        <div className="hero-container">
          {/* Project Title - Vertical */}
          <div className="hero-title-vertical">
            <h1 className="project-title-vertical">{title}</h1>
          </div>

          {/* Divider Line */}
          <div className="hero-divider"></div>

          {/* Image Container */}
          <div 
            className="hero-image-section"
            onMouseEnter={() => setIsImageHovered(true)}
            onMouseLeave={() => setIsImageHovered(false)}
          >
            <div className={`hero-image-frame ${isImageHovered ? 'hovered' : ''}`}>
              <img src={image} alt={imageAlt} className="hero-image" />
            </div>

            {/* Text Overlay - Appears on hover */}
            <div className={`hero-text-overlay ${isImageHovered ? 'visible' : ''}`}>
              <span className="overlay-subtitle">{subtitle}</span>
              <p className="overlay-description">{description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="project-features">
        <div className="features-container">
          <div className="features-header">
            <h2>KEY FEATURES</h2>
          </div>
          
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-card-inner">
                  {/* Card Number */}
                  <div className="card-number">{String(index + 1).padStart(2, '0')}</div>
                  
                  {/* Card Content */}
                  <div className="card-body">
                    {feature.featureImage && (
                      <div className="card-image">
                        <img src={feature.featureImage} alt={feature.title} />
                      </div>
                    )}
                    
                    <div className="card-text">
                      <h3 className="card-title">{feature.title}</h3>
                      <p className="card-description">{feature.description}</p>
                    </div>
                  </div>
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
