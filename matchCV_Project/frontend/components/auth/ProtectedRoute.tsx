'use client'

import { Navigate, Outlet } from 'react-router-dom'
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { ReactNode } from "react";

export default function ProtectedRoute() {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext must be used within AuthProvider");
  }
  const { user, loading } = authContext;

  if (loading) return <></>;

  if (!user||user==null) {
    return <Navigate to="/auth/login" replace />
  }

  return <Outlet />;
}




