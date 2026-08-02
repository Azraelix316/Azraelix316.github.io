// LandingPage.jsx
import React from 'react';
import FeatureSection from '../components/FeatureSection';
import BlackHole from '../components/Black_Hole';

const LandingPage = () => {
  return (
    <main className="landing-page">
      {/* Block 1: Black Hole */}
      <FeatureSection
        title="Event Horizon Physics"
        text="Simulate realistic accretion disk dynamics and gravitational physics right inside your browser."
        animation={<BlackHole />}
        reversed={false}
      />
    </main>
  );
};

export default LandingPage;