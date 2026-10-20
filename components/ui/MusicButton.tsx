"use client";

export default function MusicButton({
  on,
  onToggle,
}: {
  on: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="text-xs tracking-widest uppercase flex items-center gap-2 px-3.5 py-1.5 rounded-full border transition-all cursor-pointer"
      style={{
        borderColor: "var(--color-warm-border)",
        background: "rgba(255,255,255,0.8)",
        color: "var(--color-warm-muted)",
      }}
      title={on ? "Matikan musik" : "Nyalakan musik"}
      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-warm-text)")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-warm-muted)")}
    >
      {on ? (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M11 4.702a.7.7 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.7.7 0 0 0 11 19.298z"/>
          <path d="m16.5 14.5 5-5"/>
          <path d="m16.5 9.5 5 5"/>
        </svg>
      )}
      <span>{on ? "Musik On" : "Musik Off"}</span>
    </button>
  );
}
