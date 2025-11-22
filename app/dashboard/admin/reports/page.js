"use client";

import React, { useState, useEffect } from "react";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { Users, Calendar, DollarSign, Package, TrendingUp, Download } from "lucide-react";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function ReportsPage() {
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

    // Chart configurations
    const patientTrendOptions = {
        chart: {
            type: "line",
            toolbar: { show: false },
            background: "transparent",
        },
        theme: { mode: dark ? "dark" : "light" },
        stroke: { curve: "smooth", width: 3 },
        colors: ["#0D9488"],
        xaxis: {
            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        },
        yaxis: {
            title: { text: "Patients" },
        },
    };

    const patientTrendSeries = [
        {
            name: "New Patients",
            data: [30, 40, 35, 50, 49, 60],
        },
    ];

    const appointmentDistributionOptions = {
        chart: {
            type: "pie",
            background: "transparent",
        },
        theme: { mode: dark ? "dark" : "light" },
        labels: ["Cardiology", "Neurology", "Orthopedics", "Pediatrics", "General"],
        colors: ["#0D9488", "#3B82F6", "#8B5CF6", "#F59E0B", "#10B981"],
        legend: { position: "bottom" },
    };

    const appointmentDistributionSeries = [30, 25, 20, 15, 10];

    const revenueTrendOptions = {
        chart: {
            type: "bar",
            toolbar: { show: false },
            background: "transparent",
        },
        theme: { mode: dark ? "dark" : "light" },
        plotOptions: {
            bar: {
                borderRadius: 8,
                columnWidth: "60%",
            },
        },
        colors: ["#0D9488"],
        xaxis: {
            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        },
        yaxis: {
            title: { text: "Revenue ($)" },
        },
    };

    const revenueTrendSeries = [
        {
            name: "Revenue",
            data: [12000, 15000, 13000, 18000, 16000, 20000],
        },
    ];

    return (
        <div className={dark ? "dark" : ""}>
            <div className="  min-h-screen flex font-sans text-gray-900 transition-colors duration-300">
                <div className="hidden md:block">
                    <AdminSidebar dark={dark} toggleDark={toggleDark} />
                </div>

                <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto overflow-y-auto">
                    <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                Reports & Analytics
                            </h1>
                            <p className="text-gray-500 dark:text-gray-400">
                                View insights and analytics for your hospital
                            </p>
                        </div>
                        <button className="px-4 py-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors shadow-lg shadow-teal-200 dark:shadow-none flex items-center gap-2">
                            <Download className="h-4 w-4" />
                            Export Report
                        </button>
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
                            <p className="text-3xl font-bold">${stats.monthlyRevenue || "45,230"}</p>
                        </div>

                        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
                            <div className="flex items-center justify-between mb-4">
                                <TrendingUp className="h-8 w-8 opacity-80" />
                                <span className="text-xs bg-white/20 px-2 py-1 rounded-full">Active</span>
                            </div>
                            <p className="text-sm opacity-90 mb-1">Active Doctors</p>
                            <p className="text-3xl font-bold">{stats.activeDoctors || 28}</p>
                        </div>
                    </div>

                    {/* Charts */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                                Patient Registration Trend
                            </h3>
                            {typeof window !== "undefined" && (
                                <Chart
                                    options={patientTrendOptions}
                                    series={patientTrendSeries}
                                    type="line"
                                    height={300}
                                />
                            )}
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                                Appointments by Department
                            </h3>
                            {typeof window !== "undefined" && (
                                <Chart
                                    options={appointmentDistributionOptions}
                                    series={appointmentDistributionSeries}
                                    type="pie"
                                    height={300}
                                />
                            )}
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                            Revenue Trend
                        </h3>
                        {typeof window !== "undefined" && (
                            <Chart
                                options={revenueTrendOptions}
                                series={revenueTrendSeries}
                                type="bar"
                                height={300}
                            />
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}
