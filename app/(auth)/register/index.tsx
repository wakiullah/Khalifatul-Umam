"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, UserPlus } from 'lucide-react';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      console.log('Registration failed: Password mismatch');
      toast({
        title: 'ত্রুটি',
        description: 'পাসওয়ার্ড মিলছে না।',
        variant: 'destructive',
      });
      return;
    }

    if (password.length < 6) {
      console.log('Registration failed: Password too short');
      toast({
        title: 'ত্রুটি',
        description: 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    console.log('Registration attempt:', { email, password });

    // Simulate registration
    setTimeout(() => {
      console.log('Registration successful');
      toast({
        title: 'রেজিস্ট্রেশন সফল',
        description: 'আপনার অ্যাকাউন্ট তৈরি হয়েছে। এখন লগইন করতে পারেন।',
      });
      router.push('/login');
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
              <CardTitle className="font-display text-2xl">রেজিস্টার করুন</CardTitle>
              <CardDescription>নতুন অ্যাকাউন্ট তৈরি করুন</CardDescription>
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
                    placeholder="পাসওয়ার্ড লিখুন (কমপক্ষে ৬ অক্ষর)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <label className="font-body text-sm font-medium text-foreground mb-2 block">
                    পাসওয়ার্ড নিশ্চিত করুন *
                  </label>
                  <Input
                    type="password"
                    required
                    placeholder="পাসওয়ার্ড আবার লিখুন"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
                <Button type="submit" variant="elegant" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <UserPlus className="w-4 h-4 mr-2" />
                  )}
                  রেজিস্টার
                </Button>
                <p className="text-center text-sm text-muted-foreground">
                  ইতিমধ্যে অ্যাকাউন্ট আছে?{' '}
                  <Link href="/login" className="text-primary hover:underline">
                    লগইন করুন
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
