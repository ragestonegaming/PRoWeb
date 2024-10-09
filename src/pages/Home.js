// src/pages/Home.js
import React from 'react';

import Card from '../components/Card';
import './Home.css';

function Home() {
  return (
    <div className="home">
      
      <div className="home-cards">
        <Card title="Games" description="Play stress-relieving games" />
        <Card title="Chatbot" description="Talk to NERS bot" />
        <Card title="Music" description="Listen to calming music" />
      </div>
    </div>
  );
}

export default Home;
