// src/pages/Home.js
import React from 'react';

import { Link } from 'react-router-dom'; // Make sure to import Link for routing
import './Home.css';

// Define an array of colors
const cardColors = [
  '#FFB74D', // Light Orange
  '#64B5F6', // Light Blue
  '#81C784', // Light Green
  '#F06292', // Light Pink
  '#FFD54F', // Light Yellow
];

function Home() {
  return (
    <div className="home">
      <h1>Welcome to NERS</h1>
      <div className="home-cards">
        <Link to="/games" className="card-link">
          <div className="card" style={{ backgroundColor: cardColors[0] }}>
            <h2 className="card-title">Games</h2>
            <div className="card-description">Play stress-relieving games</div>
          </div>
        </Link>
        <Link to="/chatbot" className="card-link">
          <div className="card" style={{ backgroundColor: cardColors[1] }}>
            <h2 className="card-title">Chatbot</h2>
            <div className="card-description">Talk to NERS bot</div>
          </div>
        </Link>
        <Link to="/music" className="card-link">
          <div className="card" style={{ backgroundColor: cardColors[2] }}>
            <h2 className="card-title">Music</h2>
            <div className="card-description">Listen to calming music</div>
          </div>
        </Link>
      </div>
      <div className="description">
        <p>Discover a variety of activities to help you relax and unwind.</p>
      </div>
    </div>
  );
}

export default Home;
