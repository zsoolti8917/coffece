"use client";

import { useTranslations } from "next-intl";
import { OptionCard } from "./option-card";

const options = ["1-10", "11-25", "26-50", "50+"] as const;

interface Props {
  value: string;
  onChange: (value: string, label: string) => void;
}

export function StepDailyDrinkers({ value, onChange }: Props) {
  const t = useTranslations("order.step2");
  return (
    <div>
      <h2 className="text-2xl font-extrabold mb-2 tracking-tight">{t("title")}</h2>
      <p className="text-muted-foreground mb-6">{t("subtitle")}</p>
      <div className="grid grid-cols-2 gap-3">
        {options.map((opt) => (
          <OptionCard key={opt} title={opt} selected={value === opt}
            onClick={() => onChange(opt, opt)} />
        ))}
      </div>
    </div>
  );
}
