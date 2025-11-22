"use client";

import React from "react";
import { Filter, X } from "lucide-react";

export default function FilterBar({
    filters = [],
    activeFilters = {},
    onFilterChange,
    onClearAll,
}) {
    const activeCount = Object.values(activeFilters).filter((v) => v && v !== "all").length;

    return (
        <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Filter className="h-4 w-4" />
                <span className="font-medium">Filters:</span>
            </div>

            {filters.map((filter) => (
                <div key={filter.key} className="flex items-center gap-2">
                    <select
                        value={activeFilters[filter.key] || "all"}
                        onChange={(e) => onFilterChange?.(filter.key, e.target.value)}
                        className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                    >
                        <option value="all">{filter.label}: All</option>
                        {filter.options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            ))}

            {activeCount > 0 && (
                <button
                    onClick={onClearAll}
                    className="flex items-center gap-1.5 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
                >
                    <X className="h-4 w-4" />
                    Clear all ({activeCount})
                </button>
            )}
        </div>
    );
}
