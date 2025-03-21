import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between">
        <h1 className="text-xl font-bold">Threat Mesh</h1>
        <div className="space-x-4">
          <Link to="/" className="hover:text-gray-300">Home</Link>
          <Link to="/threat-map" className="hover:text-gray-300">Threat Map</Link>
          <Link to="/report" className="hover:text-gray-300">Report Threat</Link>
          <Link to="/login" className="hover:text-gray-300">Login</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
