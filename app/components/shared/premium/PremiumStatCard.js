"use client";

import React from "react";
import { motion } from "framer-motion";

export default function PremiumStatCard({ icon, label, value, subtitle, trend, color = "bg-teal-50 dark:bg-teal-900/20" }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700/50 hover:shadow-xl hover:shadow-teal-500/10 dark:hover:shadow-teal-500/5 transition-all duration-300 group relative overflow-hidden"
        >
            {/* Background Gradient */}
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-teal-400/10 to-teal-600/10 blur-2xl group-hover:scale-150 transition-transform duration-500"></div>

            <div className="relative z-10">
                <div className={`p-3 rounded-xl ${color} w-fit mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {icon}
                </div>

                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{label}</p>

                <div className="flex items-baseline gap-2">
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{value}</h3>
                    {subtitle && <span className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</span>}
                </div>

                {trend !== undefined && (
                    <div className={`mt-3 text-xs font-semibold flex items-center gap-1 ${trend >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        <span>{trend >= 0 ? '↑' : '↓'}</span>
                        <span>{Math.abs(trend)}% from last month</span>
                    </div>
                )}
            </div>
        </motion.div>
    );
}
