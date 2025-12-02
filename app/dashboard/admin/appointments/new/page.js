"use client";

import React, { useState, useEffect } from "react";
import AdminSidebar from "../../../../components/admin/AdminSidebar";
import { ArrowLeft, Save, Calendar, Clock, User, FileText } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NewAppointmentPage() {
    const router = useRouter();
    const [dark, setDark] = useState(false);
    const [loading, setLoading] = useState(false);
    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);

    const [formData, setFormData] = useState({
        patientId: "",
        doctorId: "",
        date: "",
        time: "",
        type: "consultation",
        notes: "",
    });

    useEffect(() => {
        if (typeof window !== "undefined") {
            const theme = localStorage.getItem("theme");
            setDark(theme === "dark");
        }
        fetchData();
    }, []);

    const toggleDark = () => {
        const newTheme = !dark;
        setDark(newTheme);
        if (typeof window !== "undefined") {
            localStorage.setItem("theme", newTheme ? "dark" : "light");
            document.documentElement.classList.toggle("dark", newTheme);
        }
    };

    const fetchData = async () => {
        try {
            const [patientsRes, doctorsRes] = await Promise.all([
                fetch("/api/admin/patients?limit=100"), // Fetch enough for dropdown
                fetch("/api/admin/doctors?limit=100")
            ]);

            const patientsData = await patientsRes.json();
            const doctorsData = await doctorsRes.json();

            setPatients(patientsData.patients || []);
            setDoctors(doctorsData.doctors || []);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/admin/appointments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error("Failed to create appointment");

            alert("Appointment booked successfully!");
            router.push("/dashboard/admin/appointments");
        } catch (error) {
            console.error(error);
            alert("Failed to book appointment");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={dark ? "dark" : ""}>
            <div className="min-h-screen flex font-sans text-gray-900 transition-colors duration-300">
                <div className="hidden md:block">
                    <AdminSidebar dark={dark} toggleDark={toggleDark} />
                </div>

                <main className="flex-1 p-6 md:p-10 max-w-4xl mx-auto overflow-y-auto">
                    <div className="mb-6">
                        <Link
                            href="/dashboard/admin/appointments"
                            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to Appointments
                        </Link>
                    </div>

                    <header className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            Book Appointment
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400">
                            Schedule a new appointment for a patient
                        </p>
                    </header>

                    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-8">
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Patient *</label>
                                    <select
                                        name="patientId"
                                        value={formData.patientId}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2.5 rounded-xl dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all dark:text-white"
                                    >
                                        <option value="">Select Patient</option>
                                        {patients.map(p => (
                                            <option key={p.id} value={p.id}>{p.name} (ID: {p.id})</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Doctor *</label>
                                    <select
                                        name="doctorId"
                                        value={formData.doctorId}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2.5 rounded-xl dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all dark:text-white"
                                    >
                                        <option value="">Select Doctor</option>
                                        {doctors.map(d => (
                                            <option key={d.id} value={d.id}>{d.name} - {d.specialization}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Date *</label>
                                    <input
                                        type="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2.5 rounded-xl dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all dark:text-white"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Time *</label>
                                    <input
                                        type="time"
                                        name="time"
                                        value={formData.time}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2.5 rounded-xl dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all dark:text-white"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Type</label>
                                    <select
                                        name="type"
                                        value={formData.type}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2.5 rounded-xl dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all dark:text-white"
                                    >
                                        <option value="consultation">Consultation</option>
                                        <option value="follow-up">Follow-up</option>
                                        <option value="emergency">Emergency</option>
                                    </select>
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Notes</label>
                                    <textarea
                                        name="notes"
                                        value={formData.notes}
                                        onChange={handleChange}
                                        rows="3"
                                        className="w-full px-4 py-2.5 rounded-xl dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all dark:text-white resize-none"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-6 py-2.5 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors shadow-lg shadow-teal-200 dark:shadow-none flex items-center gap-2 disabled:opacity-50"
                            >
                                <Save className="h-4 w-4" />
                                {loading ? "Booking..." : "Book Appointment"}
                            </button>
                        </div>
                    </form>
                </main>
            </div>
        </div>
    );
}
