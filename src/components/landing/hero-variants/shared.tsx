"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, type Variants } from "framer-motion";
import { ChevronDown } from "lucide-react";

export const LIFESTYLE_IMAGE = "/images/lifestyle/coffee-desk-1.png";

export type HeroVariantProps = { onOrderClick: () => void };

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" as const },
  }),
};

export function scrollToWhy() {
  document.getElementById("why-coffece")?.scrollIntoView({ behavior: "smooth" });
}

export function ScrollCue({ className = "bottom-8" }: { className?: string } = {}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2 }}
      className={`absolute left-1/2 -translate-x-1/2 z-20 pointer-events-none ${className}`}
    >
      <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
        <ChevronDown className="h-6 w-6 text-white/40" />
      </motion.div>
    </motion.div>
  );
}

export function useMouseParallax(strength = 12) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 80, damping: 18, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 80, damping: 18, mass: 0.5 });

  useEffect(() => {
    function onMove(e: PointerEvent) {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      x.set(nx * strength);
      y.set(ny * strength);
    }
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [strength, x, y]);

  return { x: sx, y: sy };
}

export function useScramble(target: string, durationMs = 600) {
  const [text, setText] = useState(target);
  const ref = useRef(target);

  useEffect(() => {
    ref.current = target;
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZáčďéíľĺňóŕšťúýž0123456789";
    const start = performance.now();
    let raf = 0;

    function tick(now: number) {
      const t = Math.min(1, (now - start) / durationMs);
      const reveal = Math.floor(target.length * t);
      let out = "";
      for (let i = 0; i < target.length; i++) {
        if (i < reveal || target[i] === " ") {
          out += target[i];
        } else {
          out += chars[Math.floor(Math.random() * chars.length)];
        }
      }
      setText(out);
      if (t < 1) raf = requestAnimationFrame(tick);
      else setText(target);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs]);

  return text;
}
