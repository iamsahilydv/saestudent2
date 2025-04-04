"use client";

import type React from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  const [memberId, setMemberId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate a login request
    setTimeout(() => {
      // In a real application, you would validate the credentials
      // and handle authentication properly
      setLoading(false);
      router.push("/dashboard");
    }, 1500);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <Image
              src="/images/sae-logo.png"
              alt="SAE Logo"
              width={120}
              height={80}
              className="h-16 w-auto"
            />
          </div>
          <CardTitle className="text-2xl font-bold">SAE Student Portal</CardTitle>
          <CardDescription>
            Enter your SAE membership ID and password to access the student dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="memberId" className="text-sm font-medium">
                SAE Membership ID
              </label>
              <Input
                id="memberId"
                type="text"
                placeholder="Enter your membership ID"
                value={memberId}
                onChange={(e) => setMemberId(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <Link
                  href="/auth/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4 text-center">
          <div>
            <span className="text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
            </span>
            <Link
              href="https://www.sae.org/membership/join"
              className="text-sm text-primary hover:underline"
            >
              Become an SAE member
            </Link>
          </div>
          <div className="text-xs text-muted-foreground">
            For SAE membership inquiries, please contact your regional SAE office or visit{" "}
            <a
              href="https://www.sae.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              www.sae.org
            </a>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
