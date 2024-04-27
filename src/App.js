import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Signup from './pages/Signup';
import Login from './pages/Login';
import CustomizeSnake from './pages/CustomizeSnake';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/play" element={<Dashboard />} />
        <Route path="/customize" element={<CustomizeSnake />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
