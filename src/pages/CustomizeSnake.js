import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/CustomizeSnake.css'; 

const CustomizeSnake = () => {
  const [snakeColor, setSnakeColor] = useState('#0000FF'); 
  const [foodColor, setFoodColor] = useState('#FF0000'); 

  const handleSnakeColorChange = (color) => {
    setSnakeColor(color);
  };

  const handleFoodColorChange = (color) => {
    setFoodColor(color);
  };

  const handleDoneButtonClick = () => {
    
  };

  return (
    <div className="customize-snake-container">
      <div className="header">
        <img src="logo.png" alt="Logo" className="logo" />
      </div>
      <div className="content-container">
        <div className="color-box">
          <h2>Snake Color</h2>
          <div className="color-palette">
            <input type="color" value={snakeColor} onChange={(e) => handleSnakeColorChange(e.target.value)} />
          </div>
        </div>
        <div className="color-box">
          <h2>Food Color</h2>
          <div className="color-palette">
            <input type="color" value={foodColor} onChange={(e) => handleFoodColorChange(e.target.value)} />
          </div>
        </div>
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
