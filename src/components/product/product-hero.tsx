"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { BrandButton } from "@/components/ui/brand-button";
import { FloatingBeans } from "@/components/floating-beans";

interface ProductHeroProps {
  name: string;
  tagline: string;
  eyebrow: string;
  type: string;
  region: string;
  intensity: number;
  imageSrc: string;
  variant: "original" | "zlaty";
  decorativeBg?: string;
  showBeans?: boolean;
  onOrderClick: () => void;
}

export function ProductHero({
  name,
  tagline,
  eyebrow,
  type,
  region,
  intensity,
  imageSrc,
  variant,
  decorativeBg,
  showBeans = false,
  onOrderClick,
}: ProductHeroProps) {
  const t = useTranslations("product");
  const isDark = variant === "original";

  const sectionBg = isDark
    ? "bg-brand-black text-white"
    : "bg-gradient-to-br from-brand-gold-light via-white to-brand-gold-light/40 text-brand-black";
  const eyebrowColor = isDark ? "text-brand-gold" : "text-brand-gold-dark";
  const eyebrowRule = isDark ? "bg-brand-gold" : "bg-brand-gold-dark";
  const taglineColor = isDark ? "text-white/65" : "text-brand-black/70";
  const chipBorder = isDark ? "border-white/15" : "border-brand-gold/40";
  const chipBg = isDark ? "bg-white/5" : "bg-white/70";
  const chipText = isDark ? "text-white/80" : "text-brand-black/70";
  const secondaryLinkColor = isDark ? "text-brand-gold" : "text-brand-gold-dark";
  const ringColor = isDark ? "ring-white/10" : "ring-brand-gold/20";
  const stampRing = isDark ? "ring-brand-black" : "ring-white";

  return (
    <section className={`relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28 ${sectionBg}`}>
      {showBeans && <FloatingBeans count={20} />}

      {decorativeBg && (
        <div className={`absolute inset-0 pointer-events-none ${isDark ? "opacity-[0.05]" : "opacity-[0.07]"}`}>
          <Image
            src={decorativeBg}
            alt=""
            fill
            sizes="100vw"
            className={`object-cover ${!isDark ? "invert" : ""}`}
            priority
          />
        </div>
      )}

      <motion.div
        aria-hidden
        animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.55, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-[640px] h-[640px] rounded-full blur-3xl pointer-events-none bg-[radial-gradient(circle,_var(--color-brand-gold)_0%,_transparent_60%)]"
      />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className={`text-xs uppercase tracking-[0.3em] font-semibold mb-7 inline-flex items-center gap-3 ${eyebrowColor}`}>
              <span className={`h-px w-10 ${eyebrowRule}`} />
              <span>{eyebrow}</span>
            </p>

            <h1 className={`text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight leading-[1.02] ${isDark ? "text-white" : "text-brand-black"}`}>
              {name}
            </h1>

            <p className={`text-lg md:text-xl leading-relaxed mb-8 max-w-xl ${taglineColor}`}>
              {tagline}
            </p>

            <div className="flex flex-wrap gap-2 mb-10">
              <span className={`text-xs font-medium px-3 py-1.5 rounded-full border backdrop-blur-sm ${chipBorder} ${chipBg} ${chipText}`}>
                {type}
              </span>
              <span className={`text-xs font-medium px-3 py-1.5 rounded-full border backdrop-blur-sm ${chipBorder} ${chipBg} ${chipText}`}>
                {region}
              </span>
              <span className={`text-xs font-medium px-3 py-1.5 rounded-full border backdrop-blur-sm ${chipBorder} ${chipBg} ${chipText}`}>
                {t("intensity")} {intensity}/5
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-5">
              <BrandButton size="lg" tone={isDark ? "gold" : "dark"} onClick={onOrderClick}>
                {t("orderThis")}
              </BrandButton>
              <a
                href="#profile"
                className={`group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] ${secondaryLinkColor}`}
              >
                <span className="relative">
                  {t("viewProfile")}
                  <span className={`absolute left-0 -bottom-1 h-px w-full origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100 ${eyebrowRule}/60`} />
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1"
                  aria-hidden
                >
                  <path d="M12 5v14" />
                  <path d="m5 12 7 7 7-7" />
                </svg>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-[480px] mx-auto"
          >
            <div className={`absolute -inset-3 rounded-[1.75rem] bg-gradient-to-br from-brand-gold/40 via-brand-gold/0 to-brand-gold/20 blur-sm pointer-events-none`} />

            <div className={`relative aspect-[5/6] overflow-hidden rounded-3xl ring-1 ${ringColor} shadow-[0_30px_80px_-20px_rgba(0,0,0,0.55)]`}>
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: 1.05 }}
                transition={{ duration: 16, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
                className="absolute inset-0"
              >
                <Image
                  src={imageSrc}
                  alt={name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 480px"
                  className="object-cover"
                  priority
                />
              </motion.div>

              <div className={`absolute inset-0 pointer-events-none bg-gradient-to-t ${isDark ? "from-brand-black/35" : "from-brand-black/15"} via-transparent to-transparent`} />

              <span aria-hidden className="absolute top-3 left-3 h-5 w-5 border-t-2 border-l-2 border-brand-gold rounded-tl-md" />
              <span aria-hidden className="absolute top-3 right-3 h-5 w-5 border-t-2 border-r-2 border-brand-gold rounded-tr-md" />
              <span aria-hidden className="absolute bottom-3 left-3 h-5 w-5 border-b-2 border-l-2 border-brand-gold rounded-bl-md" />
              <span aria-hidden className="absolute bottom-3 right-3 h-5 w-5 border-b-2 border-r-2 border-brand-gold rounded-br-md" />
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.94, rotate: 2 }}
              animate={{ opacity: 1, scale: 1, rotate: 6 }}
              transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className={`absolute -top-5 -right-3 lg:-right-8 w-24 h-24 lg:w-28 lg:h-28 rounded-full bg-brand-gold text-brand-black flex flex-col items-center justify-center font-extrabold shadow-[0_18px_40px_-12px_rgba(0,0,0,0.45)] ring-1 ${stampRing}`}
            >
              <span aria-hidden className="absolute inset-1.5 rounded-full border border-brand-black/25 pointer-events-none" />
              <span className="relative text-[9px] tracking-[0.32em] uppercase font-semibold">Intensity</span>
              <span className="relative text-2xl lg:text-3xl leading-none my-1 tabular-nums tracking-tight">{intensity}/5</span>
              <span className="relative text-[9px] tracking-[0.32em] uppercase font-semibold">Brazil</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
