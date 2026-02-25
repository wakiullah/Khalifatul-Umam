"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, LogIn } from "lucide-react";
import { loginUser } from "@/services/auth.api";
import { useAuth } from "@/context/AuthContext";

function LoginForm() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const { checkUser } = useAuth();

  const from = searchParams.get("from") || "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await loginUser({ phone, password });

      if (res.success) {
        toast({
          title: "লগইন সফল",
          description: "স্বাগতম!",
        });

        // AuthContext refresh করুন
        await checkUser();

        // Redirect করুন (ensure path starts with /)
        const redirectPath = from.startsWith("/") ? from : `/${from}`;

        // Use window.location for hard redirect to ensure middleware picks up cookie
        window.location.href = redirectPath;
      } else {
        toast({
          title: "লগইন ব্যর্থ",
          description: res.message || "ফোন নম্বর বা পাসওয়ার্ড ভুল।",
          variant: "destructive",
        });
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "ত্রুটি",
        description: "সার্ভারে সমস্যা হয়েছে।",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <section className="flex-1 pt-32 pb-16 flex items-center justify-center bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4">
          <Card className="max-w-md mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="font-display text-2xl">লগইন করুন</CardTitle>
              <CardDescription>আপনার অ্যাকাউন্টে প্রবেশ করুন</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="font-body text-sm font-medium text-foreground mb-2 block">
                    ফোন নম্বর *
                  </label>
                  <Input
                    type="number"
                    required
                    placeholder="আপনার ফোন নম্বর লিখুন (01xxxxxxxxx)"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <label className="font-body text-sm font-medium text-foreground mb-2 block">
                    পাসওয়ার্ড *
                  </label>
                  <Input
                    type="password"
                    required
                    placeholder="আপনার পাসওয়ার্ড লিখুন"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
                <Button
                  type="submit"
                  variant="elegant"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <LogIn className="w-4 h-4 mr-2" />
                  )}
                  লগইন
                </Button>
                <p className="text-center text-sm text-muted-foreground">
                  অ্যাকাউন্ট নেই?{" "}
                  <Link
                    href="/register"
                    className="text-primary hover:underline"
                  >
                    রেজিস্টার করুন
                  </Link>
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default function Login() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
