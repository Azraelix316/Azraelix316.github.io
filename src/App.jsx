import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import LandingPage from './pages/landing.jsx'
import Navbar from './components/Navbar.jsx'
import HudCursor from './components/HudCursor.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <LandingPage />
        <Navbar />
        <HudCursor />
    </>
  )
}

export default App
