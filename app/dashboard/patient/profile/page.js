"use client";

import React, { useState, useEffect } from "react";
import PatientDashboardSidebar from "../../../components/patient/PatientDashboardSidebar";
import { User, Mail, Phone, MapPin, Shield, Heart, Save, Camera } from "lucide-react";

export default function PatientProfilePage() {
    const [dark, setDark] = useState(false);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        dob: "",
        bloodGroup: "O+",
        insuranceProvider: "",
        medicalHistory: "",
        image: ""
    });

    useEffect(() => {
        if (typeof window !== "undefined") {
            const theme = localStorage.getItem("theme");
            setDark(theme === "dark");
        }
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const res = await fetch("/api/patient");
            if (res.ok) {
                const data = await res.json();
                setFormData({
                    name: data.user?.name || "",
                    email: data.user?.email || "",
                    phone: data.patientProfile?.phone || "",
                    address: data.patientProfile?.address || "",
                    dob: data.patientProfile?.dob ? new Date(data.patientProfile.dob).toISOString().split('T')[0] : "",
                    bloodGroup: data.patientProfile?.bloodGroup || "O+",
                    insuranceProvider: data.patientProfile?.insuranceProvider || "",
                    medicalHistory: data.patientProfile?.medicalHistory || "",
                    image: data.user?.image || ""
                });
            }
        } catch (error) {
            console.error("Error fetching profile:", error);
        } finally {
            setLoading(false);
        }
    };

    const toggleDark = () => {
        const newTheme = !dark;
        setDark(newTheme);
        if (typeof window !== "undefined") {
            localStorage.setItem("theme", newTheme ? "dark" : "light");
            if (newTheme) {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }
        }
    };

    const handleSave = async () => {
        try {
            const res = await fetch("/api/patient", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                alert("Profile updated successfully!");
                // Optionally re-fetch to ensure sync, but local state is already updated via handleChange
                // fetchProfile(); 
            } else {
                alert("Failed to update profile.");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("An error occurred.");
        }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        const reader = new FileReader();
        reader.onloadend = async () => {
            const base64String = reader.result;
            try {
                const res = await fetch("/api/user/upload-image", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ image: base64String }),
                });

                if (res.ok) {
                    const data = await res.json();
                    setFormData(prev => ({ ...prev, image: data.imageUrl }));
                    alert("Profile picture updated!");
                } else {
                    alert("Failed to upload image.");
                }
            } catch (error) {
                console.error("Error uploading image:", error);
                alert("Error uploading image.");
            } finally {
                setUploading(false);
            }
        };
        reader.readAsDataURL(file);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    return (
        <div className={dark ? "dark" : ""}>
            <div className="  min-h-screen flex font-sans text-gray-900 transition-colors duration-300">
                <div className="hidden md:block">
                    <PatientDashboardSidebar dark={dark} toggleDark={toggleDark} />
                </div>

                <main className="flex-1 p-6 md:p-10 max-w-4xl mx-auto overflow-y-auto">
                    <header className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Profile Settings</h1>
                        <p className="text-gray-500 dark:text-gray-400">Manage your personal health information and account details.</p>
                    </header>

                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                        {/* Banner */}
                        <div className="h-32 bg-gradient-to-r from-teal-500 to-blue-600 relative">
                            <div className="absolute -bottom-12 left-8 group">
                                <div className="h-24 w-24 rounded-full border-4 border-white dark:border-gray-800 bg-white dark:bg-gray-700 flex items-center justify-center overflow-hidden relative">
                                    <img
                                        src={formData.image || "https://placehold.co/100x100.png?text=P"}
                                        alt="Profile"
                                        className="h-full w-full object-cover"
                                    />
                                    {uploading && (
                                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        </div>
                                    )}
                                </div>
                                <label className="absolute bottom-0 right-0 bg-teal-600 text-white p-2 rounded-full cursor-pointer hover:bg-teal-700 transition-colors shadow-lg">
                                    <Camera className="h-4 w-4" />
                                    <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
                                </label>
                            </div>
                        </div>

                        <div className="pt-16 px-8 pb-8">
                            <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                                {/* Personal Info */}
                                <section>
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                        <User className="h-5 w-5 text-teal-600" /> Personal Information
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                                            <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl  dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all dark:text-white" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Date of Birth</label>
                                            <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl  dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all dark:text-white" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                                <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full pl-10 pr-4 py-2.5 rounded-xl  dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all dark:text-white" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
                                            <div className="relative">
                                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full pl-10 pr-4 py-2.5 rounded-xl  dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all dark:text-white" />
                                            </div>
                                        </div>
                                        <div className="md:col-span-2 space-y-2">
                                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Address</label>
                                            <div className="relative">
                                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                                <input type="text" name="address" value={formData.address} onChange={handleChange} className="w-full pl-10 pr-4 py-2.5 rounded-xl  dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all dark:text-white" />
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                <hr className="border-gray-100 dark:border-gray-700" />

                                {/* Medical Info */}
                                <section>
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                        <Heart className="h-5 w-5 text-teal-600" /> Medical Information
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Blood Group</label>
                                            <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl  dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all dark:text-white">
                                                <option>O+</option>
                                                <option>A+</option>
                                                <option>B+</option>
                                                <option>AB+</option>
                                                <option>O-</option>
                                                <option>A-</option>
                                                <option>B-</option>
                                                <option>AB-</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Insurance Provider</label>
                                            <div className="relative">
                                                <Shield className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                                <input type="text" name="insuranceProvider" value={formData.insuranceProvider} onChange={handleChange} className="w-full pl-10 pr-4 py-2.5 rounded-xl  dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all dark:text-white" />
                                            </div>
                                        </div>
                                        <div className="md:col-span-2 space-y-2">
                                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Allergies & Conditions</label>
                                            <textarea name="medicalHistory" rows="3" value={formData.medicalHistory} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl  dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all dark:text-white resize-none"></textarea>
                                        </div>
                                    </div>
                                </section>

                                <div className="flex justify-end pt-4">
                                    <button type="submit" className="px-6 py-2.5 bg-teal-600 text-white font-medium rounded-xl hover:bg-teal-700 transition-colors shadow-lg shadow-teal-200 dark:shadow-none flex items-center gap-2">
                                        <Save className="h-4 w-4" /> Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
