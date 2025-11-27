"use client";

import React, { useState } from "react";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function PremiumSearchBar({ onSearch, placeholder = "Search patients..." }) {
    const [query, setQuery] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    const handleSearch = (value) => {
        setQuery(value);
        if (onSearch) {
            onSearch(value);
        }
    };

    const handleClear = () => {
        setQuery("");
        if (onSearch) {
            onSearch("");
        }
    };

    return (
        <div className="relative">
            <motion.div
                animate={{
                    scale: isFocused ? 1.02 : 1,
                }}
                transition={{ duration: 0.2 }}
                className={`relative flex items-center bg-white dark:bg-gray-800 rounded-xl border-2 transition-all duration-300 ${isFocused
                        ? 'border-sky-500 shadow-lg shadow-sky-500/20'
                        : 'border-gray-200 dark:border-gray-700 shadow-sm'
                    }`}
            >
                <Search className={`absolute left-4 h-5 w-5 transition-colors duration-300 ${isFocused ? 'text-sky-500' : 'text-gray-400'
                    }`} />

                <input
                    type="text"
                    value={query}
                    onChange={(e) => handleSearch(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder={placeholder}
                    className="w-full pl-12 pr-12 py-3 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 outline-none text-sm font-medium"
                />

                <AnimatePresence>
                    {query && (
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            onClick={handleClear}
                            className="absolute right-4 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                        >
                            <X className="h-4 w-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                        </motion.button>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Search Results Indicator */}
            <AnimatePresence>
                {isFocused && query && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full mt-2 left-0 right-0 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-3 z-50"
                    >
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Searching for "{query}"...
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
