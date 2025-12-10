"use client";

import { useState, useContext } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { AuthContext } from "@/contexts/AuthContext";

export default function ResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const authContext = useContext(AuthContext);
        if (!authContext) {
            throw new Error("AuthContext must be used within AuthProvider");
        }

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { resetpass, loading } = authContext;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!token) {
      setError("Invalid reset token.");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await resetpass(token, password);
      setSuccess("Password reset successful! Redirecting to login...");
      setTimeout(() => router.push("/auth/login"), 1500);
    } catch (err: any) {
      console.error("Reset password error:", err);
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Something went wrong. Try again.";
      setError(msg);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-4">Reset Password</h1>

        {error && (
          <p className="bg-red-100 text-red-600 p-2 rounded mb-3">{error}</p>
        )}
        {success && (
          <p className="bg-green-100 text-green-600 p-2 rounded mb-3">
            {success}
          </p>
        )}

        <label className="block mb-2 text-sm font-medium">New Password</label>
        <input
          type="password"
          className="w-full px-3 py-2 border rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label className="block mb-2 text-sm font-medium">
          Confirm Password
        </label>
        <input
          type="password"
          className="w-full px-3 py-2 border rounded mb-4"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Processing..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
}
