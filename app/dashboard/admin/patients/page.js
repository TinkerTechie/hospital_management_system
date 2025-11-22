"use client";

import React, { useState, useEffect } from "react";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import SearchBar from "../../../components/shared/SearchBar";
import FilterBar from "../../../components/shared/FilterBar";
import DataTable from "../../../components/shared/DataTable";
import Pagination from "../../../components/shared/Pagination";
import StatusBadge from "../../../components/shared/StatusBadge";
import { Plus, Download, Upload, MoreVertical, Eye, Edit, Trash2 } from "lucide-react";
import Link from "next/link";

export default function PatientsListPage() {
    const [dark, setDark] = useState(false);
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [filters, setFilters] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [sortColumn, setSortColumn] = useState("name");
    const [sortDirection, setSortDirection] = useState("asc");

    useEffect(() => {
        if (typeof window !== "undefined") {
            const theme = localStorage.getItem("theme");
            setDark(theme === "dark");
        }
        fetchPatients();
    }, [currentPage, itemsPerPage, searchQuery, filters, sortColumn, sortDirection]);

    const toggleDark = () => {
        const newTheme = !dark;
        setDark(newTheme);
        if (typeof window !== "undefined") {
            localStorage.setItem("theme", newTheme ? "dark" : "light");
            if (newTheme) {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }
        }
    };

    const fetchPatients = async () => {
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

            const res = await fetch(`/api/admin/patients?${params}`);
            if (!res.ok) throw new Error("Failed to fetch patients");

            const data = await res.json();
            setPatients(data.patients || []);
        } catch (error) {
            console.error("Error fetching patients:", error);
            setPatients([]);
        } finally {
            setLoading(false);
        }
    };

    const filterOptions = [
        {
            key: "status",
            label: "Status",
            options: [
                { value: "active", label: "Active" },
                { value: "inactive", label: "Inactive" },
            ],
        },
        {
            key: "bloodGroup",
            label: "Blood Group",
            options: [
                { value: "A+", label: "A+" },
                { value: "A-", label: "A-" },
                { value: "B+", label: "B+" },
                { value: "B-", label: "B-" },
                { value: "O+", label: "O+" },
                { value: "O-", label: "O-" },
                { value: "AB+", label: "AB+" },
                { value: "AB-", label: "AB-" },
            ],
        },
    ];

    const columns = [
        {
            key: "id",
            label: "Patient ID",
            render: (row) => (
                <div className="font-medium text-gray-900 dark:text-white">
                    #{row.id}
                </div>
            ),
        },
        {
            key: "name",
            label: "Patient Name",
            render: (row) => (
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-700 dark:text-teal-300 font-bold text-sm">
                        {row.name?.charAt(0) || "P"}
                    </div>
                    <div>
                        <p className="font-medium text-gray-900 dark:text-white">{row.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{row.email}</p>
                    </div>
                </div>
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
            key: "bloodGroup",
            label: "Blood Group",
            render: (row) => (
                <span className="px-2 py-1 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-md text-xs font-medium">
                    {row.bloodGroup || "N/A"}
                </span>
            ),
        },
        {
            key: "status",
            label: "Status",
            render: (row) => <StatusBadge status={row.status || "active"} />,
        },
        {
            key: "actions",
            label: "Actions",
            sortable: false,
            render: (row) => (
                <div className="flex items-center gap-2">
                    <Link
                        href={`/dashboard/admin/patients/${row.id}`}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                        title="View Details"
                    >
                        <Eye className="h-4 w-4" />
                    </Link>
                    <Link
                        href={`/dashboard/admin/patients/${row.id}/edit`}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        title="Edit"
                    >
                        <Edit className="h-4 w-4" />
                    </Link>
                    <button
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                        title="Delete"
                    >
                        <Trash2 className="h-4 w-4" />
                    </button>
                </div>
            ),
        },
    ];

    const totalPages = Math.ceil((patients.length || 0) / itemsPerPage);

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
                                Patient Management
                            </h1>
                            <p className="text-gray-500 dark:text-gray-400">
                                Manage patient records, registrations, and medical history
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <button className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center gap-2">
                                <Download className="h-4 w-4" />
                                Export
                            </button>
                            <Link
                                href="/dashboard/admin/patients/new"
                                className="px-4 py-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors shadow-lg shadow-teal-200 dark:shadow-none flex items-center gap-2"
                            >
                                <Plus className="h-4 w-4" />
                                Add Patient
                            </Link>
                        </div>
                    </header>

                    {/* Search and Filters */}
                    <div className="mb-6 space-y-4">
                        <div className="flex flex-col md:flex-row gap-4">
                            <SearchBar
                                value={searchQuery}
                                onChange={setSearchQuery}
                                placeholder="Search by name, email, phone, or ID..."
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
                        data={patients}
                        loading={loading}
                        sortColumn={sortColumn}
                        sortDirection={sortDirection}
                        onSort={(column, direction) => {
                            setSortColumn(column);
                            setSortDirection(direction);
                        }}
                        emptyMessage="No patients found. Add your first patient to get started."
                    />

                    {/* Pagination */}
                    {!loading && patients.length > 0 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            totalItems={patients.length}
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
