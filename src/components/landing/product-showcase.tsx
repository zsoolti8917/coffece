"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import { TiltCard } from "@/components/tilt-card";

type Variant = "dark" | "light";

interface ProductCardProps {
  href: "/original" | "/zlaty-standard";
  numeral: string;
  numeralSide: "left" | "right";
  name: string;
  tagline: string;
  type: string;
  region: string;
  learnMore: string;
  imageSrc: string;
  imageAlt: string;
  variant: Variant;
}

function ProductCard({
  href,
  numeral,
  numeralSide,
  name,
  tagline,
  type,
  region,
  learnMore,
  imageSrc,
  imageAlt,
  variant,
}: ProductCardProps) {
  const isDark = variant === "dark";

  const cardBg = isDark
    ? "bg-gradient-to-br from-brand-black to-brand-dark"
    : "bg-gradient-to-br from-brand-gold-light via-white to-white border border-brand-gold/30";
  const ringClasses = isDark
    ? "ring-1 ring-white/10 group-hover:ring-brand-gold/60"
    : "ring-1 ring-brand-gold/15 group-hover:ring-brand-gold/70";
  const numeralColor = isDark ? "text-brand-gold/30" : "text-brand-gold-dark/25";
  const bracketColor = isDark ? "border-brand-gold" : "border-brand-gold-dark";
  const taglineColor = isDark ? "text-brand-gold" : "text-brand-gold-dark";
  const nameColor = isDark ? "text-white" : "text-brand-black";
  const chipText = isDark ? "text-white/80" : "text-brand-black/70";
  const chipBorder = isDark ? "border-white/15" : "border-brand-gold/40";
  const chipBg = isDark ? "bg-white/5" : "bg-white/70";
  const ctaColor = isDark ? "text-brand-gold" : "text-brand-gold-dark";
  const ctaUnderline = isDark ? "bg-brand-gold/50" : "bg-brand-gold-dark/50";
  const glowGradient = isDark
    ? "bg-[radial-gradient(circle,_var(--color-brand-gold)_0%,_transparent_60%)]"
    : "bg-[radial-gradient(circle,_var(--color-brand-gold)_0%,_transparent_70%)]";
  const numeralPosition = numeralSide === "left" ? "left-8" : "right-8";

  return (
    <Link href={href} className="group block h-full">
      <TiltCard className="h-full">
        <div
          className={`relative h-full overflow-hidden rounded-3xl shadow-2xl transition-all duration-500 group-hover:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.45)] ${cardBg} ${ringClasses}`}
        >
          {isDark && (
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
              <Image
                src="/images/decorative/coffee-beans-pattern.png"
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                className="object-cover"
              />
            </div>
          )}

          <span aria-hidden className={`absolute top-4 left-4 h-5 w-5 border-t-2 border-l-2 ${bracketColor} rounded-tl-md z-10`} />
          <span aria-hidden className={`absolute top-4 right-4 h-5 w-5 border-t-2 border-r-2 ${bracketColor} rounded-tr-md z-10`} />
          <span aria-hidden className={`absolute bottom-4 left-4 h-5 w-5 border-b-2 border-l-2 ${bracketColor} rounded-bl-md z-10`} />
          <span aria-hidden className={`absolute bottom-4 right-4 h-5 w-5 border-b-2 border-r-2 ${bracketColor} rounded-br-md z-10`} />

          <span
            aria-hidden
            className={`pointer-events-none select-none absolute top-7 ${numeralPosition} font-serif italic font-light text-7xl md:text-8xl leading-none ${numeralColor}`}
          >
            {numeral}
          </span>

          <div className="relative z-10 flex flex-col h-full p-8 md:p-10 pt-14 md:pt-16">
            <div className="relative mx-auto h-56 sm:h-64 md:h-72 w-full max-w-[22rem]">
              <motion.div
                aria-hidden
                animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.65, 0.4] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className={`absolute inset-0 rounded-full blur-3xl pointer-events-none ${glowGradient}`}
              />
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                className="object-contain drop-shadow-2xl transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
            </div>

            <p className={`mt-10 text-[10px] uppercase tracking-[0.3em] font-semibold ${taglineColor}`}>
              {tagline}
            </p>

            <h3 className={`mt-2 text-3xl md:text-4xl font-extrabold tracking-tight leading-tight ${nameColor}`}>
              {name}
            </h3>

            <div className="mt-5 flex flex-wrap gap-2">
              <span className={`text-xs font-medium px-3 py-1.5 rounded-full border backdrop-blur-sm ${chipBorder} ${chipBg} ${chipText}`}>
                {type}
              </span>
              <span className={`text-xs font-medium px-3 py-1.5 rounded-full border backdrop-blur-sm ${chipBorder} ${chipBg} ${chipText}`}>
                {region}
              </span>
            </div>

            <div className={`mt-8 inline-flex items-center gap-2 self-start text-xs font-semibold uppercase tracking-[0.25em] ${ctaColor}`}>
              <span className="relative">
                {learnMore}
                <span
                  aria-hidden
                  className={`absolute left-0 -bottom-1 h-px w-full origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100 ${ctaUnderline}`}
                />
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden
              >
                <path d="M5 12h14" />
                <path d="m13 5 7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </TiltCard>
    </Link>
  );
}

export function ProductShowcase() {
  const t = useTranslations("products");

  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <p className="text-xs uppercase tracking-[0.3em] font-semibold text-brand-gold-dark mb-5 inline-flex items-center gap-3">
            <span className="h-px w-10 bg-brand-gold-dark/60" />
            {t("overline")}
            <span className="h-px w-10 bg-brand-gold-dark/60" />
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05]">
            {t("title")}
          </h2>
          <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed">
            {t("subtitle")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="h-full"
          >
            <ProductCard
              href="/original"
              numeral="I"
              numeralSide="right"
              name={t("original.name")}
              tagline={t("original.tagline")}
              type={t("original.type")}
              region={t("original.region")}
              learnMore={t("learnMore")}
              imageSrc="/images/labels/original-label.png"
              imageAlt={t("original.name")}
              variant="dark"
            />
          </motion.div>

          <div className="md:translate-y-8 h-full">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="h-full"
            >
              <ProductCard
                href="/zlaty-standard"
                numeral="II"
                numeralSide="left"
                name={t("zlaty.name")}
                tagline={t("zlaty.tagline")}
                type={t("zlaty.type")}
                region={t("zlaty.region")}
                learnMore={t("learnMore")}
                imageSrc="/images/labels/zlaty-label.png"
                imageAlt={t("zlaty.name")}
                variant="light"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
