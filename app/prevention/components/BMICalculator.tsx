"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Scale } from "lucide-react";

function getCategory(bmi: number) {
  if (bmi < 18.5)
    return { label: "نقص وزن", color: "text-blue-600", bg: "from-blue-500 to-cyan-500", tip: "استشيري طبيبك حول نظام غذائي مناسب." };
  if (bmi < 25)
    return { label: "وزن صحي", color: "text-green-600", bg: "from-green-500 to-emerald-500", tip: "ممتاز! حافظي على هذا الوزن." };
  if (bmi < 30)
    return { label: "زيادة وزن", color: "text-amber-600", bg: "from-amber-500 to-orange-400", tip: "خسارة 5–10% من الوزن تقلل الخطر." };
  return { label: "سمنة", color: "text-red-600", bg: "from-red-500 to-rose-500", tip: "استشيري طبيبك — خسارة الوزن تدريجياً مفيدة." };
}

export default function BMICalculator() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  const bmi =
    height && weight
      ? parseFloat(weight) / Math.pow(parseFloat(height) / 100, 2)
      : 0;

  const cat = bmi > 0 ? getCategory(bmi) : null;

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 border border-pink-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-fuchsia-500 text-white flex items-center justify-center shadow-lg">
          <Scale className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">مؤشر كتلة الجسم</h3>
          <p className="text-sm text-gray-600">BMI — أداة تقريبية</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <div>
          <label className="block text-xs font-bold text-gray-600 mb-2">
            الطول (سم)
          </label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="165"
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 outline-none text-lg font-semibold text-gray-900"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-600 mb-2">
            الوزن (كجم)
          </label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="65"
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 outline-none text-lg font-semibold text-gray-900"
          />
        </div>
      </div>

      {bmi > 0 && cat && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`bg-gradient-to-l ${cat.bg} text-white rounded-2xl p-5 text-center`}
        >
          <p className="text-xs uppercase tracking-widest opacity-80 font-bold mb-1">
            مؤشر كتلة جسمك
          </p>
          <div className="text-5xl font-bold mb-1">{bmi.toFixed(1)}</div>
          <div className="text-lg font-bold mb-2">{cat.label}</div>
          <p className="text-sm opacity-95 leading-relaxed">{cat.tip}</p>
        </motion.div>
      )}

      <p className="text-xs text-gray-500 text-center mt-4 leading-relaxed">
        ⚕️ BMI مؤشر تقريبي — لا يأخذ في الحسبان كتلة العضلات. استشيري طبيبك.
      </p>
    </div>
  );
}