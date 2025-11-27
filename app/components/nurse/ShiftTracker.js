"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";

export default function ShiftTracker({ shiftTiming }) {
    const [progress, setProgress] = useState(0);
    const [timeLeft, setTimeLeft] = useState("");

    useEffect(() => {
        if (!shiftTiming) return;

        const calculateProgress = () => {
            const now = new Date();
            const [startStr, endStr] = shiftTiming.split(" - ");

            const parseTime = (timeStr) => {
                const [time, modifier] = timeStr.split(" ");
                let [hours, minutes] = time.split(":");
                if (hours === "12") hours = "00";
                if (modifier === "PM") hours = parseInt(hours, 10) + 12;

                const date = new Date();
                date.setHours(hours, minutes, 0, 0);
                return date;
            };

            let start = parseTime(startStr);
            let end = parseTime(endStr);

            // Handle night shifts crossing midnight
            if (end < start) {
                if (now > start) end.setDate(end.getDate() + 1);
                else start.setDate(start.getDate() - 1);
            }

            const totalDuration = end - start;
            const elapsed = now - start;

            let percentage = (elapsed / totalDuration) * 100;
            percentage = Math.max(0, Math.min(100, percentage));

            setProgress(percentage);

            // Time left calculation
            const remainingMs = end - now;
            if (remainingMs > 0) {
                const hours = Math.floor(remainingMs / (1000 * 60 * 60));
                const minutes = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60));
                setTimeLeft(`${hours}h ${minutes}m remaining`);
            } else {
                setTimeLeft("Shift Completed");
            }
        };

        calculateProgress();
        const interval = setInterval(calculateProgress, 60000); // Update every minute

        return () => clearInterval(interval);
    }, [shiftTiming]);

    return (
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-6 rounded-2xl border border-teal-100 dark:border-teal-900/30 shadow-sm">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2 text-teal-700 dark:text-teal-400">
                    <Clock className="h-5 w-5" />
                    <h3 className="font-bold">Current Shift</h3>
                </div>
                <span className="text-xs font-medium bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-300 px-2 py-1 rounded-lg">
                    {shiftTiming}
                </span>
            </div>

            <div className="relative h-4 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-teal-400 to-teal-600"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                />
            </div>

            <div className="flex justify-between mt-2 text-xs font-medium text-gray-500 dark:text-gray-400">
                <span>Started</span>
                <span className="text-teal-600 dark:text-teal-400">{timeLeft}</span>
                <span>End</span>
            </div>
        </div>
    );
}
