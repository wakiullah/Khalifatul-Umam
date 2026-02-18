"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Logo from '@/public/logo.png'

const navLinks = [
  { name: "হোম", href: "/" },
  { name: "জীবনী", href: "/#biography" },
  { name: "অবদান", href: "/#contributions" },
  { name: "বাণীসমূহ", href: "/#sayings" },
  { name: "বইসমূহ", href: "/#books" },
  { name: "বক্তৃতা", href: "/#lectures" },
  { name: "গ্যালারি", href: "/#gallery" },
  { name: "সংবাদ", href: "/news" },
  { name: "ফোরাম", href: "/forum" },
  { name: "মতামত", href: "/opinions" },
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

  return (
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
              <h1 className={`font-display text-lg font-semibold leading-tight ${
                isScrolled ? "text-foreground" : "text-white"
              }`}>
                খলিফাতুল উমাম
              </h1>
              <p className={`text-xs text-arabic ${
                isScrolled ? "text-muted-foreground" : "text-white/80"
              }`}>عليه السلام</p>
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
                      isScrolled ? "text-foreground/80 hover:text-primary" : "text-white/90 hover:text-white"
                    } font-body text-sm tracking-wide transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-secondary hover:after:w-full after:transition-all after:duration-300`}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <a
                    href={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className={`${
                      isScrolled ? "text-foreground/80 hover:text-primary" : "text-white/90 hover:text-white"
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
            className={`lg:hidden p-2 ${isScrolled ? "text-foreground" : "text-white"}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 py-6 border-t border-border animate-fade-in">
            <ul className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  {isPageLink(link.href) ? (
                    <Link
                      href={link.href}
                      className={`block font-body text-lg py-2 transition-colors duration-300 ${
                        isScrolled ? "text-foreground/80 hover:text-primary" : "text-white/90 hover:text-white"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className={`block font-body text-lg py-2 transition-colors duration-300 ${
                        isScrolled ? "text-foreground/80 hover:text-primary" : "text-white/90 hover:text-white"
                      }`}
                      onClick={() => handleNavClick(link.href)}
                    >
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
            <Link href="/opinions" className="block mt-6">
              <Button variant="elegant" className="w-full">
                মতামত দিন
              </Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
