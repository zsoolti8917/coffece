"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { OrderModal } from "@/components/order-picker/order-modal";

const LAST_UPDATED = { sk: "26. apríl 2026", en: "26 April 2026" };

export default function PrivacyPage() {
  const t = useTranslations("privacy");
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

            {isSk ? <SlovakPrivacy /> : <EnglishPrivacy />}
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

function SlovakPrivacy() {
  return (
    <>
      <H2>1. Prevádzkovateľ</H2>
      <P>
        Prevádzkovateľom osobných údajov v zmysle čl. 4 ods. 7 Nariadenia Európskeho parlamentu a Rady (EÚ)
        2016/679 (ďalej len „GDPR&ldquo;) a zákona č. 18/2018 Z. z. o ochrane osobných údajov je:
      </P>
      <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 text-gray-700 leading-relaxed mb-4">
        <strong>[Coffece, s. r. o.]</strong>
        <br />
        [Sídlo: ulica a číslo, PSČ Mesto, Slovenská republika]
        <br />
        [IČO: __________]
        <br />
        [DIČ: __________]
        <br />
        [Zapísaná v Obchodnom registri Okresného súdu __________, oddiel __________, vložka __________]
        <br />
        E-mail: <a href="mailto:info@coffece.sk" className="text-brand-gold-dark hover:underline">info@coffece.sk</a>
      </div>
      <P>Nemenovali sme zodpovednú osobu (DPO), keďže rozsah spracúvania ho nevyžaduje.</P>

      <H2>2. Aké osobné údaje spracúvame</H2>
      <P>
        Spracúvame výlučne osobné údaje, ktoré nám dobrovoľne poskytnete vyplnením kontaktného alebo
        objednávkového formulára na webovej stránke <strong>coffece.sk</strong>:
      </P>
      <UL>
        <li>meno a priezvisko</li>
        <li>názov spoločnosti</li>
        <li>e-mailová adresa</li>
        <li>telefónne číslo</li>
        <li>obsah správy alebo údaje o dopyte (veľkosť kancelárie, počet konzumentov, výber kávy, frekvencia dodania)</li>
      </UL>
      <P>
        Okrem toho v prípade vášho súhlasu spracúva službu webovej analytiky Google Analytics 4
        agregované štatistické údaje o návštevnosti — pozri bod 9.
      </P>
      <P>
        <strong>Žiadne iné osobné údaje aktívne nezbierame.</strong> Webová stránka nepoužíva remarketing,
        reklamné cookies tretích strán, profilovanie ani sociálne pluginy.
      </P>

      <H2>3. Účel a právny základ spracúvania</H2>
      <UL>
        <li>
          <strong>Vybavenie cenovej ponuky alebo objednávky</strong> — vykonanie predzmluvných opatrení na
          vašu žiadosť, prípadne plnenie zmluvy (čl. 6 ods. 1 písm. b) GDPR).
        </li>
        <li>
          <strong>Odpoveď na otázku zaslanú cez kontaktný formulár</strong> — náš oprávnený záujem
          komunikovať so záujemcami o naše služby (čl. 6 ods. 1 písm. f) GDPR).
        </li>
        <li>
          <strong>Plnenie zákonných povinností</strong> — predovšetkým daňových a účtovných v zmysle zákona
          č. 431/2002 Z. z. o účtovníctve a zákona č. 222/2004 Z. z. o DPH (čl. 6 ods. 1 písm. c) GDPR), ak
          dôjde k uzavretiu zmluvy.
        </li>
        <li>
          <strong>Webová analytika cez Google Analytics 4</strong> — výlučne na základe vášho súhlasu
          (čl. 6 ods. 1 písm. a) GDPR), ktorý je možné kedykoľvek odvolať.
        </li>
      </UL>

      <H2>4. Doba uchovávania</H2>
      <UL>
        <li>
          Údaje z kontaktných formulárov, ktoré neviedli k uzavretiu zmluvy, uchovávame najviac
          <strong> 24 mesiacov</strong> od poslednej komunikácie.
        </li>
        <li>
          Údaje súvisiace so vznikom zmluvy a vystavenými dokladmi uchovávame <strong>10 rokov</strong>
          v zmysle § 35 zákona o účtovníctve.
        </li>
        <li>
          Údaje spracúvané službou Google Analytics 4 sú uchovávané <strong>14 mesiacov</strong> v rámci
          nastavenia služby. Po uplynutí lehoty sú automaticky anonymizované a vymazané.
        </li>
      </UL>

      <H2>5. Príjemcovia osobných údajov</H2>
      <P>Vaše osobné údaje môžu byť sprístupnené nasledujúcim sprostredkovateľom:</P>
      <UL>
        <li>
          <strong>Poskytovateľ e-mailových (SMTP) služieb</strong> — používaný výlučne na doručenie správ z
          formulárov do našej e-mailovej schránky [doplniť názov a sídlo poskytovateľa SMTP].
        </li>
        <li>
          <strong>Google Ireland Limited</strong>, Gordon House, Barrow Street, Dublin 4, Írsko (matka
          Google LLC) — v rozsahu nevyhnutnom pre fungovanie služby Google Analytics 4.
        </li>
      </UL>
      <P>Žiadnym ďalším tretím stranám vaše osobné údaje neposkytujeme ani ich nepredávame.</P>

      <H2>6. Prenos do tretích krajín</H2>
      <P>
        Pri použití služby Google Analytics 4 môže dochádzať k prenosu údajov do USA. Google LLC sa
        nachádza v zozname spoločností certifikovaných v rámci <em>EU–US Data Privacy Framework</em>
        {" "}(rozhodnutie Európskej komisie 2023/1795 z 10. júla 2023), čím je zabezpečená primeraná
        úroveň ochrany podľa čl. 45 GDPR. K iným prenosom mimo EÚ nedochádza.
      </P>

      <H2>7. Vaše práva ako dotknutej osoby</H2>
      <P>V zmysle GDPR a zákona č. 18/2018 Z. z. máte nasledujúce práva:</P>
      <UL>
        <li>právo na prístup k osobným údajom (čl. 15 GDPR)</li>
        <li>právo na opravu nesprávnych údajov (čl. 16 GDPR)</li>
        <li>právo na výmaz – „právo byť zabudnutý&ldquo; (čl. 17 GDPR)</li>
        <li>právo na obmedzenie spracúvania (čl. 18 GDPR)</li>
        <li>právo na prenosnosť údajov (čl. 20 GDPR)</li>
        <li>právo namietať proti spracúvaniu (čl. 21 GDPR)</li>
        <li>právo kedykoľvek odvolať udelený súhlas (čl. 7 ods. 3 GDPR), bez vplyvu na zákonnosť spracúvania pred jeho odvolaním</li>
      </UL>
      <P>
        Svoje práva môžete uplatniť písomne na e-mailovej adrese{" "}
        <a href="mailto:info@coffece.sk" className="text-brand-gold-dark hover:underline">
          info@coffece.sk
        </a>
        . Na žiadosť odpovieme bez zbytočného odkladu, najneskôr do <strong>30 dní</strong> od jej
        doručenia.
      </P>

      <H2>8. Právo podať sťažnosť dozornému orgánu</H2>
      <P>
        Ak sa domnievate, že došlo k porušeniu vašich práv pri spracúvaní osobných údajov, máte právo
        podať sťažnosť dozornému orgánu:
      </P>
      <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 text-gray-700 leading-relaxed mb-4">
        <strong>Úrad na ochranu osobných údajov Slovenskej republiky</strong>
        <br />
        Hraničná 12, 820 07 Bratislava 27
        <br />
        Tel.: +421 2 32 31 32 14
        <br />
        E-mail:{" "}
        <a href="mailto:statny.dozor@pdp.gov.sk" className="text-brand-gold-dark hover:underline">
          statny.dozor@pdp.gov.sk
        </a>
        <br />
        Web:{" "}
        <a
          href="https://www.dataprotection.gov.sk"
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-gold-dark hover:underline"
        >
          www.dataprotection.gov.sk
        </a>
      </div>

      <H2>9. Cookies a webová analytika</H2>
      <P>
        Naša stránka používa nevyhnutné technické cookies a — výlučne na základe vášho výslovného
        súhlasu — analytické cookies služby Google Analytics 4. Žiadne marketingové ani reklamné cookies
        nepoužívame. Podrobný zoznam a možnosť spravovania súhlasu nájdete v{" "}
        <Link href="/cookies" className="text-brand-gold-dark hover:underline">
          Zásadách používania cookies
        </Link>
        .
      </P>

      <H2>10. Automatizované rozhodovanie</H2>
      <P>
        Vaše osobné údaje nepoužívame na automatizované individuálne rozhodovanie ani na profilovanie
        v zmysle čl. 22 GDPR.
      </P>

      <H2>11. Poskytnutie údajov ako podmienka</H2>
      <P>
        Poskytnutie osobných údajov vo formulári je dobrovoľné. Bez ich poskytnutia však nedokážeme
        spracovať vašu žiadosť ani pripraviť cenovú ponuku.
      </P>

      <H2>12. Zmeny týchto zásad</H2>
      <P>
        Tieto zásady ochrany osobných údajov môžeme z času na čas aktualizovať. Aktuálna verzia bude
        vždy zverejnená na tejto stránke spolu s dátumom poslednej aktualizácie.
      </P>
    </>
  );
}

