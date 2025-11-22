"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logout } from "@/src/redux/UserSlice";
import Swal from "sweetalert2";

export default function DoctorSidebar({ userName }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    localStorage.removeItem("user");
    dispatch(logout());
    Swal.fire({
      title: "Logged Out",
      text: "You have been signed out successfully!",
      icon: "info",
    }).then(() => router.push("/"));
  };

  const links = [
    { href: "/doctor/profile", label: "Settings" },
    { href: "/doctor/appointments", label: "Appointments" },
    { href: "/doctor/messages", label: "Messages" },
  ];

  return (
    <div className="w-64 bg-gray-100 p-4 flex flex-col justify-between border-r">
      <div>
        <div className="text-center mb-8">
          <Image
            src="/assets/doct2.jpg"
            alt="Doctor"
            width={100}
            height={100}
            className="rounded-full mx-auto"
          />
          <p className="mt-2 font-semibold">{userName || "Doctor"}</p>
        </div>
        <nav className="flex flex-col gap-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="p-2 rounded-md hover:bg-[#00796B] hover:text-white transition"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <button
        onClick={handleSignOut}
        className="bg-black text-white p-2 rounded-full mt-6 hover:scale-105 transition"
      >
        Sign Out
      </button>
    </div>
  );
}
