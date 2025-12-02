"use client";

import React, { useState, useEffect } from "react";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import SearchBar from "../../../components/shared/SearchBar";
import FilterBar from "../../../components/shared/FilterBar";
import DataTable from "../../../components/shared/DataTable";
import Pagination from "../../../components/shared/Pagination";
import StatusBadge from "../../../components/shared/StatusBadge";
import { Plus, Eye, Edit, Trash2, Grid, List, Clock, MapPin } from "lucide-react";
import Link from "next/link";
import Swal from "sweetalert2";

export default function NursesListPage() {
    const [dark, setDark] = useState(false);
    const [nurses, setNurses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [filters, setFilters] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [sortColumn, setSortColumn] = useState("fullName");
    const [sortDirection, setSortDirection] = useState("asc");
    const [viewMode, setViewMode] = useState("table"); // table or grid
    const [totalItems, setTotalItems] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const theme = localStorage.getItem("theme");
            setDark(theme === "dark");
        }
        fetchNurses();
    }, [currentPage, itemsPerPage, searchQuery, filters, sortColumn, sortDirection]);

    const toggleDark = () => {
        const newTheme = !dark;
        setDark(newTheme);
        if (typeof window !== "undefined") {
            localStorage.setItem("theme", newTheme ? "dark" : "light");
            document.documentElement.classList.toggle("dark", newTheme);
        }
    };

    const fetchNurses = async () => {
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

            const res = await fetch(`/api/admin/nurses?${params}`);
            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`Failed to fetch nurses: ${res.status} ${res.statusText} - ${errorText}`);
            }

            const data = await res.json();
            console.log("Nurses API Response:", data); // Debug log
            setNurses(data.nurses || []);
            setTotalItems(data.pagination?.total || 0);
            setTotalPages(data.pagination?.totalPages || 0);
        } catch (error) {
            console.error("Error fetching nurses:", error);
            alert(`Error loading nurses: ${error.message}`); // Show error to user
            setNurses([]);
            setTotalItems(0);
            setTotalPages(0);
        } finally {
            setLoading(false);
        }
    };

    const handleExport = () => {
        const headers = ["ID", "Name", "Email", "Phone", "Shift", "Ward"];
        const csvContent = [
            headers.join(","),
            ...nurses.map(n => [
                n.id,
                `"${n.fullName}"`,
                n.email || "",
                n.phone || "",
                `"${n.shiftTiming || ""}"`,
                `"${n.assignedWard || ""}"`
            ].join(","))
        ].join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "nurses_export.csv";
        link.click();
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        });

        if (result.isConfirmed) {
            try {
                const res = await fetch(`/api/admin/nurses?id=${id}`, {
                    method: "DELETE",
                });

                if (res.ok) {
                    Swal.fire("Deleted!", "Nurse has been deleted.", "success");
                    fetchNurses();
                } else {
                    Swal.fire("Error!", "Failed to delete nurse.", "error");
                }
            } catch (error) {
                console.error("Error deleting nurse:", error);
                Swal.fire("Error!", "Something went wrong.", "error");
            }
        }
    };

    const filterOptions = [
        {
            key: "shiftTiming",
            label: "Shift",
            options: [
                { value: "08:00 AM - 04:00 PM", label: "Morning" },
                { value: "04:00 PM - 12:00 AM", label: "Evening" },
                { value: "12:00 AM - 08:00 AM", label: "Night" },
            ],
        },
        {
            key: "assignedWard",
            label: "Ward",
            options: [
                { value: "Emergency", label: "Emergency" },
                { value: "ICU", label: "ICU" },
                { value: "Pediatrics", label: "Pediatrics" },
                { value: "General Ward", label: "General Ward" },
                { value: "Surgery", label: "Surgery" },
            ],
        },
    ];

    const columns = [
        {
            key: "id",
            label: "Nurse ID",
            render: (row) => (
                <div className="font-medium text-gray-900 dark:text-white">
                    #{row.id.substring(0, 8)}...
                </div>
            ),
        },
        {
            key: "fullName",
            label: "Nurse Name",
            render: (row) => (
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-700 dark:text-teal-300 font-bold text-sm">
                        {row.fullName?.charAt(0) || "N"}
                    </div>
                    <div>
                        <p className="font-medium text-gray-900 dark:text-white">{row.fullName}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{row.email}</p>
                    </div>
                </div>
            ),
        },
        {
            key: "shiftTiming",
            label: "Shift",
            render: (row) => (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium">
                    <Clock className="h-3.5 w-3.5" />
                    {row.shiftTiming || "Not Assigned"}
                </span>
            ),
        },
        {
            key: "assignedWard",
            label: "Ward",
            render: (row) => (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium">
                    <MapPin className="h-3.5 w-3.5" />
                    {row.assignedWard || "Not Assigned"}
                </span>
            ),
        },
        {
            key: "phone",
            label: "Contact",
            render: (row) => (
                <span className="text-sm text-gray-600 dark:text-gray-300">{row.phone || "N/A"}</span>
            ),
        },
        {
            key: "actions",
            label: "Actions",
            sortable: false,
            render: (row) => (
                <div className="flex items-center gap-2">
                    <Link
                        href={`/dashboard/admin/nurses/${row.id}`}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                        title="View Profile"
                    >
                        <Eye className="h-4 w-4" />
                    </Link>
                    <Link
                        href={`/dashboard/admin/nurses/${row.id}/edit`}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        title="Edit"
                    >
                        <Edit className="h-4 w-4" />
                    </Link>
                    <button
                        onClick={() => handleDelete(row.id)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                        title="Delete"
                    >
                        <Trash2 className="h-4 w-4" />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div className={dark ? "dark" : ""}>
            <div className="min-h-screen flex font-sans text-gray-900 transition-colors duration-300">
                <div className="hidden md:block">
                    <AdminSidebar dark={dark} toggleDark={toggleDark} />
                </div>

                <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto overflow-y-auto">
                    <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                Nurses Management
                            </h1>
                            <p className="text-gray-500 dark:text-gray-400">
                                Manage nurse profiles, shifts, and ward assignments
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <div className="flex gap-2 bg-white dark:bg-gray-800 rounded-xl p-1 border border-gray-200 dark:border-gray-700">
                                <button
                                    onClick={() => setViewMode("table")}
                                    className={`p-2 rounded-lg transition-colors ${viewMode === "table"
                                        ? "bg-teal-600 text-white"
                                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                                        }`}
                                >
                                    <List className="h-4 w-4" />
                                </button>
                                <button
                                    onClick={() => setViewMode("grid")}
                                    className={`p-2 rounded-lg transition-colors ${viewMode === "grid"
                                        ? "bg-teal-600 text-white"
                                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                                        }`}
                                >
                                    <Grid className="h-4 w-4" />
                                </button>
                            </div>
                            <button
                                onClick={handleExport}
                                className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            >
                                Export
                            </button>
                            <Link
                                href="/dashboard/admin/nurses/new"
                                className="px-4 py-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors shadow-lg shadow-teal-200 dark:shadow-none flex items-center gap-2"
                            >
                                <Plus className="h-4 w-4" />
                                Add Nurse
                            </Link>
                        </div>
                    </header>

                    {/* Search and Filters */}
                    <div className="mb-6 space-y-4">
                        <div className="flex flex-col md:flex-row gap-4">
                            <SearchBar
                                value={searchQuery}
                                onChange={setSearchQuery}
                                placeholder="Search by name, email, or phone..."
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
                        data={nurses}
                        loading={loading}
                        sortColumn={sortColumn}
                        sortDirection={sortDirection}
                        onSort={(column, direction) => {
                            setSortColumn(column);
                            setSortDirection(direction);
                        }}
                        emptyMessage="No nurses found. Add your first nurse to get started."
                    />

                    {/* Pagination */}
                    {!loading && nurses.length > 0 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            totalItems={totalItems}
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
