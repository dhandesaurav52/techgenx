"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function Settings() {
  const { user, updateUser } = useAuth();
  const [fullName, setFullName] = useState(user?.fullName ?? "");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setFullName(user?.fullName ?? "");
  }, [user?.fullName]);

  const handleProfileSave = async () => {
    if (!fullName.trim()) {
      alert("Full name is required.");
      return;
    }

    setSaving(true);
    const success = await updateUser({ fullName });
    setSaving(false);

    if (success) {
      alert("Profile updated successfully.");
    } else {
      alert("Unable to update profile.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      <div className="mb-6 p-4 border rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="border px-3 py-2 rounded-lg w-full"
          />

          <button
            onClick={handleProfileSave}
            disabled={saving}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
