import { Calendar, MapPin, BookOpen, Award } from "lucide-react";
import { BiographyData } from "@/type/biography";
import { biographyData } from "@/data/siteData";

const iconMap: Record<string, any> = {
  calendar: Calendar,
  book: BookOpen,
  award: Award,
  mappin: MapPin,
};

interface BiographySectionProps {
  biography: BiographyData | null;
}

export function BiographySection({ biography }: BiographySectionProps) {
  // Normalize data to handle both API (snake_case) and static (camelCase) formats
  const apiData = biography as BiographyData | null;
  const staticData = biographyData as any;

  const arabicName = apiData?.arabic_name || staticData.arabicName;
  const englishName = apiData?.english_name || staticData.englishName;
  const fullName = apiData?.full_name || staticData.fullName;
  const title = apiData?.title || staticData.title;
  const description = apiData?.description || staticData.description;
  const timeline = apiData?.timeline || staticData.timeline;
  return (
    <section id="biography" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-secondary font-body text-sm tracking-widest uppercase">
            তাঁর মহান জীবন
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-foreground mt-4 mb-6">
            জীবনী
          </h2>
          <div className="flex items-center justify-center gap-4">
            <span className="w-12 h-px bg-secondary" />
            <span className="text-secondary">✦</span>
            <span className="w-12 h-px bg-secondary" />
          </div>
        </div>

        {/* Main Biography Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Portrait placeholder with Islamic frame */}
          <div className="relative">
            <div className="aspect-[3/4] bg-cream-dark rounded-lg overflow-hidden shadow-card relative">
              <div className="absolute inset-4 border-2 border-secondary/30 rounded" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="font-arabic text-5xl text-primary">م</span>
                  </div>
                  <p className="font-arabic text-2xl text-primary mb-2">
                    {arabicName}
                  </p>
                  <p className="text-muted-foreground font-body">
                    {englishName}
                  </p>
                </div>
              </div>
              {/* Corner ornaments */}
              <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-secondary/50" />
              <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-secondary/50" />
              <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-secondary/50" />
              <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-secondary/50" />
            </div>
          </div>

          {/* Biography Text */}
          <div>
            <h3 className="font-display text-2xl text-foreground mb-6">
              {fullName}
            </h3>
            <div className="space-y-4 font-body text-muted-foreground leading-relaxed">
              {description.map((para: string, index: number) => (
                <p key={index}>{para}</p>
              ))}
            </div>

            {/* Quick facts */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="p-4 bg-cream-dark rounded-lg">
                <span className="text-secondary text-sm font-body">
                  পূর্ণ নাম
                </span>
                <p className="text-foreground font-display mt-1">{fullName}</p>
              </div>
              <div className="p-4 bg-cream-dark rounded-lg">
                <span className="text-secondary text-sm font-body">উপাধি</span>
                <p className="text-foreground font-display mt-1">{title}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          <h3 className="font-display text-2xl text-foreground text-center mb-12">
            জীবনের গুরুত্বপূর্ণ ঘটনাবলী
          </h3>

          {/* Timeline line */}
          <div className="absolute left-1/2 top-20 bottom-0 w-px bg-border hidden md:block" />

          <div className="space-y-8 md:space-y-0">
            {timeline.map((event: any, index: number) => {
              const IconComponent =
                iconMap[event.icon_type || event.iconType] || Calendar;
              return (
                <div
                  key={event.year}
                  className={`relative md:grid md:grid-cols-2 md:gap-8 ${
                    index % 2 === 0 ? "" : "md:direction-rtl"
                  }`}
                >
                  <div
                    className={`${
                      index % 2 === 0
                        ? "md:text-right md:pr-12"
                        : "md:text-left md:pl-12 md:col-start-2"
                    }`}
                  >
                    <div className="bg-card p-6 rounded-lg shadow-card border border-border/50 hover:shadow-elegant transition-shadow duration-300">
                      <div
                        className={`flex items-center gap-3 mb-3 ${index % 2 === 0 ? "md:justify-end" : ""}`}
                      >
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <IconComponent className="w-5 h-5 text-primary" />
                        </div>
                        <span className="text-secondary font-display text-lg">
                          {event.year}
                        </span>
                      </div>
                      <h4 className="font-display text-xl text-foreground mb-2">
                        {event.title}
                      </h4>
                      <p className="font-body text-muted-foreground">
                        {event.description}
                      </p>
                    </div>
                  </div>

                  {/* Timeline dot */}
                  <div className="absolute left-1/2 top-8 -translate-x-1/2 w-4 h-4 rounded-full bg-secondary border-4 border-background hidden md:block" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
