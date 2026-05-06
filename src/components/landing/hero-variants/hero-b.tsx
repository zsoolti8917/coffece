"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { BrandButton, BrandButtonOutline } from "@/components/ui/brand-button";
import { FloatingBeans } from "@/components/floating-beans";
import { LIFESTYLE_IMAGE, ScrollCue, scrollToWhy, useMouseParallax, type HeroVariantProps } from "./shared";

const MARQUEE = ["COFFECE", "BRAZIL", "ARABICA", "FRESH", "ROASTED", "OFFICE", "SLOVENSKO", "CRAFT"];

const wordSlide = {
  hidden: { y: "110%" },
  visible: (i: number) => ({
    y: "0%",
    transition: { delay: 0.2 + i * 0.07, duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

export function HeroB({ onOrderClick }: HeroVariantProps) {
  const t = useTranslations("hero");
  const { x, y } = useMouseParallax(14);
  const overline = t("overline");
  const titleWords = t("title").split(" ");

  return (
    <section className="relative min-h-screen flex flex-col bg-brand-black overflow-hidden">
      <FloatingBeans count={{ base: 50, md: 130, lg: 250 }} />

      <div className="container mx-auto px-4 lg:px-8 relative z-10 flex items-center flex-1 py-24 lg:pt-40 lg:pb-12">
        <div className="grid lg:grid-cols-[1.3fr_1fr] gap-10 lg:gap-16 items-center w-full">
          <div className="relative">
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 0.1, duration: 0.8, ease: "easeOut" }}
              style={{ transformOrigin: "top" }}
              className="hidden lg:block absolute -left-6 top-2 bottom-2 w-px bg-gradient-to-b from-brand-gold via-brand-gold/40 to-transparent"
            />

            {overline && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="uppercase text-brand-gold mb-6 tracking-[0.3em] text-xs font-semibold"
              >
                <span className="text-white/30 mr-3">01 /</span>
                {overline}
              </motion.p>
            )}

            <h1 className="text-5xl md:text-6xl lg:text-[5.5rem] font-extrabold text-white mb-8 leading-[0.95] tracking-tight">
              <span className="block">
                {titleWords.map((word, i) => (
                  <span key={i} className="inline-block overflow-hidden pt-[0.12em] pb-[0.08em] -mb-[0.1em] mr-[0.25em] align-baseline">
                    <motion.span
                      custom={i}
                      variants={wordSlide}
                      initial="hidden"
                      animate="visible"
                      className="inline-block"
                    >
                      {word}
                    </motion.span>
                  </span>
                ))}
              </span>
              <span className="inline-block overflow-hidden pt-[0.12em] pb-[0.22em] -mb-[0.18em] align-baseline">
                <motion.span
                  custom={titleWords.length}
                  variants={wordSlide}
                  initial="hidden"
                  animate="visible"
                  className="inline-block italic font-medium text-brand-gold tracking-tight"
                >
                  {t("titleHighlight")}
                </motion.span>
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.7 }}
              className="text-lg text-white/65 mb-10 max-w-lg"
            >
              {t("subtitle")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.7 }}
              className="flex flex-wrap gap-4"
            >
              <BrandButton size="lg" onClick={onOrderClick}>
                {t("cta")}
              </BrandButton>
              <BrandButtonOutline size="lg" onClick={scrollToWhy} icon={<ChevronDown />}>
                {t("learnMore")}
              </BrandButtonOutline>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            style={{ x, y }}
            className="relative w-full max-w-md mx-auto"
          >
            <div className="absolute -inset-4 bg-brand-gold/10 rounded-[2rem] blur-2xl" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl ring-1 ring-white/10">
              <Image
                src={LIFESTYLE_IMAGE}
                alt=""
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black/60 via-transparent to-transparent" />
            </div>
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="absolute -bottom-4 -left-4 bg-brand-black border border-brand-gold/40 px-4 py-3 rounded-xl shadow-2xl"
            >
              <p className="text-[10px] uppercase tracking-[0.25em] text-white/50 mb-1">Roasted</p>
              <p className="text-brand-gold text-sm font-bold">100% Arabica</p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="relative z-10 border-t border-white/5 overflow-hidden py-5">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          className="flex gap-12 whitespace-nowrap"
        >
          {[...MARQUEE, ...MARQUEE, ...MARQUEE, ...MARQUEE].map((word, i) => (
            <span key={i} className="text-sm tracking-[0.4em] text-white/30 font-medium uppercase flex items-center gap-12">
              {word}
              <span className="h-1 w-1 rounded-full bg-brand-gold/60" />
            </span>
          ))}
        </motion.div>
      </div>

      <ScrollCue className="bottom-24" />
    </section>
  );
}
