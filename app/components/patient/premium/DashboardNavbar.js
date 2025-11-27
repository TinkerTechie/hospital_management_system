import Link from "next/link";
import { useState } from "react";
import { Menu, X, Bell, User, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import NotificationCenter from "./NotificationCenter";

export default function DashboardNavbar({ user, handleLogout }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="bg-teal-600 text-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
                {/* Logo */}
                <Link href="/dashboard/patient" className="text-2xl font-bold tracking-wide flex items-center gap-2">
                    <span>🏥</span> Medicare
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                    <Link href="/dashboard/patient" className="hover:text-teal-200 transition-colors">
                        Dashboard
                    </Link>
                    <Link href="/dashboard/patient/appointments" className="hover:text-teal-200 transition-colors">
                        Appointments
                    </Link>
                    <Link href="/dashboard/patient/records" className="hover:text-teal-200 transition-colors">
                        Records
                    </Link>

                    <div className="h-6 w-px bg-teal-500 mx-2"></div>

                    <div className="flex items-center gap-4">
                        <NotificationCenter />

                        <div className="flex items-center gap-2">
                            <span className="font-semibold">{user?.name?.split(' ')[0]}</span>
                            <button
                                onClick={handleLogout}
                                className="bg-teal-700 p-2 rounded-full hover:bg-teal-800 transition-colors"
                                title="Logout"
                            >
                                <LogOut className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-teal-700 border-t border-teal-600 overflow-hidden"
                    >
                        <div className="flex flex-col p-4 space-y-4">
                            <Link href="/dashboard/patient" className="text-white hover:text-teal-200">Dashboard</Link>
                            <Link href="/dashboard/patient/appointments" className="text-white hover:text-teal-200">Appointments</Link>
                            <Link href="/dashboard/patient/records" className="text-white hover:text-teal-200">Records</Link>
                            <button onClick={handleLogout} className="text-left text-red-200 hover:text-white flex items-center gap-2">
                                <LogOut className="h-4 w-4" /> Logout
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
