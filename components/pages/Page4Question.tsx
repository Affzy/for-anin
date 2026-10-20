"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { config } from "@/src/config/content";

export default function Page4Question({
  onYes,
  onPrev,
}: {
  onYes: () => void;
  onPrev?: () => void;
}) {
  const { questionText, subText, yesButtonText, noButtonText, noEscapePhrases, yesMaxScale } = config.page4;

  // Status apakah Yes sudah terpusat ke tengah (karena kursor diarahkan ke Yes atau No kabur)
  const [yesCentered, setYesCentered] = useState(false);
  const [noEscaped, setNoEscaped] = useState(false);
  const [noPos, setNoPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [yesScale, setYesScale] = useState(1);
  const [escapeCount, setEscapeCount] = useState(0);
  const [currentPhrase, setCurrentPhrase] = useState("");

  const containerRef = useRef<HTMLDivElement>(null);
  const noBtnRef = useRef<HTMLButtonElement>(null);

  // Fungsi memindahkan tombol No ke posisi acak aman di dalam container
  const escapeNoButton = () => {
    const container = containerRef.current;
    if (!container) return;

    // Otomatis pindahkan Yes ke tengah saat No mulai kabur
    setYesCentered(true);
    setNoEscaped(true);

    const rect = container.getBoundingClientRect();
    const maxX = (rect.width / 2) - 60;
    const maxY = (rect.height / 2) - 40;

    // Koordinat acak baru
    const newX = (Math.random() - 0.5) * 2 * maxX;
    const newY = (Math.random() - 0.5) * 2 * maxY;

    setNoPos({ x: newX, y: newY });
    setEscapeCount((c) => c + 1);

    // Ganti kalimat jenaka
    const phrase = noEscapePhrases[Math.floor(Math.random() * noEscapePhrases.length)];
    setCurrentPhrase(phrase);

    // Tombol Yes bertambah besar secara proporsional
    setYesScale((prev) => Math.min(prev + 0.1, yesMaxScale));
  };

  // Deteksi kursor mendekat ke tombol No di desktop (radius ~90px)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const btn = noBtnRef.current;
      if (!btn) return;
      const btnRect = btn.getBoundingClientRect();
      const btnCenterX = btnRect.left + btnRect.width / 2;
      const btnCenterY = btnRect.top + btnRect.height / 2;

      const dist = Math.hypot(e.clientX - btnCenterX, e.clientY - btnCenterY);
      if (dist < 90) {
        escapeNoButton();
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto flex flex-col items-center justify-between min-h-[580px] sm:min-h-[620px] px-5 pt-6 pb-24 text-center relative z-10"
    >
      {/* ── PERTANYAAN BESAR ELEGAN & TERANG ─────────────────── */}
      <div className="space-y-3 pt-6">
        <motion.h2
          className="text-3xl sm:text-4xl font-normal text-[#ffffff] leading-tight drop-shadow-[0_2px_15px_rgba(240,156,178,0.3)]"
          style={{ fontFamily: "var(--font-serif)" }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          {questionText}
        </motion.h2>
        <p className="text-xs sm:text-sm text-[#fce3ce] font-light">
          {subText}
        </p>

        {/* Teks Jenaka saat tombol No kabur */}
        <div className="min-h-[26px]">
          {escapeCount > 0 && (
            <motion.span
              key={escapeCount}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xl sm:text-2xl text-[#f09cb2] font-normal block drop-shadow-sm tracking-wide"
              style={{ fontFamily: "var(--font-hand)" }}
            >
              {currentPhrase}
            </motion.span>
          )}
        </div>
      </div>

      {/* ── AREA INTERAKTIF DUA TOMBOL ───────────────────────── */}
      <div className="w-full relative h-48 flex items-center justify-center">
        {/* Tombol YES */}
        <motion.button
          type="button"
          onClick={onYes}
          onMouseEnter={() => setYesCentered(true)}
          animate={{
            x: yesCentered ? 0 : -55,
            scale: yesScale,
          }}
          whileHover={{ scale: yesScale * 1.06 }}
          whileTap={{ scale: yesScale * 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          className="px-9 py-4 rounded-full text-sm font-bold tracking-wider text-[#0a0614] bg-linear-to-r from-[#f09cb2] via-[#fad0c4] to-[#fce3ce] shadow-[0_0_35px_rgba(240,156,178,0.6)] cursor-pointer z-10 hover:shadow-[0_0_45px_rgba(252,227,206,0.8)]"
        >
          {yesButtonText}
        </motion.button>

        {/* Tombol NO */}
        <motion.button
          ref={noBtnRef}
          type="button"
          tabIndex={-1}
          aria-disabled="true"
          onPointerDown={(e) => {
            e.preventDefault();
            escapeNoButton();
          }}
          onTouchStart={(e) => {
            e.preventDefault();
            escapeNoButton();
          }}
          animate={{
            x: noEscaped ? noPos.x : 55,
            y: noEscaped ? noPos.y : 0,
            scale: Math.max(0.85, 1 - escapeCount * 0.03),
          }}
          transition={{ type: "spring", stiffness: 450, damping: 25 }}
          className="absolute px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider text-[#d9ccdf] bg-[#1a0e2d]/80 border border-white/20 cursor-default select-none z-20 shadow-md"
        >
          {noButtonText}
        </motion.button>
      </div>

      {/* ── TOMBOL KEMBALI DI BAGIAN BAWAH ───────────────────── */}
      <div className="w-full flex flex-col items-center gap-2">
        {onPrev && (
          <button
            type="button"
            onClick={onPrev}
            className="px-5 py-2 rounded-full text-xs uppercase tracking-wider font-semibold text-[#d9ccdf] hover:text-[#ffffff] transition-colors cursor-pointer border border-white/10 hover:border-white/30"
          >
            ← Kembali ke Surat
          </button>
        )}
        <div className="text-xs text-[#d9ccdf]/70 tracking-wider">
          pilih salah satu jawaban di atas
        </div>
      </div>
    </div>
  );
}
