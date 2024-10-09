import React, { useState, useEffect } from 'react';
import './FreeFlow.css';

const gridSize = 9; // Size of the grid
const colors = ['red', 'green', 'blue', 'yellow', 'purple', 'orange', 'cyan', 'magenta']; // Colors for the dots
const maxColors = Math.floor(gridSize * gridSize / 2); // Maximum pairs of dots

const FreeFlow = () => {
  const [level, setLevel] = useState(1);
  const [dotPositions, setDotPositions] = useState([]);
  const [dots, setDots] = useState(Array(gridSize * gridSize).fill(null));
  const [selectedDots, setSelectedDots] = useState([]);
  const [lines, setLines] = useState([]);
  const [completed, setCompleted] = useState(false);

  // Initialize dots and assign colors on mount
  useEffect(() => {
    startLevel(level);
  }, [level]);

  const startLevel = (level) => {
    const colorCount = Math.min(level, maxColors); // Increase colors based on level
    const positions = generateDotPositions(colorCount);
    const colorsAssigned = assignDotColors(colorCount);

    const initialDots = Array(gridSize * gridSize).fill(null);
    positions.forEach((pos, index) => {
      initialDots[pos] = colorsAssigned[index]; // Assign colors to specific positions
    });

    setDotPositions(positions);
    setDots(initialDots);
    setLines([]);
    setSelectedDots([]);
    setCompleted(false);
  };

  // Generate unique random positions for dots
  const generateDotPositions = (colorCount) => {
    const positions = new Set();
    // Two positions for each color
    while (positions.size < colorCount * 2) {
      const randomPosition = Math.floor(Math.random() * (gridSize * gridSize));
      positions.add(randomPosition);
    }
    return Array.from(positions);
  };

  const assignDotColors = (colorCount) => {
    const selectedColors = colors.slice(0, colorCount); // Select colors based on level
    const colorsArray = selectedColors.flatMap(color => [color, color]); // Create pairs of colors
    return colorsArray.sort(() => Math.random() - 0.5); // Shuffle colors
  };

  const handleDotClick = (index) => {
    const selectedColor = dots[index];

    // Logic for selecting dots and checking connections
    if (selectedDots.length === 0 && selectedColor) {
      setSelectedDots([index]);
    } else if (selectedDots.length === 1) {
      // Only connect if the colors match
      if (dots[selectedDots[0]] === selectedColor) {
        setSelectedDots([...selectedDots, index]);
        setLines([...lines, { from: selectedDots[0], to: index }]);
        setSelectedDots([]);
        checkCompletion([...selectedDots, index]);
      } else {
        setSelectedDots([]);
      }
    }
  };

  const checkCompletion = (connectedDots) => {
    const colorsUsed = new Set(connectedDots.map(dot => dots[dot]));
    if (colorsUsed.size === new Set(dots.filter(dot => dot !== null)).size) {
      setCompleted(true);
      setTimeout(() => {
        setLevel(level + 1); // Move to the next level after a delay
      }, 2000); // Delay for 2 seconds before advancing
    }
  };

  const renderGrid = () => {
    return (
      <div className="grid">
        {dots.map((color, index) => (
          <div
            key={index}
            className={`dot ${lines.some(line => line.from === index || line.to === index) ? 'connected' : ''} ${selectedDots.includes(index) ? 'selected' : ''}`}
            style={{ backgroundColor: color || 'transparent' }} // Transparent if no dot
            onClick={() => handleDotClick(index)}
          />
        ))}
        {/* Drawing lines between connected dots */}
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
      {renderGrid()}
      {completed && <div className="completion-message">Congratulations! Level {level} completed!</div>}
    </div>
  );
};

// Line component to draw lines between dots
const Line = ({ from, to }) => {
  const dotSize = 60; // Size of the dots
  const offset = 10; // Offset for alignment

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
