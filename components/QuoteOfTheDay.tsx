"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, Share2, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { quotesOfTheDay } from "@/data/siteData";

export function QuoteOfTheDay() {
  const [currentQuote, setCurrentQuote] = useState(quotesOfTheDay[0]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Set initial quote based on day of year
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    setCurrentQuote(quotesOfTheDay[dayOfYear % quotesOfTheDay.length]);
  }, []);

  const refreshQuote = () => {
    console.log('Refreshing quote');
    setIsRefreshing(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * quotesOfTheDay.length);
      const newQuote = quotesOfTheDay[randomIndex];
      console.log('New quote selected:', newQuote);
      setCurrentQuote(newQuote);
      setIsRefreshing(false);
    }, 500);
  };

  const shareQuote = async () => {
    const shareText = `"${currentQuote.translation}"\n\n— হযরত মুজাদ্দিদে আলফে সানী\n${currentQuote.source}`;
    console.log('Sharing quote:', shareText);
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: "মুজাদ্দিদে আলফে সানীর বাণী",
          text: shareText,
        });
        console.log('Quote shared via native share');
      } catch (err) {
        console.log('Native share failed, copying to clipboard');
        copyToClipboard(shareText);
      }
    } else {
      console.log('Native share not available, copying to clipboard');
      copyToClipboard(shareText);
    }
  };

  const copyToClipboard = (text: string) => {
    console.log('Copying to clipboard:', text);
    navigator.clipboard.writeText(text);
    toast({
      title: "ক্লিপবোর্ডে কপি হয়েছে",
      description: "বাণীটি কপি হয়েছে। জ্ঞান শেয়ার করুন!",
    });
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <Card className="max-w-3xl mx-auto border-secondary/30 shadow-gold overflow-hidden">
          <CardContent className="p-0">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-primary/90 p-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <BookOpen className="w-5 h-5 text-secondary" />
                <span className="text-primary-foreground/80 font-body text-sm uppercase tracking-wider">
                  আজকের বাণী
                </span>
              </div>
              <span className="font-arabic text-secondary text-lg text-arabic">حكمة اليوم</span>
            </div>
            
            {/* Quote Content */}
            <div className={`p-8 md:p-12 text-center transition-opacity duration-300 ${isRefreshing ? 'opacity-50' : 'opacity-100'}`}>
              {/* Arabic Quote */}
              <p className="font-arabic text-2xl md:text-3xl text-foreground leading-relaxed mb-6 direction-rtl text-arabic">
                "{currentQuote.arabic}"
              </p>
              
              {/* Decorative Divider */}
              <div className="flex items-center justify-center gap-4 my-6">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-secondary" />
                <span className="text-secondary">✦</span>
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-secondary" />
              </div>
              
              {/* Translation */}
              <p className="font-body text-lg md:text-xl text-foreground/90 italic leading-relaxed mb-4">
                "{currentQuote.translation}"
              </p>
              
              {/* Source */}
              <p className="font-body text-sm text-muted-foreground">
                — {currentQuote.source}
              </p>
            </div>
            
            {/* Actions */}
            <div className="border-t border-border p-4 flex justify-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={refreshQuote}
                disabled={isRefreshing}
                className="text-muted-foreground hover:text-primary"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                নতুন বাণী
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={shareQuote}
                className="text-muted-foreground hover:text-primary"
              >
                <Share2 className="w-4 h-4 mr-2" />
                শেয়ার
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
