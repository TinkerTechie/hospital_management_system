"use client";

import React, { useState } from "react";
import AdminSidebar from "../../../../components/admin/AdminSidebar";
import { ArrowLeft, Save, User, Mail, Phone, MapPin, Heart, Shield } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NewPatientPage() {
    const router = useRouter();
    const [dark, setDark] = useState(false);
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        dateOfBirth: "",
        gender: "",
        address: "",
        emergencyContact: "",
        bloodGroup: "",
        allergies: "",
        medicalConditions: "",
        insuranceProvider: "",
        insurancePolicyNumber: "",
    });

    const toggleDark = () => {
        const newTheme = !dark;
        setDark(newTheme);
        if (typeof window !== "undefined") {
            localStorage.setItem("theme", newTheme ? "dark" : "light");
            document.documentElement.classList.toggle("dark", newTheme);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/admin/patients", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                const errorData = await res.json();
                const errorMessage = errorData.error || "Failed to create patient";
                alert(errorMessage); // Show alert to user
                window.showToast?.({ type: "error", message: errorMessage });
                setLoading(false);
                return; // Don't throw, just return
            }

            window.showToast?.({ type: "success", message: "Patient registered successfully!" });
            router.push("/dashboard/admin/patients");
        } catch (error) {
            console.error("Registration Error:", error);
            const errorMessage = error.message || "An unexpected error occurred";
            alert(errorMessage);
            window.showToast?.({ type: "error", message: errorMessage });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={dark ? "dark" : ""}>
            <div className="  min-h-screen flex font-sans text-gray-900 transition-colors duration-300">
                <div className="hidden md:block">
                    <AdminSidebar dark={dark} toggleDark={toggleDark} />
                </div>

                <main className="flex-1 p-6 md:p-10 max-w-4xl mx-auto overflow-y-auto">
                    <div className="mb-6">
                        <Link
                            href="/dashboard/admin/patients"
                            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to Patients
                        </Link>
                    </div>

                    <header className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            Register New Patient
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400">
                            Fill in the patient information to create a new record
                        </p>
                    </header>

                    {/* Progress Steps */}
                    <div className="mb-8 flex items-center justify-center gap-4">
                        {[1, 2, 3, 4].map((s) => (
                            <div key={s} className="flex items-center">
                                <div
                                    className={`h-10 w-10 rounded-full flex items-center justify-center font-bold ${step >= s
                                        ? "bg-teal-600 text-white"
                                        : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                                        }`}
                                >
                                    {s}
                                </div>
                                {s < 4 && (
                                    <div
                                        className={`h-1 w-16 ${step > s ? "bg-teal-600" : "bg-gray-200 dark:bg-gray-700"
                                            }`}
                                    />
                                )}
                            </div>
                        ))}
                    </div>

                    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-8">
                        {/* Step 1: Personal Info */}
                        {step === 1 && (
                            <div className="space-y-6">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                    <User className="h-5 w-5 text-teal-600" />
                                    Personal Information
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-2.5 rounded-xl  dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all dark:text-white"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Date of Birth *
                                        </label>
                                        <input
                                            type="date"
                                            name="dateOfBirth"
                                            value={formData.dateOfBirth}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-2.5 rounded-xl  dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all dark:text-white"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Gender *
                                        </label>
                                        <select
                                            name="gender"
                                            value={formData.gender}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-2.5 rounded-xl  dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all dark:text-white"
                                        >
                                            <option value="">Select Gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Email
                                        </label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full pl-10 pr-4 py-2.5 rounded-xl  dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all dark:text-white"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Phone *
                                        </label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                required
                                                className="w-full pl-10 pr-4 py-2.5 rounded-xl  dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all dark:text-white"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Address & Emergency Contact */}
                        {step === 2 && (
                            <div className="space-y-6">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                    <MapPin className="h-5 w-5 text-teal-600" />
                                    Address & Emergency Contact
                                </h3>

                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Address
                                        </label>
                                        <textarea
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            rows="3"
                                            className="w-full px-4 py-2.5 rounded-xl  dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all dark:text-white resize-none"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Emergency Contact
                                        </label>
                                        <input
                                            type="text"
                                            name="emergencyContact"
                                            value={formData.emergencyContact}
                                            onChange={handleChange}
                                            placeholder="Name and phone number"
                                            className="w-full px-4 py-2.5 rounded-xl  dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all dark:text-white"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Medical Info */}
                        {step === 3 && (
                            <div className="space-y-6">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                    <Heart className="h-5 w-5 text-teal-600" />
                                    Medical Information
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Blood Group
                                        </label>
                                        <select
                                            name="bloodGroup"
                                            value={formData.bloodGroup}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2.5 rounded-xl  dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all dark:text-white"
                                        >
                                            <option value="">Select Blood Group</option>
                                            <option value="A+">A+</option>
                                            <option value="A-">A-</option>
                                            <option value="B+">B+</option>
                                            <option value="B-">B-</option>
                                            <option value="O+">O+</option>
                                            <option value="O-">O-</option>
                                            <option value="AB+">AB+</option>
                                            <option value="AB-">AB-</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Allergies
                                        </label>
                                        <textarea
                                            name="allergies"
                                            value={formData.allergies}
                                            onChange={handleChange}
                                            rows="2"
                                            placeholder="List any known allergies"
                                            className="w-full px-4 py-2.5 rounded-xl  dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all dark:text-white resize-none"
                                        />
                                    </div>

                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Medical Conditions
                                        </label>
                                        <textarea
                                            name="medicalConditions"
                                            value={formData.medicalConditions}
                                            onChange={handleChange}
                                            rows="2"
                                            placeholder="List any existing medical conditions"
                                            className="w-full px-4 py-2.5 rounded-xl  dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all dark:text-white resize-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 4: Insurance */}
                        {step === 4 && (
                            <div className="space-y-6">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                    <Shield className="h-5 w-5 text-teal-600" />
                                    Insurance Details
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Insurance Provider
                                        </label>
                                        <input
                                            type="text"
                                            name="insuranceProvider"
                                            value={formData.insuranceProvider}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2.5 rounded-xl  dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all dark:text-white"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Policy Number
                                        </label>
                                        <input
                                            type="text"
                                            name="insurancePolicyNumber"
                                            value={formData.insurancePolicyNumber}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2.5 rounded-xl  dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all dark:text-white"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Navigation Buttons */}
                        <div className="flex justify-between mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
                            {step > 1 && (
                                <button
                                    type="button"
                                    onClick={() => setStep(step - 1)}
                                    className="px-6 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                                >
                                    Previous
                                </button>
                            )}

                            {step < 4 ? (
                                <button
                                    type="button"
                                    onClick={() => setStep(step + 1)}
                                    className="ml-auto px-6 py-2.5 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors shadow-lg shadow-teal-200 dark:shadow-none"
                                >
                                    Next
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="ml-auto px-6 py-2.5 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors shadow-lg shadow-teal-200 dark:shadow-none flex items-center gap-2 disabled:opacity-50"
                                >
                                    <Save className="h-4 w-4" />
                                    {loading ? "Saving..." : "Register Patient"}
                                </button>
                            )}
                        </div>
                    </form>
                </main>
            </div>
        </div>
    );
}
