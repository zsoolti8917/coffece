"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

type ConsentValue = "accepted" | "declined";

export function CookieBanner() {
  const t = useTranslations("cookie");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("cookie-consent");
    if (!stored) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleConsent = (value: ConsentValue) => {
    localStorage.setItem("cookie-consent", value);
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6"
          role="region"
          aria-label="Cookie consent"
        >
          <div className="container mx-auto max-w-4xl">
            <div className="bg-brand-black text-white rounded-2xl px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-2xl">
              {/* Message */}
              <p className="flex-1 text-sm text-gray-300 leading-relaxed">
                {t("message")}{" "}
                <Link
                  href="/cookies"
                  className="text-brand-gold underline underline-offset-2 hover:text-brand-gold-light transition-colors"
                >
                  {t("learnMore")}
                </Link>
              </p>

              {/* Buttons */}
              <div className="flex gap-3 shrink-0">
                <button
                  onClick={() => handleConsent("declined")}
                  className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white border border-gray-600 hover:border-gray-400 rounded-lg transition-colors"
                >
                  {t("decline")}
                </button>
                <button
                  onClick={() => handleConsent("accepted")}
                  className="px-4 py-2 text-sm font-medium bg-brand-gold hover:bg-brand-gold-dark text-black rounded-lg transition-colors"
                >
                  {t("accept")}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
