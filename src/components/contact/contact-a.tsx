"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { OrderModal } from "@/components/order-picker/order-modal";
import { ProductShowcase } from "@/components/landing/product-showcase";
import { BrandButton } from "@/components/ui/brand-button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useContactForm, StatusMessage } from "./shared";

export function ContactA() {
  const t = useTranslations("contact");
  const tInfo = useTranslations("contact.info");
  const { formState, status, handleChange, handleSubmit } = useContactForm();
  const [orderOpen, setOrderOpen] = useState(false);
  const [gdpr, setGdpr] = useState(false);

  const phone = tInfo("phone");
  const phoneTel = phone.replace(/[^\d+]/g, "");
  const email = tInfo("email");

  const badges = [t("badge1"), t("badge2"), t("badge3")];
  const nextSteps = t.raw("nextSteps.items") as string[];

  return (
    <>
      <Navbar onOrderClick={() => setOrderOpen(true)} />
      <OrderModal open={orderOpen} onClose={() => setOrderOpen(false)} />

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

        {/* Editorial split: rail + form */}
        <section className="container mx-auto px-4 lg:px-8 py-20 lg:py-24">
          <div className="grid lg:grid-cols-[300px_1fr] xl:grid-cols-[320px_1fr] gap-12 lg:gap-16 items-start">
            {/* Left rail */}
            <aside className="lg:sticky lg:top-24 space-y-6">
              {/* Phone hero block */}
              <a
                href={`tel:${phoneTel}`}
                className="group block rounded-2xl bg-brand-black border border-brand-gold/30 p-6 transition hover:border-brand-gold hover:bg-brand-black/95"
              >
                <div className="flex items-center gap-4 mb-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-gold/15 text-brand-gold transition group-hover:bg-brand-gold/25">
                    <Phone className="h-5 w-5" />
                  </span>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-brand-gold font-semibold">
                    {tInfo("phoneLabel")}
                  </p>
                </div>
                <p className="text-2xl font-extrabold tracking-tight text-white whitespace-nowrap">
                  {phone}
                </p>
                <p className="text-xs text-white/50 mt-2">{t("responseTime")}</p>
              </a>

              {/* Email block */}
              <a
                href={`mailto:${email}`}
                className="group flex items-center gap-4 rounded-xl border border-border/60 bg-card p-5 transition hover:border-brand-gold/60 hover:bg-brand-gold/5"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-gold/10 text-brand-gold-dark transition group-hover:bg-brand-gold/20">
                  <Mail className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-semibold mb-0.5">
                    {tInfo("emailLabel")}
                  </p>
                  <p className="text-sm font-bold text-foreground break-all">{email}</p>
                </div>
              </a>

              {/* Address block */}
              <div className="flex items-start gap-4 rounded-xl border border-border/60 bg-card p-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-gold/10 text-brand-gold-dark">
                  <MapPin className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-semibold mb-0.5">
                    {tInfo("addressLabel")}
                  </p>
                  <p className="text-sm font-medium text-foreground leading-snug">
                    {tInfo("address")}
                  </p>
                </div>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-2 pt-1">
                {badges.map((badge) => (
                  <span
                    key={badge}
                    className="text-[10px] font-semibold uppercase tracking-[0.15em] text-brand-gold-dark border border-brand-gold/40 rounded-full px-3 py-1.5 bg-brand-gold/5"
                  >
                    {badge}
                  </span>
                ))}
              </div>

              {/* Socials */}
              <div className="pt-2">
                <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-semibold mb-3">
                  {t("socialLabel")}
                </p>
                <div className="flex gap-2">
                  {/* TODO: replace href="#" with real social URLs when available */}
                  <a
                    href="#"
                    aria-label="Instagram"
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-border/60 bg-card text-muted-foreground hover:bg-brand-gold hover:border-brand-gold hover:text-brand-black transition"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
                  </a>
                  <a
                    href="#"
                    aria-label="Facebook"
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-border/60 bg-card text-muted-foreground hover:bg-brand-gold hover:border-brand-gold hover:text-brand-black transition"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                  </a>
                  <a
                    href="#"
                    aria-label="LinkedIn"
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-border/60 bg-card text-muted-foreground hover:bg-brand-gold hover:border-brand-gold hover:text-brand-black transition"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                  </a>
                </div>
              </div>
            </aside>

            {/* Form column */}
            <div className="min-w-0">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3 leading-[1.1]">
                {t("formHeading")}
              </h2>
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: 0.15 }}
                style={{ transformOrigin: "left" }}
                className="block h-[2px] w-16 bg-brand-gold mb-6"
              />
              <p className="text-base text-muted-foreground mb-10 max-w-xl">{t("subtitle")}</p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FieldGroup>
                    <Label htmlFor="name" className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                      {t("form.name")} <span className="text-brand-gold">*</span>
                    </Label>
                    <Input id="name" name="name" value={formState.name} onChange={handleChange} required placeholder={t("form.name")}
                      className="h-11 text-base border-border/70 bg-background focus-visible:ring-brand-gold/40 focus-visible:border-brand-gold" />
                  </FieldGroup>
                  <FieldGroup>
                    <Label htmlFor="company" className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                      {t("form.company")} <span className="text-brand-gold">*</span>
                    </Label>
                    <Input id="company" name="company" value={formState.company} onChange={handleChange} required placeholder={t("form.company")}
                      className="h-11 text-base border-border/70 bg-background focus-visible:ring-brand-gold/40 focus-visible:border-brand-gold" />
                  </FieldGroup>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FieldGroup>
                    <Label htmlFor="email" className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                      {t("form.email")} <span className="text-brand-gold">*</span>
                    </Label>
                    <Input id="email" name="email" type="email" value={formState.email} onChange={handleChange} required placeholder={t("form.email")}
                      className="h-11 text-base border-border/70 bg-background focus-visible:ring-brand-gold/40 focus-visible:border-brand-gold" />
                  </FieldGroup>
                  <FieldGroup>
                    <Label htmlFor="phone" className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                      {t("form.phone")} <span className="text-brand-gold">*</span>
                    </Label>
                    <Input id="phone" name="phone" type="tel" value={formState.phone} onChange={handleChange} required placeholder={t("form.phone")}
                      className="h-11 text-base border-border/70 bg-background focus-visible:ring-brand-gold/40 focus-visible:border-brand-gold" />
                  </FieldGroup>
                </div>

                <FieldGroup>
                  <Label htmlFor="message" className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    {t("form.message")} <span className="text-brand-gold">*</span>
                  </Label>
                  <Textarea id="message" name="message" value={formState.message} onChange={handleChange} required
                    placeholder={t("form.message")} rows={5}
                    className="text-base resize-none border-border/70 bg-background focus-visible:ring-brand-gold/40 focus-visible:border-brand-gold" />
                </FieldGroup>

                <label htmlFor="gdpr" className="flex items-start gap-3 cursor-pointer select-none mt-1">
                  <input
                    id="gdpr"
                    name="gdpr"
                    type="checkbox"
                    checked={gdpr}
                    onChange={(e) => setGdpr(e.target.checked)}
                    required
                    className="mt-0.5 h-4 w-4 shrink-0 rounded border-border/70 text-brand-gold focus:ring-2 focus:ring-brand-gold/40 focus:ring-offset-0 cursor-pointer"
                  />
                  <span className="text-sm text-muted-foreground leading-relaxed">
                    {t("form.gdpr")}{" "}
                    <Link
                      href="/privacy"
                      className="text-brand-gold-dark underline underline-offset-2 hover:text-brand-gold"
                    >
                      {t("form.gdprLink")}
                    </Link>
                    . <span className="text-brand-gold">*</span>
                  </span>
                </label>

                <BrandButton
                  type="submit"
                  size="lg"
                  icon={status === "loading" ? "none" : undefined}
                  disabled={status === "loading" || !gdpr}
                  className="self-start"
                >
                  {status === "loading" ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      ...
                    </span>
                  ) : t("form.submit")}
                </BrandButton>

                <StatusMessage status={status} successText={t("form.success")} errorText={t("form.error")} />
              </form>

              {/* What happens next? */}
              <div className="mt-16 pt-10 border-t border-border/60">
                <p className="text-[11px] uppercase tracking-[0.3em] font-semibold text-brand-gold-dark mb-5">
                  {t("nextSteps.title")}
                </p>
                <ol className="grid sm:grid-cols-3 gap-6">
                  {nextSteps.map((step, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="relative pl-12"
                    >
                      <span className="absolute left-0 top-0 flex h-9 w-9 items-center justify-center rounded-full bg-brand-gold text-brand-black font-extrabold text-sm tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="text-base font-semibold text-foreground leading-snug pt-1">{step}</p>
                    </motion.li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* Product Showcase */}
        <ProductShowcase />
      </main>

      <Footer />
    </>
  );
}

function FieldGroup({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-2">{children}</div>;
}
