import React, { useState } from "react";
import "./css/Signup.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setFormData({
      firstName: "",
      lastName: "",
      username: "",
      password: "",
    });
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
