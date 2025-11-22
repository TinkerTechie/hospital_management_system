"use client";

import React from "react";
import { Clock, Calendar, FileText, ChevronRight, Pill } from "lucide-react";
import { motion } from "framer-motion";

export function AppointmentCard({ appt }) {
    return (
        <motion.div
            whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 1)" }}
            className="flex items-center p-4 bg-gray-50/50 dark:bg-gray-700/30 rounded-2xl border border-gray-100 dark:border-gray-700 hover:shadow-md hover:border-sky-100 dark:hover:border-sky-900/30 transition-all duration-200 cursor-pointer group"
        >
            <div className="h-14 w-14 rounded-2xl bg-sky-100 dark:bg-sky-900/30 flex flex-col items-center justify-center text-sky-600 dark:text-sky-400 font-bold mr-4 group-hover:bg-sky-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                <span className="text-lg leading-none">{new Date(appt.date).getDate()}</span>
                <span className="text-[10px] uppercase font-medium opacity-80">{new Date(appt.date).toLocaleString('default', { month: 'short' })}</span>
            </div>

            <div className="flex-1 min-w-0">
                <h4 className="font-bold text-gray-900 dark:text-white truncate group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">{appt.doctor?.name || "Doctor"}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{appt.type || "General Checkup"}</p>
            </div>

            <div className="text-right pl-4">
                <div className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-300 mb-1 justify-end font-medium">
                    <Clock className="h-3.5 w-3.5 text-gray-400" />
                    {appt.time}
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-50 text-sky-600 dark:bg-sky-900/20 dark:text-sky-400 border border-sky-100 dark:border-sky-900/30">
                    Confirmed
                </span>
            </div>
        </motion.div>
    );
}

export function PrescriptionCard({ p }) {
    return (
        <motion.div
            whileHover={{ y: -2 }}
            className="p-5 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200"
        >
            <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg text-emerald-600 dark:text-emerald-400">
                        <Pill className="h-5 w-5" />
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900 dark:text-white">{p.medicine}</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{p.dosage}</p>
                    </div>
                </div>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-2.5 py-1 rounded-lg border border-emerald-100 dark:border-emerald-900/30">
                    Active
                </span>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 pt-3 border-t border-gray-50 dark:border-gray-700">
                <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" /> {p.frequency}
                </span>
                <span className="font-medium">{p.duration}</span>
            </div>
        </motion.div>
    );
}

export function RecordRow({ rec }) {
    return (
        <motion.div
            whileHover={{ x: 4, backgroundColor: "rgba(249, 250, 251, 0.8)" }}
            className="flex items-center justify-between p-3.5 rounded-xl transition-all cursor-pointer group border border-transparent hover:border-gray-100 dark:hover:border-gray-700 dark:hover:bg-gray-800/50"
        >
            <div className="flex items-center gap-4">
                <div className="h-11 w-11 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shadow-sm">
                    <FileText className="h-5 w-5" />
                </div>
                <div>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{rec.type || "Medical Report"}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{rec.date || "Unknown Date"}</p>
                </div>
            </div>
            <div className="h-8 w-8 rounded-full bg-gray-50 dark:bg-gray-700 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400" />
            </div>
        </motion.div>
    );
}
