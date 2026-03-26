"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface OptionCardProps {
  icon?: string;
  title: string;
  description?: string;
  selected: boolean;
  onClick: () => void;
  className?: string;
  children?: React.ReactNode;
}

export function OptionCard({ icon, title, description, selected, onClick, className, children }: OptionCardProps) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={cn(
        "relative rounded-xl border-2 p-5 text-left transition-all duration-200 w-full",
        selected
          ? "border-brand-gold bg-brand-gold-light dark:bg-brand-gold/10"
          : "border-border hover:border-brand-gold/50 bg-card",
        className
      )}
    >
      {children ? children : (
        <>
          {icon && <span className="text-2xl mb-2 block">{icon}</span>}
          <span className="font-semibold block">{title}</span>
          {description && <span className="text-sm text-muted-foreground mt-1 block">{description}</span>}
        </>
      )}
    </motion.button>
  );
}
