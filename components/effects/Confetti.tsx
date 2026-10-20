"use client";

import { useEffect } from "react";

const SHAPES = ["■", "●", "▲", "♦", "★"];
const COLORS = [
  "#7A9E8E", "#C9A96E", "#D4E3DC", "#EDE4D8",
  "#7AB5A5", "#E8C98A", "#B5D4CC",
];

export default function Confetti({ active }: { active: boolean }) {
  useEffect(() => {
    if (!active) return;

    const pieces: HTMLDivElement[] = [];
    const COUNT = 80;

    for (let i = 0; i < COUNT; i++) {
      const el = document.createElement("div");
      el.className = "confetti-piece";
      el.textContent = SHAPES[Math.floor(Math.random() * SHAPES.length)];
      const x = Math.random() * 100;
      const dur = 2.5 + Math.random() * 2;
      const delay = Math.random() * 0.8;
      const size = 10 + Math.random() * 14;
      el.style.cssText = `
        left: ${x}vw;
        font-size: ${size}px;
        color: ${COLORS[Math.floor(Math.random() * COLORS.length)]};
        animation-duration: ${dur}s;
        animation-delay: ${delay}s;
      `;
      document.body.appendChild(el);
      pieces.push(el);
    }

    const cleanup = setTimeout(() => {
      pieces.forEach((p) => p.remove());
    }, 4000);

    return () => {
      clearTimeout(cleanup);
      pieces.forEach((p) => p.remove());
    };
  }, [active]);

  return null;
}
