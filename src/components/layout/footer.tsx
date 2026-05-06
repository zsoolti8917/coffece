import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const tContact = useTranslations("contact.info");

  return (
    <footer className="bg-brand-black text-white">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          <div className="-mt-8">
            <Image
              src="/images/logos/coffece-logo-white.png"
              alt="Coffece"
              width={400}
              height={118}
              className="h-24 lg:h-36 w-auto mb-4"
            />
            <p className="text-sm text-gray-400">{t("tagline")}</p>
          </div>

          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider mb-4 text-gray-300">
              {t("nav")}
            </h3>
            <nav className="flex flex-col gap-2">
              <Link href="/original" className="text-sm text-gray-400 hover:text-brand-gold transition-colors">
                {tNav("original")}
              </Link>
              <Link href="/zlaty-standard" className="text-sm text-gray-400 hover:text-brand-gold transition-colors">
                {tNav("zlaty")}
              </Link>
              <Link href="/faq" className="text-sm text-gray-400 hover:text-brand-gold transition-colors">
                {tNav("faq")}
              </Link>
              <Link href="/contact" className="text-sm text-gray-400 hover:text-brand-gold transition-colors">
                {tNav("contact")}
              </Link>
            </nav>
          </div>

          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider mb-4 text-gray-300">
              {t("contactTitle")}
            </h3>
            <div className="flex flex-col gap-2 text-sm text-gray-400">
              <span>{tContact("email")}</span>
              <span>{tContact("phone")}</span>
            </div>
          </div>

        </div>

        <Separator className="my-8 bg-gray-800" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <span>&copy; {new Date().getFullYear()} Coffece. {t("rights")}</span>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-brand-gold transition-colors">
              {t("privacy")}
            </Link>
            <Link href="/cookies" className="hover:text-brand-gold transition-colors">
              {t("cookies")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
