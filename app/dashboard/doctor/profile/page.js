"use client";

import React, { useState, useEffect } from "react";
import DoctorDashboardSidebar from "../../../components/doctor/DoctorDashboardSidebar";
import { User, Mail, Phone, MapPin, Award, Clock, Save } from "lucide-react";

export default function DoctorProfilePage() {
    const [dark, setDark] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const theme = localStorage.getItem("theme");
            setDark(theme === "dark");
        }
    }, []);

    return (
        <div className={dark ? "dark" : ""}>
            <div className="  min-h-screen flex font-sans text-gray-900 transition-colors duration-300">
                <div className="hidden md:block">
                    <DoctorDashboardSidebar />
                </div>

                <main className="flex-1 p-6 md:p-10 max-w-4xl mx-auto overflow-y-auto">
                    <header className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Profile Settings</h1>
                        <p className="text-gray-500 dark:text-gray-400">Update your personal information and practice details.</p>
                    </header>

                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                        {/* Banner */}
                        <div className="h-32 bg-gradient-to-r from-teal-500 to-emerald-600 relative">
                            <div className="absolute -bottom-12 left-8">
                                <div className="h-24 w-24 rounded-full border-4 border-white dark:border-gray-800 bg-white dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                                    <img src="https://placehold.co/100x100/0D9488/FFFFFF?text=Dr" alt="Profile" className="h-full w-full object-cover" />
                                </div>
                            </div>
                        </div>

                        <div className="pt-16 px-8 pb-8">
                            <form className="space-y-8">
                                {/* Personal Info */}
                                <section>
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                        <User className="h-5 w-5 text-teal-600" /> Personal Information
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                                            <input type="text" defaultValue="Dr. John Doe" className="w-full px-4 py-2.5 rounded-xl  dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all dark:text-white" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                                <input type="email" defaultValue="dr.john@hospital.com" className="w-full pl-10 pr-4 py-2.5 rounded-xl  dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all dark:text-white" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
                                            <div className="relative">
                                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                                <input type="tel" defaultValue="+1 (555) 000-0000" className="w-full pl-10 pr-4 py-2.5 rounded-xl  dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all dark:text-white" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Location</label>
                                            <div className="relative">
                                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                                <input type="text" defaultValue="New York, NY" className="w-full pl-10 pr-4 py-2.5 rounded-xl  dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all dark:text-white" />
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                <hr className="border-gray-100 dark:border-gray-700" />

                                {/* Professional Info */}
                                <section>
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                        <Award className="h-5 w-5 text-teal-600" /> Professional Details
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Specialization</label>
                                            <select className="w-full px-4 py-2.5 rounded-xl  dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all dark:text-white">
                                                <option>Cardiology</option>
                                                <option>Neurology</option>
                                                <option>Pediatrics</option>
                                                <option>General Medicine</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Experience (Years)</label>
                                            <input type="number" defaultValue="12" className="w-full px-4 py-2.5 rounded-xl  dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all dark:text-white" />
                                        </div>
                                        <div className="md:col-span-2 space-y-2">
                                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Bio</label>
                                            <textarea rows="4" defaultValue="Dr. John Doe is a highly experienced cardiologist with over 12 years of practice..." className="w-full px-4 py-2.5 rounded-xl  dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all dark:text-white resize-none"></textarea>
                                        </div>
                                    </div>
                                </section>

                                <div className="flex justify-end pt-4">
                                    <button type="button" className="px-6 py-2.5 bg-teal-600 text-white font-medium rounded-xl hover:bg-teal-700 transition-colors shadow-lg shadow-teal-200 dark:shadow-none flex items-center gap-2">
                                        <Save className="h-4 w-4" /> Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
