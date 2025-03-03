import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function EditHospital() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hospital, setHospital] = useState({
    rating: "",
    image: "",
    description: "",
    images: [],
    numberOfDoctors: "",
    numberOfDepartments: "",
  });

  const [loading, setLoading] = useState(true);

  // Fetch existing hospital details
  useEffect(() => {
    const fetchHospitalDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/hospitals/details?id=${id}`);
        setHospital(response.data);
      } catch (error) {
        console.error("Error fetching hospital details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHospitalDetails();
  }, [id]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/v1/hospitals/update?id=${id}`, hospital);
      alert("Hospital details updated successfully!");
      navigate(`/hospital/${id}`);
    } catch (error) {
      console.error("Error updating hospital details:", error);
      alert("Failed to update hospital details.");
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    setHospital({ ...hospital, [e.target.name]: e.target.value });
  };

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-6 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Edit Hospital Details</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">Rating:</label>
          <input
            type="number"
            name="rating"
            value={hospital.rating}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Image URL:</label>
          <input
            type="text"
            name="image"
            value={hospital.image}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Description:</label>
          <textarea
            name="description"
            value={hospital.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          ></textarea>
        </div>

        <div>
          <label className="block font-semibold">Number of Doctors:</label>
          <input
            type="number"
            name="numberOfDoctors"
            value={hospital.numberOfDoctors}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Number of Departments:</label>
          <input
            type="number"
            name="numberOfDepartments"
            value={hospital.numberOfDepartments}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
          Update Hospital
        </button>
      </form>
    </div>
  );
}
