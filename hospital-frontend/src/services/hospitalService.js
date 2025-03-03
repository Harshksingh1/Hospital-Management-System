import axios from "axios";

const API_URL = "http://localhost:5000/api/hospitals"; // Change port if needed

// Get all hospitals
export const getHospitals = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching hospitals:", error);
    return [];
  }
};

// Add a hospital
export const addHospital = async (hospitalData) => {
  try {
    const response = await axios.post(API_URL, hospitalData);
    return response.data;
  } catch (error) {
    console.error("Error adding hospital:", error);
    return null;
  }
};

// Get hospital details
export const getHospitalById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching hospital details:", error);
    return null;
  }
};

// Delete hospital
export const deleteHospital = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Error deleting hospital:", error);
  }
};
