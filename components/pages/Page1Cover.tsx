"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { config } from "@/src/config/content";
import BouquetIllustration from "@/components/shared/BouquetIllustration";

export default function Page1Cover({ onNext }: { onNext: () => void }) {
  const { line1, line2, buttonText, hintText } = config.page1;
  const [isOpening, setIsOpening] = useState(false);

  const handleClickOpen = () => {
    if (isOpening) return;
    setIsOpening(true);
    // Beri waktu 850ms agar animasi buket zoom dan bunga terbang ke atas dinikmati
    // sebelum AnimatePresence bertransisi ke Page 2
    setTimeout(() => {
      onNext();
    }, 850);
  };

  return (
    <div className="w-full max-w-sm sm:max-w-md md:max-w-lg mx-auto flex flex-col items-center justify-between min-h-[580px] sm:min-h-[660px] px-4 sm:px-6 py-6 sm:py-8 text-center relative z-10">
      {/* ── BAGIAN ATAS: BUKET BUNGA MEKAR ─────────────────────────── */}
      <div className="w-full flex-1 flex flex-col items-center justify-center pt-2">
        <BouquetIllustration isOpening={isOpening} />
      </div>

      {/* ── BAGIAN TENGAH: TEKS DUA BARIS DENGAN KOMBINASI FONT ELEGAN ─────── */}
      <motion.div
        className="w-full space-y-1 my-6"
        animate={isOpening ? { opacity: 0, y: -20, filter: "blur(4px)" } : {}}
        transition={{ duration: 0.5 }}
      >
        <motion.p
          className="text-3xl sm:text-4xl font-normal tracking-wide text-[#f09cb2] drop-shadow-[0_2px_8px_rgba(240,156,178,0.3)]"
          style={{ fontFamily: "var(--font-fancy)" }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.6, ease: "easeOut" }}
        >
          {line1}
        </motion.p>
        <motion.h1
          className="text-2xl sm:text-3xl font-normal tracking-tight text-[#ffffff] drop-shadow-[0_2px_10px_rgba(240,156,178,0.25)]"
          style={{ fontFamily: "var(--font-serif)" }}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 2.0, ease: "easeOut" }}
        >
          {line2}
        </motion.h1>
      </motion.div>

      {/* ── BAGIAN BAWAH: TOMBOL MINIMALIS & HINT BERDENYUT ─────────── */}
      <motion.div
        className="w-full flex flex-col items-center space-y-3 pt-2"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2.4 }}
      >
        <motion.button
          type="button"
          onClick={handleClickOpen}
          disabled={isOpening}
          whileHover={{ scale: isOpening ? 1 : 1.05 }}
          whileTap={{ scale: isOpening ? 1 : 0.96 }}
          animate={
            isOpening ? { scale: 0.92, opacity: 0 } : { scale: 1, opacity: 1 }
          }
          transition={{ duration: 0.4 }}
          className="px-8 py-3 rounded-full text-xs uppercase tracking-[0.25em] font-semibold transition-all cursor-pointer border border-[#f09cb2]/60 bg-[#160c26] text-[#ffffff] hover:bg-[#f09cb2] hover:text-[#0a0614] shadow-[0_0_20px_rgba(240,156,178,0.25)] backdrop-blur-md"
        >
          {buttonText}
        </motion.button>

        <span
          className={`text-xs text-[#d9ccdf] tracking-widest soft-pulse font-medium transition-opacity duration-300 ${
            isOpening ? "opacity-0" : "opacity-100"
          }`}
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {hintText}
        </span>
      </motion.div>
    </div>
  );
}
