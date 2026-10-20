"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { RotateCcw } from "lucide-react";

const checklist = [
  "قفي أمام المرآة وكتفاكِ مستقيمان",
  "ارفعي ذراعيكِ فوق رأسكِ ولاحظي أي تغير",
  "ضعي يديكِ على وركيكِ واضغطي قليلاً",
  "افحصي الحلمة بحثاً عن إفرازات",
  "استخدمي 3 أصابع للفحص الدائري",
  "غطّي الثدي بالكامل من الخارج للداخل",
  "افحصي منطقة الإبط والغدد الليمفاوية",
  "كرري الفحص في وضعية الاستلقاء",
  "دوّني أي تغير تجدينه",
  "حددي موعد الشهر القادم",
];

const EASE = [0.22, 1, 0.36, 1] as const;

/* قصاصات احتفال بمواضع ثابتة */
const CONFETTI = Array.from({ length: 16 }, (_, i) => {
  const angle = (i * 360) / 16;
  const dist = 80 + (i % 3) * 28;
  return {
    x: Math.round(Math.cos((angle * Math.PI) / 180) * dist),
    y: Math.round(Math.sin((angle * Math.PI) / 180) * dist) - 20,
    size: 6 + (i % 3) * 3,
    color: ["#fbcfe8", "#f9a8d4", "#fda4af", "#ffffff"][i % 4],
    round: i % 2 === 0,
  };
});

