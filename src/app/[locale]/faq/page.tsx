"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";
import { Phone, Mail } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { OrderModal } from "@/components/order-picker/order-modal";
import { BrandButton } from "@/components/ui/brand-button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

type FaqItem = { q: string; a: string; cat: string };

const CATEGORY_ORDER = ["ordering", "delivery", "products", "general"] as const;
type CategoryKey = (typeof CATEGORY_ORDER)[number];

export default function FaqPage() {
  const t = useTranslations("faq");
  const tNav = useTranslations("nav");
  const tContact = useTranslations("contact.info");
  const [orderOpen, setOrderOpen] = useState(false);
  const [activeCat, setActiveCat] = useState<CategoryKey>("ordering");

  const items = t.raw("items") as FaqItem[];
  const categoryLabels = t.raw("categories") as Record<string, string>;

  const grouped = useMemo(() => {
    const map = new Map<CategoryKey, FaqItem[]>();
    for (const cat of CATEGORY_ORDER) map.set(cat, []);
    for (const item of items) {
      const cat = item.cat as CategoryKey;
      if (map.has(cat)) map.get(cat)!.push(item);
    }
    return map;
  }, [items]);

  const sectionRefs = useRef<Record<CategoryKey, HTMLElement | null>>({
    ordering: null,
    delivery: null,
    products: null,
    general: null,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const cat = (visible.target as HTMLElement).dataset.category as CategoryKey | undefined;
          if (cat) setActiveCat(cat);
        }
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    for (const cat of CATEGORY_ORDER) {
      const el = sectionRefs.current[cat];
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (cat: CategoryKey) => {
    const el = sectionRefs.current[cat];
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const phone = tContact("phone");
  const phoneTel = phone.replace(/[^\d+]/g, "");

  return (
    <>
      <Navbar onOrderClick={() => setOrderOpen(true)} />
      <main className="bg-background min-h-screen">
        {/* Slim editorial hero */}
        <section className="relative bg-brand-black text-white overflow-hidden">
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
            <Image
              src="/images/decorative/coffee-beans-pattern.png"
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <div className="container mx-auto px-4 lg:px-8 relative z-10 py-20 lg:py-24">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xs uppercase tracking-[0.3em] font-semibold text-brand-gold mb-5 flex items-center gap-3"
            >
              <span className="h-px w-10 bg-brand-gold" />
              {t("eyebrow")}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight max-w-3xl leading-[1.05]"
            >
              {t("title")}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-white/65 text-lg mt-5 max-w-xl"
            >
              {t("subtitle")}
            </motion.p>
          </div>
        </section>

        {/* Editorial split */}
        <section className="container mx-auto px-4 lg:px-8 py-20 lg:py-24">
          <div className="grid lg:grid-cols-[260px_1fr] xl:grid-cols-[280px_1fr] gap-12 lg:gap-16 items-start">
            {/* Left rail */}
            <aside className="min-w-0 lg:sticky lg:top-24">
              <p className="text-[10px] uppercase tracking-[0.3em] font-semibold text-brand-gold mb-5">
                {t("eyebrow")}
              </p>
              <nav className="flex flex-row lg:flex-col gap-2 lg:gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 -mx-4 px-4 lg:mx-0 lg:px-0">
                {CATEGORY_ORDER.map((cat) => {
                  const isActive = cat === activeCat;
                  const count = grouped.get(cat)?.length ?? 0;
                  return (
                    <button
                      key={cat}
                      onClick={() => scrollToSection(cat)}
                      className={`group relative flex items-center justify-between gap-3 px-4 py-3 rounded-md text-left text-sm transition whitespace-nowrap lg:whitespace-normal ${
                        isActive
                          ? "bg-brand-gold/10 text-foreground font-bold"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/60 font-medium"
                      }`}
                    >
                      <span
                        aria-hidden
                        className={`hidden lg:block absolute left-0 top-2 bottom-2 w-[3px] rounded-r-full bg-brand-gold transition-opacity ${
                          isActive ? "opacity-100" : "opacity-0"
                        }`}
                      />
                      <span>{categoryLabels[cat] ?? cat}</span>
                      <span
                        className={`text-xs tabular-nums ${
                          isActive ? "text-brand-gold" : "text-muted-foreground/60"
                        }`}
                      >
                        {String(count).padStart(2, "0")}
                      </span>
                    </button>
                  );
                })}
              </nav>

              {/* Need help mini-card */}
              <div className="hidden lg:block mt-10 rounded-2xl bg-brand-black text-white p-5 border border-brand-gold/30">
                <p className="text-[10px] uppercase tracking-[0.3em] text-brand-gold font-semibold mb-3">
                  {t("needHelp")}
                </p>
                <a
                  href={`tel:${phoneTel}`}
                  className="group flex items-center gap-3 text-sm font-bold text-white hover:text-brand-gold transition mb-2"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-gold/15 text-brand-gold group-hover:bg-brand-gold/25 transition">
                    <Phone className="h-4 w-4" />
                  </span>
                  <span className="tracking-tight">{phone}</span>
                </a>
                <a
                  href={`mailto:${tContact("email")}`}
                  className="group flex items-center gap-3 text-sm text-white/70 hover:text-brand-gold transition"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-white/60 group-hover:bg-brand-gold/15 group-hover:text-brand-gold transition">
                    <Mail className="h-4 w-4" />
                  </span>
                  <span>{tContact("email")}</span>
                </a>
              </div>
            </aside>

            {/* Content */}
            <div className="min-w-0">
              {CATEGORY_ORDER.map((cat, idx) => {
                const list = grouped.get(cat) ?? [];
                if (list.length === 0) return null;
                return (
                  <section
                    key={cat}
                    id={`faq-${cat}`}
                    data-category={cat}
                    ref={(el) => {
                      sectionRefs.current[cat] = el;
                    }}
                    className={idx === 0 ? "scroll-mt-24" : "scroll-mt-24 mt-20"}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.6 }}
                    >
                      <p className="text-[11px] uppercase tracking-[0.3em] font-semibold text-brand-gold mb-3">
                        {String(idx + 1).padStart(2, "0")} / {categoryLabels[cat] ?? cat}
                      </p>
                      <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-5">
                        {categoryLabels[cat] ?? cat}
                      </h2>
                      <motion.span
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.7, delay: 0.15 }}
                        style={{ transformOrigin: "left" }}
                        className="block h-[2px] w-16 bg-brand-gold mb-6"
                      />
                    </motion.div>

                    <Accordion className="border-t border-border/60">
                      {list.map((item, i) => (
                        <AccordionItem
                          key={i}
                          value={`${cat}-${i}`}
                          className="border-b border-border/60"
                        >
                          <AccordionTrigger className="py-5 text-left text-base md:text-lg font-semibold tracking-tight hover:no-underline hover:text-brand-gold transition-colors">
                            {item.q}
                          </AccordionTrigger>
                          <AccordionContent>
                            <p className="text-muted-foreground leading-relaxed text-base pr-8">
                              {item.a}
                            </p>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </section>
                );
              })}
            </div>
          </div>
        </section>

        {/* Bottom call band */}
        <section className="relative bg-brand-black text-white overflow-hidden">
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
            <Image
              src="/images/decorative/coffee-beans-pattern.png"
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <motion.div
            animate={{ scale: [1, 1.08, 1], opacity: [0.18, 0.32, 0.18] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-24 left-1/2 -translate-x-1/2 w-[60vw] h-[60vw] rounded-full bg-[radial-gradient(circle,_var(--color-brand-gold)_0%,_transparent_55%)] blur-3xl pointer-events-none"
          />
          <div className="container mx-auto px-4 lg:px-8 relative z-10 py-20 lg:py-24">
            <div className="grid lg:grid-cols-[1fr_auto] gap-10 lg:gap-16 items-center">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] font-semibold text-brand-gold mb-4 flex items-center gap-3">
                  <span className="h-px w-10 bg-brand-gold" />
                  {t("bottomBand.eyebrow")}
                </p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.1] max-w-2xl">
                  {t("bottomBand.title")}
                </h2>
                <p className="text-white/65 text-base md:text-lg mt-4 max-w-xl">
                  {t("bottomBand.subtitle")}
                </p>
              </div>
              <div className="flex flex-col gap-4 lg:items-end">
                <a
                  href={`tel:${phoneTel}`}
                  className="group flex items-center gap-4 rounded-2xl border-2 border-brand-gold/40 bg-white/[0.03] px-6 py-5 transition hover:border-brand-gold hover:bg-white/[0.06]"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-gold/15 text-brand-gold transition group-hover:bg-brand-gold/25">
                    <Phone className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-brand-gold font-semibold mb-0.5">
                      {tContact("phoneLabel")}
                    </p>
                    <p className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight whitespace-nowrap">
                      {phone}
                    </p>
                  </div>
                </a>
                <BrandButton size="lg" onClick={() => setOrderOpen(true)} className="self-stretch lg:self-end">
                  {tNav("order")}
                </BrandButton>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <OrderModal open={orderOpen} onClose={() => setOrderOpen(false)} />
    </>
  );
}
