"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Play, Pause, RotateCcw } from "lucide-react";
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

export default function StepCarousel() {
  const [active, setActive] = useState(0);
  const [timeLeft, setTimeLeft] = useState(STEPS[0].duration);
  const [running, setRunning] = useState(false);

  const current = STEPS[active];

  useEffect(() => {
    setTimeLeft(current.duration);
    setRunning(false);
  }, [active, current.duration]);

  useEffect(() => {
    if (!running) return;
    if (timeLeft <= 0) {
      setRunning(false);
      return;
    }
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [running, timeLeft]);

  const progress = ((current.duration - timeLeft) / current.duration) * 100;
  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;

  const next = () => setActive((a) => Math.min(a + 1, STEPS.length - 1));
  const prev = () => setActive((a) => Math.max(a - 1, 0));
  const reset = () => {
    setTimeLeft(current.duration);
    setRunning(false);
  };

  return (
    <div className="grid lg:grid-cols-2 gap-10 items-start">
      {/* ===== الرسم ===== */}
      <div className="lg:sticky lg:top-24">
        <BodyDiagram step={current.id} />

        {/* المؤقت */}
        <div className="mt-6 bg-white rounded-2xl shadow-xl p-6 border border-pink-100">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-pink-600 font-bold">
                وقت الخطوة
              </p>
              <p className="text-4xl font-bold text-gray-900 tabular-nums">
                {String(mins).padStart(2, "0")}:
                {String(secs).padStart(2, "0")}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setRunning(!running)}
                className="w-12 h-12 rounded-full bg-pink-500 hover:bg-pink-600 text-white flex items-center justify-center transition shadow-lg"
                aria-label={running ? "إيقاف" : "تشغيل"}
              >
                {running ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5 ml-0.5" />
                )}
              </button>
              <button
                onClick={reset}
                className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition"
                aria-label="إعادة"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-l from-pink-500 to-rose-400 rounded-full"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>

      {/* ===== المحتوى ===== */}
      <div>
        {/* المؤشرات */}
        <div className="flex gap-2 mb-6">
          {STEPS.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setActive(i)}
              className={`flex-1 h-2 rounded-full transition-all ${
                i <= active
                  ? "bg-gradient-to-l from-pink-500 to-rose-400"
                  : "bg-gray-200"
              }`}
              aria-label={`الخطوة ${s.id}`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4 }}
          >
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-pink-100">
              <div className="flex items-center gap-4 mb-6">
                <div className="text-5xl">{current.emoji}</div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-pink-600 font-bold mb-1">
                    الخطوة {current.id} من {STEPS.length}
                  </p>
                  <h3 className="text-3xl font-bold text-gray-900">
                    {current.title}
                  </h3>
                </div>
              </div>

              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                {current.description}
              </p>

              <div className="bg-pink-50/60 rounded-2xl p-5 mb-8">
                <p className="text-xs uppercase tracking-widest text-pink-700 font-bold mb-3">
                  نصائح مهمة
                </p>
                <ul className="space-y-2">
                  {current.tips.map((tip) => (
                    <li
                      key={tip}
                      className="flex items-start gap-2 text-gray-800"
                    >
                      <span className="text-pink-500 mt-1">✦</span>
                      <span className="leading-relaxed">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={prev}
                  disabled={active === 0}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed text-gray-800 font-bold py-3.5 rounded-xl transition"
                >
                  <ArrowRight className="w-5 h-5" />
                  السابق
                </button>
                <button
                  onClick={next}
                  disabled={active === STEPS.length - 1}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-l from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl transition shadow-lg"
                >
                  التالي
                  <ArrowLeft className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}