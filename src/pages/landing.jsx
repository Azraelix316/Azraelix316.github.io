// LandingPage.jsx
import React from 'react';
import FeatureSection from '../components/FeatureSection';
import BlackHole from '../components/Black_Hole';

const LandingPage = () => {
  return (
    <main className="landing-page">
      {/* Block 1: Black Hole */}
      <FeatureSection
        title="Hi, I'm Jared"
        text="I make cool things. Sometimes."
        animation={<BlackHole />}
        reversed={false}
      />
    </main>
  );
};

export default LandingPage;