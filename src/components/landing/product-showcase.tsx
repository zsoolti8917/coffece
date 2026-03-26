"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";
import { TiltCard } from "@/components/tilt-card";

export function ProductShowcase() {
  const t = useTranslations("products");

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.15em] font-semibold text-muted-foreground mb-3">{t("overline")}</p>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">{t("title")}</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <Link href="/original" className="block group">
              <TiltCard className="cursor-pointer">
                <div className="rounded-2xl p-10 text-center overflow-hidden bg-gradient-to-br from-brand-black to-brand-dark shadow-2xl">
                  <div className="relative w-72 h-72 md:w-80 md:h-80 mx-auto mb-8">
                    <Image src="/images/labels/original-label.png" alt={t("original.name")} fill className="object-contain drop-shadow-2xl" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1">{t("original.name")}</h3>
                  <p className="text-gray-400 text-sm mb-5">{t("original.type")} · {t("original.region")}</p>
                  <span className="inline-flex items-center gap-2 text-sm text-brand-gold border border-brand-gold/50 rounded-full px-6 py-2.5 group-hover:bg-brand-gold group-hover:text-brand-black transition-all duration-300 font-medium">
                    {t("learnMore")} <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </TiltCard>
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }}>
            <Link href="/zlaty-standard" className="block group">
              <TiltCard className="cursor-pointer">
                <div className="rounded-2xl p-10 text-center border border-brand-gold/30 overflow-hidden bg-gradient-to-br from-brand-gold-light to-white shadow-2xl">
                  <div className="relative w-72 h-72 md:w-80 md:h-80 mx-auto mb-8">
                    <Image src="/images/labels/zlaty-label.png" alt={t("zlaty.name")} fill className="object-contain drop-shadow-2xl" />
                  </div>
                  <h3 className="text-2xl font-bold text-brand-black mb-1">{t("zlaty.name")}</h3>
                  <p className="text-brand-gold-dark text-sm mb-5">{t("zlaty.type")} · {t("zlaty.region")}</p>
                  <span className="inline-flex items-center gap-2 text-sm text-brand-black border border-brand-gold rounded-full px-6 py-2.5 group-hover:bg-brand-gold transition-all duration-300 font-medium">
                    {t("learnMore")} <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </TiltCard>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
