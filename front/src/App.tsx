// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import SchemaViewer from './component/ui/SchemaViewer';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} /> // Default to login page
        <Route path="/dashboard" element={<SchemaViewer />} /> // Default to login page
      </Routes>
    </Router>
  );
};

export default App;
