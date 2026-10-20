"use client";

import { useEffect, useState } from "react";

interface Firefly {
  id: number;
  top: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
}

export default function FirefliesBackground() {
  const [fireflies, setFireflies] = useState<Firefly[]>([]);

  useEffect(() => {
    // Jumlah sedikit (12 butir) agar tetap super smooth di HP mid-range
    const items: Firefly[] = Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      top: Math.random() * 95,
      left: Math.random() * 95,
      size: Math.random() * 3 + 2, // 2px - 5px
      duration: Math.random() * 4 + 4, // 4s - 8s
      delay: Math.random() * 4,
    }));
    setFireflies(items);
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    >
      {fireflies.map((f) => (
        <span
          key={f.id}
          className="firefly-node absolute rounded-full"
          style={{
            top: `${f.top}%`,
            left: `${f.left}%`,
            width: `${f.size}px`,
            height: `${f.size}px`,
            backgroundColor: "#f3d9c4",
            boxShadow: `0 0 ${f.size * 2}px 1px rgba(232, 160, 180, 0.6), 0 0 ${f.size * 4}px 2px rgba(243, 217, 196, 0.4)`,
            animationDuration: `${f.duration}s`,
            animationDelay: `${f.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
