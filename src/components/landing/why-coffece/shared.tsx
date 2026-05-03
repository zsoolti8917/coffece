"use client";

import { Coffee, Truck, Handshake, type LucideIcon } from "lucide-react";

export type CardKey = "fresh" | "delivery" | "noCommit";

export type CardDef = {
  icon: LucideIcon;
  key: CardKey;
  image: string;
  imageAlt: string;
};

export const CARDS: CardDef[] = [
  {
    icon: Coffee,
    key: "fresh",
    image: "/images/lifestyle/coffee-desk-2.png",
    imageAlt: "Hand holding a fresh mug of coffee at a workspace",
  },
  {
    icon: Truck,
    key: "delivery",
    image: "/images/lifestyle/coffee-desk-3.png",
    imageAlt: "Coffee on a desk beside a laptop in golden light",
  },
  {
    icon: Handshake,
    key: "noCommit",
    image: "/images/products/original-kitchen.png",
    imageAlt: "Coffece Original coffee bag on a kitchen counter",
  },
];

export const ATMOSPHERIC_IMAGE = "/images/lifestyle/coffee-desk-4.png";

export const SECTION_ID = "why-coffece";
