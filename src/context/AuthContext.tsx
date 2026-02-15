"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: number;
  fullName: string;
  email: string;
  registeredAt: string;
  enrolledCourses: string[];
  role?: "admin" | "student";
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (fullName: string, email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  enrollCourse: (courseName: string) => Promise<boolean>;
  updateUser: (data: Partial<Pick<User, "fullName">>) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = "authToken";
const USER_KEY = "user";

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

function setSession(user: User | null, token?: string) {
  if (typeof window === "undefined") return;

  if (user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(USER_KEY);
  }

  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  }
}

function clearSession() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(TOKEN_KEY);
}

async function apiFetch<T>(url: string, init?: RequestInit): Promise<T | null> {
  const token = getToken();
  const headers = new Headers(init?.headers || {});
  headers.set("Content-Type", "application/json");
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const response = await fetch(url, { ...init, headers });
  if (!response.ok) return null;
  return (await response.json()) as T;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const bootstrap = async () => {
      const savedUser = localStorage.getItem(USER_KEY);
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }

      const me = await apiFetch<{ user: User }>("/api/me");
      if (me?.user) {
        setUser(me.user);
        setSession(me.user);
      } else {
        clearSession();
      }

      setLoading(false);
    };

    void bootstrap();
  }, []);

  const login = async (email: string, password: string) => {
    const data = await apiFetch<{ user: User; token: string }>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (!data?.user || !data.token) return false;
    setUser(data.user);
    setSession(data.user, data.token);
    return true;
  };

  const signup = async (fullName: string, email: string, password: string) => {
    const data = await apiFetch<{ user: User; token: string }>("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ fullName, email, password }),
    });

    if (!data?.user || !data.token) return false;
    setUser(data.user);
    setSession(data.user, data.token);
    return true;
  };

  const logout = async () => {
    await apiFetch("/api/auth/logout", { method: "POST" });
    clearSession();
    setUser(null);
    router.push("/login");
  };

  const enrollCourse = async (courseName: string) => {
    if (!user) {
      router.push("/login");
      return false;
    }

    const data = await apiFetch<{ user: User }>("/api/enrollments", {
      method: "POST",
      body: JSON.stringify({ courseTitle: courseName }),
    });

    if (!data?.user) return false;
    setUser(data.user);
    setSession(data.user);
    return true;
  };

  const updateUser = async (payload: Partial<Pick<User, "fullName">>) => {
    if (!user) return false;

    const data = await apiFetch<{ user: User }>("/api/me/settings", {
      method: "PATCH",
      body: JSON.stringify(payload),
    });

    if (!data?.user) return false;
    setUser(data.user);
    setSession(data.user);
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, enrollCourse, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
