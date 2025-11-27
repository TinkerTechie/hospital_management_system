"use client";

import React, { useState } from "react";
import { X, Star, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import StarRating from "../../shared/StarRating";

export default function FeedbackForm({ isOpen, onClose, onSubmit, userRole = "DOCTOR" }) {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [targetType, setTargetType] = useState("HOSPITAL");
    const [department, setDepartment] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (rating === 0) {
            alert("Please select a rating");
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
                alert("Feedback submitted successfully!");
            } else {
                const error = await res.json();
                alert(error.error || "Failed to submit feedback");
            }
        } catch (error) {
            console.error("Error submitting feedback:", error);
            alert("Failed to submit feedback");
        } finally {
            setSubmitting(false);
        }
    };

    const handleClose = () => {
        setRating(0);
        setComment("");
        setTargetType("HOSPITAL");
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
                        <h2 className="text-xl font-bold text-white">Submit Feedback</h2>
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
                                What would you like to provide feedback about?{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={targetType}
                                onChange={(e) => {
                                    setTargetType(e.target.value);
                                    setDepartment("");
                                }}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            >
                                <option value="HOSPITAL">Hospital Overall</option>
                                <option value="DEPARTMENT">Specific Department</option>
                            </select>
                        </div>

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
                                    placeholder="e.g., Emergency, ICU, Pharmacy, etc."
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                    required
                                />
                            </div>
                        )}

                        {/* Comment */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Your Feedback (Optional)
                            </label>
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Share your thoughts, suggestions, or concerns..."
                                rows={4}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                            />
                        </div>

                        {/* Info Box */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <div className="flex gap-3">
                                <MessageSquare className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                <div className="text-sm text-blue-800">
                                    <p className="font-medium mb-1">Your feedback matters!</p>
                                    <p>
                                        Help us improve our hospital facilities and services. Your
                                        feedback will be reviewed by the administration.
                                    </p>
                                </div>
                            </div>
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
                                {submitting ? "Submitting..." : "Submit Feedback"}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
