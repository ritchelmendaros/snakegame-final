import React, { useState } from 'react';
import '../css/Signup.css'; 
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Signup() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("Name:", name);
    console.log("Value:", value);
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const registerResponse = await axios.post(
        "http://localhost:8080/users/register",
        {
          firstname: formData.firstName,
          lastname: formData.lastName,
          username: formData.username,
          password: formData.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      console.log("User registered successfully:", registerResponse.data);
      navigate("/");
    } catch (error) {
      console.error("Error registering user:", error);
      alert("Error registering user: " + error.message);
    }
  };
  

  const handleLoginClick = () => {
    navigate('/');
  };

  return (
    <div className="signup-container">
      <div className="image-container">
        <div className="image">
          <img src='logo.png' alt="Snake" className="snake-image" />
        </div>
        <div className="logo">
          <img src='logo1.png' alt="Snake" className="snake-word" />
        </div>
      </div>
      <div className="signup-form">
        <p className='signupname'>SIGN UP</p>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              required
            />
          </div>
          <div>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              required
            />
          </div>
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
          <p className="login-text">Have an account? 
            <span style={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={handleLoginClick}>
              Login
            </span>
          </p>
          <button type="submit">SIGN UP</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
