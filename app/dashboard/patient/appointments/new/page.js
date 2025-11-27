"use client";

import React, { useState, useEffect } from "react";
import { Calendar, Clock, User, Stethoscope, CheckCircle, AlertCircle } from "lucide-react";
import DashboardNavbar from "../../../../components/patient/premium/DashboardNavbar";
import { useRouter } from "next/navigation";

export default function NewAppointmentPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [reason, setReason] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        // Fetch doctors
        async function fetchDoctors() {
            try {
                const res = await fetch("/api/doctors"); // Assuming this API exists or we need to create it
                if (res.ok) {
                    const data = await res.json();
                    setDoctors(data.doctors || []);
                }
            } catch (e) {
                console.error("Failed to fetch doctors", e);
            }
        }
        fetchDoctors();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/appointments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    doctorId: selectedDoctor,
                    appointmentDate: date,
                    time,
                    reason,
                }),
            });

            if (!res.ok) throw new Error("Failed to book appointment");

            setSuccess(true);
            setTimeout(() => {
                router.push("/dashboard/patient/appointments");
            }, 2000);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <DashboardNavbar />

            <main className="max-w-3xl mx-auto px-6 py-10">
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Book New Appointment</h1>
                        <p className="text-gray-500">Schedule a visit with one of our specialists.</p>
                    </div>

                    {success ? (
                        <div className="bg-green-50 text-green-700 p-6 rounded-2xl flex flex-col items-center justify-center text-center">
                            <CheckCircle className="h-12 w-12 mb-4" />
                            <h3 className="text-xl font-bold mb-2">Appointment Booked!</h3>
                            <p>Redirecting you to your appointments...</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {error && (
                                <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center gap-2">
                                    <AlertCircle className="h-5 w-5" />
                                    {error}
                                </div>
                            )}

                            {/* Doctor Selection */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Select Doctor</label>
                                <div className="relative">
                                    <Stethoscope className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <select
                                        required
                                        value={selectedDoctor}
                                        onChange={(e) => setSelectedDoctor(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all appearance-none bg-white"
                                    >
                                        <option value="">Choose a specialist...</option>
                                        {doctors.map((doc) => (
                                            <option key={doc.id} value={doc.doctorProfile?.id}>
                                                {doc.name} - {doc.doctorProfile?.specialization}
                                            </option>
                                        ))}
                                        {/* Fallback if no doctors loaded yet */}
                                        {doctors.length === 0 && (
                                            <>
                                                <option value="doc1">Dr. Priya Sharma - Cardiology</option>
                                                <option value="doc2">Dr. Arjun Patel - Neurology</option>
                                                <option value="doc3">Dr. Anjali Reddy - Pediatrics</option>
                                            </>
                                        )}
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Date Selection */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <input
                                            type="date"
                                            required
                                            min="2025-01-01"
                                            value={date}
                                            onChange={(e) => setDate(e.target.value)}
                                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                {/* Time Selection */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                                    <div className="relative">
                                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <select
                                            required
                                            value={time}
                                            onChange={(e) => setTime(e.target.value)}
                                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all appearance-none bg-white"
                                        >
                                            <option value="">Select time...</option>
                                            <option value="09:00 AM">09:00 AM</option>
                                            <option value="10:00 AM">10:00 AM</option>
                                            <option value="11:00 AM">11:00 AM</option>
                                            <option value="02:00 PM">02:00 PM</option>
                                            <option value="03:00 PM">03:00 PM</option>
                                            <option value="04:00 PM">04:00 PM</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Reason */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Visit</label>
                                <textarea
                                    required
                                    rows="4"
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                    placeholder="Briefly describe your symptoms or reason for appointment..."
                                    className="w-full p-4 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all resize-none"
                                ></textarea>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={() => router.back()}
                                    className="flex-1 py-3 px-6 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 py-3 px-6 rounded-xl bg-teal-600 text-white font-bold hover:bg-teal-700 transition-all shadow-lg shadow-teal-500/30 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {loading ? "Booking..." : "Confirm Appointment"}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </main>
        </div>
    );
}
