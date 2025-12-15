'use client';

import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export default function ForgotPassword() {
    const authContext = useContext(AuthContext);
        if (!authContext) {
            throw new Error("AuthContext must be used within AuthProvider");
        }
    const { forgotpass, loading } = authContext;
    const [email, setEmail] = useState("");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const res = await forgotpass(email);
            if (res?.data?.message) {
                setSuccess(res.data.message);
            } else {
                setSuccess("If this email exists, a reset link has been sent.");
            }
            } catch (err: any) {
            setError(err.response?.data?.message || "Something went wrong.");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen px-4 bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow">
                <h1 className="text-2xl font-semibold mb-6 text-center">Forgot Password</h1>

                {success && (
                    <p className="mb-4 text-green-600 bg-green-100 p-3 rounded">
                    {success}
                    </p>
                )}

                {error && (
                    <p className="mb-4 text-red-600 bg-red-100 p-3 rounded">
                    {error}
                    </p>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 mb-1">Email Address</label>
                        <input
                        type="email"
                        required
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition disabled:opacity-50"
                    >
                    {loading ? "Sending..." : "Send Reset Link"}
                    </button>
                </form>
            </div>
        </div>
    );
}
