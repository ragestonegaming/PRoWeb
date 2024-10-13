// src/components/GameCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import './GameCard.css';

const GameCard = ({ title, description, link ,backgroundColor}) => {
  return (
    <div className="game-card"style={{ backgroundColor }}>
      <h2>{title}</h2>
      <p>{description}</p>
      <Link to={link}>
        <button>Play Now</button>
      </Link>
    </div>
  );
};


export default GameCard;

