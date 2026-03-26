"use client";

import { useTranslations } from "next-intl";
import { OptionCard } from "./option-card";

const options = [
  { value: "weekly", key: "weekly" },
  { value: "biweekly", key: "biweekly" },
  { value: "monthly", key: "monthly" },
  { value: "onDemand", key: "onDemand" },
] as const;

interface Props {
  value: string;
  onChange: (value: string, label: string) => void;
}

export function StepDeliveryFreq({ value, onChange }: Props) {
  const t = useTranslations("order.step4");
  return (
    <div>
      <h2 className="text-2xl font-extrabold mb-2 tracking-tight">{t("title")}</h2>
      <p className="text-muted-foreground mb-6">{t("subtitle")}</p>
      <div className="grid grid-cols-2 gap-3">
        {options.map((opt) => (
          <OptionCard key={opt.value} title={t(opt.key)} selected={value === opt.value}
            onClick={() => onChange(opt.value, t(opt.key))} />
        ))}
      </div>
    </div>
  );
}
