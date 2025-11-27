"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function NotificationBadge({ count = 0, size = "md" }) {
    if (count === 0) return null;

    const sizes = {
        sm: "h-4 w-4 text-[10px]",
        md: "h-5 w-5 text-xs",
        lg: "h-6 w-6 text-sm",
    };

    const sizeClass = sizes[size] || sizes.md;
    const displayCount = count > 99 ? "99+" : count;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className={`${sizeClass} absolute -top-1 -right-1 bg-red-500 text-white rounded-full flex items-center justify-center font-bold shadow-lg`}
            >
                <motion.span
                    key={count}
                    initial={{ scale: 1.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                >
                    {displayCount}
                </motion.span>
            </motion.div>
        </AnimatePresence>
    );
}
