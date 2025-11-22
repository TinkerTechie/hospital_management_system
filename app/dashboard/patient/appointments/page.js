"use client";

import React, { useState, useEffect } from "react";
import PatientDashboardSidebar from "../../../components/patient/PatientDashboardSidebar";
import { Calendar, Clock, MapPin, Video, Stethoscope, MoreVertical, CheckCircle, AlertCircle, FileText } from "lucide-react";
import Link from "next/link";

export default function PatientAppointmentsPage() {
  const [dark, setDark] = useState(false);
  const [activeTab, setActiveTab] = useState("upcoming");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const theme = localStorage.getItem("theme");
      setDark(theme === "dark");
    }
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

  // Mock Data
  const appointments = [
    { id: 1, doctor: "Dr. Sarah Johnson", specialty: "Cardiologist", date: "Nov 24, 2023", time: "10:00 AM", type: "In-Person", location: "Room 304, Main Wing", status: "upcoming", image: "https://placehold.co/100x100/0D9488/FFFFFF?text=Dr" },
    { id: 2, doctor: "Dr. Michael Chen", specialty: "Dermatologist", date: "Nov 28, 2023", time: "02:30 PM", type: "Video Call", location: "Online", status: "upcoming", image: "https://placehold.co/100x100/2563EB/FFFFFF?text=Dr" },
    { id: 3, doctor: "Dr. Emily Wilson", specialty: "General Physician", date: "Oct 15, 2023", time: "09:15 AM", type: "In-Person", location: "Room 102, East Wing", status: "past", image: "https://placehold.co/100x100/D97706/FFFFFF?text=Dr" },
    { id: 4, doctor: "Dr. James Brown", specialty: "Orthopedic", date: "Sep 20, 2023", time: "11:00 AM", type: "In-Person", location: "Room 205, West Wing", status: "past", image: "https://placehold.co/100x100/DC2626/FFFFFF?text=Dr" },
  ];

  const filteredAppointments = appointments.filter(a => a.status === activeTab);

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
            <button className="px-6 py-2.5 bg-teal-600 text-white font-medium rounded-xl hover:bg-teal-700 transition-colors shadow-lg shadow-teal-200 dark:shadow-none flex items-center gap-2">
              <Calendar className="h-4 w-4" /> Book New
            </button>
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
            {filteredAppointments.length === 0 ? (
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
                      <span className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase">{appt.date.split(" ")[0]}</span>
                      <span className="text-2xl font-bold text-teal-700 dark:text-teal-300">{appt.date.split(" ")[1].replace(",", "")}</span>
                      <span className="text-xs text-teal-600 dark:text-teal-400">{appt.date.split(" ")[2]}</span>
                    </div>

                    {/* Details */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">{appt.doctor}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{appt.specialty}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${appt.type === "Video Call"
                          ? "bg-purple-50 text-purple-700 border-purple-100 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800"
                          : "bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800"
                          }`}>
                          {appt.type}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-4 mt-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                          <Clock className="h-4 w-4 text-gray-400" />
                          {appt.time}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                          {appt.type === "Video Call" ? <Video className="h-4 w-4 text-gray-400" /> : <MapPin className="h-4 w-4 text-gray-400" />}
                          {appt.location}
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
                          <button className="px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 text-sm font-medium rounded-lg transition-colors whitespace-nowrap">
                            Cancel
                          </button>
                        </>
                      ) : (
                        <div className="flex gap-2">
                          <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors whitespace-nowrap">
                            Summary
                          </button>
                          <Link href="/dashboard/patient/records" className="px-4 py-2 bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300 text-sm font-medium rounded-lg hover:bg-teal-100 dark:hover:bg-teal-900/40 transition-colors whitespace-nowrap flex items-center gap-1">
                            <FileText className="h-3 w-3" /> View Report
                          </Link>
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
