
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Ribbon } from "lucide-react";

const D = "font-[family-name:var(--font-display)]";

function getNextOctober(now: Date) {
  const year =
    now.getMonth() > 9
      ? now.getFullYear() + 1
      : now.getFullYear();

  return new Date(year, 9, 1);
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

/* ───────── One rolling digit ───────── */
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

/* ───────── October calendar ───────── */
const WEEKDAYS = ["س", "ح", "ن", "ث", "ر", "خ", "ج"];

function OctoberCalendar({ now }: { now: Date }) {
  const reduce = useReducedMotion();
  const today = now.getDate();
  const daysInMonth = 31;
  const first = new Date(now.getFullYear(), 9, 1);
  const offset = (first.getDay() + 1) % 7;
  const left = daysInMonth - today;

  return (
    <div className="relative mx-auto max-w-3xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-rose-900 via-pink-800 to-rose-700 p-8 text-white shadow-2xl md:p-12">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-pink-300 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-rose-300 blur-3xl" />
      </div>

      <svg
        className="pointer-events-none absolute -end-32 -top-32 h-[420px] w-[420px]"
        viewBox="0 0 400 400"
        fill="none"
        aria-hidden="true"
      >
        {[190, 155, 120, 85, 50].map((r) => (
          <circle
            key={r}
            cx="200"
            cy="200"
            r={r}
            stroke="#FFFFFF"
            strokeOpacity="0.1"
          />
        ))}
      </svg>

      <div className="relative grid items-center gap-10 md:grid-cols-[1fr_auto]">
        <div>
          <span className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/30 backdrop-blur-md">
            <Ribbon className="h-6 w-6" aria-hidden="true" />
          </span>

          <h3
            className={`${D} text-4xl font-bold leading-[1.4] md:text-5xl`}
          >
            نحن في أكتوبر الوردي
          </h3>

          <p className="mt-4 max-w-sm text-lg leading-loose text-white/90">
            شهر التوعية العالمي بسرطان الثدي. شاركي، تعلّمي، وادعمي.
          </p>

          <p className={`${D} mt-6 text-2xl text-pink-200`}>
            اليوم {today} من {daysInMonth}، {remainingLabel(left)}
          </p>
        </div>

        <div
          dir="rtl"
          className="mx-auto"
          role="img"
          aria-label={`اليوم ${today} من أكتوبر`}
        >
          <div className="mb-1.5 grid grid-cols-7 gap-1.5">
            {WEEKDAYS.map((w, i) => (
              <span
                key={`${w}-${i}`}
                className="text-center text-[11px] text-white/50"
              >
                {w}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1.5">
            {Array.from({ length: offset }).map((_, i) => (
              <span key={`offset-${i}`} />
            ))}

            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const isToday = day === today;
              const past = day < today;

              return (
                <span
                  key={day}
                  className="relative flex h-9 w-9 items-center justify-center"
                >
                  {isToday && !reduce && (
                    <motion.span
                      aria-hidden="true"
                      className="absolute inset-0 rounded-full bg-pink-300"
                      animate={{ scale: [1, 1.7], opacity: [0.5, 0] }}
                      transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        ease: "easeOut",
                      }}
                    />
                  )}

                  <span
                    className={`relative flex h-8 w-8 items-center justify-center rounded-full text-xs tabular-nums ${
                      isToday
                        ? "bg-white font-bold text-rose-700 ring-4 ring-pink-300/70"
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

/* ───────── Countdown outside October ───────── */
function Countdown({ now }: { now: Date | null }) {
  // Do not read the current time during prerendering.
  // Wait until useEffect provides a real date.
  const target = now ? getNextOctober(now) : null;

  const diff =
    now && target
      ? Math.max(0, target.getTime() - now.getTime())
      : 0;

  const units = [
    { value: Math.floor(diff / 86400000), label: "يوم" },
    { value: Math.floor((diff / 3600000) % 24), label: "ساعة" },
    { value: Math.floor((diff / 60000) % 60), label: "دقيقة" },
    { value: Math.floor((diff / 1000) % 60), label: "ثانية" },
  ];

  return (
    <div className="relative mx-auto max-w-3xl overflow-hidden rounded-[2rem] border border-pink-100 bg-white p-8 text-center shadow-2xl md:p-12">
      <svg
        className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2"
        viewBox="0 0 400 400"
        fill="none"
        aria-hidden="true"
      >
        {[190, 155, 120, 85, 50].map((r) => (
          <circle
            key={r}
            cx="200"
            cy="200"
            r={r}
            stroke="#EC4899"
            strokeOpacity="0.1"
          />
        ))}
      </svg>

      <div className="relative">
        <h3
          className={`${D} text-3xl font-bold leading-[1.5] text-gray-900 md:text-4xl`}
        >
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
              className="rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 px-2 py-5 text-white shadow-lg"
            >
              <div
                dir="ltr"
                className={`${D} flex justify-center text-4xl font-bold leading-none tabular-nums md:text-6xl`}
              >
                {now ? (
                  String(u.value)
                    .padStart(2, "0")
                    .split("")
                    .map((ch, k) => (
                      <Digit key={`${u.label}-${k}`} value={ch} />
                    ))
                ) : (
                  <span className="opacity-40">--</span>
                )}
              </div>

              <div className="mt-3 text-xs opacity-90">{u.label}</div>
            </div>
          ))}
        </div>

        <p className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-600">
          <Ribbon className="h-4 w-4 text-pink-500" aria-hidden="true" />
          استعدّي للمشاركة في الشهر الوردي القادم
        </p>
      </div>
    </div>
  );
}

/* ───────── Main component ───────── */
export default function CountdownTimer() {
  // null during prerendering; the current time is read after mounting.
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const updateTime = () => setNow(new Date());

    updateTime();

    const id = window.setInterval(updateTime, 1000);

    return () => window.clearInterval(id);
  }, []);

  if (now && isOctober(now)) {
    return <OctoberCalendar now={now} />;
  }

  return <Countdown now={now} />;
}
