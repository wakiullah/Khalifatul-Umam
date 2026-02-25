"use client";

import { useState, useEffect } from "react";
import {
  Menu,
  X,
  Home,
  User,
  BookOpen,
  MessageSquare,
  Image as ImageIcon,
  Newspaper,
  MessageCircle,
  Send,
  ChevronRight,
} from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Logo from "@/public/logo.png";

const navLinks = [
  { name: "হোম", href: "/", icon: Home },
  { name: "জীবনী", href: "/#biography", icon: User },
  { name: "বাণীসমূহ", href: "/#sayings", icon: MessageSquare },
  { name: "বইসমূহ", href: "/#books", icon: BookOpen },
  { name: "গ্যালারি", href: "/#gallery", icon: ImageIcon },
  { name: "সংবাদ", href: "/news", icon: Newspaper },
  { name: "ফোরাম", href: "/forum", icon: MessageCircle },
  { name: "সদস্য ফরম", href: "/member", icon: MessageCircle },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);

    // If it's a hash link and we're on the home page, scroll to section
    if (href.startsWith("/#") && pathname === "/") {
      const element = document.querySelector(href.replace("/", ""));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const isPageLink = (href: string) => {
    return (
      href === "/" ||
      href === "/news" ||
      href === "/opinions" ||
      href === "/forum"
    );
  };

  const isHeaderSolid = isScrolled || pathname !== "/";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-background/95 backdrop-blur-md shadow-elegant py-3"
            : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-12 h-12 rounded-full flex items-center justify-center">
                <Image src={Logo} alt="Logo" width={48} height={48} />
              </div>
              <div className="hidden sm:block">
                <h1
                  className={`font-display text-lg font-semibold leading-tight ${
                    isHeaderSolid ? "text-foreground" : "text-white"
                  }`}
                >
                  খলীফাতুল উমাম
                </h1>
                <p
                  className={`text-xs text-arabic ${
                    isHeaderSolid ? "text-muted-foreground" : "text-white/80"
                  }`}
                >
                  عليه السلام
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <ul className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <li key={link.name}>
                  {isPageLink(link.href) ? (
                    <Link
                      href={link.href}
                      className={`${
                        isHeaderSolid
                          ? "text-foreground/80 hover:text-primary"
                          : "text-white/90 hover:text-white"
                      } font-body text-sm tracking-wide transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-secondary hover:after:w-full after:transition-all after:duration-300`}
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      onClick={() => handleNavClick(link.href)}
                      className={`${
                        isHeaderSolid
                          ? "text-foreground/80 hover:text-primary"
                          : "text-white/90 hover:text-white"
                      } font-body text-sm tracking-wide transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-secondary hover:after:w-full after:transition-all after:duration-300`}
                    >
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <Link href="/opinions">
              <Button variant="elegant" size="sm" className="hidden lg:flex">
                মতামত দিন
              </Button>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                isHeaderSolid
                  ? "text-foreground hover:bg-primary/10"
                  : "text-white hover:bg-white/10"
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] animate-fade-in"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Drawer */}
      <div
        className={`lg:hidden fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-background shadow-2xl z-[70] transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Menu Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center">
              <Image src={Logo} alt="Logo" width={40} height={40} />
            </div>
            <div>
              <h2 className="font-display text-base font-semibold text-foreground">
                খলিফাতুল উমাম
              </h2>
              <p className="text-xs text-arabic text-muted-foreground">
                عليه السلام
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
            aria-label="Close menu"
          >
            <X size={20} className="text-foreground" />
          </button>
        </div>

        {/* Menu Links */}
        <nav className="p-4 overflow-y-auto max-h-[calc(100vh-180px)]">
          <ul className="space-y-1">
            {navLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <li
                  key={link.name}
                  style={{ animationDelay: `${index * 50}ms` }}
                  className="animate-slide-in-right"
                >
                  {isPageLink(link.href) ? (
                    <Link
                      href={link.href}
                      className="flex items-center gap-3 px-4 py-3.5 rounded-lg text-foreground/80 hover:text-primary hover:bg-primary/5 transition-all duration-200 group"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Icon
                        size={20}
                        className="text-primary/70 group-hover:text-primary transition-colors"
                      />
                      <span className="font-body text-base flex-1">
                        {link.name}
                      </span>
                      <ChevronRight
                        size={16}
                        className="text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-1 transition-all"
                      />
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="flex items-center gap-3 px-4 py-3.5 rounded-lg text-foreground/80 hover:text-primary hover:bg-primary/5 transition-all duration-200 group"
                      onClick={() => handleNavClick(link.href)}
                    >
                      <Icon
                        size={20}
                        className="text-primary/70 group-hover:text-primary transition-colors"
                      />
                      <span className="font-body text-base flex-1">
                        {link.name}
                      </span>
                      <ChevronRight
                        size={16}
                        className="text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-1 transition-all"
                      />
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Menu Footer with CTA */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border bg-background">
          <Link
            href="/opinions"
            className="block cursor-pointer"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Button variant="elegant" className="w-full cursor-pointer h-12 text-base gap-2">
              <Send size={18} />
              মতামত দিন
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
