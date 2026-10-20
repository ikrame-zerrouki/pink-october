"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const types = [
  {
    id: "ductal",
    name: "القنوات اللبنية",
    percent: "80%",
    emoji: "🌷",
    desc: "الأكثر شيوعاً. يبدأ في القنوات التي تنقل الحليب إلى الحلمة. يُكتشف عادةً عبر الماموجرام.",
    highlight: "النوع الأكثر انتشاراً",
    color: "from-pink-500 to-rose-500",
  },
  {
    id: "lobular",
    name: "الفصيصات",
    percent: "10%",
    emoji: "🌸",
    desc: "يبدأ في الفصيصات (الغدد المنتجة للحليب). قد لا يظهر في الماموجرام بسهولة، لذا يُستخدم الرنين المغناطيسي أحياناً.",
    highlight: "أصعب في الكشف",
    color: "from-purple-500 to-fuchsia-500",
  },
  {
    id: "inflammatory",
    name: "الالتهابي",
    percent: "1-5%",
    emoji: "🔥",
    desc: "نوع نادر وعدواني. يُظهر احمراراً وتورماً في الثدي دون كتلة واضحة. يحتاج علاجاً سريعاً.",
    highlight: "الأكثر شراسة",
    color: "from-rose-500 to-orange-500",
  },
  {
    id: "paget",
    name: "باجيت",
    percent: "1-3%",
    emoji: "🎯",
    desc: "يبدأ في الحلمة ويظهر كطفح جلدي أو تقشر. غالباً ما يرتبط بسرطان في القنوات.",
    highlight: "يصيب الحلمة",
    color: "from-orange-500 to-amber-500",
  },
];

export default function TabTypes() {
  const [active, setActive] = useState(0);
  const current = types[active];

  return (
    <div>
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {types.map((t, i) => (
          <button
            key={t.id}
            onClick={() => setActive(i)}
            className={`relative px-5 py-3 rounded-full font-semibold text-sm transition-all ${
              active === i
                ? "text-white shadow-lg"
                : "bg-white text-gray-600 hover:text-pink-600 border border-gray-200"
            }`}
          >
            {active === i && (
              <motion.div
                layoutId="activeTab"
                className={`absolute inset-0 bg-gradient-to-l ${t.color} rounded-full`}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative flex items-center gap-2">
              <span>{t.emoji}</span>
              {t.name}
            </span>
          </button>
        ))}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="relative bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-pink-100 overflow-hidden"
        >
          <div
            className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${current.color} opacity-5 rounded-full blur-3xl`}
          />
          <div className="relative grid md:grid-cols-[1fr_auto] gap-8 items-start">
            <div>
              <span className="inline-block text-xs font-bold tracking-widest uppercase text-pink-600 mb-3">
                {current.highlight}
              </span>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                سرطان {current.name}
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                {current.desc}
              </p>
            </div>
            <div className="text-center">
              <div
                className={`w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br ${current.color} flex items-center justify-center text-white shadow-2xl`}
              >
                <div>
                  <div className="text-3xl md:text-4xl font-bold">
                    {current.percent}
                  </div>
                  <div className="text-xs opacity-90">من الحالات</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}