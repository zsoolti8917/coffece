"use client";

import type { CSSProperties } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";
import { BrandButton } from "@/components/ui/brand-button";

function Bean({ className = "", style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 40 60" className={className} style={style} fill="none" aria-hidden>
      <ellipse cx="20" cy="30" rx="14" ry="22" fill="currentColor" />
      <path d="M20 8 C 14 18, 26 30, 20 52" stroke="rgba(0,0,0,0.35)" strokeWidth="1.8" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function Steam({ className = "", delay = 0 }: { className?: string; delay?: number }) {
  return (
    <svg viewBox="0 0 40 110" className={className} fill="none" aria-hidden>
      <motion.path
        d="M20 105 C 8 85, 32 65, 20 45 C 8 25, 32 15, 20 0"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0, y: 20 }}
        animate={{ pathLength: [0, 1, 1], opacity: [0, 0.7, 0], y: [20, -10, -40] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay }}
      />
    </svg>
  );
}

export function CtaBanner({ onOrderClick }: { onOrderClick: () => void }) {
  const t = useTranslations("cta");

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-black via-brand-dark to-brand-black py-24 lg:py-32">
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
        <Image
          src="/images/decorative/coffee-beans-pattern.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <motion.div
        aria-hidden
        animate={{ scale: [1, 1.08, 1], opacity: [0.2, 0.45, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-40 top-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-3xl bg-[radial-gradient(circle,_var(--color-brand-gold)_0%,_transparent_60%)] pointer-events-none"
      />

      <span aria-hidden className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent" />
      <span aria-hidden className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent" />

      <motion.div
        aria-hidden
        animate={{ y: [0, -16, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[12%] left-[5%] w-10 h-14 text-brand-gold/45 pointer-events-none"
      >
        <Bean className="w-full h-full" />
      </motion.div>
      <motion.div
        aria-hidden
        animate={{ y: [0, 14, 0], rotate: [-25, -15, -25] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute top-[22%] right-[6%] w-8 h-12 text-brand-gold/35 pointer-events-none"
      >
        <Bean className="w-full h-full" />
      </motion.div>
      <motion.div
        aria-hidden
        animate={{ y: [0, -10, 0], rotate: [40, 55, 40] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
        className="absolute bottom-[20%] left-[14%] w-7 h-11 text-brand-gold/35 pointer-events-none"
      >
        <Bean className="w-full h-full" />
      </motion.div>
      <motion.div
        aria-hidden
        animate={{ y: [0, 12, 0], rotate: [-15, -5, -15] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        className="absolute bottom-[14%] right-[16%] w-9 h-12 text-brand-gold/45 pointer-events-none"
      >
        <Bean className="w-full h-full" />
      </motion.div>
      <motion.div
        aria-hidden
        animate={{ y: [0, -8, 0], rotate: [70, 80, 70] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
        className="absolute top-[55%] left-[3%] w-6 h-10 text-brand-gold/30 pointer-events-none"
      >
        <Bean className="w-full h-full" />
      </motion.div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-[1.15fr_1fr] gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs uppercase tracking-[0.3em] font-semibold text-brand-gold mb-6 inline-flex items-center gap-3">
              <span className="h-px w-10 bg-brand-gold" />
              {t("eyebrow")}
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight leading-[1.05]">
              {t("title")}
            </h2>
            <p className="text-white/65 text-lg md:text-xl mb-10 max-w-xl leading-relaxed">
              {t("subtitle")}
            </p>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
              <BrandButton size="lg" onClick={onOrderClick}>
                {t("button")}
              </BrandButton>
              <span className="text-white/55 text-sm tracking-wide flex items-center gap-2">
                <span aria-hidden className="h-px w-6 bg-white/20" />
                {t("tagline")}
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-md mx-auto aspect-square"
          >
            <div aria-hidden className="absolute -top-16 left-1/2 -translate-x-1/2 flex gap-8 text-brand-gold/55 z-30 pointer-events-none">
              <Steam className="w-7 h-28" delay={0} />
              <Steam className="w-7 h-28" delay={0.9} />
              <Steam className="w-7 h-28" delay={1.8} />
            </div>

            <motion.div
              initial={{ rotate: 0, y: 0 }}
              animate={{ rotate: -10 }}
              transition={{ delay: 0.25, duration: 0.9, ease: "easeOut" }}
              className="absolute left-0 top-4 w-[62%] aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-brand-black to-brand-dark shadow-2xl ring-1 ring-brand-gold/30"
            >
              <Image
                src="/images/labels/original-label.png"
                alt=""
                fill
                sizes="(max-width: 1024px) 60vw, 280px"
                className="object-contain p-6 drop-shadow-2xl"
              />
              <span aria-hidden className="absolute top-3 left-3 h-4 w-4 border-t-2 border-l-2 border-brand-gold/70 rounded-tl-md" />
              <span aria-hidden className="absolute bottom-3 right-3 h-4 w-4 border-b-2 border-r-2 border-brand-gold/70 rounded-br-md" />
            </motion.div>

            <motion.div
              initial={{ rotate: 0, y: 0 }}
              animate={{ rotate: 9 }}
              transition={{ delay: 0.4, duration: 0.9, ease: "easeOut" }}
              className="absolute right-0 bottom-2 w-[62%] aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-brand-gold-light to-white shadow-2xl border border-brand-gold/40"
            >
              <Image
                src="/images/labels/zlaty-label.png"
                alt=""
                fill
                sizes="(max-width: 1024px) 60vw, 280px"
                className="object-contain p-6 drop-shadow-2xl"
              />
              <span aria-hidden className="absolute top-3 right-3 h-4 w-4 border-t-2 border-r-2 border-brand-gold-dark/70 rounded-tr-md" />
              <span aria-hidden className="absolute bottom-3 left-3 h-4 w-4 border-b-2 border-l-2 border-brand-gold-dark/70 rounded-bl-md" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -8 }}
              whileInView={{ opacity: 1, scale: 1, rotate: -8 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: 0.55, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 lg:w-32 lg:h-32 rounded-full bg-brand-gold text-brand-black flex flex-col items-center justify-center font-extrabold shadow-2xl ring-4 ring-brand-black z-20"
            >
              <span className="text-[9px] tracking-[0.3em] uppercase">Fresh</span>
              <span className="text-2xl lg:text-3xl leading-none my-0.5">Roast</span>
              <span className="text-[9px] tracking-[0.3em] uppercase">Brazil</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
