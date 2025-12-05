'use client'

import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Profile() {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext must be used within AuthProvider");
  }
  const { user, logout } = authContext;
  if (!user) return null;

  console.log("Logged in user:", user);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <Card className="w-full max-w-md border-none bg-card/70 shadow-lg shadow-black/10">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-semibold">Profile</CardTitle>
          <CardDescription>Your account information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Display Name</p>
              <p className="text-lg font-semibold">{user.displayName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="text-lg font-semibold">{user.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Role</p>
              <p className="text-lg font-semibold capitalize">{user.role}</p>
            </div>
          </div>
          <Button onClick={logout} variant="outline" className="w-full">
            Logout
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

