"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation"; // ✅ For navigation

interface User {
  fullName: string;
  email: string;
  registeredAt: string;
  enrolledCourses: string[];
  role?: "admin" | "student"; // Added role for admin checks
  darkMode?: boolean;
  emailNotifications?: boolean;
  password?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  signup: (fullName: string, email: string, password: string) => boolean;
  logout: () => void;
  enrollCourse: (courseName: string) => void;
  updateUser?: (data: Partial<User>) => void; // New: for settings updates
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  // Load user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  // Login function
  const login = (email: string, password: string) => {
    const stored = localStorage.getItem("accounts");
    if (!stored) return false;

    const accounts = JSON.parse(stored);
    const found = accounts.find(
      (acc: any) => acc.email === email && acc.password === password
    );

    if (found) {
      if (!found.enrolledCourses) found.enrolledCourses = [];
      if (!found.registeredAt) found.registeredAt = new Date().toLocaleString();

      localStorage.setItem("user", JSON.stringify(found));
      setUser(found);
      return true;
    }

    return false;
  };

  // Signup function
  const signup = (fullName: string, email: string, password: string) => {
    const stored = localStorage.getItem("accounts");
    const accounts = stored ? JSON.parse(stored) : [];

    if (accounts.some((acc: any) => acc.email === email)) return false;

    const newAccount: User = {
      fullName,
      email,
      password,
      registeredAt: new Date().toLocaleString(),
      enrolledCourses: [],
      role: "student",
      darkMode: false,
      emailNotifications: true,
    };

    accounts.push(newAccount);
    localStorage.setItem("accounts", JSON.stringify(accounts));
    localStorage.setItem("user", JSON.stringify(newAccount));
    setUser(newAccount);

    return true;
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    router.push("/login");
  };

  // Enroll in course
  const enrollCourse = (courseName: string) => {
    if (!user) {
      alert("⚠️ Please log in to enroll in a course!");
      router.push("/login");
      return;
    }

    const enrolledCourses = user.enrolledCourses || [];

    if (!enrolledCourses.includes(courseName)) {
      const updatedUser = { ...user, enrolledCourses: [...enrolledCourses, courseName] };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      // Update in accounts list
      const accounts = JSON.parse(localStorage.getItem("accounts") || "[]");
      const index = accounts.findIndex((acc: any) => acc.email === user.email);
      if (index !== -1) {
        accounts[index] = updatedUser;
        localStorage.setItem("accounts", JSON.stringify(accounts));
      }

      alert(`✅ You have successfully enrolled in ${courseName}`);
    } else {
      alert("You’re already enrolled in this course!");
    }
  };

  // ✅ Update user function (for settings like dark mode, email notifications)
  const updateUser = (data: Partial<User>) => {
    if (!user) return;

    const updatedUser = { ...user, ...data };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));

    // Update in accounts list
    const accounts = JSON.parse(localStorage.getItem("accounts") || "[]");
    const index = accounts.findIndex((acc: any) => acc.email === user.email);
    if (index !== -1) {
      accounts[index] = updatedUser;
      localStorage.setItem("accounts", JSON.stringify(accounts));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, enrollCourse, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
