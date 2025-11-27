"use client";

import React from "react";
import { motion } from "framer-motion";
import { Clock, Calendar } from "lucide-react";

export default function WelcomeCard({ userName, currentShift, shiftEnd }) {
    const getCurrentTime = () => {
        return new Date().toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    const [currentTime, setCurrentTime] = React.useState(getCurrentTime());

    React.useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(getCurrentTime());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-sky-500 via-blue-500 to-teal-500 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden"
        >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl transform translate-x-32 -translate-y-32"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full blur-3xl transform -translate-x-24 translate-y-24"></div>
            </div>

            <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">
                            Welcome back, {userName}! 👋
                        </h1>
                        <p className="text-blue-100 text-sm">
                            Ready to make a difference today
                        </p>
                    </div>
                    <div className="text-right">
                        <div className="flex items-center gap-2 text-2xl font-bold mb-1">
                            <Clock className="h-6 w-6" />
                            {currentTime}
                        </div>
                        <div className="text-blue-100 text-sm">
                            {new Date().toLocaleDateString('en-US', {
                                weekday: 'long',
                                month: 'short',
                                day: 'numeric'
                            })}
                        </div>
                    </div>
                </div>

                {currentShift && (
                    <div className="flex items-center gap-6 mt-4 pt-4 border-t border-white/20">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
                            <span className="text-sm font-medium">On Duty</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4" />
                            <span>{currentShift}</span>
                        </div>
                        {shiftEnd && (
                            <div className="text-sm">
                                Shift ends at <span className="font-semibold">{shiftEnd}</span>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </motion.div>
    );
}
