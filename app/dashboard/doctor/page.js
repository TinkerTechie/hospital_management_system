"use client";

import React, { useState, useEffect } from "react";
import DoctorDashboardSidebar from "../../components/doctor/DoctorDashboardSidebar";

const profilePic = "https://placehold.co/100x100/0D9488/FFFFFF?text=Dr";

// ---- Stat Card ----
const StatCard = ({ title, value, icon }) => (
  <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
    <div className="bg-teal-100 text-teal-600 p-3 rounded-full">
      {icon}
    </div>
    <div>
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <p className="text-2xl font-semibold text-gray-800">{value}</p>
    </div>
  </div>
);

// ---- Icons ----
const IconUsers = () => (
  <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const IconCalendar = () => (
  <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
    <line x1="16" x2="16" y1="2" y2="6"/>
    <line x1="8" x2="8" y1="2" y2="6"/>
    <line x1="3" x2="21" y1="10" y2="10"/>
  </svg>
);

export default function DoctorDashboardPage() {
  const [userName, setUserName] = useState("Loading...");
  const [stats, setStats] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load user + data
  useEffect(() => {
    // Fetch logged-in user name
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("user");
      if (stored) {
        const user = JSON.parse(stored);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setUserName(user.name || "Doctor");
      }
    }

    // Fetch dashboard data
    const fetchDashboard = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/dashboard/doctor");
        const data = await res.json();
        setStats(data.stats);
        setAppointments(data.appointments);
      } catch (error) {
        console.error("Error loading doctor dashboard:", error);
      }
      setLoading(false);
    };

    fetchDashboard();
  }, []);

  return (
    <section className="bg-slate-100 min-h-screen flex">
      {/* Sidebar */}
      <DoctorDashboardSidebar userName={userName} profilePic={profilePic} />

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6 md:p-10">

        {/* Welcome Header */}
        <h1 className="font-bold text-3xl text-gray-800 mb-8">
          Welcome back, {userName}
        </h1>

        {/* Stats section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {loading ? (
            <p>Loading stats...</p>
          ) : (
            <>
              <StatCard
                title="Total Patients"
                value={stats?.totalPatients || 0}
                icon={<IconUsers />}
              />
              <StatCard
                title="Upcoming Appointments"
                value={stats?.upcomingAppointments || 0}
                icon={<IconCalendar />}
              />
            </>
          )}
        </div>

        {/* Appointment table */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Upcoming Appointments
          </h2>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Patient
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reason
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan={4} className="text-center p-4">
                      Loading appointments...
                    </td>
                  </tr>
                ) : appointments.length > 0 ? (
                  appointments.map((appt) => (
                    <tr key={appt.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {appt.patientName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {new Date(appt.dateTime).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {new Date(appt.dateTime).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {appt.reason}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center p-4 text-gray-500">
                      No upcoming appointments.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </section>
  );
}
