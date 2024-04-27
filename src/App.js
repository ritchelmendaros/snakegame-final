import React from 'react';
import Signup from './pages/Signup';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';


function App() {
  return (
    // <BrowserRouter>
    // <Routes>
    //   <Route path="/" element={<Login />} />
    //   <Route path="/signup" element={<Signup />} />
    // </Routes>
    // </BrowserRouter>
    <>
    <Dashboard />
    </>
  );
}

export default App;
