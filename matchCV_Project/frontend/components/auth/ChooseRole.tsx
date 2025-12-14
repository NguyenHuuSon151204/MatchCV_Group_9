"use client"

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ChooseRole() {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext must be used within AuthProvider");
  }
  const { ggregister } = authContext;
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const name = searchParams.get("name");
  const router = useRouter();
  const [role, setRole] = useState<string>("Candidate");
  const [error, setError] = useState<string>("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) {
      setError("Email and name are required.");
      return;
    }
    try {
      await ggregister(email, name, role);
      // Redirect based on chosen role
      if (role === "Admin") {
        router.push("/admin/dashboard");
      } else if (role === "Recruiter") {
        router.push("/recruiter/dashboard");
      } else {
        router.push("/app/dashboard");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <Card className="w-full max-w-md border-none bg-card/70 shadow-lg shadow-black/10">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-semibold">Welcome {name}!</CardTitle>
          <CardDescription>Select your role to continue</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={submit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="flex h-10 w-full rounded-2xl border border-input bg-background/80 px-4 py-2 text-sm outline-none transition focus:ring-2 focus:ring-primary/40"
              >
                <option value="Candidate">Candidate</option>
                <option value="Recruiter">Recruiter</option>
              </select>
            </div>
            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
            <Button type="submit" className="w-full">
              Continue
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

