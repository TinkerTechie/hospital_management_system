"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function StatCard({ icon, label, value, sub, color, trend }) {
    return (
        <motion.div
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700/50 hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-black/30 transition-all duration-300 group relative overflow-hidden"
        >
            {/* Background Decoration */}
            <div className={`absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-5 ${color} blur-2xl group-hover:opacity-10 transition-opacity duration-500`}></div>

            <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-start border border-teal-100 hover:shadow-lg transition-shadow duration-300">
                <div className={`p-3 rounded-full ${color.replace('bg-', 'bg-opacity-10 text-')} mb-4`}>
                    {icon}
                </div>
                <h4 className="font-medium text-lg text-teal-700">{label}</h4>
                <div className="flex items-end gap-2 mt-1">
                    <span className="text-3xl font-bold text-gray-800">{value}</span>
                    <span className="text-sm text-gray-500 mb-1">{sub}</span>
                </div>
                {trend && (
                    <div className={`mt-3 text-xs font-medium ${trend > 0 ? 'text-green-600' : 'text-red-500'}`}>
                        {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}% from last month
                    </div>
                )}
            </div>
        </motion.div>
    );
}
