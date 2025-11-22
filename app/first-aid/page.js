"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search,
    HeartPulse,
    Droplet,
    Flame,
    Wind,
    Activity,
    Bug,
    Skull,
    Zap,
    AlertTriangle,
    Phone,
    CheckCircle,
    XCircle,
    ChevronRight,
    ArrowLeft
} from 'lucide-react';
import Navbar from '../components/shared/Navbar';
import Footer from '../components/shared/Footer';

// Icon mapping
const iconMap = {
    HeartPulse, Droplet, Flame, Wind, Activity, Bug, Skull, Zap, AlertTriangle
};

// Color mapping for Tailwind safelist
const colorMap = {
    rose: "bg-rose-100 text-rose-600 group-hover:bg-rose-600",
    red: "bg-red-100 text-red-600 group-hover:bg-red-600",
    orange: "bg-orange-100 text-orange-600 group-hover:bg-orange-600",
    blue: "bg-blue-100 text-blue-600 group-hover:bg-blue-600",
    slate: "bg-slate-100 text-slate-600 group-hover:bg-slate-600",
    green: "bg-green-100 text-green-600 group-hover:bg-green-600",
    purple: "bg-purple-100 text-purple-600 group-hover:bg-purple-600",
    yellow: "bg-yellow-100 text-yellow-600 group-hover:bg-yellow-600",
};

