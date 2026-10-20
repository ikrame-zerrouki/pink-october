"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, RotateCcw } from "lucide-react";

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

export default function ChecklistCard() {
  const [checked, setChecked] = useState<boolean[]>(
    new Array(checklist.length).fill(false)
  );

  const toggle = (i: number) => {
    const next = [...checked];
    next[i] = !next[i];
    setChecked(next);
  };

  const reset = () => setChecked(new Array(checklist.length).fill(false));
  const count = checked.filter(Boolean).length;
  const progress = (count / checklist.length) * 100;

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 border border-pink-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">
            قائمة التحقق الشهرية
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            {count} من {checklist.length} مكتملة
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

      {/* شريط التقدم */}
      <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden mb-6">
        <motion.div
          className="h-full bg-gradient-to-l from-pink-500 to-rose-400 rounded-full"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* القائمة */}
      <ul className="space-y-2">
        {checklist.map((item, i) => (
          <li key={item}>
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
                  checked[i]
                    ? "bg-pink-500 border-pink-500"
                    : "border-gray-300"
                }`}
              >
                {checked[i] && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-white"
                  >
                    <Check className="w-4 h-4" strokeWidth={3} />
                  </motion.span>
                )}
              </span>
              <span
                className={`text-sm leading-relaxed ${
                  checked[i]
                    ? "text-pink-900 line-through"
                    : "text-gray-800"
                }`}
              >
                {item}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {count === checklist.length && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 bg-gradient-to-l from-pink-500 to-rose-500 text-white rounded-2xl p-5 text-center"
        >
          <p className="font-bold text-lg">🎉 أحسنتِ! أكملتِ الفحص بنجاح</p>
          <p className="text-sm opacity-90 mt-1">
            تذكري تكراره الشهر القادم في نفس اليوم
          </p>
        </motion.div>
      )}
    </div>
  );
}