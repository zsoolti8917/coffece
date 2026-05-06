"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import { Mail, Phone } from "lucide-react";
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
