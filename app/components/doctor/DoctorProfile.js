"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import DoctorSidebar from "./DoctorSidebar";

export default function DoctorProfile() {
  const [userData, setUserData] = useState({});
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    address: "",
    city: "",
    state: "",
    dateOfBirth: "",
    gender: "",
  });

  // ✅ Load user from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored) {
      Swal.fire({
        title: "Login Required",
        text: "Please login as a doctor to view your profile.",
        icon: "info",
        confirmButtonText: "Go to Login",
      }).then(() => router.push("/login"));
      return;
    }
    const user = JSON.parse(stored);
    setUserData(user);
    setForm({
      name: user.name || "",
      email: user.email || "",
      mobileNumber: user.phoneno || "",
      address: user.address?.street || "",
      city: user.address?.city || "",
      state: user.address?.state || "",
      dateOfBirth: user.dob?.split("T")[0] || "",
      gender: user.gender || "",
    });
  }, [router]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // ✅ Submit profile update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/doctor/update-profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: userData.id, ...form }),
      });

      const data = await res.json();

      if (data.success) {
        Swal.fire({
          title: "Success",
          text: "Profile updated successfully!",
          icon: "success",
        });
        localStorage.setItem("user", JSON.stringify(data.user));
        router.refresh();
      } else {
        throw new Error(data.error || "Update failed");
      }
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: "Something went wrong!",
        icon: "error",
      });
    }
  };

  return (
    <section className="bg-slate-200 min-h-screen flex justify-center items-center py-10">
      <div className="bg-white shadow-xl rounded-2xl flex w-[90%] max-w-6xl overflow-hidden">
        <DoctorSidebar userName={userData.name} />

        <div className="flex-1 p-8">
          <h2 className="text-2xl font-bold mb-6 text-[#00796B]">
            Doctor Account Settings
          </h2>
          <form onSubmit={handleUpdate} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {["name", "email", "mobileNumber", "dateOfBirth"].map((field) => (
                <input
                  key={field}
                  type={field === "dateOfBirth" ? "date" : "text"}
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  className="border rounded-md p-2 focus:ring-2 focus:ring-[#00796B] w-full"
                  placeholder={field.replace(/([A-Z])/g, " $1")}
                  required
                />
              ))}
              {["gender", "city", "state", "address"].map((field) => (
                <input
                  key={field}
                  type="text"
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  className="border rounded-md p-2 focus:ring-2 focus:ring-[#00796B] w-full"
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  required
                />
              ))}
            </div>

            <button
              type="submit"
              className="bg-[#00796B] text-white w-full rounded-full py-3 hover:bg-[#00695C]"
            >
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
