import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function HospitalsList() {
  const [hospitals, setHospitals] = useState([]);
  const [searchCity, setSearchCity] = useState("");

  useEffect(() => {
    fetchHospitals();
  }, []);

  const fetchHospitals = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/v1/hospitals");
      setHospitals(response.data);
    } catch (error) {
      console.error("Error fetching hospitals:", error);
    }
  };

  const handleSearch = async () => {
    if (!searchCity.trim()) {
      fetchHospitals(); // If empty, fetch all hospitals
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/api/v1/hospitals?city=${searchCity}`);
      setHospitals(response.data);
    } catch (error) {
      console.error("Error searching hospitals:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-6">
      <h2 className="text-2xl font-bold text-center mb-4">🏥 Hospital List</h2>

      {/* 🔍 Search Bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search by City"
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
          className="p-2 border rounded-l w-64"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 rounded-r"
        >
          Search
        </button>
      </div>

      {/* 🏥 Hospital List */}
      <div className="grid gap-6">
        {hospitals.length > 0 ? (
          hospitals.map((hospital) => (
            <div key={hospital._id} className="bg-white p-4 shadow rounded-lg">
              <h3 className="text-xl font-semibold">{hospital.name}</h3>
              <p className="text-gray-600">📍 {hospital.city}</p>
              <p className="text-yellow-500">⭐ {hospital.rating}</p>
              <Link
                to={`/hospital/${hospital._id}`}
                className="text-blue-500 mt-2 inline-block"
              >
                View Details →
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No hospitals found.</p>
        )}
      </div>
    </div>
  );
}
