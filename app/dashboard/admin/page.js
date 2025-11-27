"use client";

import React, { useState, useEffect } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminNavbar from "../../components/admin/AdminNavbar";
import GlobalSearch from "../../components/GlobalSearch";
import PatientUpdateForm from "../../components/shared/PatientUpdateForm";
import { Users, Calendar, DollarSign, Package, TrendingUp, Activity, FilePlus, Search, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AdminDashboardPage() {
    const [user, setUser] = useState(null);
    const [dark, setDark] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
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
            setUser(userData); // Set user state

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

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.location.href = "/auth";
    };

    const toggleDark = () => {
        const newTheme = !dark;
        setDark(newTheme);
        if (typeof window !== "undefined") {
            localStorage.setItem("theme", newTheme ? "dark" : "light");
            document.documentElement.classList.toggle("dark", newTheme);
        }
    };

    // Global search keyboard shortcut (Cmd+K / Ctrl+K)
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setShowSearch(true);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const fetchStats = async () => {
        try {
            const res = await fetch("/api/admin/reports/overview");
            if (res.status === 401 || res.status === 404) {
                window.location.href = "/auth";
                return;
            }
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

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className={dark ? "dark" : ""}>
            {/* Navbar */}
            <AdminNavbar
                user={user}
                handleLogout={handleLogout}
                onSearchClick={() => setShowSearch(true)}
            />

            <div className="min-h-screen flex font-sans bg-gradient-to-br from-gray-50 via-teal-50/30 to-gray-50 dark:from-gray-900 dark:via-teal-900/10 dark:to-gray-900 transition-colors duration-300">
                <div className="hidden md:block">
                    <AdminSidebar dark={dark} toggleDark={toggleDark} />
                </div>

                <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto overflow-y-auto">
                    <motion.header
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-10 flex justify-between items-center"
                    >
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Admin Dashboard</h1>
                            <p className="text-gray-500 dark:text-gray-400">Manage your hospital operations</p>
                        </div>
                    </motion.header>

                    {/* Key Metrics */}
                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
                    >
                        <motion.div variants={item} className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-teal-500/30 transition-shadow">
                            <div className="flex items-center justify-between mb-4">
                                <Users className="h-8 w-8 opacity-80" />
                                <span className="text-xs bg-white/20 px-2 py-1 rounded-full backdrop-blur-sm">+12%</span>
                            </div>
                            <p className="text-sm opacity-90 mb-1">Total Patients</p>
                            <p className="text-3xl font-bold">{stats.totalPatients || 0}</p>
                        </motion.div>

                        <motion.div variants={item} className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-blue-500/30 transition-shadow">
                            <div className="flex items-center justify-between mb-4">
                                <Calendar className="h-8 w-8 opacity-80" />
                                <span className="text-xs bg-white/20 px-2 py-1 rounded-full backdrop-blur-sm">Today</span>
                            </div>
                            <p className="text-sm opacity-90 mb-1">Appointments</p>
                            <p className="text-3xl font-bold">{stats.todayAppointments || 0}</p>
                        </motion.div>

                        <motion.div variants={item} className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-green-500/30 transition-shadow">
                            <div className="flex items-center justify-between mb-4">
                                <DollarSign className="h-8 w-8 opacity-80" />
                                <span className="text-xs bg-white/20 px-2 py-1 rounded-full backdrop-blur-sm">+8%</span>
                            </div>
                            <p className="text-sm opacity-90 mb-1">Monthly Revenue</p>
                            <p className="text-3xl font-bold">${stats.monthlyRevenue || 0}</p>
                        </motion.div>

                        <motion.div variants={item} className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-purple-500/30 transition-shadow">
                            <div className="flex items-center justify-between mb-4">
                                <Activity className="h-8 w-8 opacity-80" />
                                <span className="text-xs bg-white/20 px-2 py-1 rounded-full backdrop-blur-sm">Active</span>
                            </div>
                            <p className="text-sm opacity-90 mb-1">Active Doctors</p>
                            <p className="text-3xl font-bold">{stats.activeDoctors || 0}</p>
                        </motion.div>
                    </motion.div>

                    {/* Quick Links */}
                    <div className="mb-8">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                            Quick Access
                        </h2>
                        <motion.div
                            variants={container}
                            initial="hidden"
                            animate="show"
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {quickLinks.map((link) => (
                                <motion.div key={link.href} variants={item}>
                                    <Link
                                        href={link.href}
                                        className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all hover:-translate-y-1 block h-full"
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <div
                                                className={`h-12 w-12 rounded-xl bg-gradient-to-br ${colorClasses[link.color]} flex items-center justify-center group-hover:scale-110 transition-transform shadow-md`}
                                            >
                                                <link.icon className="h-6 w-6 text-white" />
                                            </div>
                                            <ArrowUpRight className="h-5 w-5 text-gray-300 group-hover:text-teal-500 transition-colors" />
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                                            {link.title}
                                        </h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {link.description}
                                        </p>
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Recent Activity */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-100 dark:border-gray-700"
                    >
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                            Recent Activity
                        </h2>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-xl transition-colors">
                                <div className="h-10 w-10 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center">
                                    <Users className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-gray-900 dark:text-white">New patient registered</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">John Doe - 5 minutes ago</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-xl transition-colors">
                                <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                    <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-gray-900 dark:text-white">Appointment scheduled</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Jane Smith with Dr. Wilson - 15 minutes ago</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-xl transition-colors">
                                <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                                    <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-gray-900 dark:text-white">Payment received</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Invoice #1234 - $250.00 - 30 minutes ago</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </main>
            </div>

            {/* Floating Action Button */}
            <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowUpdateForm(true)}
                className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-full shadow-lg hover:shadow-teal-500/40 transition-all flex items-center justify-center group z-40"
                title="Add Patient Update"
            >
                <FilePlus className="h-6 w-6" />
            </motion.button>

            {/* Global Search Modal */}
            <GlobalSearch isOpen={showSearch} onClose={() => setShowSearch(false)} />

            {/* Patient Update Form Modal */}
            <PatientUpdateForm
                isOpen={showUpdateForm}
                onClose={() => setShowUpdateForm(false)}
                onSuccess={() => fetchStats()}
            />
        </div>
    );
}
