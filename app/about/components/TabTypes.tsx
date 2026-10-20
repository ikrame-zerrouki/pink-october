"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const types = [
  {
    id: "ductal",
    name: "القنوات اللبنية",
    percent: "80%",
    pct: 80,
    emoji: "🌷",
    desc: "الأكثر شيوعاً. يبدأ في القنوات التي تنقل الحليب إلى الحلمة. يُكتشف عادةً عبر الماموجرام.",
    highlight: "النوع الأكثر انتشاراً",
    color: "from-pink-500 to-rose-500",
    stops: ["#ec4899", "#f43f5e"],
  },
  {
    id: "lobular",
    name: "الفصيصات",
    percent: "10%",
    pct: 10,
    emoji: "🌸",
    desc: "يبدأ في الفصيصات (الغدد المنتجة للحليب). قد لا يظهر في الماموجرام بسهولة، لذا يُستخدم الرنين المغناطيسي أحياناً.",
    highlight: "أصعب في الكشف",
    color: "from-purple-500 to-fuchsia-500",
    stops: ["#a855f7", "#d946ef"],
  },
  {
    id: "inflammatory",
    name: "الالتهابي",
    percent: "1-5%",
    pct: 5,
    emoji: "🔥",
    desc: "نوع نادر وعدواني. يُظهر احمراراً وتورماً في الثدي دون كتلة واضحة. يحتاج علاجاً سريعاً.",
    highlight: "الأكثر شراسة",
    color: "from-rose-500 to-orange-500",
    stops: ["#f43f5e", "#f97316"],
  },
  {
    id: "paget",
    name: "باجيت",
    percent: "1-3%",
    pct: 3,
    emoji: "🎯",
    desc: "يبدأ في الحلمة ويظهر كطفح جلدي أو تقشر. غالباً ما يرتبط بسرطان في القنوات.",
    highlight: "يصيب الحلمة",
    color: "from-orange-500 to-amber-500",
    stops: ["#f97316", "#f59e0b"],
  },
];

const R = 54;
const C = 2 * Math.PI * R;

export default function TabTypes() {
  const [active, setActive] = useState(0);
  const reduce = !!useReducedMotion();
  const uid = useId().replace(/:/g, "");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = types[active];

  // تنقّل بالأسهم (الاتجاه من اليمين لليسار: ← التالي، → السابق)
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    const step = e.key === "ArrowLeft" ? 1 : -1;
    const next = (active + step + types.length) % types.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div>
      {/* ───── التبويبات ───── */}
      <div
        role="tablist"
        aria-label="أنواع سرطان الثدي"
        onKeyDown={onKeyDown}
        className="mb-8 flex w-fit max-w-full flex-wrap gap-1.5 rounded-3xl border border-pink-100 bg-white/70 p-1.5 shadow-sm backdrop-blur"
      >
        {types.map((t, i) => {
          const isActive = active === i;
          return (
            <button
              key={t.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              role="tab"
              id={`${uid}-tab-${i}`}
              aria-selected={isActive}
              aria-controls={`${uid}-panel`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActive(i)}
              className={`relative rounded-full px-5 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 ${
                isActive ? "text-white" : "text-gray-600 hover:text-pink-600"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId={`${uid}-activeTab`}
                  className={`absolute inset-0 rounded-full bg-gradient-to-l shadow-lg ${t.color}`}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative flex items-center gap-2">
                <motion.span
                  animate={
                    isActive && !reduce
                      ? { rotate: [0, -14, 14, 0], scale: [1, 1.3, 1] }
                      : { rotate: 0, scale: 1 }
                  }
                  transition={{ duration: 0.6 }}
                  className="inline-block"
                >
                  {t.emoji}
                </motion.span>
                {t.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* ───── اللوحة ───── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          role="tabpanel"
          id={`${uid}-panel`}
          aria-labelledby={`${uid}-tab-${active}`}
          initial={{ opacity: 0, y: reduce ? 0 : 20, scale: 0.99 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: reduce ? 0 : -20 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="relative overflow-hidden rounded-3xl border border-pink-100 bg-white p-8 shadow-xl md:p-12"
        >
          {/* خط لوني علوي + توهجات */}
          <span
            aria-hidden
            className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-l ${current.color}`}
          />
          <span
            aria-hidden
            className={`absolute -right-16 -top-16 h-72 w-72 rounded-full bg-gradient-to-br opacity-10 blur-3xl ${current.color}`}
          />
          <span
            aria-hidden
            className={`absolute -bottom-20 -left-16 h-64 w-64 rounded-full bg-gradient-to-br opacity-10 blur-3xl ${current.color}`}
          />
          {/* إيموجي ضخم شفاف في الخلفية */}
          <span
            aria-hidden
            className="pointer-events-none absolute -bottom-8 left-6 select-none text-[10rem] leading-none opacity-[0.07]"
          >
            {current.emoji}
          </span>

          <div className="relative grid items-center gap-10 md:grid-cols-[1fr_auto]">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <span
                  className={`inline-flex items-center rounded-full bg-gradient-to-l px-3.5 py-1 text-xs font-bold tracking-wide text-white shadow-md ${current.color}`}
                >
                  {current.highlight}
                </span>
                <span className="text-xs font-semibold tabular-nums tracking-widest text-gray-300">
                  0{active + 1} / 0{types.length}
                </span>
              </div>

              <h3 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                سرطان {current.name}
              </h3>
              <p className="text-lg leading-relaxed text-gray-700">
                {current.desc}
              </p>
            </div>

            {/* حلقة النسبة */}
            <div className="mx-auto">
              <div className="relative h-40 w-40 md:h-48 md:w-48">
                <svg
                  viewBox="0 0 128 128"
                  className="h-full w-full -rotate-90"
                  aria-hidden
                >
                  <defs>
                    <linearGradient
                      id={`${uid}-g-${current.id}`}
                      x1="0"
                      y1="0"
                      x2="1"
                      y2="1"
                    >
                      <stop offset="0%" stopColor={current.stops[0]} />
                      <stop offset="100%" stopColor={current.stops[1]} />
                    </linearGradient>
                  </defs>
                  <circle
                    cx="64"
                    cy="64"
                    r={R}
                    fill="none"
                    stroke="#fdf2f8"
                    strokeWidth="10"
                  />
                  <motion.circle
                    cx="64"
                    cy="64"
                    r={R}
                    fill="none"
                    stroke={`url(#${uid}-g-${current.id})`}
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={C}
                    initial={{ strokeDashoffset: C }}
                    animate={{
                      strokeDashoffset: C * (1 - Math.max(current.pct, 2) / 100),
                    }}
                    transition={{
                      duration: reduce ? 0 : 1.2,
                      delay: 0.2,
                      ease: EASE,
                    }}
                    style={{
                      filter: `drop-shadow(0 0 6px ${current.stops[0]}66)`,
                    }}
                  />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span
                    className={`bg-gradient-to-br bg-clip-text text-3xl font-extrabold text-transparent md:text-4xl ${current.color}`}
                  >
                    {current.percent}
                  </span>
                  <span className="mt-0.5 text-xs text-gray-500">
                    من الحالات
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}