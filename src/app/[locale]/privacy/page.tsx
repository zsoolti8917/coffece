"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { OrderModal } from "@/components/order-picker/order-modal";

export default function PrivacyPage() {
  const t = useTranslations("privacy");
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
              1. Správca osobných údajov
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Správcom vašich osobných údajov je spoločnosť Coffece, so sídlom na adrese Ulica 123, 010 01 Mesto, Slovensko.
              Kontaktovať nás môžete na adrese info@coffece.sk.
            </p>

            <h2 className="text-xl font-bold text-brand-black mt-8 mb-3">
              2. Aké údaje zbierame
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Zbierame osobné údaje, ktoré nám poskytnete priamo – meno, e-mail, telefónne číslo, názov spoločnosti
              a správy zaslané prostredníctvom kontaktného formulára alebo objednávkového formulára.
            </p>

            <h2 className="text-xl font-bold text-brand-black mt-8 mb-3">
              3. Účel spracovania
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Vaše osobné údaje spracúvame za účelom vybavovania objednávok, odpovedania na vaše otázky
              a poskytovania zákazníckeho servisu. Bez vášho súhlasu nebudeme vaše údaje používať
              na marketingové účely.
            </p>

            <h2 className="text-xl font-bold text-brand-black mt-8 mb-3">
              4. Uchovávanie údajov
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Vaše osobné údaje uchovávame po dobu nevyhnutne potrebnú na splnenie účelu, na ktorý boli
              zhromaždené, prípadne po dobu vyžadovanú príslušnými právnymi predpismi.
            </p>

            <h2 className="text-xl font-bold text-brand-black mt-8 mb-3">
              5. Vaše práva
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Máte právo na prístup k vašim osobným údajom, ich opravu, vymazanie, obmedzenie spracovania
              a prenosnosť. Môžete tiež namietať proti spracovaniu vašich údajov. Pre uplatnenie vašich práv
              nás kontaktujte na info@coffece.sk.
            </p>

            <h2 className="text-xl font-bold text-brand-black mt-8 mb-3">
              6. Cookies
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Naša webová stránka používa cookies. Viac informácií nájdete v našich{" "}
              <a href="/cookies" className="text-brand-gold hover:underline">
                Zásadách používania cookies
              </a>.
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
