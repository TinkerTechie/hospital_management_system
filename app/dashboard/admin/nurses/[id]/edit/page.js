"use client";

import React, { useState, useEffect } from "react";
import AdminSidebar from "../../../../../components/admin/AdminSidebar";
import { ArrowLeft, Save, User, Mail, Phone, Clock, MapPin } from "lucide-react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";

export default function EditNursePage() {
    const router = useRouter();
    const params = useParams();
    const [dark, setDark] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        shiftTiming: "",
        assignedWard: "",
    });

    useEffect(() => {
        if (typeof window !== "undefined") {
            const theme = localStorage.getItem("theme");
            setDark(theme === "dark");
        }
        if (params.id) {
            fetchNurseDetails();
        }
    }, [params.id]);

    const toggleDark = () => {
        const newTheme = !dark;
        setDark(newTheme);
        if (typeof window !== "undefined") {
            localStorage.setItem("theme", newTheme ? "dark" : "light");
            document.documentElement.classList.toggle("dark", newTheme);
        }
    };

    const fetchNurseDetails = async () => {
        try {
            const res = await fetch(`/api/admin/nurses/${params.id}`);
            if (res.ok) {
                const data = await res.json();
                setFormData({
                    name: data.fullName || "",
                    email: data.email || "",
                    phone: data.phone || "",
                    shiftTiming: data.shiftTiming || "",
                    assignedWard: data.assignedWard || "",
                });
            } else {
                alert("Failed to fetch nurse details");
                router.push("/dashboard/admin/nurses");
            }
        } catch (error) {
            console.error("Error fetching nurse:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            const res = await fetch(`/api/admin/nurses/${params.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || "Failed to update nurse");
            }

            window.showToast?.({ type: "success", message: "Nurse updated successfully!" });
            router.push("/dashboard/admin/nurses");
        } catch (error) {
            console.error("Update Error:", error);
            alert(error.message || "An unexpected error occurred");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
            </div>
        );
    }

    return (
        <div className={dark ? "dark" : ""}>
            <div className="min-h-screen flex font-sans text-gray-900 transition-colors duration-300">
                <div className="hidden md:block">
                    <AdminSidebar dark={dark} toggleDark={toggleDark} />
                </div>

                <main className="flex-1 p-6 md:p-10 max-w-4xl mx-auto overflow-y-auto">
                    <div className="mb-6">
                        <Link
                            href="/dashboard/admin/nurses"
                            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to Nurses
                        </Link>
                    </div>

                    <header className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            Edit Nurse Profile
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400">
                            Update nurse details and assignments
                        </p>
                    </header>

                    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-8">
                        <div className="space-y-6">
                            {/* Personal Info */}
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 border-b pb-2 border-gray-100 dark:border-gray-700">
                                <User className="h-5 w-5 text-teal-600" />
                                Personal Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Name *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2.5 rounded-xl dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all dark:text-white"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        disabled
                                        className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 text-gray-500 cursor-not-allowed"
                                        title="Email cannot be changed"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Phone *</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2.5 rounded-xl dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all dark:text-white"
                                    />
                                </div>
                            </div>

                            {/* Assignment Info */}
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 border-b pb-2 border-gray-100 dark:border-gray-700 mt-8">
                                <Clock className="h-5 w-5 text-teal-600" />
                                Assignment Details
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Shift Timing</label>
                                    <select
                                        name="shiftTiming"
                                        value={formData.shiftTiming}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2.5 rounded-xl dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all dark:text-white"
                                    >
                                        <option value="">Select Shift</option>
                                        <option value="08:00 AM - 04:00 PM">Morning (8 AM - 4 PM)</option>
                                        <option value="04:00 PM - 12:00 AM">Evening (4 PM - 12 AM)</option>
                                        <option value="12:00 AM - 08:00 AM">Night (12 AM - 8 AM)</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Assigned Ward</label>
                                    <select
                                        name="assignedWard"
                                        value={formData.assignedWard}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2.5 rounded-xl dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all dark:text-white"
                                    >
                                        <option value="">Select Ward</option>
                                        <option value="Emergency">Emergency</option>
                                        <option value="ICU">ICU</option>
                                        <option value="Pediatrics">Pediatrics</option>
                                        <option value="General Ward">General Ward</option>
                                        <option value="Surgery">Surgery</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
                            <button
                                type="submit"
                                disabled={saving}
                                className="px-6 py-2.5 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors shadow-lg shadow-teal-200 dark:shadow-none flex items-center gap-2 disabled:opacity-50"
                            >
                                <Save className="h-4 w-4" />
                                {saving ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </form>
                </main>
            </div>
        </div>
    );
}
