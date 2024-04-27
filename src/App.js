// import React from 'react';
// import Signup from './pages/Signup';
// import { BrowserRouter,Routes, Route } from 'react-router-dom';
// import Login from './pages/Login';
// import Dashboard from './pages/Dashboard';


// function App() {
//   return (
//     // <BrowserRouter>
//     // <Routes>
//     //   <Route path="/" element={<Login />} />
//     //   <Route path="/signup" element={<Signup />} />
//     // </Routes>
//     // </BrowserRouter>
//     <>
//     <Dashboard />
//     </>
//   );
// }

// export default App;
import React from 'react';
import { createRoot } from 'react-dom/client';
import Dashboard from './pages/Dashboard';

function App() {
  // Use either ReactDOM.render() or ReactDOM.createRoot(), not both
  // In this example, I'll use ReactDOM.render()
  // Make sure to replace 'root' with the ID of your container element
  return (
    <React.StrictMode>
      <Dashboard />
    </React.StrictMode>
  );
}

export default App;

