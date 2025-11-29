"use client";

import { createContext, useContext, useState, useEffect, ReactNode, ReactElement } from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { UserRole } from "@/entities/User";

export interface User {
  id: number;
  email: string;
  name: string
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; data?: any; error?: string }>;
  signup: (email: string, password: string, name?: string) => Promise<{ success: boolean; data?: any; error?: string }>;
  logout: () => Promise<{ success: boolean; error?: string }>;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }): ReactElement {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await axios.get("/api/auth/me");
      setUser(response.data.user);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setError(null);
      const response = await axios.post("/api/auth/login", {
        email,
        password,
      });

      setUser(response.data.user);
      return { success: true, data: response.data };
    } catch (err) {
      const errorMessage =
        (err as AxiosError<{ error: string }>).response?.data?.error || "Login failed";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const signup = async (email: string, password: string, name?: string) => {
    try {
      setError(null);
      const response = await axios.post("/api/auth/signup", {
        email,
        password,
        name,
      });

      setUser(response.data.user);
      return { success: true, data: response.data };
    } catch (err) {
      const errorMessage =
        (err as AxiosError<{ error: string }>).response?.data?.error || "Signup failed";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const logout = async () => {
    try {
      setError(null);
      await axios.post("/api/auth/logout");

      setUser(null);
      router.push("/");
      router.refresh();
      return { success: true };
    } catch (err) {
      const errorMessage =
        (err as AxiosError<{ error: string }>).response?.data?.error || "Logout failed";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const contextValue = {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
    checkAuth,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
