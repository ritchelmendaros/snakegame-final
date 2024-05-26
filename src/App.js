import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Signup from './pages/Signup';
import Login from './pages/Login';
import CustomizeSnake from './pages/CustomizeSnake';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/play/:userId" element={<Dashboard />} />
      <Route path="/customize/:userId" element={<CustomizeSnake />} />
    </Routes>
  );
}

export default App;
