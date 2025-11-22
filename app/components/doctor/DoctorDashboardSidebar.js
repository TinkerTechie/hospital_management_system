"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Sun } from "lucide-react";

const IconLink = ({ href, icon, label, active }) => (
  <Link
    href={href}
    className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all 
      ${active
        ? "text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/20 font-medium"
        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-teal-600 dark:hover:text-teal-400"
      }`}
  >
    {icon}
    {label}
  </Link>
);

const IconDashboard = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <rect width="7" height="9" x="3" y="3" rx="1" />
    <rect width="7" height="5" x="14" y="3" rx="1" />
    <rect width="7" height="9" x="14" y="12" rx="1" />
    <rect width="7" height="5" x="3" y="16" rx="1" />
  </svg>
);

const IconCalendar = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <rect width="18" height="18" x="3" y="4" rx="2" />
    <line x1="16" x2="16" y1="2" y2="6" />
    <line x1="8" x2="8" y1="2" y2="6" />
    <line x1="3" x2="21" y1="10" y2="10" />
  </svg>
);

const IconUsers = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const IconSettings = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const IconLogout = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

export default function DoctorDashboardSidebar({ userName = "Doctor", profilePic, dark, toggleDark }) {
  const defaultProfilePic = "https://placehold.co/90x90/0D9488/FFFFFF?text=Dr";
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
        />
        <h2 className="mt-4 text-xl font-semibold text-gray-800 dark:text-white">{userName}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Doctor</p>
      </div>

      <nav className="flex flex-col gap-2">
        <IconLink href="/dashboard/doctor" icon={<IconDashboard />} label="Dashboard" active={pathname === "/dashboard/doctor"} />
        <IconLink href="/dashboard/doctor/appointments" icon={<IconCalendar />} label="Appointments" active={pathname === "/dashboard/doctor/appointments"} />
        <IconLink href="/dashboard/doctor/patients" icon={<IconUsers />} label="My Patients" active={pathname === "/dashboard/doctor/patients"} />
        <IconLink href="/dashboard/doctor/profile" icon={<IconSettings />} label="Profile Settings" active={pathname === "/dashboard/doctor/profile"} />
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
        <IconLogout /> Logout
      </button>

    </div>
  );
}
