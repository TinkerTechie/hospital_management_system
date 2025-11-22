"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Sun, Users, Calendar, UserCog, DollarSign, FileText, Package, BarChart3, LayoutDashboard, LogOut } from "lucide-react";

const IconLink = ({ href, icon, label, active }) => (
    <Link
        href={href}
        className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all 
      ${active
                ? 'text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/20 font-medium'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-teal-600 dark:hover:text-teal-400'
            }`}
    >
        {icon}
        {label}
    </Link>
);

export default function AdminSidebar({ userName = "Admin", profilePic, dark, toggleDark, userRole = "admin" }) {
    const defaultProfilePic = "https://placehold.co/90x90/0D9488/FFFFFF?text=A";
    const pathname = usePathname();

    return (
        <div className="w-full md:w-64 lg:w-72 bg-slate-50 dark:bg-background border-r border-gray-200 dark:border-gray-800 p-6 flex flex-col h-full min-h-screen">
            <div className="flex flex-col items-center mb-8">
                <Image
                    src={profilePic || defaultProfilePic}
                    alt="Profile"
                    width={90}
                    height={90}
                    className="rounded-full border-4 border-teal-500 shadow-md"
                    unoptimized
                />
                <h2 className="mt-4 text-xl font-semibold text-gray-800 dark:text-white">{userName}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{userRole}</p>
            </div>

            <nav className="flex flex-col gap-2">
                <IconLink
                    href="/dashboard/admin"
                    icon={<LayoutDashboard className="h-5 w-5" />}
                    label="Dashboard"
                    active={pathname === "/dashboard/admin"}
                />

                <IconLink
                    href="/dashboard/admin/patients"
                    icon={<Users className="h-5 w-5" />}
                    label="Patients"
                    active={pathname?.startsWith("/dashboard/admin/patients")}
                />

                <IconLink
                    href="/dashboard/admin/appointments"
                    icon={<Calendar className="h-5 w-5" />}
                    label="Appointments"
                    active={pathname?.startsWith("/dashboard/admin/appointments")}
                />

                <IconLink
                    href="/dashboard/admin/doctors"
                    icon={<UserCog className="h-5 w-5" />}
                    label="Doctors"
                    active={pathname?.startsWith("/dashboard/admin/doctors")}
                />

                <IconLink
                    href="/dashboard/admin/billing"
                    icon={<DollarSign className="h-5 w-5" />}
                    label="Billing"
                    active={pathname?.startsWith("/dashboard/admin/billing")}
                />

                <IconLink
                    href="/dashboard/admin/records"
                    icon={<FileText className="h-5 w-5" />}
                    label="Medical Records"
                    active={pathname?.startsWith("/dashboard/admin/records")}
                />

                <IconLink
                    href="/dashboard/admin/inventory"
                    icon={<Package className="h-5 w-5" />}
                    label="Inventory"
                    active={pathname?.startsWith("/dashboard/admin/inventory")}
                />

                <IconLink
                    href="/dashboard/admin/reports"
                    icon={<BarChart3 className="h-5 w-5" />}
                    label="Reports"
                    active={pathname?.startsWith("/dashboard/admin/reports")}
                />
            </nav>

            {toggleDark && (
                <button
                    onClick={toggleDark}
                    className="mt-6 flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors text-gray-700 dark:text-gray-300"
                >
                    {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                    <span className="text-sm font-medium">{dark ? "Light" : "Dark"} Mode</span>
                </button>
            )}

            <button className="mt-auto text-left flex items-center gap-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 px-3 py-2 rounded-lg transition-colors">
                <LogOut className="h-5 w-5" /> Logout
            </button>
        </div>
    );
}
