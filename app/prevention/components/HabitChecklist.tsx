"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, RotateCcw, Trophy } from "lucide-react";

const habits = [
  { text: "أكلت 5 حصص خضار/فواكه اليوم", emoji: "🥗" },
  { text: "مارست 30 دقيقة نشاطاً بدنياً", emoji: "🏃‍♀️" },
  { text: "شربت 8 أكواب ماء", emoji: "💧" },
  { text: "نمت 7–8 ساعات", emoji: "😴" },
  { text: "تجنبت التدخين والكحول", emoji: "🚭" },
  { text: "خصصت وقتاً للاسترخاء", emoji: "🧘‍♀️" },
  { text: "تناولت حبوب كاملة", emoji: "🌾" },
  { text: "قللت من السكريات المكررة", emoji: "🍬" },
];

export default function HabitChecklist() {
  const [checked, setChecked] = useState<boolean[]>(
    new Array(habits.length).fill(false)
  );

  const toggle = (i: number) => {
    const next = [...checked];
    next[i] = !next[i];
    setChecked(next);
  };

  const reset = () => setChecked(new Array(habits.length).fill(false));
  const count = checked.filter(Boolean).length;
  const progress = (count / habits.length) * 100;

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 border border-pink-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">تحدي اليوم</h3>
          <p className="text-sm text-gray-600 mt-1">
            {count} من {habits.length} مكتملة
          </p>
        </div>
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 text-sm font-semibold text-pink-600 hover:text-pink-700 bg-pink-50 hover:bg-pink-100 px-4 py-2 rounded-full transition"
        >
          <RotateCcw className="w-4 h-4" />
          إعادة
        </button>
      </div>

      <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden mb-6">
        <motion.div
          className="h-full bg-gradient-to-l from-pink-500 to-rose-400 rounded-full"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      <ul className="space-y-2">
        {habits.map((h, i) => (
          <li key={h.text}>
            <button
              onClick={() => toggle(i)}
              className={`w-full flex items-center gap-3 text-right p-3 rounded-xl transition-all ${
                checked[i]
                  ? "bg-pink-50 border border-pink-200"
                  : "hover:bg-gray-50 border border-transparent"
              }`}
            >
              <span
                className={`flex-shrink-0 w-6 h-6 rounded-md border-2 flex items-center justify-center transition ${
                  checked[i] ? "bg-pink-500 border-pink-500" : "border-gray-300"
                }`}
              >
                {checked[i] && (
                  <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}>
                    <Check className="w-4 h-4 text-white" strokeWidth={3} />
                  </motion.span>
                )}
              </span>
              <span className="text-xl">{h.emoji}</span>
              <span
                className={`text-sm leading-relaxed ${
                  checked[i] ? "text-pink-900 line-through" : "text-gray-800"
                }`}
              >
                {h.text}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {count === habits.length && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 bg-gradient-to-l from-amber-500 to-yellow-400 text-white rounded-2xl p-5 text-center"
        >
          <Trophy className="w-8 h-8 mx-auto mb-2" />
          <p className="font-bold text-lg">🏆 يوم مثالي!</p>
          <p className="text-sm opacity-90 mt-1">
            استمري على هذه العادات يومياً
          </p>
        </motion.div>
      )}
    </div>
  );
}
