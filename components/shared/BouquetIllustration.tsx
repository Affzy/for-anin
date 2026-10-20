"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

// ── Seed-based pseudo-random so server/client match ──────────────────────────
function seededRand(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

// Generate explosion particles deterministically
function generateParticles(count: number) {
  return Array.from({ length: count }, (_, i) => {
    const angle = seededRand(i * 3) * Math.PI * 2;
    // Different rings of explosion: inner dense cloud, outer spray
    const ring = i < count * 0.45 ? "inner" : i < count * 0.75 ? "mid" : "outer";
    const distance =
      ring === "inner"
        ? 40 + seededRand(i * 7 + 1) * 80
        : ring === "mid"
        ? 100 + seededRand(i * 7 + 1) * 100
        : 180 + seededRand(i * 7 + 1) * 140;

    // Slightly bias upward (like the image — more particles go up)
    const biasedAngle = angle - Math.PI * 0.35 * seededRand(i * 5);
    const vx = Math.cos(biasedAngle) * distance;
    const vy = Math.sin(biasedAngle) * distance - seededRand(i * 11) * 60;

    const size =
      ring === "inner"
        ? 2 + seededRand(i * 13) * 4
        : ring === "mid"
        ? 1.5 + seededRand(i * 13) * 3
        : 1 + seededRand(i * 13) * 2;

    const colors = [
      "#f7b7c8", "#e8a0b4", "#d87a95", "#fad0c4",
      "#ffe5d9", "#f3d9c4", "#c9a0c4", "#b8a0d4",
      "#e8c0e8", "#f0d0f0", "#ffffff",
    ];
    const color = colors[Math.floor(seededRand(i * 17) * colors.length)];

    const delay = seededRand(i * 19) * 0.18;
    const duration = 0.55 + seededRand(i * 23) * 0.65;
    const opacity = 0.55 + seededRand(i * 29) * 0.45;
    const rotate = seededRand(i * 31) * 720 - 360;
    const isRound = seededRand(i * 37) > 0.4;

    return { vx, vy, size, color, delay, duration, opacity, rotate, isRound };
  });
}

const PARTICLE_COUNT = 120;

export default function BouquetIllustration({ isOpening = false }: { isOpening?: boolean }) {
  const particles = useMemo(() => generateParticles(PARTICLE_COUNT), []);

  return (
    <div
      className="relative w-52 h-64 sm:w-60 sm:h-72 select-none mx-auto flex items-center justify-center overflow-visible"
      style={{ maxWidth: "240px", maxHeight: "288px", width: "100%" }}
    >

      {/* ── The bouquet SVG (hides when exploding) ─────────────────── */}
      <motion.svg
        viewBox="0 0 240 300"
        className="w-full h-full idle-sway drop-shadow-[0_10px_25px_rgba(232,160,180,0.15)]"
        style={{ maxWidth: "240px", maxHeight: "288px" }}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={
          isOpening
            ? { scale: [1, 1.15, 0.1], opacity: [1, 1, 0], filter: ["blur(0px)", "blur(0px)", "blur(12px)"] }
            : {}
        }
        transition={isOpening ? { duration: 0.55, ease: [0.22, 1, 0.36, 1] } : {}}
      >
        <defs>
          <linearGradient id="kraftWrap" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#25183d" />
            <stop offset="50%" stopColor="#1a112c" />
            <stop offset="100%" stopColor="#120c1f" />
          </linearGradient>
          <linearGradient id="roseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f7b7c8" />
            <stop offset="100%" stopColor="#d87a95" />
          </linearGradient>
          <linearGradient id="peonyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fad0c4" />
            <stop offset="100%" stopColor="#e8a0b4" />
          </linearGradient>
          <linearGradient id="tulipGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffe5d9" />
            <stop offset="100%" stopColor="#f3d9c4" />
          </linearGradient>
          <linearGradient id="leafGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#627a69" />
            <stop offset="100%" stopColor="#3d5244" />
          </linearGradient>
        </defs>

        {/* ── 1. TANGKAI ─────────────────────────── */}
        <motion.path
          d="M120 280 L120 160"
          stroke="#475f4e"
          strokeWidth="3.5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
        <motion.path
          d="M115 270 Q100 200 85 140"
          stroke="#3d5244"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.15, ease: "easeOut" }}
        />
        <motion.path
          d="M125 270 Q140 200 155 140"
          stroke="#3d5244"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.25, ease: "easeOut" }}
        />

        {/* ── 2. DAUN ─────────────────────────────── */}
        <motion.path
          d="M85 170 C60 150 65 125 90 145 C90 160 85 170 85 170 Z"
          fill="url(#leafGradient)"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.9 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "backOut" }}
        />
        <motion.path
          d="M155 170 C180 150 175 125 150 145 C150 160 155 170 155 170 Z"
          fill="url(#leafGradient)"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.9 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "backOut" }}
        />
        <motion.path
          d="M120 135 C110 105 130 95 135 120 Z"
          fill="url(#leafGradient)"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.85 }}
          transition={{ duration: 0.7, delay: 0.7, ease: "backOut" }}
        />

        {/* ── 3. BUNGA ──────────────────────────────── */}
        {/* Tulip Kiri */}
        <motion.g
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.34, 1.56, 0.64, 1] }}
          style={{ transformOrigin: "85px 135px" }}
        >
          <path d="M70 145 C65 110 85 105 85 135 C85 105 105 110 100 145 Z" fill="url(#tulipGradient)" />
          <path d="M78 140 C75 118 95 118 92 140 Z" fill="#ffe5d9" opacity="0.7" />
        </motion.g>

        {/* Peony Kanan */}
        <motion.g
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1, ease: [0.34, 1.56, 0.64, 1] }}
          style={{ transformOrigin: "155px 135px" }}
        >
          <circle cx="155" cy="130" r="24" fill="url(#peonyGradient)" />
          <path d="M140 130 Q155 115 170 130 Q155 142 140 130 Z" fill="#f7b7c8" opacity="0.8" />
          <path d="M145 125 Q155 118 165 125" stroke="#f3d9c4" strokeWidth="2" strokeLinecap="round" />
          <circle cx="155" cy="130" r="8" fill="#e8a0b4" />
        </motion.g>

        {/* Mawar Tengah */}
        <motion.g
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.9, delay: 1.3, ease: [0.34, 1.56, 0.64, 1] }}
          style={{ transformOrigin: "120px 115px" }}
        >
          <circle cx="120" cy="115" r="28" fill="url(#roseGradient)" />
          <circle cx="120" cy="115" r="20" fill="#e8a0b4" />
          <path d="M106 115 C106 102 134 102 134 115 C134 128 106 128 106 115 Z" fill="#d87a95" opacity="0.9" />
          <circle cx="120" cy="115" r="11" fill="#be5b78" />
          <path d="M114 113 Q120 108 126 113 Q120 119 114 113 Z" fill="#f7b7c8" />
        </motion.g>

        {/* Baby's breath / aksen kecil */}
        <motion.circle cx="100" cy="90" r="4.5" fill="#f3d9c4"
          initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.5 }} />
        <motion.circle cx="140" cy="90" r="5" fill="#f3d9c4"
          initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.6 }} />
        <motion.circle cx="120" cy="75" r="4" fill="#ffe5d9"
          initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.7 }} />

        {/* ── 4. PEMBUNGKUS ──────────────────────────── */}
        <motion.polygon
          points="120,270 65,170 175,170"
          fill="url(#kraftWrap)"
          stroke="rgba(232, 160, 180, 0.35)"
          strokeWidth="1.5"
          strokeLinejoin="round"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        />
        <motion.polygon
          points="120,270 85,170 155,170"
          fill="#1c1230"
          opacity="0.8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 0.8, delay: 0.45 }}
        />

        {/* ── 5. PITA ──────────────────────────────── */}
        <motion.g
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          style={{ transformOrigin: "120px 210px" }}
        >
          <circle cx="120" cy="210" r="7" fill="#e8a0b4" />
          <path d="M120 210 Q98 200 90 210 Q98 222 120 210 Z" fill="#d87a95" />
          <path d="M120 210 Q142 200 150 210 Q142 222 120 210 Z" fill="#d87a95" />
          <path d="M116 215 Q108 240 102 255" stroke="#e8a0b4" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M124 215 Q132 240 138 255" stroke="#e8a0b4" strokeWidth="3.5" strokeLinecap="round" />
        </motion.g>
      </motion.svg>

      {/* ── Kelopak jatuh saat idle ──────────────────────────────────── */}
      {!isOpening && (
        <motion.span
          className="absolute w-2.5 h-3 rounded-full bg-[#e8a0b4]/60 pointer-events-none"
          style={{ borderRadius: "60% 40% 70% 30% / 50% 60% 40% 50%", top: "40%", left: "25%" }}
          animate={{ y: [0, 90], x: [0, 15, -10], rotate: [0, 180], opacity: [0, 0.8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
        />
      )}

      {/* ── LEDAKAN PARTIKEL SAAT TOMBOL BUKA ─────────────────────────
           Mirip gambar: ratusan partikel kecil meledak ke segala arah
           membentuk awan ledakan yang padat di tengah dan menyebar luas
      ────────────────────────────────────────────────────────────────── */}
      {isOpening && (
        <div
          className="pointer-events-none"
          style={{
            position: "absolute",
            top: "40%",
            left: "50%",
            width: 0,
            height: 0,
            overflow: "visible",
          }}
        >
          {/* Flash/bloom kilat sesaat di pusat ledakan */}
          <motion.div
            style={{
              position: "absolute",
              width: 120,
              height: 120,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(255,230,240,0.9) 0%, rgba(240,156,178,0.6) 40%, transparent 70%)",
              transform: "translate(-50%, -50%)",
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 2.5, 4], opacity: [0, 1, 0] }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Partikel ledakan utama */}
          {particles.map((p, i) => (
            <motion.span
              key={i}
              style={{
                position: "absolute",
                width: p.size,
                height: p.isRound ? p.size : p.size * 1.6,
                borderRadius: p.isRound ? "50%" : "40% 60% 50% 50%",
                backgroundColor: p.color,
                top: 0,
                left: 0,
                transform: "translate(-50%, -50%)",
                boxShadow: `0 0 ${p.size * 1.5}px ${p.color}88`,
              }}
              initial={{ x: 0, y: 0, scale: 0, opacity: 0, rotate: 0 }}
              animate={{
                x: p.vx,
                y: p.vy,
                scale: [0, 1.8, 1.2, 0.3],
                opacity: [0, p.opacity, p.opacity * 0.7, 0],
                rotate: p.rotate,
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                ease: [0.16, 1, 0.3, 1],
              }}
            />
          ))}

          {/* Secondary ring: partikel lebih kecil mengisi celah */}
          {Array.from({ length: 40 }, (_, i) => {
            const angle = (i / 40) * Math.PI * 2;
            const r = 60 + seededRand(i * 41) * 50;
            return (
              <motion.span
                key={`ring-${i}`}
                style={{
                  position: "absolute",
                  width: 1 + seededRand(i * 43) * 2,
                  height: 1 + seededRand(i * 43) * 2,
                  borderRadius: "50%",
                  backgroundColor: ["#f7b7c8", "#e8c0e8", "#ffffff", "#fad0c4"][i % 4],
                  top: 0,
                  left: 0,
                  transform: "translate(-50%, -50%)",
                }}
                initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                animate={{
                  x: Math.cos(angle) * r,
                  y: Math.sin(angle) * r - seededRand(i * 47) * 30,
                  opacity: [0, 0.8, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 0.7 + seededRand(i * 53) * 0.4,
                  delay: 0.05 + seededRand(i * 59) * 0.15,
                  ease: "easeOut",
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
