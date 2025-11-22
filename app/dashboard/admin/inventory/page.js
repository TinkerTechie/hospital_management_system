"use client";

import React, { useState, useEffect } from "react";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import SearchBar from "../../../components/shared/SearchBar";
import FilterBar from "../../../components/shared/FilterBar";
import DataTable from "../../../components/shared/DataTable";
import Pagination from "../../../components/shared/Pagination";
import StatusBadge from "../../../components/shared/StatusBadge";
import { Plus, AlertCircle, Eye, Edit, Package } from "lucide-react";
import Link from "next/link";

export default function InventoryPage() {
    const [dark, setDark] = useState(false);
    const [items, setItems] = useState([]);
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
        fetchItems();
    }, [currentPage, itemsPerPage, searchQuery, filters, sortColumn, sortDirection]);

    const toggleDark = () => {
        const newTheme = !dark;
        setDark(newTheme);
        if (typeof window !== "undefined") {
            localStorage.setItem("theme", newTheme ? "dark" : "light");
            document.documentElement.classList.toggle("dark", newTheme);
        }
    };

    const fetchItems = async () => {
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

            const res = await fetch(`/api/admin/inventory?${params}`);
            if (!res.ok) throw new Error("Failed to fetch inventory");

            const data = await res.json();
            setItems(data.items || []);
        } catch (error) {
            console.error("Error fetching inventory:", error);
            setItems([]);
        } finally {
            setLoading(false);
        }
    };

    const filterOptions = [
        {
            key: "category",
            label: "Category",
            options: [
                { value: "medicines", label: "Medicines" },
                { value: "equipment", label: "Equipment" },
                { value: "supplies", label: "Supplies" },
            ],
        },
        {
            key: "stockStatus",
            label: "Stock Status",
            options: [
                { value: "in-stock", label: "In Stock" },
                { value: "low-stock", label: "Low Stock" },
                { value: "out-of-stock", label: "Out of Stock" },
            ],
        },
    ];

    const getStockStatus = (quantity, reorderLevel) => {
        if (quantity === 0) return "out-of-stock";
        if (quantity <= reorderLevel) return "low-stock";
        return "in-stock";
    };

    const columns = [
        {
            key: "id",
            label: "Item ID",
            render: (row) => (
                <div className="font-medium text-gray-900 dark:text-white">
                    #{row.id}
                </div>
            ),
        },
        {
            key: "name",
            label: "Item Name",
            render: (row) => (
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                        <Package className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                        <p className="font-medium text-gray-900 dark:text-white">{row.name || "Unnamed Item"}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{row.description}</p>
                    </div>
                </div>
            ),
        },
        {
            key: "category",
            label: "Category",
            render: (row) => (
                <span className="px-2 py-1 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 rounded-md text-xs font-medium capitalize">
                    {row.category || "N/A"}
                </span>
            ),
        },
        {
            key: "quantity",
            label: "Quantity",
            render: (row) => (
                <div>
                    <p className="font-medium text-gray-900 dark:text-white">{row.quantity || 0} {row.unit}</p>
                    {row.reorderLevel && row.quantity <= row.reorderLevel && (
                        <p className="text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            Low stock
                        </p>
                    )}
                </div>
            ),
        },
        {
            key: "reorderLevel",
            label: "Reorder Level",
            render: (row) => (
                <span className="text-sm text-gray-600 dark:text-gray-300">{row.reorderLevel || 0}</span>
            ),
        },
        {
            key: "expiryDate",
            label: "Expiry Date",
            render: (row) => (
                <span className="text-sm text-gray-600 dark:text-gray-300">
                    {row.expiryDate ? new Date(row.expiryDate).toLocaleDateString() : "N/A"}
                </span>
            ),
        },
        {
            key: "status",
            label: "Status",
            render: (row) => (
                <StatusBadge status={getStockStatus(row.quantity, row.reorderLevel)} />
            ),
        },
        {
            key: "actions",
            label: "Actions",
            sortable: false,
            render: (row) => (
                <div className="flex items-center gap-2">
                    <Link
                        href={`/dashboard/admin/inventory/${row.id}`}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                        title="View Details"
                    >
                        <Eye className="h-4 w-4" />
                    </Link>
                    <Link
                        href={`/dashboard/admin/inventory/${row.id}/edit`}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        title="Edit"
                    >
                        <Edit className="h-4 w-4" />
                    </Link>
                </div>
            ),
        },
    ];

    const totalPages = Math.ceil((items.length || 0) / itemsPerPage);

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
                                Inventory Management
                            </h1>
                            <p className="text-gray-500 dark:text-gray-400">
                                Manage medicines, equipment, and medical supplies
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <Link
                                href="/dashboard/admin/inventory/alerts"
                                className="px-4 py-2 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-xl hover:bg-red-200 dark:hover:bg-red-900/30 transition-colors flex items-center gap-2"
                            >
                                <AlertCircle className="h-4 w-4" />
                                Low Stock Alerts
                            </Link>
                            <Link
                                href="/dashboard/admin/inventory/new"
                                className="px-4 py-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors shadow-lg shadow-teal-200 dark:shadow-none flex items-center gap-2"
                            >
                                <Plus className="h-4 w-4" />
                                Add Item
                            </Link>
                        </div>
                    </header>

                    {/* Search and Filters */}
                    <div className="mb-6 space-y-4">
                        <div className="flex flex-col md:flex-row gap-4">
                            <SearchBar
                                value={searchQuery}
                                onChange={setSearchQuery}
                                placeholder="Search by item name, category, or supplier..."
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
                        data={items}
                        loading={loading}
                        sortColumn={sortColumn}
                        sortDirection={sortDirection}
                        onSort={(column, direction) => {
                            setSortColumn(column);
                            setSortDirection(direction);
                        }}
                        emptyMessage="No inventory items found. Add your first item to get started."
                    />

                    {/* Pagination */}
                    {!loading && items.length > 0 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            totalItems={items.length}
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
