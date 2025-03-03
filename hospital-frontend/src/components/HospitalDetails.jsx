import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function HospitalDetails() {
  const { id } = useParams();
  const navigate = useNavigate(); // Add navigation hook
  const [hospital, setHospital] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHospitalDetails = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/hospitals/details?id=${id}`);
        setHospital(response.data);
      } catch (error) {
        console.error("Error fetching hospital details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHospitalDetails();
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this hospital?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/v1/hospitals/delete?id=${id}`);
      alert("Hospital deleted successfully");
      navigate("/"); // Redirect to home page after deletion
    } catch (error) {
      console.error("Error deleting hospital:", error);
      alert("Failed to delete hospital");
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (!hospital) {
    return <p className="text-center mt-10 text-red-500">Hospital not found.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-6 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center">{hospital.name}</h2>
      <img src={hospital.image} alt={hospital.name} className="w-full h-64 object-cover mt-4 rounded" />
      <p className="text-gray-600 mt-2">📍 {hospital.city}</p>
      <p className="text-yellow-500">⭐ {hospital.rating}</p>

      <h3 className="text-lg font-semibold mt-4">Specialities:</h3>
      <ul className="list-disc ml-6 text-gray-700">
        {hospital.speciality.map((spec, index) => (
          <li key={index}>{spec}</li>
        ))}
      </ul>

      <h3 className="text-lg font-semibold mt-4">Description:</h3>
      <p className="text-gray-700">{hospital.description || "No description available."}</p>

      <h3 className="text-lg font-semibold mt-4">Additional Images:</h3>
      <div className="grid grid-cols-2 gap-2">
        {hospital.images?.map((img, index) => (
          <img key={index} src={img} alt="Hospital" className="w-full h-32 object-cover rounded" />
        ))}
      </div>

      <h3 className="text-lg font-semibold mt-4">Doctors & Departments:</h3>
      <p className="text-gray-700">👨‍⚕️ {hospital.numberOfDoctors} doctors</p>
      <p className="text-gray-700">🏥 {hospital.numberOfDepartments} departments</p>

      {/* Edit Button */}
      <button 
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={() => navigate(`/edit-hospital/${id}`)}
      >
        Edit Hospital
      </button>
      {/* Delete Button */}
      <button
        onClick={handleDelete}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Delete Hospital
      </button>
    </div>
  );
}
