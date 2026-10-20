"use client";

import { motion } from "framer-motion";
import { Calendar, Heart, Ribbon, Users } from "lucide-react";

const events = [
  {
    year: "1985",
    title: "بداية الحملة",
    desc: "بدأت الحملة الأولى للتوعية بسرطان الثدي في الولايات المتحدة، بقيادة الأمريكية شارلوت هالي.",
    icon: Heart,
    color: "from-pink-400 to-rose-400",
  },
  {
    year: "1991",
    title: "الشريط الوردي",
    desc: "ظهر الشريط الوردي كرمز عالمي للتوعية بسرطان الثدي، وأصبح أيقونة معروفة.",
    icon: Ribbon,
    color: "from-pink-500 to-rose-500",
  },
  {
    year: "1992",
    title: "تثبيت أكتوبر",
    desc: "تم تثبيت شهر أكتوبر كشهر عالمي للتوعية بسرطان الثدي في معظم الدول.",
    icon: Calendar,
    color: "from-purple-500 to-fuchsia-500",
  },
  {
    year: "اليوم",
    title: "حملة عالمية",
    desc: "يُحتفل بالشهر عالمياً في أكثر من 100 دولة، مع ملايين المشاركين سنوياً.",
    icon: Users,
    color: "from-rose-500 to-orange-400",
  },
];

export default function TimelineHistory() {
  return (
    <div className="relative max-w-3xl mx-auto">
      <div className="absolute right-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-pink-200 via-pink-400 to-pink-200" />
      <div className="space-y-8">
        {events.map((e, i) => {
          const Icon = e.icon;
          return (
            <motion.div
              key={e.year}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative pr-20"
            >
              <div
                className={`absolute right-0 top-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${e.color} text-white flex items-center justify-center shadow-lg`}
              >
                <Icon className="w-7 h-7" />
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-md border border-pink-100">
                <p className="text-xs font-bold uppercase tracking-widest text-pink-600 mb-1">
                  {e.year}
                </p>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {e.title}
                </h3>
                <p className="text-gray-700 leading-relaxed text-sm">{e.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}