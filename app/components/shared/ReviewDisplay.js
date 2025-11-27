"use client";

import React from "react";
import StarRating from "./StarRating";
import { User } from "lucide-react";

export default function ReviewDisplay({ reviews = [], avgRating = 0, showAverage = true }) {
    if (!reviews || reviews.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500">
                <p>No reviews yet</p>
            </div>
        );
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    return (
        <div className="space-y-6">
            {showAverage && (
                <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-6 border border-teal-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-2xl font-bold text-gray-800">
                                {avgRating.toFixed(1)}
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">
                                Based on {reviews.length} review{reviews.length !== 1 ? "s" : ""}
                            </p>
                        </div>
                        <StarRating rating={parseFloat(avgRating)} readonly size="lg" />
                    </div>
                </div>
            )}

            <div className="space-y-4">
                {reviews.map((review) => (
                    <div
                        key={review.id}
                        className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 font-semibold">
                                    {review.reviewer?.name?.charAt(0) || <User className="h-5 w-5" />}
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-800">
                                        {review.reviewer?.name || "Anonymous"}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {review.reviewerRole} • {formatDate(review.createdAt)}
                                    </p>
                                </div>
                            </div>
                            <StarRating rating={review.rating} readonly size="sm" />
                        </div>

                        {review.comment && (
                            <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                        )}

                        {review.targetType === "DOCTOR" && review.doctor && (
                            <div className="mt-3 pt-3 border-t border-gray-100">
                                <p className="text-sm text-gray-600">
                                    Review for: <span className="font-medium">{review.doctor.fullName}</span>
                                    {review.doctor.specialization && (
                                        <span className="text-gray-500"> • {review.doctor.specialization}</span>
                                    )}
                                </p>
                            </div>
                        )}

                        {review.targetType === "NURSE" && review.nurse && (
                            <div className="mt-3 pt-3 border-t border-gray-100">
                                <p className="text-sm text-gray-600">
                                    Review for: <span className="font-medium">{review.nurse.fullName}</span>
                                </p>
                            </div>
                        )}

                        {review.targetType === "DEPARTMENT" && review.department && (
                            <div className="mt-3 pt-3 border-t border-gray-100">
                                <p className="text-sm text-gray-600">
                                    Department: <span className="font-medium">{review.department}</span>
                                </p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
