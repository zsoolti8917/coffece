"use client";

import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Link } from "@/i18n/routing";

interface ContactData {
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
  gdprConsent: boolean;
}

interface Props {
  data: ContactData;
  onChange: (data: ContactData) => void;
}

export function StepContactForm({ data, onChange }: Props) {
  const t = useTranslations("order.step5");

  const update = (field: keyof ContactData, value: string | boolean) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div>
      <h2 className="text-2xl font-extrabold mb-2 tracking-tight">{t("title")}</h2>
      <p className="text-muted-foreground mb-6">{t("subtitle")}</p>
      <div className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">{t("name")} *</Label>
            <Input id="name" value={data.name} onChange={(e) => update("name", e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="company">{t("company")} *</Label>
            <Input id="company" value={data.company} onChange={(e) => update("company", e.target.value)} required />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="email">{t("email")} *</Label>
            <Input id="email" type="email" value={data.email} onChange={(e) => update("email", e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="phone">{t("phone")} *</Label>
            <Input id="phone" type="tel" value={data.phone} onChange={(e) => update("phone", e.target.value)} required />
          </div>
        </div>
        <div>
          <Label htmlFor="message">{t("message")}</Label>
          <Textarea id="message" value={data.message} onChange={(e) => update("message", e.target.value)} rows={3} />
        </div>
        <div className="flex items-start gap-2 mt-2">
          <input
            type="checkbox"
            id="gdpr"
            checked={data.gdprConsent}
            onChange={(e) => update("gdprConsent", e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-border accent-brand-gold"
          />
          <label htmlFor="gdpr" className="text-sm leading-relaxed">
            {t("gdpr")}{" "}
            <Link href="/privacy" className="text-brand-gold hover:underline" target="_blank">{t("gdprLink")}</Link>. *
          </label>
        </div>
      </div>
    </div>
  );
}
