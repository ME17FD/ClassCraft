// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/LoginForm';
import Signup from './pages/SignupForm';
import Home from './pages/Home';
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <h1>ClassCraft</h1>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/" element={<Login />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
