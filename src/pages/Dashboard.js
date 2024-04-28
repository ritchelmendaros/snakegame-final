import React from "react";
import "../css/Dashboard.css"; // Import the CSS file
import SnakeGameBoard from "./SnakeGameBoard";
import { useNavigate, useParams } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const { userId } = useParams(); // Get the user ID from the route parameter

  const handleCustomizeClick = () => {
    navigate(`/customize/${userId}`); // Navigate to the customize route with userId as a parameter
  };

  return (
    <div className="dashboard-container">
      <div className="header">
        <img src="logo.png" alt="Logo" className="logo" />
      </div>
      <div className="game-board-container">
        {/* Pass the userId as a prop to the SnakeGameBoard component */}
        <SnakeGameBoard userId={userId} />
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
