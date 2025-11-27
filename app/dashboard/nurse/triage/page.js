"use client";

import React, { useState, useEffect } from "react";
import NurseDashboardSidebar from "../../../components/nurse/NurseDashboardSidebar";
import { Clipboard, AlertTriangle, CheckCircle, Clock, MoreVertical, User, X, Save, FileText } from "lucide-react";

export default function NurseTriagePage() {
    const [dark, setDark] = useState(false);
    const [showAdmitModal, setShowAdmitModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [admitData, setAdmitData] = useState({
        ward: "",
        bed: "",
        notes: ""
    });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const theme = localStorage.getItem("theme");
            setDark(theme === "dark");
        }
    }, []);

    // Mock Data
    const triageQueue = [
        { id: 1, name: "John Doe", age: 45, condition: "Chest Pain", priority: "High", waitingTime: "10m", symptoms: "Severe chest pressure, sweating", vitals: { bp: "145/95", hr: 98, temp: "98.6°F", o2: "94%" } },
        { id: 2, name: "Jane Smith", age: 28, condition: "High Fever", priority: "Medium", waitingTime: "25m", symptoms: "Temp 103F, chills", vitals: { bp: "120/80", hr: 88, temp: "103°F", o2: "98%" } },
        { id: 3, name: "Bob Wilson", age: 62, condition: "Minor Cut", priority: "Low", waitingTime: "45m", symptoms: "Laceration on finger", vitals: { bp: "130/85", hr: 72, temp: "98.4°F", o2: "99%" } },
        { id: 4, name: "Alice Brown", age: 35, condition: "Abdominal Pain", priority: "Medium", waitingTime: "15m", symptoms: "Lower right quadrant pain", vitals: { bp: "125/82", hr: 85, temp: "99.1°F", o2: "97%" } },
        { id: 5, name: "Charlie Davis", age: 50, condition: "Shortness of Breath", priority: "High", waitingTime: "5m", symptoms: "History of asthma", vitals: { bp: "140/90", hr: 105, temp: "98.8°F", o2: "91%" } },
    ];

    const getPriorityColor = (priority) => {
        switch (priority) {
            case "High": return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800";
            case "Medium": return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200 dark:border-orange-800";
            case "Low": return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800";
            default: return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400";
        }
    };

    const handleAdmit = (patient) => {
        setSelectedPatient(patient);
        setShowAdmitModal(true);
    };

    const handleDetails = (patient) => {
        setSelectedPatient(patient);
        setShowDetailsModal(true);
    };

    const handleSubmitAdmit = async () => {
        setSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setSubmitting(false);
        setShowAdmitModal(false);
        setAdmitData({ ward: "", bed: "", notes: "" });
        alert(`${selectedPatient.name} has been admitted to Ward ${admitData.ward}, Bed ${admitData.bed}`);
    };

    return (
        <div className={dark ? "dark" : ""}>
            <div className="min-h-screen flex font-sans bg-gradient-to-br from-gray-50 via-teal-50/30 to-gray-50 dark:from-gray-900 dark:via-teal-900/10 dark:to-gray-900 transition-colors duration-300">
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
                            <div key={patient.id} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 relative overflow-hidden">
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
                                    <button
                                        onClick={() => handleAdmit(patient)}
                                        className="flex-1 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-sm font-medium transition-colors"
                                    >
                                        Admit
                                    </button>
                                    <button
                                        onClick={() => handleDetails(patient)}
                                        className="flex-1 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-medium transition-colors"
                                    >
                                        Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            </div>

            {/* Admit Patient Modal */}
            {showAdmitModal && selectedPatient && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6 relative">
                        <button
                            onClick={() => setShowAdmitModal(false)}
                            className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        >
                            <X className="h-5 w-5 text-gray-500" />
                        </button>

                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Admit Patient</h2>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                            {selectedPatient.name} • {selectedPatient.condition}
                        </p>

                        <div className="space-y-4 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Ward *
                                </label>
                                <input
                                    type="text"
                                    value={admitData.ward}
                                    onChange={(e) => setAdmitData({ ...admitData, ward: e.target.value })}
                                    placeholder="e.g., ICU, General, Cardiology"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Bed Number *
                                </label>
                                <input
                                    type="text"
                                    value={admitData.bed}
                                    onChange={(e) => setAdmitData({ ...admitData, bed: e.target.value })}
                                    placeholder="e.g., 101-A"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Admission Notes
                                </label>
                                <textarea
                                    value={admitData.notes}
                                    onChange={(e) => setAdmitData({ ...admitData, notes: e.target.value })}
                                    placeholder="Additional notes..."
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none resize-none"
                                    rows="3"
                                />
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowAdmitModal(false)}
                                className="flex-1 px-4 py-2.5 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmitAdmit}
                                disabled={!admitData.ward || !admitData.bed || submitting}
                                className="flex-1 px-4 py-2.5 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {submitting ? (
                                    <>
                                        <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Admitting...
                                    </>
                                ) : (
                                    <>
                                        <Save className="h-4 w-4" />
                                        Admit Patient
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Patient Details Modal */}
            {showDetailsModal && selectedPatient && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full p-6 relative max-h-[90vh] overflow-y-auto">
                        <button
                            onClick={() => setShowDetailsModal(false)}
                            className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        >
                            <X className="h-5 w-5 text-gray-500" />
                        </button>

                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Patient Details</h2>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                            Triage Information
                        </p>

                        <div className="space-y-6">
                            {/* Patient Info */}
                            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Patient Information</h3>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <p className="text-gray-500 dark:text-gray-400">Name</p>
                                        <p className="font-medium text-gray-900 dark:text-white">{selectedPatient.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 dark:text-gray-400">Age</p>
                                        <p className="font-medium text-gray-900 dark:text-white">{selectedPatient.age} years</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 dark:text-gray-400">Priority</p>
                                        <span className={`inline-block px-2 py-1 rounded text-xs font-bold ${getPriorityColor(selectedPatient.priority)}`}>
                                            {selectedPatient.priority}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 dark:text-gray-400">Waiting Time</p>
                                        <p className="font-medium text-gray-900 dark:text-white">{selectedPatient.waitingTime}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Condition */}
                            <div>
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Condition</h3>
                                <p className="text-gray-700 dark:text-gray-300">{selectedPatient.condition}</p>
                            </div>

                            {/* Symptoms */}
                            <div>
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Symptoms</h3>
                                <p className="text-gray-700 dark:text-gray-300">{selectedPatient.symptoms}</p>
                            </div>

                            {/* Vitals */}
                            <div>
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Vital Signs</h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3 text-center">
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Blood Pressure</p>
                                        <p className="font-bold text-gray-900 dark:text-white">{selectedPatient.vitals.bp}</p>
                                    </div>
                                    <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-3 text-center">
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Heart Rate</p>
                                        <p className="font-bold text-gray-900 dark:text-white">{selectedPatient.vitals.hr} bpm</p>
                                    </div>
                                    <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-3 text-center">
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Temperature</p>
                                        <p className="font-bold text-gray-900 dark:text-white">{selectedPatient.vitals.temp}</p>
                                    </div>
                                    <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-3 text-center">
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">O2 Saturation</p>
                                        <p className="font-bold text-gray-900 dark:text-white">{selectedPatient.vitals.o2}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex gap-3">
                            <button
                                onClick={() => {
                                    setShowDetailsModal(false);
                                    handleAdmit(selectedPatient);
                                }}
                                className="flex-1 px-4 py-2.5 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors font-medium"
                            >
                                Admit Patient
                            </button>
                            <button
                                onClick={() => setShowDetailsModal(false)}
                                className="px-4 py-2.5 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
