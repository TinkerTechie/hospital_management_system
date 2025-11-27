"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    FileText,
    Pill,
    Calendar,
    Activity,
    Stethoscope,
    AlertCircle,
} from "lucide-react";

export default function PatientUpdatesFeed({ updates = [], loading = false }) {
    const getUpdateIcon = (type) => {
        const iconClass = "h-5 w-5";
        switch (type) {
            case "DIAGNOSIS":
                return <Stethoscope className={`${iconClass} text-purple-600`} />;
            case "PRESCRIPTION":
                return <Pill className={`${iconClass} text-emerald-600`} />;
            case "APPOINTMENT":
                return <Calendar className={`${iconClass} text-blue-600`} />;
            case "TREATMENT":
                return <Activity className={`${iconClass} text-orange-600`} />;
            case "TEST_RESULT":
                return <FileText className={`${iconClass} text-teal-600`} />;
            default:
                return <AlertCircle className={`${iconClass} text-gray-600`} />;
        }
    };

    const getUpdateColor = (type) => {
        switch (type) {
            case "DIAGNOSIS":
                return "bg-purple-50 border-purple-200";
            case "PRESCRIPTION":
                return "bg-emerald-50 border-emerald-200";
            case "APPOINTMENT":
                return "bg-blue-50 border-blue-200";
            case "TREATMENT":
                return "bg-orange-50 border-orange-200";
            case "TEST_RESULT":
                return "bg-teal-50 border-teal-200";
            default:
                return "bg-gray-50 border-gray-200";
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffHours / 24);

        if (diffHours < 1) return "Just now";
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays === 1) return "Yesterday";
        if (diffDays < 7) return `${diffDays} days ago`;
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
        });
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="animate-spin h-10 w-10 border-4 border-teal-600 border-t-transparent rounded-full"></div>
            </div>
        );
    }

    if (!updates || updates.length === 0) {
        return (
            <div className="text-center py-12">
                <AlertCircle className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No updates yet</p>
                <p className="text-sm text-gray-400 mt-1">
                    Your doctor or nurse will post updates here
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {updates.map((update, index) => (
                <motion.div
                    key={update.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`relative pl-8 pb-6 ${index !== updates.length - 1 ? "border-l-2 border-gray-200" : ""
                        }`}
                >
                    {/* Timeline dot */}
                    <div
                        className={`absolute left-0 top-0 -translate-x-1/2 h-10 w-10 rounded-full ${getUpdateColor(
                            update.updateType
                        )} border-2 flex items-center justify-center shadow-sm`}
                    >
                        {getUpdateIcon(update.updateType)}
                    </div>

                    {/* Content */}
                    <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow ml-4">
                        <div className="flex items-start justify-between mb-2">
                            <div>
                                <h4 className="font-semibold text-gray-800">{update.title}</h4>
                                <p className="text-xs text-gray-500 mt-1">
                                    By {update.updatedBy?.name || "Staff"} ({update.updatedBy?.role})
                                </p>
                            </div>
                            <span className="text-xs text-gray-500 whitespace-nowrap">
                                {formatDate(update.createdAt)}
                            </span>
                        </div>

                        <p className="text-gray-700 leading-relaxed text-sm mt-3">
                            {update.description}
                        </p>

                        {/* Update type badge */}
                        <div className="mt-3">
                            <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100 text-gray-700">
                                {update.updateType.replace("_", " ")}
                            </span>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
