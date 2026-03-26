"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Coffee, Truck, Handshake } from "lucide-react";

const cards = [
  { icon: Coffee, key: "fresh" as const },
  { icon: Truck, key: "delivery" as const },
  { icon: Handshake, key: "noCommit" as const },
];

export function WhyCoffece() {
  const t = useTranslations("why");

  return (
    <section id="why-coffece" className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.15em] font-semibold text-muted-foreground mb-3">{t("overline")}</p>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">{t("title")}</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card, i) => (
            <motion.div key={card.key} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.15 }}
              className="bg-card rounded-xl border p-8 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-brand-gold/10 text-brand-gold mb-6">
                <card.icon className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">{t(card.key)}</h3>
              <p className="text-muted-foreground">{t(`${card.key}Desc`)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
