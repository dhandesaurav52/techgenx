"use client";

export default function ContactPage() {
  return (
    <section className="flex flex-col items-center py-24 px-6 bg-gray-100 dark:bg-gray-900 min-h-[calc(100vh-128px)]">
      {/* Page Header */}
      <div className="text-center max-w-3xl mb-16">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">Contact Us</h1>
        <p className="text-gray-700 dark:text-gray-300 text-lg">
          Have questions or want to get in touch? Fill out the form below and we’ll get back to you as soon as possible.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-6xl">
        {/* Contact Form */}
        <form className="flex flex-col gap-4 bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8">
          <input
            type="text"
            placeholder="Full Name"
            className="border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400"
          />
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400"
          />
          <input
            type="text"
            placeholder="Subject"
            className="border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400"
          />
          <textarea
            placeholder="Message"
            className="border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400 resize-none h-32"
          ></textarea>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Send Message
          </button>
        </form>

        {/* Contact Info */}
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
            <p className="text-gray-600 dark:text-gray-400">
              123 TechGenX Street, Mumbai, India
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
