/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable jsx-a11y/alt-text */
"use client";

import React, { useState, useEffect } from "react";
import NurseDashboardSidebar from "../../components/nurse/NurseDashboardSidebar";

const profilePic = "https://placehold.co/100x100.png?text=N";

export default function NurseDashboardPage() {
  const [userName, setUserName] = useState("Loading...");
  const [alerts, setAlerts] = useState([
    { id: 1, msg: "New patient added to triage", time: "5m ago" },
    { id: 2, msg: "Medication update needed for Patient #3", time: "12m ago" },
  ]);
  const [showAlerts, setShowAlerts] = useState(false);

  // Load user name
  useEffect(() => {
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

      {/* MAIN */}
      <main className="flex-1 p-6 md:p-10">

        {/* Header + Alerts */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-bold text-3xl text-gray-800">
            Welcome, {userName} 👩‍⚕️
          </h1>

          {/* Alerts Notification */}
          <div className="relative">
            <button
              onClick={() => setShowAlerts(!showAlerts)}
              className="relative px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
            >
              Alerts ({alerts.length})
            </button>

            {showAlerts && (
              <div className="absolute right-0 mt-2 w-72 bg-white p-4 rounded-xl shadow-xl border">
                <h3 className="font-semibold mb-2">Recent Alerts</h3>
                <div className="space-y-2">
                  {alerts.map((a) => (
                    <div
                      key={a.id}
                      className="p-2 bg-slate-50 border rounded-lg text-sm flex justify-between"
                    >
                      <span>{a.msg}</span>
                      <span className="text-gray-500 text-xs">{a.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Profile Card */}
        <div className="bg-white p-6 rounded-xl shadow-md border mb-10">
          <div className="flex items-center gap-6">
            <img
              src={profilePic}
              className="w-20 h-20 rounded-full border-4 border-teal-500 object-cover"
            />
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">{userName}</h2>
              <p className="text-gray-500">Nurse • Emergency Department</p>

              {/* Stats */}
              <div className="mt-4 grid grid-cols-3 gap-4">
                <div className="p-3 bg-teal-50 rounded-lg text-center">
                  <p className="text-xl font-bold text-teal-700">12</p>
                  <p className="text-sm text-gray-600">Patients Today</p>
                </div>

                <div className="p-3 bg-orange-50 rounded-lg text-center">
                  <p className="text-xl font-bold text-orange-700">4</p>
                  <p className="text-sm text-gray-600">Pending Triage</p>
                </div>

                <div className="p-3 bg-blue-50 rounded-lg text-center">
                  <p className="text-xl font-bold text-blue-700">3</p>
                  <p className="text-sm text-gray-600">Active Cases</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TRIAGE QUEUE */}
        <div className="bg-white p-6 rounded-xl shadow-md border mb-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Triage Queue</h2>
          <p className="text-gray-600 mb-4">Patients waiting for evaluation</p>

          <div className="space-y-4">
            <TriageCard
              name="Patient #1"
              condition="High Fever"
              priority="high"
              waiting="10 min"
            />
            <TriageCard
              name="Patient #2"
              condition="Minor Injury"
              priority="medium"
              waiting="5 min"
            />
            <TriageCard
              name="Patient #3"
              condition="Headache"
              priority="low"
              waiting="2 min"
            />
          </div>
        </div>

        {/* Assigned Patients */}
        <div className="bg-white p-6 rounded-xl shadow-md border mb-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Assigned Patients
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <AssignedCard
              name="John Smith"
              age="45"
              issue="Diabetes Check"
            />
            <AssignedCard
              name="Maria Lopez"
              age="31"
              issue="Medication Review"
            />
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-white p-6 rounded-xl shadow-md border mb-20">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Quick Tools & Resources
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            <QuickLink label="Shift Schedule" />
            <QuickLink label="Medication Guide" />
            <QuickLink label="Nursing Protocols" />
            <QuickLink label="Emergency Steps" />
          </div>
        </div>

      </main>
    </section>
  );
}

/* ------------------------------
   TRIAGE CARD COMPONENT
------------------------------ */
function TriageCard({ name, condition, priority, waiting }) {
  const colors = {
    high: "bg-red-100 text-red-700 border-red-300",
    medium: "bg-yellow-100 text-yellow-700 border-yellow-300",
    low: "bg-green-100 text-green-700 border-green-300",
  };

  return (
    <div className="p-4 bg-slate-50 border rounded-lg shadow-sm flex justify-between">
      <div>
        <p className="font-semibold text-gray-800">{name}</p>
        <p className="text-gray-500 text-sm">{condition} • {waiting}</p>
      </div>

      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colors[priority]}`}>
        {priority.toUpperCase()}
      </span>
    </div>
  );
}

/* ------------------------------
   ASSIGNED PATIENT CARD
------------------------------ */
function AssignedCard({ name, age, issue }) {
  return (
    <div className="p-5 border rounded-xl shadow-sm bg-slate-50 hover:shadow-md transition">
      <h3 className="font-semibold text-gray-800 text-lg">{name}</h3>
      <p className="text-gray-500 text-sm mb-2">Age: {age}</p>
      <p className="text-gray-600">{issue}</p>

      <button className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition">
        View Details
      </button>
    </div>
  );
}

/* ------------------------------
   QUICK LINK CARD
------------------------------ */
function QuickLink({ label }) {
  return (
    <button className="p-4 bg-teal-50 border border-teal-200 rounded-lg text-teal-700 font-medium hover:bg-teal-100 transition text-center">
      {label}
    </button>
  );
}
