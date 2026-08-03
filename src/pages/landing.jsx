// LandingPage.jsx
import React from 'react';
import FeatureSection from '../components/FeatureSection';
import HeroTitle from '../components/HeroTitle';
import BlackHole from '../components/Black_Hole';

const LandingPage = () => {
  return (
    <main className="landing-page">
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
    </main>
  );
};

export default LandingPage;