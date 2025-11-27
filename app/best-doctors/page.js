"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";
import DoctorCard from "../components/shared/DoctorCard";
import NurseCard from "../components/shared/NurseCard";
import { Search, Filter, Stethoscope, HeartPulse } from "lucide-react";

export default function BestDoctorsPage() {
    const [activeTab, setActiveTab] = useState("doctors"); // doctors | nurses
    const [doctors, setDoctors] = useState([]);
    const [nurses, setNurses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedDept, setSelectedDept] = useState("All");
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [doctorsRes, nursesRes] = await Promise.all([
                    fetch("/api/best-doctors"),
                    fetch("/api/best-nurses"),
                ]);

                const doctorsData = await doctorsRes.json();
                const nursesData = await nursesRes.json();

                if (doctorsData.success) {
                    setDoctors(doctorsData.doctors);
                    // Extract unique departments
                    const depts = ["All", ...new Set(doctorsData.doctors.map((d) => d.department))];
                    setDepartments(depts);
                }

                if (nursesData.success) {
                    setNurses(nursesData.nurses);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const filteredDoctors =
        selectedDept === "All"
            ? doctors
            : doctors.filter((d) => d.department === selectedDept);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 bg-gradient-to-br from-teal-900 via-teal-800 to-blue-900 overflow-hidden">
                {/* Animated Background Elements */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3"></div>

                <div className="relative max-w-7xl mx-auto px-6 text-center z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block bg-white/10 backdrop-blur-md border border-white/20 text-teal-100 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
                            World-Class Healthcare Team
                        </span>
                        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
                            Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-200 to-blue-200">Top Specialists</span>
                        </h1>
                        <p className="text-xl text-teal-100 max-w-2xl mx-auto mb-10 font-light">
                            Dedicated professionals committed to providing the highest standard of medical care and compassion.
                        </p>
                    </motion.div>

                    {/* Tab Switcher */}
                    <div className="flex justify-center">
                        <div className="bg-white/10 backdrop-blur-md p-1.5 rounded-2xl inline-flex border border-white/20">
                            <button
                                onClick={() => setActiveTab("doctors")}
                                className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all duration-300 ${activeTab === "doctors"
                                        ? "bg-white text-teal-900 shadow-lg scale-105"
                                        : "text-white hover:bg-white/10"
                                    }`}
                            >
                                <Stethoscope size={20} />
                                Best Doctors
                            </button>
                            <button
                                onClick={() => setActiveTab("nurses")}
                                className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all duration-300 ${activeTab === "nurses"
                                        ? "bg-white text-pink-700 shadow-lg scale-105"
                                        : "text-white hover:bg-white/10"
                                    }`}
                            >
                                <HeartPulse size={20} />
                                Top Nurses
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-16 max-w-7xl mx-auto px-6">
                {/* Filters (Only for Doctors) */}
                {activeTab === "doctors" && (
                    <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                        <div className="flex items-center gap-3 overflow-x-auto pb-2 w-full md:w-auto no-scrollbar">
                            {departments.map((dept) => (
                                <button
                                    key={dept}
                                    onClick={() => setSelectedDept(dept)}
                                    className={`px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all border ${selectedDept === dept
                                            ? "bg-teal-600 text-white border-teal-600 shadow-md"
                                            : "bg-white text-gray-600 border-gray-200 hover:border-teal-300 hover:text-teal-600"
                                        }`}
                                >
                                    {dept}
                                </button>
                            ))}
                        </div>

                        <div className="relative w-full md:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search by name..."
                                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none transition-all"
                            />
                        </div>
                    </div>
                )}

                {/* Content Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                            <div key={i} className="bg-white rounded-2xl h-96 animate-pulse shadow-sm border border-gray-100"></div>
                        ))}
                    </div>
                ) : (
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                    >
                        {activeTab === "doctors" ? (
                            filteredDoctors.length > 0 ? (
                                filteredDoctors.map((doctor) => (
                                    <DoctorCard key={doctor.id} doctor={doctor} />
                                ))
                            ) : (
                                <div className="col-span-full text-center py-20">
                                    <p className="text-gray-500 text-lg">No doctors found in this department.</p>
                                </div>
                            )
                        ) : (
                            nurses.length > 0 ? (
                                nurses.map((nurse) => (
                                    <NurseCard key={nurse.id} nurse={nurse} />
                                ))
                            ) : (
                                <div className="col-span-full text-center py-20">
                                    <p className="text-gray-500 text-lg">No nurses found.</p>
                                </div>
                            )
                        )}
                    </motion.div>
                )}
            </section>

            <Footer />
        </div>
    );
}
