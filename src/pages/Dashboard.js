import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Dashboard.css'; // Import the CSS file
import SnakeGameBoard from './SnakeGameBoard';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="header">
        <img src="logo1.png" alt="Logo" className="logo" />
      </div>
      <div className="game-board-container">
        <SnakeGameBoard />
      </div>
      {/* <div className="button-container">
        <Link className="play-button" to="/play">Play Game</Link>
      </div> */}
    </div>
  );
};

export default Dashboard;
