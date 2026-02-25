import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  ArrowRight,
  Tag,
  User,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getNewsData } from "@/services/news.api";

const categories = [
  "All",
  "Legacy",
  "Events",
  "Publications",
  "Announcements",
  "Heritage",
  "Articles",
  "Education",
];

// Force dynamic rendering to ensure fresh data on each page
export const dynamic = "force-dynamic";

export default async function News(props: {
  searchParams: Promise<{ page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams.page) || 1;
  const limit = 9; // 1 featured + 8 grid items per page

  console.log("News Page - Current page:", currentPage, "Limit:", limit);

  // Fetch news data from API with pagination
  const newsResponse = await getNewsData(currentPage, limit);
  const allNews = newsResponse.data || [];
  const totalPages = newsResponse.pages || 1;

  // Filter published news
  const publishedNews = allNews.filter((n) => n.is_published);

  // Get featured article (first featured news or first published news)
  const featuredArticle =
    publishedNews.find((n) => n.is_featured) || publishedNews[0];

  // Get other articles (exclude featured)
  const articles = publishedNews
    .filter((n) => n._id !== featuredArticle?._id)
    .slice(0, 8);

  console.log("Fetched news data:", {
    newsResponse,
  });
  return (
    <>
      {/* Hero Section */}
      <section
        id="news-top"
        className="pt-32 pb-16 bg-gradient-to-b from-primary/10 to-background islamic-pattern"
      >
        <div className="container mx-auto px-4 text-center">
          <span className="font-arabic text-2xl text-secondary mb-4 block">
            الأخبار والمقالات
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
            সংবাদ ও প্রবন্ধসমূহ
          </h1>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            সংবাদ ও প্রবন্ধসমূহ সম্পর্কে আপনার সবচেয়ে নতুন এবং গুরুত্বপূর্ণ
            তথ্য
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category, index) => (
              <Button
                key={category}
                variant={index === 0 ? "elegant" : "outline"}
                size="sm"
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {featuredArticle && (
            <Card className="overflow-hidden border-border/50 shadow-card group py-0 ">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative overflow-hidden aspect-video md:aspect-auto">
                  {featuredArticle.image_url ? (
                    <Image
                      src={featuredArticle.image_url}
                      alt={featuredArticle.title}
                      fill
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                      <Calendar className="w-20 h-20 text-muted-foreground" />
                    </div>
                  )}
                  <Badge className="absolute top-4 left-4 bg-secondary text-secondary-foreground">
                    Featured
                  </Badge>
                </div>
                <CardContent className="p-8 flex flex-col justify-center">
                  <Badge variant="outline" className="w-fit mb-4">
                    <Tag className="w-3 h-3 mr-1" />
                    {featuredArticle.category}
                  </Badge>
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                    {featuredArticle.title}
                  </h2>
                  <p className="font-body text-muted-foreground leading-relaxed mb-6">
                    {featuredArticle.excerpt || "No description available"}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                    {featuredArticle.author && (
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {featuredArticle.author}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(
                        featuredArticle.published_at ||
                          featuredArticle.createdAt,
                      ).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    {featuredArticle.read_time && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {featuredArticle.read_time}
                      </span>
                    )}
                  </div>
                  <Button variant="elegant" className="w-fit">
                    Read Full Article
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </div>
            </Card>
          )}
        </div>
      </section>

      {/* Section Divider */}
      <div className="section-divider" />

      {/* Articles Grid */}
      <section className="pb-12 ">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-2xl font-bold text-foreground mb-8">
            Latest Articles
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <Card
                key={article._id}
                className="group overflow-hidden border-border/50 hover:shadow-elegant transition-all pt-0 duration-500 "
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative overflow-hidden aspect-video">
                  {article.image_url ? (
                    <Image
                      src={article.image_url}
                      alt={article.title}
                      fill
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                      <Calendar className="w-12 h-12 text-muted-foreground" />
                    </div>
                  )}
                  <Badge className="absolute top-3 left-3 bg-background/90 text-foreground text-xs">
                    {article.category}
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                    {article.excerpt || "No description available"}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border/50">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(
                        article.published_at || article.createdAt,
                      ).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    {article.read_time && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {article.read_time}
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12">
              {/* Previous Button */}
              <Link
                href={`/news?page=${currentPage - 1}#news-top`}
                scroll={true}
                className={
                  currentPage === 1 ? "pointer-events-none opacity-50" : ""
                }
              >
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  পূর্ববর্তী
                </Button>
              </Link>

              {/* Page Numbers */}
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (pageNum) => {
                    // Show first page, last page, current page, and pages around current
                    if (
                      pageNum === 1 ||
                      pageNum === totalPages ||
                      (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                    ) {
                      return (
                        <Link
                          key={pageNum}
                          href={`/news?page=${pageNum}#news-top`}
                          scroll={true}
                        >
                          <Button
                            variant={
                              pageNum === currentPage ? "elegant" : "outline"
                            }
                            size="sm"
                            className="min-w-10"
                          >
                            {pageNum}
                          </Button>
                        </Link>
                      );
                    } else if (
                      pageNum === currentPage - 2 ||
                      pageNum === currentPage + 2
                    ) {
                      return (
                        <span
                          key={pageNum}
                          className="px-2 text-muted-foreground"
                        >
                          ...
                        </span>
                      );
                    }
                    return null;
                  },
                )}
              </div>

              {/* Next Button */}
              <Link
                href={`/news?page=${currentPage + 1}#news-top`}
                scroll={true}
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              >
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === totalPages}
                >
                  পরবর্তী
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <span className="font-arabic text-xl text-secondary mb-2 block">
              اشترك معنا
            </span>
            <h2 className="font-display text-3xl font-bold text-primary-foreground mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p className="font-body text-primary-foreground/80 mb-8">
              Receive the latest articles, event announcements, and spiritual
              insights directly in your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-secondary"
              />
              <Button variant="secondary" size="lg">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
