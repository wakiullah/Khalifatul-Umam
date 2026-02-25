import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight } from "lucide-react";
import { articlesData } from "@/data/siteData";
import Link from "next/link";
import Image from "next/image";
import { NewsData } from "@/type/news";

interface LatestNewsProps {
  news: NewsData[];
}

export function LatestNews({ news }: LatestNewsProps) {
  // Filter published news and get latest 3, fallback to static data
  const publishedNews =
    news.filter((n) => n.is_published).length > 0
      ? news.filter((n) => n.is_published)
      : (articlesData as any);

  const latestNews = publishedNews.slice(0, 3);

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <span className="font-arabic text-xl text-secondary mb-2 block">
              أحدث الأخبار
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
              সর্বশেষ সংবাদ ও আপডেট
            </h2>
            <p className="font-body text-muted-foreground max-w-xl">
              অনুষ্ঠান, প্রকাশনা ও ঘোষণা সম্পর্কে অবগত থাকুন
            </p>
          </div>
          <Link href="/news">
            <Button variant="outline" className="mt-4 md:mt-0">
              সব সংবাদ দেখুন
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        {/* News Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {latestNews.map((article: any, index: number) => (
            <Card
              key={article._id || article.id}
              className="group overflow-hidden border-border/50 hover:shadow-elegant transition-all duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden h-48">
                {article.image_url || article.image ? (
                  <Image
                    src={article.image_url || article.image}
                    alt={article.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-700"
                    fill
                  />
                ) : (
                  <div className="w-full h-48 bg-muted flex items-center justify-center">
                    <Calendar className="w-12 h-12 text-muted-foreground" />
                  </div>
                )}
                <Badge className="absolute top-3 left-3 bg-secondary text-secondary-foreground">
                  {article.category}
                </Badge>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <Calendar className="w-4 h-4" />
                  {new Date(
                    article.published_at ||
                      article.createdAt ||
                      article.date ||
                      "2024-01-01",
                  ).toLocaleDateString("bn-BD")}
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground line-clamp-2">
                  {article.excerpt}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
