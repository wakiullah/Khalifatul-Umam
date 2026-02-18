"use client";

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, LogIn } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const from = searchParams.get('from') || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    console.log('Login attempt:', { email, password });

    // Simulate login
    setTimeout(() => {
      if (email && password) {
        console.log('Login successful');
        toast({
          title: 'লগইন সফল',
          description: 'স্বাগতম!',
        });
        router.push(from);
      } else {
        console.log('Login failed: Missing credentials');
        toast({
          title: 'লগইন ব্যর্থ',
          description: 'ইমেইল বা পাসওয়ার্ড ভুল।',
          variant: 'destructive',
        });
      }
      setIsLoading(false);
    }, 1000);
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
                    ইমেইল *
                  </label>
                  <Input
                    type="email"
                    required
                    placeholder="আপনার ইমেইল লিখুন"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                <Button type="submit" variant="elegant" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <LogIn className="w-4 h-4 mr-2" />
                  )}
                  লগইন
                </Button>
                <p className="text-center text-sm text-muted-foreground">
                  অ্যাকাউন্ট নেই?{' '}
                  <Link href="/register" className="text-primary hover:underline">
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
