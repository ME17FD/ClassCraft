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
      withCredentials: true
    });
  }

  async login(email, password) {
    try {
      const response = await this.api.post('signin', { 
        email, 
        password 
      });
      
      if (response.data) {
        this.storeUserData(response.data);
      }
      return response.data;
    } catch (error) {
      this.handleAuthError(error);
      throw error;
    }
  }

  async signup(firstName, lastName, email, password, role) {
    try {
      const response = await this.api.post('signup', {
        firstName,
        lastName,
        email,
        password,
        roles: [role]
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
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      roles: userData.roles,
      id: userData.id
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