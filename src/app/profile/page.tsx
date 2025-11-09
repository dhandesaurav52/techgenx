"use client";

import { useAuth } from "@/context/AuthContext";

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <section className="min-h-screen p-8 bg-gray-100 flex items-center justify-center">
        <p className="text-gray-700 text-lg">You are not logged in.</p>
      </section>
    );
  }

  return (
    <section className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Profile</h1>

      <div className="bg-white shadow-md rounded-lg p-6 max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Your Details</h2>
        <div className="mb-2">
          <span className="font-medium text-gray-600">Full Name:</span>{" "}
          <span className="text-gray-800">{user.fullName}</span>
        </div>
        <div className="mb-2">
          <span className="font-medium text-gray-600">Email:</span>{" "}
          <span className="text-gray-800">{user.email}</span>
        </div>
        <div className="mb-2">
          <span className="font-medium text-gray-600">Registered On:</span>{" "}
          <span className="text-gray-800">
            {user.registeredAt || "Just now"}
          </span>
        </div>
      </div>
    </section>
  );
}
