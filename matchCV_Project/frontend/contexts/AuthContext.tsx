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
        // Try to fetch current user; cookie auth will be sent via withCredentials
        const res = await api.get("/account/me");
        const extrasRaw = typeof window !== 'undefined' ? localStorage.getItem('matchcv-profile-extras') : null;
        const extras = extrasRaw ? JSON.parse(extrasRaw) : {};
        const extrasMatch = extras?.userId && res.data.user?.id && extras.userId === res.data.user.id;
        setUser({
          ...res.data.user,
          avatarBase64: extrasMatch ? extras.avatarBase64 ?? res.data.user?.avatarBase64 : res.data.user?.avatarBase64,
          displayName: extrasMatch ? extras.displayName ?? res.data.user?.displayName : res.data.user?.displayName,
          email: extrasMatch ? extras.email ?? res.data.user?.email : res.data.user?.email,
        });
        // Save userId to localStorage for other components
        if (res.data.user?.id) {
          const idStr = res.data.user.id.toString()
          localStorage.setItem('userId', idStr)
          localStorage.setItem('matchcv-userId', idStr)
        }
        console.log("AuthContext loadUser:", res.data);
      } catch (err: any) {
        console.info("User not authenticated yet");
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
      const extrasRaw = typeof window !== 'undefined' ? localStorage.getItem('matchcv-profile-extras') : null;
      const extras = extrasRaw ? JSON.parse(extrasRaw) : {};
      const extrasMatch = extras?.userId && res.data.user?.id && extras.userId === res.data.user.id;
      setUser({
        ...res.data.user,
        avatarBase64: extrasMatch ? extras.avatarBase64 ?? res.data.user?.avatarBase64 : res.data.user?.avatarBase64,
        displayName: extrasMatch ? extras.displayName ?? res.data.user?.displayName : res.data.user?.displayName,
        email: extrasMatch ? extras.email ?? res.data.user?.email : res.data.user?.email,
      });
      // Save userId to localStorage
      if (res.data.user?.id) {
        const idStr = res.data.user.id.toString()
        localStorage.setItem('userId', idStr);
        localStorage.setItem('matchcv-userId', idStr);
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
      const extrasRaw = typeof window !== 'undefined' ? localStorage.getItem('matchcv-profile-extras') : null;
      const extras = extrasRaw ? JSON.parse(extrasRaw) : {};
      const extrasMatch = extras?.userId && res.data.user?.id && extras.userId === res.data.user.id;
      setUser({
        ...res.data.user,
        avatarBase64: extrasMatch ? extras.avatarBase64 ?? res.data.user?.avatarBase64 : res.data.user?.avatarBase64,
        displayName: extrasMatch ? extras.displayName ?? res.data.user?.displayName : res.data.user?.displayName,
        email: extrasMatch ? extras.email ?? res.data.user?.email : res.data.user?.email,
      });
      // Save userId to localStorage
      if (res.data.user?.id) {
        const idStr = res.data.user.id.toString()
        localStorage.setItem('userId', idStr);
        localStorage.setItem('matchcv-userId', idStr);
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
    localStorage.removeItem('userId');
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
      localStorage.removeItem('userId');
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (payload: Partial<Pick<User, 'displayName' | 'email' | 'avatarBase64'>>) => {
    setLoading(true);
    try {
      // Try hitting API if available; fall back to local update so UI stops breaking
      try {
        await api.post("/account/update-profile", payload);
      } catch (err) {
        console.warn("updateProfile API unavailable, falling back to local update", err);
      }

      setUser((prev) => (prev ? { ...prev, ...payload } : prev));
      if (payload.avatarBase64 || payload.displayName || payload.email) {
        const extrasRaw = typeof window !== 'undefined' ? localStorage.getItem('matchcv-profile-extras') : null;
        const extras = extrasRaw ? JSON.parse(extrasRaw) : {};
        const userId = user?.id ?? extras.userId;
        localStorage.setItem(
          'matchcv-profile-extras',
          JSON.stringify({
            ...extras,
            userId,
            avatarBase64: payload.avatarBase64 ?? extras.avatarBase64,
            displayName: payload.displayName ?? extras.displayName,
            email: payload.email ?? extras.email,
          })
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const forgotpass = async (email: string) => {
    setLoading(true);
    try {
      const res = await api.post("/account/forgot-password", {email});
      return res;
    } finally {
      setLoading(false);
    }
  };

  const resetpass = async (token: string, newPassword: string) => {
    setLoading(true);
    try {
      const res = await api.post("/account/reset-password", {
        token,
        newPassword,
      });
      return res;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, ggregister, register, logout, updateProfile, forgotpass, resetpass }}
    >
      {children}
    </AuthContext.Provider>
  );
}
