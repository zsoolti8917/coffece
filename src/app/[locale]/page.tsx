"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/landing/hero";
import { WhyCoffece } from "@/components/landing/why-coffece";
import { ProductShowcase } from "@/components/landing/product-showcase";
import { HowItWorks } from "@/components/landing/how-it-works";
import { OriginStory } from "@/components/landing/origin-story";
import { CtaBanner } from "@/components/landing/cta-banner";

export default function HomePage() {
  const [orderOpen, setOrderOpen] = useState(false);

  return (
    <>
      <Navbar onOrderClick={() => setOrderOpen(true)} />
      <main>
        <Hero onOrderClick={() => setOrderOpen(true)} />
        <WhyCoffece />
        <ProductShowcase />
        <HowItWorks />
        <OriginStory />
        <CtaBanner onOrderClick={() => setOrderOpen(true)} />
      </main>
      <Footer />
      {/* Order picker modal will be added later */}
    </>
  );
}
