"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useSteps } from "./shared";
import { BgCinematic } from "./backgrounds";

export function WorkTimeline() {
  const { overline, title, steps } = useSteps();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 60%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="py-24 lg:py-32 bg-brand-black text-white relative overflow-hidden">
      <BgCinematic />

      <div className="container mx-auto px-4 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20 max-w-2xl mx-auto"
        >
          <p className="text-xs uppercase tracking-[0.3em] font-semibold text-brand-gold mb-4">
            {overline}
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
            {title}
          </h2>
        </motion.div>

        <div ref={ref} className="relative max-w-5xl mx-auto">
          <div className="absolute left-8 lg:left-1/2 lg:-translate-x-1/2 top-0 bottom-0 w-px bg-white/10" />
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-8 lg:left-1/2 lg:-translate-x-1/2 top-0 w-px bg-gradient-to-b from-brand-gold via-brand-gold to-brand-gold/0 origin-top"
          />

          <div className="space-y-16 lg:space-y-24">
            {steps.map((step, i) => {
              const flip = i % 2 === 1;
              return (
                <motion.div
                  key={step.index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: 0.05 }}
                  className="relative pl-20 lg:pl-0 lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center"
                >
                  <div className="absolute left-0 top-1 lg:left-1/2 lg:-translate-x-1/2">
                    <motion.div
                      initial={{ scale: 0.7, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                      className="relative w-16 h-16 rounded-full bg-brand-gold text-brand-black font-extrabold text-xl flex items-center justify-center shadow-[0_0_0_8px_var(--color-brand-black),0_0_30px_-4px_var(--color-brand-gold)]"
                    >
                      {step.num}
                    </motion.div>
                  </div>

                  <div className={`lg:col-span-1 ${flip ? "lg:col-start-2" : ""}`}>
                    <div
                      className={`bg-white/[0.04] backdrop-blur-sm border border-white/10 rounded-2xl p-7 ${
                        flip ? "lg:ml-12" : "lg:mr-12 lg:text-right"
                      }`}
                    >
                      <p className="text-[10px] tracking-[0.35em] uppercase text-brand-gold mb-2 font-semibold">
                        Krok {step.num}
                      </p>
                      <h3 className="text-2xl lg:text-3xl font-bold mb-3 leading-tight">
                        {step.title}
                      </h3>
                      <p className="text-white/60 leading-relaxed">{step.description}</p>
                    </div>
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
