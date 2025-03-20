import React, { useEffect, useState } from "react";
import { fetchThreats } from "../api/api";

const ThreatMap = () => {
  const [threats, setThreats] = useState([]);

  useEffect(() => {
    const getThreats = async () => {
      const data = await fetchThreats();
      setThreats(data);
    };
    getThreats();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Live Cyber Threats</h1>
      <ul className="mt-4">
        {threats.map((threat) => (
          <li key={threat.id} className="border p-4 rounded mb-2">
            <strong>{threat.type}</strong> - {threat.location} at {threat.timestamp}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThreatMap;
