"use client";

import { useState } from "react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, subject, message }),
    });

    setSubmitting(false);

    if (!res.ok) {
      alert("Failed to send message. Please try again.");
      return;
    }

    alert("Message sent successfully.");
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
  };

  return (
    <section className="flex flex-col items-center py-24 px-6 bg-gray-100 dark:bg-gray-900 min-h-[calc(100vh-128px)]">
      <div className="text-center max-w-3xl mb-16">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">Contact Us</h1>
        <p className="text-gray-700 dark:text-gray-300 text-lg">
          Have questions or want to get in touch? Fill out the form below and we’ll get back to you as soon as possible.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-6xl">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400"
            required
          />
          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400"
          />
          <textarea
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400 resize-none h-32"
            required
          ></textarea>
          <button
            type="submit"
            disabled={submitting}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-60"
          >
            {submitting ? "Sending..." : "Send Message"}
          </button>
        </form>

        <div className="flex flex-col justify-center gap-6 text-gray-800 dark:text-gray-200">
          <div>
            <h3 className="text-xl font-semibold mb-1">Email</h3>
            <p className="text-gray-600 dark:text-gray-400">info@techgenx.com</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-1">Phone</h3>
            <p className="text-gray-600 dark:text-gray-400">+91 98765 43210</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-1">Address</h3>
            <p className="text-gray-600 dark:text-gray-400">123 TechGenX Street, Mumbai, India</p>
          </div>
        </div>
      </div>
    </section>
  );
}
