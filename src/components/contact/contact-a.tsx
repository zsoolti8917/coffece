"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { OrderModal } from "@/components/order-picker/order-modal";
import { ProductShowcase } from "@/components/landing/product-showcase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useContactForm, StatusMessage } from "./shared";

const contactIcons = [
  <Mail key="mail" className="w-4 h-4 text-brand-gold-dark" />,
  <Phone key="phone" className="w-4 h-4 text-brand-gold-dark" />,
  <MapPin key="map" className="w-4 h-4 text-brand-gold-dark" />,
];

export function ContactA() {
  const t = useTranslations("contact");
  const { formState, status, handleChange, handleSubmit } = useContactForm();
  const [orderOpen, setOrderOpen] = useState(false);

  const contactInfo = [
    { label: t("info.emailLabel"), value: t("info.email"), href: `mailto:${t("info.email")}` },
    { label: t("info.phoneLabel"), value: t("info.phone"), href: `tel:${t("info.phone")}` },
    { label: t("info.addressLabel"), value: t("info.address"), href: undefined },
  ];

  const badges = [t("badge1"), t("badge2"), t("badge3")];

  return (
    <>
      <Navbar onOrderClick={() => setOrderOpen(true)} />
      <OrderModal open={orderOpen} onClose={() => setOrderOpen(false)} />

      <main className="min-h-screen bg-background">
        {/* ── Header ── */}
        <section className="bg-brand-black text-white py-20 px-4">
          <div className="container mx-auto max-w-3xl text-center">
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
              className="text-gray-400 text-lg max-w-xl mx-auto leading-relaxed"
            >
              {t("subtitle")}
            </motion.p>
          </div>
        </section>

        {/* ── Unified Card: Dark left (CTA + Contact Info) + White right (Form) ── */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12"
            >
              {/* ── Left: Dark panel — Order CTA + Contact Info + Socials ── */}
              <div className="lg:col-span-5 bg-brand-black relative p-8 md:p-10 lg:p-12 flex flex-col">
                {/* Subtle background pattern */}
                <div className="absolute inset-0 opacity-[0.04]">
                  <Image src="/images/decorative/coffee-beans-pattern.png" alt="" fill sizes="50vw" className="object-cover" />
                </div>

                <div className="relative z-10 flex-1 flex flex-col">
                  {/* Order CTA */}
                  <div className="mb-10">
                    <p className="text-brand-gold text-xs uppercase tracking-[0.2em] font-semibold mb-3">
                      {t("orderCtaOverline")}
                    </p>
                    <h2 className="text-xl md:text-2xl font-bold text-white mb-2 leading-tight">
                      {t("orderCta")}
                    </h2>
                    <p className="text-gray-400 text-sm leading-relaxed mb-5">
                      {t("orderCtaSubtitle")}
                    </p>
                    <Button
                      onClick={() => setOrderOpen(true)}
                      className="bg-brand-gold text-brand-black hover:bg-brand-gold/90 font-bold px-6 h-11 text-sm gap-2"
                    >
                      {t("orderCtaButton")} <ArrowRight className="h-4 w-4" />
                    </Button>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {badges.map((badge) => (
                        <span key={badge} className="text-[10px] font-medium text-brand-gold border border-brand-gold/30 rounded-full px-3 py-1 bg-brand-gold/5">
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-white/10 mb-8" />

                  {/* Contact Info */}
                  <div className="mb-auto">
                    <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">
                      {t("variants.a.contactTitle")}
                    </h3>
                    <div className="flex flex-col gap-5">
                      {contactInfo.map((item, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center">
                            {contactIcons[i]}
                          </div>
                          <div className="min-w-0">
                            <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-500 mb-0.5">{item.label}</p>
                            {item.href ? (
                              <a href={item.href} className="text-white hover:text-brand-gold transition-colors font-medium text-sm break-all">
                                {item.value}
                              </a>
                            ) : (
                              <p className="text-white font-medium text-sm leading-relaxed">{item.value}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-gray-500 text-xs italic mt-4">{t("responseTime")}</p>
                  </div>

                  {/* Social at bottom */}
                  <div className="mt-8 pt-6 border-t border-white/10">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-500 mb-3">Social</p>
                    <div className="flex gap-3">
                      <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-brand-gold hover:text-brand-black hover:border-brand-gold transition-all duration-200">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
                      </a>
                      <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-brand-gold hover:text-brand-black hover:border-brand-gold transition-all duration-200">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                      </a>
                      <a href="#" aria-label="LinkedIn" className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-brand-gold hover:text-brand-black hover:border-brand-gold transition-all duration-200">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Right: White form panel ── */}
              <div className="lg:col-span-7 bg-white p-8 md:p-10 lg:p-12">
                <h2 className="text-2xl font-bold text-brand-black mb-1">{t("formHeading")}</h2>
                <p className="text-sm text-muted-foreground mb-8">{t("subtitle")}</p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                        {t("form.name")} <span className="text-brand-gold">*</span>
                      </Label>
                      <Input id="name" name="name" value={formState.name} onChange={handleChange} required placeholder={t("form.name")}
                        className="h-12 text-base rounded-xl border-gray-200 focus-visible:ring-brand-gold/40 focus-visible:border-brand-gold" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="company" className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                        {t("form.company")} <span className="text-brand-gold">*</span>
                      </Label>
                      <Input id="company" name="company" value={formState.company} onChange={handleChange} required placeholder={t("form.company")}
                        className="h-12 text-base rounded-xl border-gray-200 focus-visible:ring-brand-gold/40 focus-visible:border-brand-gold" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                        {t("form.email")} <span className="text-brand-gold">*</span>
                      </Label>
                      <Input id="email" name="email" type="email" value={formState.email} onChange={handleChange} required placeholder={t("form.email")}
                        className="h-12 text-base rounded-xl border-gray-200 focus-visible:ring-brand-gold/40 focus-visible:border-brand-gold" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="phone" className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                        {t("form.phone")} <span className="text-brand-gold">*</span>
                      </Label>
                      <Input id="phone" name="phone" type="tel" value={formState.phone} onChange={handleChange} required placeholder={t("form.phone")}
                        className="h-12 text-base rounded-xl border-gray-200 focus-visible:ring-brand-gold/40 focus-visible:border-brand-gold" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="message" className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                      {t("form.message")} <span className="text-brand-gold">*</span>
                    </Label>
                    <Textarea id="message" name="message" value={formState.message} onChange={handleChange} required
                      placeholder={t("form.message")} rows={5}
                      className="text-base rounded-xl resize-none border-gray-200 focus-visible:ring-brand-gold/40 focus-visible:border-brand-gold" />
                  </div>

                  <Button type="submit" disabled={status === "loading"}
                    className="w-full h-12 text-base font-bold bg-brand-gold hover:bg-brand-gold/90 text-brand-black rounded-xl shadow-md shadow-brand-gold/20 transition-all duration-200 hover:shadow-lg hover:shadow-brand-gold/30">
                    {status === "loading" ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        ...
                      </span>
                    ) : t("form.submit")}
                  </Button>

                  <StatusMessage status={status} successText={t("form.success")} errorText={t("form.error")} />
                </form>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Product Showcase ── */}
        <ProductShowcase />
      </main>

      <Footer />
    </>
  );
}
