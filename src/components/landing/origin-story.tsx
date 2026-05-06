"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";

export function OriginStory() {
  const t = useTranslations("origin");

  return (
    <section className="py-24 lg:py-32 bg-brand-black text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <Image
          src="/images/decorative/coffee-beans-pattern.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-[5fr_6fr] gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs uppercase tracking-[0.3em] font-semibold text-brand-gold mb-4 flex items-center gap-3">
              <span className="h-px w-10 bg-brand-gold" />
              {t("overline")}
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-7 tracking-tight leading-[1.05]">
              {t("title")}
            </h2>
            <p className="text-white/65 text-lg leading-relaxed max-w-lg">
              {t("text")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-xl mx-auto"
          >
            <motion.div
              animate={{ scale: [1, 1.06, 1], opacity: [0.4, 0.6, 0.4] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -inset-12 rounded-full bg-[radial-gradient(circle,_var(--color-brand-gold)_0%,_transparent_60%)] blur-3xl pointer-events-none"
            />

            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: -2 }}
              transition={{ delay: 0.3, duration: 0.9, ease: "easeOut" }}
              className="relative"
            >
              <div className="absolute -inset-3 rounded-[1.75rem] bg-gradient-to-br from-brand-gold/40 via-brand-gold/0 to-brand-gold/20 blur-sm" />

              <div className="relative aspect-[5/4] overflow-hidden rounded-3xl ring-1 ring-white/15 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]">
                <motion.div
                  initial={{ scale: 1 }}
                  animate={{ scale: 1.08 }}
                  transition={{ duration: 14, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
                  className="absolute inset-0"
                >
                  <Image
                    src="/images/lifestyle/bottomcoffe.png"
                    alt="Brazílska kávová plantáž pri západe slnka"
                    fill
                    sizes="(min-width: 1024px) 50vw, 90vw"
                    className="object-cover"
                  />
                </motion.div>

                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/30 via-transparent to-transparent pointer-events-none" />

                <span aria-hidden className="absolute top-3 left-3 h-5 w-5 border-t-2 border-l-2 border-brand-gold rounded-tl-md" />
                <span aria-hidden className="absolute top-3 right-3 h-5 w-5 border-t-2 border-r-2 border-brand-gold rounded-tr-md" />
                <span aria-hidden className="absolute bottom-3 left-3 h-5 w-5 border-b-2 border-l-2 border-brand-gold rounded-bl-md" />
                <span aria-hidden className="absolute bottom-3 right-3 h-5 w-5 border-b-2 border-r-2 border-brand-gold rounded-br-md" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20, x: -10 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="absolute -bottom-6 -left-2 lg:-left-8 backdrop-blur-xl bg-brand-black/80 border border-white/15 rounded-2xl px-5 py-4 shadow-2xl max-w-[18rem]"
            >
              <p className="text-[10px] tracking-[0.3em] uppercase text-brand-gold mb-1.5 font-semibold">
                Farma
              </p>
              <p className="text-white font-bold text-sm leading-snug">
                Agron Cereale Minerio
              </p>
              <p className="text-white/50 text-xs mt-1">Minas Gerais · Brazília</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
