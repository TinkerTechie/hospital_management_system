"use client";

import React, { useState } from "react";
import NurseDashboardSidebar from "../../../components/nurse/NurseDashboardSidebar";
import { Activity, Heart, Thermometer, Droplet, Save, CheckCircle } from "lucide-react";

export default function VitalsEntryPage() {
    const [user, setUser] = useState(null);
    const [success, setSuccess] = useState(false);

    React.useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) setUser(JSON.parse(storedUser));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
    };

    return (
        <div className="min-h-screen flex font-sans bg-gray-50">
            <div className="hidden md:block">
                <NurseDashboardSidebar />
            </div>

            <main className="flex-1 p-6 md:p-10 max-w-5xl mx-auto">
                <header className="mb-8 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Vitals Entry</h1>
                        <p className="text-gray-500">Record patient vital signs</p>
                    </div>

                    {/* Profile Picture Display */}
                    {user && (
                        <div className="flex items-center gap-3 bg-white p-2 pr-4 rounded-full shadow-sm border border-gray-100">
                            <img
                                src={user.image || "https://placehold.co/100x100.png?text=N"}
                                alt="Profile"
                                className="h-10 w-10 rounded-full object-cover border-2 border-teal-100"
                            />
                            <span className="text-sm font-medium text-gray-700">{user.name}</span>
                        </div>
                    )}
                </header>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                    {success && (
                        <div className="mb-6 bg-green-50 text-green-700 p-4 rounded-xl flex items-center gap-2">
                            <CheckCircle className="h-5 w-5" />
                            Vitals recorded successfully!
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Select Patient</label>
                            <select className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-500/20 outline-none">
                                <option>Amit Verma (Room 101)</option>
                                <option>Sneha Gupta (Room 102)</option>
                                <option>Rahul Malhotra (Room 103)</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <div className="flex items-center gap-2">
                                        <Heart className="h-4 w-4 text-red-500" /> Heart Rate (bpm)
                                    </div>
                                </label>
                                <input type="number" placeholder="72" className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-500/20 outline-none" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <div className="flex items-center gap-2">
                                        <Activity className="h-4 w-4 text-blue-500" /> Blood Pressure
                                    </div>
                                </label>
                                <div className="flex gap-2">
                                    <input type="number" placeholder="120" className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-500/20 outline-none" />
                                    <span className="self-center text-gray-400">/</span>
                                    <input type="number" placeholder="80" className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-500/20 outline-none" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <div className="flex items-center gap-2">
                                        <Thermometer className="h-4 w-4 text-orange-500" /> Temperature (°F)
                                    </div>
                                </label>
                                <input type="number" step="0.1" placeholder="98.6" className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-500/20 outline-none" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <div className="flex items-center gap-2">
                                        <Droplet className="h-4 w-4 text-sky-500" /> Oxygen Saturation (%)
                                    </div>
                                </label>
                                <input type="number" placeholder="98" className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-500/20 outline-none" />
                            </div>
                        </div>

                        <div className="pt-4">
                            <button type="submit" className="w-full md:w-auto px-8 py-3 bg-teal-600 text-white font-bold rounded-xl hover:bg-teal-700 transition-all flex items-center justify-center gap-2">
                                <Save className="h-5 w-5" /> Save Vitals
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}
