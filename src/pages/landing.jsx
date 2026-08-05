// LandingPage.jsx
import React from 'react';
import FeatureSection from '../components/FeatureSection';
import HeroTitle from '../components/HeroTitle';
import BlackHole from '../components/Black_Hole';
import ScrollCaret from '../components/ScrollCaret';
import Navbar from '../components/Navbar';
import NeuralNet from '../components/Neural_Net.jsx';
import Contact from '../components/Contact';
import ObsidianNetwork from '../components/ObsidianNetwork';
import '../components/component_styles/LandingPage.css';
import FeatureText from '../components/FeatureText.jsx';
const LandingPage = () => {
  return (
    <main className="landing-page">
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