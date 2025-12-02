"use client";

import React, { useState, useEffect } from "react";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import SearchBar from "../../../components/shared/SearchBar";
import FilterBar from "../../../components/shared/FilterBar";
import DataTable from "../../../components/shared/DataTable";
import Pagination from "../../../components/shared/Pagination";
import StatusBadge from "../../../components/shared/StatusBadge";
import { Plus, Calendar as CalendarIcon, Eye, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import Swal from "sweetalert2";

export default function AppointmentsListPage() {
    const [dark, setDark] = useState(false);
    const [appointments, setAppointments] = useState([]);
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
        fetchAppointments();
    }, [currentPage, itemsPerPage, searchQuery, filters, sortColumn, sortDirection]);

    const toggleDark = () => {
        const newTheme = !dark;
        setDark(newTheme);
        if (typeof window !== "undefined") {
            localStorage.setItem("theme", newTheme ? "dark" : "light");
            document.documentElement.classList.toggle("dark", newTheme);
        }
    };

    const fetchAppointments = async () => {
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

            const res = await fetch(`/api/admin/appointments?${params}`);
            if (!res.ok) throw new Error("Failed to fetch appointments");

            const data = await res.json();
            setAppointments(data.appointments || []);
        } catch (error) {
            console.error("Error fetching appointments:", error);
            setAppointments([]);
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
                const res = await fetch(`/api/admin/appointments?id=${id}`, {
                    method: "DELETE",
                });

                if (res.ok) {
                    Swal.fire("Deleted!", "Appointment has been deleted.", "success");
                    fetchAppointments();
                } else {
                    Swal.fire("Error!", "Failed to delete appointment.", "error");
                }
            } catch (error) {
                console.error("Error deleting appointment:", error);
                Swal.fire("Error!", "Something went wrong.", "error");
            }
        }
    };

    const filterOptions = [
        {
            key: "status",
            label: "Status",
            options: [
                { value: "scheduled", label: "Scheduled" },
                { value: "completed", label: "Completed" },
                { value: "cancelled", label: "Cancelled" },
            ],
        },
        {
            key: "type",
            label: "Type",
            options: [
                { value: "consultation", label: "Consultation" },
                { value: "follow-up", label: "Follow-up" },
                { value: "emergency", label: "Emergency" },
            ],
        },
    ];

    const columns = [
        {
            key: "id",
            label: "Appointment ID",
            render: (row) => (
                <div className="font-medium text-gray-900 dark:text-white">
                    #{row.id}
                </div>
            ),
        },
        {
            key: "patient",
            label: "Patient",
            render: (row) => (
                <div>
                    <p className="font-medium text-gray-900 dark:text-white">{row.patient?.name || "N/A"}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{row.patient?.phone}</p>
                </div>
            ),
        },
        {
            key: "doctor",
            label: "Doctor",
            render: (row) => (
                <div>
                    <p className="font-medium text-gray-900 dark:text-white">Dr. {row.doctor?.name || "N/A"}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{row.doctor?.specialization}</p>
                </div>
            ),
        },
        {
            key: "date",
            label: "Date & Time",
            render: (row) => (
                <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                        {row.date ? new Date(row.date).toLocaleDateString() : "N/A"}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{row.time || "N/A"}</p>
                </div>
            ),
        },
        {
            key: "type",
            label: "Type",
            render: (row) => (
                <span className="px-2 py-1 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 rounded-md text-xs font-medium capitalize">
                    {row.type || "Consultation"}
                </span>
            ),
        },
        {
            key: "status",
            label: "Status",
            render: (row) => <StatusBadge status={row.status || "scheduled"} />,
        },
        {
            key: "actions",
            label: "Actions",
            sortable: false,
            render: (row) => (
                <div className="flex items-center gap-2">
                    <Link
                        href={`/dashboard/admin/appointments/${row.id}`}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                        title="View Details"
                    >
                        <Eye className="h-4 w-4" />
                    </Link>
                    <Link
                        href={`/dashboard/admin/appointments/${row.id}/reschedule`}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        title="Reschedule"
                    >
                        <Edit className="h-4 w-4" />
                    </Link>
                    <button
                        onClick={() => handleDelete(row.id)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                        title="Cancel"
                    >
                        <Trash2 className="h-4 w-4" />
                    </button>
                </div>
            ),
        },
    ];

    const totalPages = Math.ceil((appointments.length || 0) / itemsPerPage);

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
                                Appointments
                            </h1>
                            <p className="text-gray-500 dark:text-gray-400">
                                Manage patient appointments and schedules
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <Link
                                href="/dashboard/admin/appointments/new"
                                className="px-4 py-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors shadow-lg shadow-teal-200 dark:shadow-none flex items-center gap-2"
                            >
                                <Plus className="h-4 w-4" />
                                Book Appointment
                            </Link>
                        </div>
                    </header>

                    {/* Search and Filters */}
                    <div className="mb-6 space-y-4">
                        <div className="flex flex-col md:flex-row gap-4">
                            <SearchBar
                                value={searchQuery}
                                onChange={setSearchQuery}
                                placeholder="Search by patient, doctor, or appointment ID..."
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
                        data={appointments}
                        loading={loading}
                        sortColumn={sortColumn}
                        sortDirection={sortDirection}
                        onSort={(column, direction) => {
                            setSortColumn(column);
                            setSortDirection(direction);
                        }}
                        emptyMessage="No appointments found. Book your first appointment to get started."
                    />

                    {/* Pagination */}
                    {!loading && appointments.length > 0 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            totalItems={appointments.length}
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
