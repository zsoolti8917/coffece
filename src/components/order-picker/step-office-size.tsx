"use client";

import { useTranslations } from "next-intl";
import { OptionCard } from "./option-card";

const options = [
  { value: "small", icon: "\u{1F3E2}", key: "small" },
  { value: "medium", icon: "\u{1F3EC}", key: "medium" },
  { value: "large", icon: "\u{1F3E3}", key: "large" },
  { value: "other", icon: "\u2699", key: "other" },
] as const;

interface Props {
  value: string;
  onChange: (value: string, label: string) => void;
}

export function StepOfficeSize({ value, onChange }: Props) {
  const t = useTranslations("order.step1");
  return (
    <div>
      <h2 className="text-2xl font-extrabold mb-2 tracking-tight">{t("title")}</h2>
      <p className="text-muted-foreground mb-6">{t("subtitle")}</p>
      <div className="grid grid-cols-2 gap-3">
        {options.map((opt) => (
          <OptionCard key={opt.value} icon={opt.icon} title={t(opt.key)}
            description={t(`${opt.key}Desc`)} selected={value === opt.value}
            onClick={() => onChange(opt.value, t(opt.key))} />
        ))}
      </div>
    </div>
  );
}
