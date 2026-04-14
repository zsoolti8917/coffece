"use client";

import { useTranslations } from "next-intl";
import { User, Users, UsersRound, Building2 } from "lucide-react";
import { OptionCard } from "./option-card";

const options = [
  { value: "1-10", icon: <User className="h-6 w-6" /> },
  { value: "11-25", icon: <Users className="h-6 w-6" /> },
  { value: "26-50", icon: <UsersRound className="h-6 w-6" /> },
  { value: "50+", icon: <Building2 className="h-6 w-6" /> },
] as const;

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
          <OptionCard key={opt.value} icon={opt.icon} title={opt.value} selected={value === opt.value}
            onClick={() => onChange(opt.value, opt.value)} />
        ))}
      </div>
    </div>
  );
}
