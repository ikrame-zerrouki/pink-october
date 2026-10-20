"use client";

import { Fragment, useEffect, useId, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, ArrowLeft, Play, Pause, RotateCcw, Check, Sparkles } from "lucide-react";
import BodyDiagram from "./bodyDiagram";

export const STEPS = [
  {
    id: 1,
    title: "أمام المرآة",
    duration: 60,
    emoji: "🪞",
    short: "انظري بعينين فاحصتين",
    description:
      "قفي أمام المرآة وكتفاك مستقيمان، افحصي ثدييك بصرياً: هل هناك تغير في الحجم أو الشكل أو الجلد؟",
    tips: [
      "ارفعي ذراعيكِ فوق رأسكِ ولاحظي أي تغير",
      "ضعي يديكِ على وركيكِ واضغطي قليلاً",
      "انظري للحلمات: هل انقلبت للداخل؟",
    ],
  },
  {
    id: 2,
    title: "فحص الحلمة",
    duration: 30,
    emoji: "🎯",
    short: "افحصي الحلمة بعناية",
    description:
      "اضغطي بلطف على الحلمة بين إصبعيكِ السبابة والإبهام، وتحققّي من عدم وجود إفرازات غير طبيعية.",
    tips: [
      "الإفرازات الطبيعية شفافة أو حليبية",
      "الإفرازات الدموية أو الصفراء تحتاج لطبيب",
      "لاحظي أي تشقق أو تقرح مستمر",
    ],
  },
  {
    id: 3,
    title: "الفحص الدائري",
    duration: 120,
    emoji: "🌀",
    short: "حركات دائرية من الخارج للداخل",
    description:
      "استخدمي أطراف أصابعكِ الثلاثة الوسطى، وابدئي من الجزء الخارجي للثدي بحركة دائرية صغيرة حتى تصلين للحلمة.",
    tips: [
      "استخدمي نفس المنهجية كل شهر",
      "اضغطي بثلاث درجات: خفيف، متوسط، عميق",
      "غطّي الثدي بالكامل دون تجاهل أي منطقة",
    ],
  },
  {
    id: 4,
    title: "منطقة الإبط",
    duration: 60,
    emoji: "🫱",
    short: "لا تنسي الغدد الليمفاوية",
    description:
      "افحصي المنطقة بين الثدي والإبط، ثم الإبط نفسه، بحثاً عن أي كتل أو تورم غير طبيعي.",
    tips: [
      "الغدد الليمفاوية الطبيعية صغيرة وغير محسوسة",
      "أي تورم مستمر يستدعي الطبيب",
      "افحصي أيضاً فوق عظمة الترقوة",
    ],
  },
  {
    id: 5,
    title: "وضعية الاستلقاء",
    duration: 90,
    emoji: "🛏️",
    short: "فحص أكثر دقة",
    description:
      "استلقي على ظهركِ مع وضع وسادة صغيرة تحت كتفكِ، وضعي ذراعكِ خلف رأسكِ، وكرري الفحص الدائري.",
    tips: [
      "هذه الوضعية تتيح فحصاً أعمق للأنسجة",
      "بدّلي الذراع لكل ثدي",
      "استخدمي يدكِ اليمنى لفحص الثدي الأيسر والعكس",
    ],
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;
const R = 52;
const C = 2 * Math.PI * R;

const humanTime = (s: number) =>
  s === 60 ? "دقيقة" : s === 120 ? "دقيقتان" : s === 90 ? "دقيقة ونصف" : s < 60 ? `${s} ثانية` : `${Math.round(s / 60)} دقائق`;

export default function StepCarousel() {
  const reduce = !!useReducedMotion();
  const uid = useId().replace(/:/g, "");
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);
  const [timeLeft, setTimeLeft] = useState(STEPS[0].duration);
  const [running, setRunning] = useState(false);
  const [completed, setCompleted] = useState<boolean[]>(STEPS.map(() => false));

  const current = STEPS[active];
  const finished = timeLeft <= 0;
  const isLast = active === STEPS.length - 1;

  useEffect(() => {
    setTimeLeft(current.duration);
    setRunning(false);
  }, [active, current.duration]);

  useEffect(() => {
    if (!running) return;
    if (timeLeft <= 0) {
      setRunning(false);
      setCompleted((c) => {
        const n = [...c];
        n[active] = true;
        return n;
      });
      return;
    }
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [running, timeLeft, active]);

  const progress = (current.duration - timeLeft) / current.duration;
  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;

  const goTo = (i: number) => {
    if (i === active || i < 0 || i >= STEPS.length) return;
    setDir(i > active ? 1 : -1);
    setActive(i);
  };
  const next = () => goTo(active + 1);
  const prev = () => goTo(active - 1);
  const reset = () => {
    setTimeLeft(current.duration);
    setRunning(false);
  };
  const toggleTimer = () => {
    if (finished) {
      reset();
      setRunning(true);
    } else {
      setRunning((r) => !r);
    }
  };

  // في الاتجاه من اليمين لليسار: ← التالي، → السابق
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") next();
    else if (e.key === "ArrowRight") prev();
  };

  const slide: Variants = {
    enter: (d: number) => ({ opacity: 0, x: reduce ? 0 : -d * 40 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: reduce ? 0 : d * 40 }),
  };

  const status = finished
    ? "انتهى الوقت — أحسنتِ!"
    : running
      ? "جارٍ العدّ… تابعي الخطوة"
      : progress > 0
        ? "متوقف مؤقتاً"
        : "جاهزة عندما تكونين";

  return (
    <div onKeyDown={onKeyDown} className="grid items-start gap-10 lg:grid-cols-2">
      {/* ===== الرسم + المؤقت ===== */}
      <div className="lg:sticky lg:top-24">
        <BodyDiagram step={current.id} />

        {/* المؤقت الدائري */}
        <div className="relative mt-6 overflow-hidden rounded-3xl bg-gradient-to-br from-pink-300 via-rose-200 to-pink-100 p-px shadow-xl shadow-pink-200/50">
          <div className="relative flex items-center gap-6 rounded-[23px] bg-white p-6">
            <span aria-hidden className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-pink-200/40 blur-3xl" />

            <div className="relative h-32 w-32 flex-shrink-0 md:h-36 md:w-36">
              {running && !reduce && (
                <motion.span
                  aria-hidden
                  className="absolute inset-2 rounded-full bg-pink-300/40 blur-xl"
                  animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              )}
              <svg viewBox="0 0 120 120" className="relative h-full w-full -rotate-90" aria-hidden>
                <defs>
                  <linearGradient id={`${uid}-ring`} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#ec4899" />
                    <stop offset="100%" stopColor="#fb7185" />
                  </linearGradient>
                </defs>
                <circle cx="60" cy="60" r={R} fill="none" stroke="#fce7f3" strokeWidth="8" />
                <circle
                  cx="60"
                  cy="60"
                  r={R}
                  fill="none"
                  stroke={`url(#${uid}-ring)`}
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={C}
                  strokeDashoffset={C * (1 - progress)}
                  className="transition-[stroke-dashoffset] duration-1000 ease-linear"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                {finished ? (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-rose-500 text-white shadow-lg"
                  >
                    <Check className="h-7 w-7" strokeWidth={3} />
                  </motion.span>
                ) : (
                  <>
                    <span className="text-3xl font-bold tabular-nums text-gray-900 md:text-4xl">
                      {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-pink-600">
                      وقت الخطوة
                    </span>
                  </>
                )}
              </div>
            </div>

            <div className="relative flex-1">
              <p className="mb-1 text-xs font-bold uppercase tracking-widest text-pink-600">
                {current.title}
              </p>
              <p aria-live="polite" className="mb-4 text-sm font-medium text-gray-600">
                {status}
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={toggleTimer}
                  aria-label={running ? "إيقاف مؤقت" : "تشغيل"}
                  className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-300/60 transition hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-pink-300"
                >
                  {running ? <Pause className="h-6 w-6" /> : <Play className="ml-0.5 h-6 w-6" />}
                </button>
                <button
                  type="button"
                  onClick={reset}
                  aria-label="إعادة"
                  className="group flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition hover:bg-gray-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-pink-200"
                >
                  <RotateCcw className="h-5 w-5 transition-transform duration-500 group-hover:-rotate-180" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== المحتوى ===== */}
      <div>
        {/* مسار الخطوات */}
        <div role="tablist" aria-label="خطوات الفحص" className="mb-7 flex items-start">
          {STEPS.map((s, i) => {
            const isActive = i === active;
            const isDone = completed[i] || i < active;
            return (
              <Fragment key={s.id}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`الخطوة ${s.id}: ${s.title}`}
                  onClick={() => goTo(i)}
                  className="group flex flex-col items-center gap-1.5 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
                >
                  <span
                    className={`relative flex h-12 w-12 items-center justify-center rounded-full text-xl transition-all duration-300 ${
                      isActive
                        ? "scale-110 bg-gradient-to-br from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-300/60"
                        : isDone
                          ? "bg-pink-100 text-pink-600"
                          : "border-2 border-gray-200 bg-white text-gray-400 group-hover:border-pink-300"
                    }`}
                  >
                    {isActive && running && !reduce && (
                      <span className="absolute inset-0 animate-ping rounded-full bg-pink-400/30" />
                    )}
                    {isDone && !isActive ? <Check className="h-5 w-5" strokeWidth={3} /> : <span>{s.emoji}</span>}
                  </span>
                  <span
                    className={`hidden max-w-[5.5rem] text-center text-[11px] font-semibold leading-tight md:block ${
                      isActive ? "text-pink-700" : "text-gray-500"
                    }`}
                  >
                    {s.title}
                  </span>
                </button>

                {i < STEPS.length - 1 && (
                  <span className="mx-1 mt-6 h-0.5 flex-1 overflow-hidden rounded-full bg-gray-200">
                    <motion.span
                      initial={false}
                      animate={{ scaleX: i < active ? 1 : 0 }}
                      transition={{ duration: 0.5, ease: EASE }}
                      className="block h-full origin-right bg-gradient-to-l from-pink-500 to-rose-400"
                    />
                  </span>
                )}
              </Fragment>
            );
          })}
        </div>

        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={current.id}
            custom={dir}
            variants={slide}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: EASE }}
          >
            <div className="rounded-3xl bg-gradient-to-br from-pink-300 via-rose-200 to-pink-100 p-px shadow-2xl shadow-pink-200/50">
              <div className="relative overflow-hidden rounded-[23px] bg-white p-8 md:p-10">
                <span aria-hidden className="absolute -left-12 -top-12 h-44 w-44 rounded-full bg-pink-200/40 blur-3xl" />
                <span
                  aria-hidden
                  className="pointer-events-none absolute -bottom-6 left-4 select-none text-9xl font-black leading-none text-pink-50"
                >
                  0{current.id}
                </span>

                <div className="relative">
                  <div className="mb-6 flex items-center gap-5">
                    <motion.div
                      animate={reduce ? undefined : { y: [0, -6, 0], rotate: [0, -4, 4, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-3xl bg-gradient-to-br from-pink-100 to-rose-100 text-5xl shadow-inner"
                    >
                      {current.emoji}
                    </motion.div>
                    <div>
                      <div className="mb-1.5 flex flex-wrap items-center gap-2">
                        <span className="text-xs font-bold uppercase tracking-widest text-pink-600">
                          الخطوة {current.id} من {STEPS.length}
                        </span>
                        <span className="rounded-full bg-pink-50 px-2.5 py-0.5 text-[11px] font-bold text-pink-700">
                          ⏱ {humanTime(current.duration)}
                        </span>
                      </div>
                      <h3 className="text-3xl font-bold text-gray-900">{current.title}</h3>
                      <p className="mt-1 text-sm font-medium text-rose-500">{current.short}</p>
                    </div>
                  </div>

                  <p className="mb-6 border-r-4 border-pink-300 pr-4 text-lg leading-relaxed text-gray-700">
                    {current.description}
                  </p>

                  <div className="mb-8 rounded-2xl bg-pink-50/60 p-5">
                    <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-pink-700">
                      <Sparkles className="h-4 w-4" />
                      نصائح مهمة
                    </p>
                    <motion.ul
                      initial="hidden"
                      animate="show"
                      variants={{ hidden: {}, show: { transition: { staggerChildren: reduce ? 0 : 0.09, delayChildren: 0.15 } } }}
                      className="space-y-2.5"
                    >
                      {current.tips.map((tip, k) => (
                        <motion.li
                          key={tip}
                          variants={{
                            hidden: { opacity: 0, x: reduce ? 0 : 16 },
                            show: { opacity: 1, x: 0 },
                          }}
                          transition={{ duration: 0.4, ease: EASE }}
                          className="flex items-start gap-3 rounded-xl bg-white/80 p-3 text-gray-800 shadow-sm"
                        >
                          <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-rose-500 text-xs font-bold text-white">
                            {k + 1}
                          </span>
                          <span className="leading-relaxed">{tip}</span>
                        </motion.li>
                      ))}
                    </motion.ul>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={prev}
                      disabled={active === 0}
                      className="group inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-gray-100 py-3.5 font-bold text-gray-800 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-pink-200"
                    >
                      <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                      السابق
                    </button>

                    {isLast ? (
                      <a
                        href="#checklist"
                        className="group relative inline-flex flex-1 items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-l from-pink-500 to-rose-500 py-3.5 font-bold text-white shadow-lg shadow-pink-300/60 transition hover:from-pink-600 hover:to-rose-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-pink-300"
                      >
                        <span
                          aria-hidden
                          className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                        />
                        <span className="relative">إنهاء — قائمة التحقق</span>
                        <Check className="relative h-5 w-5" strokeWidth={3} />
                      </a>
                    ) : (
                      <button
                        type="button"
                        onClick={next}
                        className={`group relative inline-flex flex-1 items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-l from-pink-500 to-rose-500 py-3.5 font-bold text-white shadow-lg shadow-pink-300/60 transition hover:from-pink-600 hover:to-rose-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-pink-300 ${
                          finished && !reduce ? "animate-pulse" : ""
                        }`}
                      >
                        <span
                          aria-hidden
                          className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                        />
                        <span className="relative">التالي</span>
                        <ArrowLeft className="relative h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
