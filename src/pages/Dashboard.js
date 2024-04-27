import React from "react";
import "../css/Dashboard.css"; // Import the CSS file
import SnakeGameBoard from "./SnakeGameBoard";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleCustomizeClick = () => {
    navigate("/customize");
  };

  return (
    <div className="dashboard-container">
      <div className="header">
        <img src="logo.png" alt="Logo" className="logo" />
      </div>
      <div className="game-board-container">
        <SnakeGameBoard />
      </div>
      <div className="button-container">
        <div className="button-row">
          <button className="change-button" onClick={handleCustomizeClick}>
            Customize Snake
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
