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

const HomePage = () => {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />

      {/* Quote of the Day */}
      <QuoteOfTheDay />

      {/* Section Divider */}
      <div className="section-divider" />

      <BiographySection />

      <ContributionsSection />

      {/* Section Divider */}
      <div className="section-divider" />

      <SayingsSection />

      <BooksSection />

      {/* Section Divider */}
      <div className="section-divider" />

      <LecturesSection />

      {/* Photo Gallery */}
      <GallerySection />

      {/* Section Divider */}
      <div className="section-divider" />

      {/* Downloadable Resources */}
      <DownloadsSection />

      {/* Latest News */}
      <LatestNews />

      {/* Newsletter Signup */}
      <NewsletterSection />

      <Footer />
    </main>
  );
};

export default HomePage;
