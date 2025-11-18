"use client";

import React, { useState, useEffect } from "react";
import NurseDashboardSidebar from "../../components/nurse/NurseDashboardSidebar";

// Placeholder profile picture
const profilePic = "https://placehold.co/100x100/0D9488/FFFFFF?text=N";

export default function NurseDashboardPage() {
  const [userName, setUserName] = useState("Loading...");

  useEffect(() => {
    // Load logged-in user from localStorage
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setUserName(user.name || "Nurse");
      }
    }
  }, []);

  return (
    <section className="bg-slate-100 min-h-screen flex">
      {/* LEFT SIDEBAR */}
      <NurseDashboardSidebar userName={userName} profilePic={profilePic} />

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6 md:p-10">
        
        <h1 className="font-bold text-3xl text-gray-800 mb-8">
          Welcome, {userName}
        </h1>

        {/* TRIAGE QUEUE */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Today&apos;s Triage Queue
          </h2>

          <p className="text-gray-600 mb-4">
            3 patients waiting for triage.
          </p>

          {/* Example cards (you can replace with dynamic data later) */}
          <div className="space-y-3">
            <div className="p-4 bg-gray-50 border rounded-lg shadow-sm">
              <p className="font-medium text-gray-800">Patient #1</p>
              <p className="text-gray-500 text-sm">High Fever | Waiting: 10 min</p>
            </div>

            <div className="p-4 bg-gray-50 border rounded-lg shadow-sm">
              <p className="font-medium text-gray-800">Patient #2</p>
              <p className="text-gray-500 text-sm">Minor Injury | Waiting: 5 min</p>
            </div>

            <div className="p-4 bg-gray-50 border rounded-lg shadow-sm">
              <p className="font-medium text-gray-800">Patient #3</p>
              <p className="text-gray-500 text-sm">Headache | Waiting: 2 min</p>
            </div>
          </div>
        </div>

      </main>
    </section>
  );
}
