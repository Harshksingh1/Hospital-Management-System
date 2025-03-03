import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddHospital() {
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    image: "",
    specialities: [],
    rating: "",
  });

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const specialityOptions = ["Cardiology", "Neurology", "Orthopedics", "Pediatrics", "Dermatology", "Oncology"];

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      specialities: checked
        ? [...prev.specialities, value]
        : prev.specialities.filter((spec) => spec !== value),
    }));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/v1/hospitals/create", {
        name: formData.name,
        city: formData.city,
        image: formData.image,
        specialities: formData.specialities,
        rating: parseFloat(formData.rating),
      });

      console.log("Hospital added:", response.data);
      alert("Hospital added successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error adding hospital:", error);
      alert("Failed to add hospital. Try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold text-center mb-4">Add a New Hospital</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="Hospital Name" className="w-full p-2 border rounded"
          value={formData.name} onChange={handleChange} required />

        <input type="text" name="city" placeholder="City" className="w-full p-2 border rounded"
          value={formData.city} onChange={handleChange} required />

        <input type="url" name="image" placeholder="Image URL" className="w-full p-2 border rounded"
          value={formData.image} onChange={handleChange} required />

        {/* Specialities Dropdown with Checkboxes */}
        <div className="relative">
          <button type="button" onClick={toggleDropdown} className="w-full p-2 border rounded bg-gray-100 text-left">
            Select Specialities
          </button>
          {dropdownOpen && (
            <div className="absolute w-full bg-white border rounded mt-1 p-2 shadow-lg max-h-40 overflow-y-auto">
              {specialityOptions.map((speciality) => (
                <label key={speciality} className="flex items-center space-x-2 p-1">
                  <input type="checkbox" value={speciality} checked={formData.specialities.includes(speciality)}
                    onChange={handleCheckboxChange} />
                  <span>{speciality}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        <input type="number" name="rating" placeholder="Rating (e.g., 4.3)" className="w-full p-2 border rounded"
          value={formData.rating} onChange={handleChange} required />

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Add Hospital
        </button>
      </form>
    </div>
  );
}
