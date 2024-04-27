import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Dashboard.css'; // Import the CSS file

const CustomizeSnake = () => {
  const [snakeColor, setSnakeColor] = useState('#000000'); // Default snake color
  const [foodColor, setFoodColor] = useState('#FF0000'); // Default food color

  const handleSnakeColorChange = (color) => {
    setSnakeColor(color);
  };

  const handleFoodColorChange = (color) => {
    setFoodColor(color);
  };

  const handleDoneButtonClick = () => {
    // Logic for handling the done button click
  };

  return (
    <div className="dashboard-container">
      <div className="header">
        <img src="logo.png" alt="Logo" className="logo" />
      </div>
      <div className="color-palette">
        <h2>Snake Color</h2>
        <input type="color" value={snakeColor} onChange={(e) => handleSnakeColorChange(e.target.value)} />
      </div>
      <div className="color-palette">
        <h2>Food Color</h2>
        <input type="color" value={foodColor} onChange={(e) => handleFoodColorChange(e.target.value)} />
      </div>
      <div className="button-container">
        <div className="button-row">
          <Link className="change-button" onClick={handleDoneButtonClick}>DONE</Link>
        </div>
      </div>
    </div>
  );
};

export default CustomizeSnake;
