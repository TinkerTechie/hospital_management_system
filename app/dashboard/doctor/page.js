"use client";

import React, { useState, useEffect } from "react";
import DoctorDashboardSidebar from "../../components/doctor/DoctorDashboardSidebar";
import DoctorNavbar from "../../components/doctor/DoctorNavbar";
import PatientUpdateForm from "../../components/shared/PatientUpdateForm";
import GlobalSearch from "../../components/GlobalSearch";
import {
  Users,
  Calendar,
  Clock,
  AlertCircle,
  FileText,
  Search,
  MoreVertical,
  FilePlus
} from "lucide-react";
import Link from "next/link";

const profilePic = "https://placehold.co/100x100/0D9488/FFFFFF?text=Dr";

export default function DoctorDashboardPage() {
  const [user, setUser] = useState(null);
  const [doctorProfile, setDoctorProfile] = useState(null);
  const [stats, setStats] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [recentPatients, setRecentPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dark, setDark] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  async function fetchData() {
    try {
      const res = await fetch("/api/doctor");
      if (res.status === 401 || res.status === 404) {
        window.location.href = "/auth"; // Redirect to custom login page
        return;
      }
      if (!res.ok) throw new Error("Failed to fetch data");

      const data = await res.json();
      setUser(data.user);
      setDoctorProfile(data.doctorProfile);
      setStats(data.stats);
      setAppointments(data.appointments || []);
      setRecentPatients(data.recentPatients || []);
    } catch (e) {
      console.error(e);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // Theme check
    if (typeof window !== "undefined") {
      const theme = localStorage.getItem("theme");
      setDark(theme === "dark");
    }

    // ✅ Role-based access control
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      if (userData.role !== "DOCTOR") {
        const correctDashboard = userData.role === "ADMIN" ? "/dashboard/admin" :
          userData.role === "NURSE" ? "/dashboard/nurse" :
            userData.role === "PATIENT" ? "/dashboard/patient" : "/auth";
        window.location.href = correctDashboard;
        return;
      }
    }

    fetchData();
  }, []);

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/auth";
  };

  // Global search keyboard shortcut (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowSearch(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className={dark ? "dark" : ""}>
      {/* Navbar */}
      <DoctorNavbar
        user={user}
        handleLogout={handleLogout}
        onSearchClick={() => setShowSearch(true)}
      />

      <div className="min-h-screen flex font-sans bg-gradient-to-br from-gray-50 via-teal-50/30 to-gray-50 dark:from-gray-900 dark:via-teal-900/10 dark:to-gray-900 transition-colors duration-300">
        {/* Sidebar */}
        <div className="hidden md:block">
          <DoctorDashboardSidebar
            userName={user?.name}
            profilePic={user?.image || profilePic}
            dark={dark}
            toggleDark={toggleDark}
          />
        </div>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto overflow-y-auto">

          {/* Header */}
          <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Welcome back, Dr. {user?.name?.split(" ")[0] || "Doctor"}
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                You have <span className="font-semibold text-teal-600 dark:text-teal-400">{stats?.appointmentsToday || 0} appointments</span> today.
              </p>

              {!loading && !error && !doctorProfile && (
                <Link href="/dashboard/doctor/profile" className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200 text-sm rounded-lg border border-amber-100 dark:border-amber-800 flex items-center gap-2 hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors">
                  <AlertCircle className="h-4 w-4" />
                  <span>Your profile is incomplete. Please update your details in Settings.</span>
                </Link>
              )}
            </div>

            <div className="flex items-center gap-4 self-end md:self-auto">
              <button
                onClick={toggleDark}
                className="p-2.5 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:shadow-md transition-all"
              >
                {dark ? "☀" : "🌙"}
              </button>

              <button className="p-2.5 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors relative">
                <AlertCircle className="h-5 w-5" />
                <span className="absolute top-2 right-2.5 h-2 w-2 bg-red-500 rounded-full border border-white dark:border-gray-800"></span>
              </button>
            </div>
          </header>

          {loading ? (
            <LoadingScreen />
          ) : error ? (
            <ErrorScreen msg={error} />
          ) : (
            <>
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <StatCard
                  icon={<Users className="text-blue-600 dark:text-blue-400" />}
                  label="Total Patients"
                  value={stats?.totalPatients || 0}
                  color="bg-blue-50 dark:bg-blue-900/20"
                  trend="+12% this month"
                />
                <StatCard
                  icon={<Calendar className="text-teal-600 dark:text-teal-400" />}
                  label="Appointments Today"
                  value={stats?.appointmentsToday || 0}
                  color="bg-teal-50 dark:bg-teal-900/20"
                  trend="4 remaining"
                />
                <StatCard
                  icon={<FileText className="text-amber-600 dark:text-amber-400" />}
                  label="Pending Reports"
                  value={stats?.pendingReports || 0}
                  color="bg-amber-50 dark:bg-amber-900/20"
                  trend="Needs review"
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Column: Appointments */}
                <div className="lg:col-span-2 space-y-8">
                  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="font-bold text-lg text-gray-800 dark:text-white">Upcoming Appointments</h3>
                      <Link href="/dashboard/doctor/appointments" className="text-sm text-teal-600 dark:text-teal-400 font-medium hover:text-teal-700 dark:hover:text-teal-300">View Calendar</Link>
                    </div>

                    {appointments.length === 0 ? (
                      <EmptyState
                        icon={<Calendar className="h-10 w-10 text-gray-300 dark:text-gray-600" />}
                        title="No appointments today"
                        desc="Enjoy your free time, Doctor!"
                      />
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-700">
                              <th className="pb-3 pl-2">Patient</th>
                              <th className="pb-3">Time</th>
                              <th className="pb-3">Type</th>
                              <th className="pb-3 text-right pr-2">Action</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
                            {appointments.map((appt) => (
                              <tr key={appt.id} className="group hover: dark:hover:bg-gray-700 transition-colors">
                                <td className="py-4 pl-2">
                                  <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-700 dark:text-teal-300 font-bold text-sm">
                                      {appt.patient?.fullName?.charAt(0) || "P"}
                                    </div>
                                    <div>
                                      <p className="font-medium text-gray-900 dark:text-white">{appt.patient?.fullName || "Unknown"}</p>
                                      <p className="text-xs text-gray-500 dark:text-gray-400">ID: #{appt.patient?.id?.slice(0, 6)}</p>
                                    </div>
                                  </div>
                                </td>
                                <td className="py-4">
                                  <div className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-300">
                                    <Clock className="h-4 w-4 text-gray-400" />
                                    {appt.time || "10:00 AM"}
                                  </div>
                                </td>
                                <td className="py-4">
                                  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-900/30">
                                    {appt.reason || "General Checkup"}
                                  </span>
                                </td>
                                <td className="py-4 text-right pr-2">
                                  <button className="px-3 py-1.5 text-sm font-medium text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-900/20 hover:bg-teal-100 dark:hover:bg-teal-900/30 rounded-lg transition-colors">
                                    View Details
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Column: Recent Patients & Quick Actions */}
                <div className="space-y-8">

                  {/* Recent Patients */}
                  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="font-bold text-lg text-gray-800 dark:text-white">Recent Patients</h3>
                      <Link href="/dashboard/doctor/patients" className="text-sm text-teal-600 dark:text-teal-400 font-medium hover:text-teal-700 dark:hover:text-teal-300">View All</Link>
                    </div>

                    {recentPatients.length === 0 ? (
                      <p className="text-sm text-gray-500 dark:text-gray-400">No recent patients.</p>
                    ) : (
                      <div className="space-y-4">
                        {recentPatients.map((patient) => (
                          <div key={patient.id} className="flex items-center justify-between p-3 hover: dark:hover:bg-gray-700 rounded-xl transition-colors cursor-pointer border border-transparent hover:border-gray-100 dark:hover:border-gray-700">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 font-medium text-sm">
                                {patient.fullName?.charAt(0)}
                              </div>
                              <div>
                                <p className="font-medium text-gray-900 dark:text-white text-sm">{patient.fullName}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{patient.age || "N/A"} yrs • {patient.gender || "N/A"}</p>
                              </div>
                            </div>
                            <div className="h-8 w-8 rounded-full bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 flex items-center justify-center text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 hover:border-teal-200 dark:hover:border-teal-500 transition-all">
                              <FileText className="h-4 w-4" />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    <Link href="/dashboard/doctor/patients" className="block w-full mt-6 py-2.5 text-sm font-medium text-center text-gray-600 dark:text-gray-300  dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors border border-gray-200 dark:border-gray-600">
                      View All Patients
                    </Link>
                  </div>

                  {/* Quick Actions */}
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
                    <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">Quick Actions</h3>
                    <div className="space-y-3">
                      <button
                        onClick={() => setShowUpdateForm(true)}
                        className="w-full flex items-center gap-3 p-3 bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300 rounded-xl hover:bg-teal-100 dark:hover:bg-teal-900/30 transition-colors group"
                      >
                        <div className="w-10 h-10 bg-teal-100 dark:bg-teal-800/50 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                          <FilePlus className="h-5 w-5" />
                        </div>
                        <div className="text-left">
                          <p className="font-semibold">Add Patient Update</p>
                          <p className="text-xs text-teal-600 dark:text-teal-400">Create report or prescription</p>
                        </div>
                      </button>
                      <Link href="/dashboard/doctor/appointments" className="w-full flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors group">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-800/50 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Calendar className="h-5 w-5" />
                        </div>
                        <div className="text-left">
                          <p className="font-semibold">View Schedule</p>
                          <p className="text-xs text-blue-600 dark:text-blue-400">Check all appointments</p>
                        </div>
                      </Link>
                      <Link href="/dashboard/doctor/patients" className="w-full flex items-center gap-3 p-3 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 rounded-xl hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors group">
                        <div className="w-10 h-10 bg-purple-100 dark:bg-purple-800/50 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Users className="h-5 w-5" />
                        </div>
                        <div className="text-left">
                          <p className="font-semibold">Patient List</p>
                          <p className="text-xs text-purple-600 dark:text-purple-400">View all patients</p>
                        </div>
                      </Link>
                    </div>
                  </div>

                </div>
              </div>
            </>
          )}
        </main>
      </div>

      {/* Global Search Modal */}
      <GlobalSearch isOpen={showSearch} onClose={() => setShowSearch(false)} />

      {/* Patient Update Form Modal */}
      <PatientUpdateForm
        isOpen={showUpdateForm}
        onClose={() => setShowUpdateForm(false)}
        onSuccess={() => {
          // Optionally refresh data
          fetchData();
        }}
      />
    </div>
  );
}

/* --- Subcomponents --- */

function StatCard({ icon, label, value, color, trend }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl ${color}`}>
          {icon}
        </div>
        <span className="text-xs font-medium text-gray-400  dark:bg-gray-700 px-2 py-1 rounded-lg">
          {trend}
        </span>
      </div>
      <h4 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{value}</h4>
      <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{label}</p>
    </div>
  );
}

function EmptyState({ icon, title, desc }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="mb-4 p-4  dark:bg-gray-700 rounded-full">
        {icon}
      </div>
      <h4 className="text-gray-900 dark:text-white font-medium mb-1">{title}</h4>
      <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">{desc}</p>
    </div>
  );
}

function LoadingScreen() {
  return (
    <div className="h-96 flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin mb-4"></div>
        <p className="text-gray-500 font-medium">Loading dashboard...</p>
      </div>
    </div>
  );
}

function ErrorScreen({ msg }) {
  return (
    <div className="h-96 flex items-center justify-center">
      <div className="text-center max-w-md p-6">
        <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="h-8 w-8" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Something went wrong</h2>
        <p className="text-gray-500 mb-6">{msg}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