function EnglishPrivacy() {
  return (
    <>
      <H2>1. Data Controller</H2>
      <P>
        The controller of personal data within the meaning of Article 4(7) of Regulation (EU) 2016/679
        (the &ldquo;GDPR&rdquo;) and Act No. 18/2018 Coll. on the protection of personal data is:
      </P>
      <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 text-gray-700 leading-relaxed mb-4">
        <strong>[Coffece, s. r. o.]</strong>
        <br />
        [Registered office: street and number, postal code, city, Slovak Republic]
        <br />
        [Company ID (IČO): __________]
        <br />
        [Tax ID (DIČ): __________]
        <br />
        [Registered in the Commercial Register of the District Court of __________, section __________,
        insert __________]
        <br />
        Email:{" "}
        <a href="mailto:info@coffece.sk" className="text-brand-gold-dark hover:underline">
          info@coffece.sk
        </a>
      </div>
      <P>We have not appointed a Data Protection Officer, as the scope of processing does not require it.</P>

      <H2>2. What personal data we process</H2>
      <P>
        We process exclusively the personal data you voluntarily provide via the contact or order form
        on <strong>coffece.sk</strong>:
      </P>
      <UL>
        <li>first name and surname</li>
        <li>company name</li>
        <li>email address</li>
        <li>phone number</li>
        <li>message content or quote details (office size, daily drinkers, coffee choice, delivery frequency)</li>
      </UL>
      <P>
        In addition, where you have given consent, Google Analytics 4 processes aggregated visit
        statistics — see section 9.
      </P>
      <P>
        <strong>We do not actively collect any other personal data.</strong> The website does not use
        remarketing, third-party advertising cookies, profiling, or social plugins.
      </P>

      <H2>3. Purposes and legal basis of processing</H2>
      <UL>
        <li>
          <strong>Handling your quote request or order</strong> — pre-contractual measures at your
          request and, where applicable, performance of a contract (Art. 6(1)(b) GDPR).
        </li>
        <li>
          <strong>Replying to a message sent via the contact form</strong> — our legitimate interest in
          communicating with prospective customers (Art. 6(1)(f) GDPR).
        </li>
        <li>
          <strong>Compliance with legal obligations</strong> — primarily tax and accounting under Act No.
          431/2002 Coll. on Accounting and Act No. 222/2004 Coll. on VAT (Art. 6(1)(c) GDPR), where a
          contract is concluded.
        </li>
        <li>
          <strong>Web analytics via Google Analytics 4</strong> — solely on the basis of your consent
          (Art. 6(1)(a) GDPR), which can be withdrawn at any time.
        </li>
      </UL>

      <H2>4. Retention period</H2>
      <UL>
        <li>
          Contact-form data that did not lead to a contract is retained for at most{" "}
          <strong>24 months</strong> from the last communication.
        </li>
        <li>
          Data related to a concluded contract and issued accounting documents is retained for{" "}
          <strong>10 years</strong> under § 35 of the Slovak Accounting Act.
        </li>
        <li>
          Data processed by Google Analytics 4 is retained for <strong>14 months</strong> per the
          service&rsquo;s configuration; afterwards it is automatically anonymized and deleted.
        </li>
      </UL>

      <H2>5. Recipients of personal data</H2>
      <P>Your personal data may be made available to the following processors:</P>
      <UL>
        <li>
          <strong>Email (SMTP) service provider</strong> — used solely to deliver form messages to our
          mailbox [insert SMTP provider name and registered office].
        </li>
        <li>
          <strong>Google Ireland Limited</strong>, Gordon House, Barrow Street, Dublin 4, Ireland (parent
          Google LLC) — to the extent necessary for the operation of Google Analytics 4.
        </li>
      </UL>
      <P>We do not share or sell your personal data to any other third parties.</P>

      <H2>6. Transfers to third countries</H2>
      <P>
        Use of Google Analytics 4 may involve transfers of data to the USA. Google LLC is on the list of
        companies certified under the <em>EU–US Data Privacy Framework</em> (European Commission decision
        2023/1795 of 10 July 2023), which provides an adequate level of protection under Art. 45 GDPR.
        No other transfers outside the EU take place.
      </P>

      <H2>7. Your rights as a data subject</H2>
      <P>Under the GDPR and Act No. 18/2018 Coll. you have the right to:</P>
      <UL>
        <li>access your personal data (Art. 15 GDPR)</li>
        <li>have inaccurate data corrected (Art. 16 GDPR)</li>
        <li>have your data erased — &ldquo;right to be forgotten&rdquo; (Art. 17 GDPR)</li>
        <li>restrict processing (Art. 18 GDPR)</li>
        <li>data portability (Art. 20 GDPR)</li>
        <li>object to processing (Art. 21 GDPR)</li>
        <li>
          withdraw consent at any time (Art. 7(3) GDPR), without affecting the lawfulness of processing
          before withdrawal
        </li>
      </UL>
      <P>
        You can exercise your rights in writing at{" "}
        <a href="mailto:info@coffece.sk" className="text-brand-gold-dark hover:underline">
          info@coffece.sk
        </a>
        . We will respond without undue delay and at the latest within <strong>30 days</strong> of
        receipt.
      </P>

      <H2>8. Right to lodge a complaint with the supervisory authority</H2>
      <P>
        If you believe your data-protection rights have been infringed, you have the right to lodge a
        complaint with the supervisory authority:
      </P>
      <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 text-gray-700 leading-relaxed mb-4">
        <strong>Office for Personal Data Protection of the Slovak Republic</strong>
        <br />
        Hraničná 12, 820 07 Bratislava 27
        <br />
        Phone: +421 2 32 31 32 14
        <br />
        Email:{" "}
        <a href="mailto:statny.dozor@pdp.gov.sk" className="text-brand-gold-dark hover:underline">
          statny.dozor@pdp.gov.sk
        </a>
        <br />
        Web:{" "}
        <a
          href="https://www.dataprotection.gov.sk"
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-gold-dark hover:underline"
        >
          www.dataprotection.gov.sk
        </a>
      </div>

      <H2>9. Cookies and web analytics</H2>
      <P>
        The website uses strictly necessary technical cookies and — only with your explicit consent —
        analytics cookies from Google Analytics 4. We do not use marketing or advertising cookies. A
        detailed list and the option to manage your consent are available in the{" "}
        <Link href="/cookies" className="text-brand-gold-dark hover:underline">
          Cookie Policy
        </Link>
        .
      </P>

      <H2>10. Automated decision-making</H2>
      <P>
        We do not use your personal data for automated individual decision-making or profiling within
        the meaning of Art. 22 GDPR.
      </P>

      <H2>11. Provision of data as a condition</H2>
      <P>
        Providing personal data in the form is voluntary. Without it, however, we cannot process your
        request or prepare a quote.
      </P>

      <H2>12. Changes to this policy</H2>
      <P>
        We may update this privacy policy from time to time. The current version, together with the
        date of last update, is always published on this page.
      </P>
    </>
  );
}
