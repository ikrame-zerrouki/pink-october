"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dna, Globe, Heart } from "lucide-react";

const groups = [
  {
    icon: Dna,
    title: "عوامل وراثية",
    gradient: "from-purple-500 to-pink-500",
    items: [
      "وجود تاريخ عائلي (الأم أو الأخت)",
      "طفرات جينية مثل BRCA1 و BRCA2",
      "بدء الدورة الشهرية مبكراً (قبل 12 سنة)",
      "انقطاع الطمث متأخراً (بعد 55 سنة)",
    ],
  },
  {
    icon: Globe,
    title: "عوامل بيئية",
    gradient: "from-teal-500 to-cyan-500",
    items: [
      "التعرض للإشعاع في منطقة الصدر",
      "التلوث البيئي",
      "التعرض لبعض المواد الكيميائية",
      "العلاج الهرموني البديل لفترات طويلة",
    ],
  },
  {
    icon: Heart,
    title: "عوامل حياتية",
    gradient: "from-rose-500 to-orange-400",
    items: [
      "التدخين والكحول",
      "السمنة وزيادة الوزن بعد سن اليأس",
      "قلة النشاط البدني",
      "عدم الإنجاب أو الإنجاب المتأخر",
      "عدم الرضاعة الطبيعية",
    ],
  },
];

export default function RiskAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-4">
      {groups.map((g, i) => {
        const Icon = g.icon;
        const isOpen = open === i;
        return (
          <motion.div
            key={g.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`rounded-2xl overflow-hidden border transition-all ${
              isOpen ? "border-pink-300 shadow-xl" : "border-gray-200 shadow-md"
            } bg-white`}
          >
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full flex items-center gap-4 p-6 text-right"
            >
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${g.gradient} text-white flex items-center justify-center flex-shrink-0 shadow-lg`}
              >
                <Icon className="w-7 h-7" />
              </div>
              <h3 className="flex-1 text-xl font-bold text-gray-900">
                {g.title}
              </h3>
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                className="text-3xl text-pink-500 font-light leading-none"
              >
                +
              </motion.span>
            </button>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <ul className="px-6 pb-6 space-y-3">
                    {g.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-gray-700 bg-pink-50/50 rounded-lg p-3"
                      >
                        <span
                          className={`mt-1.5 w-2 h-2 rounded-full bg-gradient-to-br ${g.gradient} flex-shrink-0`}
                        />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}