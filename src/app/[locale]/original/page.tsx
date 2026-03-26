"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ProductHero } from "@/components/product/product-hero";
import { ProductSpecs } from "@/components/product/product-specs";
import { ProductCta } from "@/components/product/product-cta";

export default function OriginalPage() {
  const t = useTranslations("product.original");
  const tProducts = useTranslations("products.original");
  const [orderOpen, setOrderOpen] = useState(false);

  return (
    <>
      <Navbar onOrderClick={() => setOrderOpen(true)} />
      <main>
        <ProductHero name={tProducts("name")} tagline={t("hero")}
          imageSrc="/images/products/original-desk.jpg" variant="original" />
        <ProductSpecs variant="original" labelSrc="/images/labels/original-label.png"
          decorativeSrc="/images/decorative/coffee-beans-pattern.png" />
        <ProductCta productName={tProducts("name")} variant="original"
          onOrderClick={() => setOrderOpen(true)} />
      </main>
      <Footer />
    </>
  );
}
