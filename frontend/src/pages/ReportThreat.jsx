import React, { useState } from "react";
import { reportThreat } from "../api/api";

const ReportThreat = () => {
  const [formData, setFormData] = useState({
    type: "",
    location: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await reportThreat(formData);
      alert("Threat reported successfully!");
      setFormData({ type: "", location: "", description: "" });
    } catch (error) {
      alert("Failed to report threat");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Report a Threat</h1>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <input
          type="text"
          name="type"
          placeholder="Threat Type"
          value={formData.type}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ReportThreat;
