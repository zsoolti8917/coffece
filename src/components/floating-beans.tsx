"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface Bean {
  id: number;
  src: string;
  x: number;
  y: number;
  size: number;
  rotation: number;
  opacity: number;
  duration: number;
  delay: number;
  driftX: number;
  driftY: number;
}

const beanSources = [
  "/images/beans/bean-1.png",
  "/images/beans/bean-2.png",
  "/images/beans/bean-3.png",
  "/images/beans/bean-4.png",
];

function generateBeans(count: number): Bean[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    src: beanSources[Math.floor(Math.random() * beanSources.length)],
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 15 + Math.random() * 55,
    rotation: Math.random() * 360,
    opacity: 0.06 + Math.random() * 0.09,
    duration: 15 + Math.random() * 20,
    delay: Math.random() * -20,
    driftX: -30 + Math.random() * 60,
    driftY: -30 + Math.random() * 60,
  }));
}

export function FloatingBeans({ count = 14 }: { count?: number }) {
  const [beans, setBeans] = useState<Bean[]>([]);

  useEffect(() => {
    setBeans(generateBeans(count));
  }, [count]);

  if (beans.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <style>{`
        @keyframes bean-float {
          0% { transform: translate(0, 0) rotate(var(--bean-start-rot)); }
          25% { transform: translate(var(--bean-drift-x), calc(var(--bean-drift-y) * -1)) rotate(calc(var(--bean-start-rot) + 90deg)); }
          50% { transform: translate(calc(var(--bean-drift-x) * -0.5), var(--bean-drift-y)) rotate(calc(var(--bean-start-rot) + 180deg)); }
          75% { transform: translate(calc(var(--bean-drift-x) * 0.7), calc(var(--bean-drift-y) * -0.5)) rotate(calc(var(--bean-start-rot) + 270deg)); }
          100% { transform: translate(0, 0) rotate(calc(var(--bean-start-rot) + 360deg)); }
        }
      `}</style>
      {beans.map((bean) => (
        <div
          key={bean.id}
          className="absolute"
          style={{
            left: `${bean.x}%`,
            top: `${bean.y}%`,
            width: bean.size,
            height: bean.size,
            opacity: bean.opacity,
            ["--bean-start-rot" as string]: `${bean.rotation}deg`,
            ["--bean-drift-x" as string]: `${bean.driftX}px`,
            ["--bean-drift-y" as string]: `${bean.driftY}px`,
            animation: `bean-float ${bean.duration}s ease-in-out ${bean.delay}s infinite`,
          }}
        >
          <Image
            src={bean.src}
            alt=""
            width={bean.size}
            height={bean.size}
            className="w-full h-full object-contain"
          />
        </div>
      ))}
    </div>
  );
}
