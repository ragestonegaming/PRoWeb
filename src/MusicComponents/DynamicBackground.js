import React from 'react';
import './DynamicBackground.css'; // Add CSS styles for background

const DynamicBackground = ({ mood }) => {
  let backgroundStyle = {};

  switch (mood) {
    case 'calm':
      backgroundStyle = { background: 'linear-gradient(to bottom, #6a85b6, #bac8e0)' };
      break;
    case 'relaxed':
      backgroundStyle = { background: 'linear-gradient(to bottom, #b3e5fc, #03a9f4)' };
      break;
    case 'focused':
      backgroundStyle = { background: 'linear-gradient(to bottom, #c8e6c9, #388e3c)' };
      break;
    case 'uplifted':
      backgroundStyle = { background: 'linear-gradient(to bottom, #ffd54f, #ffeb3b)' };
      break;
    default:
      backgroundStyle = { background: 'linear-gradient(to bottom, #ffffff, #eeeeee)' };
  }

  return <div className="dynamic-background" style={backgroundStyle}></div>;
};

export default DynamicBackground;
