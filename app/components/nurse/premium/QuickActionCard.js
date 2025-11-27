"use client";

import React from "react";
import { motion } from "framer-motion";

export default function QuickActionCard({
    icon: Icon,
    label,
    description,
    onClick,
    color = "blue",
    delay = 0
}) {
    const colorClasses = {
        blue: "from-blue-500 to-sky-400 hover:from-blue-600 hover:to-sky-500",
        teal: "from-teal-500 to-emerald-400 hover:from-teal-600 hover:to-emerald-500",
        purple: "from-purple-500 to-violet-400 hover:from-purple-600 hover:to-violet-500",
        red: "from-red-500 to-rose-400 hover:from-red-600 hover:to-rose-500"
    };

    const gradient = colorClasses[color] || colorClasses.blue;

    return (
        <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay, duration: 0.3 }}
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className={`bg-gradient-to-br ${gradient} text-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 text-left w-full group relative overflow-hidden`}
        >
            {/* Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 group-hover:translate-x-full transition-transform duration-1000"></div>

            <div className="relative z-10">
                {/* Icon */}
                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-7 w-7" />
                </div>

                {/* Label */}
                <h3 className="text-xl font-bold mb-1">
                    {label}
                </h3>

                {/* Description */}
                {description && (
                    <p className="text-sm text-white/80">
                        {description}
                    </p>
                )}
            </div>
        </motion.button>
    );
}
