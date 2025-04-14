// src/pages/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div>
            <h2>Welcome, {user?.username}</h2>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Home;
