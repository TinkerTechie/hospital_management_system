"use client";

import React, { useState, useEffect } from "react";
import DoctorDashboardSidebar from "../../../components/doctor/DoctorDashboardSidebar";
import { Calendar, Clock, Search, Filter, MoreVertical, CheckCircle, XCircle, AlertCircle } from "lucide-react";

export default function DoctorAppointmentsPage() {
    const [dark, setDark] = useState(false);
    const [filter, setFilter] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const theme = localStorage.getItem("theme");
            setDark(theme === "dark");
        }
    }, []);

    useEffect(() => {
        const fetchAppointments = async () => {
            setLoading(true);
            try {
                const params = new URLSearchParams();
                if (filter !== "All") params.append("status", filter);
                if (searchQuery) params.append("search", searchQuery);

                const res = await fetch(`/api/doctor/appointments?${params.toString()}`);
                if (res.ok) {
                    const data = await res.json();
                    setAppointments(data.appointments || []);
                }
            } catch (error) {
                console.error("Error fetching appointments:", error);
            } finally {
                setLoading(false);
            }
        };

        // Debounce search
        const timeoutId = setTimeout(() => {
            fetchAppointments();
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [filter, searchQuery]);

    const getStatusColor = (status) => {
        switch (status) {
            case "Completed": return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
            case "Upcoming": return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
            case "Cancelled": return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
            default: return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400";
        }
    };

    return (
        <div className={dark ? "dark" : ""}>
            <div className="  min-h-screen flex font-sans text-gray-900 transition-colors duration-300">
                <div className="hidden md:block">
                    <DoctorDashboardSidebar />
                </div>

                <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto overflow-y-auto">
                    <header className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Appointments</h1>
                        <p className="text-gray-500 dark:text-gray-400">Manage your schedule and patient visits.</p>
                    </header>

                    {/* Controls */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                        <div className="relative w-full md:w-96">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search appointments..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2  dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-gray-800 dark:text-white placeholder-gray-400"
                            />
                        </div>

                        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
                            {["All", "Upcoming", "Completed"].map((f) => (
                                <button
                                    key={f}
                                    onClick={() => setFilter(f)}
                                    className={`px-4 py-2 text-sm font-medium rounded-xl transition-colors whitespace-nowrap ${filter === f
                                        ? "bg-teal-600 text-white shadow-md shadow-teal-200 dark:shadow-none"
                                        : " dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                                        }`}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Appointments List */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                        {loading ? (
                            <div className="p-10 text-center text-gray-500">Loading appointments...</div>
                        ) : (
                            <>
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className=" dark:bg-gray-700/30 border-b border-gray-100 dark:border-gray-700 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                <th className="px-6 py-4">Patient</th>
                                                <th className="px-6 py-4">Date & Time</th>
                                                <th className="px-6 py-4">Type</th>
                                                <th className="px-6 py-4">Status</th>
                                                <th className="px-6 py-4 text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
                                            {appointments.map((appt) => (
                                                <tr key={appt.id} className="group hover: dark:hover:bg-gray-700 transition-colors">
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="h-10 w-10 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-700 dark:text-teal-300 font-bold text-sm">
                                                                {appt.patient?.fullName?.charAt(0) || "P"}
                                                            </div>
                                                            <div>
                                                                <p className="font-medium text-gray-900 dark:text-white">{appt.patient?.fullName || "Unknown"}</p>
                                                                <p className="text-xs text-gray-500 dark:text-gray-400">ID: #{appt.id.slice(0, 6)}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex flex-col">
                                                            <span className="text-sm text-gray-900 dark:text-white font-medium">{appt.time || "N/A"}</span>
                                                            <span className="text-xs text-gray-500 dark:text-gray-400">{new Date(appt.appointmentDate).toLocaleDateString()}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className="text-sm text-gray-600 dark:text-gray-300">{appt.reason || "General"}</span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appt.status)}`}>
                                                            {appt.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                                                            <MoreVertical className="h-5 w-5" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {appointments.length === 0 && (
                                    <div className="p-10 text-center">
                                        <div className="inline-flex p-4 rounded-full  dark:bg-gray-700 mb-4">
                                            <Calendar className="h-8 w-8 text-gray-400" />
                                        </div>
                                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">No appointments found</h3>
                                        <p className="text-gray-500 dark:text-gray-400 mt-1">Try adjusting your filters or search query.</p>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}
