"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { config } from "@/src/config/content";

export default function Page5Certificate({ onRestart, onNext }: { onRestart?: () => void; onNext?: () => void }) {
  const { certificate, closingNote, screenshotHint, restartButtonText, whatsapp, tapHint } = config.page5;
  const [shaking, setShaking] = useState(false);
  const [confettiBurst, setConfettiBurst] = useState(false);

  // Otomatis tanggal hari ini jika dateOverride kosong
  const displayDate = certificate.dateOverride || new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  // Fungsi confetti yang bisa dipanggil kapan saja
  const fireConfetti = () => {
    const colors = ["#f09cb2", "#fce3ce", "#ffffff", "#e87a99", "#d4a5b8", "#c9a0c4"];
    // Tembak hanya dari kiri dan kanan
    confetti({ particleCount: 70, angle: 60, spread: 70, origin: { x: 0, y: 0.6 }, colors });
    confetti({ particleCount: 70, angle: 120, spread: 70, origin: { x: 1, y: 0.6 }, colors });
    // Visual bounce feedback
    setConfettiBurst(true);
    setTimeout(() => setConfettiBurst(false), 400);
  };

  useEffect(() => {
    // ── 1. Ledakan Confetti Elegan Palet Dusty Rose & Champagne ─────────
    const end = Date.now() + 3000;
    const colors = ["#f09cb2", "#fce3ce", "#ffffff", "#e87a99", "#d4a5b8"];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();

    // ── 2. Efek Getar Layar Singkat saat Stamp Menghentak (setelah 0.8s) ─
    const shakeTimer = setTimeout(() => {
      setShaking(true);
      setTimeout(() => setShaking(false), 380);
    }, 850);

    return () => clearTimeout(shakeTimer);
  }, []);

  const cleanPhone = whatsapp?.number ? whatsapp.number.replace(/\D/g, "") : "";
  const waUrl = whatsapp?.enabled && cleanPhone
    ? whatsapp.message && whatsapp.message.trim() !== ""
      ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(whatsapp.message.trim())}`
      : `https://wa.me/${cleanPhone}`
    : null;

  return (
    <div
      className={`w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto flex flex-col items-center justify-between min-h-[660px] px-4 pt-4 pb-28 text-center relative z-10 space-y-4 ${
        shaking ? "screen-shake-anim" : ""
      }`}
    >
      {/* ── KARTU SERTIFIKAT RESMI JADIAN ───────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 25 }}
        animate={{
          opacity: 1,
          scale: confettiBurst ? 1.03 : 1,
          y: 0,
        }}
        transition={
          confettiBurst
            ? { type: "tween", duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }
            : { type: "spring", stiffness: 220, damping: 20 }
        }
        onClick={fireConfetti}
        className="w-full relative rounded-2xl border border-[#f09cb2]/60 bg-linear-to-b from-[#1c0e30] via-[#120820] to-[#0a0413] p-5 sm:p-6 shadow-[0_25px_60px_rgba(0,0,0,0.9)] backdrop-blur-xl text-left space-y-3.5 overflow-hidden cursor-pointer select-none"
        style={{ boxShadow: confettiBurst ? "0 0 40px rgba(240,156,178,0.5), 0 25px 60px rgba(0,0,0,0.9)" : undefined }}
        whileTap={{ scale: 0.975 }}
      >
        {/* Border Garis Ganda Tipis Vintage */}
        <div className="absolute inset-2 border border-[#fce3ce]/25 rounded-xl pointer-events-none" />

        {/* Judul & Header Dokumen */}
        <div className="text-center space-y-1 relative z-10 pt-1">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#f09cb2] font-semibold block">
            {(certificate as any).headerTag || "OFFICIALLY YOURS"}
          </span>
          <h3
            className="text-xl sm:text-2xl font-normal text-[#ffffff] drop-shadow-sm"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {certificate.title}
          </h3>
          <p className="text-xs text-[#d9ccdf] font-light">
            {certificate.subtitle}
          </p>
        </div>

        {/* Nama Kedua Pihak */}
        <div className="border-y border-white/15 py-3 flex items-center justify-around text-center relative z-10">
          <div>
            <span className="text-[10px] text-[#d9ccdf] block uppercase tracking-wider font-medium">
              Pihak Pertama
            </span>
            <span
              className="text-2xl sm:text-3xl text-[#fce3ce] font-normal tracking-wide"
              style={{ fontFamily: "var(--font-hand)" }}
            >
              {config.recipientName}
            </span>
          </div>
          <span className="text-sm text-[#f09cb2] font-bold">&</span>
          <div>
            <span className="text-[10px] text-[#d9ccdf] block uppercase tracking-wider font-medium">
              Pihak Kedua
            </span>
            <span
              className="text-2xl sm:text-3xl text-[#fce3ce] font-normal tracking-wide"
              style={{ fontFamily: "var(--font-hand)" }}
            >
              {config.senderName}
            </span>
          </div>
        </div>

        {/* A Little Promise for Us / Janji Bersama (Tanpa Format Pasal) */}
        <div className="space-y-2 relative z-10 text-xs text-[#ffffff] font-normal leading-relaxed pr-1 pt-0.5">
          {(certificate as any).promiseTitle && (
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#f09cb2] font-semibold block text-center pb-0.5">
              {(certificate as any).promiseTitle}
            </span>
          )}
          {(certificate as any).promises && (certificate as any).promises.length > 0 ? (
            (certificate as any).promises.map((promise: string, idx: number) => (
              <p
                key={idx}
                className="leading-relaxed drop-shadow-xs text-justify sm:text-left text-[#f5eef5]/90 text-[11px] sm:text-xs font-light"
              >
                {promise}
              </p>
            ))
          ) : (
            certificate.rules?.map((rule, idx) => (
              <p key={idx} className="leading-snug drop-shadow-xs">
                • {rule}
              </p>
            ))
          )}
        </div>

        {/* Tanggal & Stempel APPROVED */}
        <div className="border-t border-white/15 pt-3 pb-1 flex items-end justify-between relative z-10">
          <div className="space-y-0.5">
            <span className="text-[10px] uppercase tracking-wider text-[#d9ccdf] block font-medium">
              Diresmikan Pada:
            </span>
            <span className="text-xs sm:text-sm text-[#fce3ce] font-semibold block">
              {displayDate}
            </span>
          </div>

          {/* Stempel APPROVED yang jatuh membanting */}
          <div className="relative pr-1">
            <div className="stamp-effect px-4 py-1.5 rounded-sm border-2 border-[#f09cb2] text-[#f09cb2] font-bold text-xs tracking-widest uppercase shadow-[0_0_20px_rgba(240,156,178,0.7)] select-none">
              {certificate.stampText}
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── HINT TAP CONFETTI ─────────────────────────────────────── */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="text-[10px] text-[#d9ccdf]/70 tracking-widest soft-pulse"
      >
        {tapHint || "✨ tap sertifikatnya buat ngerayain kita!"}
      </motion.p>

      {/* ── KALIMAT PENUTUP & HINT SCREENSHOT ───────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="space-y-1.5 w-full"
      >
        <span className="text-xs text-[#fce3ce]/90 font-light italic block tracking-wide">
          📸 {screenshotHint}
        </span>
      </motion.div>

      {/* ── TOMBOL WHATSAPP & TOMBOL ULANGI/LANJUT ─────────── */}
      <div className="w-full space-y-3 pt-1">
        {waUrl && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
          >
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-5 rounded-full text-xs uppercase tracking-[0.2em] font-bold text-[#0a0614] bg-linear-to-r from-[#f09cb2] via-[#fad0c4] to-[#fce3ce] hover:shadow-[0_0_30px_rgba(240,156,178,0.7)] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              <span>{whatsapp.buttonText}</span>
              <span>→</span>
            </a>
          </motion.div>
        )}

        {/* Tombol lanjut ke halaman closing */}
        {onNext && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7 }}
          >
            <button
              type="button"
              onClick={onNext}
              className="w-full py-3.5 px-5 rounded-full text-xs uppercase tracking-[0.2em] font-bold text-[#ffffff] border border-[#f09cb2]/50 bg-transparent hover:bg-[#f09cb2]/10 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>ada satu hal lagi</span>
              <span>→</span>
            </button>
          </motion.div>
        )}

        {/* Tombol Kembali ke Halaman Sebelumnya (Page 4) */}
        {onRestart && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.9 }}
          >
            <button
              type="button"
              onClick={onRestart}
              className="inline-flex items-center gap-1.5 text-xs text-[#d9ccdf] hover:text-[#fce3ce] transition-colors cursor-pointer font-medium"
            >
              <span>← kembali</span>
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
