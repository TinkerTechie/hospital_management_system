"use client";

import React, { useState, useEffect } from "react";
import DoctorDashboardSidebar from "../../../components/doctor/DoctorDashboardSidebar";
import { Search, MoreVertical, FileText, Phone, Mail, MapPin } from "lucide-react";

export default function DoctorPatientsPage() {
    const [dark, setDark] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const theme = localStorage.getItem("theme");
            setDark(theme === "dark");
        }
    }, []);

    // Mock Data
    const patients = [
        { id: 1, name: "Sarah Johnson", age: 34, gender: "Female", phone: "+1 (555) 123-4567", lastVisit: "Oct 24, 2023", condition: "Healthy" },
        { id: 2, name: "Michael Chen", age: 45, gender: "Male", phone: "+1 (555) 987-6543", lastVisit: "Nov 12, 2023", condition: "Hypertension" },
        { id: 3, name: "Emma Wilson", age: 28, gender: "Female", phone: "+1 (555) 456-7890", lastVisit: "Nov 18, 2023", condition: "Pregnancy" },
        { id: 4, name: "James Brown", age: 62, gender: "Male", phone: "+1 (555) 222-3333", lastVisit: "Nov 05, 2023", condition: "Diabetes" },
        { id: 5, name: "Linda Davis", age: 50, gender: "Female", phone: "+1 (555) 444-5555", lastVisit: "Oct 30, 2023", condition: "Arthritis" },
        { id: 6, name: "Robert Miller", age: 41, gender: "Male", phone: "+1 (555) 777-8888", lastVisit: "Nov 15, 2023", condition: "Flu" },
    ];

    return (
        <div className={dark ? "dark" : ""}>
            <div className="  min-h-screen flex font-sans text-gray-900 transition-colors duration-300">
                <div className="hidden md:block">
                    <DoctorDashboardSidebar />
                </div>

                <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto overflow-y-auto">
                    <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Patients</h1>
                            <p className="text-gray-500 dark:text-gray-400">Total {patients.length} active patients under your care.</p>
                        </div>
                        <button className="px-4 py-2 bg-teal-600 text-white rounded-xl font-medium hover:bg-teal-700 transition-colors shadow-lg shadow-teal-200 dark:shadow-none">
                            + Add New Patient
                        </button>
                    </header>

                    {/* Search */}
                    <div className="mb-8 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by name, ID, or condition..."
                                className="w-full pl-10 pr-4 py-3  dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-gray-800 dark:text-white placeholder-gray-400"
                            />
                        </div>
                    </div>

                    {/* Patients Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {patients.map((patient) => (
                            <div key={patient.id} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all group">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-teal-200 dark:shadow-none">
                                        {patient.name.charAt(0)}
                                    </div>
                                    <button className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-400 transition-colors">
                                        <MoreVertical className="h-5 w-5" />
                                    </button>
                                </div>

                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{patient.name}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                                    {patient.age} yrs • {patient.gender}
                                </p>

                                <div className="space-y-2 mb-6">
                                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                                        <Phone className="h-4 w-4 text-gray-400" />
                                        {patient.phone}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                                        <FileText className="h-4 w-4 text-gray-400" />
                                        Last Visit: {patient.lastVisit}
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
                                    <span className="px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs font-medium">
                                        {patient.condition}
                                    </span>
                                    <button className="text-sm font-medium text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300">
                                        View Profile
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
}
