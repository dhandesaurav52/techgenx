"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function Settings() {
  const { user, updateUser } = useAuth(); // Assume you have updateUser function
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    // call API or Firebase function to update password
    console.log("Change password:", { currentPassword, newPassword });
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      {/* Email Notifications */}
      <div className="mb-6 p-4 border rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-2">Email Notifications</h2>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={emailNotifications}
            onChange={(e) => setEmailNotifications(e.target.checked)}
            className="h-5 w-5"
          />
          Receive email notifications
        </label>
      </div>

      {/* Dark Mode */}
      <div className="mb-6 p-4 border rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-2">Appearance</h2>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={(e) => setDarkMode(e.target.checked)}
            className="h-5 w-5"
          />
          Dark Mode 
        </label>
      </div>
      

      {/* Change Password */}
      <div className="mb-6 p-4 border rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Change Password</h2>
        <div className="flex flex-col gap-4">
          <input
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="border px-3 py-2 rounded-lg w-full"
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="border px-3 py-2 rounded-lg w-full"
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border px-3 py-2 rounded-lg w-full"
          />
          <button
            onClick={handlePasswordChange}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
}
