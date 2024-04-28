import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import '../css/CustomizeSnake.css'; 
import { useParams } from "react-router-dom";

const CustomizeSnake = () => {
  const [snakeColor, setSnakeColor] = useState('#0000FF'); 
  const [foodColor, setFoodColor] = useState('#FF0000'); 
  const { userId } = useParams();
  const navigate = useNavigate(); 

  useEffect(() => {
    // Fetch snake color
    axios.get(`http://localhost:8080/snake/getSnakeColor?userid=${userId}`)
      .then(response => {
        setSnakeColor(response.data);
      })
      .catch(error => {
        console.error('Error fetching snake color:', error);
      });

    // Fetch food color
    axios.get(`http://localhost:8080/food/getFoodColor?userid=${userId}`)
      .then(response => {
        setFoodColor(response.data);
      })
      .catch(error => {
        console.error('Error fetching food color:', error); 
      });
  }, [userId]);

  const handleSnakeColorChange = (color) => {
    setSnakeColor(color);
  };

  const handleFoodColorChange = (color) => {
    setFoodColor(color);
  };

  const handleDoneButtonClick = () => {
    axios.put(`http://localhost:8080/snake/updateColor`, { userid: userId, snakecolor: snakeColor })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error updating snake color:', error);
      });

    axios.put(`http://localhost:8080/food/updateColor`, { userid: userId, foodcolor: foodColor })
      .then(response => {
        console.log(response.data);
        navigate(`/play/${userId}`);
      })
      .catch(error => {
        console.error('Error updating food color:', error); 
      });
  };

  return (
    <div className="customize-snake-container">
      <div className="header">
        <img src="/logo.png" alt="Logo" className="logo" />
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
