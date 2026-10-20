"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { config } from "@/src/config/content";

const CLOSING_TEXT =
  "semoga kedepannya kita punya lebih banyak cerita, lebih banyak tawa, dan lebih banyak alasan buat tetap saling memilih, ga harus selalu sempurna, yang penting kita harus sama-sama mau berusaha 🤍";

export default function Page6Closing({
  onRestart,
}: {
  onRestart?: () => void;
}) {
  const [displayedChars, setDisplayedChars] = useState(0);
  const [showFooter, setShowFooter] = useState(false);

  // Tipe per-karakter dengan delay antar huruf
  useEffect(() => {
    if (displayedChars >= CLOSING_TEXT.length) {
      // Semua huruf sudah muncul, tampilkan footer setelah sedikit jeda
      const footerTimer = setTimeout(() => setShowFooter(true), 800);
      return () => clearTimeout(footerTimer);
    }

    // Kecepatan: emoji & spasi lebih cepat, huruf biasa sedikit lebih lambat
    const char = CLOSING_TEXT[displayedChars];
    const delay = char === " " || char === "," ? 28 : char === "." ? 120 : 42;

    const timer = setTimeout(() => {
      setDisplayedChars((c) => c + 1);
    }, delay);

    return () => clearTimeout(timer);
  }, [displayedChars]);

  const visibleText = CLOSING_TEXT.slice(0, displayedChars);

  return (
    <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto flex flex-col items-center justify-center min-h-[680px] px-6 pt-8 pb-20 text-center relative z-10 space-y-10 select-none">

      {/* ── ORNAMEN ATAS ─────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="flex flex-col items-center gap-2"
      >
        <span className="text-3xl">🌸</span>
        <span className="text-xs tracking-[0.35em] uppercase text-[#f09cb2] font-semibold">
          a little note
        </span>
      </motion.div>

      {/* ── TEKS ANIMASI PER-HURUF ────────────────────────────── */}
      <div className="relative w-full flex-1 flex items-center justify-center">
        <p
          className="text-[17px] sm:text-lg text-[#ffffff] font-light leading-[1.85] tracking-wide drop-shadow-sm text-center"
          style={{ fontFamily: "var(--font-serif)", minHeight: "200px" }}
        >
          {visibleText}
          {/* Cursor kedip-kedip saat masih mengetik */}
          {displayedChars < CLOSING_TEXT.length && (
            <span className="inline-block w-[2px] h-[1.1em] bg-[#f09cb2] align-middle ml-0.5 animate-pulse" />
          )}
        </p>
      </div>

      {/* ── FOOTER: TOMBOL ULANGI DARI AWAL ──────────────────── */}
      <AnimatePresence>
        {showFooter && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full flex flex-col items-center gap-4"
          >
            {/* Divider kecil estetik */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="w-16 h-px bg-gradient-to-r from-transparent via-[#f09cb2]/60 to-transparent"
            />

            {/* Tombol Ulangi dari Awal — lebih menarik */}
            {onRestart && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 200, damping: 18 }}
                className="w-full"
              >
                <button
                  type="button"
                  onClick={onRestart}
                  className="group w-full py-3.5 px-6 rounded-full text-xs uppercase tracking-[0.25em] font-bold text-[#fce3ce] border border-[#fce3ce]/30 bg-[#160c26]/60 hover:bg-[#fce3ce]/10 hover:border-[#fce3ce]/60 hover:shadow-[0_0_24px_rgba(252,227,206,0.25)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer backdrop-blur-sm"
                >
                  <span className="group-hover:-rotate-45 transition-transform duration-300 inline-block">↺</span>
                  <span>{config.page5.restartButtonText?.replace(" ↺", "") || "ulangi dari awal"}</span>
                </button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

