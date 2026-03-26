"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export function MobileNav({ onOrderClick }: { onOrderClick: () => void }) {
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
        className="md:hidden inline-flex items-center justify-center size-8 rounded-lg hover:bg-muted hover:text-foreground transition-colors"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </SheetTrigger>
      <SheetContent side="right" className="w-[280px]">
        <nav className="flex flex-col gap-4 mt-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-lg font-medium hover:text-brand-gold transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Button
            onClick={() => {
              setOpen(false);
              onOrderClick();
            }}
            className="bg-brand-gold text-brand-black hover:bg-brand-gold/90 font-bold mt-4"
          >
            {t("order")}
          </Button>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
