"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  speedY: number;
  opacity: number;
  delay: number;
  el: HTMLDivElement;
}

const COLORS = [
  "rgba(122,158,142,0.45)",
  "rgba(201,169,110,0.4)",
  "rgba(212,227,220,0.6)",
  "rgba(237,228,216,0.7)",
  "rgba(44,40,37,0.12)",
];

export default function Particles() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const COUNT = 22;
    const particles: Particle[] = [];

    for (let i = 0; i < COUNT; i++) {
      const el = document.createElement("div");
      el.className = "particle";
      const size = 4 + Math.random() * 8;
      const x = Math.random() * 100;
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      const duration = 5 + Math.random() * 6;
      const delay = Math.random() * 6;

      el.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${x}%;
        bottom: ${Math.random() * 20}%;
        background: ${color};
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
      `;
      container.appendChild(el);
      particles.push({ x, y: 0, size, color, speedY: 0, opacity: 0, delay, el });
    }

    return () => {
      particles.forEach((p) => p.el.remove());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
