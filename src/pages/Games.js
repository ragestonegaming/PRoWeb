// src/pages/Games.js
import React from 'react';

import GameCard from '../components/GameCard';
import './Games.css';

const gamesData = [
  { id: 1, name: "Memory Game", description: "Test your memory skills!", link: "/games/memory" },
  { id: 2, name: "Free Flow Game", description: "Solve the puzzle!", link: "/games/freeflow" },
  { id: 3, name: "Breathing Bubble Game", description: "Breathe with the flow of the bubble", link: "/games/breathingbubble" },
  { id: 4, name: "Ambient Soundscape Builder", description: "Build your own sound", link: "/games/ambientsoundscape" }
];

const colors = [
  '#d1e7ff', // Light blue
  '#d1e7d1', // Light green
  '#fff3cd', // Light yellow
  '#f8d7da', // Light pink
];

const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

const Games = () => {
  return (
    <div className="games">
      <h1>Games</h1>
      <div className="games-list">
        {gamesData.map(game => (
          <GameCard 
            key={game.id} 
            title={game.name} 
            description={game.description} 
            link={game.link} 
            backgroundColor={getRandomColor()} // Assign random color
          />
        ))}
      </div>
    </div>
  );
};

export default Games;
