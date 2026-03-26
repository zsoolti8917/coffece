"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ProductHero } from "@/components/product/product-hero";
import { ProductSpecs } from "@/components/product/product-specs";
import { ProductCta } from "@/components/product/product-cta";
import { OrderModal } from "@/components/order-picker/order-modal";

export default function OriginalPage() {
  const t = useTranslations("product.original");
  const tProducts = useTranslations("products.original");
  const [orderOpen, setOrderOpen] = useState(false);

  return (
    <>
      <Navbar onOrderClick={() => setOrderOpen(true)} />
      <main>
        <ProductHero name={tProducts("name")} tagline={t("hero")}
          imageSrc="/images/products/original-desk.jpg" variant="original"
          decorativeBg="/images/decorative/coffee-beans-pattern.png" />
        <ProductSpecs variant="original" labelSrc="/images/labels/original-label.png"
          decorativeSrc="/images/decorative/coffee-beans-pattern.png" />
        <ProductCta productName={tProducts("name")} variant="original"
          onOrderClick={() => setOrderOpen(true)} />
      </main>
      <Footer />
      <OrderModal open={orderOpen} onClose={() => setOrderOpen(false)} preselectedCoffee="original" />
    </>
  );
}
