"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { OptionCard } from "./option-card";

interface Props {
  value: string;
  onChange: (value: string, label: string) => void;
}

export function StepCoffeeChoice({ value, onChange }: Props) {
  const t = useTranslations("order.step3");
  const tProducts = useTranslations("products");

  return (
    <div>
      <h2 className="text-2xl font-extrabold mb-2 tracking-tight">{t("title")}</h2>
      <p className="text-muted-foreground mb-6">{t("subtitle")}</p>
      <div className="grid grid-cols-3 gap-3">
        <OptionCard title={tProducts("original.name")} selected={value === "original"}
          onClick={() => onChange("original", tProducts("original.name"))}>
          <div className="relative w-20 h-20 mx-auto mb-3 bg-brand-black rounded-lg overflow-hidden">
            <Image src="/images/labels/original-label.png" alt="Original" fill className="object-cover" />
          </div>
          <span className="font-semibold block text-center">{tProducts("original.name")}</span>
          <span className="text-xs text-muted-foreground block text-center">{tProducts("original.type")}</span>
        </OptionCard>

        <OptionCard title={tProducts("zlaty.name")} selected={value === "zlaty"}
          onClick={() => onChange("zlaty", tProducts("zlaty.name"))}>
          <div className="relative w-20 h-20 mx-auto mb-3 bg-brand-gold-light rounded-lg overflow-hidden">
            <Image src="/images/labels/zlaty-label.png" alt="Zlaty Standard" fill className="object-cover" />
          </div>
          <span className="font-semibold block text-center">{tProducts("zlaty.name")}</span>
          <span className="text-xs text-muted-foreground block text-center">{tProducts("zlaty.type")}</span>
        </OptionCard>

        <OptionCard title={t("both")} selected={value === "both"}
          onClick={() => onChange("both", t("both"))}>
          <div className="relative w-20 h-20 mx-auto mb-3 rounded-lg overflow-hidden bg-gradient-to-br from-brand-black to-brand-gold-light">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white text-xs font-bold drop-shadow-lg">Mix</span>
            </div>
          </div>
          <span className="font-semibold block text-center">{t("both")}</span>
          <span className="text-xs text-muted-foreground block text-center">{t("bothDesc")}</span>
        </OptionCard>
      </div>
    </div>
  );
}
