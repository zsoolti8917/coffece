"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Headphones,
  Wrench,
  Truck,
  CalendarCheck,
  LayoutDashboard,
  BadgeDollarSign,
} from "lucide-react";

const icons = [Headphones, Wrench, Truck, CalendarCheck, LayoutDashboard, BadgeDollarSign];

export function CompanyValues() {
  const t = useTranslations("values");

  return (
    <section className="py-24 lg:py-28 bg-brand-black text-white relative overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/backgrounds/beans-bg.avif"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-[0.06]"
      />
      {/* Gradient overlay for bottom fade */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-brand-black/80" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs uppercase tracking-[0.15em] font-semibold text-brand-gold mb-3">
            {t("caption")}
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            {t("title")}
          </h2>
        </motion.div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {icons.map((Icon, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-xl p-6"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-gold/10 text-brand-gold mb-4">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {t(`items.${i}.title`)}
              </h3>
              <p className="text-white/50 leading-relaxed">
                {t(`items.${i}.description`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
