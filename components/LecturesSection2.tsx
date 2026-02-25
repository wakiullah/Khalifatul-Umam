import { Play, Clock, Calendar, User } from "lucide-react";
import { Button } from "./ui/button";
import { lecturesData, featuredLecture } from "@/data/siteData";
import { PostData } from "@/type/post";
import Image from "next/image";

interface LecturesSectionProps {
  posts: PostData[];
}

export function LecturesSection2({ posts }: LecturesSectionProps) {
  // Filter published posts/lectures, fallback to static data
  const publishedPosts =
    posts.filter((p: any) => p.status === "published").length > 0
      ? posts.filter((p: any) => p.status === "published")
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
            পোস্টসমূহ
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-foreground mt-4 mb-6">
           সমসাময়িক পোস্টসমূহ
          </h2>
          <div className="flex items-center justify-center gap-4">
            <span className="w-12 h-px bg-secondary" />
            <span className="text-secondary">✦</span>
            <span className="w-12 h-px bg-secondary" />
          </div>
          <p className="font-body text-muted-foreground max-w-2xl mx-auto mt-6">
            সমসাময়িক বিষয় নিয়ে পোস্টসমূহ
          </p>
        </div>

        {/* Featured Lecture */}
        <div className="mb-12 max-w-4xl mx-auto">
          <div className="relative rounded-xl overflow-hidden shadow-card group cursor-pointer">
            <div className="aspect-video bg-gradient-to-br from-primary to-emerald-light relative">
              {/* Pattern overlay */}
              {featured.image_url ? (
                <>
                  <Image
                    src={featured.image_url}
                    alt={featured.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />
                </>
              ) : (
                <div className="absolute inset-0 islamic-pattern opacity-30" />
              )}

              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
              
                <h3 className="font-display text-xl md:text-2xl text-primary-foreground mb-2">
                  {featured.title}
                </h3>
                {/* <p className="font-body text-primary-foreground/70 mb-4">
                  {featured.content ||
                    "সাইয়্যিদুনা খলীফাতুল উমাম হযরত শাহজাদা হুযূর ক্বিবলা আলাইহিস সালাম উনার পাণ্ডিত্যপূর্ণ মুবারক নসিহত ও আলোচনা"}
                </p> */}
                <div className="flex items-center gap-6 text-primary-foreground/60 text-sm">
                  <span className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {featured.author_name || "বক্তা"}
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
              <div className="relative aspect-video bg-gradient-to-br from-primary/80 to-emerald-light cursor-pointer overflow-hidden">
                {lecture.image_url ? (
                  <Image
                    src={lecture.image_url}
                    alt={lecture.title}
                    width={500}
                    height={300}className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 islamic-pattern opacity-20" />
                )}

            

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
