"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface ProductHeroProps {
  name: string;
  tagline: string;
  imageSrc: string;
  variant: "original" | "zlaty";
  decorativeBg?: string;
}

export function ProductHero({ name, tagline, imageSrc, variant, decorativeBg }: ProductHeroProps) {
  const isDark = variant === "original";

  return (
    <section className={`min-h-[70vh] flex items-center pt-24 relative overflow-hidden ${isDark ? "bg-brand-black" : "bg-brand-gold-light"}`}>
      {decorativeBg && (
        <div className="absolute inset-0 opacity-[0.05]">
          <Image src={decorativeBg} alt="" fill className="object-cover" priority />
        </div>
      )}
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 tracking-tight ${isDark ? "text-white" : "text-brand-black"}`}>
              {name}
            </h1>
            <p className={`text-xl ${isDark ? "text-gray-400" : "text-brand-gold-dark"}`}>{tagline}</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }} className="flex justify-center">
            <Image src={imageSrc} alt={name} width={400} height={500} className="rounded-2xl shadow-2xl" priority />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
