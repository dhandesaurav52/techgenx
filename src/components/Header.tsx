"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useState, useRef, useEffect } from "react";

interface User {
  fullName?: string;
  role?: "admin" | "student" | "instructor";
}

export default function Header() {
  const { user, logout } = useAuth() as { user: User | null; logout: () => void };
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="flex items-center justify-between px-10 py-4 bg-white shadow-md relative z-50">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <img src="/logo.png" alt="TechGenX Logo" className="w-10 h-10" />
        <h1 className="text-2xl font-bold text-blue-600">TechGenX</h1>
      </div>

      {/* Nav Links */}
      <nav>
        <ul className="flex space-x-6 text-gray-700 font-medium">
          <li className="hover:text-blue-600 cursor-pointer"><Link href="/">Home</Link></li>
          <li className="hover:text-blue-600 cursor-pointer"><Link href="/courses">Courses</Link></li>
          <li className="hover:text-blue-600 cursor-pointer"><Link href="/placements">Placements</Link></li>
          <li className="hover:text-blue-600 cursor-pointer"><Link href="/about">About</Link></li>
          <li className="hover:text-blue-600 cursor-pointer"><Link href="/contact">Contact</Link></li>
        </ul>
      </nav>

      {/* Auth Section */}
      <div className="relative" ref={dropdownRef}>
        {user ? (
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {user.fullName?.split(" ")[0] || "User"} ▼
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-56 bg-white border shadow-lg rounded-lg z-[9999]">
                <ul className="text-gray-700">
                  <li><Link href="/profile" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setOpen(false)}>Profile</Link></li>
                  <li><Link href="/my-courses" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setOpen(false)}>Your Enrolled Courses</Link></li>
                  <li><Link href="/certificates" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setOpen(false)}>Certificates</Link></li>
                  <li><Link href="/settings" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setOpen(false)}>Settings</Link></li>

                  {/* Admin Links */}
                  {user.role === "admin" && (
                    <>
                      <li><hr className="my-1 border-gray-200" /></li>
                      <li><Link href="/admin/dashboard" className="block px-4 py-2 hover:bg-gray-100 font-semibold" onClick={() => setOpen(false)}>Admin Dashboard</Link></li>
                      <li><Link href="/admin/users" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setOpen(false)}>Manage Users</Link></li>
                      <li><Link href="/admin/courses" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setOpen(false)}>Manage Courses</Link></li>
                      <li><Link href="/admin/homepage" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setOpen(false)}>Manage Homepage</Link></li>
                    </>
                  )}

                  <li><hr className="my-1 border-gray-200" /></li>
                  <li>
                    <button
                      onClick={() => { logout(); setOpen(false); }}
                      className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div className="space-x-4">
            <Link href="/login"><button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50">Login</button></Link>
            <Link href="/signup"><button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Sign Up</button></Link>
          </div>
        )}
      </div>
    </header>
  );
}
