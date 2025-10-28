"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import AdminSidebar from "./AdminSidebar";

export default function AdminDashboard() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/doctors")
      .then((res) => {
        setDoctors(res.data);
        setLoading(false);
      })
      .catch(() => {
        Swal.fire("Error", "Failed to fetch doctor data", "error");
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold text-blue-600 mb-8">Admin Dashboard</h1>

        {loading ? (
          <p className="text-gray-500 animate-pulse">Loading doctor data...</p>
        ) : doctors.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.map((doc) => (
              <div
                key={doc.id}
                className="bg-white shadow-md rounded-xl p-6 border hover:shadow-lg transition"
              >
                <h2 className="text-lg font-semibold text-gray-800">{doc.fullName}</h2>
                <p className="text-sm text-gray-600">{doc.specialization}</p>
                <p className="text-sm text-gray-600 mt-1">
                  Experience: {doc.yearsOfExperience} years
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No doctor data found.</p>
        )}
      </main>
    </div>
  );
}
