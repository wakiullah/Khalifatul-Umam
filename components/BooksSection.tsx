import { BookOpen, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";
import { booksData } from "@/data/siteData";
import { BookData } from "@/type/book";

interface BooksSectionProps {
  books: BookData[];
}

export function BooksSection({ books }: BooksSectionProps) {
  // Filter published books, fallback to static data
  const publishedBooks =
    books.filter((b) => b.is_published).length > 0
      ? books.filter((b) => b.is_published)
      : (booksData as any);

  const featuredBooks = publishedBooks.filter(
    (b: any) => b.is_featured || b.featured,
  );
  const otherBooks = publishedBooks.filter(
    (b: any) => !(b.is_featured || b.featured),
  );
  return (
    <section id="books" className="py-24 bg-cream-dark">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-secondary font-body text-sm tracking-widest uppercase">
            সাহিত্যকর্ম
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-foreground mt-4 mb-6">
            বইসমূহ ও রচনাবলী
          </h2>
          <div className="flex items-center justify-center gap-4">
            <span className="w-12 h-px bg-secondary" />
            <span className="text-secondary">✦</span>
            <span className="w-12 h-px bg-secondary" />
          </div>
          <p className="font-body text-muted-foreground max-w-2xl mx-auto mt-6">
            যে পাণ্ডিত্যপূর্ণ রচনাবলী জ্ঞান ও আধ্যাত্মিকতার সন্ধানীদের পথ দেখাতে
            থাকে
          </p>
        </div>

        {/* Featured Book */}
        {featuredBooks.map((book: any) => (
          <div key={book._id || book.title} className="mb-12">
            <div className="bg-primary rounded-lg p-8 md:p-12 grid md:grid-cols-2 gap-8 items-center">
              {/* Book Visual */}
              <div className="relative">
                <div className="aspect-[3/4] max-w-xs mx-auto bg-gradient-to-br from-secondary to-gold-light rounded-lg shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                  <div className="absolute inset-4 border-2 border-primary/20 rounded flex flex-col items-center justify-center p-6">
                    <BookOpen className="w-16 h-16 text-primary/80 mb-4" />
                    <p className="font-arabic text-2xl text-primary text-center leading-loose">
                      {book.arabic_title || book.arabicTitle}
                    </p>
                    <p className="font-display text-primary/80 text-center mt-2 text-sm">
                      {book.title}
                    </p>
                  </div>
                </div>
                {/* Shadow book */}
                <div className="absolute inset-0 max-w-xs mx-auto aspect-[3/4] bg-secondary/30 rounded-lg -rotate-3 -z-10 translate-x-4 translate-y-4" />
              </div>

              {/* Book Info */}
              <div className="text-primary-foreground">
                <span className="text-secondary font-body text-sm tracking-widest uppercase">
                  বৈশিষ্ট্যযুক্ত রচনা
                </span>
                <h3 className="font-display text-3xl md:text-4xl mt-2 mb-2">
                  {book.title}
                </h3>
                <p className="font-arabic text-xl text-secondary mb-6">
                  {book.arabic_title || book.arabicTitle}
                </p>
                <p className="font-body text-primary-foreground/80 leading-relaxed mb-6">
                  {book.description}
                </p>
                <div className="flex flex-wrap gap-4 mb-8">
                  <span className="px-4 py-2 bg-primary-foreground/10 rounded-full text-sm font-body">
                    {book.volumes}
                  </span>
                  <span className="px-4 py-2 bg-primary-foreground/10 rounded-full text-sm font-body">
                    {book.language}
                  </span>
                </div>
                <Button variant="hero" size="lg">
                  আরও জানুন
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        ))}

        {/* Other Books Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherBooks.map((book: any) => (
            <div
              key={book._id || book.title}
              className="group bg-card rounded-lg p-6 shadow-card border border-border/50 hover:shadow-elegant transition-all duration-300"
            >
              {/* Icon Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <span className="text-xs font-body text-muted-foreground bg-muted px-3 py-1 rounded-full">
                  {book.language}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-display text-xl text-foreground mb-1 group-hover:text-primary transition-colors">
                {book.title}
              </h3>
              <p className="font-arabic text-secondary text-lg mb-3">
                {book.arabicTitle || book.arabic_title}
              </p>

              {/* Description */}
              <p className="font-body text-muted-foreground text-sm leading-relaxed mb-4">
                {book.description}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-border/50">
                <span className="text-xs text-muted-foreground font-body">
                  {book.volumes}
                </span>
                <button className="text-primary text-sm font-body hover:text-secondary transition-colors flex items-center gap-1">
                  বিস্তারিত
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
