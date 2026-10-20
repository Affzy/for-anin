"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { config } from "@/src/config/content";

export default function Page3Letter({
  onNext,
  onPrev,
}: {
  onNext: () => void;
  onPrev?: () => void;
}) {
  const { headerTag, title, paragraphs, closing, scrollHint, buttonText } = config.page3;
  const [isOpen, setIsOpen] = useState(false);
  const [canProceed, setCanProceed] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Cek apakah user sudah scroll sampai bawah atau jika teks pendek
  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const isAtBottom = el.scrollHeight - el.scrollTop <= el.clientHeight + 25;
    if (isAtBottom) {
      setCanProceed(true);
    }
  };

  useEffect(() => {
    if (isOpen) {
      // Auto enable jika konten pas di viewport tanpa perlu scroll
      const timer = setTimeout(() => {
        const el = scrollRef.current;
        if (el && el.scrollHeight <= el.clientHeight + 10) {
          setCanProceed(true);
        }
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <div className="w-full max-w-sm mx-auto flex flex-col items-center justify-between min-h-[620px] px-5 py-6 text-center relative z-10 pb-24">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          /* ── TAMPILAN 1: AMPLOP TERTUTUP DENGAN SEGEL TAP-TO-OPEN ── */
          <motion.div
            key="envelope"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85, y: -20 }}
            transition={{ duration: 0.5 }}
            className="w-full my-auto flex flex-col items-center space-y-6"
          >
            <div className="space-y-1.5">
              <span className="text-xs tracking-[0.25em] text-[#f09cb2] uppercase font-semibold">
                {headerTag}
              </span>
              <h2
                className="text-2xl sm:text-3xl font-normal text-[#ffffff] drop-shadow-sm"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {title}
              </h2>
            </div>

            {/* Amplop dengan wax seal */}
            <div
              onClick={() => setIsOpen(true)}
              role="button"
              tabIndex={0}
              className="w-full aspect-16/11 rounded-2xl relative bg-linear-to-b from-[#1c0e30] to-[#0c0617] border border-[#f09cb2]/50 shadow-[0_20px_45px_rgba(0,0,0,0.85)] cursor-pointer hover:border-[#f09cb2] transition-all flex flex-col items-center justify-center p-6 select-none group"
            >
              {/* Flap amplop */}
              <div
                className="absolute top-0 inset-x-0 h-1/2 bg-[#251340] border-b border-[#f09cb2]/30"
                style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
              />

              {/* Wax Seal Segel Mawar */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative z-10 w-14 h-14 rounded-full bg-linear-to-tr from-[#d86a87] to-[#f09cb2] text-[#0a0614] flex items-center justify-center shadow-xl border-2 border-[#fce3ce]"
              >
                <span className="text-2xl">✉</span>
              </motion.div>

              <div className="relative z-10 mt-5 text-center space-y-1.5">
                <span className="text-sm text-[#ffffff] font-semibold tracking-wide block">
                  Kepada: Chynara Anindya
                </span>
                <span className="text-xs text-[#fce3ce] uppercase tracking-widest block soft-pulse font-medium">
                  TAP UNTUK MEMBUKA
                </span>
              </div>
            </div>

            {/* Tombol Kembali dari tampilan amplop */}
            {onPrev && (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={onPrev}
                  className="px-5 py-2 rounded-full text-xs uppercase tracking-wider font-semibold text-[#d9ccdf] hover:text-[#ffffff] transition-colors cursor-pointer border border-white/10 hover:border-white/30"
                >
                  ← Kembali
                </button>
              </div>
            )}
          </motion.div>
        ) : (
          /* ── TAMPILAN 2: KERTAS SURAT ELEGAN YANG BISA DISCROLL ─── */
          <motion.div
            key="letter"
            initial={{ opacity: 0, y: 35, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 220, damping: 22 }}
            className="w-full flex-1 flex flex-col items-center justify-between"
          >
            {/* Kartu Surat Kertas Malam Kontras Jelas */}
            <div className="w-full relative rounded-2xl border border-white/20 bg-[#120a20]/95 shadow-[0_25px_60px_rgba(0,0,0,0.85)] backdrop-blur-xl flex flex-col my-auto overflow-hidden">
              {/* Fade Gradient Top Indicator */}
              <div className="absolute top-0 inset-x-0 h-6 bg-linear-to-b from-[#120a20] to-transparent pointer-events-none z-10" />

              {/* Scrollable Container */}
              <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="p-6 sm:p-7 max-h-[360px] sm:max-h-[400px] overflow-y-auto custom-letter-scroll space-y-4 text-left"
              >
                <div className="border-b border-white/15 pb-3 flex justify-between items-center">
                  <span
                    className="text-lg font-normal text-[#fce3ce]"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    Dear {config.recipientName},
                  </span>
                  <span
                    className="text-base sm:text-lg text-[#f09cb2] tracking-wide"
                    style={{ fontFamily: "var(--font-hand)" }}
                  >
                    from the heart
                  </span>
                </div>

                {/* Teks Paragraf Surat Putih Bersih Mudah Dibaca */}
                <div className="space-y-4 text-sm text-[#ffffff] font-normal leading-relaxed">
                  {paragraphs.map((p, idx) => (
                    <p key={idx} className="leading-relaxed drop-shadow-xs">
                      {p}
                    </p>
                  ))}
                </div>

                {/* Tanda tangan */}
                <div className="border-t border-white/15 pt-4 flex flex-col items-end text-right">
                  <span className="text-xs text-[#d9ccdf] italic">
                    {closing}
                  </span>
                  <span
                    className="text-3xl text-[#fce3ce] font-normal tracking-wide"
                    style={{ fontFamily: "var(--font-hand)" }}
                  >
                    {config.senderName}
                  </span>
                </div>
              </div>

              {/* Fade Gradient Bottom Indicator */}
              <div className="absolute bottom-0 inset-x-0 h-8 bg-linear-to-t from-[#120a20] to-transparent pointer-events-none z-10" />
            </div>

            {/* Petunjuk / Tombol Navigasi */}
            <div className="w-full pt-4 min-h-[50px] flex items-center justify-center">
              {!canProceed ? (
                <div className="flex items-center gap-3 w-full justify-between">
                  {onPrev && (
                    <button
                      type="button"
                      onClick={onPrev}
                      className="px-4 py-2 rounded-full text-xs uppercase tracking-wider font-semibold text-[#d9ccdf] hover:text-[#ffffff] transition-colors cursor-pointer border border-white/10 hover:border-white/30"
                    >
                      ← Kembali
                    </button>
                  )}
                  <span className="text-xs text-[#fce3ce] tracking-widest soft-pulse font-medium">
                    {scrollHint} ↓
                  </span>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full flex items-center gap-2.5"
                >
                  {onPrev && (
                    <button
                      type="button"
                      onClick={onPrev}
                      className="px-5 py-3.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer border border-white/20 bg-[#160c26]/80 text-[#d9ccdf] hover:text-[#ffffff] hover:border-white/40 shadow-md"
                    >
                      ← Kembali
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={onNext}
                    className="flex-1 py-3.5 rounded-full text-xs uppercase tracking-[0.2em] font-semibold transition-all cursor-pointer border border-[#f09cb2]/60 bg-[#160c26] text-[#ffffff] hover:bg-[#f09cb2] hover:text-[#0a0614] shadow-lg"
                  >
                    {buttonText}
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
