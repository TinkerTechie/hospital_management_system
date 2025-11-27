"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft, Bell, Check, Trash2, Filter } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import DashboardNavbar from "../../../components/patient/premium/DashboardNavbar";
import DashboardFooter from "../../../components/patient/premium/DashboardFooter";

export default function PatientNotificationsPage() {
    const [user, setUser] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [filter, setFilter] = useState("all"); // all, unread, read
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, [filter]);

    const fetchData = async () => {
        try {
            setLoading(true);

            // Get user
            const userRes = await fetch("/api/patient");
            if (userRes.ok) {
                const userData = await userRes.json();
                setUser(userData.user);
            }

            // Fetch notifications
            const url =
                filter === "all"
                    ? "/api/notifications?limit=50"
                    : `/api/notifications?read=${filter === "read"}&limit=50`;

            const notifRes = await fetch(url);
            if (notifRes.ok) {
                const notifData = await notifRes.json();
                setNotifications(notifData.notifications);
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

    const markAsRead = async (id) => {
        try {
            const res = await fetch(`/api/notifications/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ read: true }),
            });

            if (res.ok) {
                setNotifications((prev) =>
                    prev.map((n) => (n.id === id ? { ...n, read: true } : n))
                );
            }
        } catch (error) {
            console.error("Error marking notification as read:", error);
        }
    };

    const markAllAsRead = async () => {
        const unreadNotifications = notifications.filter((n) => !n.read);

        for (const notif of unreadNotifications) {
            await markAsRead(notif.id);
        }
    };

    const deleteNotification = async (id) => {
        try {
            const res = await fetch(`/api/notifications/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                setNotifications((prev) => prev.filter((n) => n.id !== id));
            }
        } catch (error) {
            console.error("Error deleting notification:", error);
        }
    };

    const getNotificationIcon = (type) => {
        const iconClass = "h-5 w-5";
        switch (type) {
            case "SUCCESS":
                return <Check className={`${iconClass} text-green-600`} />;
            case "WARNING":
                return <Bell className={`${iconClass} text-yellow-600`} />;
            case "ERROR":
                return <Bell className={`${iconClass} text-red-600`} />;
            default:
                return <Bell className={`${iconClass} text-blue-600`} />;
        }
    };

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin h-12 w-12 border-4 border-teal-600 border-t-transparent rounded-full"></div>
            </div>
        );
    }

    const unreadCount = notifications.filter((n) => !n.read).length;

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
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">Notifications</h1>
                            <p className="text-gray-500 mt-1">
                                {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
                            </p>
                        </div>
                        {unreadCount > 0 && (
                            <button
                                onClick={markAllAsRead}
                                className="flex items-center gap-2 bg-teal-600 text-white px-5 py-3 rounded-xl hover:bg-teal-700 font-medium shadow-sm transition-all"
                            >
                                <Check className="h-5 w-5" /> Mark All as Read
                            </button>
                        )}
                    </div>
                </div>

                {/* Filter Tabs */}
                <div className="flex gap-2 mb-6">
                    <button
                        onClick={() => setFilter("all")}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${filter === "all"
                                ? "bg-teal-600 text-white"
                                : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                            }`}
                    >
                        All
                    </button>
                    <button
                        onClick={() => setFilter("unread")}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${filter === "unread"
                                ? "bg-teal-600 text-white"
                                : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                            }`}
                    >
                        Unread ({unreadCount})
                    </button>
                    <button
                        onClick={() => setFilter("read")}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${filter === "read"
                                ? "bg-teal-600 text-white"
                                : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                            }`}
                    >
                        Read
                    </button>
                </div>

                {/* Notifications List */}
                {notifications.length === 0 ? (
                    <div className="bg-white rounded-2xl p-12 text-center border border-gray-200">
                        <Bell className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                            No notifications
                        </h3>
                        <p className="text-gray-500">
                            {filter === "all"
                                ? "You don't have any notifications yet"
                                : filter === "unread"
                                    ? "You don't have any unread notifications"
                                    : "You don't have any read notifications"}
                        </p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {notifications.map((notification) => (
                            <motion.div
                                key={notification.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`bg-white rounded-xl p-5 border shadow-sm hover:shadow-md transition-shadow ${!notification.read
                                        ? "border-teal-200 bg-teal-50/30"
                                        : "border-gray-200"
                                    }`}
                            >
                                <div className="flex items-start gap-4">
                                    <div className="mt-1">
                                        {getNotificationIcon(notification.type)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-2 mb-2">
                                            <h4 className="font-semibold text-gray-800">
                                                {notification.title}
                                            </h4>
                                            <div className="flex items-center gap-2">
                                                {!notification.read && (
                                                    <button
                                                        onClick={() => markAsRead(notification.id)}
                                                        className="text-teal-600 hover:text-teal-700 text-sm whitespace-nowrap"
                                                    >
                                                        Mark read
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => deleteNotification(notification.id)}
                                                    className="text-red-600 hover:text-red-700 p-1 rounded hover:bg-red-50"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </div>
                                        <p className="text-gray-700 mb-2">{notification.message}</p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-gray-500">
                                                {formatTime(notification.createdAt)}
                                            </span>
                                            {notification.link && (
                                                <Link
                                                    href={notification.link}
                                                    onClick={() => markAsRead(notification.id)}
                                                    className="text-sm text-teal-600 hover:text-teal-700 font-medium"
                                                >
                                                    View Details →
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </main>

            <DashboardFooter />
        </div>
    );
}
