"use client";

import React, { useState, useEffect } from "react";
import PatientDashboardSidebar from "../../../components/patient/PatientDashboardSidebar";
import { FileText, Download, Eye, Search, Filter, Calendar } from "lucide-react";

export default function PatientRecordsPage() {
    const [dark, setDark] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const theme = localStorage.getItem("theme");
            setDark(theme === "dark");
        }
    }, []);

    const toggleDark = () => {
        const newTheme = !dark;
        setDark(newTheme);
        if (typeof window !== "undefined") {
            localStorage.setItem("theme", newTheme ? "dark" : "light");
            if (newTheme) {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }
        }
    };

    // Mock Data
    const records = [
        { id: 1, title: "Blood Test Results", type: "Lab Report", date: "Nov 20, 2023", doctor: "Dr. Sarah Johnson", size: "1.2 MB" },
        { id: 2, title: "X-Ray Report", type: "Radiology", date: "Oct 15, 2023", doctor: "Dr. James Brown", size: "4.5 MB" },
        { id: 3, title: "General Checkup Summary", type: "Prescription", date: "Sep 10, 2023", doctor: "Dr. Emily Wilson", size: "0.8 MB" },
        { id: 4, title: "MRI Scan", type: "Radiology", date: "Aug 05, 2023", doctor: "Dr. Michael Chen", size: "12.0 MB" },
        { id: 5, title: "Vaccination Record", type: "Certificate", date: "Jul 22, 2023", doctor: "Hospital Admin", size: "0.5 MB" },
    ];

    const getTypeColor = (type) => {
        switch (type) {
            case "Lab Report": return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
            case "Radiology": return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400";
            case "Prescription": return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
            default: return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400";
        }
    };

    return (
        <div className={dark ? "dark" : ""}>
            <div className="  min-h-screen flex font-sans text-gray-900 transition-colors duration-300">
                <div className="hidden md:block">
                    <PatientDashboardSidebar dark={dark} toggleDark={toggleDark} />
                </div>

                <main className="flex-1 p-6 md:p-10 max-w-5xl mx-auto overflow-y-auto">
                    <header className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Medical Records</h1>
                        <p className="text-gray-500 dark:text-gray-400">Access and download your medical history documents.</p>
                    </header>

                    {/* Controls */}
                    <div className="flex flex-col md:flex-row gap-4 mb-8">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search records..."
                                className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-gray-800 dark:text-white placeholder-gray-400"
                            />
                        </div>
                        <button className="px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-600 dark:text-gray-300 hover: dark:hover:bg-gray-700 transition-colors flex items-center gap-2 text-sm font-medium">
                            <Filter className="h-4 w-4" /> Filter
                        </button>
                        <button className="px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-600 dark:text-gray-300 hover: dark:hover:bg-gray-700 transition-colors flex items-center gap-2 text-sm font-medium">
                            <Calendar className="h-4 w-4" /> Date Range
                        </button>
                    </div>

                    {/* Records List */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className=" dark:bg-gray-700/30 border-b border-gray-100 dark:border-gray-700 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        <th className="px-6 py-4">Document Name</th>
                                        <th className="px-6 py-4">Type</th>
                                        <th className="px-6 py-4">Date</th>
                                        <th className="px-6 py-4">Doctor</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
                                    {records.map((record) => (
                                        <tr key={record.id} className="group hover: dark:hover:bg-gray-700 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400">
                                                        <FileText className="h-5 w-5" />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-gray-900 dark:text-white">{record.title}</p>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">{record.size}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(record.type)}`}>
                                                    {record.type}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm text-gray-600 dark:text-gray-300">{record.date}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm text-gray-600 dark:text-gray-300">{record.doctor}</span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors" title="View">
                                                        <Eye className="h-4 w-4" />
                                                    </button>
                                                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" title="Download">
                                                        <Download className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
