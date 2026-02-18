import { ChevronDown } from "lucide-react";
import { Button } from "./ui/button";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background with Islamic pattern */}
      <div className="absolute inset-0 bg-primary islamic-pattern" />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-primary/90 via-primary/80 to-primary" />

      {/* Decorative elements */}
      <div className="absolute top-10 left-[-20px] md:top-20 md:left-10 w-24 h-24 md:w-32 md:h-32 border border-secondary/20 rounded-full animate-float opacity-60 md:opacity-100" />
      <div
        className="absolute bottom-20 right-[-20px] md:bottom-32 md:right-20 w-32 h-32 md:w-48 md:h-48 border border-secondary/10 rounded-full animate-float opacity-60 md:opacity-100"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute top-1/3 right-[-10px] md:right-10 w-16 h-16 md:w-24 md:h-24 border border-secondary/15 rounded-full animate-float opacity-60 md:opacity-100"
        style={{ animationDelay: "4s" }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Arabic Bismillah */}
        <p className="font-arabic text-secondary text-xl md:text-3xl mb-4 md:mb-6 animate-fade-in max-w-2xl mx-auto leading-relaxed">
         ছানীয়ে মুজাদ্দিদে আ’যম, আল
          মানছূর, আওলাদে রসূল
        </p>

        {/* Title ornament */}
        <div
          className="flex items-center justify-center gap-3 md:gap-4 mb-6 md:mb-8 animate-slide-up"
          style={{ animationDelay: "0.2s" }}
        >
          <span className="w-12 md:w-24 h-px bg-gradient-to-r from-transparent to-secondary" />
          <span className="text-secondary text-xl md:text-2xl">✦</span>
          <span className="w-12 md:w-24 h-px bg-gradient-to-l from-transparent to-secondary" />
        </div>

        {/* Main Title */}
        <h1
          className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-primary-foreground mb-3 md:mb-4 animate-slide-up leading-tight"
          style={{ animationDelay: "0.3s" }}
        >
          সাইয়্যিদুনা খলীফাতুল উমাম
        </h1>

        <h2
          className="font-display text-xl sm:text-3xl lg:text-4xl text-secondary mb-4 md:mb-6 animate-slide-up"
          style={{ animationDelay: "0.4s" }}
        >
          হযরত শাহজাদা হুযূর ক্বিবলা
        </h2>

        <p
          className="font-arabic text-lg md:text-2xl text-primary-foreground/80 mb-6 md:mb-8 animate-slide-up"
          style={{ animationDelay: "0.5s" }}
        >
          আলাইহিস সালাম
        </p>

        {/* Subtitle */}
        <p
          className="font-body text-base md:text-xl text-primary-foreground/70 max-w-3xl mx-auto mb-8 md:mb-12 leading-relaxed animate-slide-up px-2"
          style={{ animationDelay: "0.6s" }}
        >
          শুকরিয়ার ভাষা নেই পেয়েছি খলীফাতুল উমাম উনার বেমেছাল শানে পড়ি সলাত
          সালাম। <br className="hidden md:block" />৯ রমাদ্বান মুবারক তাশরীফ ধন্য যমীন আসমান আলোড়িত সব উনার
          নূরে খুশি করি আশিকান।
        </p>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 animate-slide-up w-full sm:w-auto px-4 sm:px-0"
          style={{ animationDelay: "0.7s" }}
        >
          <Button variant="hero" size="lg" className="w-full sm:w-auto text-lg h-12 md:h-14">
            Explore His Life
          </Button>
          <Button
            variant="elegant"
            size="lg"
            className="w-full sm:w-auto border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground text-lg h-12 md:h-14"
          >
            View Teachings
          </Button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
          <a
            href="#biography"
            className="text-primary-foreground/50 hover:text-secondary transition-colors"
          >
            <ChevronDown size={32} />
          </a>
        </div>
      </div>
    </section>
  );
}
