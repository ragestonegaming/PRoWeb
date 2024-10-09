// src/pages/Games.js
import React from 'react';
import GameCard from '../components/GameCard';
import './Games.css';

const gamesData = [
  { id: 1, name: "Memory Game", description: "Test your memory skills!", link: "/games/memory" },
    { id: 2, name: "Free Flow Game", description: "Solve the puzzle!", link: "/games/freeflow" },
    //{ id: 3, name: "Quiz Game", description: "Test your knowledge!", link: "/games/quiz" },
  // Add more games as needed
];

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
          />
        ))}
      </div>
    </div>
  );
};

export default Games;
