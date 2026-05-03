"use client";

import { HeroB } from "./hero-variants/hero-b";

export function Hero({ onOrderClick }: { onOrderClick: () => void }) {
  return <HeroB onOrderClick={onOrderClick} />;
}
