import { Routes, Route, useLocation } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
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
import AboutPage from './pages/about.jsx'
import ContactPage from './pages/contact.jsx'

// Global state for transition
let globalTransitionActive = false
let transitionListeners = []

export function triggerTransition() {
  globalTransitionActive = true
  transitionListeners.forEach(listener => listener())
}

function App() {
  const location = useLocation()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const transitionTimeoutRef = useRef(null)

  useEffect(() => {
    // Register listener for global transition
    const listener = () => setIsTransitioning(true)
    transitionListeners.push(listener)
    
    return () => {
      transitionListeners = transitionListeners.filter(l => l !== listener)
    }
  }, [])

  useEffect(() => {
    // Skip transition animation on initial page load
    if (isInitialLoad) {
      setIsInitialLoad(false)
      return
    }

    // Location changed, turn off transition after duration
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current)
    }
    
    transitionTimeoutRef.current = setTimeout(() => {
      setIsTransitioning(false)
      globalTransitionActive = false
    }, 1200)

    return () => {
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current)
      }
    }
  }, [location.pathname])

  return (
    <>
      {/* Page Transition Curtain */}
      <div className={`page-transition-curtain ${isTransitioning ? 'active' : ''}`} />
      
      <Routes location={location}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/projects" element={<ProjectsIndex />} />
        <Route path="/project/vex" element={<VEXProject />} />
        <Route path="/project/frc" element={<FRCProject />} />
        <Route path="/project/p5js" element={<P5JSProject />} />
        <Route path="/project/modeling" element={<ModelingProject />} />
        <Route path="/project/web" element={<WebProject />} />
        <Route path="/project/quantum" element={<QuantumProject />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <Navbar />
      <HudCursor />
    </>
  )
}

export default App
