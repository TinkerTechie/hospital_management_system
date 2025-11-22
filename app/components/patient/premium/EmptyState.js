"use client";

import React from "react";
import { motion } from "framer-motion";

export default function EmptyState({ icon: Icon, title, message, compact = false }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`flex flex-col items-center justify-center text-center ${compact ? 'py-8' : 'py-16'}`}
        >
            <div className={`relative mb-4 ${compact ? 'scale-75' : ''}`}>
                <div className="absolute inset-0 bg-gray-100 dark:bg-gray-700 rounded-full blur-xl opacity-50 animate-pulse"></div>
                <div className="relative p-5 bg-white dark:bg-gray-800 rounded-full shadow-sm border border-gray-100 dark:border-gray-700">
                    <Icon className="h-8 w-8 text-gray-400 dark:text-gray-500" />
                </div>

                {/* Decorative dots */}
                <div className="absolute -top-1 -right-1 h-3 w-3 bg-sky-400 rounded-full opacity-50"></div>
                <div className="absolute -bottom-1 -left-1 h-2 w-2 bg-emerald-400 rounded-full opacity-50"></div>
            </div>

            <h4 className="text-gray-900 dark:text-white font-bold mb-1.5">{title}</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs leading-relaxed">{message}</p>
        </motion.div>
    );
}
