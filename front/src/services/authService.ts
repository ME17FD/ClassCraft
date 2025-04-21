// src/services/authService.ts
import { LoginRequest, SignupRequest, User } from "../types/auth";

const API_BASE_URL = "http://localhost:8080/api/auth"; // Adjust to your backend URL

export const login = async (loginData: LoginRequest): Promise<User> => {
  try {
    // Basic client-side validation
    if (!loginData.email || !loginData.email.includes("@")) {
      throw new Error("Please enter a valid email address");
    }

    if (!loginData.password || loginData.password.length < 6) {
      throw new Error("Password must be at least 6 characters");
    }

    const response = await fetch("http://localhost:8080/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: loginData.email.trim(),
        password: loginData.password,
      }),
    });

    if (!response.ok) {
      // Handle different error statuses
      const errorData = await response.json().catch(() => ({}));

      if (response.status === 400) {
        // Bad Request - usually validation errors
        const errorMsg =
          errorData.message ||
          (errorData.errors
            ? Object.values(errorData.errors).join(", ")
            : "Invalid request");
        throw new Error(errorMsg);
      } else if (response.status === 401) {
        // Unauthorized
        throw new Error(errorData.message || "Invalid email or password");
      } else if (response.status === 500) {
        // Server error
        throw new Error(
          errorData.message || "Server error. Please try again later."
        );
      } else {
        throw new Error(errorData.message || "Login failed");
      }
    }

    // Successful login
    const userData = await response.json();

    // Optionally store user data or token
    localStorage.setItem("user", JSON.stringify(userData));

    return userData;
  } catch (error) {
    console.error("Login error:", error);
    throw error instanceof Error ? error : new Error("Login failed");
  }
};

// Update your authService.ts to ensure all required fields are sent
export const register = async (signupData: SignupRequest): Promise<User> => {
  const response = await fetch(`${API_BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: signupData.email.trim(),
      password: signupData.password,
      firstName: signupData.firstName || "",
      lastName: signupData.lastName || "",
      phone: signupData.phone || "",
      roles: signupData.roles || ["ROLE_PROFESSOR"],
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));

    const message = errorData.message || "Registration failed";
    throw new Error(message);
  }

  const userData: User = await response.json();
  localStorage.setItem("user", JSON.stringify(userData));

  return userData; // ✅ return a User
};
