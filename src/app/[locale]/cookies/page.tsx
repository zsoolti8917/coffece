"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { OrderModal } from "@/components/order-picker/order-modal";

export default function CookiesPage() {
  const t = useTranslations("cookiesPage");
  const [orderOpen, setOrderOpen] = useState(false);

  return (
    <>
      <Navbar onOrderClick={() => setOrderOpen(true)} />
      <main className="bg-white min-h-screen">
        {/* Hero */}
        <section className="bg-brand-black text-white py-20 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold"
            >
              {t("title")}
            </motion.h1>
          </div>
        </section>

        {/* Content */}
        <section className="py-20 px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="container mx-auto max-w-3xl prose prose-gray"
          >
            <p className="text-gray-500 text-sm mb-8">
              Posledná aktualizácia: 1. január 2025
            </p>

            <h2 className="text-xl font-bold text-brand-black mt-8 mb-3">
              1. Čo sú cookies?
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Cookies sú malé textové súbory, ktoré sa ukladajú vo vašom prehliadači pri návšteve webovej
              stránky. Pomáhajú stránke zapamätať si vaše preferencie a zlepšujú váš zážitok z prehliadania.
            </p>

            <h2 className="text-xl font-bold text-brand-black mt-8 mb-3">
              2. Aké cookies používame
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Na našej stránke používame nasledujúce typy cookies:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
              <li>
                <strong>Nevyhnutné cookies</strong> – sú potrebné pre správne fungovanie stránky
                a nemožno ich vypnúť.
              </li>
              <li>
                <strong>Analytické cookies</strong> – pomáhajú nám pochopiť, ako návštevníci
                používajú našu stránku, aby sme ju mohli zlepšovať.
              </li>
              <li>
                <strong>Funkčné cookies</strong> – umožňujú stránke zapamätať si vaše voľby
                (napr. jazykové preferencie).
              </li>
            </ul>

            <h2 className="text-xl font-bold text-brand-black mt-8 mb-3">
              3. Správa cookies
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Súhlas s používaním cookies môžete kedykoľvek odvolať vymazaním cookies vo vašom prehliadači
              alebo prostredníctvom nastavení prehliadača. Upozorňujeme, že vypnutie niektorých cookies
              môže ovplyvniť funkčnosť stránky.
            </p>

            <h2 className="text-xl font-bold text-brand-black mt-8 mb-3">
              4. Ďalšie informácie
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Viac informácií o tom, ako spracúvame vaše osobné údaje, nájdete v našich{" "}
              <Link href="/privacy" className="text-brand-gold hover:underline">
                Zásadách ochrany osobných údajov
              </Link>.
              V prípade otázok nás kontaktujte na info@coffece.sk.
            </p>

            <p className="text-gray-400 text-sm mt-10">
              {t("content")}
            </p>
          </motion.div>
        </section>
      </main>
      <Footer />
      <OrderModal open={orderOpen} onClose={() => setOrderOpen(false)} />
    </>
  );
}
