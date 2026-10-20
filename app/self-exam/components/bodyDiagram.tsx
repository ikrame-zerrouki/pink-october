"use client";

import { useId } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ───────── هندسة ثابتة (لا عشوائية، فلا مشاكل hydration) ───────── */

const BREASTS = [
  { cx: 112, cy: 176, label: "الثدي الأيمن", delay: 0 },
  { cx: 188, cy: 176, label: "الثدي الأيسر", delay: 0.4 },
];

const NODES = [
  { x: 74, y: 126 },
  { x: 226, y: 126 },
  { x: 80, y: 148 },
  { x: 220, y: 148 },
  { x: 120, y: 76 },
  { x: 180, y: 76 },
];

const VESSELS = [
  "M104 160 C92 150 84 140 76 128",
  "M196 160 C208 150 216 140 224 128",
  "M74 126 C80 104 100 88 118 78",
  "M226 126 C220 104 200 88 182 78",
];

const TORSO =
  "M60 82 C60 64 98 56 150 56 C202 56 240 64 240 82 L232 156 C228 206 236 262 222 322 C192 338 108 338 78 322 C64 262 72 206 68 156 Z";

function spiral(cx: number, cy: number, r0: number, r1: number, turns: number, n = 64) {
  return Array.from({ length: n + 1 }, (_, i) => {
    const t = i / n;
    const r = r0 + (r1 - r0) * t;
    const a = t * turns * Math.PI * 2 - Math.PI / 2;
    return {
      x: +(cx + r * Math.cos(a)).toFixed(2),
      y: +(cy + r * Math.sin(a)).toFixed(2),
    };
  });
}

const SPIRALS = BREASTS.map((b) => spiral(b.cx, b.cy, 38, 5, 3));
const toPath = (pts: { x: number; y: number }[]) =>
  pts.map((p, i) => `${i ? "L" : "M"}${p.x} ${p.y}`).join(" ");

const STEPS = [
  { title: "ابدئي الفحص", hint: "تابعي الخطوات لترى كل مرحلة على الرسم" },
  { title: "المراقبة أمام المرآة", hint: "قفي بكتفين مستقيمين ولاحظي الشكل واللون" },
  { title: "فحص الحلمة", hint: "انتبهي لأي تغيّر أو إفرازات غير معتادة" },
  { title: "الفحص الدائري", hint: "3 أصابع، حركات دائرية من الخارج إلى الداخل" },
  { title: "الغدد الليمفاوية", hint: "افحصي منطقة الإبط وما فوق الترقوة" },
  { title: "وضعية الاستلقاء", hint: "كرري الفحص كاملاً وأنتِ مستلقية" },
];

/**
 * رسم SVG توضيحي للثدي والحلمة والغدد الليمفاوية
 * يتحرك حسب الخطوة النشطة (1 – 5)
 */
