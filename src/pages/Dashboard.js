import React from "react";
import "../css/Dashboard.css"; 
import SnakeGameBoard from "./SnakeGameBoard";
import { useNavigate, useParams } from "react-router-dom";


const Dashboard = () => {
  const navigate = useNavigate();
  const { userId } = useParams(); 

  const handleCustomizeClick = () => {
    navigate(`/customize/${userId}`); 
  };

  const handleLogoutClick = () => {
    navigate("/");
  };


  return (
    <div className="dashboard-container">
      <div className="header">
        <img src="..\images\logo.png" alt="Logo" className="logo" />
        <img
          src="../images/logout.png"
          alt="Logout"
          className="logo1"
          onClick={handleLogoutClick}
        />
      </div>
      <div className="game-board-container">
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
