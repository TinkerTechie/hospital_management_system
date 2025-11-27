"use client";

import React, { useState, useEffect } from "react";
import { Search, Edit, Save, X, User, Clock, MapPin } from "lucide-react";
import Swal from "sweetalert2";

export default function AdminNursesPage() {
    const [nurses, setNurses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [editingNurse, setEditingNurse] = useState(null);

    // Form states
    const [shift, setShift] = useState("");
    const [ward, setWard] = useState("");

    useEffect(() => {
        fetchNurses();
    }, []);

    const fetchNurses = async () => {
        try {
            const res = await fetch("/api/admin/nurses");
            if (res.ok) {
                const data = await res.json();
                setNurses(data);
            }
        } catch (error) {
            console.error("Error fetching nurses:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (nurse) => {
        setEditingNurse(nurse);
        setShift(nurse.shiftTiming || "");
        setWard(nurse.assignedWard || "");
    };

    const handleSave = async () => {
        if (!editingNurse) return;

        try {
            const res = await fetch("/api/admin/nurses", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: editingNurse.id,
                    shiftTiming: shift,
                    assignedWard: ward,
                }),
            });

            if (res.ok) {
                Swal.fire("Success", "Nurse details updated!", "success");
                setEditingNurse(null);
                fetchNurses(); // Refresh list
            } else {
                Swal.fire("Error", "Failed to update details", "error");
            }
        } catch (error) {
            Swal.fire("Error", "Something went wrong", "error");
        }
    };

    const filteredNurses = nurses.filter((n) =>
        n.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Nurse Management</h1>
                    <p className="text-gray-500 text-sm">Manage shifts and ward assignments</p>
                </div>
                <div className="relative">
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search nurses..."
                        className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none w-64"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {loading ? (
                <div className="text-center py-10">Loading...</div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-600 text-sm uppercase font-semibold">
                            <tr>
                                <th className="p-4">Nurse</th>
                                <th className="p-4">Current Shift</th>
                                <th className="p-4">Assigned Ward</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredNurses.map((nurse) => (
                                <tr key={nurse.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="p-4 flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold">
                                            {nurse.fullName.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">{nurse.fullName}</p>
                                            <p className="text-xs text-gray-500">{nurse.user?.email}</p>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-sm font-medium">
                                            <Clock className="h-3.5 w-3.5" />
                                            {nurse.shiftTiming || "Not Assigned"}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-purple-50 text-purple-700 text-sm font-medium">
                                            <MapPin className="h-3.5 w-3.5" />
                                            {nurse.assignedWard || "Not Assigned"}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <button
                                            onClick={() => handleEdit(nurse)}
                                            className="p-2 text-gray-500 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-all"
                                        >
                                            <Edit className="h-5 w-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filteredNurses.length === 0 && (
                        <div className="text-center py-10 text-gray-500">No nurses found.</div>
                    )}
                </div>
            )}

            {/* EDIT MODAL */}
            {editingNurse && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 animate-in fade-in zoom-in duration-200">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-gray-800">Edit Assignment</h2>
                            <button onClick={() => setEditingNurse(null)} className="text-gray-400 hover:text-gray-600">
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nurse Name</label>
                                <input
                                    type="text"
                                    value={editingNurse.fullName}
                                    disabled
                                    className="w-full p-2 bg-gray-100 border rounded-lg text-gray-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Shift Timing</label>
                                <select
                                    value={shift}
                                    onChange={(e) => setShift(e.target.value)}
                                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                                >
                                    <option value="">Select Shift</option>
                                    <option value="08:00 AM - 04:00 PM">Morning (8 AM - 4 PM)</option>
                                    <option value="04:00 PM - 12:00 AM">Evening (4 PM - 12 AM)</option>
                                    <option value="12:00 AM - 08:00 AM">Night (12 AM - 8 AM)</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Assigned Ward</label>
                                <select
                                    value={ward}
                                    onChange={(e) => setWard(e.target.value)}
                                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                                >
                                    <option value="">Select Ward</option>
                                    <option value="Emergency">Emergency</option>
                                    <option value="ICU">ICU</option>
                                    <option value="Pediatrics">Pediatrics</option>
                                    <option value="General Ward">General Ward</option>
                                    <option value="Surgery">Surgery</option>
                                </select>
                            </div>
                        </div>

                        <div className="mt-8 flex gap-3">
                            <button
                                onClick={() => setEditingNurse(null)}
                                className="flex-1 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="flex-1 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-medium flex items-center justify-center gap-2"
                            >
                                <Save className="h-4 w-4" />
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
