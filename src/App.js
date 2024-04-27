import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SnakeGameBoard from './pages/SnakeGameBoard';
import Dashboard from './pages/Dashboard';
import Signup from './pages/Signup';
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/snake-game" element={<SnakeGameBoard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
