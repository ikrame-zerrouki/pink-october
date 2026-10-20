"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, Sparkles } from "lucide-react";

/* ============ الأسئلة ============ */
const questions = [
  {
    id: "age",
    q: "كم عمركِ؟",
    options: [
      { label: "أقل من 30", value: "under30" },
      { label: "30 – 39", value: "30s" },
      { label: "40 – 49", value: "40s" },
      { label: "50 سنة أو أكثر", value: "50plus" },
    ],
  },
  {
    id: "family",
    q: "هل يوجد تاريخ عائلي لسرطان الثدي؟",
    options: [
      { label: "لا، لا يوجد", value: "no" },
      { label: "نعم (الأم أو الأخت أو الجدة)", value: "yes" },
      { label: "لست متأكدة", value: "notsure" },
    ],
  },
  {
    id: "symptoms",
    q: "هل لاحظتِ أي تغير في الثدي مؤخراً؟",
    options: [
      { label: "لا، لا يوجد", value: "no" },
      { label: "نعم، كتلة أو تغير", value: "yes" },
      { label: "لست متأكدة", value: "notsure" },
    ],
  },
];

/* ============ منطق النتيجة ============ */
type Result = {
  level: string;
  color: string;
  emoji: string;
  title: string;
  desc: string;
  recommendations: string[];
};

function getResult(answers: Record<string, string>): Result {
  if (answers.symptoms === "yes") {
    return {
      level: "عاجل",
      color: "from-red-500 to-rose-500",
      emoji: "⚡",
      title: "استشيري طبيباً في أقرب وقت",
      desc: "أي تغير مستمر في الثدي يستدعي فحصاً طبياً — لا تنتظري الدورة القادمة. غالباً ما تكون التغيرات حميدة، لكن الفحص ضروري للاطمئنان.",
      recommendations: [
        "احجزي موعداً مع طبيب/طبيبة مختصة",
        "قد يطلب الطبيب موجات فوق صوتية",
        "لا تقلقي — 80% من الكتل حميدة",
      ],
    };
  }

  if (answers.family === "yes" && answers.age !== "50plus") {
    return {
      level: "مبكر",
      color: "from-purple-500 to-fuchsia-500",
      emoji: "🧬",
      title: "استشيري الطبيب حول الفحص المبكر",
      desc: "مع وجود تاريخ عائلي، ينصح بعض الأطباء بالبدء مبكراً (قبل 40) أو بإجراء فحوصات إضافية مثل الرنين المغناطيسي.",
      recommendations: [
        "استشيري طبيباً حول تاريخ البدء",
        "قد يُنصح بالرنين المغناطيسي",
        "استشارة الوراثة قد تكون مفيدة",
      ],
    };
  }

  const ageMap: Record<string, Result> = {
    under30: {
      level: "روتيني",
      color: "from-teal-500 to-cyan-500",
      emoji: "🌱",
      title: "الفحص الذاتي + الفحص السريري",
      desc: "في هذا العمر، الفحص الذاتي الشهري والفحص السريري كل 3 سنوات هما الأساس. الماموجرام الروتيني غير مطلوب عادة.",
      recommendations: [
        "الفحص الذاتي شهرياً",
        "فحص سريري كل 3 سنوات",
        "استشارة الطبيب عند أي تغير",
      ],
    },
    "30s": {
      level: "منتظم",
      color: "from-pink-500 to-rose-500",
      emoji: "🌸",
      title: "استمري بالفحص الذاتي + السريري",
      desc: "في الثلاثينيات، الاستمرارية هي الأهم. الفحص الذاتي الشهري + السريري كل 1–3 سنوات.",
      recommendations: [
        "الفحص الذاتي شهرياً",
        "فحص سريري كل 1–3 سنوات",
        "الموجات فوق الصوتية عند الحاجة",
      ],
    },
    "40s": {
      level: "هام",
      color: "from-purple-500 to-fuchsia-500",
      emoji: "🌺",
      title: "وقت البدء بالماموجرام",
      desc: "أغلب الجمعيات الطبية توصي بالبدء في سن 40، كل 1–2 سنة. الفحص المبكر يرفع فرص النجاح.",
      recommendations: [
        "ماموجرام كل 1–2 سنة",
        "فحص سريري سنوي",
        "استمري بالفحص الذاتي",
      ],
    },
    "50plus": {
      level: "ضروري",
      color: "from-rose-500 to-orange-400",
      emoji: "🌷",
      title: "استمري بالماموجرام بانتظام",
      desc: "الخطر يزيد مع العمر، والاستمرارية في الفحص هي الأهم. لا تتوقفي حتى لو كنتِ بصحة جيدة.",
      recommendations: [
        "ماموجرام كل 1–2 سنة",
        "فحص سريري سنوي",
        "مناقشة الفحوصات الإضافية",
      ],
    },
  };

  return ageMap[answers.age] || ageMap["30s"];
}

/* ============ المكون الرئيسي ============ */
export default function StartCalculator() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);

  const current = questions[step];
  const progress = showResult
    ? 100
    : ((step + 1) / questions.length) * 100;

  const select = (value: string) => {
    const next = { ...answers, [current.id]: value };
    setAnswers(next);
    if (step < questions.length - 1) {
      setTimeout(() => setStep(step + 1), 250);
    } else {
      setTimeout(() => setShowResult(true), 250);
    }
  };

  const reset = () => {
    setAnswers({});
    setStep(0);
    setShowResult(false);
  };

  const result = getResult(answers);

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-pink-100 max-w-2xl mx-auto">
      {/* شريط التقدم */}
      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-8">
        <motion.div
          className="h-full bg-gradient-to-l from-pink-500 to-rose-400 rounded-full"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      <AnimatePresence mode="wait">
        {!showResult ? (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-xs uppercase tracking-widest text-pink-600 font-bold mb-2">
              سؤال {step + 1} من {questions.length}
            </p>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              {current.q}
            </h3>
            <div className="space-y-3">
              {current.options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => select(opt.value)}
                  className={`w-full text-right p-4 rounded-xl border-2 transition font-medium ${
                    answers[current.id] === opt.value
                      ? "border-pink-500 bg-pink-50 text-pink-900"
                      : "border-gray-200 hover:border-pink-300 hover:bg-pink-50/50 text-gray-800"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div
              className={`bg-gradient-to-l ${result.color} text-white rounded-2xl p-6 mb-6`}
            >
              <div className="text-5xl mb-3">{result.emoji}</div>
              <p className="text-xs uppercase tracking-widest opacity-80 font-bold mb-1">
                التوصية
              </p>
              <h3 className="text-2xl font-bold mb-3">{result.title}</h3>
              <p className="opacity-95 leading-relaxed text-sm">
                {result.desc}
              </p>
            </div>

            <div className="bg-pink-50/50 rounded-2xl p-5 mb-6">
              <p className="text-xs uppercase tracking-widest text-pink-600 font-bold mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                الخطوات المقترحة
              </p>
              <ul className="space-y-2">
                {result.recommendations.map((r) => (
                  <li
                    key={r}
                    className="flex items-start gap-2 text-sm text-gray-800"
                  >
                    <span className="text-pink-500 font-bold mt-0.5">✓</span>
                    <span className="leading-relaxed">{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={reset}
              className="w-full inline-flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3.5 rounded-xl transition"
            >
              <RotateCcw className="w-5 h-5" />
              إعادة الحاسبة
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* تنبيه */}
      <p className="text-xs text-center text-gray-500 mt-6 leading-relaxed">
        ⚕️ هذه الحاسبة إرشادية فقط ولا تغني عن استشارة الطبيب.
      </p>
    </div>
  );
}