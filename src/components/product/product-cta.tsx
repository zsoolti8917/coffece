"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface ProductCtaProps {
  productName: string;
  variant: "original" | "zlaty";
  onOrderClick: () => void;
}

export function ProductCta({ productName, variant, onOrderClick }: ProductCtaProps) {
  const t = useTranslations("product");
  const isDark = variant === "original";

  return (
    <section className={`py-20 ${isDark ? "bg-brand-black" : "bg-brand-gold"}`}>
      <div className="container mx-auto px-4 lg:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className={`text-3xl md:text-4xl font-extrabold mb-6 tracking-tight ${isDark ? "text-white" : "text-brand-black"}`}>
            {t("orderThis")} {productName}
          </h2>
          <Button size="lg" onClick={onOrderClick}
            className={isDark
              ? "bg-brand-gold text-brand-black hover:bg-brand-gold/90 font-bold text-base px-10"
              : "bg-brand-black text-brand-gold hover:bg-brand-black/90 font-bold text-base px-10"
            }>
            {t("orderThis")}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
