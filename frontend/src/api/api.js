import axios from "axios";

const API_URL = "http://localhost:5000/api"; // Replace with your backend URL

// Fetch all threats
export const fetchThreats = async () => {
  try {
    const response = await axios.get(`${API_URL}/threats`);
    return response.data;
  } catch (error) {
    console.error("Error fetching threats:", error);
    return [];
  }
};

// Report a new threat
export const reportThreat = async (threatData) => {
  try {
    const response = await axios.post(`${API_URL}/threats`, threatData);
    return response.data;
  } catch (error) {
    console.error("Error reporting threat:", error);
    throw error;
  }
};
