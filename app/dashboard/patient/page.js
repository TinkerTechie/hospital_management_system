"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import PatientDashboardSidebar from "../../components/patient/PatientDashboardSidebar";
import {
  Calendar,
  Bell,
  Activity,
  FileText,
  Stethoscope,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

// PNG so Next.js doesn't block SVG
const profilePic = "https://placehold.co/120x120.png?text=P";

export default function PatientDashboard() {
  const [userName, setUserName] = useState("Loading...");
  const [appointments, setAppointments] = useState([]);
  const [activities, setActivities] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [notifications, setNotifications] = useState([
    { id: 1, msg: "Your lab report is now available", time: "2h ago" },
    { id: 2, msg: "Doctor updated your prescription", time: "5h ago" },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setUserName(user.name || "Patient");
      }
      const theme = localStorage.getItem("theme");
      setDark(theme === "dark");
    }

    async function fetchData() {
      try {
        const res = await fetch("/api/dashboard/patient");
        if (!res.ok) return;
        const data = await res.json();

        setAppointments(data.appointments || []);
        setActivities(data.activities || []);
        setPrescriptions(data.prescriptions || []);
      } catch (e) {
        console.error(e);
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

  const chartData = {
    series: [
      {
        name: "Health Score",
        data: [78, 83, 80, 87, 90, 92],
      },
    ],
    options: {
      chart: { toolbar: { show: false }, foreColor: dark ? "#ffffff" : "#1F2937" },
      xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
      colors: ["#0E9F6E"], // updated to homepage teal
      stroke: { width: 3 },
      grid: { borderColor: dark ? "#444" : "#E5E7EB" },
    },
  };

  return (
    <div className={dark ? "dark" : ""}>
      <section className="bg-[#F8F9FA] dark:bg-gray-900 min-h-screen flex">
        <PatientDashboardSidebar userName={userName} profilePic={profilePic} />

        <main className="flex-1 p-6 md:p-10 max-w-6xl mx-auto dark:text-gray-200">
          
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-[#1F2937] dark:text-gray-200">
              Welcome, {userName} 👋
            </h1>

            <div className="flex items-center gap-4">
              <button
                onClick={toggleDark}
                className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-[#E6F4F1] dark:hover:bg-gray-800 transition"
              >
                {dark ? "☀ Light" : "🌙 Dark"}
              </button>

              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative"
                >
                  <Bell className="h-7 w-7 text-[#1F2937] dark:text-gray-200" />
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                    {notifications.length}
                  </span>
                </button>

                {showNotifications && (
                  <div className="absolute right-0 mt-2 bg-white dark:bg-gray-800 p-4 shadow-xl rounded-xl w-72 border border-gray-200 dark:border-gray-700">
                    <h3 className="font-semibold mb-3 text-[#1F2937] dark:text-gray-200">Notifications</h3>
                    <div className="space-y-2">
                      {notifications.map((n) => (
                        <div
                          key={n.id}
                          className="p-2 rounded-lg bg-[#F8F9FA] dark:bg-gray-700 flex justify-between"
                        >
                          <span className="text-[#1F2937] dark:text-gray-200">{n.msg}</span>
                          <span className="text-xs text-[#6B7280]">{n.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Stats */}
          <StatsRow appointments={appointments} />

          {/* Chart */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm my-10 border border-gray-200 dark:border-gray-700">
            <h2 className="font-semibold text-xl text-[#1F2937] dark:text-gray-200 mb-4">
              Health Score Trend
            </h2>
            <Chart options={chartData.options} series={chartData.series} height={300} />
          </div>

          {/* Timeline */}
          <ActivityTimeline activities={activities} />

          {/* Appointments */}
          <AppointmentsSection appointments={appointments} loading={loading} />

          {/* Prescriptions */}
          <PrescriptionSection prescriptions={prescriptions} />

          {/* Health Tips */}
          <HealthTipsCarousel />

          {/* Emergency */}
          <EmergencyCard />
        </main>
      </section>
    </div>
  );
}

/* -------------------------------------------
   COMPONENTS BELOW — ONLY COLORS UPDATED
-------------------------------------------*/

function StatsRow({ appointments }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard icon={<Calendar />} title="Total Appointments" value={appointments.length} />
      <StatCard icon={<Activity />} title="Health Score" value="92%" />
      <StatCard icon={<FileText />} title="Pending Lab Results" value="1" />
      <StatCard icon={<Stethoscope />} title="Next Visit" value="Mar 12, 2025" />
    </div>
  );
}

function StatCard({ icon, title, value }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-[#F1F5F4] dark:bg-gray-700 rounded-full text-[#0E9F6E]">
          {icon}
        </div>
        <div>
          <p className="text-[#6B7280] dark:text-gray-400 text-sm">{title}</p>
          <p className="text-2xl font-bold text-[#1F2937] dark:text-gray-100">{value}</p>
        </div>
      </div>
    </div>
  );
}

function ActivityTimeline({ activities }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 my-10">
      <h2 className="font-semibold text-xl text-[#1F2937] dark:text-gray-200 mb-4">Recent Activity</h2>

      {activities.length === 0 ? (
        <p className="text-[#6B7280]">No recent activity.</p>
      ) : (
        <div className="space-y-5">
          {activities.map((a, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="w-3 h-3 bg-[#0E9F6E] rounded-full mt-2"></div>
              <div>
                <p className="font-medium text-[#1F2937] dark:text-gray-200">{a.title}</p>
                <p className="text-sm text-[#6B7280]">{a.time}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function AppointmentsSection({ appointments, loading }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 my-10">
      <h2 className="font-semibold text-xl text-[#1F2937] dark:text-gray-200 mb-4">Upcoming Appointments</h2>

      {loading ? (
        <p>Loading...</p>
      ) : appointments.length === 0 ? (
        <EmptyAppointments />
      ) : (
        <div className="space-y-4">
          {appointments.map((appt) => (
            <AppointmentCard key={appt.id} appt={appt} />
          ))}
        </div>
      )}
    </div>
  );
}

function AppointmentCard({ appt }) {
  return (
    <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition flex justify-between">
      <div>
        <p className="font-semibold text-lg text-[#1F2937] dark:text-gray-200">{appt.doctorName || "Dr. John Doe"}</p>
        <p className="text-[#6B7280] dark:text-gray-400 text-sm">{appt.department || "General Medicine"}</p>
        <p className="text-[#6B7280] text-sm mt-1">
          {new Date(appt.dateTime).toLocaleDateString()} •{" "}
          {new Date(appt.dateTime).toLocaleTimeString()}
        </p>
      </div>

      <button className="px-4 py-2 bg-[#0E9F6E] text-white rounded-lg hover:bg-[#0C8B60] transition text-sm">
        Join Telehealth
      </button>
    </div>
  );
}

function PrescriptionSection({ prescriptions }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 my-10">
      <h2 className="font-semibold text-xl text-[#1F2937] dark:text-gray-200 mb-4">Prescriptions & Refills</h2>

      {prescriptions.length === 0 ? (
        <p className="text-[#6B7280]">No prescriptions yet.</p>
      ) : (
        <div className="space-y-4">
          {prescriptions.map((p) => (
            <div key={p.id} className="p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <p className="font-semibold text-[#1F2937] dark:text-gray-200">{p.medication}</p>
              <p className="text-sm text-[#6B7280]">Refill on: {p.refillDate}</p>
              <button className="mt-2 px-4 py-2 bg-[#0E9F6E] text-white rounded-lg hover:bg-[#0C8B60] text-sm">
                Request Refill
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function HealthTipsCarousel() {
  const tips = [
    "Drink 2L of water daily to stay hydrated.",
    "Walk 5,000–10,000 steps a day for better heart health.",
    "Get 7–8 hours of sleep every night.",
  ];
  const [index, setIndex] = useState(0);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 my-10">
      <h2 className="font-semibold text-xl text-[#1F2937] dark:text-gray-200 mb-4">Health Tips</h2>

      <div className="flex items-center justify-between">
        <button onClick={() => setIndex((i) => (i - 1 + tips.length) % tips.length)}>
          <ChevronLeft className="text-[#0E9F6E]" />
        </button>

        <p className="text-center text-lg font-medium text-[#1F2937] dark:text-gray-200 w-full">{tips[index]}</p>

        <button onClick={() => setIndex((i) => (i + 1) % tips.length)}>
          <ChevronRight className="text-[#0E9F6E]" />
        </button>
      </div>
    </div>
  );
}

function EmergencyCard() {
  return (
    <div className="bg-[#FFE8E8] dark:bg-red-900 p-6 rounded-2xl shadow-sm border border-red-300 dark:border-red-700 text-[#B91C1C] dark:text-red-200 mb-16">
      <h2 className="font-semibold text-xl mb-2">Emergency Contact</h2>
      <p className="text-lg font-medium">Call: 108 or +91 9876543210</p>
      <button className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
        Call Now
      </button>
    </div>
  );
}

function EmptyAppointments() {
  return (
    <div className="text-center py-10">
      <Calendar className="h-12 w-12 mx-auto text-[#0E9F6E] mb-4" />
      <h3 className="text-lg font-semibold text-[#1F2937] dark:text-gray-200 mb-2">
        No Appointments Yet
      </h3>
      <p className="text-[#6B7280] dark:text-gray-400 mb-4">
        You&apos;re all caught up. Book a visit to stay on track with your health.
      </p>

      <button className="px-6 py-3 bg-[#0E9F6E] text-white rounded-lg font-medium hover:bg-[#0C8B60] transition">
        Schedule Appointment
      </button>
    </div>
  );
}
