"use client";

import React, { useState } from "react";
import { Phone, AlertCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function EmergencyButton() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Sticky Floating Action Button */}
            <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(true)}
                className="fixed bottom-8 right-8 z-40 flex items-center gap-3 bg-gradient-to-r from-red-600 to-rose-600 text-white px-6 py-4 rounded-full shadow-lg shadow-red-500/30 hover:shadow-red-500/50 transition-all duration-300 group"
            >
                <div className="relative">
                    <Phone className="h-6 w-6 relative z-10" />
                    <span className="absolute inset-0 rounded-full bg-white opacity-20 animate-ping"></span>
                </div>
                <span className="font-bold text-lg tracking-wide pr-1">Emergency</span>
            </motion.button>

            {/* Confirmation Modal */}
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        ></motion.div>

                        {/* Modal Content */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative bg-white dark:bg-background rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-gray-100 dark:border-gray-800"
                        >
                            {/* Header */}
                            <div className="bg-red-50 dark:bg-red-900/20 p-6 text-center border-b border-red-100 dark:border-red-900/30">
                                <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/40 rounded-full flex items-center justify-center mb-4 animate-pulse">
                                    <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Emergency Assistance</h2>
                                <p className="text-red-600 dark:text-red-400 font-medium">Are you sure you want to call 108?</p>
                            </div>

                            {/* Body */}
                            <div className="p-6 space-y-4">
                                <p className="text-gray-600 dark:text-gray-300 text-center text-sm">
                                    This will connect you immediately to emergency services. Only use this in case of a genuine medical emergency.
                                </p>

                                <div className="grid grid-cols-2 gap-4 mt-4">
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="py-3.5 px-4 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <a
                                        href="tel:108"
                                        className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold shadow-lg shadow-red-500/20 transition-all transform hover:-translate-y-0.5"
                                    >
                                        <Phone className="h-5 w-5 fill-current" />
                                        Call 108 Now
                                    </a>
                                </div>
                            </div>

                            {/* Close Button */}
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-4 right-4 p-2 rounded-full bg-white/50 hover:bg-white dark:bg-black/20 dark:hover:bg-black/40 transition-colors"
                            >
                                <X className="h-5 w-5 text-gray-500" />
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
