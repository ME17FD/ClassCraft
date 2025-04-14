// src/AuthService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth/';

const signup = (username, email, password, role) => {
    return axios.post(API_URL + 'signup', {
        username,
        email,
        password,
        roles: [role] // Changed to array to match Spring Security conventions
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

const login = (username, password) => {
    return axios.post(API_URL + 'signin', {
        username,
        password
    });
};

export default {
    signup,
    login
};