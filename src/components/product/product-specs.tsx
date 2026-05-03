"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";

interface ProductSpecsProps {
  variant: "original" | "zlaty";
  labelSrc: string;
}

export function ProductSpecs({ variant, labelSrc }: ProductSpecsProps) {
  const t = useTranslations("product");
  const tProduct = useTranslations(`product.${variant}`);

  const intensity = variant === "zlaty" ? 2.5 : 4;
  const fullDots = Math.floor(intensity);
  const hasHalf = intensity % 1 !== 0;

  const isOriginal = variant === "original";
  const cardBg = isOriginal
    ? "bg-gradient-to-br from-brand-black to-brand-dark"
    : "bg-gradient-to-br from-brand-gold-light to-white border border-brand-gold/30";

  const specs = [
    { label: t("type"), value: isOriginal ? "100% Arabica" : "100% Výberová Arabica" },
    { label: t("intensity"), value: `${intensity}/5` },
    { label: t("region"), value: "Brazília" },
    { label: t("weight"), value: "250 – 1000 g" },
  ];

  return (
    <section id="profile" className="relative overflow-hidden py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <p className="text-xs uppercase tracking-[0.3em] font-semibold text-brand-gold-dark mb-5 inline-flex items-center gap-3">
            <span className="h-px w-10 bg-brand-gold-dark/60" />
            {t("detailsOverline")}
            <span className="h-px w-10 bg-brand-gold-dark/60" />
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.05]">
            {t("specsTitle")}
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-[5fr_6fr] gap-12 lg:gap-20 items-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-[460px] mx-auto"
          >
            <motion.div
              aria-hidden
              animate={{ scale: [1, 1.06, 1], opacity: [0.4, 0.6, 0.4] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -inset-10 rounded-full bg-[radial-gradient(circle,_var(--color-brand-gold)_0%,_transparent_60%)] blur-3xl pointer-events-none"
            />
            <div className={`relative aspect-square rounded-3xl overflow-hidden shadow-2xl ring-1 ring-brand-gold/30 ${cardBg}`}>
              <Image
                src={labelSrc}
                alt="Product label"
                fill
                sizes="(max-width: 1024px) 100vw, 460px"
                className="object-contain p-10 drop-shadow-2xl"
              />
              <span aria-hidden className="absolute top-4 left-4 h-5 w-5 border-t-2 border-l-2 border-brand-gold rounded-tl-md" />
              <span aria-hidden className="absolute top-4 right-4 h-5 w-5 border-t-2 border-r-2 border-brand-gold rounded-tr-md" />
              <span aria-hidden className="absolute bottom-4 left-4 h-5 w-5 border-b-2 border-l-2 border-brand-gold rounded-bl-md" />
              <span aria-hidden className="absolute bottom-4 right-4 h-5 w-5 border-b-2 border-r-2 border-brand-gold rounded-br-md" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-10">
              {tProduct("description")}
            </p>

            <div className="mb-10">
              <p className="text-[10px] uppercase tracking-[0.3em] font-semibold text-brand-gold-dark mb-3">
                {t("intensity")}
              </p>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((i) => {
                  if (i <= fullDots) {
                    return <div key={i} className="h-2.5 w-10 rounded-full bg-gradient-to-r from-brand-gold-dark to-brand-gold" />;
                  }
                  if (hasHalf && i === fullDots + 1) {
                    return (
                      <div key={i} className="relative h-2.5 w-10 rounded-full bg-brand-gold/15 overflow-hidden">
                        <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-brand-gold-dark to-brand-gold" />
                      </div>
                    );
                  }
                  return <div key={i} className="h-2.5 w-10 rounded-full bg-brand-gold/15" />;
                })}
                <span className="ml-3 text-sm font-bold text-brand-black tabular-nums">{intensity}/5</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-10">
              {specs.map((spec) => (
                <div
                  key={spec.label}
                  className="relative rounded-xl p-4 border border-brand-gold/20 bg-gradient-to-br from-white via-white to-brand-gold-light/40 transition-colors duration-300 hover:border-brand-gold/50"
                >
                  <p className="text-[10px] uppercase tracking-[0.25em] text-brand-gold-dark font-semibold mb-1.5">
                    {spec.label}
                  </p>
                  <p className="font-bold text-brand-black">{spec.value}</p>
                </div>
              ))}
            </div>

            <div className="relative pl-6 py-3 border-l-2 border-brand-gold">
              <p className="text-[10px] uppercase tracking-[0.3em] text-brand-gold-dark font-semibold mb-2">
                {t("tastingNotes")}
              </p>
              <p className="text-lg italic font-medium text-brand-black/85 leading-relaxed">
                {tProduct("notes")}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
