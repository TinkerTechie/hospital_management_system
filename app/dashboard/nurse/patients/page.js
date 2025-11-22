"use client";

import React, { useState, useEffect } from "react";
import NurseDashboardSidebar from "../../../components/nurse/NurseDashboardSidebar";
import { Search, Activity, Bed, Thermometer, Heart, MoreHorizontal } from "lucide-react";

export default function NursePatientsPage() {
    const [dark, setDark] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const theme = localStorage.getItem("theme");
            setDark(theme === "dark");
        }
    }, []);

    // Mock Data
    const patients = [
        { id: 1, name: "Sarah Johnson", bed: "101-A", condition: "Stable", vitals: { hr: 72, bp: "120/80", temp: "98.6" }, diagnosis: "Post-op Recovery" },
        { id: 2, name: "Michael Chen", bed: "102-B", condition: "Critical", vitals: { hr: 110, bp: "140/95", temp: "101.2" }, diagnosis: "Severe Pneumonia" },
        { id: 3, name: "Emma Wilson", bed: "103-A", condition: "Stable", vitals: { hr: 68, bp: "118/75", temp: "98.4" }, diagnosis: "Observation" },
        { id: 4, name: "James Brown", bed: "104-C", condition: "Improving", vitals: { hr: 85, bp: "130/85", temp: "99.1" }, diagnosis: "Infection" },
    ];

    const getConditionColor = (condition) => {
        switch (condition) {
            case "Stable": return "text-green-600 bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-900/30";
            case "Critical": return "text-red-600 bg-red-50 dark:bg-red-900/20 border-red-100 dark:border-red-900/30";
            case "Improving": return "text-blue-600 bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-900/30";
            default: return "text-gray-600  dark:bg-gray-800 border-gray-100 dark:border-gray-700";
        }
    };

    return (
        <div className={dark ? "dark" : ""}>
            <div className="  min-h-screen flex font-sans text-gray-900 transition-colors duration-300">
                <div className="hidden md:block">
                    <NurseDashboardSidebar />
                </div>

                <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto overflow-y-auto">
                    <header className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Assigned Patients</h1>
                            <p className="text-gray-500 dark:text-gray-400">Monitoring {patients.length} patients in Ward A.</p>
                        </div>

                        <div className="relative w-full md:w-72">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search patients..."
                                className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-gray-800 dark:text-white placeholder-gray-400"
                            />
                        </div>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
                        {patients.map((patient) => (
                            <div key={patient.id} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex items-center gap-4">
                                        <div className="h-14 w-14 rounded-xl bg-teal-50 dark:bg-teal-900/20 flex flex-col items-center justify-center border border-teal-100 dark:border-teal-900/30">
                                            <Bed className="h-6 w-6 text-teal-600 dark:text-teal-400 mb-1" />
                                            <span className="text-xs font-bold text-teal-700 dark:text-teal-300">{patient.bed}</span>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg text-gray-900 dark:text-white">{patient.name}</h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">{patient.diagnosis}</p>
                                        </div>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getConditionColor(patient.condition)}`}>
                                        {patient.condition}
                                    </span>
                                </div>

                                <div className="grid grid-cols-3 gap-4 mb-6">
                                    <div className="p-3  dark:bg-gray-700/30 rounded-xl text-center">
                                        <Heart className="h-5 w-5 text-rose-500 mx-auto mb-1" />
                                        <p className="text-lg font-bold text-gray-800 dark:text-white">{patient.vitals.hr}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">BPM</p>
                                    </div>
                                    <div className="p-3  dark:bg-gray-700/30 rounded-xl text-center">
                                        <Activity className="h-5 w-5 text-blue-500 mx-auto mb-1" />
                                        <p className="text-lg font-bold text-gray-800 dark:text-white">{patient.vitals.bp}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">mmHg</p>
                                    </div>
                                    <div className="p-3  dark:bg-gray-700/30 rounded-xl text-center">
                                        <Thermometer className="h-5 w-5 text-orange-500 mx-auto mb-1" />
                                        <p className="text-lg font-bold text-gray-800 dark:text-white">{patient.vitals.temp}°</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">F</p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <button className="flex-1 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-sm font-medium transition-colors">
                                        Update Vitals
                                    </button>
                                    <button className="p-2.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 rounded-xl transition-colors">
                                        <MoreHorizontal className="h-5 w-5" />
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
