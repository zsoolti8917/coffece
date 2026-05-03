"use client";

import { useTranslations } from "next-intl";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const HOVER_TARGET_RATE = 0;
const HOVER_TWEEN_MS = 650;

const ITEM_COUNT = 8;
const ROW_TOP_DURATION = 55;
const ROW_BOTTOM_DURATION = 65;

const ACCENT_TONES = [
  "from-brand-gold/25 to-brand-gold/5",
  "from-amber-400/25 to-amber-400/5",
  "from-orange-300/25 to-orange-300/5",
  "from-yellow-300/25 to-yellow-300/5",
];

type Item = {
  quote: string;
  name: string;
  role: string;
  initial: string;
  accent: string;
};

function ReviewCard({ item }: { item: Item }) {
  return (
    <figure className="relative w-[320px] md:w-[380px] shrink-0 bg-white border border-black/[0.08] rounded-2xl p-6 transition-[border,box-shadow,transform] duration-300 hover:border-brand-gold/50 hover:shadow-[0_25px_60px_-25px_rgba(0,0,0,0.18)] hover:-translate-y-0.5">
      <Quote
        className="absolute top-4 right-5 h-8 w-8 text-brand-gold/25 rotate-180"
        strokeWidth={1.5}
        aria-hidden
      />

      <div className="flex items-center gap-1 mb-3 text-brand-gold">
        {Array.from({ length: 5 }).map((_, s) => (
          <Star key={s} className="h-3 w-3 fill-current" strokeWidth={0} aria-hidden />
        ))}
      </div>

      <blockquote className="text-brand-black/85 text-[15px] leading-relaxed mb-5 line-clamp-4">
        <span className="text-brand-gold font-serif text-xl leading-none mr-1">“</span>
        {item.quote}
        <span className="text-brand-gold font-serif text-xl leading-none ml-0.5">”</span>
      </blockquote>

      <div className="h-px bg-black/[0.08] mb-4" />

      <figcaption className="flex items-center gap-3">
        <span
          className={`inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br ${item.accent} text-brand-black font-extrabold text-sm ring-1 ring-brand-gold/30 shrink-0`}
          aria-hidden
        >
          {item.initial}
        </span>
        <div className="min-w-0">
          <p className="font-bold text-brand-black text-sm leading-tight truncate">{item.name}</p>
          <p className="text-brand-black/55 text-[11px] mt-0.5 truncate">{item.role}</p>
        </div>
      </figcaption>
    </figure>
  );
}

function MarqueeRow({
  items,
  direction,
  duration,
}: {
  items: Item[];
  direction: "left" | "right";
  duration: number;
}) {
  const loop = [...items, ...items];
  const directionClass = direction === "left" ? "marquee-row-left" : "marquee-row-right";

  const ref = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const tweenRate = useCallback((target: number) => {
    const el = ref.current;
    if (!el || typeof el.getAnimations !== "function") return;
    const animations = el.getAnimations();
    if (animations.length === 0) return;

    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    const startTime = performance.now();
    const fromRates = animations.map((a) => a.playbackRate);

    const step = (now: number) => {
      const t = Math.min(1, (now - startTime) / HOVER_TWEEN_MS);
      const eased = 1 - Math.pow(1 - t, 3);
      animations.forEach((a, i) => {
        a.playbackRate = fromRates[i] + (target - fromRates[i]) * eased;
      });
      if (t < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        rafRef.current = null;
      }
    };

    rafRef.current = requestAnimationFrame(step);
  }, []);

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`marquee-row ${directionClass} flex w-max gap-6 will-change-transform`}
      style={{ ["--marquee-duration" as string]: `${duration}s` }}
      onMouseEnter={() => tweenRate(HOVER_TARGET_RATE)}
      onMouseLeave={() => tweenRate(1)}
      aria-hidden={false}
    >
      {loop.map((item, i) => (
        <ReviewCard key={`${direction}-${i}`} item={item} />
      ))}
    </div>
  );
}

export function Testimonials() {
  const t = useTranslations("testimonials");

  const items: Item[] = useMemo(
    () =>
      Array.from({ length: ITEM_COUNT }, (_, i) => ({
        quote: t(`items.${i}.quote`),
        name: t(`items.${i}.name`),
        role: t(`items.${i}.role`),
        initial: t(`items.${i}.name`).trim().charAt(0),
        accent: ACCENT_TONES[i % ACCENT_TONES.length],
      })),
    [t],
  );

  const offsetItems = [...items.slice(4), ...items.slice(0, 4)];

  return (
    <section className="testimonials-section py-24 lg:py-28 bg-stone-50 relative overflow-hidden">
      <style>{`
        @keyframes coffece-marquee-left {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(-50%, 0, 0); }
        }
        @keyframes coffece-marquee-right {
          from { transform: translate3d(-50%, 0, 0); }
          to   { transform: translate3d(0, 0, 0); }
        }
        .marquee-row {
          animation-duration: var(--marquee-duration, 55s);
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          animation-play-state: running;
        }
        .marquee-row-left  { animation-name: coffece-marquee-left; }
        .marquee-row-right { animation-name: coffece-marquee-right; }
        @media (prefers-reduced-motion: reduce) {
          .marquee-row { animation: none !important; }
        }
      `}</style>

      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-[radial-gradient(circle,_var(--color-brand-gold)_0%,_transparent_70%)] opacity-30 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-20 w-72 h-72 rounded-full bg-[radial-gradient(circle,_var(--color-brand-gold)_0%,_transparent_70%)] opacity-20 blur-3xl pointer-events-none" />

      <div className="relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 max-w-2xl mx-auto px-4"
        >
          <p className="text-xs uppercase tracking-[0.3em] font-semibold text-brand-gold-dark mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-brand-gold" />
            {t("overline")}
            <span className="h-px w-8 bg-brand-gold" />
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-brand-black">
            {t("title")}
          </h2>
        </motion.div>

        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 lg:w-40 z-10 bg-gradient-to-r from-stone-50 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 lg:w-40 z-10 bg-gradient-to-l from-stone-50 to-transparent" />

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <MarqueeRow items={items} direction="left" duration={ROW_TOP_DURATION} />
            <MarqueeRow items={offsetItems} direction="right" duration={ROW_BOTTOM_DURATION} />
          </motion.div>
        </div>

        <p className="text-center mt-10 text-[10px] tracking-[0.3em] uppercase text-brand-black/35">
          Hover na pozastavenie
        </p>
      </div>
    </section>
  );
}
