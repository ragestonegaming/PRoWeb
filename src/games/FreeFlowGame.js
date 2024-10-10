import React, { useState, useEffect } from 'react';
import './FreeFlow.css';

const gridSize = 9;
const maxColorPairs = 40;
const colors = [
  'red', 'green', 'blue', 'yellow', 'purple', 'orange', 'cyan', 'magenta',
  'pink', 'lime', 'teal', 'brown', 'maroon', 'olive', 'navy', 'violet',
  'turquoise', 'coral', 'gold', 'indigo', 'plum', 'salmon', 'aqua', 'khaki',
  'lavender', 'peach', 'mint', 'azure', 'beige', 'ivory', 'orchid', 'amber',
  'mustard', 'fuchsia', 'bronze', 'cream', 'rust', 'jade', 'chartreuse', 'denim'
];

const FreeFlow = () => {
  const [level, setLevel] = useState(1);
  const [dots, setDots] = useState(Array(gridSize * gridSize).fill(null));
  const [selectedDots, setSelectedDots] = useState([]);
  const [lines, setLines] = useState([]);
  const [completed, setCompleted] = useState(false);
  const [timer, setTimer] = useState(5); // Initial time for level 1
  const [gameOver, setGameOver] = useState(false); // Track game over state
  const [gameStarted, setGameStarted] = useState(false); // Track game started state

  useEffect(() => {
    if (gameStarted && timer > 0) {
      const timerId = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timerId);
            setGameOver(true);
            return 0; // Ensure timer does not go negative
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timerId); // Clear timer on unmount
    }
  }, [gameStarted, timer]);

  const startLevel = (level) => {
    const colorCount = Math.min(level, maxColorPairs);
    const positions = generateDotPositions(colorCount);
    const colorsAssigned = assignDotColors(colorCount);

    const initialDots = Array(gridSize * gridSize).fill(null);
    positions.forEach((pos, index) => {
      initialDots[pos] = colorsAssigned[index];
    });

    setDots(initialDots);
    setLines([]);
    setSelectedDots([]);
    setCompleted(false);
    setTimer(level * 5); // Set timer based on level (5 seconds per level)
    setGameOver(false); // Reset game over state
  };

  const generateDotPositions = (colorCount) => {
    const positions = new Set();
    while (positions.size < colorCount * 2) {
      const randomPosition = Math.floor(Math.random() * (gridSize * gridSize));
      positions.add(randomPosition);
    }
    return Array.from(positions);
  };

  const assignDotColors = (colorCount) => {
    const selectedColors = colors.slice(0, colorCount);
    const colorsArray = selectedColors.flatMap(color => [color, color]);
    return colorsArray.sort(() => Math.random() - 0.5);
  };

  const handleDotClick = (index) => {
    if (!gameStarted) return; // Prevent dot click if game has not started

    const selectedColor = dots[index];

    if (selectedDots.length === 0 && selectedColor) {
      setSelectedDots([index]);
    } else if (selectedDots.length === 1) {
      if (dots[selectedDots[0]] === selectedColor) {
        const newLines = [...lines, { from: selectedDots[0], to: index }];
        setLines(newLines);
        setSelectedDots([]);
        checkCompletion(newLines);
      } else {
        setSelectedDots([]);
      }
    }
  };

  const checkCompletion = (newLines) => {
    const uniqueColors = new Set(dots.filter(dot => dot !== null));
    const connectedColors = new Set(newLines.map(line => dots[line.from]));

    if (uniqueColors.size === connectedColors.size) {
      setCompleted(true);
      setGameStarted(false); // Stop the game when level is completed
    }
  };

  const resetGame = () => {
    setLevel(1);
    setTimer(5); // Reset timer to 5 seconds for level 1
    startLevel(1);
  };

  const handleStart = () => {
    setGameStarted(true); // Set game as started
    startLevel(level); // Start the first level
  };

  const handleNextLevel = () => {
    setLevel((prevLevel) => prevLevel + 1);
    setTimer((prevLevel) => (prevLevel + 1) * 5); // Increase timer for next level
    startLevel(level + 1);
    setGameStarted(true); // Start the new level
  };

  const renderGrid = () => {
    return (
      <div className="grid">
        {dots.map((color, index) => (
          <div
            key={index}
            className={`dot ${lines.some(line => line.from === index || line.to === index) ? 'connected' : ''} ${selectedDots.includes(index) ? 'selected' : ''}`}
            style={{ backgroundColor: color || 'transparent' }}
            onClick={() => handleDotClick(index)}
          />
        ))}
        {lines.map((line, index) => (
          <Line key={index} from={line.from} to={line.to} />
        ))}
      </div>
    );
  };

  return (
    <div className="free-flow-game">
      <h1>Free Flow Game</h1>
      <h2>Level: {level}</h2>
      <h3>Time Left: {timer} seconds</h3>
      {!gameStarted && !gameOver && <button onClick={handleStart}>Start</button>}
      {completed && !gameOver && (
        <div className="completion-message">
          <p>Congratulations! Level {level} completed!</p>
          <button onClick={handleNextLevel}>Next Level</button>
        </div>
      )}
      {gameOver && (
        <div className="game-over-message">
          <p>Better luck next time!</p>
          <button onClick={resetGame}>Retry</button>
        </div>
      )}
      {renderGrid()}
    </div>
  );
};

// Line component to draw lines between dots
const Line = ({ from, to }) => {
  const dotSize = 60;
  const offset = 10;

  const fromX = (from % gridSize) * (dotSize + offset) + dotSize / 2;
  const fromY = Math.floor(from / gridSize) * (dotSize + offset) + dotSize / 2;
  const toX = (to % gridSize) * (dotSize + offset) + dotSize / 2;
  const toY = Math.floor(to / gridSize) * (dotSize + offset) + dotSize / 2;

  return (
    <svg className="line" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}>
      <line x1={fromX} y1={fromY} x2={toX} y2={toY} stroke="white" strokeWidth="5" />
    </svg>
  );
};

export default FreeFlow;
