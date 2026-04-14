"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
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
            <Link href="/original" className="block">
              <TiltCard className="cursor-pointer">
                <div className="relative aspect-square w-full max-w-md mx-auto rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-brand-black to-brand-dark">
                  <Image
                    src="/images/labels/original-label.png"
                    alt={t("original.name")}
                    fill
                    sizes="(max-width: 768px) 100vw, 448px"
                    className="object-contain p-6 drop-shadow-2xl"
                  />
                </div>
              </TiltCard>
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }}>
            <Link href="/zlaty-standard" className="block">
              <TiltCard className="cursor-pointer">
                <div className="relative aspect-square w-full max-w-md mx-auto rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-brand-gold-light to-white border border-brand-gold/20">
                  <Image
                    src="/images/labels/zlaty-label.png"
                    alt={t("zlaty.name")}
                    fill
                    sizes="(max-width: 768px) 100vw, 448px"
                    className="object-contain p-6 drop-shadow-2xl"
                  />
                </div>
              </TiltCard>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
