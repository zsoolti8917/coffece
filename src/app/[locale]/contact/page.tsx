"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { OrderModal } from "@/components/order-picker/order-modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FloatingBeans } from "@/components/floating-beans";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: "easeOut" as const },
  }),
};

const slideIn = {
  hidden: { opacity: 0, x: -24 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: "easeOut" as const },
  }),
};

export default function ContactPage() {
  const t = useTranslations("contact");
  const [orderOpen, setOrderOpen] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setFormState({ name: "", company: "", email: "", phone: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <Navbar onOrderClick={() => setOrderOpen(true)} />
      <main className="bg-background min-h-screen">

        {/* ── Hero ── */}
        <section className="relative bg-brand-black text-white overflow-hidden py-28 px-4">
          <FloatingBeans count={16} />
          {/* subtle radial glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-gold opacity-[0.04] blur-3xl" />
          </div>

          <div className="container mx-auto max-w-3xl text-center relative z-10">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-brand-gold text-xs uppercase tracking-[0.2em] font-semibold mb-5"
            >
              Coffece
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="text-5xl md:text-6xl font-extrabold mb-5 leading-tight tracking-tight"
            >
              {t("title")}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2 }}
              className="text-gray-400 text-lg max-w-xl mx-auto leading-relaxed"
            >
              {t("subtitle")}
            </motion.p>

            {/* decorative gold line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="mt-10 mx-auto w-16 h-0.5 bg-brand-gold rounded-full origin-center"
            />
          </div>
        </section>

        {/* ── Content ── */}
        <section className="bg-muted/30 py-24 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 xl:gap-16 items-start">

              {/* ── Form card (3/5) ── */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
                className="lg:col-span-3"
              >
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                  {/* gold gradient bar */}
                  <div className="h-1.5 w-full bg-gradient-to-r from-brand-gold via-amber-400 to-brand-gold" />

                  <div className="p-8 md:p-10">
                    <motion.h2 custom={0} variants={fadeUp} className="text-2xl font-bold text-brand-black mb-1">
                      {t("form.submit")}
                    </motion.h2>
                    <motion.p custom={1} variants={fadeUp} className="text-sm text-muted-foreground mb-8">
                      {t("subtitle")}
                    </motion.p>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                      {/* Row 1: name + company */}
                      <motion.div custom={2} variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="flex flex-col gap-1.5">
                          <Label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                            {t("form.name")} <span className="text-brand-gold">*</span>
                          </Label>
                          <Input
                            id="name"
                            name="name"
                            value={formState.name}
                            onChange={handleChange}
                            required
                            placeholder={t("form.name")}
                            className="h-11 text-base rounded-xl border-gray-200 focus-visible:ring-brand-gold/40 focus-visible:border-brand-gold"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <Label htmlFor="company" className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                            {t("form.company")} <span className="text-brand-gold">*</span>
                          </Label>
                          <Input
                            id="company"
                            name="company"
                            value={formState.company}
                            onChange={handleChange}
                            required
                            placeholder={t("form.company")}
                            className="h-11 text-base rounded-xl border-gray-200 focus-visible:ring-brand-gold/40 focus-visible:border-brand-gold"
                          />
                        </div>
                      </motion.div>

                      {/* Row 2: email + phone */}
                      <motion.div custom={3} variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="flex flex-col gap-1.5">
                          <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                            {t("form.email")} <span className="text-brand-gold">*</span>
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formState.email}
                            onChange={handleChange}
                            required
                            placeholder={t("form.email")}
                            className="h-11 text-base rounded-xl border-gray-200 focus-visible:ring-brand-gold/40 focus-visible:border-brand-gold"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <Label htmlFor="phone" className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                            {t("form.phone")} <span className="text-brand-gold">*</span>
                          </Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formState.phone}
                            onChange={handleChange}
                            required
                            placeholder={t("form.phone")}
                            className="h-11 text-base rounded-xl border-gray-200 focus-visible:ring-brand-gold/40 focus-visible:border-brand-gold"
                          />
                        </div>
                      </motion.div>

                      {/* Message */}
                      <motion.div custom={4} variants={fadeUp} className="flex flex-col gap-1.5">
                        <Label htmlFor="message" className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                          {t("form.message")} <span className="text-brand-gold">*</span>
                        </Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formState.message}
                          onChange={handleChange}
                          required
                          placeholder={t("form.message")}
                          rows={5}
                          className="text-base rounded-xl resize-none border-gray-200 focus-visible:ring-brand-gold/40 focus-visible:border-brand-gold"
                        />
                      </motion.div>

                      {/* Submit */}
                      <motion.div custom={5} variants={fadeUp}>
                        <Button
                          type="submit"
                          disabled={status === "loading"}
                          className="w-full h-12 text-base font-bold bg-brand-gold hover:bg-brand-gold/90 text-brand-black rounded-xl shadow-md shadow-brand-gold/20 transition-all duration-200 hover:shadow-lg hover:shadow-brand-gold/30"
                        >
                          {status === "loading" ? (
                            <span className="flex items-center gap-2">
                              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                              </svg>
                              ...
                            </span>
                          ) : (
                            t("form.submit")
                          )}
                        </Button>
                      </motion.div>

                      {/* Status messages */}
                      {status === "success" && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-2.5 rounded-xl bg-green-50 border border-green-200 px-4 py-3"
                        >
                          <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          <p className="text-green-700 text-sm font-medium">{t("form.success")}</p>
                        </motion.div>
                      )}
                      {status === "error" && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-2.5 rounded-xl bg-red-50 border border-red-200 px-4 py-3"
                        >
                          <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M12 3a9 9 0 110 18A9 9 0 0112 3z" />
                          </svg>
                          <p className="text-red-600 text-sm font-medium">{t("form.error")}</p>
                        </motion.div>
                      )}
                    </form>
                  </div>
                </div>
              </motion.div>

              {/* ── Info section (2/5) ── */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                className="lg:col-span-2 relative"
              >
                {/* Coffee plant watermark */}
                <div className="absolute -bottom-6 -right-4 w-52 h-52 opacity-[0.05] pointer-events-none select-none">
                  <Image src="/images/decorative/coffee-plant.png" alt="" fill className="object-contain" />
                </div>

                <motion.h2 custom={0} variants={slideIn} className="text-xl font-bold text-brand-black mb-6">
                  {t("info.addressLabel")}
                </motion.h2>

                <div className="flex flex-col gap-4 relative z-10">
                  {/* Email */}
                  <motion.div
                    custom={1}
                    variants={slideIn}
                    className="bg-white rounded-xl border-l-4 border-brand-gold shadow-sm px-5 py-4 flex items-start gap-4"
                  >
                    <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-brand-gold-light flex items-center justify-center mt-0.5">
                      <svg className="w-4 h-4 text-brand-gold-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1">
                        {t("info.emailLabel")}
                      </p>
                      <a
                        href={`mailto:${t("info.email")}`}
                        className="text-brand-black hover:text-brand-gold transition-colors font-medium text-sm break-all"
                      >
                        {t("info.email")}
                      </a>
                    </div>
                  </motion.div>

                  {/* Phone */}
                  <motion.div
                    custom={2}
                    variants={slideIn}
                    className="bg-white rounded-xl border-l-4 border-brand-gold shadow-sm px-5 py-4 flex items-start gap-4"
                  >
                    <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-brand-gold-light flex items-center justify-center mt-0.5">
                      <svg className="w-4 h-4 text-brand-gold-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1">
                        {t("info.phoneLabel")}
                      </p>
                      <a
                        href={`tel:${t("info.phone")}`}
                        className="text-brand-black hover:text-brand-gold transition-colors font-medium text-sm"
                      >
                        {t("info.phone")}
                      </a>
                    </div>
                  </motion.div>

                  {/* Address */}
                  <motion.div
                    custom={3}
                    variants={slideIn}
                    className="bg-white rounded-xl border-l-4 border-brand-gold shadow-sm px-5 py-4 flex items-start gap-4"
                  >
                    <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-brand-gold-light flex items-center justify-center mt-0.5">
                      <svg className="w-4 h-4 text-brand-gold-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1">
                        {t("info.addressLabel")}
                      </p>
                      <p className="text-brand-black font-medium text-sm leading-relaxed">
                        {t("info.address")}
                      </p>
                    </div>
                  </motion.div>

                  {/* Social */}
                  <motion.div custom={4} variants={slideIn} className="pt-2">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-3 pl-1">
                      Social
                    </p>
                    <div className="flex gap-3">
                      {/* Instagram */}
                      <a
                        href="#"
                        aria-label="Instagram"
                        className="group w-10 h-10 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-center text-gray-400 hover:bg-brand-gold hover:text-brand-black hover:border-brand-gold hover:shadow-md hover:shadow-brand-gold/20 transition-all duration-200"
                      >
                        <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                        </svg>
                      </a>
                      {/* Facebook */}
                      <a
                        href="#"
                        aria-label="Facebook"
                        className="group w-10 h-10 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-center text-gray-400 hover:bg-brand-gold hover:text-brand-black hover:border-brand-gold hover:shadow-md hover:shadow-brand-gold/20 transition-all duration-200"
                      >
                        <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                        </svg>
                      </a>
                      {/* LinkedIn */}
                      <a
                        href="#"
                        aria-label="LinkedIn"
                        className="group w-10 h-10 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-center text-gray-400 hover:bg-brand-gold hover:text-brand-black hover:border-brand-gold hover:shadow-md hover:shadow-brand-gold/20 transition-all duration-200"
                      >
                        <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </a>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

      </main>
      <Footer />
      <OrderModal open={orderOpen} onClose={() => setOrderOpen(false)} />
    </>
  );
}