export default function ChecklistCard() {
  const reduce = !!useReducedMotion();
  const total = checklist.length;
  const [checked, setChecked] = useState<boolean[]>(new Array(total).fill(false));

  const toggle = (i: number) => {
    const next = [...checked];
    next[i] = !next[i];
    setChecked(next);
  };

  const reset = () => setChecked(new Array(total).fill(false));
  const count = checked.filter(Boolean).length;
  const progress = Math.round((count / total) * 100);

  const message =
    count === 0
      ? "ابدئي بالخطوة الأولى"
      : count === total
        ? "أكملتِ كل الخطوات"
        : count <= total * 0.3
          ? "بداية جميلة"
          : count <= total * 0.6
            ? "تقدّم رائع، واصلي"
            : "اقتربتِ من النهاية";

  return (
    <div className="relative rounded-3xl bg-gradient-to-br from-pink-300 via-rose-200 to-pink-100 p-px shadow-xl shadow-pink-200/50">
      <div className="relative rounded-[23px] bg-white p-6 md:p-8">
        {/* توهجات داخل إطار مقصوص */}
        <div aria-hidden className="absolute inset-0 overflow-hidden rounded-[23px]">
          <span className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-pink-200/40 blur-3xl" />
          <span className="absolute -bottom-20 -left-16 h-52 w-52 rounded-full bg-rose-200/30 blur-3xl" />
        </div>

        <div className="relative">
          {/* الرأس */}
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">قائمة التحقق الشهرية</h3>
              <p className="mt-1 text-sm text-gray-600">
                {count} من {total} مكتملة
                <span className="mx-2 text-gray-300">•</span>
                <span className="font-semibold text-pink-600">{message}</span>
              </p>
            </div>

            <div className="flex flex-shrink-0 items-center gap-3">
              <span
                className="bg-gradient-to-br from-pink-600 to-rose-400 bg-clip-text text-3xl font-extrabold tabular-nums text-transparent"
                aria-hidden
              >
                {progress}%
              </span>
              <motion.button
                type="button"
                onClick={reset}
                whileTap={reduce ? undefined : { scale: 0.94 }}
                className="group inline-flex items-center gap-2 rounded-full bg-pink-50 px-4 py-2 text-sm font-semibold text-pink-600 transition hover:bg-pink-100 hover:text-pink-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
              >
                <RotateCcw className="h-4 w-4 transition-transform duration-500 group-hover:-rotate-180" />
                إعادة
              </motion.button>
            </div>
          </div>

          {/* شريط تقدم مقسّم: خانة لكل خطوة */}
          <div
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={total}
            aria-valuenow={count}
            aria-label="تقدم قائمة التحقق"
            className="mb-7 flex gap-1.5"
          >
            {checklist.map((_, i) => (
              <span key={i} className="h-2.5 flex-1 overflow-hidden rounded-full bg-gray-100">
                <motion.span
                  initial={false}
                  animate={{ scaleX: i < count ? 1 : 0 }}
                  transition={{ duration: 0.35, delay: reduce ? 0 : i * 0.03, ease: EASE }}
                  className="block h-full origin-right rounded-full bg-gradient-to-l from-pink-500 to-rose-400"
                />
              </span>
            ))}
          </div>

          {/* القائمة */}
          <ul className="space-y-2">
            {checklist.map((item, i) => {
              const done = checked[i];
              return (
                <li key={item}>
                  <motion.button
                    type="button"
                    aria-pressed={done}
                    onClick={() => toggle(i)}
                    whileTap={reduce ? undefined : { scale: 0.985 }}
                    className={`group relative flex w-full items-center gap-3.5 overflow-hidden rounded-2xl border p-3.5 text-right transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 ${
                      done
                        ? "border-pink-200 bg-gradient-to-l from-pink-50 to-rose-50 shadow-sm"
                        : "border-transparent hover:border-pink-100 hover:bg-gray-50"
                    }`}
                  >
                    <span
                      aria-hidden
                      className={`absolute inset-y-0 right-0 w-1 bg-gradient-to-b from-pink-400 to-rose-500 transition-transform duration-300 ${
                        done ? "scale-y-100" : "scale-y-0"
                      }`}
                    />

                    <span
                      className={`relative flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl border-2 text-xs font-bold transition-all duration-300 ${
                        done
                          ? "border-transparent bg-gradient-to-br from-pink-500 to-rose-500 text-white shadow-md shadow-pink-300/50"
                          : "border-gray-200 text-gray-400 group-hover:border-pink-300 group-hover:text-pink-500"
                      }`}
                    >
                      {done ? (
                        <motion.svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={3}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-[18px] w-[18px]"
                          initial={{ scale: 0.4, rotate: -20 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: "spring", stiffness: 500, damping: 18 }}
                        >
                          <motion.path
                            d="M5 12.5l4.5 4.5L19 7.5"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.3 }}
                          />
                        </motion.svg>
                      ) : (
                        i + 1
                      )}
                    </span>

                    <span
                      className={`text-sm leading-relaxed transition-colors duration-300 ${
                        done
                          ? "text-pink-900/60 line-through decoration-pink-400/70"
                          : "text-gray-800"
                      }`}
                    >
                      {item}
                    </span>
                  </motion.button>
                </li>
              );
            })}
          </ul>

          {/* رسالة الإكمال مع احتفال */}
          <AnimatePresence>
            {count === total && (
              <motion.div
                key="done"
                initial={{ opacity: 0, y: 14, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="relative mt-6"
              >
                {!reduce &&
                  CONFETTI.map((c, i) => (
                    <motion.span
                      key={i}
                      aria-hidden
                      className="pointer-events-none absolute left-1/2 top-1/2 z-10"
                      style={{
                        width: c.size,
                        height: c.size,
                        background: c.color,
                        borderRadius: c.round ? "9999px" : "2px",
                      }}
                      initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
                      animate={{
                        x: c.x,
                        y: c.y,
                        opacity: [1, 1, 0],
                        scale: [0, 1, 1],
                        rotate: i * 45,
                      }}
                      transition={{ duration: 1.2, delay: i * 0.02, ease: "easeOut" }}
                    />
                  ))}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-l from-pink-500 to-rose-500 p-5 text-center text-white shadow-lg shadow-pink-300/50">
                  <span aria-hidden className="absolute -left-6 -top-6 h-24 w-24 rounded-full bg-white/20 blur-2xl" />
                  <p className="relative text-lg font-bold">🎉 أحسنتِ! أكملتِ الفحص بنجاح</p>
                  <p className="relative mt-1 text-sm opacity-90">
                    تذكري تكراره الشهر القادم في نفس اليوم
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
