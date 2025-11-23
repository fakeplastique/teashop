"use client";

import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";

export interface User {
  id: number;
  email: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      return { success: true };
    } catch (err) {
      const errorMessage =
        (err as AxiosError<{ error: string }>).response?.data?.error || "Logout failed";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  return {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
    checkAuth,
  };
}
