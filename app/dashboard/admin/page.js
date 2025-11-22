"use client";

import React, { useState, useEffect } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { Users, Calendar, DollarSign, Package, TrendingUp, Activity } from "lucide-react";
import Link from "next/link";

export default function AdminDashboardPage() {
    const [dark, setDark] = useState(false);
    const [stats, setStats] = useState({
        totalPatients: 0,
        todayAppointments: 0,
        monthlyRevenue: 0,
        activeDoctors: 0,
    });

    useEffect(() => {
        if (typeof window !== "undefined") {
            const theme = localStorage.getItem("theme");
            setDark(theme === "dark");
        }

        // ✅ Role-based access control
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const userData = JSON.parse(storedUser);
            if (userData.role !== "ADMIN") {
                const correctDashboard = userData.role === "DOCTOR" ? "/dashboard/doctor" :
                    userData.role === "NURSE" ? "/dashboard/nurse" :
                        userData.role === "PATIENT" ? "/dashboard/patient" : "/auth";
                window.location.href = correctDashboard;
                return;
            }
        }

        fetchStats();
    }, []);

    const toggleDark = () => {
        const newTheme = !dark;
        setDark(newTheme);
        if (typeof window !== "undefined") {
            localStorage.setItem("theme", newTheme ? "dark" : "light");
            document.documentElement.classList.toggle("dark", newTheme);
        }
    };

    const fetchStats = async () => {
        try {
            const res = await fetch("/api/admin/reports/overview");
            if (res.ok) {
                const data = await res.json();
                setStats(data);
            }
        } catch (error) {
            console.error("Error fetching stats:", error);
        }
    };

    const quickLinks = [
        {
            title: "Patient Management",
            description: "View and manage patient records",
            icon: Users,
            href: "/dashboard/admin/patients",
            color: "teal",
        },
        {
            title: "Appointments",
            description: "Schedule and manage appointments",
            icon: Calendar,
            href: "/dashboard/admin/appointments",
            color: "blue",
        },
        {
            title: "Doctors",
            description: "Manage doctor profiles and schedules",
            icon: Activity,
            href: "/dashboard/admin/doctors",
            color: "purple",
        },
        {
            title: "Billing",
            description: "Invoices and payment tracking",
            icon: DollarSign,
            href: "/dashboard/admin/billing",
            color: "green",
        },
        {
            title: "Inventory",
            description: "Medical supplies and equipment",
            icon: Package,
            href: "/dashboard/admin/inventory",
            color: "orange",
        },
        {
            title: "Reports",
            description: "Analytics and insights",
            icon: TrendingUp,
            href: "/dashboard/admin/reports",
            color: "indigo",
        },
    ];

    const colorClasses = {
        teal: "from-teal-500 to-teal-600",
        blue: "from-blue-500 to-blue-600",
        purple: "from-purple-500 to-purple-600",
        green: "from-green-500 to-green-600",
        orange: "from-orange-500 to-orange-600",
        indigo: "from-indigo-500 to-indigo-600",
    };

    return (
        <div className={dark ? "dark" : ""}>
            <div className="  min-h-screen flex font-sans text-gray-900 transition-colors duration-300">
                <div className="hidden md:block">
                    <AdminSidebar dark={dark} toggleDark={toggleDark} />
                </div>

                <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto overflow-y-auto">
                    <header className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            Admin Dashboard
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400">
                            Welcome back! Here's what's happening in your hospital today.
                        </p>
                    </header>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl p-6 text-white shadow-lg">
                            <div className="flex items-center justify-between mb-4">
                                <Users className="h-8 w-8 opacity-80" />
                                <span className="text-xs bg-white/20 px-2 py-1 rounded-full">+12%</span>
                            </div>
                            <p className="text-sm opacity-90 mb-1">Total Patients</p>
                            <p className="text-3xl font-bold">{stats.totalPatients || 1234}</p>
                        </div>

                        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
                            <div className="flex items-center justify-between mb-4">
                                <Calendar className="h-8 w-8 opacity-80" />
                                <span className="text-xs bg-white/20 px-2 py-1 rounded-full">Today</span>
                            </div>
                            <p className="text-sm opacity-90 mb-1">Appointments</p>
                            <p className="text-3xl font-bold">{stats.todayAppointments || 45}</p>
                        </div>

                        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg">
                            <div className="flex items-center justify-between mb-4">
                                <DollarSign className="h-8 w-8 opacity-80" />
                                <span className="text-xs bg-white/20 px-2 py-1 rounded-full">+8%</span>
                            </div>
                            <p className="text-sm opacity-90 mb-1">Monthly Revenue</p>
                            <p className="text-3xl font-bold">${stats.monthlyRevenue || 45230}</p>
                        </div>

                        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
                            <div className="flex items-center justify-between mb-4">
                                <Activity className="h-8 w-8 opacity-80" />
                                <span className="text-xs bg-white/20 px-2 py-1 rounded-full">Active</span>
                            </div>
                            <p className="text-sm opacity-90 mb-1">Active Doctors</p>
                            <p className="text-3xl font-bold">{stats.activeDoctors || 28}</p>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="mb-8">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                            Quick Access
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {quickLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="group bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all hover:-translate-y-1"
                                >
                                    <div
                                        className={`h-12 w-12 rounded-xl bg-gradient-to-br ${colorClasses[link.color]} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                                    >
                                        <link.icon className="h-6 w-6 text-white" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                                        {link.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {link.description}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                            Recent Activity
                        </h2>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 p-4  dark:bg-gray-700 rounded-xl">
                                <div className="h-10 w-10 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center">
                                    <Users className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-gray-900 dark:text-white">New patient registered</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">John Doe - 5 minutes ago</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 p-4  dark:bg-gray-700 rounded-xl">
                                <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                    <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-gray-900 dark:text-white">Appointment scheduled</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Jane Smith with Dr. Wilson - 15 minutes ago</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 p-4  dark:bg-gray-700 rounded-xl">
                                <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                                    <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-gray-900 dark:text-white">Payment received</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Invoice #1234 - $250.00 - 30 minutes ago</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
