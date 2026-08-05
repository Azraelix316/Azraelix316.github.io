import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import LandingPage from './pages/landing.jsx'
import Navbar from './components/Navbar.jsx'
import HudCursor from './components/HudCursor.jsx'
import ProjectPage from './pages/project.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <LandingPage />
    {/* <ProjectPage /> */}
        <Navbar />
        <HudCursor />
    </>
  )
}

export default App
