import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight, Tag, User } from "lucide-react";
import Image from "next/image";

const featuredArticle = {
  id: 1,
  title: "The Enduring Legacy of Mujaddid Alf-e-Sani: A 400-Year Retrospective",
  excerpt:
    "As we commemorate four centuries since the passing of Imam Ahmad Sirhindi, scholars worldwide reflect on his transformative impact on Islamic thought and spirituality. His teachings on Tawheed continue to inspire millions across the globe.",
  image:
    "https://images.unsplash.com/photo-1585036156171-384164a8c675?w=800&h=400&fit=crop",
  author: "Editorial Team",
  date: "2024-12-15",
  readTime: "8 min read",
  category: "Legacy",
};

const articles = [
  {
    id: 2,
    title:
      "Annual Urs Celebrations at Sirhind Sharif Draw Thousands of Devotees",
    excerpt:
      "The annual commemoration of Hazrat Mujaddid's blessed departure witnessed an unprecedented gathering of spiritual seekers from across the subcontinent.",
    image:
      "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=400&h=300&fit=crop",
    author: "Ahmad Ali",
    date: "2024-12-10",
    readTime: "5 min read",
    category: "Events",
  },
  {
    id: 3,
    title: "New Translation of Maktubat Released in English",
    excerpt:
      "A comprehensive English translation of the first volume of Maktubat-e-Imam Rabbani has been released, making these precious teachings accessible to a wider audience.",
    image:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=300&fit=crop",
    author: "Dr. Sarah Williams",
    date: "2024-12-05",
    readTime: "4 min read",
    category: "Publications",
  },
  {
    id: 4,
    title: "International Conference on Naqshbandi Spirituality Announced",
    excerpt:
      "Leading Islamic universities will host a week-long conference exploring the spiritual teachings of the Naqshbandi-Mujaddidi order.",
    image:
      "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=400&h=300&fit=crop",
    author: "Conference Committee",
    date: "2024-11-28",
    readTime: "3 min read",
    category: "Announcements",
  },
  {
    id: 5,
    title: "Preservation Project: Digitizing Historical Manuscripts",
    excerpt:
      "A collaborative effort between archives in India, Pakistan, and Turkey aims to digitize rare manuscripts from the Mujaddidi tradition.",
    image:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop",
    author: "Heritage Foundation",
    date: "2024-11-20",
    readTime: "6 min read",
    category: "Heritage",
  },
  {
    id: 6,
    title: "Understanding Wahdat al-Shuhud: A Scholarly Analysis",
    excerpt:
      "An in-depth exploration of Imam Sirhindi's concept of Wahdat al-Shuhud (Unity of Witnessing) and its significance in Islamic metaphysics.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
    author: "Dr. Khalid Mahmood",
    date: "2024-11-15",
    readTime: "10 min read",
    category: "Articles",
  },
  {
    id: 7,
    title: "Youth Programs: Connecting New Generations with Sacred Heritage",
    excerpt:
      "Madrassas and Islamic centers worldwide are introducing specialized programs to teach young Muslims about the Mujaddidi legacy.",
    image:
      "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=400&h=300&fit=crop",
    author: "Education Team",
    date: "2024-11-10",
    readTime: "5 min read",
    category: "Education",
  },
];

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

export default function News() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-primary/10 to-background islamic-pattern">
        <div className="container mx-auto px-4 text-center">
          <span className="font-arabic text-2xl text-secondary mb-4 block">
            الأخبار والمقالات
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
            News & Articles
          </h1>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay updated with the latest news, scholarly articles, events, and
            announcements related to Hazrat Mujaddid Alf-e-Sani رحمة الله عليه
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
          <Card className="overflow-hidden border-border/50 shadow-card group">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative overflow-hidden">
                <Image
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  width={800}
                  height={400}
                  className="w-full h-full object-cover min-h-[300px] group-hover:scale-105 transition-transform duration-700"
                />
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
                  {featuredArticle.excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {featuredArticle.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(featuredArticle.date).toLocaleDateString(
                      "en-US",
                      {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      },
                    )}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {featuredArticle.readTime}
                  </span>
                </div>
                <Button variant="elegant" className="w-fit">
                  Read Full Article
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </div>
          </Card>
        </div>
      </section>

      {/* Section Divider */}
      <div className="section-divider" />

      {/* Articles Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-2xl font-bold text-foreground mb-8">
            Latest Articles
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <Card
                key={article.id}
                className="group overflow-hidden border-border/50 hover:shadow-elegant transition-all duration-500"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <Badge className="absolute top-3 left-3 bg-background/90 text-foreground text-xs">
                    {article.category}
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border/50">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(article.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Articles
            </Button>
          </div>
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
