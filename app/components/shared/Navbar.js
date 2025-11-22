"use client";
import Link from "next/link";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../src/redux/UserSlice";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  // ❗Hide profile picture on landing page (page.js)
  const hideProfileOnPages = ["/"];

  const showProfileIcon =
    user &&
    !hideProfileOnPages.includes(pathname);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/90 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <h1
          className="text-2xl font-bold text-[#00796B] cursor-pointer"
          onClick={() => router.push("/")}
        >
          Medicare
        </h1>

        <div className="space-x-6 hidden md:flex">

          {/* Always show these links */}
          <Link href="/" className="hover:text-[#00796B] transition">Home</Link>
          <Link href="/appointments" className="hover:text-[#00796B] transition">Appointment</Link>
          <Link href="/about" className="hover:text-[#00796B] transition">About Us</Link>
          <Link href="/contact" className="hover:text-[#00796B] transition">Contact Us</Link>

        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">

          {/* 🔥 If user is NOT logged in — show LOGIN/SIGNUP */}
          {!user && (
            <>
              <Link
                href="/login"
                className="bg-[#00796B] text-white px-5 py-2 rounded-full font-semibold hover:bg-[#00695C] transition"
              >
                Login
              </Link>

              <Link
                href="/signup"
                className="border border-[#00796B] text-[#00796B] px-5 py-2 rounded-full font-semibold hover:bg-[#E0F2F1] transition"
              >
                Signup
              </Link>
            </>
          )}

          {/* ⭐ If user is logged in AND not on landing page → Show Profile Icon */}
          {showProfileIcon && (
            <Image
              src={user.image || "/assets/default-avatar.png"}
              width={42}
              height={42}
              alt="User Profile"
              className="rounded-full border-2 border-[#00796B] cursor-pointer"
              onClick={() => router.push("/profile")}
            />
          )}

          {/* If user is logged in → logout button */}
          {user && (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-red-600 transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
