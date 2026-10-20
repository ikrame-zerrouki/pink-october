"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Calendar, Clock, Sparkles, XCircle } from "lucide-react";

const timings = [
  {
    icon: Calendar,
    title: "بعد الدورة الشهرية",
    days: "3–7 أيام",
    desc: "أفضل وقت لأن الثدي يكون أقل حساسية وتورماً، مما يسهّل اكتشاف أي تغيرات.",
    color: "from-pink-500 to-rose-500",
    glow: "bg-pink-300/40",
    best: true,
    avoid: false,
  },
  {
    icon: Clock,
    title: "في نفس اليوم شهرياً",
    days: "التزمي بتاريخ",
    desc: "إذا انقطعت دورتكِ، اختاري يوماً ثابتاً كل شهر (مثلاً أول يوم من الشهر).",
    color: "from-purple-500 to-fuchsia-500",
    glow: "bg-fuchsia-300/40",
    best: false,
    avoid: false,
  },
  {
    icon: XCircle,
    title: "تجنّبي الفحص أثناء الدورة",
    days: "أثناء الحيض",
    desc: "قد يكون الثدي متورماً ومؤلمًا طبيعياً، مما يجعل التمييز صعباً.",
    color: "from-gray-400 to-gray-500",
    glow: "bg-gray-300/40",
    best: false,
    avoid: true,
  },
  {
    icon: Sparkles,
    title: "بعد انقطاع الطمث",
    days: "يوم ثابت شهرياً",
    desc: "اختاري يوماً واحداً في الشهر وثبتيه، مثلاً أول يوم من كل شهر.",
    color: "from-teal-500 to-cyan-500",
    glow: "bg-cyan-300/40",
    best: false,
    avoid: false,
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export default function TimingCards() {
  const reduce = !!useReducedMotion();

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {timings.map((t, i) => {
        const Icon = t.icon;
        return (
          <motion.div
            key={t.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={reduce ? undefined : { y: -6 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6, ease: EASE }}
            className="group relative"
          >
            {t.best && (
              <span className="absolute -top-3 right-6 z-20 rounded-full bg-gradient-to-l from-pink-500 to-rose-500 px-3.5 py-1 text-xs font-bold text-white shadow-lg shadow-pink-300/60">
                ⭐ الأفضل
              </span>
            )}
            {t.avoid && (
              <span className="absolute -top-3 right-6 z-20 rounded-full bg-gray-700 px-3.5 py-1 text-xs font-bold text-white shadow-lg">
                ⚠ تجنّبي
              </span>
            )}

            {/* إطار: يدور بضوء للخيار الأفضل */}
            <div
              className={`relative h-full overflow-hidden rounded-2xl p-[2px] transition-all duration-300 ${
                t.best
                  ? "shadow-lg shadow-pink-200/60 group-hover:shadow-xl group-hover:shadow-pink-300/70"
                  : "bg-gray-100 shadow-md group-hover:bg-gradient-to-br group-hover:from-pink-200 group-hover:to-rose-100 group-hover:shadow-xl"
              }`}
            >
              {t.best &&
                (reduce ? (
                  <span aria-hidden className="absolute inset-0 bg-gradient-to-br from-pink-400 to-rose-300" />
                ) : (
                  <motion.span
                    aria-hidden
                    className="absolute -inset-[100%] bg-[conic-gradient(from_0deg,#ec4899,#fbcfe8,#fda4af,#ec4899)]"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                  />
                ))}

              <div className="relative h-full overflow-hidden rounded-[14px] bg-white p-6">
                <span
                  aria-hidden
                  className={`absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-60 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-90 ${t.glow}`}
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute -bottom-5 -left-1 select-none text-8xl font-black leading-none text-gray-50 transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-110"
                >
                  0{i + 1}
                </span>

                <div className="relative">
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div className="relative">
                      <span
                        aria-hidden
                        className={`absolute inset-0 rounded-2xl bg-gradient-to-br opacity-40 blur-lg transition-opacity duration-500 group-hover:opacity-70 ${t.color}`}
                      />
                      <span
                        className={`relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110 ${t.color}`}
                      >
                        <Icon className="h-7 w-7" />
                      </span>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        t.avoid ? "bg-gray-100 text-gray-600" : "bg-pink-50 text-pink-600"
                      }`}
                    >
                      {t.days}
                    </span>
                  </div>

                  <h3 className="mb-2 text-xl font-bold text-gray-900">{t.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-700">{t.desc}</p>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
