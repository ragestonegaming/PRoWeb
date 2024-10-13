// src/games/MemoryGame.js
import React, { useState, useEffect } from 'react';
import './MemoryGame.css';


const initialLevels = [
  { level: 1, numCards: 4, gridSize: 2 }, // 4 cards (2x2)
  { level: 2, numCards: 8, gridSize: 4 }, // 8 cards (4x4)
  { level: 3, numCards: 12, gridSize: 4 }, // 12 cards (4x4)
];

const MemoryGame = () => {
  const [level, setLevel] = useState(0);
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [completed, setCompleted] = useState(false); // State to track completion
  const [showCards, setShowCards] = useState(true); // State to control card visibility

  useEffect(() => {
    resetGame();
  }, [level]);

  const resetGame = () => {
    setFlippedCards([]);
    setMatchedCards([]);
    setLives(3);
    setGameOver(false);
    setCompleted(false); // Reset completion status
    generateCards();
    setShowCards(true); // Show cards at the start

    // Hide cards after 3 seconds
    setTimeout(() => {
      setShowCards(false);
    }, 3000);
  };

  const generateCards = () => {
    const { numCards } = initialLevels[level];
    const cardValues = Array.from({ length: numCards / 2 }, (_, i) => i + 1);
    const cardPairs = [...cardValues, ...cardValues]; // Duplicate values for pairs
    const shuffledCards = cardPairs.sort(() => Math.random() - 0.5); // Shuffle cards
    setCards(shuffledCards);
  };

  const flipCard = (index) => {
    if (flippedCards.length < 2 && !flippedCards.includes(index)) {
      setFlippedCards((prev) => [...prev, index]);

      if (flippedCards.length === 1) {
        checkMatch(index);
      }
    }
  };

  const checkMatch = (index) => {
    const firstCard = flippedCards[0];
    if (cards[firstCard] === cards[index]) {
      setMatchedCards((prev) => [...prev, cards[firstCard]]);
      setScore((prev) => prev + 10); // Increase score
      setFlippedCards([]);
      if (matchedCards.length + 1 === cards.length / 2) {
        // Move to next level without resetting score
        if (level < initialLevels.length - 1) {
          setLevel((prev) => prev + 1);
        } else {
          // All levels completed
          setCompleted(true);
          // Update high score if current score is greater
          setHighScore((prevHigh) => Math.max(prevHigh, score));
        }
      }
    } else {
      setLives((prev) => {
        if (prev - 1 <= 0) {
          setGameOver(true);
          // Reset high score if current score is greater
          setHighScore((prevHigh) => Math.max(prevHigh, score));
          setScore(0); // Reset score to 0 on game over
          return 0;
        }
        return prev - 1; // Decrease lives
      });
      setTimeout(() => setFlippedCards([]), 1000); // Flip back after 1 second
    }
  };

  const handleRestart = () => {
    resetGame();
    setScore(0); // Reset score to 0 on restart
    setLevel(0); // Reset to level 0
  };

  return (
    <div className="memory-game">
      <h1>Memory Game</h1>
      <div className="score-lives">
        <div>Score: {score}</div>
        <div>High Score: {highScore}</div>
        <div>
          Lives: {Array.from({ length: lives }).map((_, i) => (
            <span key={i} className="heart">❤️</span>
          ))}
        </div>
      </div>

      {gameOver && (
        <div className="game-over">
          <h2>Game Over!</h2>
          <button onClick={handleRestart}>Restart Game</button>
        </div>
      )}

      {completed && (
        <div className="game-completed">
          <h2>Congratulations! You completed all levels!</h2>
          <button onClick={handleRestart}>Play Again</button>
        </div>
      )}

      <div className={`card-grid grid-${initialLevels[level].gridSize}`}>
        {cards.map((card, index) => (
          <div
            key={index}
            className={`card ${flippedCards.includes(index) || matchedCards.includes(card) || showCards ? 'flipped' : ''}`}
            onClick={() => flipCard(index)}
          >
            {showCards || flippedCards.includes(index) || matchedCards.includes(card) ? card : "?"}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemoryGame;
