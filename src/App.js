import React from 'react';
import Signup from './pages/Signup';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import Login from './pages/Login';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
