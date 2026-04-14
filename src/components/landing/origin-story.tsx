"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";

export function OriginStory() {
  const t = useTranslations("origin");

  return (
    <section className="py-24 bg-brand-black text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]">
        <Image src="/images/decorative/coffee-beans-pattern.png" alt="" fill sizes="100vw" className="object-cover" />
      </div>
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="text-xs uppercase tracking-[0.15em] font-semibold text-brand-gold mb-3">{t("overline")}</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 tracking-tight">{t("title")}</h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">{t("text")}</p>
            <div className="inline-flex items-center gap-3 bg-brand-surface rounded-lg px-5 py-3">
              <span className="text-2xl">🇧🇷</span>
              <span className="text-brand-gold font-bold tracking-wider">{t("badge")}</span>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="flex justify-center">
            <div className="relative w-72 h-72 lg:w-96 lg:h-96">
              <Image src="/images/decorative/coffee-plant.png" alt="Coffee plant illustration" fill sizes="(max-width: 1024px) 288px, 384px" className="object-contain" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
