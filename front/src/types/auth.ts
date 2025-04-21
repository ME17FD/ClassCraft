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
    roles?: string[];
  }
  
  export interface User {
    id?: number;
    email: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    roles?: string[];
    // Add other user properties as needed
  }