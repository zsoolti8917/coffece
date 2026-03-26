"use client";

import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepProgressProps {
  currentStep: number;
  answers: Record<number, string>;
}

const stepKeys = ["step1", "step2", "step3", "step4", "step5"] as const;

export function StepProgress({ currentStep, answers }: StepProgressProps) {
  const t = useTranslations("order.progress");

  return (
    <div className="flex flex-col gap-0">
      {stepKeys.map((key, i) => {
        const stepNum = i + 1;
        const isCompleted = stepNum < currentStep;
        const isCurrent = stepNum === currentStep;
        const isUpcoming = stepNum > currentStep;

        return (
          <div key={key}>
            <div className="flex items-center gap-3">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 transition-colors",
                isCompleted && "bg-green-600 text-white",
                isCurrent && "bg-brand-gold text-brand-black",
                isUpcoming && "bg-gray-800 text-gray-500 border border-gray-700"
              )}>
                {isCompleted ? <Check className="h-4 w-4" /> : stepNum}
              </div>
              <div className="min-w-0">
                <span className={cn(
                  "text-sm block",
                  isCompleted && "text-green-500",
                  isCurrent && "text-brand-gold font-semibold",
                  isUpcoming && "text-gray-600"
                )}>
                  {isCompleted && answers[stepNum] ? answers[stepNum] : t(key)}
                </span>
              </div>
            </div>
            {i < stepKeys.length - 1 && (
              <div className={cn("w-0.5 h-5 ml-[15px] transition-colors",
                stepNum < currentStep ? "bg-green-600" : "bg-gray-800")} />
            )}
          </div>
        );
      })}
    </div>
  );
}