export default function FirstAidPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [categories, setCategories] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [selectedCondition, setSelectedCondition] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Fetch categories on load
        fetch('/api/first-aid/categories')
            .then(res => res.json())
            .then(data => setCategories(data))
            .catch(err => console.error("Failed to fetch categories", err));
    }, []);

    const handleSearch = async (query) => {
        setSearchQuery(query);
        if (query.length > 1) {
            setLoading(true);
            try {
                const res = await fetch(`/api/first-aid/search?q=${query}`);
                const data = await res.json();
                setSearchResults(data);
            } catch (error) {
                console.error("Search failed", error);
            } finally {
                setLoading(false);
            }
        } else {
            setSearchResults([]);
        }
    };

    const selectCondition = async (id) => {
        // If selecting from category (which only has ID), fetch details
        // If selecting from search (which has full details), use it directly
        const existing = searchResults.find(item => item.id === id);
        if (existing) {
            setSelectedCondition(existing);
        } else {
            // Fetch details by ID (simulated by search for now since mock API is simple)
            setLoading(true);
            try {
                const res = await fetch(`/api/first-aid/search?q=${id}`);
                const data = await res.json();
                if (data.length > 0) setSelectedCondition(data[0]);
            } catch (error) {
                console.error("Fetch failed", error);
            } finally {
                setLoading(false);
            }
        }
    };

    const clearSelection = () => {
        setSelectedCondition(null);
        setSearchQuery('');
        setSearchResults([]);
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <Navbar />

            {/* Hero Section */}
            <div className="bg-teal-700 text-white pt-32 pb-16 px-6 rounded-b-[3rem] shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-teal-600 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">First Aid Guidance</h1>
                    <p className="text-teal-100 text-lg mb-8">Quick, reliable, life-saving steps for every emergency.</p>

                    {/* Search Bar */}
                    <div className="relative max-w-2xl mx-auto">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 h-6 w-6" />
                        <input
                            type="text"
                            placeholder="Describe the emergency (e.g., 'burn', 'choking')..."
                            className="w-full pl-14 pr-6 py-4 rounded-full text-gray-900 text-lg shadow-lg focus:ring-4 focus:ring-teal-500/30 outline-none transition-all"
                            value={searchQuery}
                            onChange={(e) => handleSearch(e.target.value)}
                        />

                        {/* Autocomplete Dropdown */}
                        <AnimatePresence>
                            {searchResults.length > 0 && !selectedCondition && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl overflow-hidden z-50 text-left"
                                >
                                    {searchResults.map((result) => (
                                        <div
                                            key={result.id}
                                            onClick={() => selectCondition(result.id)}
                                            className="p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-0 flex items-center gap-3 transition-colors"
                                        >
                                            <div className="bg-teal-50 p-2 rounded-lg text-teal-600">
                                                <Activity className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900">{result.title}</h4>
                                                <p className="text-xs text-gray-500 truncate">{result.description}</p>
                                            </div>
                                            <ChevronRight className="ml-auto h-4 w-4 text-gray-400" />
                                        </div>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-12">
                <AnimatePresence mode="wait">
                    {selectedCondition ? (
                        /* Detail View */
                        <motion.div
                            key="detail"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100"
                        >
                            <div className="bg-teal-50 p-6 border-b border-teal-100 flex items-center gap-4">
                                <button onClick={clearSelection} className="p-2 hover:bg-teal-100 rounded-full transition-colors">
                                    <ArrowLeft className="h-6 w-6 text-teal-700" />
                                </button>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">{selectedCondition.title}</h2>
                                    <p className="text-teal-700">{selectedCondition.description}</p>
                                </div>
                            </div>

                            <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
                                <div className="lg:col-span-2 space-y-8">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                            <span className="bg-teal-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
                                            Action Steps
                                        </h3>
                                        <div className="space-y-4 pl-4 border-l-2 border-teal-100 ml-4">
                                            {selectedCondition.steps.map((step, i) => (
                                                <div key={i} className="flex gap-4">
                                                    <span className="font-bold text-teal-600 text-lg">{i + 1}.</span>
                                                    <p className="text-gray-700 text-lg leading-relaxed">{step}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
                                            <h4 className="font-bold text-green-800 mb-4 flex items-center gap-2">
                                                <CheckCircle className="h-5 w-5" /> Do's
                                            </h4>
                                            <ul className="space-y-2">
                                                {selectedCondition.dos.map((item, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-green-700 text-sm">
                                                        <span className="mt-1.5 w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0"></span>
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
                                            <h4 className="font-bold text-red-800 mb-4 flex items-center gap-2">
                                                <XCircle className="h-5 w-5" /> Don'ts
                                            </h4>
                                            <ul className="space-y-2">
                                                {selectedCondition.donts.map((item, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-red-700 text-sm">
                                                        <span className="mt-1.5 w-1.5 h-1.5 bg-red-500 rounded-full flex-shrink-0"></span>
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="bg-gray-900 text-white p-6 rounded-2xl text-center">
                                        <AlertTriangle className="h-10 w-10 text-yellow-400 mx-auto mb-4" />
                                        <h4 className="font-bold text-lg mb-2">Is it critical?</h4>
                                        <p className="text-gray-400 text-sm mb-6">If the person is unconscious, not breathing, or bleeding heavily.</p>
                                        <a href="tel:1066" className="bg-red-600 text-white px-6 py-3 rounded-xl font-bold w-full block hover:bg-red-700 transition-colors animate-pulse">
                                            Call 1066 Now
                                        </a>
                                    </div>

                                    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
                                        <h4 className="font-bold text-gray-900 mb-2">Source</h4>
                                        <p className="text-sm text-gray-600 italic">{selectedCondition.source}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        /* Categories Grid */
                        <motion.div
                            key="grid"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <h2 className="text-2xl font-bold text-gray-900 mb-8">Common Emergencies</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">


                                {categories.map((cat, i) => {
                                    const Icon = iconMap[cat.icon] || Activity;
                                    const colorClasses = colorMap[cat.color] || colorMap.blue;

                                    return (
                                        <motion.div
                                            key={cat.id}
                                            whileHover={{ y: -5 }}
                                            onClick={() => selectCondition(cat.id)}
                                            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md cursor-pointer text-center group transition-all"
                                        >
                                            <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 ${colorClasses} group-hover:text-white transition-colors`}>
                                                <Icon className="h-8 w-8" />
                                            </div>
                                            <h3 className="font-bold text-gray-900 group-hover:text-teal-600 transition-colors">{cat.title}</h3>
                                        </motion.div>
                                    );
                                })}
                            </div>

                            {/* Disclaimer */}
                            <div className="mt-16 p-6 bg-yellow-50 border border-yellow-100 rounded-xl flex gap-4 items-start">
                                <AlertTriangle className="h-6 w-6 text-yellow-600 flex-shrink-0" />
                                <div>
                                    <h4 className="font-bold text-yellow-800">Medical Disclaimer</h4>
                                    <p className="text-sm text-yellow-700 mt-1">
                                        These instructions are for information purposes only and do not replace professional medical advice.
                                        In a life-threatening emergency, always call 1066 or visit the nearest ER immediately.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <Footer />
        </div>
    );
}
