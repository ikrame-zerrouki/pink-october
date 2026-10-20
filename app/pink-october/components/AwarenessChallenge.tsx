"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Share2, Sparkles } from "lucide-react";

const challenges = [
  "غيّرتِ صورة بروفايلك لشريط وردي",
  "تحدثتِ مع أمك/أختك/صديقتك عن الفحص الذاتي",
  "علقتِ شريطاً وردياً في مكان بارز",
  "شاركتِ منشوراً توعوياً موثوقاً",
  "قرأتِ مقالاً عن سرطان الثدي",
  "حجزتِ موعد فحص طبي",
  "تبرعتِ لجمعية توعية",
  "حضرتِ فعالية أو ندوة توعية",
];

const D = "font-[family-name:var(--font-display)]";
const FOCUS =
  "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-pink-300";

/* ───────── The flower: one petal per challenge ───────── */
function Bloom({ done }: { done: number[] }) {
  const total = challenges.length;
  const complete = done.length === total;

  return (
    <div className="relative mx-auto w-full max-w-[260px] aspect-square">
      <div
        className={`absolute inset-[-8%] rounded-full transition-opacity duration-700 bg-[radial-gradient(circle,rgba(249,168,212,0.6)_0%,rgba(249,168,212,0)_65%)] ${
          complete ? "opacity-100" : "opacity-40"
        }`}
      />
      <svg viewBox="0 0 240 240" className="relative w-full h-full" aria-hidden>
        <defs>
          <linearGradient id="petal" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#EC4899" />
            <stop offset="100%" stopColor="#F43F5E" />
          </linearGradient>
          <linearGradient id="core" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#9D174D" />
            <stop offset="100%" stopColor="#BE123C" />
          </linearGradient>
        </defs>

        <circle cx="120" cy="120" r="112" fill="none" stroke="#EC4899" strokeOpacity="0.18" strokeDasharray="2 6" />
        {challenges.map((_, i) => {
          const isDone = done.includes(i);
          return (
            <g key={i} transform={`rotate(${i * 45} 120 120)`}>
              {/* empty petal outline */}
              <ellipse cx="120" cy="64" rx="21" ry="42" fill="#FCE7F3" fillOpacity="0.6" stroke="#EC4899" strokeOpacity="0.3" strokeWidth="1.5" />
              {/* filled petal blooms on top */}
              <motion.ellipse
                cx="120"
                cy="64"
                rx="21"
                ry="42"
                fill="url(#petal)"
                style={{ transformBox: "fill-box", transformOrigin: "50% 100%" }}
                initial={false}
                animate={{ scale: isDone ? 1 : 0, opacity: isDone ? 0.95 : 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 16 }}
              />
            </g>
          );
        })}
        <circle cx="120" cy="120" r="30" fill="url(#core)" />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        {complete ? (
          <Sparkles className="w-8 h-8 text-pink-200" aria-hidden />
        ) : (
          <>
            <span className={`${D} text-3xl font-bold leading-none`}>{done.length}</span>
            <span className="text-[11px] text-white/80 mt-1">من {total}</span>
          </>
        )}
      </div>
    </div>
  );
}

export default function AwarenessChallenge() {
  const [done, setDone] = useState<number[]>([]);
  const [shared, setShared] = useState(false);

  const toggle = (i: number) => {
    setDone((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
    );
  };

  const complete = done.length === challenges.length;

  const handleShare = async () => {
    const text = `أكملت ${done.length}/${challenges.length} من تحديات أكتوبر الوردي 🎗️\nهل تجرؤين على التحدي؟`;
    if (navigator.share) {
      try {
        await navigator.share({ title: "تحدي أكتوبر الوردي", text });
      } catch {}
    } else {
      try {
        await navigator.clipboard.writeText(text);
        setShared(true);
        setTimeout(() => setShared(false), 2000);
      } catch {}
    }
  };

  return (
    <div className="bg-white rounded-[2rem] shadow-2xl p-6 md:p-10 border border-pink-100">
      <div className="flex flex-col md:flex-row md:items-start gap-10">
        {/* flower */}
        <div className="md:w-[260px] md:flex-shrink-0 text-center">
          <Bloom done={done} />
          <h3 className={`${D} mt-6 text-3xl font-bold text-gray-900 leading-snug`}>
            تحدي التوعية
          </h3>
          <p className="mt-1 text-sm text-gray-600 leading-relaxed">
            كل تحدٍّ تُنجزينه يفتح بتلة جديدة.
          </p>
        </div>

        {/* list */}
        <div className="flex-1 min-w-0">
          <ul>
            {challenges.map((c, i) => {
              const isDone = done.includes(i);
              return (
                <li key={c} className="border-b border-pink-100 last:border-b-0">
                  <button
                    onClick={() => toggle(i)}
                    aria-pressed={isDone}
                    className={`group w-full flex items-center gap-4 text-start py-4 rounded-xl transition ${FOCUS}`}
                  >
                    <span
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isDone
                          ? "bg-gradient-to-br from-pink-500 to-rose-500 text-white shadow-lg"
                          : "bg-pink-50 ring-1 ring-pink-200 group-hover:ring-pink-400"
                      }`}
                    >
                      {isDone && <Check className="w-4 h-4" strokeWidth={3} aria-hidden />}
                    </span>
                    <span
                      className={`leading-relaxed transition ${
                        isDone
                          ? "text-gray-400 line-through decoration-pink-300"
                          : "text-gray-800"
                      }`}
                    >
                      {c}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <button
            onClick={handleShare}
            className={`mt-8 w-full inline-flex items-center justify-center gap-2 bg-gradient-to-l from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold py-4 rounded-full transition shadow-lg ${FOCUS}`}
          >
            {shared ? (
              <>
                <Check className="w-5 h-5" aria-hidden />
                تم النسخ!
              </>
            ) : (
              <>
                <Share2 className="w-5 h-5" aria-hidden />
                شاركي نتيجتكِ
              </>
            )}
          </button>

          <AnimatePresence>
            {complete && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-5 rounded-2xl bg-gradient-to-br from-rose-900 via-pink-800 to-rose-700 p-5 text-center text-white"
              >
                <p className={`${D} text-2xl font-bold leading-snug`}>
                  اكتملت الزهرة
                </p>
                <p className="mt-1 text-sm text-white/85">
                  أنتِ سفيرة توعية حقيقية.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
