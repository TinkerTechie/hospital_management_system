"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, FileText, CheckCircle, Clock, Activity, Download, AlertCircle } from 'lucide-react';
import Navbar from '../../components/shared/Navbar';
import Footer from '../../components/shared/Footer';

export default function TrackReportPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [status, setStatus] = useState(null); // null, 'loading', 'found', 'error'
    const [mockData, setMockData] = useState(null);

    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        setStatus('loading');

        // Simulate API search
        setTimeout(() => {
            if (searchQuery.length > 3) {
                setStatus('found');
                setMockData({
                    id: searchQuery.toUpperCase(),
                    patient: "Guest User",
                    test: "Complete Blood Count (CBC)",
                    date: "Nov 22, 2023",
                    currentStep: 3, // 1: Booked, 2: Collected, 3: Processing, 4: Ready
                    timeline: [
                        { step: 1, label: "Booking Confirmed", date: "Nov 22, 10:00 AM", completed: true },
                        { step: 2, label: "Sample Collected", date: "Nov 22, 11:30 AM", completed: true },
                        { step: 3, label: "Processing in Lab", date: "In Progress", completed: true },
                        { step: 4, label: "Report Ready", date: "Estimated: Nov 22, 06:00 PM", completed: false }
                    ]
                });
            } else {
                setStatus('error');
            }
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <Navbar />

            <div className="pt-24 pb-12 px-6 max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Track Your Report</h1>
                    <p className="text-gray-600">Enter your Booking ID or Registered Mobile Number to check your test status.</p>
                </div>

                {/* Search Box */}
                <div className="bg-white p-6 rounded-2xl shadow-lg mb-12">
                    <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <input
                                type="text"
                                placeholder="Enter Booking ID (e.g., DIA-1234) or Mobile Number"
                                className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all text-lg"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-teal-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-teal-700 transition-all shadow-lg shadow-teal-500/30 flex items-center justify-center gap-2"
                            disabled={status === 'loading'}
                        >
                            {status === 'loading' ? (
                                <span className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></span>
                            ) : (
                                "Track Status"
                            )}
                        </button>
                    </form>
                </div>

                {/* Results */}
                {status === 'found' && mockData && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-2xl shadow-lg overflow-hidden"
                    >
                        <div className="p-6 border-b border-gray-100 bg-teal-50 flex justify-between items-center flex-wrap gap-4">
                            <div>
                                <p className="text-sm text-gray-500 uppercase tracking-wider font-bold">Booking ID</p>
                                <p className="text-xl font-bold text-gray-900">{mockData.id}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-gray-500 uppercase tracking-wider font-bold">Test Name</p>
                                <p className="text-lg font-medium text-teal-700">{mockData.test}</p>
                            </div>
                        </div>

                        <div className="p-8">
                            <div className="relative">
                                {/* Vertical Line */}
                                <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-gray-200"></div>

                                <div className="space-y-8 relative">
                                    {mockData.timeline.map((item, i) => (
                                        <div key={i} className="flex gap-6 items-start">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 flex-shrink-0 ${item.completed ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-400'}`}>
                                                {item.completed ? <CheckCircle className="h-5 w-5" /> : <Clock className="h-5 w-5" />}
                                            </div>
                                            <div className="flex-1 pt-1">
                                                <h4 className={`text-lg font-bold ${item.completed ? 'text-gray-900' : 'text-gray-400'}`}>{item.label}</h4>
                                                <p className="text-sm text-gray-500">{item.date}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {mockData.currentStep === 4 && (
                                <div className="mt-8 pt-8 border-t border-gray-100 flex justify-center">
                                    <button className="bg-teal-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-teal-700 transition-all flex items-center gap-2 shadow-lg">
                                        <Download className="h-5 w-5" /> Download Report
                                    </button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}

                {status === 'error' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-red-50 p-6 rounded-2xl border border-red-100 text-center"
                    >
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600">
                            <AlertCircle className="h-6 w-6" />
                        </div>
                        <h3 className="text-lg font-bold text-red-800 mb-2">No Records Found</h3>
                        <p className="text-red-600">We couldn't find any booking with that ID or number. Please check and try again.</p>
                    </motion.div>
                )}
            </div>

            <Footer />
        </div>
    );
}
