"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";

interface ProductSpecsProps {
  variant: "original" | "zlaty";
  labelSrc: string;
  decorativeSrc: string;
}

export function ProductSpecs({ variant, labelSrc, decorativeSrc }: ProductSpecsProps) {
  const t = useTranslations("product");
  const tProduct = useTranslations(`product.${variant}`);

  const specs = [
    { label: t("type"), value: variant === "original" ? "100% Arabica" : "100% Výberová Arabica" },
    { label: t("intensity"), value: "4/5" },
    { label: t("region"), value: "Brazil" },
    { label: t("weight"), value: "250g" },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">{tProduct("description")}</p>
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-2">{t("intensity")}</h3>
              <div className="flex gap-1.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className={`w-8 h-8 rounded-full ${
                    i <= 4 ? (variant === "original" ? "bg-brand-black" : "bg-brand-gold") : "bg-muted"
                  }`} />
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {specs.map((spec) => (
                <div key={spec.label} className="bg-muted/50 rounded-lg p-4">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{spec.label}</p>
                  <p className="font-semibold">{spec.value}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 bg-muted/50 rounded-lg p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Tasting Notes</p>
              <p className="font-medium">{tProduct("notes")}</p>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="relative">
            <div className="relative aspect-square max-w-md mx-auto">
              <Image src={labelSrc} alt="Product label" fill className="object-contain rounded-xl" />
            </div>
            <div className="absolute -bottom-8 -right-8 w-48 h-48 opacity-10">
              <Image src={decorativeSrc} alt="" fill className="object-contain" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
