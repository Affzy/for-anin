"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { config } from "@/src/config/content";
import FirefliesBackground from "./shared/FirefliesBackground";
import Page1Cover from "./pages/Page1Cover";
import Page2Memories from "./pages/Page2Memories";
import Page3Letter from "./pages/Page3Letter";
import Page4Question from "./pages/Page4Question";
import Page5Certificate from "./pages/Page5Certificate";
import Page6Closing from "./pages/Page6Closing";

export default function JourneyApp() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 6;

  // ── DESKTOP SCALING: scale up the mobile-first card on desktop ──
  const [containerStyle, setContainerStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    const updateScale = () => {
      const w = window.innerWidth;
      if (w >= 1280) {
        // Large desktop: 1280px+ → scale 1.7
        setContainerStyle({
          transform: "scale(1.7)",
          transformOrigin: "top center",
        });
      } else if (w >= 1024) {
        // Desktop: 1024–1279px → scale 1.45
        setContainerStyle({
          transform: "scale(1.45)",
          transformOrigin: "top center",
        });
      } else if (w >= 768) {
        // Tablet: 768–1023px → scale 1.2
        setContainerStyle({
          transform: "scale(1.2)",
          transformOrigin: "top center",
        });
      } else {
        // Mobile: no transform
        setContainerStyle({});
      }
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  // ── PENGELOLA AUDIO BACKGROUND OTOMATIS & MULUS ───────────
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Fungsi memutar audio secara otomatis saat tombol "Buka" ditekan di Page 1
  const startMusic = () => {
    if (audioRef.current) {
      audioRef.current.muted = false;
      audioRef.current.volume = 1.0;
      audioRef.current
        .play()
        .then(() => {
          console.log("Audio started successfully");
        })
        .catch((err) => {
          console.error("Audio playback error:", err);
        });
    }
  };

  const handleNextFromCover = () => {
    startMusic();
    setCurrentPage(2);
  };

  const handleNext = () => {
    setCurrentPage((p) => Math.min(p + 1, totalPages));
  };

  const handlePrev = () => {
    setCurrentPage((p) => Math.max(p - 1, 1));
  };

  const handleRestart = () => {
    setCurrentPage(1);
  };

  const pageVariants: Variants = {
    initial: {
      opacity: 0,
      scale: 0.96,
      filter: "blur(6px)",
      y: 12,
    },
    animate: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        duration: 0.75,
      },
    },
    exit: {
      opacity: 0,
      scale: 1.02,
      filter: "blur(6px)",
      y: -12,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-svh w-full flex flex-col justify-between items-center relative overflow-hidden animated-night-bg">
      {/* 
        ── ELEMEN AUDIO PERSISTEN LATAR BELAKANG ──────────────────
        Audio diletakkan di root komponen ini dan loop terus berputar
        tanpa pernah terhenti saat berpindah dari halaman 1 sampai 5!
      */}
      <audio
        ref={audioRef}
        src={config.music.src}
        loop
        preload="auto"
      />

      {/* ── Background Cahaya Kunang-kunang ──────────────────────── */}
      <FirefliesBackground />

      {/* ── INDIKATOR PROGRES SLIDE HALAMAN DI BAGIAN ATAS ───────── */}
      <div className="fixed top-7 sm:top-8 inset-x-0 flex items-center justify-center gap-1.5 z-40 pointer-events-none px-4">
        {Array.from({ length: totalPages }).map((_, idx) => {
          const isActive = idx + 1 === currentPage;
          const isPassed = idx + 1 < currentPage;
          return (
            <span
              key={idx}
              className="h-1 rounded-full transition-all duration-500"
              style={{
                width: isActive ? "24px" : "6px",
                backgroundColor: isActive
                  ? "#f09cb2"
                  : isPassed
                  ? "rgba(240, 156, 178, 0.45)"
                  : "rgba(255, 255, 255, 0.15)",
                boxShadow: isActive ? "0 0 10px rgba(240, 156, 178, 0.6)" : "none",
              }}
            />
          );
        })}
      </div>



      {/* ── Konten Halaman dengan AnimatePresence (Mode: Wait) ───── */}
      <div
        className="w-full max-w-[420px] mx-auto min-h-svh flex items-center justify-center relative z-10 pt-10 pb-8 px-4"
        style={containerStyle}
      >
        <AnimatePresence mode="wait">
          {currentPage === 1 && (
            <motion.div
              key="page1"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full"
            >
              <Page1Cover onNext={handleNextFromCover} />
            </motion.div>
          )}

          {currentPage === 2 && (
            <motion.div
              key="page2"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full"
            >
              <Page2Memories onNext={handleNext} onPrev={handlePrev} />
            </motion.div>
          )}

          {currentPage === 3 && (
            <motion.div
              key="page3"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full"
            >
              <Page3Letter onNext={handleNext} onPrev={handlePrev} />
            </motion.div>
          )}

          {currentPage === 4 && (
            <motion.div
              key="page4"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full"
            >
              <Page4Question onYes={handleNext} onPrev={handlePrev} />
            </motion.div>
          )}

          {currentPage === 5 && (
            <motion.div
              key="page5"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full"
            >
              <Page5Certificate onRestart={handlePrev} onNext={handleNext} />
            </motion.div>
          )}

          {currentPage === 6 && (
            <motion.div
              key="page6"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full"
            >
              <Page6Closing onRestart={handleRestart} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
