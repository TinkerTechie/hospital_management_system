"use client";

import React, { useState, useEffect } from "react";
import NurseDashboardSidebar from "../../../components/nurse/NurseDashboardSidebar";
import { Clipboard, AlertTriangle, CheckCircle, Clock, MoreVertical, User } from "lucide-react";

export default function NurseTriagePage() {
    const [dark, setDark] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const theme = localStorage.getItem("theme");
            setDark(theme === "dark");
        }
    }, []);

    // Mock Data
    const triageQueue = [
        { id: 1, name: "John Doe", age: 45, condition: "Chest Pain", priority: "High", waitingTime: "10m", symptoms: "Severe chest pressure, sweating" },
        { id: 2, name: "Jane Smith", age: 28, condition: "High Fever", priority: "Medium", waitingTime: "25m", symptoms: "Temp 103F, chills" },
        { id: 3, name: "Bob Wilson", age: 62, condition: "Minor Cut", priority: "Low", waitingTime: "45m", symptoms: "Laceration on finger" },
        { id: 4, name: "Alice Brown", age: 35, condition: "Abdominal Pain", priority: "Medium", waitingTime: "15m", symptoms: "Lower right quadrant pain" },
        { id: 5, name: "Charlie Davis", age: 50, condition: "Shortness of Breath", priority: "High", waitingTime: "5m", symptoms: "History of asthma" },
    ];

    const getPriorityColor = (priority) => {
        switch (priority) {
            case "High": return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800";
            case "Medium": return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200 dark:border-orange-800";
            case "Low": return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800";
            default: return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400";
        }
    };

    return (
        <div className={dark ? "dark" : ""}>
            <div className="  min-h-screen flex font-sans text-gray-900 transition-colors duration-300">
                <div className="hidden md:block">
                    <NurseDashboardSidebar />
                </div>

                <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto overflow-y-auto">
                    <header className="mb-8 flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Patient Triage</h1>
                            <p className="text-gray-500 dark:text-gray-400">Prioritize and manage incoming patients.</p>
                        </div>
                        <div className="flex gap-3">
                            <div className="px-4 py-2 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-100 dark:border-red-800 text-red-700 dark:text-red-400 font-medium text-sm">
                                High Priority: {triageQueue.filter(p => p.priority === "High").length}
                            </div>
                            <div className="px-4 py-2 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-100 dark:border-orange-800 text-orange-700 dark:text-orange-400 font-medium text-sm">
                                Medium: {triageQueue.filter(p => p.priority === "Medium").length}
                            </div>
                        </div>
                    </header>

                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                        {triageQueue.map((patient) => (
                            <div key={patient.id} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all relative overflow-hidden">
                                <div className={`absolute top-0 right-0 px-3 py-1 rounded-bl-xl text-xs font-bold border-l border-b ${getPriorityColor(patient.priority)}`}>
                                    {patient.priority} Priority
                                </div>

                                <div className="flex items-start gap-4 mb-4">
                                    <div className="h-12 w-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400">
                                        <User className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-gray-900 dark:text-white">{patient.name}</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{patient.age} yrs • Waiting: {patient.waitingTime}</p>
                                    </div>
                                </div>

                                <div className="space-y-3 mb-6">
                                    <div>
                                        <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">Condition</p>
                                        <p className="text-gray-800 dark:text-gray-200 font-medium">{patient.condition}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">Symptoms</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">{patient.symptoms}</p>
                                    </div>
                                </div>

                                <div className="flex gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                                    <button className="flex-1 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-sm font-medium transition-colors">
                                        Admit
                                    </button>
                                    <button className="flex-1 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-medium transition-colors">
                                        Details
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
