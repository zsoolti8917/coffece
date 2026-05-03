"use client";

import { useTranslations } from "next-intl";
import { useMemo } from "react";

export type Step = {
  index: number;
  num: string;
  title: string;
  description: string;
};

export const STEP_COUNT = 4;

export function useSteps(): { overline: string; title: string; steps: Step[] } {
  const t = useTranslations("howItWorks");

  return useMemo(
    () => ({
      overline: t("overline"),
      title: t("title"),
      steps: Array.from({ length: STEP_COUNT }, (_, i) => ({
        index: i,
        num: String(i + 1).padStart(2, "0"),
        title: t(`steps.${i}.title`),
        description: t(`steps.${i}.description`),
      })),
    }),
    [t],
  );
}
