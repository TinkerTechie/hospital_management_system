"use client";

import React, { useState, useEffect } from "react";
import DoctorDashboardSidebar from "../../../components/doctor/DoctorDashboardSidebar";
import { Search, MoreVertical, FileText, Phone, Mail, MapPin, User, Calendar } from "lucide-react";
import { motion } from "framer-motion";

export default function DoctorPatientsPage() {
    const [dark, setDark] = useState(false);
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        if (typeof window !== "undefined") {
            const theme = localStorage.getItem("theme");
            setDark(theme === "dark");
        }
        fetchPatients();
    }, []);

    const fetchPatients = async () => {
        try {
            const res = await fetch('/api/doctor/patients');
            if (res.ok) {
                const data = await res.json();
                setPatients(data.patients || []);
            }
        } catch (error) {
            console.error("Error fetching patients:", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredPatients = patients.filter(patient =>
        patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.condition.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className={dark ? "dark" : ""}>
            <div className="min-h-screen flex font-sans text-gray-900 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
                <div className="hidden md:block">
                    <DoctorDashboardSidebar dark={dark} />
                </div>

                <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto overflow-y-auto">
                    <motion.header
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Patients</h1>
                            <p className="text-gray-500 dark:text-gray-400">
                                Total <span className="font-semibold text-teal-600 dark:text-teal-400">{patients.length}</span> active patients under your care.
                            </p>
                        </div>
                        <button className="px-6 py-3 bg-gradient-to-r from-teal-600 to-teal-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-teal-500/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0">
                            + Add New Patient
                        </button>
                    </motion.header>

                    {/* Search */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mb-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700"
                    >
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search by name, condition, or ID..."
                                className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-gray-800 dark:text-white placeholder-gray-400"
                            />
                        </div>
                    </motion.div>

                    {/* Patients Grid */}
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
                        </div>
                    ) : filteredPatients.length === 0 ? (
                        <div className="text-center py-20">
                            <div className="bg-gray-100 dark:bg-gray-800 h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <User className="h-10 w-10 text-gray-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No patients found</h3>
                            <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or add a new patient.</p>
                        </div>
                    ) : (
                        <motion.div
                            variants={container}
                            initial="hidden"
                            animate="show"
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {filteredPatients.map((patient) => (
                                <motion.div
                                    key={patient.id}
                                    variants={item}
                                    className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:border-teal-500/30 transition-all group duration-300"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-teal-200/50 dark:shadow-none transform group-hover:scale-105 transition-transform duration-300">
                                            {patient.image ? (
                                                <img src={patient.image} alt={patient.name} className="h-full w-full object-cover rounded-2xl" />
                                            ) : (
                                                patient.name.charAt(0)
                                            )}
                                        </div>
                                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl text-gray-400 transition-colors">
                                            <MoreVertical className="h-5 w-5" />
                                        </button>
                                    </div>

                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                                        {patient.name}
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-5 flex items-center gap-2">
                                        <span className="bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded text-xs font-medium">
                                            {patient.age} yrs
                                        </span>
                                        <span>•</span>
                                        <span>{patient.email !== "N/A" ? patient.email : "No email"}</span>
                                    </p>

                                    <div className="space-y-3 mb-6">
                                        <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/30 p-2 rounded-lg">
                                            <Calendar className="h-4 w-4 text-teal-500" />
                                            <span className="font-medium">Last Visit:</span>
                                            {patient.lastVisit}
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/30 p-2 rounded-lg">
                                            <FileText className="h-4 w-4 text-blue-500" />
                                            <span className="font-medium">Condition:</span>
                                            <span className="truncate flex-1">{patient.condition}</span>
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${patient.condition === "No records"
                                                ? "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
                                                : "bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300"
                                            }`}>
                                            {patient.condition === "No records" ? "New Patient" : "Active"}
                                        </span>
                                        <button className="text-sm font-semibold text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 flex items-center gap-1 group-hover:gap-2 transition-all">
                                            View Profile <span className="text-lg">→</span>
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </main>
            </div>
        </div>
    );
}
