'use client'

import { createContext, useState, useEffect, ReactNode } from "react";
import api from "../src/api/axiosConfig";
import type { User, AuthContextType } from "@/lib/types";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await api.get("/account/me");
        setUser(res.data.user);
        if (res.data.user?.id) {
          localStorage.setItem('matchcv-userId', res.data.user.id.toString());
        }
        console.log("AuthContext loadUser:", res.data);
      } catch (err: any) {
        if (err.response?.status === 401) {
          setUser(null);
          localStorage.removeItem('matchcv-userId');
        } else {
          console.error("Unexpected error in /account/me:", err);
        }
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const res = await api.post("/account/login", { email, password });
      setUser(res.data.user);
      if (res.data.user?.id) {
        localStorage.setItem('matchcv-userId', res.data.user.id.toString());
      }
      return res;
    } finally {
      setLoading(false);
    }
  };

  const ggregister = async (email: string, name: string, role: string) => {
    setLoading(true);
    try {
      const res = await api.post("/account/google-complete", {
        email,
        name,
        role,
      });
      setUser(res.data.user);
      if (res.data.user?.id) {
        localStorage.setItem('matchcv-userId', res.data.user.id.toString());
      }
      return res;
    } finally {
      setLoading(false);
    }
  };

  const register = async (
    displayName: string,
    email: string,
    password: string,
    role: string
  ) => {
    setUser(null);
    localStorage.removeItem('matchcv-userId');
    setLoading(true);
    try {
      const res = await api.post("/account/register", {
        displayName,
        email,
        password,
        role,
      });
      return res;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await api.post("/account/logout");
      setUser(null);
      localStorage.removeItem('matchcv-userId');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, ggregister, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}


