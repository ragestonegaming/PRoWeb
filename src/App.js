// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Games from './pages/Games';
import Music from './pages/Music';
import About from './pages/About';
import MemoryGame from './games/MemoryGame'; 
import FreeFlowGame from './games/FreeFlowGame';
import BreathingBubble from './games/BreathingBubble'; 

//import Minesweeper from './games/Minesweeper';// Import the Memory Game component

import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/games" element={<Games />} />
            <Route path="/games/memory" element={<MemoryGame />} /> {/* Link to Memory Game */}
            <Route path="/games/freeflow" element={<FreeFlowGame />} /> {/* Link to Memory Game */}
            <Route path="/games/breathingbubble" element={<BreathingBubble />} /> {/* Link to Memory Game */}
            
            <Route path="/music" element={<Music />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        
      </div>
    </Router>
  );
}

export default App;
