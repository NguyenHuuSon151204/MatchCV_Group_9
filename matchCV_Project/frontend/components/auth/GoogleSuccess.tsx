"use client"

import { useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function GoogleSuccess() {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext must be used within AuthProvider");
  }
  const { loading, user } = authContext;
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (user) {
        // Redirect based on role
        if (user.role === 'Recruiter') {
          router.push("/recruiter");
        } else if (user.role === 'Admin') {
          router.push("/admin");
        } else {
          router.push("/app/dashboard");
        }
      } else {
        router.push("/auth/login");
      }
    }
  }, [loading, user, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="text-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="text-muted-foreground">Loading Google login...</p>
      </div>
    </div>
  );
}

