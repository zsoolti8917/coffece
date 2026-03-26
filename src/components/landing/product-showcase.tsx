"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";

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

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <Link href="/original" className="block group">
              <div className="bg-brand-black rounded-2xl p-8 text-center hover:scale-[1.02] transition-transform duration-300 overflow-hidden">
                <div className="relative w-64 h-64 mx-auto mb-6">
                  <Image src="/images/labels/original-label.png" alt={t("original.name")} fill className="object-contain" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">{t("original.name")}</h3>
                <p className="text-gray-400 text-sm mb-4">{t("original.type")} · {t("original.region")}</p>
                <span className="inline-flex items-center gap-2 text-sm text-white border border-gray-600 rounded-lg px-4 py-2 group-hover:border-brand-gold group-hover:text-brand-gold transition-colors">
                  {t("learnMore")} <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }}>
            <Link href="/zlaty-standard" className="block group">
              <div className="bg-brand-gold-light rounded-2xl p-8 text-center border border-brand-gold hover:scale-[1.02] transition-transform duration-300 overflow-hidden">
                <div className="relative w-64 h-64 mx-auto mb-6">
                  <Image src="/images/labels/zlaty-label.png" alt={t("zlaty.name")} fill className="object-contain" />
                </div>
                <h3 className="text-2xl font-bold text-brand-black mb-1">{t("zlaty.name")}</h3>
                <p className="text-brand-gold-dark text-sm mb-4">{t("zlaty.type")} · {t("zlaty.region")}</p>
                <span className="inline-flex items-center gap-2 text-sm text-brand-black border border-brand-gold rounded-lg px-4 py-2 group-hover:bg-brand-gold transition-colors">
                  {t("learnMore")} <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
