"use client";

import React from "react";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";

export default function DataTable({
    columns = [],
    data = [],
    sortable = true,
    sortColumn = null,
    sortDirection = "asc",
    onSort,
    onRowClick,
    emptyMessage = "No data available",
    loading = false,
}) {
    const handleSort = (columnKey) => {
        if (!sortable || !onSort) return;

        const newDirection =
            sortColumn === columnKey && sortDirection === "asc" ? "desc" : "asc";
        onSort(columnKey, newDirection);
    };

    const getSortIcon = (columnKey) => {
        if (sortColumn !== columnKey) {
            return <ArrowUpDown className="h-4 w-4 text-gray-400" />;
        }
        return sortDirection === "asc" ? (
            <ArrowUp className="h-4 w-4 text-teal-600 dark:text-teal-400" />
        ) : (
            <ArrowDown className="h-4 w-4 text-teal-600 dark:text-teal-400" />
        );
    };

    if (loading) {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="p-10 text-center">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-teal-600 border-r-transparent"></div>
                    <p className="mt-4 text-gray-500 dark:text-gray-400">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-50/50 dark:bg-gray-700/30 border-b border-gray-100 dark:border-gray-700">
                            {columns.map((column) => (
                                <th
                                    key={column.key}
                                    className={`px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider ${column.sortable !== false && sortable ? "cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700/50" : ""
                                        }`}
                                    onClick={() => column.sortable !== false && handleSort(column.key)}
                                >
                                    <div className="flex items-center gap-2">
                                        {column.label}
                                        {column.sortable !== false && sortable && getSortIcon(column.key)}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
                        {data.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length} className="px-6 py-10 text-center">
                                    <p className="text-gray-500 dark:text-gray-400">{emptyMessage}</p>
                                </td>
                            </tr>
                        ) : (
                            data.map((row, rowIndex) => (
                                <tr
                                    key={row.id || rowIndex}
                                    onClick={() => onRowClick?.(row)}
                                    className={`group hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${onRowClick ? "cursor-pointer" : ""
                                        }`}
                                >
                                    {columns.map((column) => (
                                        <td key={column.key} className="px-6 py-4">
                                            {column.render ? column.render(row) : row[column.key]}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
