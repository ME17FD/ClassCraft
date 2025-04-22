// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './component/ui/Login';
import Register from './component/ui/Register';
import SchemaViewer from './component/ui/SchemaViewer';
import { AuthProvider } from './context/AuthContext'; // ← import AuthProvider

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<SchemaViewer />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
