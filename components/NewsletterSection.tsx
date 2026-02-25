"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      console.log("Newsletter subscription:", { email });
      setIsSubscribed(true);
      toast({
        title: "সফলভাবে সাবস্ক্রাইব হয়েছে!",
        description: "জাযাকাল্লাহ খাইর! শীঘ্রই আপনি আমাদের আপডেট পাবেন।",
      });
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    } else {
      console.log("Newsletter subscription failed: No email provided");
    }
  };

  return (
    <section className="py-20 bg-primary relative overflow-hidden">
      {/* Decorative Pattern */}
      <div className="absolute inset-0 islamic-pattern opacity-10" />

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Icon */}
          <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-secondary" />
          </div>

          {/* Arabic Text */}
          <span className="font-arabic text-2xl text-secondary mb-4 block">
            ابق على اتصال
          </span>

          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            সংযুক্ত থাকুন
          </h2>

          <p className="font-body text-lg text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            সাইয়্যিদুনা খলীফাতুল উমাম হযরত শাহজাদা হুযূর ক্বিবলা আলাইহিস সালাম
            এর জীবনী, অবদান ও বক্তৃতার আপডেট পেতে সাবস্ক্রাইব করুন।
          </p>

          {/* Subscription Form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
          >
            <div className="flex-1 relative">
              <Input
                type="email"
                required
                placeholder="আপনার ইমেইল ঠিকানা লিখুন"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:ring-secondary focus:border-secondary"
              />
            </div>
            <Button
              type="submit"
              variant="secondary"
              size="lg"
              className="h-12 px-8"
              disabled={isSubscribed}
            >
              {isSubscribed ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  সাবস্ক্রাইব হয়েছে!
                </>
              ) : (
                "সাবস্ক্রাইব"
              )}
            </Button>
          </form>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-primary-foreground/60">
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-secondary" />
              সাপ্তাহিক আপডেট
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-secondary" />
              কোনো স্প্যাম নেই
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-secondary" />
              যেকোনো সময় আনসাবস্ক্রাইব
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
