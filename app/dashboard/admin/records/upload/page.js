"use client";

import React, { useState, useEffect } from "react";
import AdminSidebar from "../../../../components/admin/AdminSidebar";
import { ArrowLeft, Upload, FileText, User, Stethoscope } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function UploadRecordPage() {
    const router = useRouter();
    const [dark, setDark] = useState(false);
    const [loading, setLoading] = useState(false);
    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);

    const [formData, setFormData] = useState({
        patientId: "",
        doctorId: "",
        type: "lab-report",
        title: "",
        description: "",
        diagnosis: "",
        treatment: "",
        notes: ""
    });

    useEffect(() => {
        if (typeof window !== "undefined") {
            const theme = localStorage.getItem("theme");
            setDark(theme === "dark");
        }
        fetchPatients();
        fetchDoctors();
    }, []);

    const toggleDark = () => {
        const newTheme = !dark;
        setDark(newTheme);
        if (typeof window !== "undefined") {
            localStorage.setItem("theme", newTheme ? "dark" : "light");
            document.documentElement.classList.toggle("dark", newTheme);
        }
    };

    const fetchPatients = async () => {
        try {
            const res = await fetch("/api/admin/patients?limit=100");
            if (res.ok) {
                const data = await res.json();
                setPatients(data.patients || []);
            }
        } catch (error) {
            console.error("Error fetching patients:", error);
        }
    };

    const fetchDoctors = async () => {
        try {
            const res = await fetch("/api/admin/doctors?limit=100");
            if (res.ok) {
                const data = await res.json();
                setDoctors(data.doctors || []);
            }
        } catch (error) {
            console.error("Error fetching doctors:", error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/admin/records", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || "Failed to upload record");
            }

            window.showToast?.({ type: "success", message: "Record uploaded successfully!" });
            router.push("/dashboard/admin/records");
        } catch (error) {
            console.error("Error uploading record:", error);
            alert(error.message);
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
                            href="/dashboard/admin/records"
                            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to Records
                        </Link>
                    </div>

                    <header className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            Upload Medical Record
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400">
                            Add a new medical record or document for a patient
                        </p>
                    </header>

                    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-8">
                        <div className="space-y-6">
                            {/* Patient & Doctor Selection */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Select Patient *</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <select
                                            name="patientId"
                                            value={formData.patientId}
                                            onChange={handleChange}
                                            required
                                            className="w-full pl-10 pr-4 py-2.5 rounded-xl dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all dark:text-white appearance-none"
                                        >
                                            <option value="">Select a patient</option>
                                            {patients.map(p => (
                                                <option key={p.id} value={p.id}>{p.fullName}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Select Doctor (Optional)</label>
                                    <div className="relative">
                                        <Stethoscope className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <select
                                            name="doctorId"
                                            value={formData.doctorId}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-4 py-2.5 rounded-xl dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all dark:text-white appearance-none"
                                        >
                                            <option value="">Select a doctor</option>
                                            {doctors.map(d => (
                                                <option key={d.id} value={d.id}>{d.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Record Details */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Record Type *</label>
                                    <select
                                        name="type"
                                        value={formData.type}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2.5 rounded-xl dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all dark:text-white"
                                    >
                                        <option value="lab-report">Lab Report</option>
                                        <option value="prescription">Prescription</option>
                                        <option value="radiology">Radiology (X-Ray, MRI)</option>
                                        <option value="certificate">Medical Certificate</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Title *</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        placeholder="e.g., Blood Test Results"
                                        required
                                        className="w-full px-4 py-2.5 rounded-xl dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all dark:text-white"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows="3"
                                    className="w-full px-4 py-2.5 rounded-xl dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all dark:text-white resize-none"
                                ></textarea>
                            </div>

                            {/* Clinical Info */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Diagnosis</label>
                                    <input
                                        type="text"
                                        name="diagnosis"
                                        value={formData.diagnosis}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2.5 rounded-xl dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all dark:text-white"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Treatment</label>
                                    <input
                                        type="text"
                                        name="treatment"
                                        value={formData.treatment}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2.5 rounded-xl dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all dark:text-white"
                                    />
                                </div>
                            </div>

                            {/* File Upload Simulation */}
                            <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl p-8 text-center hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer">
                                <div className="flex flex-col items-center gap-2">
                                    <div className="h-12 w-12 rounded-full bg-teal-50 dark:bg-teal-900/30 flex items-center justify-center text-teal-600 dark:text-teal-400">
                                        <Upload className="h-6 w-6" />
                                    </div>
                                    <p className="font-medium text-gray-900 dark:text-white">Click to upload or drag and drop</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">PDF, JPG, PNG up to 10MB</p>
                                </div>
                            </div>

                            <div className="flex justify-end pt-6 border-t border-gray-100 dark:border-gray-700">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-8 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors shadow-lg shadow-teal-200 dark:shadow-none flex items-center gap-2 disabled:opacity-50 font-medium"
                                >
                                    <Upload className="h-5 w-5" />
                                    {loading ? "Uploading..." : "Upload Record"}
                                </button>
                            </div>
                        </div>
                    </form>
                </main>
            </div>
        </div>
    );
}
