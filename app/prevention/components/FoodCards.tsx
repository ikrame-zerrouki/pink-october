"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const goodFoods = [
  { emoji: "🥦", name: "الخضار الورقية", desc: "بروكلي، سبانخ، كرنب — غنية بمضادات الأكسدة." },
  { emoji: "🍓", name: "الفواكه الملونة", desc: "توت، رمان، فراولة — فيتامينات ومعادن." },
  { emoji: "🌾", name: "الحبوب الكاملة", desc: "شوفان، قمح كامل، أرز بني — ألياف عالية." },
  { emoji: "🐟", name: "الأسماك الدهنية", desc: "سلمون، سردين — أوميغا 3." },
  { emoji: "🫘", name: "البقوليات", desc: "عدس، حمص، فاصوليا — بروتين نباتي." },
  { emoji: "🥜", name: "المكسرات", desc: "لوز، جوز — دهون صحية." },
];

const avoidFoods = [
  { emoji: "🥓", name: "اللحوم المصنعة", desc: "نقانق، لانشون — مرتبطة بزيادة الخطر." },
  { emoji: "🍟", name: "الأطعمة المقلية", desc: "دهون متحولة ترفع الالتهاب." },
  { emoji: "🍰", name: "السكريات المكررة", desc: "حلويات ومشروبات غازية." },
  { emoji: "🍺", name: "الكحول", desc: "حتى الكميات الصغيرة ترفع الخطر." },
  { emoji: "🧂", name: "الملح الزائد", desc: "الأطعمة المعلبة والوجبات السريعة." },
  { emoji: "🔥", name: "اللحوم المحروقة", desc: "الشوي المفرط ينتج مواد ضارة." },
];

export default function FoodCards() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* أطعمة مفيدة */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-6 md:p-8 border-2 border-green-200"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-green-500 text-white flex items-center justify-center shadow-lg">
            <Check className="w-6 h-6" strokeWidth={3} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-green-800">أطعمة تحمي</h3>
            <p className="text-sm text-green-700">أكثري منها</p>
          </div>
        </div>
        <div className="space-y-3">
          {goodFoods.map((f) => (
            <div
              key={f.name}
              className="flex items-start gap-3 bg-white/70 backdrop-blur rounded-xl p-3"
            >
              <span className="text-2xl flex-shrink-0">{f.emoji}</span>
              <div>
                <p className="font-bold text-gray-900 text-sm">{f.name}</p>
                <p className="text-xs text-gray-600 leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* أطعمة ضارة */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="bg-gradient-to-br from-red-50 to-rose-50 rounded-3xl p-6 md:p-8 border-2 border-red-200"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-red-500 text-white flex items-center justify-center shadow-lg">
            <X className="w-6 h-6" strokeWidth={3} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-red-800">أطعمة تضر</h3>
            <p className="text-sm text-red-700">قللي منها</p>
          </div>
        </div>
        <div className="space-y-3">
          {avoidFoods.map((f) => (
            <div
              key={f.name}
              className="flex items-start gap-3 bg-white/70 backdrop-blur rounded-xl p-3"
            >
              <span className="text-2xl flex-shrink-0">{f.emoji}</span>
              <div>
                <p className="font-bold text-gray-900 text-sm">{f.name}</p>
                <p className="text-xs text-gray-600 leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}