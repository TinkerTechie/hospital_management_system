"use client";

import React, { useEffect, useState } from "react";
import {
  Calendar,
  Pill,
  Activity,
  FileText,
  Lightbulb,
  AlertCircle,
  ArrowRight,
  Star,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

// Import Premium Components
import DashboardNavbar from "../../components/patient/premium/DashboardNavbar";
import DashboardFooter from "../../components/patient/premium/DashboardFooter";
import StatCard from "../../components/patient/premium/StatCard";
import HealthChart from "../../components/patient/premium/HealthChart";
import EmergencyButton from "../../components/patient/premium/EmergencyButton";
import EmptyState from "../../components/patient/premium/EmptyState";
import { AppointmentCard, PrescriptionCard, RecordRow } from "../../components/patient/premium/Cards";
import QuickActions from "../../components/patient/premium/QuickActions";
import PatientUpdatesFeed from "../../components/patient/premium/PatientUpdatesFeed";
import ReviewModal from "../../components/patient/premium/ReviewModal";

// Fallback image
const profilePic = "https://placehold.co/120x120.png?text=P";

export default function PatientDashboard() {
  const [user, setUser] = useState(null);
  const [patientProfile, setPatientProfile] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [patientUpdates, setPatientUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);

  useEffect(() => {
    // Role-based access control
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      if (userData.role !== "PATIENT") {
        const correctDashboard = userData.role === "ADMIN" ? "/dashboard/admin" :
          userData.role === "DOCTOR" ? "/dashboard/doctor" :
            userData.role === "NURSE" ? "/dashboard/nurse" : "/auth";
        window.location.href = correctDashboard;
        return;
      }
    }

    // Fetch patient dashboard data
    async function fetchData() {
      try {
        const res = await fetch("/api/patient");
        if (res.status === 401 || res.status === 404) {
          window.location.href = "/auth";
          return;
        }
        if (!res.ok) throw new Error("Failed to fetch patient data");

        const data = await res.json();
        setUser(data.user);
        setPatientProfile(data.patientProfile);
        setAppointments(data.appointments || []);
        setPrescriptions(data.prescriptions || []);
        setMedicalRecords(data.medicalRecords || []);

        // Fetch patient updates
        const updatesRes = await fetch("/api/patient-updates?limit=5");
        if (updatesRes.ok) {
          const updatesData = await updatesRes.json();
          setPatientUpdates(updatesData.updates || []);
        }
      } catch (e) {
        console.error(e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
    window.location.href = "/auth";
  };

  if (loading) return <LoadingScreen />;
  if (error) return <ErrorScreen msg={error} />;

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen font-sans text-gray-900 bg-[#F9FAFB]">

      <DashboardNavbar user={user} handleLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-6 py-8">

        {/* Hero Section */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Welcome back, <span className="text-teal-600">{user?.name?.split(" ")[0]}</span>!
          </h1>
          <p className="text-gray-500 mt-1">Here is your health snapshot for today.</p>
        </motion.div>

        {/* Quick Actions Row */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap gap-4 mb-10"
        >
          <Link href="/dashboard/patient/appointments/new" className="flex items-center gap-2 bg-teal-600 text-white px-5 py-3 rounded-xl hover:bg-teal-700 font-medium shadow-sm transition-all hover:-translate-y-0.5">
            <Calendar className="h-5 w-5" /> Book Appointment
          </Link>
          <Link href="/dashboard/patient/records" className="flex items-center gap-2 bg-white text-gray-700 border border-gray-200 px-5 py-3 rounded-xl hover:bg-gray-50 font-medium shadow-sm transition-all hover:-translate-y-0.5">
            <FileText className="h-5 w-5 text-teal-600" /> View Records
          </Link>
          <button
            onClick={() => setShowReviewModal(true)}
            className="flex items-center gap-2 bg-white text-gray-700 border border-gray-200 px-5 py-3 rounded-xl hover:bg-gray-50 font-medium shadow-sm transition-all hover:-translate-y-0.5"
          >
            <Star className="h-5 w-5 text-yellow-500" /> Leave a Review
          </button>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Stats Grid */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <StatCard
              icon={<Calendar className="h-6 w-6" />}
              label="Appointments"
              value={appointments.length}
              sub="Upcoming"
              color="bg-teal-600"
              trend={12}
            />
            <StatCard
              icon={<Pill className="h-6 w-6" />}
              label="Prescriptions"
              value={prescriptions.length}
              sub="Active"
              color="bg-emerald-600"
              trend={-5}
            />
            <StatCard
              icon={<Activity className="h-6 w-6" />}
              label="Vitals"
              value="Normal"
              sub="Last checkup"
              color="bg-blue-600"
              trend={2}
            />
            <StatCard
              icon={<FileText className="h-6 w-6" />}
              label="Records"
              value={medicalRecords.length}
              sub="Total files"
              color="bg-indigo-600"
            />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Left Column (Main Content) */}
            <div className="lg:col-span-2 space-y-8">

              {/* Upcoming Appointments */}
              <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-md p-6 border border-teal-100">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-teal-600" /> Upcoming Appointments
                  </h3>
                  <Link href="/dashboard/patient/appointments" className="text-sm font-medium text-teal-600 hover:text-teal-700 flex items-center gap-1">
                    View All <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                {appointments.length === 0 ? (
                  <EmptyState
                    icon={Calendar}
                    title="No upcoming appointments"
                    message="You're all clear! Schedule your next checkup when needed."
                  />
                ) : (
                  <div className="space-y-4">
                    {appointments.map((appt) => (
                      <AppointmentCard key={appt.id} appt={appt} />
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Health Overview Chart */}
              <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-md p-6 border border-teal-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
                  <Activity className="h-5 w-5 text-teal-600" /> Health Trends
                </h3>
                <div className="h-80">
                  <HealthChart dark={false} />
                </div>
              </motion.div>

            </div>

            {/* Right Column (Sidebar Widgets) */}
            <div className="space-y-8">

              {/* Active Prescriptions */}
              <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-md p-6 border border-teal-100">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <Pill className="h-5 w-5 text-emerald-600" /> Medications
                  </h3>
                  <span className="text-xs font-bold bg-emerald-100 text-emerald-700 px-2 py-1 rounded-lg">
                    {prescriptions.length} Active
                  </span>
                </div>

                {prescriptions.length === 0 ? (
                  <EmptyState
                    icon={Pill}
                    title="No active prescriptions"
                    message="You don't have any active medications."
                    compact
                  />
                ) : (
                  <div className="space-y-4">
                    {prescriptions.map((p) => (
                      <PrescriptionCard key={p.id} p={p} />
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Patient Updates */}
              <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-md p-6 border border-teal-100">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-blue-600" /> Recent Updates
                  </h3>
                  <Link href="/dashboard/patient/updates" className="text-sm font-medium text-teal-600 hover:text-teal-700 flex items-center gap-1">
                    View All <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                <PatientUpdatesFeed updates={patientUpdates.slice(0, 3)} />
              </motion.div>

            </div>
          </div>

          {/* Review Modal */}
          <ReviewModal
            isOpen={showReviewModal}
            onClose={() => setShowReviewModal(false)}
            onSubmit={(review) => {
              console.log("Review submitted:", review);
              // Optionally refresh data or show success message
            }}
          />

        </motion.div>
      </main>

      <DashboardFooter />

      {/* Sticky Emergency Button */}
      <EmergencyButton />

    </div>
  );
}

function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center  ">
      <div className="flex flex-col items-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-sky-200 dark:border-sky-900 border-t-sky-600 dark:border-t-sky-400 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Activity className="h-8 w-8 text-sky-600 dark:text-sky-400 animate-pulse" />
          </div>
        </div>
        <p className="text-gray-500 dark:text-gray-400 font-medium mt-6 animate-pulse tracking-wide">Loading Experience...</p>
      </div>
    </div>
  );
}

function ErrorScreen({ msg }) {
  return (
    <div className="min-h-screen flex items-center justify-center   p-4">
      <div className="text-center max-w-md p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700">
        <div className="w-20 h-20 bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
          <AlertCircle className="h-10 w-10" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Something went wrong</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8">{msg}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-8 py-3 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-sky-500/30 hover:shadow-sky-500 hover:-translate-y-1"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
