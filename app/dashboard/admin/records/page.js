"use client";

import React, { useState, useEffect } from "react";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import SearchBar from "../../../components/shared/SearchBar";
import FilterBar from "../../../components/shared/FilterBar";
import DataTable from "../../../components/shared/DataTable";
import Pagination from "../../../components/shared/Pagination";
import { Plus, Upload, Download, Eye, FileText } from "lucide-react";
import Link from "next/link";

export default function MedicalRecordsPage() {
    const [dark, setDark] = useState(false);
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [filters, setFilters] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [sortColumn, setSortColumn] = useState("date");
    const [sortDirection, setSortDirection] = useState("desc");

    useEffect(() => {
        if (typeof window !== "undefined") {
            const theme = localStorage.getItem("theme");
            setDark(theme === "dark");
        }
        fetchRecords();
    }, [currentPage, itemsPerPage, searchQuery, filters, sortColumn, sortDirection]);

    const toggleDark = () => {
        const newTheme = !dark;
        setDark(newTheme);
        if (typeof window !== "undefined") {
            localStorage.setItem("theme", newTheme ? "dark" : "light");
            document.documentElement.classList.toggle("dark", newTheme);
        }
    };

    const fetchRecords = async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams({
                page: currentPage,
                limit: itemsPerPage,
                search: searchQuery,
                sortBy: sortColumn,
                sortOrder: sortDirection,
                ...filters,
            });

            const res = await fetch(`/api/admin/records?${params}`);
            if (!res.ok) throw new Error("Failed to fetch records");

            const data = await res.json();
            setRecords(data.records || []);
        } catch (error) {
            console.error("Error fetching records:", error);
            setRecords([]);
        } finally {
            setLoading(false);
        }
    };

    const filterOptions = [
        {
            key: "type",
            label: "Record Type",
            options: [
                { value: "lab-report", label: "Lab Report" },
                { value: "prescription", label: "Prescription" },
                { value: "radiology", label: "Radiology" },
                { value: "certificate", label: "Certificate" },
                { value: "other", label: "Other" },
            ],
        },
    ];

    const columns = [
        {
            key: "id",
            label: "Record ID",
            render: (row) => (
                <div className="font-medium text-gray-900 dark:text-white">
                    #{row.id}
                </div>
            ),
        },
        {
            key: "title",
            label: "Document Title",
            render: (row) => (
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                        <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                        <p className="font-medium text-gray-900 dark:text-white">{row.title || "Untitled"}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{row.description}</p>
                    </div>
                </div>
            ),
        },
        {
            key: "patient",
            label: "Patient",
            render: (row) => (
                <div>
                    <p className="font-medium text-gray-900 dark:text-white">{row.patient?.name || "N/A"}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">ID: #{row.patient?.id}</p>
                </div>
            ),
        },
        {
            key: "type",
            label: "Type",
            render: (row) => (
                <span className="px-2 py-1 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 rounded-md text-xs font-medium capitalize">
                    {row.type?.replace("-", " ") || "Document"}
                </span>
            ),
        },
        {
            key: "date",
            label: "Upload Date",
            render: (row) => (
                <span className="text-sm text-gray-600 dark:text-gray-300">
                    {row.createdAt ? new Date(row.createdAt).toLocaleDateString() : "N/A"}
                </span>
            ),
        },
        {
            key: "doctor",
            label: "Doctor",
            render: (row) => (
                <span className="text-sm text-gray-600 dark:text-gray-300">
                    {row.doctor?.name ? `Dr. ${row.doctor.name}` : "N/A"}
                </span>
            ),
        },
        {
            key: "actions",
            label: "Actions",
            sortable: false,
            render: (row) => (
                <div className="flex items-center gap-2">
                    <Link
                        href={`/dashboard/admin/records/${row.id}`}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                        title="View"
                    >
                        <Eye className="h-4 w-4" />
                    </Link>
                    <button
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        title="Download"
                    >
                        <Download className="h-4 w-4" />
                    </button>
                </div>
            ),
        },
    ];

    const totalPages = Math.ceil((records.length || 0) / itemsPerPage);

    return (
        <div className={dark ? "dark" : ""}>
            <div className="  min-h-screen flex font-sans text-gray-900 transition-colors duration-300">
                <div className="hidden md:block">
                    <AdminSidebar dark={dark} toggleDark={toggleDark} />
                </div>

                <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto overflow-y-auto">
                    <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                Medical Records
                            </h1>
                            <p className="text-gray-500 dark:text-gray-400">
                                Manage patient medical documents and records
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => {
                                    // Simple CSV export
                                    const csv = records.map(r => `"${r.id}","${r.title}","${r.patient?.name}","${r.type}","${r.createdAt}"`).join('\n');
                                    const blob = new Blob([`"ID","Title","Patient","Type","Date"\n${csv}`], { type: 'text/csv' });
                                    const url = URL.createObjectURL(blob);
                                    const a = document.createElement('a');
                                    a.href = url;
                                    a.download = 'medical-records.csv';
                                    a.click();
                                }}
                                className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
                            >
                                <Download className="h-4 w-4" />
                                Export
                            </button>
                            <Link
                                href="/dashboard/admin/records/upload"
                                className="px-4 py-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors shadow-lg shadow-teal-200 dark:shadow-none flex items-center gap-2"
                            >
                                <Upload className="h-4 w-4" />
                                Upload Record
                            </Link>
                        </div>
                    </header>

                    {/* Search and Filters */}
                    <div className="mb-6 space-y-4">
                        <div className="flex flex-col md:flex-row gap-4">
                            <SearchBar
                                value={searchQuery}
                                onChange={setSearchQuery}
                                placeholder="Search by patient name, document title..."
                                className="flex-1"
                            />
                        </div>
                        <FilterBar
                            filters={filterOptions}
                            activeFilters={filters}
                            onFilterChange={(key, value) => setFilters({ ...filters, [key]: value })}
                            onClearAll={() => setFilters({})}
                        />
                    </div>

                    {/* Table */}
                    <DataTable
                        columns={columns}
                        data={records}
                        loading={loading}
                        sortColumn={sortColumn}
                        sortDirection={sortDirection}
                        onSort={(column, direction) => {
                            setSortColumn(column);
                            setSortDirection(direction);
                        }}
                        emptyMessage="No medical records found. Upload your first record to get started."
                    />

                    {/* Pagination */}
                    {!loading && records.length > 0 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            totalItems={records.length}
                            itemsPerPage={itemsPerPage}
                            onPageChange={setCurrentPage}
                            onItemsPerPageChange={setItemsPerPage}
                        />
                    )}
                </main>
            </div>
        </div>
    );
}
