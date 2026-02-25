import { BookOpen, Heart, Users, Shield, Sparkles, Star } from "lucide-react";
import { contributionsData } from "@/data/siteData";

const iconMap = {
  book: BookOpen,
  heart: Heart,
  users: Users,
  shield: Shield,
  sparkles: Sparkles,
  star: Star,
};

export function ContributionsSection() {
  return (
    <section id="contributions" className="py-24 bg-cream-dark islamic-pattern">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-secondary font-body text-sm tracking-widest uppercase">
            সাইয়্যিদুনা খলীফাতুল উমাম হযরত শাহজাদা হুযূর ক্বিবলা আলাইহিস সালাম
            উনার
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-foreground mt-4 mb-6">
            অবদান ও শিক্ষা
          </h2>
          <div className="flex items-center justify-center gap-4">
            <span className="w-12 h-px bg-secondary" />
            <span className="text-secondary">✦</span>
            <span className="w-12 h-px bg-secondary" />
          </div>
          <p className="font-body text-muted-foreground max-w-2xl mx-auto mt-6">
            সাইয়্যিদুনা খলীফাতুল উমাম হযরত শাহজাদা হুযূর ক্বিবলা উনার ইসলামী
            চিন্তা ও আধ্যাত্মিকতা গতিপথ নির্ধারণ করেছে।
          </p>
        </div>

        {/* Contributions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {contributionsData.map((item, index) => {
            const IconComponent = iconMap[item.iconType];
            return (
              <div
                key={item.title}
                className="group bg-card p-8 rounded-lg shadow-card border border-border/50 hover:shadow-elegant hover:-translate-y-1 transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                  <IconComponent className="w-7 h-7 text-primary" />
                </div>

                {/* Content */}
                <h3 className="font-display text-xl text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="font-body text-muted-foreground leading-relaxed">
                  {item.description}
                </p>

                {/* Decorative line */}
                <div className="mt-6 w-12 h-0.5 bg-secondary/50 group-hover:w-full transition-all duration-500" />
              </div>
            );
          })}
        </div>

        {/* Quote Banner */}
        <div className="mt-20 bg-primary rounded-lg p-8 md:p-12 text-center relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-32 h-32 border border-secondary/20 rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-48 h-48 border border-secondary/10 rounded-full translate-x-1/4 translate-y-1/4" />

          <div className="relative z-10">
            <span className="text-secondary text-4xl mb-6 block">"</span>
            <blockquote className="font-display text-xl md:text-2xl text-primary-foreground italic max-w-3xl mx-auto leading-relaxed">
              তাসাউফের উদ্দেশ্য অসাধারণ অবস্থা অর্জন করা নয়, বরং জীবনের প্রতিটি
              ক্ষেত্রে হুজুর পাক ﷺ-এর অনুসরণের পূর্ণতা অর্জন করা।
            </blockquote>
            <footer className="mt-6 text-primary-foreground/70 font-body">
              — সাইয়্যিদুনা খলীফাতুল উমাম আলাইহিস সালাম
            </footer>
          </div>
        </div>
      </div>
    </section>
  );
}
