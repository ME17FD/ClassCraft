// src/types/auth.ts
export interface LoginRequest {
    email: string;
    password: string;
  }
  
  export interface SignupRequest {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    role?: string;
  }
  
  export interface User {
    id?: number;
    email: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    role?: string;
    // Add other user properties as needed
  }