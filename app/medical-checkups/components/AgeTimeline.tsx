"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Calendar, AlertCircle } from "lucide-react";

const ages = [
  {
    id: "20s",
    label: "في العشرينيات",
    age: "20–29",
    emoji: "🌱",
    color: "from-teal-500 to-cyan-500",
    headline: "ابدئي بالفحص الذاتي",
    items: [
      {
        title: "الفحص الذاتي الشهري",
        freq: "كل شهر",
        desc: "بعد الدورة الشهرية بـ 3–7 أيام. تعلّميه مرة واحدة واجعليه عادة.",
      },
      {
        title: "الفحص السريري",
        freq: "كل 3 سنوات",
        desc: "عند طبيب/طبيبة مختصة، غالباً ضمن الفحص النسائي السنوي.",
      },
    ],
    note: "إذا كان لديكِ تاريخ عائلي قوي، استشيري الطبيب — قد يُنصح بالبدء مبكراً.",
  },
  {
    id: "30s",
    label: "في الثلاثينيات",
    age: "30–39",
    emoji: "🌸",
    color: "from-pink-500 to-rose-500",
    headline: "استمري + فحص سريري منتظم",
    items: [
      {
        title: "الفحص الذاتي الشهري",
        freq: "كل شهر",
        desc: "استمري عليه — هو خط الدفاع الأول عنكِ.",
      },
      {
        title: "الفحص السريري",
        freq: "كل 1–3 سنوات",
        desc: "يزيد الأطباء التوصية به في هذه المرحلة.",
      },
      {
        title: "الموجات فوق الصوتية",
        freq: "عند الحاجة",
        desc: "إذا كانت أنسجة الثدي كثيفة أو ظهرت كتلة، قد يطلبها الطبيب.",
      },
    ],
    note: "بعض التوصيات ترى بدء الماموجرام عند 35 سنة لمن لديهنّ عوامل خطر.",
  },
  {
    id: "40s",
    label: "في الأربعينيات",
    age: "40–49",
    emoji: "🌺",
    color: "from-purple-500 to-fuchsia-500",
    headline: "وقت الماموجرام",
    items: [
      {
        title: "الماموجرام",
        freq: "كل 1–2 سنة",
        desc: "أغلب الجمعيات الطبية توصي بالبدء في سن 40.",
      },
      {
        title: "الفحص السريري",
        freq: "سنوياً",
        desc: "مع كل زيارة سنوية للطبيب.",
      },
      {
        title: "الفحص الذاتي",
        freq: "شهرياً",
        desc: "لا يغني عن الماموجرام لكنه ضروري.",
      },
    ],
    note: "ابدئي الماموجرام قبل أن تشعري بأي عَرَض — الهدف هو الاكتشاف المبكر.",
  },
  {
    id: "50s",
    label: "بعد الخمسين",
    age: "50+",
    emoji: "🌷",
    color: "from-rose-500 to-orange-400",
    headline: "الاستمرارية هي الأهم",
    items: [
      {
        title: "الماموجرام",
        freq: "كل 1–2 سنة",
        desc: "استمري عليه بانتظام — الخطر يزيد مع العمر.",
      },
      {
        title: "الفحص السريري",
        freq: "سنوياً",
        desc: "ضمن الفحص الصحي السنوي الشامل.",
      },
      {
        title: "فحوصات إضافية",
        freq: "حسب الحاجة",
        desc: "الرنين المغناطيسي لمن لديهنّ عوامل خطر عالية.",
      },
    ],
    note: "استمري في الفحص حتى لو كنتِ بصحة جيدة — الوقاية لا تتوقف.",
  },
];

export default function AgeTimeline() {
  const [active, setActive] = useState(1);

  return (
    <div>
      {/* أزرار الأعمار */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {ages.map((a, i) => (
          <button
            key={a.id}
            onClick={() => setActive(i)}
            className={`relative px-5 py-3 rounded-full font-semibold text-sm transition-all ${
              active === i
                ? "text-white shadow-lg"
                : "bg-white text-gray-600 hover:text-pink-600 border border-gray-200"
            }`}
          >
            {active === i && (
              <motion.div
                layoutId="activeAge"
                className={`absolute inset-0 bg-gradient-to-l ${a.color} rounded-full`}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative flex items-center gap-2">
              <span>{a.emoji}</span>
              {a.label}
            </span>
          </button>
        ))}
      </div>

      {/* المحتوى */}
      <AnimatePresence mode="wait">
        <motion.div
          key={ages[active].id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="relative bg-white rounded-3xl shadow-xl border border-pink-100 overflow-hidden"
        >
          <div
            className={`bg-gradient-to-l ${ages[active].color} p-8 md:p-10 text-white`}
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="text-5xl">{ages[active].emoji}</div>
              <div>
                <p className="text-xs uppercase tracking-widest opacity-80 font-bold">
                  الفئة العمرية {ages[active].age}
                </p>
                <h3 className="text-3xl font-bold">{ages[active].headline}</h3>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-10">
            <div className="space-y-4 mb-6">
              {ages[active].items.map((item) => (
                <div
                  key={item.title}
                  className="flex items-start gap-4 bg-pink-50/50 rounded-2xl p-5"
                >
                  <div
                    className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${ages[active].color} text-white flex items-center justify-center`}
                  >
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h4 className="text-lg font-bold text-gray-900">
                        {item.title}
                      </h4>
                      <span className="text-xs font-bold bg-white text-pink-600 px-2.5 py-1 rounded-full border border-pink-200">
                        {item.freq}
                      </span>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-sm">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-start gap-3 bg-amber-50 border-r-4 border-amber-400 p-4 rounded-xl">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-amber-900 text-sm font-semibold leading-relaxed">
                {ages[active].note}
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}