"use client";

import React, { useState, useEffect } from "react";
import DoctorDashboardSidebar from "../../../components/doctor/DoctorDashboardSidebar";
import { User, Mail, Phone, MapPin, Award, Clock, Save } from "lucide-react";

export default function DoctorProfilePage() {
    const [dark, setDark] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        specialization: "",
        yearsOfExperience: "",
        bio: "",
        consultationFee: "",
        startTime: "",
        endTime: ""
    });

    useEffect(() => {
        if (typeof window !== "undefined") {
            const theme = localStorage.getItem("theme");
            setDark(theme === "dark");
        }
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const res = await fetch("/api/doctor");
            if (res.ok) {
                const data = await res.json();
                const { user, doctorProfile } = data;
                setFormData({
                    name: user?.name || "",
                    email: user?.email || "",
                    phone: doctorProfile?.phone || "",
                    address: doctorProfile?.address || "",
                    specialization: doctorProfile?.specialization || "General Medicine",
                    yearsOfExperience: doctorProfile?.yearsOfExperience || "",
                    bio: doctorProfile?.bio || "",
                    consultationFee: doctorProfile?.consultationFee || "",
                    startTime: doctorProfile?.startTime || "",
                    endTime: doctorProfile?.endTime || ""
                });
            }
        } catch (error) {
            console.error("Error fetching profile:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const res = await fetch("/api/doctor", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                alert("Profile updated successfully!");
            } else {
                alert("Failed to update profile.");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("An error occurred.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
            </div>
        );
    }

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
                            <form onSubmit={handleSave} className="space-y-8">
                                {/* Personal Info */}
                                <section>
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                        <User className="h-5 w-5 text-teal-600" /> Personal Information
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2.5 rounded-xl  dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all dark:text-white"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl  dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all dark:text-white"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
                                            <div className="relative">
                                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl  dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all dark:text-white"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Location</label>
                                            <div className="relative">
                                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                                <input
                                                    type="text"
                                                    name="address"
                                                    value={formData.address}
                                                    onChange={handleChange}
                                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl  dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all dark:text-white"
                                                />
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
                                            <select
                                                name="specialization"
                                                value={formData.specialization}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2.5 rounded-xl  dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all dark:text-white"
                                            >
                                                <option>Cardiology</option>
                                                <option>Neurology</option>
                                                <option>Pediatrics</option>
                                                <option>General Medicine</option>
                                                <option>Orthopedics</option>
                                                <option>Dermatology</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Experience (Years)</label>
                                            <input
                                                type="number"
                                                name="yearsOfExperience"
                                                value={formData.yearsOfExperience}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2.5 rounded-xl  dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all dark:text-white"
                                            />
                                        </div>
                                        <div className="md:col-span-2 space-y-2">
                                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Bio</label>
                                            <textarea
                                                rows="4"
                                                name="bio"
                                                value={formData.bio}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2.5 rounded-xl  dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all dark:text-white resize-none"
                                            ></textarea>
                                        </div>
                                    </div>
                                </section>

                                <div className="flex justify-end pt-4">
                                    <button
                                        type="submit"
                                        disabled={saving}
                                        className="px-6 py-2.5 bg-teal-600 text-white font-medium rounded-xl hover:bg-teal-700 transition-colors shadow-lg shadow-teal-200 dark:shadow-none flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {saving ? (
                                            <>Saving...</>
                                        ) : (
                                            <><Save className="h-4 w-4" /> Save Changes</>
                                        )}
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
