import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Dashboard.css'; // Import the CSS file

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="header">
        <img src="snake_logo.png" alt="Logo" className="logo" />
      </div>
      <h1 className="title">SnakeDash Dashboard</h1>
      <div className="button-container">
        <Link className="play-button" to="/play">Play Game</Link>
      </div>
    </div>
  );
};

export default Dashboard;
