"use client";

import React, { useState, useEffect, useMemo } from "react";
import NurseDashboardSidebar from "../../../components/nurse/NurseDashboardSidebar";
import {
    Search, Activity, Bed, Thermometer, Heart, MoreHorizontal,
    X, Save, FileText, Clock, AlertCircle, User, Stethoscope
} from "lucide-react";

export default function NursePatientsPage() {
    const [dark, setDark] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [showVitalsModal, setShowVitalsModal] = useState(false);
    const [showMenuModal, setShowMenuModal] = useState(false);
    const [showMedicalRecords, setShowMedicalRecords] = useState(false);
    const [showVitalsHistory, setShowVitalsHistory] = useState(false);
    const [showAddNote, setShowAddNote] = useState(false);
    const [showEmergency, setShowEmergency] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [noteText, setNoteText] = useState("");
    const [emergencyReason, setEmergencyReason] = useState("");
    const [vitalsData, setVitalsData] = useState({
        hr: "",
        bpSystolic: "",
        bpDiastolic: "",
        temp: "",
        o2: "",
        rr: ""
    });
    const [saving, setSaving] = useState(false);
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const theme = localStorage.getItem("theme");
            setDark(theme === "dark");
        }
        fetchPatients();
    }, []);

    const fetchPatients = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/admin/patients?limit=100");
            if (!res.ok) throw new Error("Failed to fetch patients");

            const data = await res.json();
            const patientsData = data.patients || [];

            // Fetch latest vitals for each patient
            const patientsWithVitals = await Promise.all(
                patientsData.map(async (patient) => {
                    try {
                        const vitalsRes = await fetch(`/api/nurse/patients/${patient.id}/vitals`);
                        if (vitalsRes.ok) {
                            const vitalsData = await vitalsRes.json();
                            const latestVitals = vitalsData.vitals?.[0];

                            return {
                                id: patient.id,
                                name: patient.fullName,
                                bed: patient.assignedWard || "N/A",
                                condition: "Stable", // Could be derived from vitals
                                vitals: latestVitals ? {
                                    hr: latestVitals.heartRate || 0,
                                    bp: `${latestVitals.bpSystolic || 0}/${latestVitals.bpDiastolic || 0}`,
                                    temp: latestVitals.temperature?.toFixed(1) || "0.0",
                                    o2: latestVitals.oxygenSaturation || 0,
                                    rr: latestVitals.respiratoryRate || 0
                                } : {
                                    hr: 0,
                                    bp: "0/0",
                                    temp: "0.0",
                                    o2: 0,
                                    rr: 0
                                },
                                diagnosis: patient.medicalHistory || "General Care",
                                lastUpdated: latestVitals ? new Date(latestVitals.createdAt).toLocaleString() : "Never"
                            };
                        }
                        return {
                            id: patient.id,
                            name: patient.fullName,
                            bed: patient.assignedWard || "N/A",
                            condition: "Stable",
                            vitals: { hr: 0, bp: "0/0", temp: "0.0", o2: 0, rr: 0 },
                            diagnosis: patient.medicalHistory || "General Care",
                            lastUpdated: "Never"
                        };
                    } catch (err) {
                        console.error(`Error fetching vitals for patient ${patient.id}:`, err);
                        return {
                            id: patient.id,
                            name: patient.fullName,
                            bed: patient.assignedWard || "N/A",
                            condition: "Stable",
                            vitals: { hr: 0, bp: "0/0", temp: "0.0", o2: 0, rr: 0 },
                            diagnosis: patient.medicalHistory || "General Care",
                            lastUpdated: "Never"
                        };
                    }
                })
            );

            setPatients(patientsWithVitals);
        } catch (error) {
            console.error("Error fetching patients:", error);
            setPatients([]);
        } finally {
            setLoading(false);
        }
    };

    // Real-time search filtering
    const filteredPatients = useMemo(() => {
        if (!searchQuery) return patients;

        return patients.filter(patient =>
            patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            patient.bed.toLowerCase().includes(searchQuery.toLowerCase()) ||
            patient.diagnosis.toLowerCase().includes(searchQuery.toLowerCase()) ||
            patient.condition.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery, patients]);

    const getConditionColor = (condition) => {
        switch (condition) {
            case "Stable": return "text-green-600 bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-900/30";
            case "Critical": return "text-red-600 bg-red-50 dark:bg-red-900/20 border-red-100 dark:border-red-900/30";
            case "Improving": return "text-blue-600 bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-900/30";
            default: return "text-gray-600 bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700";
        }
    };

    const handleUpdateVitals = (patient) => {
        setSelectedPatient(patient);
        const [systolic, diastolic] = patient.vitals.bp.split('/');
        setVitalsData({
            hr: patient.vitals.hr.toString(),
            bpSystolic: systolic,
            bpDiastolic: diastolic,
            temp: patient.vitals.temp,
            o2: patient.vitals.o2.toString(),
            rr: patient.vitals.rr.toString()
        });
        setShowVitalsModal(true);
    };

    const handleSaveVitals = async () => {
        setSaving(true);
        try {
            const res = await fetch(`/api/nurse/patients/${selectedPatient.id}/vitals`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    heartRate: vitalsData.hr,
                    bpSystolic: vitalsData.bpSystolic,
                    bpDiastolic: vitalsData.bpDiastolic,
                    temperature: vitalsData.temp,
                    oxygenSaturation: vitalsData.o2,
                    respiratoryRate: vitalsData.rr
                }),
            });

            if (!res.ok) {
                throw new Error("Failed to save vitals");
            }

            // Refresh patients to show updated vitals
            await fetchPatients();

            setShowVitalsModal(false);
            window.showToast?.({ type: "success", message: `Vitals updated for ${selectedPatient.name}` });
        } catch (error) {
            console.error("Error saving vitals:", error);
            alert(`Error: ${error.message}`);
        } finally {
            setSaving(false);
        }
    };

    const handleShowMenu = (patient) => {
        setSelectedPatient(patient);
        setShowMenuModal(true);
    };

    const handleViewMedicalRecords = () => {
        setShowMenuModal(false);
        setShowMedicalRecords(true);
    };

    const handleViewVitalsHistory = () => {
        setShowMenuModal(false);
        setShowVitalsHistory(true);
    };

    const handleAddNote = () => {
        setShowMenuModal(false);
        setShowAddNote(true);
    };

    const handleReportEmergency = () => {
        setShowMenuModal(false);
        setShowEmergency(true);
    };

    const handleSaveNote = async () => {
        setSaving(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setSaving(false);
        setShowAddNote(false);
        setNoteText("");
        alert(`Note added for ${selectedPatient.name}`);
    };

    const handleSubmitEmergency = async () => {
        setSaving(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setSaving(false);
        setShowEmergency(false);
        setEmergencyReason("");
        alert(`Emergency alert sent for ${selectedPatient.name}!`);
    };

    return (
        <div className={dark ? "dark" : ""}>
            <div className="min-h-screen flex font-sans text-gray-900 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
                <div className="hidden md:block">
                    <NurseDashboardSidebar />
                </div>

                <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto overflow-y-auto">
                    <header className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Assigned Patients</h1>
                            <p className="text-gray-500 dark:text-gray-400">
                                Monitoring {filteredPatients.length} of {patients.length} patients in Ward A.
                            </p>
                        </div>

                        <div className="relative w-full md:w-72">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search patients..."
                                className="w-full pl-10 pr-10 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-gray-800 dark:text-white placeholder-gray-400"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors"
                                >
                                    <X className="h-3 w-3 text-gray-500" />
                                </button>
                            )}
                        </div>
                    </header>

                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <div className="text-center">
                                <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                                <p className="text-gray-600 dark:text-gray-400">Loading patients...</p>
                            </div>
                        </div>
                    ) : filteredPatients.length === 0 ? (
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 text-center border border-gray-100 dark:border-gray-700">
                            <User className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No patients found</h3>
                            <p className="text-gray-500 dark:text-gray-400">Try adjusting your search query</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
                            {filteredPatients.map((patient) => (
                                <div key={patient.id} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="flex items-center gap-4">
                                            <div className="h-14 w-14 rounded-xl bg-teal-50 dark:bg-teal-900/20 flex flex-col items-center justify-center border border-teal-100 dark:border-teal-900/30">
                                                <Bed className="h-6 w-6 text-teal-600 dark:text-teal-400 mb-1" />
                                                <span className="text-xs font-bold text-teal-700 dark:text-teal-300">{patient.bed}</span>
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-lg text-gray-900 dark:text-white">{patient.name}</h3>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">{patient.diagnosis}</p>
                                            </div>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getConditionColor(patient.condition)}`}>
                                            {patient.condition}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-3 gap-4 mb-4">
                                        <div className="p-3 bg-gray-50 dark:bg-gray-700/30 rounded-xl text-center">
                                            <Heart className="h-5 w-5 text-rose-500 mx-auto mb-1" />
                                            <p className="text-lg font-bold text-gray-800 dark:text-white">{patient.vitals.hr}</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">BPM</p>
                                        </div>
                                        <div className="p-3 bg-gray-50 dark:bg-gray-700/30 rounded-xl text-center">
                                            <Activity className="h-5 w-5 text-blue-500 mx-auto mb-1" />
                                            <p className="text-lg font-bold text-gray-800 dark:text-white">{patient.vitals.bp}</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">mmHg</p>
                                        </div>
                                        <div className="p-3 bg-gray-50 dark:bg-gray-700/30 rounded-xl text-center">
                                            <Thermometer className="h-5 w-5 text-orange-500 mx-auto mb-1" />
                                            <p className="text-lg font-bold text-gray-800 dark:text-white">{patient.vitals.temp}°</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">F</p>
                                        </div>
                                    </div>

                                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-4 flex items-center gap-1">
                                        <Clock className="h-3 w-3" />
                                        Last updated {patient.lastUpdated}
                                    </div>

                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => handleUpdateVitals(patient)}
                                            className="flex-1 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2"
                                        >
                                            <Stethoscope className="h-4 w-4" />
                                            Update Vitals
                                        </button>
                                        <button
                                            onClick={() => handleShowMenu(patient)}
                                            className="p-2.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 rounded-xl transition-colors"
                                        >
                                            <MoreHorizontal className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </main>
            </div>

            {/* Update Vitals Modal */}
            {showVitalsModal && selectedPatient && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full p-6 relative max-h-[90vh] overflow-y-auto">
                        <button
                            onClick={() => setShowVitalsModal(false)}
                            className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        >
                            <X className="h-5 w-5 text-gray-500" />
                        </button>

                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Update Vitals</h2>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                            {selectedPatient.name} • Bed {selectedPatient.bed}
                        </p>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Heart Rate (BPM)
                                </label>
                                <input
                                    type="number"
                                    value={vitalsData.hr}
                                    onChange={(e) => setVitalsData({ ...vitalsData, hr: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none"
                                    placeholder="72"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Respiratory Rate
                                </label>
                                <input
                                    type="number"
                                    value={vitalsData.rr}
                                    onChange={(e) => setVitalsData({ ...vitalsData, rr: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none"
                                    placeholder="16"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Blood Pressure (Systolic)
                                </label>
                                <input
                                    type="number"
                                    value={vitalsData.bpSystolic}
                                    onChange={(e) => setVitalsData({ ...vitalsData, bpSystolic: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none"
                                    placeholder="120"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Blood Pressure (Diastolic)
                                </label>
                                <input
                                    type="number"
                                    value={vitalsData.bpDiastolic}
                                    onChange={(e) => setVitalsData({ ...vitalsData, bpDiastolic: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none"
                                    placeholder="80"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Temperature (°F)
                                </label>
                                <input
                                    type="number"
                                    step="0.1"
                                    value={vitalsData.temp}
                                    onChange={(e) => setVitalsData({ ...vitalsData, temp: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none"
                                    placeholder="98.6"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    O2 Saturation (%)
                                </label>
                                <input
                                    type="number"
                                    value={vitalsData.o2}
                                    onChange={(e) => setVitalsData({ ...vitalsData, o2: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none"
                                    placeholder="98"
                                />
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowVitalsModal(false)}
                                className="flex-1 px-4 py-2.5 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveVitals}
                                disabled={saving}
                                className="flex-1 px-4 py-2.5 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {saving ? (
                                    <>
                                        <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save className="h-4 w-4" />
                                        Save Vitals
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* More Options Menu Modal */}
            {showMenuModal && selectedPatient && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-sm w-full p-6 relative">
                        <button
                            onClick={() => setShowMenuModal(false)}
                            className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        >
                            <X className="h-5 w-5 text-gray-500" />
                        </button>

                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Patient Actions</h2>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                            {selectedPatient.name}
                        </p>

                        <div className="space-y-2">
                            <button
                                onClick={handleViewMedicalRecords}
                                className="w-full p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl transition-colors flex items-center gap-3 text-gray-700 dark:text-gray-300"
                            >
                                <FileText className="h-5 w-5" />
                                <span className="font-medium">View Medical Records</span>
                            </button>
                            <button
                                onClick={handleViewVitalsHistory}
                                className="w-full p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl transition-colors flex items-center gap-3 text-gray-700 dark:text-gray-300"
                            >
                                <Activity className="h-5 w-5" />
                                <span className="font-medium">View Vitals History</span>
                            </button>
                            <button
                                onClick={handleAddNote}
                                className="w-full p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl transition-colors flex items-center gap-3 text-gray-700 dark:text-gray-300"
                            >
                                <AlertCircle className="h-5 w-5" />
                                <span className="font-medium">Add Note</span>
                            </button>
                            <button
                                onClick={handleReportEmergency}
                                className="w-full p-3 text-left hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors flex items-center gap-3 text-red-600 dark:text-red-400"
                            >
                                <AlertCircle className="h-5 w-5" />
                                <span className="font-medium">Report Emergency</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Medical Records Modal */}
            {showMedicalRecords && selectedPatient && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-3xl w-full p-6 relative max-h-[90vh] overflow-y-auto">
                        <button
                            onClick={() => setShowMedicalRecords(false)}
                            className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        >
                            <X className="h-5 w-5 text-gray-500" />
                        </button>

                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Medical Records</h2>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                            {selectedPatient.name} • Bed {selectedPatient.bed}
                        </p>

                        <div className="space-y-4">
                            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Patient Information</h3>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <p className="text-gray-500 dark:text-gray-400">Diagnosis</p>
                                        <p className="font-medium text-gray-900 dark:text-white">{selectedPatient.diagnosis}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 dark:text-gray-400">Condition</p>
                                        <p className="font-medium text-gray-900 dark:text-white">{selectedPatient.condition}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 dark:text-gray-400">Bed Assignment</p>
                                        <p className="font-medium text-gray-900 dark:text-white">{selectedPatient.bed}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 dark:text-gray-400">Last Updated</p>
                                        <p className="font-medium text-gray-900 dark:text-white">{selectedPatient.lastUpdated}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900/30 rounded-xl p-4">
                                <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">Recent Notes</h3>
                                <p className="text-sm text-blue-800 dark:text-blue-200">No recent notes available. Use "Add Note" to create one.</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Vitals History Modal */}
            {showVitalsHistory && selectedPatient && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full p-6 relative max-h-[90vh] overflow-y-auto">
                        <button
                            onClick={() => setShowVitalsHistory(false)}
                            className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        >
                            <X className="h-5 w-5 text-gray-500" />
                        </button>

                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Vitals History</h2>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                            {selectedPatient.name} • Last 24 hours
                        </p>

                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50 dark:bg-gray-700/50">
                                    <tr>
                                        <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">Time</th>
                                        <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">HR</th>
                                        <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">BP</th>
                                        <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">Temp</th>
                                        <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">O2</th>
                                        <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">RR</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                                        <td className="px-4 py-3 text-gray-900 dark:text-white">14:00</td>
                                        <td className="px-4 py-3 text-gray-900 dark:text-white">{selectedPatient.vitals.hr}</td>
                                        <td className="px-4 py-3 text-gray-900 dark:text-white">{selectedPatient.vitals.bp}</td>
                                        <td className="px-4 py-3 text-gray-900 dark:text-white">{selectedPatient.vitals.temp}°F</td>
                                        <td className="px-4 py-3 text-gray-900 dark:text-white">{selectedPatient.vitals.o2}%</td>
                                        <td className="px-4 py-3 text-gray-900 dark:text-white">{selectedPatient.vitals.rr}</td>
                                    </tr>
                                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                                        <td className="px-4 py-3 text-gray-600 dark:text-gray-400">10:00</td>
                                        <td className="px-4 py-3 text-gray-600 dark:text-gray-400">70</td>
                                        <td className="px-4 py-3 text-gray-600 dark:text-gray-400">118/78</td>
                                        <td className="px-4 py-3 text-gray-600 dark:text-gray-400">98.5°F</td>
                                        <td className="px-4 py-3 text-gray-600 dark:text-gray-400">97%</td>
                                        <td className="px-4 py-3 text-gray-600 dark:text-gray-400">15</td>
                                    </tr>
                                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                                        <td className="px-4 py-3 text-gray-600 dark:text-gray-400">06:00</td>
                                        <td className="px-4 py-3 text-gray-600 dark:text-gray-400">68</td>
                                        <td className="px-4 py-3 text-gray-600 dark:text-gray-400">115/75</td>
                                        <td className="px-4 py-3 text-gray-600 dark:text-gray-400">98.4°F</td>
                                        <td className="px-4 py-3 text-gray-600 dark:text-gray-400">98%</td>
                                        <td className="px-4 py-3 text-gray-600 dark:text-gray-400">14</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* Add Note Modal */}
            {showAddNote && selectedPatient && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full p-6 relative">
                        <button
                            onClick={() => setShowAddNote(false)}
                            className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        >
                            <X className="h-5 w-5 text-gray-500" />
                        </button>

                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Add Patient Note</h2>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                            {selectedPatient.name} • Bed {selectedPatient.bed}
                        </p>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Note
                            </label>
                            <textarea
                                value={noteText}
                                onChange={(e) => setNoteText(e.target.value)}
                                placeholder="Enter patient observation, care notes, or updates..."
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none resize-none"
                                rows="6"
                            />
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowAddNote(false)}
                                className="flex-1 px-4 py-2.5 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveNote}
                                disabled={!noteText.trim() || saving}
                                className="flex-1 px-4 py-2.5 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {saving ? (
                                    <>
                                        <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save className="h-4 w-4" />
                                        Save Note
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Report Emergency Modal */}
            {showEmergency && selectedPatient && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full p-6 relative border-2 border-red-500">
                        <button
                            onClick={() => setShowEmergency(false)}
                            className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        >
                            <X className="h-5 w-5 text-gray-500" />
                        </button>

                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-full">
                                <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-red-600 dark:text-red-400">Report Emergency</h2>
                                <p className="text-gray-500 dark:text-gray-400 text-sm">
                                    {selectedPatient.name} • Bed {selectedPatient.bed}
                                </p>
                            </div>
                        </div>

                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/30 rounded-xl p-4 mb-6">
                            <p className="text-sm text-red-800 dark:text-red-200">
                                <strong>Warning:</strong> This will immediately alert the emergency response team and attending physician.
                            </p>
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Emergency Details *
                            </label>
                            <textarea
                                value={emergencyReason}
                                onChange={(e) => setEmergencyReason(e.target.value)}
                                placeholder="Describe the emergency situation..."
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none resize-none"
                                rows="4"
                            />
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowEmergency(false)}
                                className="flex-1 px-4 py-2.5 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmitEmergency}
                                disabled={!emergencyReason.trim() || saving}
                                className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {saving ? (
                                    <>
                                        <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Sending Alert...
                                    </>
                                ) : (
                                    <>
                                        <AlertCircle className="h-4 w-4" />
                                        Send Emergency Alert
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
