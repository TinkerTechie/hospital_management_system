"use client";

import React, { useState, useEffect } from "react";
import NurseDashboardSidebar from "../../../components/nurse/NurseDashboardSidebar";
import { Calendar, Clock, ChevronLeft, ChevronRight, Sun, Moon, Coffee, X, Send } from "lucide-react";

export default function NurseSchedulePage() {
    const [dark, setDark] = useState(false);
    const [showSwapModal, setShowSwapModal] = useState(false);
    const [selectedShift, setSelectedShift] = useState(null);
    const [swapReason, setSwapReason] = useState("");
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const theme = localStorage.getItem("theme");
            setDark(theme === "dark");
        }
    }, []);

    const shifts = [
        { day: "Mon", date: "20", type: "Morning", time: "07:00 - 15:00", icon: <Sun className="h-5 w-5 text-orange-500" />, color: "bg-orange-50 dark:bg-orange-900/20 border-orange-100 dark:border-orange-800" },
        { day: "Tue", date: "21", type: "Night", time: "23:00 - 07:00", icon: <Moon className="h-5 w-5 text-indigo-500" />, color: "bg-indigo-50 dark:bg-indigo-900/20 border-indigo-100 dark:border-indigo-800" },
        { day: "Wed", date: "22", type: "Off", time: "Rest Day", icon: <Coffee className="h-5 w-5 text-gray-500" />, color: "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700" },
        { day: "Thu", date: "23", type: "Afternoon", time: "15:00 - 23:00", icon: <Sun className="h-5 w-5 text-yellow-500" />, color: "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-100 dark:border-yellow-800" },
        { day: "Fri", date: "24", type: "Morning", time: "07:00 - 15:00", icon: <Sun className="h-5 w-5 text-orange-500" />, color: "bg-orange-50 dark:bg-orange-900/20 border-orange-100 dark:border-orange-800" },
    ];

    const handleRequestSwap = (shift) => {
        setSelectedShift(shift);
        setShowSwapModal(true);
    };

    const handleSubmitSwap = async () => {
        setSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setSubmitting(false);
        setShowSwapModal(false);
        setSwapReason("");
        alert(`Swap request submitted for ${selectedShift.type} shift on ${selectedShift.day}, ${selectedShift.date}`);
    };

    return (
        <div className={dark ? "dark" : ""}>
            <div className="min-h-screen flex font-sans text-gray-900 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
                <div className="hidden md:block">
                    <NurseDashboardSidebar />
                </div>

                <main className="flex-1 p-6 md:p-10 max-w-5xl mx-auto overflow-y-auto">
                    <header className="mb-8 flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Shift Schedule</h1>
                            <p className="text-gray-500 dark:text-gray-400">Weekly roster: Nov 20 - Nov 26</p>
                        </div>
                        <div className="flex gap-2">
                            <button className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                                <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                            </button>
                            <button className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                                <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                            </button>
                        </div>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
                        {shifts.map((shift, index) => (
                            <div key={index} className={`p-4 rounded-2xl border flex flex-col items-center text-center transition-all hover:shadow-md ${shift.color}`}>
                                <span className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">{shift.day}</span>
                                <span className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{shift.date}</span>

                                <div className="mb-2 p-2 bg-white dark:bg-gray-700 rounded-full shadow-sm">
                                    {shift.icon}
                                </div>

                                <span className="font-semibold text-gray-800 dark:text-gray-200 text-sm mb-1">{shift.type}</span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">{shift.time}</span>
                            </div>
                        ))}
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                        <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4">Upcoming Shifts</h3>
                        <div className="space-y-4">
                            {shifts.filter(s => s.type !== "Off").slice(0, 3).map((shift, idx) => (
                                <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 dark:bg-gray-700/50 dark:hover:bg-gray-700 rounded-xl transition-colors border border-transparent hover:border-gray-100 dark:hover:border-gray-700">
                                    <div className="flex items-center gap-4">
                                        <div className="h-12 w-12 rounded-xl bg-teal-50 dark:bg-teal-900/20 flex items-center justify-center text-teal-600 dark:text-teal-400 font-bold">
                                            {shift.date}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 dark:text-white">{shift.type} Shift</h4>
                                            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                                <Clock className="h-3 w-3" /> {shift.time}
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleRequestSwap(shift)}
                                        className="text-sm font-medium text-teal-600 dark:text-teal-400 hover:underline"
                                    >
                                        Request Swap
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>

            {/* Swap Request Modal */}
            {showSwapModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6 relative">
                        <button
                            onClick={() => setShowSwapModal(false)}
                            className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        >
                            <X className="h-5 w-5 text-gray-500" />
                        </button>

                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Request Shift Swap</h2>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                            {selectedShift?.type} Shift • {selectedShift?.day}, Nov {selectedShift?.date} • {selectedShift?.time}
                        </p>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Reason for Swap Request
                                </label>
                                <textarea
                                    value={swapReason}
                                    onChange={(e) => setSwapReason(e.target.value)}
                                    placeholder="Please provide a reason for the swap request..."
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all resize-none"
                                    rows="4"
                                />
                            </div>

                            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30 rounded-xl p-4">
                                <p className="text-sm text-blue-800 dark:text-blue-300">
                                    <strong>Note:</strong> Your request will be sent to available nurses. You'll be notified once someone accepts.
                                </p>
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button
                                    onClick={() => setShowSwapModal(false)}
                                    className="flex-1 px-4 py-2.5 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSubmitSwap}
                                    disabled={!swapReason.trim() || submitting}
                                    className="flex-1 px-4 py-2.5 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {submitting ? (
                                        <>
                                            <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            Submitting...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="h-4 w-4" />
                                            Submit Request
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
