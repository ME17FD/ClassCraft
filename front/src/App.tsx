// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./component/ui/Login";
import Register from "./component/ui/Register";
import SchemaViewer from "./component/ui/SchemaViewer";
import Dashboardp from "./component/ui/ProfessorDashboard";
import Dashboarda from "./component/ui/AdminDashboard";
import Dashboarde from "./component/ui/StudentDashboard";
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} /> // Default to login page
        <Route path="/dashboard" element={<SchemaViewer />} />
        <Route path="/dashboardp" element={<Dashboardp />} />
        <Route path="/dashboarda" element={<Dashboarda />} />
        <Route path="/dashboarde" element={<Dashboarde />} />
        // Default to login page
      </Routes>
    </Router>
  );
};

export default App;
