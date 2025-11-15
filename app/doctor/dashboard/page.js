"use client";
import { useEffect, useState } from "react";

export default function DoctorDashboard() {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchDoctor() {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || user.role !== "DOCTOR") {
          window.location.href = "/auth";
          return;
        }

        const res = await fetch("/api/doctors");
        if (!res.ok) throw new Error("Failed to fetch doctor data");

        const data = await res.json();
        console.log("Doctor data:", data);

        // Support both array or single-object responses
        setDoctor(Array.isArray(data) ? data[0] : data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchDoctor();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;
  if (!doctor) return <p>No doctor data found.</p>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-semibold mb-4">
        Welcome, Dr. {doctor.fullName || "Name not available"}
      </h1>
      <p><strong>Specialization:</strong> {doctor.specialization || "N/A"}</p>
      <p><strong>Email:</strong> {doctor.email || "N/A"}</p>
    </div>
  );
}
