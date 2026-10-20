"use client";

import { useEffect, useState } from "react";

export default function FloatingHearts({ count = 10 }: { count?: number }) {
  const [elements, setElements] = useState<Array<{ id: number; left: number; delay: number; size: number; char: string }>>([]);

  useEffect(() => {
    const chars = ["🌸", "💖", "✨", "🌷", "🤍", "🎀"];
    const items = Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 90 + 5,
      delay: Math.random() * 5,
      size: Math.random() * 10 + 14,
      char: chars[Math.floor(Math.random() * chars.length)],
    }));
    setElements(items);
  }, [count]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {elements.map((item) => (
        <span
          key={item.id}
          className="floating-heart"
          style={{
            left: `${item.left}%`,
            bottom: "0%",
            fontSize: `${item.size}px`,
            animationDelay: `${item.delay}s`,
          }}
        >
          {item.char}
        </span>
      ))}
    </div>
  );
}
