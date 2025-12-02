"use client";

import React, { useState, useEffect } from "react";
import AdminSidebar from "../../../../components/admin/AdminSidebar";
import { ArrowLeft, Mail, Phone, Clock, MapPin, User, Calendar, Edit } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function NurseDetailsPage() {
    const params = useParams();
    const [dark, setDark] = useState(false);
    const [nurse, setNurse] = useState(null);
    const [loading, setLoading] = useState(true);

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
                setNurse(data);
            } else {
                console.error("Failed to fetch nurse details");
            }
        } catch (error) {
            console.error("Error fetching nurse:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
            </div>
        );
    }

    if (!nurse) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Nurse Not Found</h2>
                    <Link href="/dashboard/admin/nurses" className="text-teal-600 hover:underline mt-4 inline-block">
                        Back to Nurses
                    </Link>
                </div>
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
                    <div className="mb-6 flex justify-between items-center">
                        <Link
                            href="/dashboard/admin/nurses"
                            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to Nurses
                        </Link>
                        <Link
                            href={`/dashboard/admin/nurses/${nurse.id}/edit`}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                        >
                            <Edit className="h-4 w-4" />
                            Edit Profile
                        </Link>
                    </div>

                    {/* Profile Header */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 mb-6">
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                            <div className="h-24 w-24 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-700 dark:text-teal-300 font-bold text-3xl">
                                {nurse.fullName?.charAt(0)}
                            </div>
                            <div className="flex-1">
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                    {nurse.fullName}
                                </h1>
                                <div className="flex flex-wrap gap-4 text-gray-500 dark:text-gray-400">
                                    <div className="flex items-center gap-2">
                                        <Mail className="h-4 w-4" />
                                        {nurse.email}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Phone className="h-4 w-4" />
                                        {nurse.phone || "No phone provided"}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Assignment Card */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-6">
                                <BriefcaseIcon className="h-5 w-5 text-teal-600" />
                                Current Assignment
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600 dark:text-blue-400">
                                        <Clock className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Shift Timing</p>
                                        <p className="font-medium text-gray-900 dark:text-white">{nurse.shiftTiming || "Not Assigned"}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-purple-600 dark:text-purple-400">
                                        <MapPin className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Assigned Ward</p>
                                        <p className="font-medium text-gray-900 dark:text-white">{nurse.assignedWard || "Not Assigned"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Account Info */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-6">
                                <User className="h-5 w-5 text-teal-600" />
                                Account Information
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-300">
                                        <Calendar className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Joined Date</p>
                                        <p className="font-medium text-gray-900 dark:text-white">
                                            {new Date(nurse.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-300">
                                        <User className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">User ID</p>
                                        <p className="font-medium text-gray-900 dark:text-white text-sm font-mono">
                                            {nurse.userId}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

function BriefcaseIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
    );
}
