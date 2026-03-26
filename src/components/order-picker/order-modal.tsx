"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StepProgress } from "./step-progress";
import { StepOfficeSize } from "./step-office-size";
import { StepDailyDrinkers } from "./step-daily-drinkers";
import { StepCoffeeChoice } from "./step-coffee-choice";
import { StepDeliveryFreq } from "./step-delivery-freq";
import { StepContactForm } from "./step-contact-form";

interface OrderModalProps {
  open: boolean;
  onClose: () => void;
  preselectedCoffee?: "original" | "zlaty";
}

interface OrderFormData {
  officeSize: string;
  dailyDrinkers: string;
  coffeeChoice: string;
  deliveryFrequency: string;
  contact: {
    name: string;
    company: string;
    email: string;
    phone: string;
    message: string;
    gdprConsent: boolean;
  };
}

const TOTAL_STEPS = 5;

export function OrderModal({ open, onClose, preselectedCoffee }: OrderModalProps) {
  const t = useTranslations("order");
  const tContact = useTranslations("contact.info");
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const [formData, setFormData] = useState<OrderFormData>({
    officeSize: "",
    dailyDrinkers: "",
    coffeeChoice: preselectedCoffee ?? "",
    deliveryFrequency: "",
    contact: { name: "", company: "", email: "", phone: "", message: "", gdprConsent: false },
  });

  const [answers, setAnswers] = useState<Record<number, string>>({});

  const updateField = useCallback(
    <K extends keyof OrderFormData>(key: K, value: OrderFormData[K], label?: string) => {
      setFormData((prev) => ({ ...prev, [key]: value }));
      if (label) setAnswers((prev) => ({ ...prev, [step]: label }));
    },
    [step]
  );

  const canProceed = () => {
    switch (step) {
      case 1: return formData.officeSize !== "";
      case 2: return formData.dailyDrinkers !== "";
      case 3: return formData.coffeeChoice !== "";
      case 4: return formData.deliveryFrequency !== "";
      case 5: return (
        formData.contact.name !== "" &&
        formData.contact.company !== "" &&
        formData.contact.email !== "" &&
        formData.contact.phone !== "" &&
        formData.contact.gdprConsent
      );
      default: return false;
    }
  };

  const next = () => { if (step < TOTAL_STEPS) { setDirection(1); setStep((s) => s + 1); } };
  const back = () => { if (step > 1) { setDirection(-1); setStep((s) => s - 1); } };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError(false);
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) return null;

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 100 : -100, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -100 : 100, opacity: 0 }),
  };

  const renderStep = () => {
    if (submitted) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center py-16">
          <div className="text-5xl mb-6">&#9749;</div>
          <h2 className="text-2xl font-extrabold mb-3">{t("step5.successTitle")}</h2>
          <p className="text-muted-foreground mb-8">{t("step5.successText")}</p>
          <Button onClick={onClose} className="bg-brand-gold text-brand-black hover:bg-brand-gold/90 font-bold">
            {t("close")}
          </Button>
        </div>
      );
    }
    switch (step) {
      case 1: return <StepOfficeSize value={formData.officeSize} onChange={(v, label) => updateField("officeSize", v, label)} />;
      case 2: return <StepDailyDrinkers value={formData.dailyDrinkers} onChange={(v, label) => updateField("dailyDrinkers", v, label)} />;
      case 3: return <StepCoffeeChoice value={formData.coffeeChoice} onChange={(v, label) => updateField("coffeeChoice", v, label)} />;
      case 4: return <StepDeliveryFreq value={formData.deliveryFrequency} onChange={(v, label) => updateField("deliveryFrequency", v, label)} />;
      case 5: return <StepContactForm data={formData.contact} onChange={(c) => updateField("contact", c)} />;
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }}
        className="relative mx-auto my-4 lg:my-8 w-full max-w-4xl bg-background rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">

        {/* Left panel (desktop) */}
        <div className="hidden lg:flex flex-col justify-between w-[280px] bg-brand-black p-6 shrink-0">
          <div>
            <Image src="/images/logos/coffece-logo-white.png" alt="Coffece" width={100} height={33} className="h-7 w-auto mb-2" />
            <p className="text-xs text-gray-500 mb-8">{t("title")}</p>
            <StepProgress currentStep={step} answers={answers} />
          </div>
          <div className="border-t border-gray-800 pt-4">
            <p className="text-xs text-gray-600 mb-1">{t("callInstead")}</p>
            <p className="text-white text-sm font-semibold">{tContact("phone")}</p>
            <p className="text-gray-400 text-xs">{tContact("email")}</p>
          </div>
        </div>

        {/* Mobile progress bar */}
        <div className="lg:hidden bg-muted p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">{step}/{TOTAL_STEPS}</span>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="h-1 bg-border rounded-full overflow-hidden">
            <motion.div className="h-full bg-brand-gold rounded-full" initial={false}
              animate={{ width: `${(step / TOTAL_STEPS) * 100}%` }} transition={{ duration: 0.3 }} />
          </div>
        </div>

        {/* Right panel */}
        <div className="flex-1 flex flex-col p-6 lg:p-8 overflow-y-auto">
          <button onClick={onClose}
            className="hidden lg:flex self-end items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-2">
            {t("close")} <X className="h-4 w-4" />
          </button>
          <div className="flex-1">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div key={step} custom={direction} variants={slideVariants}
                initial="enter" animate="center" exit="exit"
                transition={{ duration: 0.3, ease: "easeInOut" }}>
                {renderStep()}
              </motion.div>
            </AnimatePresence>
          </div>
          {!submitted && (
            <div className="flex items-center justify-between pt-6 border-t mt-6">
              {step > 1 ? (
                <Button variant="outline" onClick={back} className="gap-2">
                  <ArrowLeft className="h-4 w-4" /> {t("back")}
                </Button>
              ) : <div />}
              {step < TOTAL_STEPS ? (
                <Button onClick={next} disabled={!canProceed()}
                  className="bg-foreground text-background hover:bg-foreground/90 gap-2">
                  {t("next")} <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} disabled={!canProceed() || submitting}
                  className="bg-brand-gold text-brand-black hover:bg-brand-gold/90 font-bold gap-2">
                  {submitting ? "..." : t("submit")}
                </Button>
              )}
            </div>
          )}
          {error && <p className="text-destructive text-sm mt-3 text-center">{t("step5.errorText")}</p>}
        </div>
      </motion.div>
    </div>
  );
}
