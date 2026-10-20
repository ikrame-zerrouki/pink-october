"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Dumbbell, CheckCircle2 } from "lucide-react";

const options = [
  { label: "لا أمارس رياضة", value: 0, minutes: 0 },
  { label: "قليلاً (أقل من 60 دقيقة أسبوعياً)", value: 1, minutes: 60 },
  { label: "بانتظام (60–150 دقيقة)", value: 2, minutes: 150 },
  { label: "كثيراً (أكثر من 150 دقيقة)", value: 3, minutes: 250 },
];

export default function ExerciseCalculator() {
  const [selected, setSelected] = useState<number | null>(null);

  const getResult = () => {
    if (selected === null) return null;
    const opt = options[selected];
    if (opt.minutes >= 150) {
      return {
        status: "ممتاز",
        color: "from-green-500 to-emerald-500",
        emoji: "🌟",
        title: "استمري! أنتِ في المسار الصحيح",
        desc: "150 دقيقة أسبوعياً هي التوصية المثالية. النشاط المنتظم يقلل خطر سرطان الثدي بنسبة 10–20%.",
        tips: ["نوّعي بين الكارديو والمقاومة", "خصصي 30 دقيقة يومياً", "المشي السريع يكفي"],
      };
    }
    if (opt.minutes >= 60) {
      return {
        status: "جيد",
        color: "from-amber-500 to-orange-400",
        emoji: "💪",
        title: "خطوة إضافية للوصول للهدف",
        desc: "أنتِ قريبة! أضيفي 15 دقيقة يومياً للوصول إلى 150 دقيقة أسبوعياً.",
        tips: ["ابدئي بمشي 15 دقيقة إضافية", "استخدمي الدرج بدلاً من المصعد", "جرّبي تمارين 10 دقائق"],
      };
    }
    return {
      status: "بحاجة للبدء",
      color: "from-purple-500 to-fuchsia-500",
      emoji: "🌱",
      title: "ابدئي بخطوات صغيرة",
      desc: "لا تحتاجين للبدء بقوة — 10 دقائق يومياً كافية للبداية. الأهم هو الاستمرار.",
      tips: ["10 دقائق مشي يومياً", "جرّبي تطبيق تتبع النشاط", "ابدئي بتمارين منزلية بسيطة"],
    };
  };

  const result = getResult();

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 border border-pink-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 text-white flex items-center justify-center shadow-lg">
          <Dumbbell className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">كم تمارسين الرياضة؟</h3>
          <p className="text-sm text-gray-600">اختاري ما يناسبك</p>
        </div>
      </div>

      <div className="space-y-2 mb-6">
        {options.map((opt, i) => (
          <button
            key={opt.label}
            onClick={() => setSelected(i)}
            className={`w-full text-right p-3.5 rounded-xl border-2 transition font-medium text-sm ${
              selected === i
                ? "border-teal-500 bg-teal-50 text-teal-900"
                : "border-gray-200 hover:border-teal-300 hover:bg-teal-50/50 text-gray-800"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`bg-gradient-to-l ${result.color} text-white rounded-2xl p-5`}
        >
          <div className="text-3xl mb-2">{result.emoji}</div>
          <p className="text-xs uppercase tracking-widest opacity-80 font-bold mb-1">
            {result.status}
          </p>
          <h4 className="text-lg font-bold mb-2">{result.title}</h4>
          <p className="text-sm opacity-95 leading-relaxed mb-3">{result.desc}</p>
          <ul className="space-y-1">
            {result.tips.map((tip) => (
              <li key={tip} className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5 opacity-80" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
}