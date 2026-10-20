"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, X, Minus } from "lucide-react";

const rows = [
  {
    feature: "يكتشف كتل صغيرة جداً",
    mammo: true,
    clinical: false,
    ultrasound: true,
    mri: true,
  },
  {
    feature: "آمن تماماً (بدون إشعاع)",
    mammo: false,
    clinical: true,
    ultrasound: true,
    mri: true,
  },
  {
    feature: "مناسب للأنسجة الكثيفة",
    mammo: "partial",
    clinical: false,
    ultrasound: true,
    mri: true,
  },
  {
    feature: "لا يحتاج تحضير",
    mammo: true,
    clinical: true,
    ultrasound: true,
    mri: false,
  },
  {
    feature: "سريع (أقل من 30 دقيقة)",
    mammo: true,
    clinical: true,
    ultrasound: true,
    mri: false,
  },
  {
    feature: "متوفر في معظم المراكز",
    mammo: true,
    clinical: true,
    ultrasound: true,
    mri: false,
  },
  {
    feature: "يُستخدم كفحص روتيني",
    mammo: true,
    clinical: true,
    ultrasound: false,
    mri: false,
  },
];

const cols = [
  { key: "mammo", label: "ماموجرام", emoji: "🩻" },
  { key: "clinical", label: "فحص سريري", emoji: "🩺" },
  { key: "ultrasound", label: "موجات فوق صوتية", emoji: "📡" },
  { key: "mri", label: "رنين مغناطيسي", emoji: "🧲" },
];

function Cell({ value }: { value: boolean | string }) {
  if (value === true)
    return (
      <span className="inline-flex w-7 h-7 rounded-full bg-green-100 text-green-600 items-center justify-center">
        <Check className="w-4 h-4" strokeWidth={3} />
      </span>
    );
  if (value === false)
    return (
      <span className="inline-flex w-7 h-7 rounded-full bg-red-100 text-red-500 items-center justify-center">
        <X className="w-4 h-4" strokeWidth={3} />
      </span>
    );
  return (
    <span className="inline-flex w-7 h-7 rounded-full bg-amber-100 text-amber-600 items-center justify-center">
      <Minus className="w-4 h-4" strokeWidth={3} />
    </span>
  );
}

export default function ComparisonTable() {
  const [highlight, setHighlight] = useState<string | null>(null);

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-pink-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px]">
          <thead>
            <tr className="bg-gradient-to-l from-pink-500 to-rose-500 text-white">
              <th className="text-right p-4 font-bold">الميزة</th>
              {cols.map((c) => (
                <th
                  key={c.key}
                  onMouseEnter={() => setHighlight(c.key)}
                  onMouseLeave={() => setHighlight(null)}
                  className={`p-4 font-bold text-center cursor-pointer transition ${
                    highlight === c.key ? "bg-white/20" : ""
                  }`}
                >
                  <div className="text-2xl mb-1">{c.emoji}</div>
                  <div className="text-sm">{c.label}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={row.feature}
                className={i % 2 === 0 ? "bg-white" : "bg-pink-50/30"}
              >
                <td className="p-4 text-sm font-semibold text-gray-800 text-right">
                  {row.feature}
                </td>
                {cols.map((c) => (
                  <td
                    key={c.key}
                    className={`p-4 text-center transition ${
                      highlight === c.key ? "bg-pink-100/60" : ""
                    }`}
                  >
                    <Cell value={row[c.key as keyof typeof row] as any} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-gray-50 p-4 flex flex-wrap justify-center gap-4 text-xs text-gray-600">
        <span className="flex items-center gap-1.5">
          <Check className="w-3.5 h-3.5 text-green-600" /> يناسب
        </span>
        <span className="flex items-center gap-1.5">
          <Minus className="w-3.5 h-3.5 text-amber-600" /> أحياناً
        </span>
        <span className="flex items-center gap-1.5">
          <X className="w-3.5 h-3.5 text-red-500" /> لا يناسب
        </span>
      </div>
    </div>
  );
}