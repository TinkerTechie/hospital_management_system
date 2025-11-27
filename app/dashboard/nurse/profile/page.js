"use client";

import React, { useState, useEffect } from "react";
import NurseDashboardSidebar from "../../../components/nurse/NurseDashboardSidebar";
import ProfileImageUpload from "../../../components/shared/ProfileImageUpload";
import { User, Mail, Phone, MapPin, Award, Save, Clock, CheckCircle } from "lucide-react";

export default function NurseProfilePage() {
    const [dark, setDark] = useState(false);
    const [user, setUser] = useState(null);
    const [nurseProfile, setNurseProfile] = useState(null);
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const theme = localStorage.getItem("theme");
            setDark(theme === "dark");

            const storedUser = localStorage.getItem("user");
            if (storedUser) setUser(JSON.parse(storedUser));
        }

        // Fetch nurse profile
        async function fetchProfile() {
            try {
                const res = await fetch("/api/nurse");
                if (res.ok) {
                    const data = await res.json();
                    setNurseProfile(data.nurseProfile);
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        }
        fetchProfile();
    }, []);

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        setSuccess(false);

        const formData = new FormData(e.target);
        const data = {
            fullName: formData.get("fullName"),
            email: formData.get("email"),
            phone: formData.get("phone"),
            assignedWard: formData.get("assignedWard"),
            shiftTiming: formData.get("shiftTiming")
        };

        try {
            const res = await fetch("/api/user/profile", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            const result = await res.json();

            if (res.ok) {
                setSuccess(true);
                // Update localStorage
                localStorage.setItem("user", JSON.stringify(result.user));
                setUser(result.user);
                setTimeout(() => setSuccess(false), 3000);
            } else {
                alert(result.error || "Failed to save changes");
            }
        } catch (error) {
            console.error("Save error:", error);
            alert("An error occurred while saving");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className={dark ? "dark" : ""}>
            <div className="  min-h-screen flex font-sans text-gray-900 transition-colors duration-300">
                <div className="hidden md:block">
                    <NurseDashboardSidebar />
                </div>

                <main className="flex-1 p-6 md:p-10 max-w-4xl mx-auto overflow-y-auto">
                    <header className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Profile Settings</h1>
                        <p className="text-gray-500 dark:text-gray-400">Update your personal information and shift preferences.</p>
                    </header>

                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                        {/* Banner */}
                        <div className="h-32 bg-gradient-to-r from-teal-500 to-cyan-600 relative">
                            <div className="absolute -bottom-12 left-8">
                                <ProfileImageUpload
                                    currentImage={user?.image}
                                    onImageUpdate={(url) => {
                                        setUser(prev => ({ ...prev, image: url }));
                                        // Trigger a custom event or reload to update sidebar/header if needed
                                        window.dispatchEvent(new Event("storage"));
                                    }}
                                />
                            </div>
                        </div>

                        <div className="pt-16 px-8 pb-8">
                            {success && (
                                <div className="mb-6 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 p-4 rounded-xl flex items-center gap-2 border border-green-100 dark:border-green-900/30">
                                    <CheckCircle className="h-5 w-5" />
                                    Profile updated successfully!
                                </div>
                            )}

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
                                                name="fullName"
                                                defaultValue={nurseProfile?.fullName || user?.name || ""}
                                                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all dark:text-white"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                                <input
                                                    type="email"
                                                    name="email"
                                                    defaultValue={user?.email || ""}
                                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all dark:text-white"
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
                                                    defaultValue={nurseProfile?.phone || ""}
                                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all dark:text-white"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Ward Assignment</label>
                                            <div className="relative">
                                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                                <input
                                                    type="text"
                                                    name="assignedWard"
                                                    defaultValue={nurseProfile?.assignedWard || ""}
                                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all dark:text-white"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                <hr className="border-gray-100 dark:border-gray-700" />

                                {/* Shift Preferences */}
                                <section>
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                        <Clock className="h-5 w-5 text-teal-600" /> Shift Preferences
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Current Shift</label>
                                            <input
                                                type="text"
                                                name="shiftTiming"
                                                defaultValue={nurseProfile?.shiftTiming || ""}
                                                placeholder="e.g., 08:00 AM - 04:00 PM"
                                                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all dark:text-white"
                                            />
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
                                            <>
                                                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                Saving...
                                            </>
                                        ) : (
                                            <>
                                                <Save className="h-4 w-4" /> Save Changes
                                            </>
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
