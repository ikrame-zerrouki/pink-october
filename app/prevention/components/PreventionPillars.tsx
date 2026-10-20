"use client";

import { motion } from "framer-motion";
import { Apple, Dumbbell, Scale, Cigarette, Baby, Brain } from "lucide-react";

const pillars = [
  {
    icon: Apple,
    title: "التغذية",
    desc: "نظام غذائي متوازن غني بالخضار والفواكه والألياف.",
    color: "from-green-500 to-emerald-500",
    href: "#nutrition",
  },
  {
    icon: Dumbbell,
    title: "الرياضة",
    desc: "150 دقيقة أسبوعياً من النشاط المعتدل.",
    color: "from-teal-500 to-cyan-500",
    href: "#exercise",
  },
  {
    icon: Scale,
    title: "الوزن الصحي",
    desc: "الحفاظ على وزن مناسب يقلل الخطر.",
    color: "from-purple-500 to-fuchsia-500",
    href: "#bmi",
  },
  {
    icon: Cigarette,
    title: "تجنب التدخين",
    desc: "الإقلاع عن التدخين والكحول.",
    color: "from-red-500 to-rose-500",
    href: "#smoking",
  },
  {
    icon: Baby,
    title: "الرضاعة",
    desc: "الرضاعة الطبيعية تحمي الأم والطفل.",
    color: "from-pink-500 to-rose-500",
    href: "#breastfeeding",
  },
  {
    icon: Brain,
    title: "الصحة النفسية",
    desc: "إدارة التوتر والنوم الجيد.",
    color: "from-indigo-500 to-purple-500",
    href: "#mental",
  },
];

export default function PreventionPillars() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {pillars.map((p, i) => {
        const Icon = p.icon;
        return (
          <motion.a
            key={p.title}
            href={p.href}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="group bg-white rounded-3xl p-7 shadow-md hover:shadow-2xl border border-gray-100 hover:border-pink-200 transition-all hover:-translate-y-1"
          >
            <div
              className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${p.color} text-white mb-5 shadow-lg group-hover:scale-110 transition`}
            >
              <Icon className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-pink-600 transition">
              {p.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">{p.desc}</p>
          </motion.a>
        );
      })}
    </div>
  );
}