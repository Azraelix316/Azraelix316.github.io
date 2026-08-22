// LandingPage.jsx
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import FeatureSection from '../components/FeatureSection';
import HeroTitle from '../components/HeroTitle';
import BlackHole from '../components/Black_Hole';
import ScrollCaret from '../components/ScrollCaret';
import Navbar from '../components/Navbar';
import NeuralNet from '../components/Neural_Net.jsx';
import Contact from '../components/Contact';
import ObsidianNetwork from '../components/ObsidianNetwork';
import RevealCurtain from '../components/RevealCurtain';
import '../components/component_styles/LandingPage.css';
import FeatureText from '../components/FeatureText.jsx';

const LandingPage = () => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('black-hole');

  useEffect(() => {
    // Kill all p5.js sketches every time landing page is visited (including back button)
    if (window.p5 && window.p5.instance) {
      window.p5.instance.forEach(instance => {
        try {
          instance.remove();
        } catch (e) {
          console.warn('Error removing p5 instance:', e);
        }
      });
    }

    // Clear all canvas wrappers
    document.querySelectorAll('.black-hole-wrapper, .neural-net-wrapper, .obsidian-network-wrapper').forEach(el => {
      // Remove all canvas elements
      const canvases = el.querySelectorAll('canvas');
      canvases.forEach(canvas => canvas.remove());
      el.innerHTML = '';
    });
  }, [location.pathname]); // Fires every time location changes, including back button

  const handleSectionScroll = () => {
    // Detect which section is in view based on scroll position
    const sections = document.querySelectorAll('.feature-row');
    let currentSection = 'black-hole';
    
    sections.forEach((section, index) => {
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight / 2) {
        if (index === 0) currentSection = 'black-hole';
        else if (index === 1) currentSection = 'neural-net';
        else if (index === 2) currentSection = 'flow-field';
      }
    });
    
    setActiveSection(currentSection);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleSectionScroll);
    return () => window.removeEventListener('scroll', handleSectionScroll);
  }, []);

  return (
    <main className="landing-page">
      <RevealCurtain activeSection={activeSection} />
      <div className="grid-bg"></div>
      <div style={{ position: 'relative' }}>
        <FeatureSection
          content={
            <HeroTitle 
              name="Jared"
              specialties={["React", "AI", "Data Viz", "C++", "p5.js"]}
              description="I bridge the gap between complex software engineering, interactive physics simulations, and responsive web design."
            />
          }
          animation={<BlackHole />}
          reversed={false}
        />
        <Contact />
      </div>
      <FeatureSection
        content={
            <FeatureText 
                index="02"
                tag="PORTFOLIO > SPECIALTY"
                title="AI & ML"
                text="I specialize in building AI & ML systems that leverage the latest advancements in deep learning, computer vision, and natural language processing. From LLM workflow agents to neural net visualizers, I create intelligent solutions that drive innovation."
                reversed={true}
            />
        }
        animation={<NeuralNet />}
        reversed={true}
      />
      <FeatureSection
        content={
            <FeatureText 
                index="03"
                tag="PORTFOLIO > SPECIALTY"
                title="Data Visualization"
                text="I craft immersive data visualizations that transform complex datasets into intuitive, interactive experiences. Using p5.js, Three.js, and D3.js, I create visual languages that make data exploration a dynamic journey through information architecture."
                reversed={false}
            />
        }
        animation={<ObsidianNetwork />}
        reversed={false}
      />
      <ScrollCaret />
    </main>
  );
};

export default LandingPage;