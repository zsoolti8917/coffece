"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { Button } from "@/components/ui/button";

export function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale() {
    const newLocale = locale === "sk" ? "en" : "sk";
    router.push(pathname, { locale: newLocale });
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={switchLocale}
      className="text-xs font-semibold tracking-wider text-foreground"
    >
      {locale === "sk" ? "EN" : "SK"}
    </Button>
  );
}
