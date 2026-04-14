"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { LanguageToggle } from "./language-toggle";

export function MobileNav({
  onOrderClick,
  triggerClassName = "",
}: {
  onOrderClick: () => void;
  triggerClassName?: string;
}) {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/original" as const, label: t("original") },
    { href: "/zlaty-standard" as const, label: t("zlaty") },
    { href: "/faq" as const, label: t("faq") },
    { href: "/contact" as const, label: t("contact") },
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        className={`md:hidden inline-flex items-center justify-center size-10 rounded-lg hover:bg-white/10 transition-colors ${triggerClassName}`}
        aria-label="Open menu"
      >
        <Menu className="h-6 w-6" />
      </SheetTrigger>
      <SheetContent side="right" className="w-75 px-6 pt-16 pb-8">
        <nav className="flex flex-col gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-lg font-medium py-3 px-2 rounded-md hover:bg-muted hover:text-brand-gold transition-colors"
            >
              {link.label}
            </Link>
          ))}

          <Button
            onClick={() => {
              setOpen(false);
              onOrderClick();
            }}
            className="bg-brand-gold text-brand-black hover:bg-brand-gold/90 font-bold mt-6 h-12 text-base"
          >
            {t("order")}
          </Button>

          <div className="mt-6 pt-6 border-t flex justify-start">
            <LanguageToggle className="text-foreground hover:text-brand-gold" />
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
