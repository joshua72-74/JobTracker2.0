import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';

// Import PrivateRoute component (create it as shown below)
import PrivateRoute from './components/PrivateRoute';
// Import your Dashboard component (create Dashboard.js in components folder)
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        
        {/* Private route protecting Dashboard */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* Public home page */}
        <Route path="/" element={<h1>Welcome to JobTracker2.0</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
