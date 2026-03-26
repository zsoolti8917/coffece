"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function CtaBanner({ onOrderClick }: { onOrderClick: () => void }) {
  const t = useTranslations("cta");

  return (
    <section className="py-20 bg-brand-gold">
      <div className="container mx-auto px-4 lg:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="text-3xl md:text-4xl font-extrabold text-brand-black mb-4 tracking-tight">{t("title")}</h2>
          <p className="text-brand-black/70 text-lg mb-8 max-w-lg mx-auto">{t("subtitle")}</p>
          <Button size="lg" onClick={onOrderClick}
            className="bg-brand-black text-brand-gold hover:bg-brand-black/90 font-bold text-base px-10">
            {t("button")}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
