"use client";

import React, { useState, useEffect } from "react";
import { X, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import StarRating from "../../shared/StarRating";

export default function ReviewModal({ isOpen, onClose, onSubmit }) {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [targetType, setTargetType] = useState("HOSPITAL");
    const [targetId, setTargetId] = useState("");
    const [department, setDepartment] = useState("");
    const [doctors, setDoctors] = useState([]);
    const [nurses, setNurses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    // Fetch doctors and nurses when modal opens
    useEffect(() => {
        if (isOpen) {
            fetchDoctorsAndNurses();
        }
    }, [isOpen]);

    const fetchDoctorsAndNurses = async () => {
        try {
            setLoading(true);
            // Fetch doctors
            const doctorsRes = await fetch("/api/doctors");
            if (doctorsRes.ok) {
                const doctorsData = await doctorsRes.json();
                setDoctors(doctorsData.doctors || []);
            }

            // Note: You'll need to create a nurses API endpoint
            // For now, we'll leave nurses empty
            setNurses([]);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (rating === 0) {
            alert("Please select a rating");
            return;
        }

        if (
            (targetType === "DOCTOR" || targetType === "NURSE") &&
            !targetId
        ) {
            alert(`Please select a ${targetType.toLowerCase()}`);
            return;
        }

        if (targetType === "DEPARTMENT" && !department) {
            alert("Please enter a department name");
            return;
        }

        setSubmitting(true);

        try {
            const reviewData = {
                rating,
                comment: comment.trim() || null,
                targetType,
                targetId: targetId || null,
                department: department || null,
            };

            const res = await fetch("/api/reviews", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(reviewData),
            });

            if (res.ok) {
                const data = await res.json();
                onSubmit?.(data.review);
                handleClose();
            } else {
                const error = await res.json();
                alert(error.error || "Failed to submit review");
            }
        } catch (error) {
            console.error("Error submitting review:", error);
            alert("Failed to submit review");
        } finally {
            setSubmitting(false);
        }
    };

    const handleClose = () => {
        setRating(0);
        setComment("");
        setTargetType("HOSPITAL");
        setTargetId("");
        setDepartment("");
        onClose();
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
                >
                    {/* Header */}
                    <div className="sticky top-0 bg-gradient-to-r from-teal-600 to-cyan-600 px-6 py-4 flex items-center justify-between rounded-t-2xl">
                        <h2 className="text-xl font-bold text-white">Leave a Review</h2>
                        <button
                            onClick={handleClose}
                            className="text-white hover:bg-white/20 rounded-lg p-1 transition-colors"
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        {/* Rating */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Rating <span className="text-red-500">*</span>
                            </label>
                            <div className="flex items-center gap-2">
                                <StarRating
                                    rating={rating}
                                    onRatingChange={setRating}
                                    size="xl"
                                />
                                {rating > 0 && (
                                    <span className="text-sm text-gray-600">
                                        ({rating} star{rating !== 1 ? "s" : ""})
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Target Type */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                What would you like to review? <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={targetType}
                                onChange={(e) => {
                                    setTargetType(e.target.value);
                                    setTargetId("");
                                    setDepartment("");
                                }}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            >
                                <option value="HOSPITAL">Hospital Overall</option>
                                <option value="DOCTOR">Doctor</option>
                                <option value="NURSE">Nurse</option>
                                <option value="DEPARTMENT">Department</option>
                            </select>
                        </div>

                        {/* Doctor Selection */}
                        {targetType === "DOCTOR" && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Select Doctor <span className="text-red-500">*</span>
                                </label>
                                {loading ? (
                                    <p className="text-sm text-gray-500">Loading doctors...</p>
                                ) : (
                                    <select
                                        value={targetId}
                                        onChange={(e) => setTargetId(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                        required
                                    >
                                        <option value="">Choose a doctor</option>
                                        {doctors.map((doctor) => (
                                            <option key={doctor.id} value={doctor.id}>
                                                {doctor.fullName} - {doctor.specialization || "General"}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            </div>
                        )}

                        {/* Nurse Selection */}
                        {targetType === "NURSE" && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Select Nurse <span className="text-red-500">*</span>
                                </label>
                                {loading ? (
                                    <p className="text-sm text-gray-500">Loading nurses...</p>
                                ) : nurses.length === 0 ? (
                                    <p className="text-sm text-gray-500">
                                        No nurses available. Please contact admin.
                                    </p>
                                ) : (
                                    <select
                                        value={targetId}
                                        onChange={(e) => setTargetId(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                        required
                                    >
                                        <option value="">Choose a nurse</option>
                                        {nurses.map((nurse) => (
                                            <option key={nurse.id} value={nurse.id}>
                                                {nurse.fullName}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            </div>
                        )}

                        {/* Department Input */}
                        {targetType === "DEPARTMENT" && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Department Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={department}
                                    onChange={(e) => setDepartment(e.target.value)}
                                    placeholder="e.g., Cardiology, Emergency, etc."
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                    required
                                />
                            </div>
                        )}

                        {/* Comment */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Your Review (Optional)
                            </label>
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Share your experience..."
                                rows={4}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                            />
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-3 pt-4">
                            <button
                                type="button"
                                onClick={handleClose}
                                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={submitting || rating === 0}
                                className="flex-1 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {submitting ? "Submitting..." : "Submit Review"}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
