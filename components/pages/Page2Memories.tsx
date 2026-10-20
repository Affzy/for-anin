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
    <div className="w-full max-w-[420px] mx-auto flex flex-col items-center justify-between min-h-[690px] px-2 sm:px-3 pt-3 pb-8 text-center relative z-10 select-none">
      {/* ── HEADER DENGAN TEKS TAJAM TERANG ────────────────── */}
      <motion.div
        className="space-y-1.5 relative z-0 pointer-events-none"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2
          className="text-2xl sm:text-3xl font-normal text-[#ffffff] drop-shadow-sm"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {title}
        </h2>
        <p className="text-xs sm:text-sm text-[#d9ccdf] font-light leading-relaxed">
          {subtitle}
        </p>
      </motion.div>

      {/* ── AREA KANVAS POLAROID BEBAS GESER DENGAN BATAS AMAN LEGA ── */}
      <div className="relative w-full flex-1 min-h-[460px] sm:min-h-[490px] flex items-center justify-center my-1 overflow-visible">
        {effectivePhotos.map((item, index) => {
          const init = initialPositions[index % initialPositions.length];
          const z = zIndices[index] || 10;

          return (
            <motion.div
              key={index}
              drag
              dragConstraints={{
                left: -120,
                right: 120,
                top: -150,
                bottom: 150,
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
              className="absolute w-[185px] sm:w-[200px] p-3 pb-4 rounded-2xl shadow-[0_20px_45px_rgba(0,0,0,0.85)] border border-white/20 bg-[#160c26]/95 backdrop-blur-xl cursor-grab active:cursor-grabbing hover:border-[#f09cb2]/60 transition-colors"
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
        <span className="absolute bottom-0 text-[11px] tracking-widest text-[#fce3ce] font-medium uppercase soft-pulse pointer-events-none">
          geser & atur fotonya sesuka hati 🖐️
        </span>
      </div>

      {/* ── TOMBOL NAVIGASI: KEMBALI & LANJUT ────────────────── */}
      <motion.div
        className="w-full pt-3 relative z-20 flex items-center gap-2.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
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
    </div>
  );
}
