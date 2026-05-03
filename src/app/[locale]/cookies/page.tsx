"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { OrderModal } from "@/components/order-picker/order-modal";

const LAST_UPDATED = { sk: "26. apríl 2026", en: "26 April 2026" };

export default function CookiesPage() {
  const t = useTranslations("cookiesPage");
  const locale = useLocale();
  const isSk = locale === "sk";
  const [orderOpen, setOrderOpen] = useState(false);

  return (
    <>
      <Navbar onOrderClick={() => setOrderOpen(true)} />
      <main className="bg-white min-h-screen">
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

        <section className="py-20 px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="container mx-auto max-w-3xl"
          >
            <p className="text-gray-500 text-sm mb-10">
              {isSk ? "Posledná aktualizácia" : "Last updated"}: {isSk ? LAST_UPDATED.sk : LAST_UPDATED.en}
            </p>

            {isSk ? <SlovakCookies /> : <EnglishCookies />}
          </motion.div>
        </section>
      </main>
      <Footer />
      <OrderModal open={orderOpen} onClose={() => setOrderOpen(false)} />
    </>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="text-xl font-bold text-brand-black mt-10 mb-3">{children}</h2>;
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-gray-700 leading-relaxed mb-4">{children}</p>;
}

function UL({ children }: { children: React.ReactNode }) {
  return <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-4 space-y-1.5">{children}</ul>;
}

function CookieTable({
  rows,
  headers,
}: {
  rows: { name: string; purpose: string; duration: string; party: string }[];
  headers: { name: string; purpose: string; duration: string; party: string };
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 mb-6">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-50 text-gray-700">
          <tr>
            <th className="px-4 py-3 font-semibold">{headers.name}</th>
            <th className="px-4 py-3 font-semibold">{headers.purpose}</th>
            <th className="px-4 py-3 font-semibold">{headers.duration}</th>
            <th className="px-4 py-3 font-semibold">{headers.party}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 text-gray-700">
          {rows.map((r) => (
            <tr key={r.name}>
              <td className="px-4 py-3 font-mono text-xs">{r.name}</td>
              <td className="px-4 py-3">{r.purpose}</td>
              <td className="px-4 py-3 whitespace-nowrap">{r.duration}</td>
              <td className="px-4 py-3 whitespace-nowrap">{r.party}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SlovakCookies() {
  return (
    <>
      <H2>1. Čo sú cookies</H2>
      <P>
        Cookies sú malé textové súbory, ktoré webová stránka pri jej návšteve ukladá vo vašom zariadení
        (počítač, tablet, mobil). Slúžia na zabezpečenie základných funkcií stránky a — výlučne na
        základe vášho súhlasu — na meranie návštevnosti.
      </P>

      <H2>2. Právny rámec</H2>
      <P>
        Používanie cookies upravuje § 109 zákona č. 452/2021 Z. z. o elektronických komunikáciách
        a Nariadenie Európskeho parlamentu a Rady (EÚ) 2016/679 (GDPR). Pre cookies, ktoré nie sú
        nevyhnutne potrebné na fungovanie stránky, je potrebný váš predchádzajúci preukázateľný
        súhlas.
      </P>

      <H2>3. Aké cookies používame</H2>
      <P>
        <strong>Nevyhnutné (technické) cookies</strong> — sú potrebné pre základné fungovanie stránky a
        nevyžadujú váš súhlas. Patrí sem napríklad záznam o vašom rozhodnutí ohľadom cookies a uložená
        voľba jazyka.
      </P>
      <P>
        <strong>Analytické cookies (Google Analytics 4)</strong> — používame ich len s vaším výslovným
        súhlasom. Pomáhajú nám pochopiť, ako návštevníci stránku používajú, a postupne ju zlepšovať.
        Údaje sú agregované a neumožňujú vašu osobnú identifikáciu.
      </P>
      <P>
        <strong>Žiadne marketingové, reklamné, remarketingové ani profilovacie cookies tretích strán
        nepoužívame.</strong>
      </P>

      <H2>4. Konkrétne cookies, ktoré ukladáme</H2>
      <CookieTable
        headers={{
          name: "Názov",
          purpose: "Účel",
          duration: "Doba uchovávania",
          party: "Strana",
        }}
        rows={[
          {
            name: "cookie-consent",
            purpose: "Záznam vášho rozhodnutia o cookies (prijaté/odmietnuté)",
            duration: "trvalo (localStorage)",
            party: "Coffece (vlastná)",
          },
          {
            name: "NEXT_LOCALE",
            purpose: "Voľba jazyka rozhrania (sk/en)",
            duration: "1 rok",
            party: "Coffece (vlastná)",
          },
          {
            name: "_ga",
            purpose: "Rozlíšenie unikátnych návštevníkov (Google Analytics 4)",
            duration: "2 roky",
            party: "Google",
          },
          {
            name: "_ga_<ID>",
            purpose: "Stav relácie (Google Analytics 4)",
            duration: "2 roky",
            party: "Google",
          },
        ]}
      />
      <P className="text-sm">
        Cookies <code className="text-xs">_ga</code> a <code className="text-xs">_ga_&lt;ID&gt;</code>{" "}
        sa ukladajú len v prípade, že súhlas s analytickými cookies udelíte.
      </P>

      <H2>5. Udelenie a odvolanie súhlasu</H2>
      <P>
        Pri prvej návšteve sa vám zobrazí cookie lišta, kde môžete súhlas s analytickými cookies prijať
        alebo odmietnuť. Vaše rozhodnutie môžete kedykoľvek zmeniť:
      </P>
      <UL>
        <li>
          vymazaním súborov cookies a údajov stránky vo vašom prehliadači — pri ďalšej návšteve sa
          lišta zobrazí znova,
        </li>
        <li>
          alebo nás kontaktujte na{" "}
          <a href="mailto:info@coffece.sk" className="text-brand-gold-dark hover:underline">
            info@coffece.sk
          </a>
          .
        </li>
      </UL>

      <H2>6. Správa cookies v prehliadači</H2>
      <P>Cookies môžete povoliť, blokovať alebo zmazať v nastaveniach vášho prehliadača:</P>
      <UL>
        <li>
          <a
            href="https://support.google.com/chrome/answer/95647"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-gold-dark hover:underline"
          >
            Google Chrome
          </a>
        </li>
        <li>
          <a
            href="https://support.mozilla.org/sk/kb/cookies-informacie-ktore-webove-stranky-ukladaju-"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-gold-dark hover:underline"
          >
            Mozilla Firefox
          </a>
        </li>
        <li>
          <a
            href="https://support.apple.com/sk-sk/guide/safari/sfri11471/mac"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-gold-dark hover:underline"
          >
            Apple Safari
          </a>
        </li>
        <li>
          <a
            href="https://support.microsoft.com/sk-sk/microsoft-edge"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-gold-dark hover:underline"
          >
            Microsoft Edge
          </a>
        </li>
      </UL>
      <P>Upozorňujeme, že vypnutie nevyhnutných cookies môže obmedziť fungovanie stránky.</P>

      <H2>7. Ďalšie informácie</H2>
      <P>
        Spôsob, akým spracúvame vaše osobné údaje, je popísaný v{" "}
        <Link href="/privacy" className="text-brand-gold-dark hover:underline">
          Zásadách ochrany osobných údajov
        </Link>
        . V prípade otázok nás kontaktujte na{" "}
        <a href="mailto:info@coffece.sk" className="text-brand-gold-dark hover:underline">
          info@coffece.sk
        </a>
        .
      </P>

      <H2>8. Zmeny týchto zásad</H2>
      <P>
        Tieto zásady môžeme aktualizovať. Aktuálna verzia je vždy zverejnená na tejto stránke spolu
        s dátumom poslednej aktualizácie.
      </P>
    </>
  );
}

function EnglishCookies() {
  return (
    <>
      <H2>1. What are cookies</H2>
      <P>
        Cookies are small text files that a website stores on your device (computer, tablet, mobile)
        when you visit it. They are used to ensure basic site functionality and — only with your
        consent — to measure traffic.
      </P>

      <H2>2. Legal framework</H2>
      <P>
        The use of cookies is governed by § 109 of Act No. 452/2021 Coll. on electronic communications
        and Regulation (EU) 2016/679 (GDPR). Prior demonstrable consent is required for cookies that
        are not strictly necessary for the operation of the website.
      </P>

      <H2>3. What cookies we use</H2>
      <P>
        <strong>Strictly necessary (technical) cookies</strong> — required for the basic operation of
        the site; no consent required. These include the record of your cookie choice and your saved
        language preference.
      </P>
      <P>
        <strong>Analytics cookies (Google Analytics 4)</strong> — used only with your explicit consent.
        They help us understand how visitors use the site so we can improve it. The data is aggregated
        and does not allow personal identification.
      </P>
      <P>
        <strong>We do not use any marketing, advertising, remarketing or third-party profiling
        cookies.</strong>
      </P>

      <H2>4. Cookies we set</H2>
      <CookieTable
        headers={{
          name: "Name",
          purpose: "Purpose",
          duration: "Duration",
          party: "Party",
        }}
        rows={[
          {
            name: "cookie-consent",
            purpose: "Records your cookie choice (accepted/declined)",
            duration: "persistent (localStorage)",
            party: "Coffece (first-party)",
          },
          {
            name: "NEXT_LOCALE",
            purpose: "Selected interface language (sk/en)",
            duration: "1 year",
            party: "Coffece (first-party)",
          },
          {
            name: "_ga",
            purpose: "Distinguishes unique visitors (Google Analytics 4)",
            duration: "2 years",
            party: "Google",
          },
          {
            name: "_ga_<ID>",
            purpose: "Session state (Google Analytics 4)",
            duration: "2 years",
            party: "Google",
          },
        ]}
      />
      <P className="text-sm">
        The <code className="text-xs">_ga</code> and <code className="text-xs">_ga_&lt;ID&gt;</code>{" "}
        cookies are only set if you have given consent to analytics cookies.
      </P>

      <H2>5. Giving and withdrawing consent</H2>
      <P>
        On your first visit a cookie banner is shown where you can accept or decline analytics cookies.
        You can change your decision at any time:
      </P>
      <UL>
        <li>
          by clearing cookies and site data in your browser — the banner will reappear on your next
          visit,
        </li>
        <li>
          or by contacting us at{" "}
          <a href="mailto:info@coffece.sk" className="text-brand-gold-dark hover:underline">
            info@coffece.sk
          </a>
          .
        </li>
      </UL>

      <H2>6. Managing cookies in your browser</H2>
      <P>You can allow, block or delete cookies in your browser settings:</P>
      <UL>
        <li>
          <a
            href="https://support.google.com/chrome/answer/95647"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-gold-dark hover:underline"
          >
            Google Chrome
          </a>
        </li>
        <li>
          <a
            href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-gold-dark hover:underline"
          >
            Mozilla Firefox
          </a>
        </li>
        <li>
          <a
            href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-gold-dark hover:underline"
          >
            Apple Safari
          </a>
        </li>
        <li>
          <a
            href="https://support.microsoft.com/microsoft-edge"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-gold-dark hover:underline"
          >
            Microsoft Edge
          </a>
        </li>
      </UL>
      <P>Please note that disabling strictly necessary cookies may limit the functionality of the site.</P>

      <H2>7. Further information</H2>
      <P>
        How we process your personal data is described in our{" "}
        <Link href="/privacy" className="text-brand-gold-dark hover:underline">
          Privacy Policy
        </Link>
        . If you have any questions, please contact us at{" "}
        <a href="mailto:info@coffece.sk" className="text-brand-gold-dark hover:underline">
          info@coffece.sk
        </a>
        .
      </P>

      <H2>8. Changes to this policy</H2>
      <P>
        We may update this policy. The current version, together with the date of last update, is
        always published on this page.
      </P>
    </>
  );
}
