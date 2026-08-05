import { Routes, Route } from 'react-router-dom'
import './App.css'
import LandingPage from './pages/landing.jsx'
import Navbar from './components/Navbar.jsx'
import HudCursor from './components/HudCursor.jsx'
import ProjectsIndex from './pages/projects-index.jsx'
import VEXProject from './pages/projects/vex.jsx'
import FRCProject from './pages/projects/frc.jsx'
import P5JSProject from './pages/projects/p5js.jsx'
import ModelingProject from './pages/projects/modeling.jsx'
import WebProject from './pages/projects/web.jsx'
import QuantumProject from './pages/projects/quantum.jsx'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/projects" element={<ProjectsIndex />} />
        <Route path="/project/vex" element={<VEXProject />} />
        <Route path="/project/frc" element={<FRCProject />} />
        <Route path="/project/p5js" element={<P5JSProject />} />
        <Route path="/project/modeling" element={<ModelingProject />} />
        <Route path="/project/web" element={<WebProject />} />
        <Route path="/project/quantum" element={<QuantumProject />} />
      </Routes>
      <Navbar />
      <HudCursor />
    </>
  )
}

export default App