export default function BodyDiagram({ step }: { step: number }) {
  const reduce = !!useReducedMotion();
  const id = useId().replace(/:/g, "");
  const s = Math.min(Math.max(step, 0), 5);
  const info = STEPS[s];

  const center = { transformBox: "fill-box", transformOrigin: "center" } as const;

  return (
    <div className="relative mx-auto w-full max-w-md">
      {/* توهج خلف الرسم */}
      <div
        aria-hidden
        className="absolute inset-x-6 top-10 -z-10 h-64 rounded-full bg-pink-300/30 blur-3xl"
      />

      <svg viewBox="0 0 300 380" className="h-auto w-full" role="img" aria-label={info.title}>
        <defs>
          <radialGradient id={`${id}-bg`} cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#FCE7F3" />
            <stop offset="100%" stopColor="#FDF2F8" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`${id}-skin`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FEF1F7" />
            <stop offset="100%" stopColor="#FBCFE8" />
          </linearGradient>
          <radialGradient id={`${id}-breast`} cx="35%" cy="30%" r="80%">
            <stop offset="0%" stopColor="#FFE4EF" />
            <stop offset="55%" stopColor="#F9A8D4" />
            <stop offset="100%" stopColor="#F472B6" />
          </radialGradient>
          <linearGradient id={`${id}-scan`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F472B6" stopOpacity="0" />
            <stop offset="50%" stopColor="#F472B6" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#F472B6" stopOpacity="0" />
          </linearGradient>
          <filter id={`${id}-glow`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <clipPath id={`${id}-clip`}>
            <path d={TORSO} />
          </clipPath>
        </defs>

        <ellipse cx="150" cy="190" rx="142" ry="170" fill={`url(#${id}-bg)`} />

        {/* المرآة (الخطوة 1) */}
        <AnimatePresence>
          {s === 1 && (
            <motion.g
              key="mirror"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              style={center}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <rect x="28" y="22" width="244" height="330" rx="28" fill="white" fillOpacity="0.25" stroke="#F9A8D4" strokeWidth="3" />
              <rect x="34" y="28" width="232" height="318" rx="22" fill="none" stroke="white" strokeWidth="1.5" strokeOpacity="0.8" />
              <polygon points="50,44 98,44 50,132" fill="white" fillOpacity="0.45" />
              <polygon points="108,44 120,44 50,176" fill="white" fillOpacity="0.28" />
            </motion.g>
          )}
        </AnimatePresence>

        {/* الجذع والرقبة */}
        <path d="M134 58 L134 36 Q150 30 166 36 L166 58 Z" fill={`url(#${id}-skin)`} stroke="#F9A8D4" strokeOpacity="0.6" />
        <path d={TORSO} fill={`url(#${id}-skin)`} stroke="#F9A8D4" strokeOpacity="0.7" strokeWidth="1.5" />
        <path d="M122 78 Q150 90 178 78" fill="none" stroke="#F9A8D4" strokeOpacity="0.7" strokeLinecap="round" />

        {/* الأوعية الليمفاوية */}
        {VESSELS.map((d, i) => (
          <motion.path
            key={i}
            d={d}
            fill="none"
            stroke="#BE185D"
            strokeLinecap="round"
            strokeWidth={s === 4 ? 2 : 1}
            strokeDasharray="3 5"
            animate={{
              opacity: s === 4 ? 0.9 : 0.25,
              strokeDashoffset: s === 4 && !reduce ? [0, -16] : 0,
            }}
            transition={{
              opacity: { duration: 0.4 },
              strokeDashoffset: { duration: 1.2, repeat: Infinity, ease: "linear" },
            }}
          />
        ))}

        {/* الثديان */}
        {BREASTS.map((b, i) => (
          <g key={b.label}>
            <motion.ellipse
              cx={b.cx}
              cy={b.cy}
              rx="40"
              ry="44"
              fill={`url(#${id}-breast)`}
              stroke="#F472B6"
              strokeOpacity="0.55"
              strokeWidth="1.5"
              style={center}
              animate={{
                opacity: s >= 1 ? 1 : 0.6,
                scale: s === 1 && !reduce ? [1, 1.05, 1] : 1,
              }}
              transition={{
                duration: 1.8,
                repeat: s === 1 && !reduce ? Infinity : 0,
                delay: b.delay,
                ease: "easeInOut",
              }}
            />
            {/* الهالة والحلمة */}
            <circle cx={b.cx} cy={b.cy} r="13" fill="#F472B6" fillOpacity="0.45" />
            <motion.circle
              cx={b.cx}
              cy={b.cy}
              r="6"
              fill="#DB2777"
              style={center}
              animate={{ scale: s === 2 && !reduce ? [1, 1.5, 1] : 1 }}
              transition={{
                duration: 1.2,
                repeat: s === 2 && !reduce ? Infinity : 0,
                delay: b.delay,
              }}
              filter={s === 2 ? `url(#${id}-glow)` : undefined}
            />
            <ellipse cx={b.cx - 14} cy={b.cy - 18} rx="8" ry="4" fill="white" fillOpacity="0.35" transform={`rotate(-30 ${b.cx - 14} ${b.cy - 18})`} />

            {/* موجات الحلمة (الخطوة 2) */}
            {s === 2 &&
              !reduce &&
              [0, 0.6].map((d) => (
                <motion.circle
                  key={d}
                  cx={b.cx}
                  cy={b.cy}
                  r="8"
                  fill="none"
                  stroke="#DB2777"
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                  style={center}
                  initial={{ scale: 1, opacity: 0.7 }}
                  animate={{ scale: 3.2, opacity: 0 }}
                  transition={{ duration: 1.8, repeat: Infinity, delay: b.delay + d, ease: "easeOut" }}
                />
              ))}

            {/* الفحص الدائري: حلزون وأصابع ثلاثة (الخطوة 3) */}
            <AnimatePresence>
              {s === 3 && (
                <motion.g
                  key={`spiral-${i}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.path
                    d={toPath(SPIRALS[i])}
                    fill="none"
                    stroke="#DB2777"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeDasharray="4 4"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{
                      duration: 3.6,
                      repeat: reduce ? 0 : Infinity,
                      repeatDelay: 0.4,
                      delay: b.delay,
                      ease: "linear",
                    }}
                  />
                  {!reduce &&
                    [0, 1, 2].map((k) => (
                      <motion.circle
                        key={k}
                        r={5 - k}
                        fill="#BE185D"
                        fillOpacity={1 - k * 0.3}
                        initial={{ cx: SPIRALS[i][0].x, cy: SPIRALS[i][0].y }}
                        animate={{
                          cx: SPIRALS[i].map((p) => p.x),
                          cy: SPIRALS[i].map((p) => p.y),
                        }}
                        transition={{
                          duration: 3.6,
                          repeat: Infinity,
                          repeatDelay: 0.4,
                          delay: b.delay + k * 0.09,
                          ease: "linear",
                        }}
                      />
                    ))}
                </motion.g>
              )}
            </AnimatePresence>

            <text
              x={b.cx}
              y="246"
              textAnchor="middle"
              fontSize="9"
              fontWeight="600"
              fill="#9D174D"
              fillOpacity={s >= 1 && s <= 3 ? 1 : 0.55}
            >
              {b.label}
            </text>
          </g>
        ))}

        {/* الغدد الليمفاوية (الخطوة 4) */}
        {NODES.map((n, i) => (
          <g key={i}>
            {s === 4 && !reduce && (
              <motion.circle
                cx={n.x}
                cy={n.y}
                r="6"
                fill="none"
                stroke="#BE185D"
                strokeWidth="1.5"
                vectorEffect="non-scaling-stroke"
                style={center}
                initial={{ scale: 1, opacity: 0.8 }}
                animate={{ scale: 3, opacity: 0 }}
                transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.25, ease: "easeOut" }}
              />
            )}
            <motion.circle
              cx={n.x}
              cy={n.y}
              r="5"
              fill="#BE185D"
              style={center}
              animate={{
                opacity: s === 4 ? [0.5, 1, 0.5] : 0.45,
                scale: s === 4 && !reduce ? [1, 1.35, 1] : 1,
              }}
              transition={{
                duration: 1.5,
                repeat: s === 4 && !reduce ? Infinity : 0,
                delay: i * 0.2,
              }}
              filter={s === 4 ? `url(#${id}-glow)` : undefined}
            />
          </g>
        ))}
        <AnimatePresence>
          {s === 4 && (
            <motion.g key="lymph-tags" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <text x="42" y="124" textAnchor="middle" fontSize="8" fontWeight="600" fill="#9D174D">الإبط</text>
              <text x="258" y="124" textAnchor="middle" fontSize="8" fontWeight="600" fill="#9D174D">الإبط</text>
              <text x="150" y="68" textAnchor="middle" fontSize="8" fontWeight="600" fill="#9D174D">فوق الترقوة</text>
            </motion.g>
          )}
        </AnimatePresence>

        {/* وضعية الاستلقاء: شعاع مسح (الخطوة 5) */}
        <AnimatePresence>
          {s === 5 && (
            <motion.g
              key="scan"
              clipPath={`url(#${id}-clip)`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.rect
                x="50"
                width="200"
                height="44"
                fill={`url(#${id}-scan)`}
                initial={{ y: 50 }}
                animate={{ y: reduce ? 150 : [50, 300] }}
                transition={{ duration: 2.8, repeat: reduce ? 0 : Infinity, repeatType: "reverse", ease: "easeInOut" }}
              />
            </motion.g>
          )}
        </AnimatePresence>

        <text
          x="150"
          y="356"
          textAnchor="middle"
          fontSize="9"
          fontWeight="600"
          fill="#BE185D"
          fillOpacity={s === 4 ? 1 : 0.5}
        >
          منطقة الغدد الليمفاوية
        </text>
      </svg>

      {/* مؤشر الخطوة الحالية */}
      <div className="absolute left-4 top-4 rounded-full border border-pink-100 bg-white/90 px-3 py-1.5 text-xs font-bold text-pink-600 shadow-lg backdrop-blur">
        خطوة {s} من 5
      </div>

      {/* شرح الخطوة + نقاط التقدم */}
      <div className="mt-2 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={s}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <p className="text-base font-bold text-pink-700">{info.title}</p>
            <p className="mt-0.5 text-sm text-gray-600">{info.hint}</p>
          </motion.div>
        </AnimatePresence>

        <div className="mt-3 flex items-center justify-center gap-1.5" aria-hidden>
          {[1, 2, 3, 4, 5].map((n) => (
            <motion.span
              key={n}
              animate={{ width: n === s ? 22 : 8 }}
              transition={{ duration: 0.3, ease: EASE }}
              className={`h-2 rounded-full ${
                n === s
                  ? "bg-gradient-to-l from-pink-500 to-rose-400"
                  : n < s
                    ? "bg-pink-300"
                    : "bg-pink-100"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
