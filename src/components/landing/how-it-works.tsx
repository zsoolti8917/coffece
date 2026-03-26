"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

const steps = [
  { num: 1, key: "step1" as const },
  { num: 2, key: "step2" as const },
  { num: 3, key: "step3" as const },
];

export function HowItWorks() {
  const t = useTranslations("howItWorks");

  return (
    <section className="py-24 bg-muted/50">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.15em] font-semibold text-muted-foreground mb-3">{t("overline")}</p>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">{t("title")}</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-[2.25rem] left-[16%] right-[16%] h-[2px] bg-border" />
          {steps.map((step, i) => (
            <motion.div key={step.key} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.2 }} className="text-center relative">
              <div className="inline-flex items-center justify-center w-[4.5rem] h-[4.5rem] rounded-full bg-brand-black text-brand-gold font-bold text-2xl mb-6 relative z-10">
                {step.num}
              </div>
              <h3 className="text-xl font-bold mb-2">{t(step.key)}</h3>
              <p className="text-muted-foreground text-sm max-w-xs mx-auto">{t(`${step.key}Desc`)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
