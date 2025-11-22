"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../src/redux/UserSlice";
import { useRouter, usePathname } from "next/navigation";
import { Search } from "lucide-react";
import GlobalSearch from "../GlobalSearch";

export default function Navbar() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Keyboard shortcut for search (Cmd/Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/90 shadow-sm backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          <h1
            className="text-2xl font-bold text-[#00796B] cursor-pointer"
            onClick={() => router.push("/")}
          >
            Medicare
          </h1>

          <div className="space-x-6 hidden md:flex">

            {/* Always show these links */}
            <Link href="/" className="text-gray-800 font-medium hover:text-[#00796B] transition">Home</Link>
            <Link href="/appointments" className="text-gray-800 font-medium hover:text-[#00796B] transition">Appointment</Link>
            <Link href="/about" className="text-gray-800 font-medium hover:text-[#00796B] transition">About Us</Link>
            <Link href="/contact" className="text-gray-800 font-medium hover:text-[#00796B] transition">Contact Us</Link>

          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-4">

            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors group border border-gray-300"
              title="Search (Cmd/Ctrl + K)"
            >
              <Search className="h-5 w-5 text-gray-700 group-hover:text-gray-900" />
              <span className="hidden lg:inline text-sm font-semibold text-gray-800 group-hover:text-gray-900">Search</span>
              <kbd className="hidden lg:inline px-2 py-0.5 text-xs font-semibold bg-white border border-gray-400 rounded text-gray-700">⌘K</kbd>
            </button>

            {/* Emergency Button - Always Visible */}
            <Link href="/emergency" className="bg-red-600 text-white px-4 py-2 rounded-full font-bold hover:bg-red-700 transition flex items-center gap-2 animate-pulse shadow-lg shadow-red-500/30">
              <span className="hidden md:inline">Emergency</span> 1066
            </Link>

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
                  className="border-2 border-[#00796B] text-[#00796B] px-5 py-2 rounded-full font-semibold hover:bg-[#00796B] hover:text-white transition"
                >
                  Sign Up
                </Link>
              </>
            )}

            {/* 🔥 If user IS logged in — show profile icon */}
            {showProfileIcon && (
              <div className="relative group">
                <div className="w-10 h-10 bg-[#00796B] text-white rounded-full flex items-center justify-center font-bold cursor-pointer">
                  {user.name?.charAt(0).toUpperCase()}
                </div>

                {/* Dropdown */}
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg hidden group-hover:block">
                  <Link
                    href="/dashboard/patient"
                    className="block px-4 py-2 hover:bg-gray-100 transition"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/dashboard/patient/profile"
                    className="block px-4 py-2 hover:bg-gray-100 transition"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 transition text-red-600"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Global Search Modal */}
      <GlobalSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
