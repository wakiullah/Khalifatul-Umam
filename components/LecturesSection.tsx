import { Play, Clock, Calendar, User } from "lucide-react";
import { Button } from "./ui/button";
import { lecturesData, featuredLecture } from "@/data/siteData";
import { PostData } from "@/type/post";

interface LecturesSectionProps {
  posts: PostData[];
}

export function LecturesSection({ posts }: LecturesSectionProps) {
  // Filter published posts/lectures, fallback to static data
  const publishedPosts =
    posts.filter((p: any) => p.is_published).length > 0
      ? posts.filter((p: any) => p.is_published)
      : lecturesData;

  const featured: any =
    publishedPosts.find((p: any) => p.is_featured) || featuredLecture;
  const displayLectures: any[] = publishedPosts
    .filter((p: any) => !p.is_featured)
    .slice(0, 6);
  return (
    <section id="lectures" className="py-24 bg-background islamic-pattern">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-secondary font-body text-sm tracking-widest uppercase">
            ওয়াজ শরীফ
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-foreground mt-4 mb-6">
            মুবারক নসিহত ও ওয়াজ শরীফ
          </h2>
          <div className="flex items-center justify-center gap-4">
            <span className="w-12 h-px bg-secondary" />
            <span className="text-secondary">✦</span>
            <span className="w-12 h-px bg-secondary" />
          </div>
          <p className="font-body text-muted-foreground max-w-2xl mx-auto mt-6">
            সাইয়্যিদুনা খলীফাতুল উমাম হযরত শাহজাদা হুযূর ক্বিবলা আলাইহিস সালাম
            উনার পাণ্ডিত্যপূর্ণ মুবারক নসিহত ও আলোচনা
          </p>
        </div>

        {/* Featured Lecture */}
        <div className="mb-12">
          <div className="relative rounded-xl overflow-hidden shadow-card group cursor-pointer">
            <div className="aspect-video bg-gradient-to-br from-primary to-emerald-light relative">
              {/* Pattern overlay */}
              <div className="absolute inset-0 islamic-pattern opacity-30" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                <div className="w-20 h-20 rounded-full bg-secondary/20 backdrop-blur-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
                    <Play className="w-8 h-8 text-secondary-foreground ml-1" />
                  </div>
                </div>
                <h3 className="font-display text-2xl md:text-3xl text-primary-foreground mb-2">
                  {featured.title}
                </h3>
                <p className="font-body text-primary-foreground/70 mb-4">
                  {featured.excerpt ||
                    "সাইয়্যিদুনা খলীফাতুল উমাম হযরত শাহজাদা হুযূর ক্বিবলা আলাইহিস সালাম উনার পাণ্ডিত্যপূর্ণ মুবারক নসিহত ও আলোচনা"}
                </p>
                <div className="flex items-center gap-6 text-primary-foreground/60 text-sm">
                  <span className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {featured.speaker || "বক্তা"}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {featured.duration}
                  </span>
                </div>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-foreground/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>
        </div>

        {/* Lectures Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayLectures.map((lecture) => (
            <div
              key={lecture._id || lecture.title}
              className="group bg-card rounded-lg overflow-hidden shadow-card border border-border/50 hover:shadow-elegant transition-all duration-300"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video bg-gradient-to-br from-primary/80 to-emerald-light cursor-pointer">
                <div className="absolute inset-0 islamic-pattern opacity-20" />

                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-secondary/90 flex items-center justify-center shadow-gold group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-6 h-6 text-secondary-foreground ml-1" />
                  </div>
                </div>

                {/* Duration badge */}
                {lecture.read_time && (
                  <div className="absolute bottom-3 right-3 bg-foreground/80 text-background text-xs px-2 py-1 rounded font-body">
                    {lecture.read_time}
                  </div>
                )}

                {/* Views badge */}
                {lecture.views && (
                  <div className="absolute top-3 right-3 bg-secondary/90 text-secondary-foreground text-xs px-2 py-1 rounded font-body">
                    {lecture.views} ভিউ
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-display text-lg text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {lecture.title}
                </h3>

                <div className="flex items-center gap-4 text-sm text-muted-foreground font-body">
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {lecture.author_name || "বক্তা"}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(
                      lecture.published_at || lecture.createdAt,
                    ).toLocaleDateString("bn-BD")}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button variant="elegant" size="lg">
            সব বক্তৃতা দেখুন
          </Button>
        </div>
      </div>
    </section>
  );
}
