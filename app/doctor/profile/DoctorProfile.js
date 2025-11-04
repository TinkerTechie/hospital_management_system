"use client";
import { useState, useEffect } from "react";

export default function DoctorProfile() {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch doctor data on page load
  useEffect(() => {
    async function fetchDoctor() {
      const res = await fetch("/api/doctor");
      const data = await res.json();
      setDoctor(data[0]); // assuming only one doctor for demo
      setLoading(false);
    }
    fetchDoctor();
  }, []);

  if (loading) return <p>Loading...</p>;

  const handleUpdate = async () => {
    const res = await fetch("/api/doctor", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: doctor.id,
        fullName: doctor.fullName,
        specialization: doctor.specialization,
        yearsOfExperience: doctor.yearsOfExperience,
      }),
    });
    const data = await res.json();
    alert(data.message);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Doctor Profile</h2>
      <p><strong>Name:</strong> {doctor.fullName}</p>
      <p><strong>Specialization:</strong> {doctor.specialization}</p>
      <p><strong>Experience:</strong> {doctor.yearsOfExperience} years</p>

      <button
        onClick={handleUpdate}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Update Profile
      </button>
    </div>
  );
}
