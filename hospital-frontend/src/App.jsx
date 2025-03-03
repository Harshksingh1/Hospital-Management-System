import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HospitalsList from "./components/HospitalsList";
import AddHospital from "./components/AddHospital";
import HospitalDetails from "./components/HospitalDetails";
import EditHospital from "./components/EditHospital";
export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-blue-500 p-4 text-white">
          <div className="container mx-auto flex justify-between">
            <Link to="/" className="font-bold text-lg">🏥 Hospital System</Link>
            <div>
              <Link to="/" className="mr-4">Home</Link>
              <Link to="/add-hospital" className="mr-4">Add Hospital</Link>
            </div>
          </div>
        </nav>

        <div className="container mx-auto p-6">
          <Routes>
            <Route path="/" element={<HospitalsList />} />
            <Route path="/add-hospital" element={<AddHospital />} />
            <Route path="/hospital/:id" element={<HospitalDetails />} />
            <Route path="/edit-hospital/:id" element={<EditHospital />} />

          </Routes>
        </div>
      </div>
    </Router>
  );
}
