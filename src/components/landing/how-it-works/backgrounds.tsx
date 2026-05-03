"use client";

import Image from "next/image";
import { motion } from "framer-motion";

function HairlineRules() {
  return (
    <>
      <span aria-hidden className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent pointer-events-none" />
      <span aria-hidden className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent pointer-events-none" />
    </>
  );
}

const CINEMATIC_WISPS = [
  { d: "M 120 800 C 100 620, 180 540, 110 380 S 130 200, 90 60",   dur: 9,    delay: 0   },
  { d: "M 280 800 C 320 640, 230 520, 300 360 S 250 200, 290 40",  dur: 11,   delay: 1.3 },
  { d: "M 460 800 C 430 660, 510 540, 440 380 S 480 200, 450 50",  dur: 10,   delay: 2.4 },
  { d: "M 640 800 C 680 640, 600 520, 670 360 S 620 180, 660 30",  dur: 12,   delay: 0.7 },
  { d: "M 820 800 C 790 620, 870 540, 800 380 S 840 220, 810 70",  dur: 9.5,  delay: 3   },
  { d: "M 1000 800 C 1040 660, 960 540, 1030 380 S 980 200, 1010 40", dur: 11.5, delay: 1.8 },
  { d: "M 1140 800 C 1110 640, 1180 520, 1130 360 S 1160 180, 1130 30", dur: 10.5, delay: 0.3 },
];

export function BgCinematic() {
  return (
    <>
      <motion.div
        aria-hidden
        initial={{ scale: 1 }}
        animate={{ scale: 1.08 }}
        transition={{ duration: 22, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
        className="absolute inset-0 pointer-events-none"
      >
        <Image
          src="/images/lifestyle/coffe-bg.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-b from-brand-black/80 via-brand-black/50 to-brand-black/95 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-black/45 via-transparent to-brand-black/45 pointer-events-none" />

      <motion.div
        aria-hidden
        animate={{ scale: [1, 1.08, 1], opacity: [0.18, 0.32, 0.18], x: [0, 30, 0], y: [0, -16, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-1/4 -left-1/4 w-[60%] h-[80%] rounded-full blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--color-brand-gold) 50%, transparent) 0%, transparent 65%)",
          mixBlendMode: "screen",
        }}
      />

      <svg
        aria-hidden
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <defs>
          <linearGradient id="cinematic-wisp" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="var(--color-brand-gold)" stopOpacity="0.55" />
            <stop offset="60%" stopColor="var(--color-brand-gold)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="var(--color-brand-gold)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="cinematic-wisp-dark" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="var(--color-brand-gold-dark)" stopOpacity="0.45" />
            <stop offset="60%" stopColor="var(--color-brand-gold-dark)" stopOpacity="0.18" />
            <stop offset="100%" stopColor="var(--color-brand-gold-dark)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {CINEMATIC_WISPS.map((w, i) => (
          <motion.path
            key={i}
            d={w.d}
            stroke={i % 2 === 0 ? "url(#cinematic-wisp)" : "url(#cinematic-wisp-dark)"}
            strokeWidth={i % 3 === 0 ? 1.6 : 1.1}
            strokeLinecap="round"
            animate={{ pathLength: [0, 1, 1], opacity: [0, 0.9, 0] }}
            transition={{
              duration: w.dur,
              times: [0, 0.55, 1],
              repeat: Infinity,
              ease: "easeOut",
              delay: w.delay,
            }}
          />
        ))}
      </svg>

      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>")`,
        }}
      />

      <HairlineRules />
    </>
  );
}
