// src/services/AuthService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth/';

class AuthService {
  constructor() {
    this.api = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor for token injection
    this.api.interceptors.request.use(
      config => {
        const token = this.getCurrentUser()?.token;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );
  }

  async login(username, password) {
    try {
      const response = await this.api.post('signin', { username, password });
      
      if (response.data.accessToken) {
        this.storeUserData({
          ...response.data,
          token: response.data.accessToken // Map to token for consistency
        });
      }
      return response.data;
    } catch (error) {
      this.handleAuthError(error);
      throw error;
    }
  }

  async signup(username, email, password, role) {
    try {
      const response = await this.api.post('signup', {
        username,
        email,
        password,
        roles: [role] // Maintain array format for Spring Security
      });
      return response.data;
    } catch (error) {
      this.handleAuthError(error);
      throw error;
    }
  }

  logout() {
    localStorage.removeItem('user');
  }

  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  storeUserData(userData) {
    localStorage.setItem('user', JSON.stringify({
      username: userData.username,
      email: userData.email,
      roles: userData.roles,
      token: userData.token || userData.accessToken
    }));
  }

  handleAuthError(error) {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          this.logout();
          break;
        case 403:
          // Handle forbidden access
          break;
        default:
          break;
      }
    }
    return error;
  }
}

export default new AuthService();