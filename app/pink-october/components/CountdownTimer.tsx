"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Ribbon } from "lucide-react";

const D = "font-[family-name:var(--font-display)]";

function getNextOctober(now: Date) {
  const year = now.getMonth() > 9 ? now.getFullYear() + 1 : now.getFullYear();
  return new Date(year, 9, 1); // 1 أكتوبر
}

function isOctober(now: Date) {
  return now.getMonth() === 9;
}

function remainingLabel(n: number) {
  if (n <= 0) return "اليوم هو آخر يوم في الشهر";
  if (n === 1) return "يبقى يوم واحد";
  if (n === 2) return "يبقى يومان";
  if (n <= 10) return `تبقّى ${n} أيام`;
  return `تبقّى ${n} يوماً`;
}

/* ───────── one rolling digit ───────── */
function Digit({ value }: { value: string }) {
  const reduce = useReducedMotion();
  return (
    <span className="relative inline-block h-[1.15em] w-[0.62em] overflow-hidden align-top">
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span
          key={value}
          className="absolute inset-0 flex items-center justify-center"
          initial={reduce ? false : { y: "-100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={reduce ? undefined : { y: "100%", opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/* ───────── October: the month as a living calendar ───────── */
const WEEKDAYS = ["س", "ح", "ن", "ث", "ر", "خ", "ج"]; // السبت أولاً

function OctoberCalendar({ now }: { now: Date }) {
  const reduce = useReducedMotion();
  const today = now.getDate();
  const daysInMonth = 31;
  const first = new Date(now.getFullYear(), 9, 1);
  const offset = (first.getDay() + 1) % 7; // السبت = 0
  const left = daysInMonth - today;

  return (
    <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-rose-900 via-pink-800 to-rose-700 text-white p-8 md:p-12 max-w-3xl mx-auto shadow-2xl">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-pink-300 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-rose-300 rounded-full blur-3xl" />
      </div>
      <svg
        className="pointer-events-none absolute -top-32 -end-32 h-[420px] w-[420px]"
        viewBox="0 0 400 400"
        fill="none"
        aria-hidden
      >
        {[190, 155, 120, 85, 50].map((r) => (
          <circle key={r} cx="200" cy="200" r={r} stroke="#FFFFFF" strokeOpacity="0.1" />
        ))}
      </svg>

      <div className="relative grid md:grid-cols-[1fr_auto] gap-10 items-center">
        <div>
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/15 backdrop-blur-md ring-1 ring-white/30 mb-6">
            <Ribbon className="w-6 h-6" aria-hidden />
          </span>
          <h3 className={`${D} text-4xl md:text-5xl font-bold leading-[1.4]`}>
            نحن في أكتوبر الوردي
          </h3>
          <p className="mt-4 text-lg text-white/90 leading-loose max-w-sm">
            شهر التوعية العالمي بسرطان الثدي. شاركي، تعلّمي، وادعمي.
          </p>
          <p className={`${D} mt-6 text-2xl text-pink-200`}>
            اليوم {today} من {daysInMonth}، {remainingLabel(left)}
          </p>
        </div>

        {/* the calendar */}
        <div dir="rtl" className="mx-auto" role="img" aria-label={`اليوم ${today} من أكتوبر`}>
          <div className="grid grid-cols-7 gap-1.5 mb-1.5">
            {WEEKDAYS.map((w) => (
              <span key={w} className="text-center text-[11px] text-white/50">
                {w}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1.5">
            {Array.from({ length: offset }).map((_, i) => (
              <span key={`o${i}`} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const isToday = day === today;
              const past = day < today;
              return (
                <span key={day} className="relative flex h-9 w-9 items-center justify-center">
                  {isToday && !reduce && (
                    <motion.span
                      aria-hidden
                      className="absolute inset-0 rounded-full bg-pink-300"
                      animate={{ scale: [1, 1.7], opacity: [0.5, 0] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                    />
                  )}
                  <span
                    className={`relative flex h-8 w-8 items-center justify-center rounded-full text-xs tabular-nums ${
                      isToday
                        ? "bg-white text-rose-700 font-bold ring-4 ring-pink-300/70"
                        : past
                        ? "bg-pink-300/80 text-rose-900"
                        : "text-white/70 ring-1 ring-white/30"
                    }`}
                  >
                    {day}
                  </span>
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────── Other months: rolling-digit countdown ───────── */
function Countdown({ now }: { now: Date | null }) {
  const target = getNextOctober(now ?? new Date());
  const diff = now ? Math.max(0, target.getTime() - now.getTime()) : 0;

  const units = [
    { value: Math.floor(diff / 86400000), label: "يوم" },
    { value: Math.floor((diff / 3600000) % 24), label: "ساعة" },
    { value: Math.floor((diff / 60000) % 60), label: "دقيقة" },
    { value: Math.floor((diff / 1000) % 60), label: "ثانية" },
  ];

  return (
    <div className="relative overflow-hidden bg-white rounded-[2rem] shadow-2xl p-8 md:p-12 border border-pink-100 max-w-3xl mx-auto text-center">
      <svg
        className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2"
        viewBox="0 0 400 400"
        fill="none"
        aria-hidden
      >
        {[190, 155, 120, 85, 50].map((r) => (
          <circle key={r} cx="200" cy="200" r={r} stroke="#EC4899" strokeOpacity="0.1" />
        ))}
      </svg>

      <div className="relative">
        <h3 className={`${D} text-3xl md:text-4xl font-bold text-gray-900 leading-[1.5]`}>
          يبدأ أكتوبر الوردي بعد
        </h3>

        <div
          className="mt-8 grid grid-cols-4 gap-3"
          role="timer"
          aria-label="الوقت المتبقي لأكتوبر الوردي"
        >
          {units.map((u) => (
            <div
              key={u.label}
              className="bg-gradient-to-br from-pink-500 to-rose-500 text-white rounded-2xl py-5 px-2 shadow-lg"
            >
              <div
                dir="ltr"
                className={`${D} text-4xl md:text-6xl font-bold leading-none tabular-nums flex justify-center`}
              >
                {now ? (
                  String(u.value)
                    .padStart(2, "0")
                    .split("")
                    .map((ch, k) => <Digit key={k} value={ch} />)
                ) : (
                  <span className="opacity-40">--</span>
                )}
              </div>
              <div className="mt-3 text-xs opacity-90">{u.label}</div>
            </div>
          ))}
        </div>

        <p className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-600">
          <Ribbon className="w-4 h-4 text-pink-500" aria-hidden />
          استعدّي للمشاركة في الشهر الوردي القادم
        </p>
      </div>
    </div>
  );
}

export default function CountdownTimer() {
  // null until mounted → no server/client mismatch
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  if (now && isOctober(now)) return <OctoberCalendar now={now} />;
  return <Countdown now={now} />;
}
