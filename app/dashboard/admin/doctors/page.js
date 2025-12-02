"use client";

import React, { useState, useEffect } from "react";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import SearchBar from "../../../components/shared/SearchBar";
import FilterBar from "../../../components/shared/FilterBar";
import DataTable from "../../../components/shared/DataTable";
import Pagination from "../../../components/shared/Pagination";
import StatusBadge from "../../../components/shared/StatusBadge";
import { Plus, Eye, Edit, Trash2, Grid, List } from "lucide-react";
import Link from "next/link";
import Swal from "sweetalert2";

export default function DoctorsListPage() {
    const [dark, setDark] = useState(false);
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [filters, setFilters] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [sortColumn, setSortColumn] = useState("name");
    const [sortDirection, setSortDirection] = useState("asc");
    const [viewMode, setViewMode] = useState("table"); // table or grid

    useEffect(() => {
        if (typeof window !== "undefined") {
            const theme = localStorage.getItem("theme");
            setDark(theme === "dark");
        }
        fetchDoctors();
    }, [currentPage, itemsPerPage, searchQuery, filters, sortColumn, sortDirection]);

    const toggleDark = () => {
        const newTheme = !dark;
        setDark(newTheme);
        if (typeof window !== "undefined") {
            localStorage.setItem("theme", newTheme ? "dark" : "light");
            document.documentElement.classList.toggle("dark", newTheme);
        }
    };

    const fetchDoctors = async () => {
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

            const res = await fetch(`/api/admin/doctors?${params}`);
            if (!res.ok) throw new Error("Failed to fetch doctors");

            const data = await res.json();
            setDoctors(data.doctors || []);
        } catch (error) {
            console.error("Error fetching doctors:", error);
            setDoctors([]);
        } finally {
            setLoading(false);
        }
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
                const res = await fetch(`/api/admin/doctors?id=${id}`, {
                    method: "DELETE",
                });

                if (res.ok) {
                    Swal.fire("Deleted!", "Doctor has been deleted.", "success");
                    fetchDoctors();
                } else {
                    Swal.fire("Error!", "Failed to delete doctor.", "error");
                }
            } catch (error) {
                console.error("Error deleting doctor:", error);
                Swal.fire("Error!", "Something went wrong.", "error");
            }
        }
    };

    const filterOptions = [
        {
            key: "specialization",
            label: "Specialization",
            options: [
                { value: "cardiology", label: "Cardiology" },
                { value: "neurology", label: "Neurology" },
                { value: "orthopedics", label: "Orthopedics" },
                { value: "pediatrics", label: "Pediatrics" },
                { value: "general", label: "General Medicine" },
            ],
        },
        {
            key: "status",
            label: "Status",
            options: [
                { value: "active", label: "Active" },
                { value: "inactive", label: "Inactive" },
            ],
        },
    ];

    const columns = [
        {
            key: "id",
            label: "Doctor ID",
            render: (row) => (
                <div className="font-medium text-gray-900 dark:text-white">
                    #{row.id}
                </div>
            ),
        },
        {
            key: "name",
            label: "Doctor Name",
            render: (row) => (
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-700 dark:text-teal-300 font-bold text-sm">
                        {row.name?.charAt(0) || "D"}
                    </div>
                    <div>
                        <p className="font-medium text-gray-900 dark:text-white">Dr. {row.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{row.email}</p>
                    </div>
                </div>
            ),
        },
        {
            key: "specialization",
            label: "Specialization",
            render: (row) => (
                <span className="text-sm text-gray-600 dark:text-gray-300 capitalize">{row.specialization || "N/A"}</span>
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
            key: "experience",
            label: "Experience",
            render: (row) => (
                <span className="text-sm text-gray-600 dark:text-gray-300">{row.experience || "0"} years</span>
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
                        href={`/dashboard/admin/doctors/${row.id}`}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                        title="View Profile"
                    >
                        <Eye className="h-4 w-4" />
                    </Link>
                    <Link
                        href={`/dashboard/admin/doctors/${row.id}/edit`}
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

    const totalPages = Math.ceil((doctors.length || 0) / itemsPerPage);

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
                                Doctors Management
                            </h1>
                            <p className="text-gray-500 dark:text-gray-400">
                                Manage doctor profiles, schedules, and availability
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
                            <Link
                                href="/dashboard/admin/doctors/new"
                                className="px-4 py-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors shadow-lg shadow-teal-200 dark:shadow-none flex items-center gap-2"
                            >
                                <Plus className="h-4 w-4" />
                                Add Doctor
                            </Link>
                        </div>
                    </header>

                    {/* Search and Filters */}
                    <div className="mb-6 space-y-4">
                        <div className="flex flex-col md:flex-row gap-4">
                            <SearchBar
                                value={searchQuery}
                                onChange={setSearchQuery}
                                placeholder="Search by name, specialization, or ID..."
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
                        data={doctors}
                        loading={loading}
                        sortColumn={sortColumn}
                        sortDirection={sortDirection}
                        onSort={(column, direction) => {
                            setSortColumn(column);
                            setSortDirection(direction);
                        }}
                        emptyMessage="No doctors found. Add your first doctor to get started."
                    />

                    {/* Pagination */}
                    {!loading && doctors.length > 0 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            totalItems={doctors.length}
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
