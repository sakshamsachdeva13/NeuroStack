import React from 'react';
import Layout from './Layout/Layout';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import  Dashboard  from './pages/Dashboard/Dashboard';

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          
          {/* Add more routes as needed */}
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
