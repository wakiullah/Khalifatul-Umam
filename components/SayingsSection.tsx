import { Quote } from "lucide-react";
import { sayingsData, featuredSaying } from "@/data/siteData";

export function SayingsSection() {
  return (
    <section id="sayings" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-secondary font-body text-sm tracking-widest uppercase">
            জ্ঞানের বাণী
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-foreground mt-4 mb-6">
            বাণীসমূহ
          </h2>
          <div className="flex items-center justify-center gap-4">
            <span className="w-12 h-px bg-secondary" />
            <span className="text-secondary">✦</span>
            <span className="w-12 h-px bg-secondary" />
          </div>
          <p className="font-body text-muted-foreground max-w-2xl mx-auto mt-6">
            মুজাদ্দিদে আলফে সানীর পত্রাবলী ও শিক্ষা থেকে চিরন্তন জ্ঞান
          </p>
        </div>

        {/* Sayings Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sayingsData.map((saying, index) => (
            <div
              key={index}
              className="group relative bg-card rounded-lg p-6 shadow-card border border-border/50 hover:shadow-elegant transition-all duration-300 text-center"
            >
              {/* Quote icon */}
              <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-secondary flex items-center justify-center shadow-gold">
                <Quote className="w-4 h-4 text-secondary-foreground" />
              </div>

              {/* Arabic text */}
              <p className="font-arabic text-xl md:text-2xl text-primary text-center leading-loose mb-4 pt-2 text-arabic">
                {saying.arabic}
              </p>

              {/* Divider */}
              <div className="w-full h-px bg-gradient-to-r from-transparent via-secondary/50 to-transparent my-4" />

              {/* Translation */}
              <p className="font-display text-lg text-foreground italic mb-3">
                "{saying.translation}"
              </p>

              {/* Context */}
              <p className="font-body text-sm text-muted-foreground">
                {saying.context}
              </p>

              {/* Hover accent */}
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-secondary group-hover:w-full transition-all duration-500 rounded-b-lg" />
            </div>
          ))}
        </div>

        {/* Featured Quote */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="relative bg-gradient-to-br from-primary to-emerald-light rounded-lg p-8 md:p-12 text-center">
            {/* Decorative corners */}
            <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-secondary/50" />
            <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-secondary/50" />
            <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-secondary/50" />
            <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-secondary/50" />

            <p className=" text-2xl md:text-3xl text-secondary mb-6 leading-loose text-arabic">
              {featuredSaying.arabic}
            </p>
            <p className="font-display text-xl md:text-2xl text-primary-foreground italic mb-4">
              "{featuredSaying.translation}"
            </p>
            <p className="font-body text-primary-foreground/70">
              — {featuredSaying.source}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
