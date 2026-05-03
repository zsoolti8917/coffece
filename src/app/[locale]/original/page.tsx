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
        <ProductHero
          name={tProducts("name")}
          tagline={t("hero")}
          eyebrow={tProducts("tagline")}
          type={tProducts("type")}
          region={tProducts("region")}
          intensity={4}
          imageSrc="/images/products/original-living.png"
          variant="original"
          decorativeBg="/images/decorative/coffee-beans-pattern.png"
          showBeans={false}
          onOrderClick={() => setOrderOpen(true)}
        />
        <ProductSpecs variant="original" labelSrc="/images/labels/original-label.png" />
        <ProductCta productName={tProducts("name")} variant="original"
          onOrderClick={() => setOrderOpen(true)} />
      </main>
      <Footer />
      <OrderModal open={orderOpen} onClose={() => setOrderOpen(false)} preselectedCoffee="original" />
    </>
  );
}
