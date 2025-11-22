"use client";

import React, { useState, useEffect } from "react";
import NurseDashboardSidebar from "../../components/nurse/NurseDashboardSidebar";
import {
  Users,
  Clock,
  AlertCircle,
  Activity,
  Clipboard,
  FileText,
  CheckSquare,
  Search
} from "lucide-react";
import Link from "next/link";

const profilePic = "https://placehold.co/100x100.png?text=N";

export default function NurseDashboardPage() {
  const [user, setUser] = useState(null);
  const [nurseProfile, setNurseProfile] = useState(null);
  const [stats, setStats] = useState(null);
  const [triageQueue, setTriageQueue] = useState([]);
  const [assignedPatients, setAssignedPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAlerts, setShowAlerts] = useState(false);
  const [dark, setDark] = useState(false);

  // Mock alerts for now
  const alerts = [
    { id: 1, msg: "New patient added to triage", time: "5m ago" },
    { id: 2, msg: "Medication update needed for Patient #3", time: "12m ago" },
  ];

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
      if (userData.role !== "NURSE") {
        const correctDashboard = userData.role === "ADMIN" ? "/dashboard/admin" :
          userData.role === "DOCTOR" ? "/dashboard/doctor" :
            userData.role === "PATIENT" ? "/dashboard/patient" : "/auth";
        window.location.href = correctDashboard;
        return;
      }
    }

    async function fetchData() {
      try {
        const res = await fetch("/api/nurse");
        if (res.status === 401) {
          window.location.href = "/auth"; // Redirect to custom login page
          return;
        }
        if (!res.ok) throw new Error("Failed to fetch data");

        const data = await res.json();
        setUser(data.user);
        setNurseProfile(data.nurseProfile);
        setStats(data.stats);
        setTriageQueue(data.triageQueue || []);
        setAssignedPatients(data.assignedPatients || []);
      } catch (e) {
        console.error(e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <div className={dark ? "dark" : ""}>
      <div className="  min-h-screen flex font-sans text-gray-900 transition-colors duration-300">
        {/* LEFT SIDEBAR */}
        <div className="hidden md:block">
          <NurseDashboardSidebar
            userName={user?.name || "Nurse"}
            profilePic={user?.image || profilePic}
          />
        </div>

        {/* MAIN */}
        <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto overflow-y-auto">

          {/* Header + Alerts */}
          <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
            <div>
              <h1 className="font-bold text-3xl text-gray-900 dark:text-white">
                Welcome, {user?.name?.split(" ")[0] || "Nurse"} 👩‍⚕️
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                Shift: <span className="font-medium text-teal-600 dark:text-teal-400">{nurseProfile?.shiftTiming || "08:00 AM - 04:00 PM"}</span> • Ward: <span className="font-medium text-teal-600 dark:text-teal-400">{nurseProfile?.assignedWard || "General"}</span>
              </p>

              {!loading && !error && !nurseProfile && (
                <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200 text-sm rounded-lg border border-amber-100 dark:border-amber-800 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  <span>Your profile is incomplete. Please update your details in Settings.</span>
                </div>
              )}
            </div>

            {/* Alerts Notification */}
            <div className="flex items-center gap-4 self-end md:self-auto">
              <button
                onClick={toggleDark}
                className="p-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:shadow-md transition-all"
              >
                {dark ? "☀" : "🌙"}
              </button>

              <div className="relative">
                <button
                  onClick={() => setShowAlerts(!showAlerts)}
                  className="relative px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 rounded-xl hover: dark:hover:bg-gray-700 transition-all shadow-sm flex items-center gap-2"
                >
                  <AlertCircle className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                  <span className="font-medium">Alerts</span>
                  <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">{alerts.length}</span>
                </button>

                {showAlerts && (
                  <div className="absolute right-0 mt-3 w-80 bg-white dark:bg-gray-800 p-0 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 z-50 overflow-hidden">
                    <div className="p-4 border-b border-gray-50 dark:border-gray-700  dark:bg-gray-700">
                      <h3 className="font-semibold text-gray-800 dark:text-white">Recent Alerts</h3>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {alerts.map((a) => (
                        <div
                          key={a.id}
                          className="p-4 border-b border-gray-50 dark:border-gray-700 hover: dark:hover:bg-gray-700 transition-colors"
                        >
                          <p className="text-sm text-gray-800 dark:text-gray-200 font-medium">{a.msg}</p>
                          <p className="text-xs text-gray-400 mt-1">{a.time}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </header>

          {loading ? (
            <LoadingScreen />
          ) : error ? (
            <ErrorScreen msg={error} />
          ) : (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <StatCard
                  icon={<Users className="text-teal-600 dark:text-teal-400" />}
                  label="Patients Today"
                  value={stats?.patientsToday || 0}
                  color="bg-teal-50 dark:bg-teal-900/20"
                />
                <StatCard
                  icon={<Clipboard className="text-orange-600 dark:text-orange-400" />}
                  label="Pending Triage"
                  value={stats?.pendingTriage || 0}
                  color="bg-orange-50 dark:bg-orange-900/20"
                />
                <StatCard
                  icon={<Activity className="text-blue-600 dark:text-blue-400" />}
                  label="Active Cases"
                  value={stats?.activeCases || 0}
                  color="bg-blue-50 dark:bg-blue-900/20"
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Column: Triage & Assigned */}
                <div className="lg:col-span-2 space-y-8">

                  {/* TRIAGE QUEUE */}
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-lg font-bold text-gray-800 dark:text-white">Triage Queue</h2>
                      <span className="text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 px-2 py-1 rounded-lg">
                        {triageQueue.length} Waiting
                      </span>
                    </div>

                    {triageQueue.length === 0 ? (
                      <EmptyState
                        icon={<CheckSquare className="h-10 w-10 text-gray-300 dark:text-gray-600" />}
                        title="All clear!"
                        desc="No patients waiting for triage."
                      />
                    ) : (
                      <div className="space-y-3">
                        {triageQueue.map((patient) => (
                          <TriageCard
                            key={patient.id}
                            name={patient.name}
                            condition={patient.condition}
                            priority={patient.priority}
                            waiting={patient.waiting}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Assigned Patients */}
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-6">
                      Assigned Patients
                    </h2>

                    {assignedPatients.length === 0 ? (
                      <p className="text-sm text-gray-500 dark:text-gray-400">No patients assigned currently.</p>
                    ) : (
                      <div className="grid md:grid-cols-2 gap-4">
                        {assignedPatients.map((patient) => (
                          <AssignedCard
                            key={patient.id}
                            name={patient.name}
                            age={patient.age}
                            issue={patient.issue}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                </div>

                {/* Right Column: Quick Links & Profile */}
                <div className="space-y-8">

                  {/* Profile Summary */}
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 text-center">
                    <div className="relative inline-block">
                      <img
                        src={user?.image || profilePic}
                        alt="Profile"
                        className="w-24 h-24 rounded-full border-4 border-teal-50 dark:border-teal-900 object-cover mx-auto mb-4"
                      />
                      <div className="absolute bottom-2 right-2 h-5 w-5 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">{user?.name || "Nurse"}</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Emergency Department</p>

                    <div className="flex justify-center gap-2">
                      <Link href="/dashboard/nurse/profile" className="px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded-xl hover:bg-teal-700 transition-colors">
                        Edit Profile
                      </Link>
                      <Link href="/dashboard/nurse/schedule" className="px-4 py-2  dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-sm font-medium rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors border border-gray-200 dark:border-gray-600">
                        View Schedule
                      </Link>
                    </div>
                  </div>

                  {/* Quick Links */}
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
                      Quick Tools
                    </h2>

                    <div className="grid grid-cols-2 gap-3">
                      <QuickLink label="Vitals Entry" icon={<Activity className="h-5 w-5" />} />
                      <QuickLink label="Med Guide" icon={<Clipboard className="h-5 w-5" />} />
                      <QuickLink label="Protocols" icon={<FileText className="h-5 w-5" />} />
                      <QuickLink label="Emergency" icon={<AlertCircle className="h-5 w-5" />} color="text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 border-red-100 dark:border-red-900/30" />
                    </div>
                  </div>

                </div>
              </div>
            </>
          )}

        </main>
      </div>
    </div>
  );
}

/* ------------------------------
   SUBCOMPONENTS
------------------------------ */

function StatCard({ icon, label, value, color }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow flex items-center gap-4">
      <div className={`p-3 rounded-xl ${color}`}>
        {icon}
      </div>
      <div>
        <h4 className="text-2xl font-bold text-gray-900 dark:text-white">{value}</h4>
        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{label}</p>
      </div>
    </div>
  );
}

function TriageCard({ name, condition, priority, waiting }) {
  const colors = {
    high: "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border-red-100 dark:border-red-900/30",
    medium: "bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 border-amber-100 dark:border-amber-900/30",
    low: "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-100 dark:border-green-900/30",
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl hover:shadow-sm transition-shadow flex justify-between items-center group">
      <div className="flex items-center gap-4">
        <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm ${colors[priority]}`}>
          {name.charAt(0)}
        </div>
        <div>
          <p className="font-semibold text-gray-800 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">{name}</p>
          <p className="text-gray-500 dark:text-gray-400 text-xs">{condition} • Waited {waiting}</p>
        </div>
      </div>

      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${colors[priority]}`}>
        {priority}
      </span>
    </div>
  );
}

function AssignedCard({ name, age, issue }) {
  return (
    <div className="p-5 border border-gray-100 dark:border-gray-700 rounded-xl  dark:bg-gray-700/30 hover:bg-white dark:hover:bg-gray-700 hover:shadow-md transition-all group">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-gray-800 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">{name}</h3>
        <span className="text-xs text-gray-400 dark:text-gray-500 bg-white dark:bg-gray-800 px-2 py-1 rounded-lg border border-gray-100 dark:border-gray-600">{age} yrs</span>
      </div>
      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">{issue}</p>

      <button className="w-full py-2 bg-white dark:bg-gray-800 text-teal-600 dark:text-teal-400 text-sm font-medium rounded-lg border border-gray-200 dark:border-gray-600 hover:border-teal-500 dark:hover:border-teal-500 hover:text-teal-700 dark:hover:text-teal-300 transition-all">
        Update Status
      </button>
    </div>
  );
}

function QuickLink({ label, icon, color = "text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-900/20 hover:bg-teal-100 dark:hover:bg-teal-900/30 border-teal-100 dark:border-teal-900/30" }) {
  return (
    <button className={`p-4 border rounded-xl font-medium transition-all flex flex-col items-center justify-center gap-2 ${color}`}>
      {icon}
      <span className="text-xs">{label}</span>
    </button>
  );
}

function EmptyState({ icon, title, desc }) {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <div className="mb-3 p-3  dark:bg-gray-700 rounded-full">
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

