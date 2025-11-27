"use client";

import React from "react";
import { motion } from "framer-motion";

export default function PremiumCard({ children, className = "", delay = 0 }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.4 }}
            whileHover={{ y: -3 }}
            className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700/50 hover:shadow-xl hover:shadow-teal-500/10 dark:hover:shadow-teal-500/5 transition-all duration-300 ${className}`}
        >
            {children}
        </motion.div>
    );
}
