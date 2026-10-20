"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { config } from "@/src/config/content";

export default function Page2Memories({
  onNext,
  onPrev,
}: {
  onNext: () => void;
  onPrev?: () => void;
}) {
  const { title, subtitle, photos, buttonText } = config.page2;

  // Fallback default cards jika array foto kosong
  const effectivePhotos =
    photos.length > 0
      ? photos
      : [
          { src: "", caption: "momen tak terlupakan" },
          { src: "", caption: "tawa kecil bersamamu" },
          { src: "", caption: "senja di sudut kota" },
        ];

  // Menyimpan zIndex per kartu agar kartu yang terakhir disentuh/digeser selalu berada paling atas
  const [zIndices, setZIndices] = useState<number[]>(
    effectivePhotos.map((_, i) => i + 10),
  );

  const bringToFront = (index: number) => {
    setZIndices((prev) => {
      const maxZ = Math.max(...prev, 10);
      const updated = [...prev];
      updated[index] = maxZ + 1;
      return updated;
    });
  };

  // Posisi awal tumpukan yang menyebar luas & organik (4 sudut + 1 center di depan)
  const initialPositions = [
    { x: -44, y: -26, rotate: -9 },
    { x: 42, y: -22, rotate: 8 },
    { x: -38, y: 28, rotate: -5 },
    { x: 38, y: 24, rotate: 7 },
    { x: 0, y: 2, rotate: -1 },
  ];

  return (
    <div className="w-full max-w-lg md:max-w-xl mx-auto flex flex-col items-center justify-center py-2 px-4 text-center relative z-10 select-none">
      {/* ── HEADER DENGAN TEKS TAJAM TERANG ────────────────── */}
      <motion.div
        className="space-y-1.5 relative z-0 pointer-events-none mb-3 sm:mb-5"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2
          className="text-2xl sm:text-3xl md:text-4xl font-normal text-[#ffffff] drop-shadow-sm"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {title}
        </h2>
        <p className="text-xs sm:text-sm md:text-base text-[#d9ccdf] font-light leading-relaxed">
          {subtitle}
        </p>
      </motion.div>

      {/* ── AREA KANVAS POLAROID BEBAS GESER DENGAN BATAS AMAN LEGA ── */}
      <div className="relative w-full h-[360px] sm:h-[400px] flex items-center justify-center my-3 sm:my-4 overflow-visible">
        {effectivePhotos.map((item, index) => {
          const init = initialPositions[index % initialPositions.length];
          const z = zIndices[index] || 10;

          return (
            <motion.div
              key={index}
              drag
              dragConstraints={{
                left: -150,
                right: 150,
                top: -170,
                bottom: 170,
              }}
              dragElastic={0.12}
              dragMomentum={false}
              onPointerDown={() => bringToFront(index)}
              initial={{
                scale: 0.88,
                opacity: 0,
                x: init.x,
                y: init.y,
                rotate: init.rotate,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
              whileDrag={{ scale: 1.05, cursor: "grabbing" }}
              style={{
                zIndex: z,
                touchAction: "none",
              }}
              className="absolute w-[190px] sm:w-[220px] md:w-[240px] p-3 sm:p-3.5 pb-4 sm:pb-5 rounded-2xl shadow-[0_20px_45px_rgba(0,0,0,0.85)] border border-white/20 bg-[#160c26]/95 backdrop-blur-xl cursor-grab active:cursor-grabbing hover:border-[#f09cb2]/60 transition-colors"
            >
              {/* Frame Foto */}
              <div className="w-full aspect-square rounded-xl bg-linear-to-br from-[#24133b] to-[#0d0617] relative overflow-hidden flex items-center justify-center border border-white/10 pointer-events-none">
                {item.src ? (
                  <img
                    src={item.src}
                    alt={item.caption}
                    className="w-full h-full object-cover select-none"
                    loading="eager"
                  />
                ) : null}
              </div>

              {/* Caption Tulisan Tangan Putih Terang Jelas */}
              <div className="pt-2.5 text-center pointer-events-none">
                <p
                  className="text-[17px] sm:text-[19px] text-[#ffffff] font-normal leading-tight drop-shadow-sm tracking-normal"
                  style={{ fontFamily: "var(--font-hand)" }}
                >
                  {item.caption}
                </p>
              </div>
            </motion.div>
          );
        })}

        {/* Petunjuk Interaktif Drag Bebas */}
        <span className="absolute -bottom-2 text-[11px] sm:text-xs tracking-widest text-[#fce3ce] font-medium uppercase soft-pulse pointer-events-none">
          geser & atur fotonya sesuka hati 🖐️
        </span>
      </div>

      {/* ── TOMBOL NAVIGASI: KEMBALI & LANJUT ────────────────── */}
      <motion.div
        className="w-full max-w-sm sm:max-w-md mx-auto pt-4 relative z-20 flex items-center justify-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {onPrev && (
          <button
            type="button"
            onClick={onPrev}
            className="px-4 sm:px-5 py-3 rounded-full text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer border border-white/20 bg-[#160c26]/80 text-[#d9ccdf] hover:text-[#ffffff] hover:border-white/40 shadow-md whitespace-nowrap shrink-0 hover:scale-105 active:scale-95"
          >
            ← Kembali
          </button>
        )}
        <button
          type="button"
          onClick={onNext}
          className="py-3 px-6 sm:px-7 rounded-full text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer border border-[#f09cb2]/60 bg-[#160c26] text-[#ffffff] hover:bg-[#f09cb2] hover:text-[#0a0614] shadow-lg whitespace-nowrap shrink-0 hover:scale-105 active:scale-95"
        >
          {buttonText}
        </button>
      </motion.div>
    </div>
  );
}
