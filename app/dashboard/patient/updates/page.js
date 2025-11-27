"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft, MessageSquare } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import DashboardNavbar from "../../../components/patient/premium/DashboardNavbar";
import DashboardFooter from "../../../components/patient/premium/DashboardFooter";
import PatientUpdatesFeed from "../../../components/patient/premium/PatientUpdatesFeed";

export default function PatientUpdatesPage() {
    const [user, setUser] = useState(null);
    const [updates, setUpdates] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);

            // Get user
            const userRes = await fetch("/api/patient");
            if (userRes.ok) {
                const userData = await userRes.json();
                setUser(userData.user);
            }

            // Fetch patient updates
            const updatesRes = await fetch("/api/patient-updates?limit=50");
            if (updatesRes.ok) {
                const updatesData = await updatesRes.json();
                setUpdates(updatesData.updates);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
        window.location.href = "/auth";
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin h-12 w-12 border-4 border-teal-600 border-t-transparent rounded-full"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F9FAFB]">
            <DashboardNavbar user={user} handleLogout={handleLogout} />

            <main className="max-w-4xl mx-auto px-6 py-8">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        href="/dashboard/patient"
                        className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 mb-4"
                    >
                        <ArrowLeft className="h-4 w-4" /> Back to Dashboard
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">My Updates</h1>
                        <p className="text-gray-500 mt-1">
                            Updates from your healthcare team
                        </p>
                    </div>
                </div>

                {/* Updates Feed */}
                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                    {updates.length === 0 ? (
                        <div className="text-center py-12">
                            <MessageSquare className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                No updates yet
                            </h3>
                            <p className="text-gray-500">
                                Your doctor or nurse will post updates about your care here
                            </p>
                        </div>
                    ) : (
                        <PatientUpdatesFeed updates={updates} />
                    )}
                </div>
            </main>

            <DashboardFooter />
        </div>
    );
}
