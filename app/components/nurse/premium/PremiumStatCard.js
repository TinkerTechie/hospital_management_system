"use client";

import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";

export default function PremiumStatCard({
    icon: Icon,
    label,
    value,
    subtitle,
    trend,
    trendValue,
    color = "blue",
    delay = 0
}) {
    const colorClasses = {
        blue: {
            gradient: "from-blue-500 to-sky-400",
            bg: "bg-blue-50 dark:bg-blue-900/20",
            text: "text-blue-600 dark:text-blue-400",
            iconBg: "bg-blue-100 dark:bg-blue-900/30"
        },
        teal: {
            gradient: "from-teal-500 to-emerald-400",
            bg: "bg-teal-50 dark:bg-teal-900/20",
            text: "text-teal-600 dark:text-teal-400",
            iconBg: "bg-teal-100 dark:bg-teal-900/30"
        },
        amber: {
            gradient: "from-amber-500 to-yellow-400",
            bg: "bg-amber-50 dark:bg-amber-900/20",
            text: "text-amber-600 dark:text-amber-400",
            iconBg: "bg-amber-100 dark:bg-amber-900/30"
        },
        red: {
            gradient: "from-red-500 to-rose-400",
            bg: "bg-red-50 dark:bg-red-900/20",
            text: "text-red-600 dark:text-red-400",
            iconBg: "bg-red-100 dark:bg-red-900/30"
        }
    };

    const colors = colorClasses[color] || colorClasses.blue;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.4 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
        >
            {/* Gradient Background */}
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${colors.gradient} opacity-5 rounded-full blur-2xl group-hover:opacity-10 transition-opacity duration-500`}></div>

            <div className="relative z-10">
                {/* Icon */}
                <div className={`${colors.iconBg} w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`h-6 w-6 ${colors.text}`} />
                </div>

                {/* Label */}
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    {label}
                </p>

                {/* Value */}
                <div className="flex items-baseline gap-2 mb-2">
                    <h3 className="text-4xl font-bold text-gray-900 dark:text-white">
                        {value}
                    </h3>
                    {subtitle && (
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            {subtitle}
                        </span>
                    )}
                </div>

                {/* Trend */}
                {trend !== undefined && (
                    <div className={`flex items-center gap-1 text-sm font-semibold ${trend >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                        }`}>
                        {trend >= 0 ? (
                            <TrendingUp className="h-4 w-4" />
                        ) : (
                            <TrendingDown className="h-4 w-4" />
                        )}
                        <span>{Math.abs(trend)}%</span>
                        {trendValue && (
                            <span className="text-gray-500 dark:text-gray-400 font-normal ml-1">
                                {trendValue}
                            </span>
                        )}
                    </div>
                )}
            </div>
        </motion.div>
    );
}
