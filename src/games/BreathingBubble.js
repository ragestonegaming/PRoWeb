// src/App.js
import React, { useState, useEffect } from 'react';
import './BreathingBubble.css';

function BreathingBubble() {
    const [breathingIn, setBreathingIn] = useState(true);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setBreathingIn((prev) => !prev); // Toggle between inhale and exhale
      }, 4000); // 4 seconds for each phase
  
      return () => clearInterval(interval);
    }, []);
  
    return (
      <div className="breathing-bubble-container">
        <div className="outer-boundary">
          {/* Inner Bubble */}
          <div className={`inner-bubble ${breathingIn ? 'inhale' : 'exhale'}`}>
            <div className="bubble-text">{breathingIn ? 'Breathe Out' : 'Breathe In'}</div>
          </div>
  
          {/* Moving Pointer */}
          <div className={`moving-pointer ${breathingIn ? 'pointer-left' : 'pointer-right'}`}></div>
  
          {/* Checkpoints */}
          <div className="checkpoint checkpoint-left"></div>
          <div className="checkpoint checkpoint-right"></div>
        </div>
      </div>
    );
  }
  
  export default BreathingBubble;