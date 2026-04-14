"use client";

import { useRef, useEffect, useState } from "react";

type ResponsiveCount = { base: number; md?: number; lg?: number };
type BeanCount = number | ResponsiveCount;

const MD_BREAKPOINT = 768;
const LG_BREAKPOINT = 1024;

function resolveCount(count: BeanCount): number {
  if (typeof count === "number") return count;
  if (typeof window === "undefined") return count.base;
  const w = window.innerWidth;
  if (w >= LG_BREAKPOINT && count.lg !== undefined) return count.lg;
  if (w >= MD_BREAKPOINT && count.md !== undefined) return count.md;
  return count.base;
}

interface BeanState {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  imageIndex: number;
  phaseX: number;
  phaseY: number;
}

const BEAN_SRCS = [
  "/images/beans/bean-1.png",
  "/images/beans/bean-2.png",
  "/images/beans/bean-3.png",
  "/images/beans/bean-4.png",
];

const MAX_VELOCITY = 25;
const RESTITUTION = 0.8;

function initBeans(count: number, width: number, height: number): BeanState[] {
  return Array.from({ length: count }, () => {
    const size = 15 + Math.random() * 55;
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (-0.5 + Math.random()) * 20,
      vy: (-0.5 + Math.random()) * 20,
      radius: size / 2,
      size,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (-0.5 + Math.random()) * 0.3,
      opacity: 0.06 + Math.random() * 0.09,
      imageIndex: Math.floor(Math.random() * 4),
      phaseX: Math.random() * Math.PI * 2,
      phaseY: Math.random() * Math.PI * 2,
    };
  });
}

function update(
  beans: BeanState[],
  dt: number,
  width: number,
  height: number,
  now: number,
) {
  for (const bean of beans) {
    // Sinusoidal perturbation for organic floating
    bean.vx += Math.sin(now * 0.001 + bean.phaseX) * 0.02;
    bean.vy += Math.cos(now * 0.001 + bean.phaseY) * 0.02;

    // Gentle drag to keep motion calm
    const drag = Math.pow(0.94, dt);
    bean.vx *= drag;
    bean.vy *= drag;

    // Update position
    bean.x += bean.vx * dt;
    bean.y += bean.vy * dt;

    // Update rotation
    bean.rotation += bean.rotationSpeed * dt;

    // Wrap at boundaries
    if (bean.x < -bean.size) bean.x = width + bean.size;
    if (bean.x > width + bean.size) bean.x = -bean.size;
    if (bean.y < -bean.size) bean.y = height + bean.size;
    if (bean.y > height + bean.size) bean.y = -bean.size;
  }

  // Collision detection & response (circle-circle)
  for (let i = 0; i < beans.length; i++) {
    const a = beans[i];
    for (let j = i + 1; j < beans.length; j++) {
      const b = beans[j];
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const distSq = dx * dx + dy * dy;
      const minDist = a.radius + b.radius;

      if (distSq < minDist * minDist && distSq > 0) {
        const dist = Math.sqrt(distSq);
        const nx = dx / dist;
        const ny = dy / dist;
        const overlap = minDist - dist;

        // Mass proportional to area
        const m1 = a.radius * a.radius;
        const m2 = b.radius * b.radius;
        const totalMass = m1 + m2;

        // Separate overlapping beans
        a.x -= nx * overlap * (m2 / totalMass);
        a.y -= ny * overlap * (m2 / totalMass);
        b.x += nx * overlap * (m1 / totalMass);
        b.y += ny * overlap * (m1 / totalMass);

        // Elastic collision response
        const dvx = a.vx - b.vx;
        const dvy = a.vy - b.vy;
        const dvDotN = dvx * nx + dvy * ny;

        if (dvDotN > 0) {
          const impulse = (2 * dvDotN * RESTITUTION) / totalMass;
          a.vx -= impulse * m2 * nx;
          a.vy -= impulse * m2 * ny;
          b.vx += impulse * m1 * nx;
          b.vy += impulse * m1 * ny;
        }

        // Clamp velocities
        const clamp = (bean: BeanState) => {
          const speed = Math.sqrt(bean.vx * bean.vx + bean.vy * bean.vy);
          if (speed > MAX_VELOCITY) {
            const scale = MAX_VELOCITY / speed;
            bean.vx *= scale;
            bean.vy *= scale;
          }
        };
        clamp(a);
        clamp(b);
      }
    }
  }
}

function draw(
  ctx: CanvasRenderingContext2D,
  beans: BeanState[],
  images: HTMLImageElement[],
  width: number,
  height: number,
) {
  ctx.clearRect(0, 0, width, height);

  for (const bean of beans) {
    ctx.save();
    ctx.globalAlpha = bean.opacity;
    ctx.translate(bean.x, bean.y);
    ctx.rotate(bean.rotation);
    ctx.drawImage(
      images[bean.imageIndex],
      -bean.size / 2,
      -bean.size / 2,
      bean.size,
      bean.size,
    );
    ctx.restore();
  }
}

export function FloatingBeans({ count = 14 }: { count?: BeanCount }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const beansRef = useRef<BeanState[]>([]);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const sizeRef = useRef({ width: 0, height: 0 });
  const frameIdRef = useRef<number>(0);
  const [resolvedCount, setResolvedCount] = useState(() => resolveCount(count));

  useEffect(() => {
    if (typeof count === "number") {
      setResolvedCount(count);
      return;
    }
    const onResize = () => {
      const next = resolveCount(count);
      setResolvedCount((prev) => (prev === next ? prev : next));
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [count]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let cancelled = false;
    let observer: ResizeObserver | null = null;

    // Load bean images
    const imagePromises = BEAN_SRCS.map(
      (src) =>
        new Promise<HTMLImageElement>((resolve) => {
          const img = new window.Image();
          img.onload = () => resolve(img);
          img.src = src;
        }),
    );

    Promise.all(imagePromises).then((loadedImages) => {
      if (cancelled) return;
      imagesRef.current = loadedImages;

      // Size canvas
      const parent = canvas.parentElement!;
      const rect = parent.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      sizeRef.current = { width: rect.width, height: rect.height };
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);

      // Init beans
      beansRef.current = initBeans(resolvedCount, rect.width, rect.height);

      // Animation loop
      let lastTime = performance.now();
      function loop(now: number) {
        if (cancelled) return;
        const dt = Math.min((now - lastTime) / 1000, 0.05);
        lastTime = now;

        if (!document.hidden) {
          const { width, height } = sizeRef.current;
          update(beansRef.current, dt, width, height, now);
          draw(ctx!, beansRef.current, imagesRef.current, width, height);
        }

        frameIdRef.current = requestAnimationFrame(loop);
      }
      frameIdRef.current = requestAnimationFrame(loop);

      // Resize observer
      observer = new ResizeObserver(([entry]) => {
        const { width: newW, height: newH } = entry.contentRect;
        const oldW = sizeRef.current.width;
        const oldH = sizeRef.current.height;

        if (oldW > 0 && oldH > 0) {
          for (const bean of beansRef.current) {
            bean.x *= newW / oldW;
            bean.y *= newH / oldH;
          }
        }

        sizeRef.current = { width: newW, height: newH };
        const dpr = window.devicePixelRatio || 1;
        canvas.width = newW * dpr;
        canvas.height = newH * dpr;
        ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      });
      observer.observe(parent);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frameIdRef.current);
      observer?.disconnect();
    };
  }, [resolvedCount]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
