"use client";

import React, { useState, useEffect } from "react";
import AdminSidebar from "../../../../components/admin/AdminSidebar";
import { ArrowLeft, Save, Plus, Trash2, Calculator, User, Calendar, CreditCard } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NewInvoicePage() {
    const router = useRouter();
    const [dark, setDark] = useState(false);
    const [loading, setLoading] = useState(false);
    const [patients, setPatients] = useState([]);

    const [formData, setFormData] = useState({
        patientId: "",
        date: new Date().toISOString().split('T')[0],
        items: [{ description: "", quantity: 1, unitPrice: 0, total: 0 }],
        discount: 0,
        paidAmount: 0,
        paymentMethod: "Cash",
        status: "pending"
    });

    useEffect(() => {
        if (typeof window !== "undefined") {
            const theme = localStorage.getItem("theme");
            setDark(theme === "dark");
        }
        fetchPatients();
    }, []);

    const toggleDark = () => {
        const newTheme = !dark;
        setDark(newTheme);
        if (typeof window !== "undefined") {
            localStorage.setItem("theme", newTheme ? "dark" : "light");
            document.documentElement.classList.toggle("dark", newTheme);
        }
    };

    const fetchPatients = async () => {
        try {
            const res = await fetch("/api/admin/patients?limit=100"); // Fetch enough patients
            if (res.ok) {
                const data = await res.json();
                setPatients(data.patients || []);
            }
        } catch (error) {
            console.error("Error fetching patients:", error);
        }
    };

    const handleItemChange = (index, field, value) => {
        const newItems = [...formData.items];
        newItems[index][field] = value;

        // Calculate item total
        if (field === "quantity" || field === "unitPrice") {
            const qty = parseFloat(newItems[index].quantity) || 0;
            const price = parseFloat(newItems[index].unitPrice) || 0;
            newItems[index].total = qty * price;
        }

        setFormData({ ...formData, items: newItems });
    };

    const addItem = () => {
        setFormData({
            ...formData,
            items: [...formData.items, { description: "", quantity: 1, unitPrice: 0, total: 0 }]
        });
    };

    const removeItem = (index) => {
        const newItems = formData.items.filter((_, i) => i !== index);
        setFormData({ ...formData, items: newItems });
    };

    const calculateTotals = () => {
        const subtotal = formData.items.reduce((sum, item) => sum + (item.total || 0), 0);
        const discount = parseFloat(formData.discount) || 0;
        const totalAmount = subtotal - discount;
        const paidAmount = parseFloat(formData.paidAmount) || 0;
        const balance = totalAmount - paidAmount;

        return { subtotal, totalAmount, balance };
    };

    const { subtotal, totalAmount, balance } = calculateTotals();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const payload = {
                ...formData,
                totalAmount,
                status: balance <= 0 ? "paid" : "pending"
            };

            const res = await fetch("/api/admin/billing", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || "Failed to create invoice");
            }

            window.showToast?.({ type: "success", message: "Invoice created successfully!" });
            router.push("/dashboard/admin/billing");
        } catch (error) {
            console.error("Error creating invoice:", error);
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={dark ? "dark" : ""}>
            <div className="min-h-screen flex font-sans text-gray-900 transition-colors duration-300">
                <div className="hidden md:block">
                    <AdminSidebar dark={dark} toggleDark={toggleDark} />
                </div>

                <main className="flex-1 p-6 md:p-10 max-w-5xl mx-auto overflow-y-auto">
                    <div className="mb-6">
                        <Link
                            href="/dashboard/admin/billing"
                            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to Billing
                        </Link>
                    </div>

                    <header className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            Create New Invoice
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400">
                            Generate a new invoice for patient services
                        </p>
                    </header>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Patient & Date Details */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 border-b pb-2 border-gray-100 dark:border-gray-700 mb-6">
                                <User className="h-5 w-5 text-teal-600" />
                                Patient Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Select Patient *</label>
                                    <select
                                        value={formData.patientId}
                                        onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
                                        required
                                        className="w-full px-4 py-2.5 rounded-xl dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all dark:text-white"
                                    >
                                        <option value="">Select a patient</option>
                                        {patients.map(p => (
                                            <option key={p.id} value={p.id}>{p.fullName} ({p.user?.email})</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Invoice Date *</label>
                                    <input
                                        type="date"
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                        required
                                        className="w-full px-4 py-2.5 rounded-xl dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all dark:text-white"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Invoice Items */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
                            <div className="flex justify-between items-center border-b pb-2 border-gray-100 dark:border-gray-700 mb-6">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                    <Calculator className="h-5 w-5 text-teal-600" />
                                    Invoice Items
                                </h3>
                                <button
                                    type="button"
                                    onClick={addItem}
                                    className="text-sm text-teal-600 hover:text-teal-700 font-medium flex items-center gap-1"
                                >
                                    <Plus className="h-4 w-4" />
                                    Add Item
                                </button>
                            </div>

                            <div className="space-y-4">
                                {formData.items.map((item, index) => (
                                    <div key={index} className="flex flex-col md:flex-row gap-4 items-start md:items-end bg-gray-50 dark:bg-gray-700/30 p-4 rounded-xl">
                                        <div className="flex-1 w-full">
                                            <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 block">Description</label>
                                            <input
                                                type="text"
                                                value={item.description}
                                                onChange={(e) => handleItemChange(index, "description", e.target.value)}
                                                placeholder="Service or Medicine"
                                                required
                                                className="w-full px-3 py-2 rounded-lg dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none dark:text-white"
                                            />
                                        </div>
                                        <div className="w-full md:w-24">
                                            <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 block">Qty</label>
                                            <input
                                                type="number"
                                                min="1"
                                                value={item.quantity}
                                                onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                                                required
                                                className="w-full px-3 py-2 rounded-lg dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none dark:text-white"
                                            />
                                        </div>
                                        <div className="w-full md:w-32">
                                            <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 block">Price</label>
                                            <input
                                                type="number"
                                                min="0"
                                                step="0.01"
                                                value={item.unitPrice}
                                                onChange={(e) => handleItemChange(index, "unitPrice", e.target.value)}
                                                required
                                                className="w-full px-3 py-2 rounded-lg dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none dark:text-white"
                                            />
                                        </div>
                                        <div className="w-full md:w-32">
                                            <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 block">Total</label>
                                            <div className="px-3 py-2 bg-gray-100 dark:bg-gray-600 rounded-lg text-gray-700 dark:text-gray-200 font-medium text-right">
                                                ₹{item.total.toFixed(2)}
                                            </div>
                                        </div>
                                        {formData.items.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeItem(index)}
                                                className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                            >
                                                <Trash2 className="h-5 w-5" />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Payment & Summary */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 border-b pb-2 border-gray-100 dark:border-gray-700 mb-6">
                                    <CreditCard className="h-5 w-5 text-teal-600" />
                                    Payment Details
                                </h3>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Payment Method</label>
                                        <select
                                            value={formData.paymentMethod}
                                            onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                                            className="w-full px-4 py-2.5 rounded-xl dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all dark:text-white"
                                        >
                                            <option value="Cash">Cash</option>
                                            <option value="Credit Card">Credit Card</option>
                                            <option value="Debit Card">Debit Card</option>
                                            <option value="Insurance">Insurance</option>
                                            <option value="Bank Transfer">Bank Transfer</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Amount Paid Now (₹)</label>
                                        <input
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            value={formData.paidAmount}
                                            onChange={(e) => setFormData({ ...formData, paidAmount: parseFloat(e.target.value) || 0 })}
                                            className="w-full px-4 py-2.5 rounded-xl dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all dark:text-white"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white border-b pb-2 border-gray-100 dark:border-gray-700 mb-6">
                                    Summary
                                </h3>
                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                        <span>Subtotal</span>
                                        <span>₹{subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600 dark:text-gray-400">Discount (₹)</span>
                                        <input
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            value={formData.discount}
                                            onChange={(e) => setFormData({ ...formData, discount: parseFloat(e.target.value) || 0 })}
                                            className="w-24 px-2 py-1 text-right rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                        />
                                    </div>
                                    <div className="border-t border-gray-100 dark:border-gray-700 pt-3 flex justify-between font-bold text-lg text-gray-900 dark:text-white">
                                        <span>Total Amount</span>
                                        <span>₹{totalAmount.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-teal-600 font-medium">
                                        <span>Paid</span>
                                        <span>₹{parseFloat(formData.paidAmount).toFixed(2)}</span>
                                    </div>
                                    <div className={`flex justify-between font-bold ${balance > 0 ? "text-red-500" : "text-green-500"}`}>
                                        <span>Balance Due</span>
                                        <span>₹{balance.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end pt-6">
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-8 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors shadow-lg shadow-teal-200 dark:shadow-none flex items-center gap-2 disabled:opacity-50 font-medium text-lg"
                            >
                                <Save className="h-5 w-5" />
                                {loading ? "Creating Invoice..." : "Create Invoice"}
                            </button>
                        </div>
                    </form>
                </main>
            </div>
        </div>
    );
}
