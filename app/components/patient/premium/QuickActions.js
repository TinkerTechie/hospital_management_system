"use client";

import React, { useState } from "react";
import { Plus, Calendar, FileText, MessageSquare, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function QuickActions() {
    const [isOpen, setIsOpen] = useState(false);

    const actions = [
        { icon: Calendar, label: "New Appointment", color: "bg-sky-500" },
        { icon: FileText, label: "Upload Record", color: "bg-indigo-500" },
        { icon: MessageSquare, label: "Message Doctor", color: "bg-emerald-500" },
    ];

    return (
        <div className="fixed bottom-8 right-8 z-30 hidden md:block">
            <AnimatePresence>
                {isOpen && (
                    <div className="absolute bottom-16 right-0 space-y-3 mb-2 flex flex-col items-end">
                        {actions.map((action, index) => (
                            <motion.button
                                key={index}
                                initial={{ opacity: 0, x: 20, scale: 0.8 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                exit={{ opacity: 0, x: 20, scale: 0.8 }}
                                transition={{ delay: index * 0.05 }}
                                className="flex items-center gap-3 group"
                            >
                                <span className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-sm font-medium px-3 py-1.5 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
                                    {action.label}
                                </span>
                                <div className={`p-3 rounded-full text-white shadow-lg ${action.color} hover:brightness-110 transition-all`}>
                                    <action.icon className="h-5 w-5" />
                                </div>
                            </motion.button>
                        ))}
                    </div>
                )}
            </AnimatePresence>

            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{ rotate: isOpen ? 45 : 0 }}
                className={`p-4 rounded-full shadow-xl text-white transition-colors duration-300 ${isOpen ? "bg-gray-800 dark:bg-gray-700" : "bg-sky-600 hover:bg-sky-700"}`}
            >
                <Plus className="h-6 w-6" />
            </motion.button>
        </div>
    );
}
