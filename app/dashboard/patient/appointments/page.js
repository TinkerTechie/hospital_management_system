"use client";

import React, { useState, useEffect } from "react";
import PatientDashboardSidebar from "../../../components/patient/PatientDashboardSidebar";
import { Calendar, Clock, MapPin, Video, Stethoscope, MoreVertical, CheckCircle, AlertCircle, FileText } from "lucide-react";
import Link from "next/link";

export default function PatientAppointmentsPage() {
  const [dark, setDark] = useState(false);
  const [activeTab, setActiveTab] = useState("upcoming");
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const theme = localStorage.getItem("theme");
      setDark(theme === "dark");
    }

    // Fetch appointments
    async function fetchAppointments() {
      try {
        const res = await fetch("/api/patient"); // Reusing the patient dashboard API which returns appointments
        if (res.ok) {
          const data = await res.json();
          setAppointments(data.appointments || []);
        }
      } catch (error) {
        console.error("Failed to fetch appointments:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAppointments();
  }, []);

  const toggleDark = () => {
    const newTheme = !dark;
    setDark(newTheme);
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", newTheme ? "dark" : "light");
      if (newTheme) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  };

  // Filter appointments based on tab
  const filteredAppointments = appointments.filter(a => {
    const apptDate = new Date(a.appointmentDate);
    const now = new Date();
    if (activeTab === "upcoming") {
      return apptDate >= now;
    } else {
      return apptDate < now;
    }
  });

  const handleCancel = async (id) => {
    if (!confirm("Are you sure you want to cancel this appointment?")) return;

    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setAppointments(appointments.filter((a) => a.id !== id));
        alert("Appointment cancelled successfully");
      } else {
        alert("Failed to cancel appointment");
      }
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      alert("An error occurred");
    }
  };

  return (
    <div className={dark ? "dark" : ""}>
      <div className="  min-h-screen flex font-sans text-gray-900 transition-colors duration-300">
        <div className="hidden md:block">
          <PatientDashboardSidebar dark={dark} toggleDark={toggleDark} />
        </div>

        <main className="flex-1 p-6 md:p-10 max-w-5xl mx-auto overflow-y-auto">
          <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Appointments</h1>
              <p className="text-gray-500 dark:text-gray-400">View upcoming visits and past history.</p>
            </div>
            <Link href="/dashboard/patient/appointments/new" className="px-6 py-2.5 bg-teal-600 text-white font-medium rounded-xl hover:bg-teal-700 transition-colors shadow-lg shadow-teal-200 dark:shadow-none flex items-center gap-2">
              <Calendar className="h-4 w-4" /> Book New
            </Link>
          </header>

          {/* Tabs */}
          <div className="flex gap-6 border-b border-gray-200 dark:border-gray-700 mb-8">
            <button
              onClick={() => setActiveTab("upcoming")}
              className={`pb-4 text-sm font-medium transition-all relative ${activeTab === "upcoming"
                ? "text-teal-600 dark:text-teal-400"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
            >
              Upcoming
              {activeTab === "upcoming" && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-600 dark:bg-teal-400 rounded-t-full"></span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("past")}
              className={`pb-4 text-sm font-medium transition-all relative ${activeTab === "past"
                ? "text-teal-600 dark:text-teal-400"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
            >
              Past Visits
              {activeTab === "past" && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-600 dark:bg-teal-400 rounded-t-full"></span>
              )}
            </button>
          </div>

          {/* Appointments List */}
          <div className="space-y-4">
            {loading ? (
              <div className="text-center py-12">Loading appointments...</div>
            ) : filteredAppointments.length === 0 ? (
              <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
                <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">No appointments found</h3>
                <p className="text-gray-500 dark:text-gray-400">You don't have any {activeTab} appointments.</p>
              </div>
            ) : (
              filteredAppointments.map((appt) => (
                <div key={appt.id} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all group">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Date Box */}
                    <div className="flex-shrink-0 flex flex-col items-center justify-center w-full md:w-24 bg-teal-50 dark:bg-teal-900/20 rounded-xl p-4 border border-teal-100 dark:border-teal-900/30">
                      <span className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase">
                        {new Date(appt.appointmentDate).toLocaleString('default', { month: 'short' })}
                      </span>
                      <span className="text-2xl font-bold text-teal-700 dark:text-teal-300">
                        {new Date(appt.appointmentDate).getDate()}
                      </span>
                      <span className="text-xs text-teal-600 dark:text-teal-400">
                        {new Date(appt.appointmentDate).getFullYear()}
                      </span>
                    </div>

                    {/* Details */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                            {appt.doctor?.fullName || "Unknown Doctor"}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {appt.doctor?.specialization || "General"}
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800`}>
                          In-Person
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-4 mt-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                          <Clock className="h-4 w-4 text-gray-400" />
                          {appt.time}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          Hospital Main Wing
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex md:flex-col justify-center gap-2 mt-4 md:mt-0 border-t md:border-t-0 md:border-l border-gray-100 dark:border-gray-700 pt-4 md:pt-0 md:pl-6">
                      {activeTab === "upcoming" ? (
                        <>
                          <button className="px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition-colors whitespace-nowrap">
                            Reschedule
                          </button>
                          <button
                            onClick={() => handleCancel(appt.id)}
                            className="px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 text-sm font-medium rounded-lg transition-colors whitespace-nowrap"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <div className="flex gap-2">
                          <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors whitespace-nowrap">
                            Summary
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
