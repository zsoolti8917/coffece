"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";
import { CARDS, SECTION_ID } from "./shared";

const COLUMN_OFFSETS = ["lg:translate-y-0", "lg:translate-y-14", "lg:translate-y-6"];
const PHOTO_TILTS = ["-rotate-[3deg]", "rotate-[2deg]", "-rotate-[2deg]"];
const CARD_STYLES = [
  // Fresh — clean white card
  "bg-white border border-black/[0.08] text-brand-black",
  // Delivery — bold brand-black card
  "bg-brand-black border border-white/10 text-white",
  // NoCommit — gold-tinted card
  "bg-white border border-brand-gold/40 text-brand-black",
];
const ICON_STYLES = [
  "bg-brand-black text-brand-gold",
  "bg-brand-gold text-brand-black",
  "bg-brand-gold text-brand-black",
];
const DESC_STYLES = ["text-brand-black/60", "text-white/65", "text-brand-black/60"];

export function VybratD() {
  const t = useTranslations("why");

  return (
    <section id={SECTION_ID} className="py-24 lg:py-32 bg-stone-50 relative overflow-hidden">
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,_var(--color-brand-gold)_0%,_transparent_70%)] opacity-25 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,_var(--color-brand-gold)_0%,_transparent_70%)] opacity-15 blur-3xl pointer-events-none" />

      <svg
        aria-hidden
        className="absolute inset-0 w-full h-full pointer-events-none text-brand-gold"
        viewBox="0 0 1200 800"
        preserveAspectRatio="none"
        fill="none"
      >
        <motion.path
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 2, delay: 0.2, ease: "easeOut" }}
          d="M -50 120 Q 80 80, 180 120 T 380 120 T 580 120 T 780 120 T 980 120 T 1250 120"
          stroke="currentColor"
          strokeWidth="1"
          strokeOpacity="0.18"
        />
        <motion.path
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 2.4, delay: 0.35, ease: "easeOut" }}
          d="M -50 280 Q 130 220, 290 280 T 590 280 T 890 280 T 1250 280"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeOpacity="0.3"
        />
        <motion.path
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 2.8, delay: 0.5, ease: "easeOut" }}
          d="M -50 460 Q 150 540, 320 460 T 660 460 T 1000 460 T 1300 460"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeOpacity="0.36"
          strokeDasharray="4 6"
        />
        <motion.path
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 2.4, delay: 0.65, ease: "easeOut" }}
          d="M -50 640 Q 110 600, 230 640 T 470 640 T 710 640 T 950 640 T 1250 640"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeOpacity="0.22"
        />
        <motion.path
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 2, delay: 0.8, ease: "easeOut" }}
          d="M -50 760 Q 70 730, 170 760 T 370 760 T 570 760 T 770 760 T 970 760 T 1250 760"
          stroke="currentColor"
          strokeWidth="0.8"
          strokeOpacity="0.14"
        />
      </svg>

      <div className="container mx-auto px-4 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20 max-w-2xl mx-auto"
        >
          <p className="text-xs uppercase tracking-[0.3em] font-semibold text-brand-gold-dark mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-brand-gold" />
            {t("overline")}
            <span className="h-px w-8 bg-brand-gold" />
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-brand-black leading-[1.05]">
            {t("title")}
          </h2>
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-10 lg:gap-8 relative">
            {CARDS.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.key}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                  className={`group flex flex-col gap-6 ${COLUMN_OFFSETS[i]}`}
                >
                  <motion.figure
                    whileHover={{ rotate: 0, scale: 1.02, transition: { duration: 0.4 } }}
                    className={`relative ${PHOTO_TILTS[i]} transition-transform duration-500`}
                  >
                    <span
                      aria-hidden
                      className="absolute -inset-4 rounded-3xl bg-brand-gold/0 group-hover:bg-brand-gold/15 blur-2xl transition-colors duration-500 pointer-events-none"
                    />
                    <div className="relative aspect-[4/5] rounded-2xl overflow-hidden ring-1 ring-black/10 shadow-[0_25px_50px_-15px_rgba(0,0,0,0.3)]">
                      <Image
                        src={card.image}
                        alt={card.imageAlt}
                        fill
                        sizes="(min-width: 1024px) 320px, (min-width: 768px) 33vw, 90vw"
                        className="object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-[1.04]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                    </div>
                  </motion.figure>

                  <div
                    className={`relative ${CARD_STYLES[i]} rounded-2xl p-6 shadow-[0_15px_40px_-20px_rgba(0,0,0,0.2)]`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className={`inline-flex items-center justify-center w-11 h-11 rounded-xl shrink-0 ${ICON_STYLES[i]}`}
                      >
                        <Icon className="h-5 w-5" strokeWidth={1.75} />
                      </span>
                      <h3 className="text-xl font-extrabold tracking-tight leading-tight">
                        {t(card.key)}
                      </h3>
                    </div>
                    <p className={`text-[15px] leading-relaxed ${DESC_STYLES[i]}`}>
                      {t(`${card.key}Desc`)}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
