"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { FloatingBeans } from "@/components/floating-beans";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" as const },
  }),
};

export function Hero({ onOrderClick }: { onOrderClick: () => void }) {
  const t = useTranslations("hero");

  return (
    <section className="relative min-h-screen flex items-center bg-brand-black overflow-hidden">
      <FloatingBeans count={50} />

      <div className="container mx-auto px-4 lg:px-8 pt-24 pb-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.p custom={0} variants={fadeUp} initial="hidden" animate="visible"
              className="text-overline uppercase text-brand-gold mb-4 tracking-[0.15em] text-xs font-semibold">
              {t("overline")}
            </motion.p>
            <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="visible"
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight">
              {t("title")}{" "}
              <span className="text-brand-gold">{t("titleHighlight")}</span>
            </motion.h1>
            <motion.p custom={2} variants={fadeUp} initial="hidden" animate="visible"
              className="text-lg text-gray-400 mb-8 max-w-lg">
              {t("subtitle")}
            </motion.p>
            <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible" className="flex gap-4">
              <Button size="lg" onClick={onOrderClick}
                className="bg-brand-gold text-brand-black hover:bg-brand-gold/90 font-bold text-base px-8">
                {t("cta")}
              </Button>
              <Button size="lg" variant="outline"
                className="border-brand-gold/60 text-brand-gold hover:bg-brand-gold/10 font-medium text-base"
                onClick={() => document.getElementById("why-coffece")?.scrollIntoView({ behavior: "smooth" })}>
                {t("learnMore")}
              </Button>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            className="relative flex justify-center items-center gap-6 lg:gap-8">
            <motion.div animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="relative -rotate-3">
              <Image src="/images/products/original-kitchen.png" alt="Coffece Original"
                width={320} height={450} className="rounded-2xl shadow-2xl w-[260px] lg:w-[320px] h-auto" priority />
            </motion.div>
            <motion.div animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="relative rotate-3 mt-12">
              <Image src="/images/products/zlaty-office.png" alt="Coffece Zlatý Štandard"
                width={320} height={450} className="rounded-2xl shadow-2xl w-[260px] lg:w-[320px] h-auto" priority />
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ChevronDown className="h-6 w-6 text-gray-600" />
        </motion.div>
      </motion.div>
    </section>
  );
}
