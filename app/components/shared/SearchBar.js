"use client";

import React from "react";
import { Search, X } from "lucide-react";

export default function SearchBar({
    value = "",
    onChange,
    onClear,
    placeholder = "Search...",
    className = "",
}) {
    const [localValue, setLocalValue] = React.useState(value);
    const timeoutRef = React.useRef(null);

    React.useEffect(() => {
        setLocalValue(value);
    }, [value]);

    const handleChange = (e) => {
        const newValue = e.target.value;
        setLocalValue(newValue);

        // Debounce the onChange callback
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            onChange?.(newValue);
        }, 300);
    };

    const handleClear = () => {
        setLocalValue("");
        onChange?.("");
        onClear?.();
    };

    return (
        <div className={`relative ${className}`}>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
                type="text"
                value={localValue}
                onChange={handleChange}
                placeholder={placeholder}
                className="w-full pl-10 pr-10 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-gray-800 dark:text-white placeholder-gray-400"
            />
            {localValue && (
                <button
                    onClick={handleClear}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                >
                    <X className="h-4 w-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                </button>
            )}
        </div>
    );
}
