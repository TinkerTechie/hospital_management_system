"use client";

import React, { useEffect } from "react";
import { CheckCircle, XCircle, AlertCircle, Info, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Toast = ({ id, type = "info", message, duration = 5000, onClose }) => {
    useEffect(() => {
        if (duration > 0) {
            const timer = setTimeout(() => {
                onClose?.(id);
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [duration, id, onClose]);

    const config = {
        success: {
            icon: CheckCircle,
            className: "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200",
            iconClassName: "text-green-600 dark:text-green-400",
        },
        error: {
            icon: XCircle,
            className: "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200",
            iconClassName: "text-red-600 dark:text-red-400",
        },
        warning: {
            icon: AlertCircle,
            className: "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200",
            iconClassName: "text-yellow-600 dark:text-yellow-400",
        },
        info: {
            icon: Info,
            className: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200",
            iconClassName: "text-blue-600 dark:text-blue-400",
        },
    };

    const { icon: Icon, className, iconClassName } = config[type];

    return (
        <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className={`flex items-start gap-3 p-4 rounded-xl border shadow-lg ${className} min-w-[300px] max-w-md`}
        >
            <Icon className={`h-5 w-5 flex-shrink-0 mt-0.5 ${iconClassName}`} />
            <p className="flex-1 text-sm font-medium">{message}</p>
            <button
                onClick={() => onClose?.(id)}
                className="p-1 hover:bg-black/5 dark:hover:bg-white/5 rounded-md transition-colors flex-shrink-0"
            >
                <X className="h-4 w-4" />
            </button>
        </motion.div>
    );
};

export default function ToastContainer() {
    const [toasts, setToasts] = React.useState([]);

    const addToast = React.useCallback((toast) => {
        const id = Date.now() + Math.random();
        setToasts((prev) => [...prev, { ...toast, id }]);
    }, []);

    const removeToast = React.useCallback((id) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, []);

    // Expose methods globally
    React.useEffect(() => {
        window.showToast = addToast;
    }, [addToast]);

    return (
        <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2">
            <AnimatePresence>
                {toasts.map((toast) => (
                    <Toast key={toast.id} {...toast} onClose={removeToast} />
                ))}
            </AnimatePresence>
        </div>
    );
}

// Helper functions to show toasts
export const showToast = {
    success: (message, duration) => window.showToast?.({ type: "success", message, duration }),
    error: (message, duration) => window.showToast?.({ type: "error", message, duration }),
    warning: (message, duration) => window.showToast?.({ type: "warning", message, duration }),
    info: (message, duration) => window.showToast?.({ type: "info", message, duration }),
};
