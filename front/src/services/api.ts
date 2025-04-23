// src/services/timetableService.ts
import { Timetable } from "../types/timetable";

const API_BASE_URL = "http://localhost:8080/api";

export const fetchTimetables = async (): Promise<Timetable[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/timetables`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      if (response.status === 403) {
        throw new Error("You don't have permission to access this resource");
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching timetables:", error);
    throw error;
  }
};
