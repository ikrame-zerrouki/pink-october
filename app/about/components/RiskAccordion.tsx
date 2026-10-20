"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Dna, Globe, Heart } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const groups = [
  {
    icon: Dna,
    title: "عوامل وراثية",
    gradient: "from-purple-500 to-pink-500",
    glow: "bg-fuchsia-300/30",
    border: "border-fuchsia-300",
    shadow: "shadow-fuchsia-200/60",
    tint: "bg-fuchsia-50/70",
    pill: "bg-fuchsia-100 text-fuchsia-700",
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
    glow: "bg-cyan-300/30",
    border: "border-cyan-300",
    shadow: "shadow-cyan-200/60",
    tint: "bg-cyan-50/70",
    pill: "bg-cyan-100 text-cyan-700",
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
    glow: "bg-rose-300/30",
    border: "border-rose-300",
    shadow: "shadow-rose-200/60",
    tint: "bg-rose-50/70",
    pill: "bg-rose-100 text-rose-700",
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
  const reduce = !!useReducedMotion();
  const baseId = useId();

  const listVariants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.07, delayChildren: 0.12 } },
  };
  const itemVariants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, x: 18 },
    show: { opacity: 1, x: 0 },
  };

  return (
    <div className="space-y-5">
      {groups.map((g, i) => {
        const Icon = g.icon;
        const isOpen = open === i;
        const panelId = `${baseId}-${i}`;

        return (
          <motion.div
            key={g.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6, ease: EASE }}
            className={`group relative overflow-hidden rounded-3xl border bg-white transition-all duration-500 ${
              isOpen
                ? `${g.border} shadow-xl ${g.shadow}`
                : "border-gray-200 shadow-md hover:shadow-lg"
            }`}
          >
            {/* توهج لوني خلف البطاقة */}
            <span
              aria-hidden
              className={`pointer-events-none absolute -left-12 -top-12 h-44 w-44 rounded-full blur-3xl transition-opacity duration-700 ${g.glow} ${
                isOpen ? "opacity-100" : "opacity-0 group-hover:opacity-60"
              }`}
            />

            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className="relative z-10 flex w-full items-center gap-5 rounded-3xl p-6 text-right focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-pink-400"
            >
              {/* الأيقونة مع هالة */}
              <span className="relative flex-shrink-0">
                <span
                  aria-hidden
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${g.gradient} blur-lg transition-opacity duration-500 ${
                    isOpen ? "opacity-50" : "opacity-0 group-hover:opacity-40"
                  }`}
                />
                <motion.span
                  animate={
                    isOpen && !reduce
                      ? { rotate: [0, -8, 8, 0], scale: [1, 1.08, 1] }
                      : { rotate: 0, scale: 1 }
                  }
                  transition={{ duration: 0.6 }}
                  className={`relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${g.gradient} text-white shadow-lg`}
                >
                  <Icon className="h-7 w-7" />
                </motion.span>
              </span>

              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900">{g.title}</h3>
                <span
                  className={`mt-1.5 inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${g.pill}`}
                >
                  {g.items.length} عوامل
                </span>
              </div>

              {/* + تتحول إلى − */}
              <span
                className={`relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${
                  isOpen
                    ? `border-transparent bg-gradient-to-br ${g.gradient} text-white shadow-md`
                    : "border-gray-200 text-gray-500 group-hover:border-gray-300"
                }`}
              >
                <span className="absolute h-0.5 w-4 rounded-full bg-current" />
                <motion.span
                  initial={false}
                  animate={{ rotate: isOpen ? 0 : 90, opacity: isOpen ? 0 : 1 }}
                  transition={{ duration: reduce ? 0 : 0.3, ease: EASE }}
                  className="absolute h-0.5 w-4 rounded-full bg-current"
                />
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-label={g.title}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: reduce ? 0 : 0.4, ease: EASE }}
                  className="relative z-10 overflow-hidden"
                >
                  <motion.ul
                    variants={listVariants}
                    initial="hidden"
                    animate="show"
                    className="space-y-2.5 px-6 pb-6"
                  >
                    {g.items.map((item) => (
                      <motion.li
                        key={item}
                        variants={itemVariants}
                        transition={{ duration: 0.4, ease: EASE }}
                        className={`flex items-start gap-3 rounded-xl p-3.5 text-gray-700 transition-transform duration-300 hover:-translate-x-1 ${g.tint}`}
                      >
                        <span
                          className={`mt-1.5 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-gradient-to-br ${g.gradient} ring-4 ring-white`}
                        />
                        <span className="leading-relaxed">{item}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
