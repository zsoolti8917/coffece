"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { BrandButton } from "@/components/ui/brand-button";

interface ProductCtaProps {
  productName: string;
  variant: "original" | "zlaty";
  onOrderClick: () => void;
}

export function ProductCta({ productName, variant, onOrderClick }: ProductCtaProps) {
  const t = useTranslations("product");
  const isDark = variant === "original";

  const sectionBg = isDark ? "bg-brand-black" : "bg-brand-gold";
  const overlineColor = isDark ? "text-brand-gold" : "text-brand-black/70";
  const overlineRule = isDark ? "bg-brand-gold/60" : "bg-brand-black/40";
  const headingColor = isDark ? "text-white" : "text-brand-black";
  const subtitleColor = isDark ? "text-white/65" : "text-brand-black/70";
  const bracketColor = isDark ? "border-brand-gold" : "border-brand-black/60";

  return (
    <section className={`relative overflow-hidden py-24 lg:py-28 ${sectionBg}`}>
      <motion.div
        aria-hidden
        animate={{ scale: [1, 1.06, 1], opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--color-brand-gold)_0%,_transparent_60%)] blur-3xl"
      />

      <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
        <div className="relative max-w-2xl mx-auto">
          <span aria-hidden className={`absolute -top-4 -left-4 h-6 w-6 border-t-2 border-l-2 ${bracketColor} rounded-tl-md`} />
          <span aria-hidden className={`absolute -top-4 -right-4 h-6 w-6 border-t-2 border-r-2 ${bracketColor} rounded-tr-md`} />
          <span aria-hidden className={`absolute -bottom-4 -left-4 h-6 w-6 border-b-2 border-l-2 ${bracketColor} rounded-bl-md`} />
          <span aria-hidden className={`absolute -bottom-4 -right-4 h-6 w-6 border-b-2 border-r-2 ${bracketColor} rounded-br-md`} />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className={`text-xs uppercase tracking-[0.3em] font-semibold mb-5 inline-flex items-center gap-3 ${overlineColor}`}>
              <span className={`h-px w-10 ${overlineRule}`} />
              {t("ctaOverline")}
              <span className={`h-px w-10 ${overlineRule}`} />
            </p>

            <h2 className={`text-4xl md:text-5xl lg:text-6xl font-extrabold mb-5 tracking-tight leading-[1.05] ${headingColor}`}>
              {t("orderThis")} {productName}
            </h2>

            <p className={`text-base md:text-lg leading-relaxed mb-10 max-w-lg mx-auto ${subtitleColor}`}>
              {t("ctaSubtitle")}
            </p>

            <BrandButton size="lg" tone={isDark ? "gold" : "dark"} onClick={onOrderClick}>
              {t("orderThis")}
            </BrandButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
