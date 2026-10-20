"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, Sparkles, XCircle } from "lucide-react";

const timings = [
  {
    icon: Calendar,
    title: "بعد الدورة الشهرية",
    days: "3–7 أيام",
    desc: "أفضل وقت لأن الثدي يكون أقل حساسية وتورماً، مما يسهّل اكتشاف أي تغيرات.",
    color: "from-pink-500 to-rose-500",
    best: true,
  },
  {
    icon: Clock,
    title: "في نفس اليوم شهرياً",
    days: "التزمي بتاريخ",
    desc: "إذا انقطعت دورتكِ، اختاري يوماً ثابتاً كل شهر (مثلاً أول يوم من الشهر).",
    color: "from-purple-500 to-fuchsia-500",
    best: false,
  },
  {
    icon: XCircle,
    title: "تجنّبي الفحص أثناء الدورة",
    days: "أثناء الحيض",
    desc: "قد يكون الثدي متورماً ومؤلمًا طبيعياً، مما يجعل التمييز صعباً.",
    color: "from-gray-400 to-gray-500",
    best: false,
  },
  {
    icon: Sparkles,
    title: "بعد انقطاع الطمث",
    days: "يوم ثابت شهرياً",
    desc: "اختاري يوماً واحداً في الشهر وثبتيه، مثلاً أول يوم من كل شهر.",
    color: "from-teal-500 to-cyan-500",
    best: false,
  },
];

export default function TimingCards() {
  return (
    <div className="grid md:grid-cols-2 gap-5">
      {timings.map((t, i) => {
        const Icon = t.icon;
        return (
          <motion.div
            key={t.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className={`relative bg-white rounded-2xl p-6 border-2 transition-all hover:shadow-xl ${
              t.best
                ? "border-pink-300 shadow-lg"
                : "border-gray-100 shadow-md"
            }`}
          >
            {t.best && (
              <span className="absolute -top-3 right-6 bg-gradient-to-l from-pink-500 to-rose-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                ⭐ الأفضل
              </span>
            )}
            <div
              className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${t.color} text-white mb-4 shadow-md`}
            >
              <Icon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">{t.title}</h3>
            <p className="text-sm font-semibold text-pink-600 mb-3">{t.days}</p>
            <p className="text-gray-700 leading-relaxed text-sm">{t.desc}</p>
          </motion.div>
        );
      })}
    </div>
  );
}