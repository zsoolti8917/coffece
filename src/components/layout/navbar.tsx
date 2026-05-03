"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { BrandButton } from "@/components/ui/brand-button";
import { LanguageToggle } from "./language-toggle";
import { MobileNav } from "./mobile-nav";

export function Navbar({ onOrderClick, variant = "dark" }: { onOrderClick: () => void; variant?: "light" | "dark" }) {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
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
      <div className="container mx-auto flex items-center justify-between h-16 lg:h-20 px-4 lg:px-8">
        <Link href="/" className="flex-shrink-0">
          <Image
            src={
              scrolled || variant === "light"
                ? "/images/logos/coffece-logo-black.png"
                : "/images/logos/coffece-logo-white.png"
            }
            alt="Coffece"
            width={400}
            height={118}
            className={`w-auto transition-[height] duration-300 ease-out ${
              scrolled ? "h-24 lg:h-36" : "h-36 lg:h-52"
            } ${scrolled || variant === "light" ? "mix-blend-multiply" : "mix-blend-screen"}`}
            priority
          />
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`group/navlink relative py-1 text-sm font-medium transition-colors duration-200 hover:text-brand-gold ${
                scrolled || variant === "light" ? "text-foreground" : "text-white"
              }`}
            >
              {link.label}
              <span
                aria-hidden
                className="pointer-events-none absolute -bottom-0.5 left-1/2 h-[2px] w-0 -translate-x-1/2 rounded-full bg-brand-gold transition-[width] duration-300 ease-out group-hover/navlink:w-full"
              />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageToggle
            className={
              scrolled || variant === "light"
                ? "text-foreground hover:text-brand-gold"
                : "text-white hover:text-brand-gold hover:bg-white/10"
            }
          />

          <BrandButton onClick={onOrderClick} size="sm" className="hidden md:inline-flex">
            {t("order")}
          </BrandButton>

          <MobileNav
            onOrderClick={onOrderClick}
            triggerClassName={
              scrolled || variant === "light"
                ? "text-foreground"
                : "text-white"
            }
          />
        </div>
      </div>
    </header>
  );
}
