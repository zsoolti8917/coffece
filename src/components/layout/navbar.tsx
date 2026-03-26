"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { LanguageToggle } from "./language-toggle";
import { MobileNav } from "./mobile-nav";

export function Navbar({ onOrderClick }: { onOrderClick: () => void }) {
  const t = useTranslations("nav");
  const { theme, setTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/original" as const, label: t("original") },
    { href: "/zlaty-standard" as const, label: t("zlaty") },
    { href: "/faq" as const, label: t("faq") },
    { href: "/contact" as const, label: t("contact") },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between h-16 px-4 lg:px-8">
        <Link href="/" className="flex-shrink-0">
          <Image
            src={
              scrolled
                ? "/images/logos/coffece-logo-black.png"
                : "/images/logos/coffece-logo-white.png"
            }
            alt="Coffece"
            width={120}
            height={40}
            className="h-8 w-auto dark:hidden"
            priority
          />
          <Image
            src="/images/logos/coffece-logo-white.png"
            alt="Coffece"
            width={120}
            height={40}
            className="h-8 w-auto hidden dark:block"
            priority
          />
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-brand-gold ${
                scrolled ? "text-foreground" : "text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageToggle />

          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={scrolled ? "" : "text-white hover:text-brand-gold"}
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
          )}

          <Button
            onClick={onOrderClick}
            className="hidden md:inline-flex bg-brand-gold text-brand-black hover:bg-brand-gold/90 font-bold"
          >
            {t("order")}
          </Button>

          <MobileNav onOrderClick={onOrderClick} />
        </div>
      </div>
    </header>
  );
}
