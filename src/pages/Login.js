import React, { useState } from "react";
import "../css/Signup.css";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginResponse = await axios.post(
        "http://localhost:8080/users/login",
        {
          username: formData.username,
          password: formData.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Login successful:", loginResponse.data);

      // Fetch user ID after successful login
      const userIdResponse = await axios.get(
        `http://localhost:8080/users/getUserId?username=${formData.username}`
      );

      // Extract user ID from the response
      const userId = userIdResponse.data;

      // Navigate to the '/play' route with the user ID
      navigate(`/play/${userId}`);
      
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Login unsuccessful!");
    }
  };

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  return (
    <div className="signup-container">
      <div className="image-container">
        <div className="image">
          <img src="logo.png" alt="Snake" className="snake-image" />
        </div>
        <div className="logo">
          <img src="logo1.png" alt="Snake" className="snake-word" />
        </div>
      </div>
      <div className="signup-form">
        <p className="signupname">LOGIN</p>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              required
            />
          </div>
          <div>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
          </div>
          <p className="login-text">Doesn't have an account? 
            <span style={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={handleSignUpClick}>
              Sign Up
            </span>
          </p>
          <button type="submit">LOGIN</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
