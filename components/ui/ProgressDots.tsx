"use client";

export default function ProgressDots({
  total,
  current,
  onDotClick,
}: {
  total: number;
  current: number;
  onDotClick: (i: number) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-1.5 w-full">
      {Array.from({ length: total }).map((_, i) => {
        const active = i === current;
        return (
          <button
            key={i}
            type="button"
            onClick={() => onDotClick(i)}
            aria-label={`Langkah ${i + 1}`}
            title={`Langkah ${i + 1}`}
            className="h-1.5 rounded-full transition-all duration-500 cursor-pointer flex-1"
            style={{
              maxWidth: active ? "28px" : "10px",
              background: active
                ? "var(--color-warm-sage)"
                : "var(--color-warm-border)",
            }}
            onMouseEnter={(e) => {
              if (!active) e.currentTarget.style.background = "var(--color-warm-muted)";
            }}
            onMouseLeave={(e) => {
              if (!active) e.currentTarget.style.background = "var(--color-warm-border)";
            }}
          />
        );
      })}
    </div>
  );
}
