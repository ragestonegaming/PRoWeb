// src/components/Navbar.js
import React from 'react';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1>NERS</h1>
      </div>
      <ul className="navbar-links">
        <li><a href="/">Home</a></li>
        <li><a href="/games">Games</a></li>
        <li><a href="/music">Music</a></li>
        <li><a href="/about">About Us</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;

