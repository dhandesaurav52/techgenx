"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(email, password);
    if (success) {
      alert("Login successful!");
      router.push("/");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <section className="flex flex-col items-center justify-center py-24 px-6 bg-gray-100 min-h-[calc(100vh-128px)]">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Login</h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-md bg-gray-800 text-white shadow-md rounded-xl p-8"
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-700 bg-gray-700 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-white placeholder-gray-400"
          required
        />

        <div className="flex flex-col">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-700 bg-gray-700 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-white placeholder-gray-400"
            required
          />
          <Link
            href="#"
            className="text-sm text-blue-400 hover:underline mt-1 self-end"
          >
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </button>

        <p className="text-sm text-gray-300 text-center mt-2">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-blue-400 hover:underline">
            Sign Up
          </Link>
        </p>
      </form>
    </section>
  );
}
