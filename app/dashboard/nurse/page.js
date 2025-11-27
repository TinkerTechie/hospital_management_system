"use client";

import React, { useState, useEffect } from "react";
import NurseDashboardSidebar from "../../components/nurse/NurseDashboardSidebar";
import NurseNavbar from "../../components/nurse/NurseNavbar";
import PatientUpdateForm from "../../components/shared/PatientUpdateForm";
import WelcomeCard from "../../components/nurse/premium/WelcomeCard";
import PremiumStatCard from "../../components/nurse/premium/PremiumStatCard";
import QuickActionCard from "../../components/nurse/premium/QuickActionCard";
import PremiumSearchBar from "../../components/nurse/premium/PremiumSearchBar";
import GlobalSearch from "../../components/GlobalSearch";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Clock,
  AlertCircle,
  Activity,
  Clipboard,
  Thermometer,
  Pill,
  FileText,
  Bell,
  Settings,
  LogOut,
  Stethoscope,
  Heart,
  AlertTriangle
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
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const theme = localStorage.getItem("theme");
      setDark(theme === "dark");
    }

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
        if (res.status === 401 || res.status === 404) {
          window.location.href = "/auth";
          return;
        }
        if (!res.ok) throw new Error("Failed to fetch data");

        const data = await res.json();
        setUser(data.user);
        setNurseProfile(data.nurseProfile);
        setStats(data.stats);
        setTriageQueue(data.triageQueue || []);
        setAssignedPatients(data.assignedPatients || []);
        setAlerts(data.alerts || []);
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
    document.documentElement.classList.toggle("dark", next);
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

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
    window.location.href = "/auth";
  };

  if (loading) {
    return (
      <div className={dark ? "dark" : ""}>
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={dark ? "dark" : ""}>
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
          <div className="text-center">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <p className="text-gray-900 dark:text-white text-xl font-semibold mb-2">Error Loading Dashboard</p>
            <p className="text-gray-600 dark:text-gray-400">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={dark ? "dark" : ""}>
      {/* Navbar */}
      <NurseNavbar
        user={user}
        handleLogout={handleLogout}
        onSearchClick={() => setShowSearch(true)}
      />

      <div className="min-h-screen flex font-['Inter',sans-serif] bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        {/* Sidebar */}
        <div className="hidden lg:block sticky top-0 h-screen">
          <NurseDashboardSidebar
            userName={user?.name || "Nurse"}
            profilePic={user?.image || profilePic}
            dark={dark}
            toggleDark={toggleDark}
          />
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          {/* Top Bar */}
          <div className="sticky top-0 z-40 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-700">
            <div className="px-6 lg:px-10 py-4">
              <div className="flex items-center justify-between gap-4">
                {/* Spacer to push Right Actions to the right if search is removed */}
                <div className="flex-1"></div>

                {/* Right Actions */}
                <div className="flex items-center gap-3">
                  {/* Theme Toggle */}
                  <button
                    onClick={toggleDark}
                    className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    {dark ? "☀️" : "🌙"}
                  </button>

                  {/* Notifications */}
                  <div className="relative">
                    <button
                      onClick={() => setShowAlerts(!showAlerts)}
                      className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors relative"
                    >
                      <Bell className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                      {alerts.length > 0 && (
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
                      )}
                    </button>

                    <AnimatePresence>
                      {showAlerts && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
                        >
                          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                            <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
                          </div>
                          <div className="max-h-96 overflow-y-auto">
                            {alerts.length === 0 ? (
                              <p className="p-6 text-center text-gray-500 dark:text-gray-400 text-sm">
                                No new notifications
                              </p>
                            ) : (
                              alerts.map((alert, i) => (
                                <div key={i} className="p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                  <p className="text-sm text-gray-900 dark:text-white font-medium">{alert.msg}</p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{alert.time}</p>
                                </div>
                              ))
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Settings */}
                  <Link
                    href="/dashboard/nurse/profile"
                    className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    <Settings className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Page Content */}
          <div className="px-6 lg:px-10 py-8 space-y-8">
            {/* Welcome Card */}
            <WelcomeCard
              userName={user?.name?.split(" ")[0] || "Nurse"}
              currentShift={nurseProfile?.currentShift || "Day Shift"}
              shiftEnd="6:00 PM"
            />

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <PremiumStatCard
                icon={Users}
                label="Patients Today"
                value={stats?.assignedPatients || 0}
                subtitle="assigned"
                trend={5}
                trendValue="vs yesterday"
                color="blue"
                delay={0}
              />
              <PremiumStatCard
                icon={Clipboard}
                label="Pending Triage"
                value={stats?.pendingTriage || 0}
                subtitle="waiting"
                color="amber"
                delay={0.1}
              />
              <PremiumStatCard
                icon={Activity}
                label="Active Cases"
                value={stats?.activeCases || 0}
                subtitle="in progress"
                trend={-2}
                trendValue="vs yesterday"
                color="teal"
                delay={0.2}
              />
              <PremiumStatCard
                icon={Clock}
                label="Shift Progress"
                value={`${stats?.shiftProgress || 45}%`}
                subtitle="completed"
                color="blue"
                delay={0.3}
              />
            </div>

            {/* Quick Actions */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <QuickActionCard
                  icon={Stethoscope}
                  label="Update Vitals"
                  description="Record patient vitals"
                  onClick={() => window.location.href = "/dashboard/nurse/patients"}
                  color="blue"
                  delay={0}
                />
                <QuickActionCard
                  icon={Pill}
                  label="Medications"
                  description="View medication guide"
                  onClick={() => window.location.href = "/dashboard/nurse/resources/med-guide"}
                  color="teal"
                  delay={0.1}
                />
                <QuickActionCard
                  icon={FileText}
                  label="Protocols"
                  description="Access care protocols"
                  onClick={() => window.location.href = "/dashboard/nurse/resources"}
                  color="purple"
                  delay={0.2}
                />
                <QuickActionCard
                  icon={AlertTriangle}
                  label="Emergency"
                  description="Report urgent situation"
                  onClick={() => alert("Emergency protocol activated")}
                  color="red"
                  delay={0.3}
                />
              </div>
            </div>

            {/* Patient Queue & Assigned Patients */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Triage Queue */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Triage Queue</h2>
                  <Link
                    href="/dashboard/nurse/triage"
                    className="text-sm font-semibold text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300"
                  >
                    View All →
                  </Link>
                </div>

                <div className="space-y-3">
                  {triageQueue.length === 0 ? (
                    <p className="text-center py-8 text-gray-500 dark:text-gray-400">No patients in triage</p>
                  ) : (
                    triageQueue.slice(0, 5).map((patient, i) => (
                      <div key={i} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white">{patient.name}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{patient.condition}</p>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${patient.priority === "High" ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" :
                            patient.priority === "Medium" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" :
                              "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                            }`}>
                            {patient.priority}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </motion.div>

              {/* Assigned Patients */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Assigned Patients</h2>
                  <Link
                    href="/dashboard/nurse/patients"
                    className="text-sm font-semibold text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300"
                  >
                    View All →
                  </Link>
                </div>

                <div className="space-y-3">
                  {assignedPatients.length === 0 ? (
                    <p className="text-center py-8 text-gray-500 dark:text-gray-400">No assigned patients</p>
                  ) : (
                    assignedPatients.slice(0, 5).map((patient, i) => (
                      <div key={i} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white">{patient.name}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Room {patient.room} • Bed {patient.bed}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Heart className={`h-4 w-4 ${patient.status === "stable" ? "text-green-500" : "text-amber-500"}`} />
                            <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">{patient.status}</span>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </main>
      </div>

      {/* Global Search Modal */}
      <GlobalSearch isOpen={showSearch} onClose={() => setShowSearch(false)} />

      {/* Patient Update Form Modal */}
      {showUpdateForm && (
        <PatientUpdateForm
          isOpen={showUpdateForm}
          onClose={() => setShowUpdateForm(false)}
          onSuccess={() => {
            setShowUpdateForm(false);
            // Refresh data
          }}
        />
      )}
    </div>
  );
}
