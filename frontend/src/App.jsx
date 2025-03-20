import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ThreatMap from "./pages/ThreatMap";
// import ReportThreat from "./pages/ReportThreat";
// import Login from "./pages/Login";

function App() {
  return (
    
    <Router>
      <h1>hello</h1>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/threat-map" element={<ThreatMap />} />
        <Route path="/report" element={<ReportThreat />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
