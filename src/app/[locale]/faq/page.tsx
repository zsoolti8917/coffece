"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/routing";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { OrderModal } from "@/components/order-picker/order-modal";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

type FaqItem = {
  q: string;
  a: string;
  cat: string;
};

const CATEGORIES = ["all", "ordering", "delivery", "products", "general"] as const;
type Category = (typeof CATEGORIES)[number];

export default function FaqPage() {
  const t = useTranslations("faq");
  const [orderOpen, setOrderOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<Category>("all");

  const items = t.raw("items") as FaqItem[];
  const categoryLabels = t.raw("categories") as Record<string, string>;

  const filtered =
    activeCategory === "all"
      ? items
      : items.filter((item) => item.cat === activeCategory);

  return (
    <>
      <Navbar onOrderClick={() => setOrderOpen(true)} />
      <main className="bg-white min-h-screen">
        {/* Hero */}
        <section className="bg-brand-black text-white py-20 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-brand-gold text-sm uppercase tracking-widest font-medium mb-4"
            >
              Coffece
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              {t("title")}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-gray-300 text-lg"
            >
              {t("subtitle")}
            </motion.p>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-3xl">
            {/* Category filter */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap gap-2 mb-10"
            >
              {CATEGORIES.map((cat) => {
                const label =
                  cat === "all"
                    ? "All"
                    : categoryLabels[cat] ?? cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      activeCategory === cat
                        ? "bg-brand-gold text-black"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </motion.div>

            {/* Accordion */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <Accordion>
                  {filtered.map((item, idx) => (
                    <AccordionItem key={idx} value={String(idx)}>
                      <AccordionTrigger className="text-base font-medium py-4">
                        {item.q}
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-600 leading-relaxed">{item.a}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-brand-gold-light py-16 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="container mx-auto max-w-2xl text-center"
          >
            <h2 className="text-2xl font-bold text-brand-black mb-4">
              {t("subtitle")}
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
              <Link href="/contact">
                <Button variant="outline" className="border-brand-black text-brand-black hover:bg-brand-black hover:text-white">
                  Kontakt
                </Button>
              </Link>
              <Button
                onClick={() => setOrderOpen(true)}
                className="bg-brand-gold hover:bg-brand-gold-dark text-black font-semibold"
              >
                Objednať
              </Button>
            </div>
          </motion.div>
        </section>
      </main>
      <Footer />
      <OrderModal open={orderOpen} onClose={() => setOrderOpen(false)} />
    </>
  );
}
