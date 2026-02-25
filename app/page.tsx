import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { BiographySection } from "@/components/BiographySection";
import { ContributionsSection } from "@/components/ContributionsSection";
import { SayingsSection } from "@/components/SayingsSection";
import { BooksSection } from "@/components/BooksSection";
import { LecturesSection } from "@/components/LecturesSection";
import { GallerySection } from "@/components/GallerySection";
import { DownloadsSection } from "@/components/DownloadsSection";
import { QuoteOfTheDay } from "@/components/QuoteOfTheDay";
import { LatestNews } from "@/components/LatestNews";
import { NewsletterSection } from "@/components/NewsletterSection";
import { Footer } from "@/components/Footer";
import { getBiographyData } from "@/services/biography.api";
import { getSayingsData } from "@/services/saying.api";
import { getBooksData } from "@/services/books.api";
import { getGalleryData } from "@/services/gallery.api";
import { getDownloadsData } from "@/services/downloads.api";
import { getNewsData } from "@/services/news.api";
import { getPostsData } from "@/services/posts.api";

const HomePage = async () => {
  // Fetch all data in parallel for better performance
  const [
    biographyResponse,
    sayingsResponse,
    booksResponse,
    galleryResponse,
    downloadsResponse,
    newsResponse,
    postsResponse,
  ] = await Promise.all([
    getBiographyData(),
    getSayingsData(),
    getBooksData(),
    getGalleryData(),
    getDownloadsData(),
    getNewsData(),
    getPostsData(),
  ]);

  // Extract data with fallbacks
  const biography = biographyResponse?.data || null;
  const sayings = sayingsResponse?.data || [];
  const books = booksResponse?.data || [];
  const gallery = galleryResponse?.data || [];
  const downloads = downloadsResponse?.data || [];
  const news = newsResponse?.data || [];
  const posts = postsResponse?.data || [];

  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />

      {/* Quote of the Day */}
      <QuoteOfTheDay sayings={sayings} />

      {/* Section Divider */}
      <div className="section-divider" />

      <BiographySection biography={biography} />

      <ContributionsSection />

      {/* Section Divider */}
      <div className="section-divider" />

      <SayingsSection sayings={sayings} />

      <BooksSection books={books} />

      {/* Section Divider */}
      <div className="section-divider" />

      <LecturesSection posts={posts} />

      {/* Photo Gallery */}
      <GallerySection gallery={gallery} />

      {/* Section Divider */}
      <div className="section-divider" />

      {/* Downloadable Resources */}
      <DownloadsSection downloads={downloads} />

      {/* Latest News */}
      <LatestNews news={news} />

      {/* Newsletter Signup */}
      <NewsletterSection />

      <Footer />
    </main>
  );
};

export default HomePage;
