"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft, Star, Trash2, Edit } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import DashboardNavbar from "../../../components/patient/premium/DashboardNavbar";
import DashboardFooter from "../../../components/patient/premium/DashboardFooter";
import ReviewModal from "../../../components/patient/premium/ReviewModal";
import ReviewDisplay from "../../../components/shared/ReviewDisplay";

export default function PatientReviewsPage() {
    const [user, setUser] = useState(null);
    const [myReviews, setMyReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showReviewModal, setShowReviewModal] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);

            // Get user
            const userRes = await fetch("/api/patient");
            if (userRes.ok) {
                const userData = await userRes.json();
                setUser(userData.user);

                // Fetch user's reviews
                const reviewsRes = await fetch("/api/reviews");
                if (reviewsRes.ok) {
                    const reviewsData = await reviewsRes.json();
                    // Filter to only show current user's reviews
                    const userReviews = reviewsData.reviews.filter(
                        (r) => r.reviewerId === userData.user.id
                    );
                    setMyReviews(userReviews);
                }
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
        window.location.href = "/auth";
    };

    const handleDeleteReview = async (reviewId) => {
        if (!confirm("Are you sure you want to delete this review?")) return;

        try {
            const res = await fetch(`/api/reviews/${reviewId}`, {
                method: "DELETE",
            });

            if (res.ok) {
                setMyReviews((prev) => prev.filter((r) => r.id !== reviewId));
                alert("Review deleted successfully");
            } else {
                alert("Failed to delete review");
            }
        } catch (error) {
            console.error("Error deleting review:", error);
            alert("Failed to delete review");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin h-12 w-12 border-4 border-teal-600 border-t-transparent rounded-full"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F9FAFB]">
            <DashboardNavbar user={user} handleLogout={handleLogout} />

            <main className="max-w-5xl mx-auto px-6 py-8">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        href="/dashboard/patient"
                        className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 mb-4"
                    >
                        <ArrowLeft className="h-4 w-4" /> Back to Dashboard
                    </Link>
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">My Reviews</h1>
                            <p className="text-gray-500 mt-1">
                                Manage your feedback and reviews
                            </p>
                        </div>
                        <button
                            onClick={() => setShowReviewModal(true)}
                            className="flex items-center gap-2 bg-teal-600 text-white px-5 py-3 rounded-xl hover:bg-teal-700 font-medium shadow-sm transition-all"
                        >
                            <Star className="h-5 w-5" /> Write a Review
                        </button>
                    </div>
                </div>

                {/* Reviews List */}
                {myReviews.length === 0 ? (
                    <div className="bg-white rounded-2xl p-12 text-center border border-gray-200">
                        <Star className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                            No reviews yet
                        </h3>
                        <p className="text-gray-500 mb-6">
                            Share your experience with our hospital, doctors, and staff
                        </p>
                        <button
                            onClick={() => setShowReviewModal(true)}
                            className="bg-teal-600 text-white px-6 py-3 rounded-xl hover:bg-teal-700 font-medium"
                        >
                            Write Your First Review
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {myReviews.map((review) => (
                            <motion.div
                                key={review.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Star
                                                    key={star}
                                                    className={`h-5 w-5 ${star <= review.rating
                                                            ? "text-yellow-400 fill-yellow-400"
                                                            : "text-gray-300"
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                        <p className="text-sm text-gray-500">
                                            {new Date(review.createdAt).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            })}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => handleDeleteReview(review.id)}
                                        className="text-red-600 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors"
                                        title="Delete review"
                                    >
                                        <Trash2 className="h-5 w-5" />
                                    </button>
                                </div>

                                <div className="mb-3">
                                    <span className="inline-flex items-center gap-1 text-xs font-medium px-3 py-1 rounded-full bg-teal-100 text-teal-700">
                                        {review.targetType === "DOCTOR" && review.doctor
                                            ? `Doctor: ${review.doctor.fullName}`
                                            : review.targetType === "NURSE" && review.nurse
                                                ? `Nurse: ${review.nurse.fullName}`
                                                : review.targetType === "DEPARTMENT"
                                                    ? `Department: ${review.department}`
                                                    : "Hospital Overall"}
                                    </span>
                                </div>

                                {review.comment && (
                                    <p className="text-gray-700 leading-relaxed">
                                        {review.comment}
                                    </p>
                                )}
                            </motion.div>
                        ))}
                    </div>
                )}
            </main>

            <DashboardFooter />

            {/* Review Modal */}
            <ReviewModal
                isOpen={showReviewModal}
                onClose={() => setShowReviewModal(false)}
                onSubmit={(review) => {
                    setMyReviews((prev) => [review, ...prev]);
                    alert("Review submitted successfully!");
                }}
            />
        </div>
    );
}
