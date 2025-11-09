// src/app/layout.tsx
import "./globals.css";
import Header from "../components/Header"; // relative path to your Header.tsx
import Footer from "../components/Footer"; // relative path to Footer.tsx
import { AuthProvider } from "../context/AuthContext";

export const metadata = {
  title: "TechGenX",
  description: "TechGenX Learning Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        {/* Auth context provider */}
        <AuthProvider>
          {/* Header */}
          <Header />

          {/* Page content */}
          <main className="flex-grow">{children}</main>

          {/* Footer */}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
