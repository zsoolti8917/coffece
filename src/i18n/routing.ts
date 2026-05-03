import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["sk", "en"],
  defaultLocale: "sk",
  localeDetection: false,
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
