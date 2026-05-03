"use client";

import { forwardRef } from "react";
import { ArrowRight } from "lucide-react";

type Size = "sm" | "md" | "lg";
type Tone = "gold" | "dark";

interface BrandButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: Size;
  tone?: Tone;
  icon?: React.ReactNode | "none";
  asChild?: never;
}

const SIZE_CLASS: Record<Size, string> = {
  sm: "h-9 px-4 text-sm gap-1.5",
  md: "h-11 px-6 text-sm gap-1.5",
  lg: "h-12 px-9 text-base gap-2",
};

const ICON_SIZE: Record<Size, string> = {
  sm: "[&_svg]:h-3.5 [&_svg]:w-3.5",
  md: "[&_svg]:h-3.5 [&_svg]:w-3.5",
  lg: "[&_svg]:h-4 [&_svg]:w-4",
};

const TONE_CLASS: Record<Tone, string> = {
  gold:
    "bg-brand-gold text-brand-black shadow-[0_10px_36px_-10px_rgba(212,175,55,0.55)] hover:shadow-[0_18px_50px_-12px_rgba(212,175,55,0.85)] focus-visible:ring-brand-gold/40",
  dark:
    "bg-brand-black text-brand-gold shadow-[0_10px_36px_-10px_rgba(0,0,0,0.45)] hover:shadow-[0_18px_50px_-12px_rgba(0,0,0,0.65)] focus-visible:ring-brand-black/30",
};

const SHEEN_BY_TONE: Record<Tone, string> = {
  gold: "via-white/45",
  dark: "via-brand-gold/35",
};

export const BrandButton = forwardRef<HTMLButtonElement, BrandButtonProps>(
  function BrandButton({ className = "", size = "md", tone = "gold", icon, children, ...props }, ref) {
    const renderedIcon = icon === "none" ? null : icon ?? <ArrowRight />;
    return (
      <button
        ref={ref}
        className={`group/cta relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-lg font-bold transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 disabled:pointer-events-none disabled:opacity-60 focus-visible:outline-none focus-visible:ring-4 ${TONE_CLASS[tone]} ${SIZE_CLASS[size]} ${ICON_SIZE[size]} ${className}`}
        {...props}
      >
        <span
          aria-hidden
          className={`pointer-events-none absolute inset-y-0 -left-1/3 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent ${SHEEN_BY_TONE[tone]} to-transparent translate-x-[-150%] group-hover/cta:translate-x-[320%] transition-transform duration-[900ms] ease-out`}
        />
        <span className="relative z-10 inline-flex items-center">{children}</span>
        {renderedIcon ? (
          <span
            aria-hidden
            className="relative z-10 inline-flex transition-transform duration-300 ease-out group-hover/cta:translate-x-1"
          >
            {renderedIcon}
          </span>
        ) : null}
      </button>
    );
  }
);

export const BrandButtonOutline = forwardRef<HTMLButtonElement, BrandButtonProps>(
  function BrandButtonOutline({ className = "", size = "md", icon, children, ...props }, ref) {
    const renderedIcon = icon === "none" ? null : icon ?? <ArrowRight />;
    return (
      <button
        ref={ref}
        className={`group/learn relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-lg border border-brand-gold/60 font-semibold text-brand-gold transition-[transform,border-color,background-color] duration-300 ease-out hover:-translate-y-0.5 hover:border-brand-gold hover:bg-brand-gold/10 active:translate-y-0 disabled:pointer-events-none disabled:opacity-60 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-gold/30 ${SIZE_CLASS[size]} ${ICON_SIZE[size]} ${className}`}
        {...props}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 origin-left scale-x-0 bg-brand-gold/10 transition-transform duration-500 ease-out group-hover/learn:scale-x-100"
        />
        <span className="relative z-10 inline-flex items-center">{children}</span>
        {renderedIcon ? (
          <span
            aria-hidden
            className="relative z-10 inline-flex transition-transform duration-300 ease-out group-hover/learn:translate-x-1"
          >
            {renderedIcon}
          </span>
        ) : null}
      </button>
    );
  }
);
