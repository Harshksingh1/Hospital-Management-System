import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Hospital Management</h1>
        <div className="space-x-4">
          <Link to="/" className="hover:text-gray-300">Home</Link>
          <Link to="/hospitals" className="hover:text-gray-300">Hospitals</Link>
          <Link to="/add-hospital" className="hover:text-gray-300">Add Hospital</Link>
        </div>
      </div>
    </nav>
  );
}
