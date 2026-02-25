"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Send, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { createOpinion } from "@/services/opinions.api";
import { CreateOpinionRequest } from "@/type/opinions";

export default function OpinionForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<CreateOpinionRequest>({
    name: "",
    email: "",
    location: "",
    title: "",
    opinion: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    console.log("Submitting opinion form with data:", formData);

    try {
      const res = await createOpinion(formData);

      console.log("Opinion creation response:", res);

      if (res.success) {
        toast({
          title: "মতামত জমা হয়েছে",
          description: "জাযাকাল্লাহু খাইরান! আপনার মতামত জমা দেওয়া হয়েছে।",
        });
        setFormData({
          name: "",
          email: "",
          location: "",
          title: "",
          opinion: "",
        });
        router.refresh();
      } else {
        console.error("API returned success: false", res);
        throw new Error("Failed to submit opinion");
      }
    } catch (error) {
      console.error("Error submitting opinion:", error);
      toast({
        title: "ত্রুটি",
        description: "মতামত জমা দিতে সমস্যা হয়েছে। আবার চেষ্টা করুন।",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <span className="font-arabic text-xl text-secondary mb-2 block">
              شاركنا رأيك
            </span>
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">
              আপনার মতামত শেয়ার করুন
            </h2>
            <p className="font-body text-muted-foreground">
          
            </p>
          </div>

          <Card className="border-border/50 shadow-card">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="font-body text-sm font-medium text-foreground mb-2 block">
                      আপনার নাম *
                    </label>
                    <Input
                      required
                      placeholder="আপনার নাম লিখুন"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="bg-background"
                      disabled={isLoading}
                    />
                  </div>
                  <div>
                    <label className="font-body text-sm font-medium text-foreground mb-2 block">
                      পদবী
                    </label>
                    <Input
                      placeholder="আপনার পদবী লিখুন"
                      value={formData.title || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      className="bg-background"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="font-body text-sm font-medium text-foreground mb-2 block">
                      অবস্থান
                    </label>
                    <Input
                      placeholder="শহর, দেশ"
                      value={formData.location || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                      className="bg-background"
                      disabled={isLoading}
                    />
                  </div>
                  <div>
                    <label className="font-body text-sm font-medium text-foreground mb-2 block">
                      ইমেইল ঠিকানা *
                    </label>
                    <Input
                      type="email"
                      required
                      placeholder="আপনার ইমেইল লিখুন"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="bg-background"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div>
                  <label className="font-body text-sm font-medium text-foreground mb-2 block">
                    আপনার মতামত *
                  </label>
                  <Textarea
                    required
                    rows={6}
                    placeholder="আপনার চিন্তাভাবনা শেয়ার করুন..."
                    value={formData.opinion}
                    onChange={(e) =>
                      setFormData({ ...formData, opinion: e.target.value })
                    }
                    className="bg-background resize-none"
                    disabled={isLoading}
                  />
                </div>

                <Button
                  type="submit"
                  variant="elegant"
                  size="lg"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      জমা দেওয়া হচ্ছে...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      মতামত জমা দিন
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
