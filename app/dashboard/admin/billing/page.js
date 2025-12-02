"use client";

import React, { useState, useEffect } from "react";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import SearchBar from "../../../components/shared/SearchBar";
import FilterBar from "../../../components/shared/FilterBar";
import DataTable from "../../../components/shared/DataTable";
import Pagination from "../../../components/shared/Pagination";
import StatusBadge from "../../../components/shared/StatusBadge";
import { Plus, Download, Eye, DollarSign } from "lucide-react";
import Link from "next/link";

export default function BillingListPage() {
    const [dark, setDark] = useState(false);
    const [invoices, setInvoices] = useState([]);
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
        fetchInvoices();
    }, [currentPage, itemsPerPage, searchQuery, filters, sortColumn, sortDirection]);

    const toggleDark = () => {
        const newTheme = !dark;
        setDark(newTheme);
        if (typeof window !== "undefined") {
            localStorage.setItem("theme", newTheme ? "dark" : "light");
            document.documentElement.classList.toggle("dark", newTheme);
        }
    };

    const fetchInvoices = async () => {
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

            const res = await fetch(`/api/admin/billing?${params}`);
            if (!res.ok) throw new Error("Failed to fetch invoices");

            const data = await res.json();
            setInvoices(data.invoices || []);
        } catch (error) {
            console.error("Error fetching invoices:", error);
            setInvoices([]);
        } finally {
            setLoading(false);
        }
    };

    const filterOptions = [
        {
            key: "status",
            label: "Payment Status",
            options: [
                { value: "paid", label: "Paid" },
                { value: "pending", label: "Pending" },
                { value: "overdue", label: "Overdue" },
                { value: "partial", label: "Partial" },
            ],
        },
        {
            key: "paymentMethod",
            label: "Payment Method",
            options: [
                { value: "cash", label: "Cash" },
                { value: "card", label: "Card" },
                { value: "insurance", label: "Insurance" },
                { value: "online", label: "Online" },
            ],
        },
    ];

    const columns = [
        {
            key: "invoiceNumber",
            label: "Invoice #",
            render: (row) => (
                <div className="font-medium text-gray-900 dark:text-white">
                    {row.invoiceNumber || `#${row.id}`}
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
            key: "date",
            label: "Date",
            render: (row) => (
                <span className="text-sm text-gray-600 dark:text-gray-300">
                    {row.date ? new Date(row.date).toLocaleDateString() : "N/A"}
                </span>
            ),
        },
        {
            key: "amount",
            label: "Amount",
            render: (row) => (
                <span className="font-medium text-gray-900 dark:text-white">
                    ₹{row.totalAmount.toFixed(2)}
                </span>
            ),
        },
        {
            key: "paidAmount",
            label: "Paid",
            render: (row) => (
                <span className="text-sm text-green-600 dark:text-green-400">
                    ₹{row.paidAmount?.toFixed(2) || "0.00"}
                </span>
            ),
        },
        {
            key: "status",
            label: "Status",
            render: (row) => <StatusBadge status={row.status || "pending"} />,
        },
        {
            key: "actions",
            label: "Actions",
            sortable: false,
            render: (row) => (
                <div className="flex items-center gap-2">
                    <Link
                        href={`/dashboard/admin/billing/${row.id}`}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                        title="View Invoice"
                    >
                        <Eye className="h-4 w-4" />
                    </Link>
                    <Link
                        href={`/dashboard/admin/billing/${row.id}/payment`}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                        title="Record Payment"
                    >
                        <DollarSign className="h-4 w-4" />
                    </Link>
                    <button
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        title="Download PDF"
                    >
                        <Download className="h-4 w-4" />
                    </button>
                </div>
            ),
        },
    ];

    const totalPages = Math.ceil((invoices.length || 0) / itemsPerPage);

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
                                Billing & Payments
                            </h1>
                            <p className="text-gray-500 dark:text-gray-400">
                                Manage invoices, payments, and insurance claims
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <button className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center gap-2">
                                <Download className="h-4 w-4" />
                                Export
                            </button>
                            <Link
                                href="/dashboard/admin/billing/new"
                                className="px-4 py-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors shadow-lg shadow-teal-200 dark:shadow-none flex items-center gap-2"
                            >
                                <Plus className="h-4 w-4" />
                                New Invoice
                            </Link>
                        </div>
                    </header>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Revenue</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">₹45,230</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Pending</p>
                            <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">₹8,450</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Overdue</p>
                            <p className="text-2xl font-bold text-red-600 dark:text-red-400">₹2,100</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">This Month</p>
                            <p className="text-2xl font-bold text-green-600 dark:text-green-400">₹12,340</p>
                        </div>
                    </div>

                    {/* Search and Filters */}
                    <div className="mb-6 space-y-4">
                        <div className="flex flex-col md:flex-row gap-4">
                            <SearchBar
                                value={searchQuery}
                                onChange={setSearchQuery}
                                placeholder="Search by patient name, invoice number..."
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
                        data={invoices}
                        loading={loading}
                        sortColumn={sortColumn}
                        sortDirection={sortDirection}
                        onSort={(column, direction) => {
                            setSortColumn(column);
                            setSortDirection(direction);
                        }}
                        emptyMessage="No invoices found. Generate your first invoice to get started."
                    />

                    {/* Pagination */}
                    {!loading && invoices.length > 0 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            totalItems={invoices.length}
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
