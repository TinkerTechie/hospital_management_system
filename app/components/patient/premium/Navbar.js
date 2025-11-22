"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Activity, Search, Bell, LogOut, Menu, X, Settings, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const profilePic = "https://placehold.co/120x120.png?text=P";

export default function Navbar({ user, showNotifications, setShowNotifications, handleLogout, mobileMenuOpen, setMobileMenuOpen }) {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-background/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">

                    {/* Branding */}
                    <Link href="/dashboard/patient" className="flex items-center gap-3 group">
                        <div className="bg-gradient-to-br from-sky-500 to-blue-600 p-2.5 rounded-xl shadow-lg shadow-sky-500/20 group-hover:shadow-sky-500/40 transition-all duration-300 transform group-hover:scale-105">
                            <Activity className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-blue-700 dark:from-sky-400 dark:to-blue-500 tracking-tight">
                                MediCare
                            </h1>
                            <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider hidden sm:block">
                                Personal Health Assistant
                            </p>
                        </div>
                    </Link>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center gap-6">

                        {/* Search Bar */}
                        <div className="relative group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-sky-500 transition-colors" />
                            <input
                                type="text"
                                placeholder="Search doctors, records..."
                                className="pl-10 pr-4 py-2.5 bg-gray-100/50 dark:bg-gray-800/50 border border-transparent focus:border-sky-500/30 rounded-full text-sm focus:outline-none focus:ring-4 focus:ring-sky-500/10 w-64 transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                            />
                        </div>

                        <div className="h-8 w-px bg-gray-200 dark:bg-gray-700"></div>

                        {/* Notifications */}
                        <div className="relative">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setShowNotifications(!showNotifications)}
                                className="p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors relative"
                            >
                                <Bell className="h-5 w-5" />
                                <span className="absolute top-2 right-2.5 h-2 w-2 bg-red-500 rounded-full border-2 border-white dark:border-gray-900 animate-pulse"></span>
                            </motion.button>
                        </div>

                        {/* User Profile */}
                        <div className="flex items-center gap-3 pl-2">
                            <div className="text-right hidden lg:block">
                                <p className="text-sm font-bold text-gray-900 dark:text-white">{user?.name}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Patient ID: #{user?.id?.slice(0, 6)}</p>
                            </div>

                            <div className="group relative">
                                <div className="h-11 w-11 rounded-full p-0.5 bg-gradient-to-br from-sky-500 to-blue-600 cursor-pointer shadow-md hover:shadow-lg transition-all duration-300">
                                    <div className="h-full w-full rounded-full bg-white dark:bg-background p-0.5 overflow-hidden">
                                        <Image
                                            src={user?.image || profilePic}
                                            alt="Profile"
                                            width={44}
                                            height={44}
                                            className="object-cover h-full w-full rounded-full"
                                        />
                                    </div>
                                </div>

                                {/* Dropdown Menu */}
                                <div className="absolute right-0 mt-4 w-48 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right z-50">
                                    <div className="p-2 space-y-1">
                                        <Link href="/dashboard/patient/profile" className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-xl transition-colors">
                                            <User className="h-4 w-4" /> Profile
                                        </Link>
                                        <Link href="/dashboard/patient/settings" className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-xl transition-colors">
                                            <Settings className="h-4 w-4" /> Settings
                                        </Link>
                                        <div className="h-px bg-gray-100 dark:bg-gray-700 my-1"></div>
                                        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors">
                                            <LogOut className="h-4 w-4" /> Logout
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-4">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors"
                        >
                            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
