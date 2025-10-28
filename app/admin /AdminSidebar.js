"use client";

import { User, Activity, Users, MessageSquare, Building } from "lucide-react";
import Link from "next/link";

export default function AdminSidebar() {
  const menuItems = [
    { icon: <User className="w-5 h-5" />, label: "Dashboard", href: "/admin" },
    { icon: <Activity className="w-5 h-5" />, label: "Appointments", href: "/appointments" },
    { icon: <Users className="w-5 h-5" />, label: "Doctors", href: "/doctors" },
    { icon: <Building className="w-5 h-5" />, label: "Patients", href: "/patients" },
    { icon: <MessageSquare className="w-5 h-5" />, label: "Messages", href: "/messages" },
  ];

  return (
    <aside className="bg-white border-r border-gray-200 w-64 min-h-screen flex flex-col justify-between p-6 shadow-sm">
      <div>
        <h1 className="text-2xl font-bold mb-10 text-blue-600 flex items-center gap-2">
          🏥 Admin Panel
        </h1>
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                href={item.href}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-100 hover:text-blue-700 transition"
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={() => alert("Logout clicked")}
        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all"
      >
        Logout
      </button>
    </aside>
  );
}
