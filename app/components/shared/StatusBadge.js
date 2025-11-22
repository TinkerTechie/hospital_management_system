"use client";

import React from "react";
import { CheckCircle, XCircle, Clock, AlertCircle, Loader } from "lucide-react";

export default function StatusBadge({ status, size = "md", showIcon = true }) {
    const config = {
        // Appointment statuses
        scheduled: {
            label: "Scheduled",
            icon: Clock,
            className: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
        },
        upcoming: {
            label: "Upcoming",
            icon: Clock,
            className: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
        },
        completed: {
            label: "Completed",
            icon: CheckCircle,
            className: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
        },
        cancelled: {
            label: "Cancelled",
            icon: XCircle,
            className: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
        },
        "in-progress": {
            label: "In Progress",
            icon: Loader,
            className: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
        },

        // Payment statuses
        paid: {
            label: "Paid",
            icon: CheckCircle,
            className: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
        },
        pending: {
            label: "Pending",
            icon: Clock,
            className: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
        },
        overdue: {
            label: "Overdue",
            icon: AlertCircle,
            className: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
        },
        partial: {
            label: "Partial",
            icon: Clock,
            className: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
        },

        // General statuses
        active: {
            label: "Active",
            icon: CheckCircle,
            className: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
        },
        inactive: {
            label: "Inactive",
            icon: XCircle,
            className: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400",
        },

        // Stock statuses
        "in-stock": {
            label: "In Stock",
            icon: CheckCircle,
            className: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
        },
        "low-stock": {
            label: "Low Stock",
            icon: AlertCircle,
            className: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
        },
        "out-of-stock": {
            label: "Out of Stock",
            icon: XCircle,
            className: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
        },
    };

    const statusKey = status?.toLowerCase().replace(/\s+/g, "-");
    const statusConfig = config[statusKey] || {
        label: status,
        icon: AlertCircle,
        className: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400",
    };

    const Icon = statusConfig.icon;

    const sizeClasses = {
        sm: "px-2 py-0.5 text-xs",
        md: "px-3 py-1 text-xs",
        lg: "px-4 py-1.5 text-sm",
    };

    const iconSizes = {
        sm: "h-3 w-3",
        md: "h-3.5 w-3.5",
        lg: "h-4 w-4",
    };

    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full font-medium ${statusConfig.className} ${sizeClasses[size]}`}
        >
            {showIcon && <Icon className={iconSizes[size]} />}
            {statusConfig.label}
        </span>
    );
}
