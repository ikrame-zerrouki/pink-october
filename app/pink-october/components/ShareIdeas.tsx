"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Heart, BookOpen, Music, Gift, Check } from "lucide-react";
import { InstagramIcon } from "../../components/BrandIcons";

const D = "font-[family-name:var(--font-display)]";
const FOCUS =
  "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-pink-300";

/* Pink family only: soft, white, tinted and deep */
const TONES = {
  soft: {
    card: "bg-pink-50",
    title: "text-gray-900",
    desc: "text-gray-700",
    icon: "bg-gradient-to-br from-pink-500 to-rose-500 text-white shadow-lg",
    idle: "ring-1 ring-pink-100 hover:ring-pink-300",
    done: "ring-2 ring-pink-500",
  },
  white: {
    card: "bg-white",
    title: "text-gray-900",
    desc: "text-gray-600",
    icon: "bg-gradient-to-br from-pink-500 to-rose-500 text-white shadow-lg",
    idle: "ring-1 ring-pink-100 hover:ring-pink-300",
    done: "ring-2 ring-pink-500",
  },
  tint: {
    card: "bg-gradient-to-br from-pink-100 to-rose-100",
    title: "text-rose-900",
    desc: "text-rose-900/75",
    icon: "bg-gradient-to-br from-pink-500 to-rose-500 text-white shadow-lg",
    idle: "ring-1 ring-pink-200 hover:ring-pink-400",
    done: "ring-2 ring-pink-500",
  },
  deep: {
    card: "bg-gradient-to-br from-rose-900 via-pink-800 to-rose-700",
    title: "text-white",
    desc: "text-white/85",
    icon: "bg-white/15 backdrop-blur-md text-white ring-1 ring-white/30",
    idle: "ring-1 ring-rose-900 hover:ring-pink-300/60",
    done: "ring-2 ring-pink-300",
  },
} as const;

type ToneKey = keyof typeof TONES;

const ideas: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  tone: ToneKey;
  span: string;
}[] = [
  { icon: InstagramIcon, title: "انشري الشريط الوردي", desc: "غيّري صورة بروفايلك إلى شريط وردي في أكتوبر.", tone: "soft", span: "md:col-span-4" },
  { icon: Users, title: "تحدثي مع عائلتك", desc: "خصصي جلسة عائلية للحديث عن التوعية والفحص.", tone: "white", span: "md:col-span-2" },
  { icon: Heart, title: "ادعمي مريضة", desc: "زوري مصابة، اسألي عن حالها، وقدمي مساعدة عملية.", tone: "white", span: "md:col-span-2" },
  { icon: BookOpen, title: "شاركي مقالاً", desc: "انشري مقالاً توعوياً موثوقاً بين صديقاتك.", tone: "tint", span: "md:col-span-2" },
  { icon: Music, title: "حفلة توعية", desc: "نظمي فعالية صغيرة في العمل أو الحي للتوعية.", tone: "white", span: "md:col-span-2" },
  { icon: Gift, title: "تبرعي", desc: "ادعمي جمعية محلية تعنى بالتوعية أو دعم المصابات.", tone: "deep", span: "md:col-span-6" },
];

/* the stamp that lands on a chosen card */
function Stamp() {
  return (
    <motion.span
      initial={{ scale: 2.2, rotate: -24, opacity: 0 }}
      animate={{ scale: 1, rotate: -12, opacity: 1 }}
      exit={{ scale: 0.6, opacity: 0 }}
      transition={{ type: "spring", stiffness: 380, damping: 18 }}
      className="absolute top-4 start-4 flex h-16 w-16 flex-col items-center justify-center rounded-full border-2 border-dashed border-pink-500 bg-white/95 text-pink-600 shadow-md"
      aria-hidden
    >
      <Check className="w-5 h-5" strokeWidth={3} />
      <span className={`${D} text-sm font-bold leading-none mt-0.5`}>جاهزة</span>
    </motion.span>
  );
}

export default function ShareIdeas() {
  const [done, setDone] = useState<number[]>([]);

  const toggle = (i: number) => {
    setDone((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
    );
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        {ideas.map((idea, i) => {
          const Icon = idea.icon;
          const isDone = done.includes(i);
          const t = TONES[idea.tone];
          const wide = idea.span === "md:col-span-6" || idea.span === "md:col-span-4";
          return (
            <button
              key={idea.title}
              onClick={() => toggle(i)}
              aria-pressed={isDone}
              className={`relative overflow-hidden text-start rounded-[1.75rem] p-7 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${t.card} ${
                isDone ? t.done : t.idle
              } ${idea.span} ${FOCUS} ${
                wide ? "md:flex md:items-center md:gap-6 md:p-9" : ""
              }`}
            >
              <AnimatePresence>{isDone && <Stamp />}</AnimatePresence>

              <span
                className={`inline-flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl ${t.icon} ${
                  wide ? "mb-5 md:mb-0" : "mb-5"
                }`}
              >
                <Icon className="w-7 h-7" />
              </span>
              <span className="block">
                <span className={`${D} block text-2xl font-bold leading-snug ${t.title}`}>
                  {idea.title}
                </span>
                <span className={`mt-1.5 block leading-loose ${t.desc} ${wide ? "md:max-w-md" : ""}`}>
                  {idea.desc}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {/* progress: one dot per idea */}
      <div className="mt-8 flex flex-col items-center gap-3" aria-live="polite">
        <div className="flex gap-2">
          {ideas.map((_, i) => (
            <span
              key={i}
              className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                done.includes(i) ? "bg-pink-500 scale-125" : "bg-pink-200"
              }`}
            />
          ))}
        </div>
        <p className="text-sm font-semibold text-pink-900">
          {done.length} من {ideas.length} أفكار جاهزة للمشاركة
        </p>
      </div>
    </div>
  );
}
