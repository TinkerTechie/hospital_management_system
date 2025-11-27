"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Navbar from "../components/shared/Navbar";

export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored) {
      Swal.fire({
        title: "Login Required",
        text: "Please login to continue",
        icon: "info",
      }).then(() => router.push("/auth"));
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUser(JSON.parse(stored));
    }
  }, [router]);

  if (!user) return null;

  return (
    <>
      <Navbar user={user} />

      <div className="p-6">
        <h1 className="text-3xl font-bold">Welcome, {user.name} 👋</h1>
        <p className="text-gray-600 mt-2">
          Manage your appointments, view doctors, and explore services.
        </p>
      </div>
    </>
  );
}
