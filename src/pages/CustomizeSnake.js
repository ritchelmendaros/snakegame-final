import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../css/CustomizeSnake.css";

const CustomizeSnake = () => {
  const [snakeColor, setSnakeColor] = useState("#0000FF");
  const [foodColor, setFoodColor] = useState("#FF0000");
  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = sessionStorage.getItem('userId');
    if (!storedUserId || storedUserId !== userId) {
      navigate("/");
    }

    // Fetch snake color
    axios
      .get(`http://localhost:8080/snake/getSnakeColor?userid=${userId}`)
      .then((response) => {
        setSnakeColor(response.data);
      })
      .catch((error) => {
        console.error("Error fetching snake color:", error);
      });

    // Fetch food color
    axios
      .get(`http://localhost:8080/food/getFoodColor?userid=${userId}`)
      .then((response) => {
        setFoodColor(response.data);
      })
      .catch((error) => {
        console.error("Error fetching food color:", error);
      });
  }, [navigate, userId]);

  const handleSnakeColorChange = (color) => {
    setSnakeColor(color);
  };

  const handleFoodColorChange = (fruit) => {
    let imagePath;
    switch (fruit) {
      case "apple":
        imagePath = "../images/apple.png";
        break;
      case "watermelon":
        imagePath = "../images/watermelon.png";
        break;
      case "pineapple":
        imagePath = "../images/pineapple.png";
        break;
      case "orange":
        imagePath = "../images/orange.png";
        break;
      case "mango":
        imagePath = "../images/mango.png";
        break;
      default:
        imagePath = "../images/default.png";
    }
    setFoodColor(imagePath);
  };

  const handleDoneButtonClick = () => {
    axios
      .put(`http://localhost:8080/snake/updateColor`, {
        userid: userId,
        snakecolor: snakeColor,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error updating snake color:", error);
      });

    axios
      .put(`http://localhost:8080/food/updateColor`, {
        userid: userId,
        foodcolor: foodColor,
      })
      .then((response) => {
        console.log(response.data);
        navigate(`/play/${userId}`);
      })
      .catch((error) => {
        console.error("Error updating food color:", error);
      });
  };

  const handleLogoutClick = () => {
    sessionStorage.removeItem('userId');
    navigate("/");
  };

  return (
    <div className="customize-snake-container">
      <div className="header">
        <img src="../images/logo.png" alt="Logo" className="logo" />
        <img
          src="../images/logout.png"
          alt="Logout"
          className="logo1"
          onClick={handleLogoutClick}
        />
      </div>
      <div className="content-container">
        <div className="color-box">
          <h2>Snake Color</h2>
          <div className="color-palette">
            <input
              type="color"
              value={snakeColor}
              onChange={(e) => handleSnakeColorChange(e.target.value)}
            />
          </div>
        </div>
        <div className="color-box">
          <h2>Choose Food</h2>
          <div className="color-palette select-wrapper">
            <select
              value={foodColor}
              onChange={(e) => handleFoodColorChange(e.target.value)}
            >
              <option value="None">Choose a fruit</option>
              <option value="apple">Apple</option>
              <option value="watermelon">Watermelon</option>
              <option value="pineapple">Pineapple</option>
              <option value="orange">Orange</option>
              <option value="mango">Mango</option>
            </select>
          </div>
        </div>
      </div>
      <div className="button-container">
        <div className="button-row">
          <Link className="change-button" onClick={handleDoneButtonClick}>
            DONE
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CustomizeSnake;
