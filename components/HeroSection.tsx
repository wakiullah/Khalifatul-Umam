import { ChevronDown, Sparkles } from "lucide-react";
import { Button } from "./ui/button";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden"
    >
      {/* Background with Islamic pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/95 islamic-pattern" />

      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/70 to-primary opacity-90" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Decorative elements - improved positioning */}
      <div className="absolute top-10 left-4 md:top-20 md:left-10 w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 border border-secondary/20 rounded-full animate-float opacity-50 md:opacity-100" />
      <div
        className="absolute bottom-20 right-4 md:bottom-32 md:right-20 w-28 h-28 sm:w-32 sm:h-32 md:w-48 md:h-48 border border-secondary/10 rounded-full animate-float opacity-50 md:opacity-100"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute top-1/3 right-4 md:right-10 w-14 h-14 sm:w-16 sm:h-16 md:w-24 md:h-24 border border-secondary/15 rounded-full animate-float opacity-50 md:opacity-100"
        style={{ animationDelay: "4s" }}
      />
      <div
        className="absolute top-1/2 left-4 md:left-1/4 w-12 h-12 md:w-16 md:h-16 border border-secondary/10 rounded-full animate-float opacity-40 md:opacity-80"
        style={{ animationDelay: "1s" }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
        {/* Top badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 backdrop-blur-sm mb-6 md:mb-8 animate-fade-in">
          <Sparkles size={16} className="text-secondary" />
          <span className="text-secondary text-sm md:text-base font-body">
            আইয়ামুন নূর ৯ই রমাদান শরীফ{" "}
          </span>
          <Sparkles size={16} className="text-secondary" />
        </div>

        {/* Arabic/Bengali Subtitle */}
        <p
          className="text-secondary text-base sm:text-lg md:text-2xl mb-4 md:mb-6 animate-fade-in max-w-3xl mx-auto leading-relaxed px-4"
          style={{ animationDelay: "0.1s" }}
        >
          ছানীয়ে মুজাদ্দিদে আ’যম, আল মানছূর, আওলাদে রসূল
        </p>

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
          className=" text-lg md:text-2xl text-primary-foreground/80 mb-6 md:mb-8 animate-slide-up"
          style={{ animationDelay: "0.5s" }}
        >
          আলাইহিস সালাম
        </p>

        {/* Subtitle */}
        <p
          className="font-body text-sm sm:text-base md:text-lg lg:text-xl text-primary-foreground/80 max-w-4xl mx-auto mb-8 md:mb-12 leading-relaxed animate-slide-up px-6"
          style={{ animationDelay: "0.6s" }}
        >
          শুকরিয়ার ভাষা নেই পেয়েছি খলীফাতুল উমাম উনার বেমেছাল শানে পড়ি সলাত
          সালাম। <br className="hidden sm:block" />৯ রমাদ্বান মুবারক তাশরীফ ধন্য
          যমীন আসমান আলোড়িত সব উনার নূরে খুশি করি আশিকান।
        </p>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 animate-slide-up w-full max-w-md sm:max-w-none mx-auto px-4"
          style={{ animationDelay: "0.7s" }}
        >
          <Button
            variant="hero"
            size="lg"
            className="w-full sm:w-auto text-base md:text-lg h-12 md:h-14 px-6 md:px-8 shadow-lg hover:shadow-xl transition-shadow"
          >
            জীবনী জানুন
          </Button>
          <Button
            variant="elegant"
            size="lg"
            className="w-full sm:w-auto border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground text-base md:text-lg h-12 md:h-14 px-6 md:px-8 shadow-lg hover:shadow-xl transition-shadow"
          >
            শিক্ষা দেখুন
          </Button>
        </div>

        {/* Scroll indicator - now visible on mobile too but smaller */}
        <div className="absolute -bottom-8 sm:-bottom-12 md:-bottom-14 left-1/2 -translate-x-1/2 animate-bounce">
          <a
            href="#biography"
            className="flex flex-col items-center gap-1 text-primary-foreground/60 hover:text-secondary transition-colors group"
          >
            <span className="text-xs md:text-sm font-body opacity-0 group-hover:opacity-100 transition-opacity">
              স্ক্রল করুন
            </span>
            <ChevronDown size={24} className="sm:w-8 sm:h-8" />
          </a>
        </div>
      </div>
    </section>
  );
}
