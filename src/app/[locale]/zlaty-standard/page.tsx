"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ProductHero } from "@/components/product/product-hero";
import { ProductSpecs } from "@/components/product/product-specs";
import { ProductCta } from "@/components/product/product-cta";
import { OrderModal } from "@/components/order-picker/order-modal";

export default function ZlatyStandardPage() {
  const t = useTranslations("product.zlaty");
  const tProducts = useTranslations("products.zlaty");
  const [orderOpen, setOrderOpen] = useState(false);

  return (
    <>
      <Navbar onOrderClick={() => setOrderOpen(true)} variant="light" />
      <main>
        <ProductHero name={tProducts("name")} tagline={t("hero")}
          imageSrc="/images/products/zlaty-kitchen.jpg" variant="zlaty"
          decorativeBg="/images/decorative/coffee-plant.png"
          showBeans={false} />
        <ProductSpecs variant="zlaty" labelSrc="/images/labels/zlaty-label.png" />
        <ProductCta productName={tProducts("name")} variant="zlaty"
          onOrderClick={() => setOrderOpen(true)} />
      </main>
      <Footer />
      <OrderModal open={orderOpen} onClose={() => setOrderOpen(false)} preselectedCoffee="zlaty" />
    </>
  );
}
