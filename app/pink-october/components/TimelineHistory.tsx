"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { Calendar, Heart, Ribbon, Sparkles, Users } from "lucide-react";

const D = "font-[family-name:var(--font-display)]";

const events = [
  {
    year: "1985",
    title: "ولادة الشهر",
    desc: "اتحدت الجمعية الأمريكية للسرطان مع شركة أدوية لإطلاق أول شهر للتوعية، بهدف تشجيع النساء على الفحص بالماموغرام.",
    icon: Calendar,
  },
  {
    year: "1991",
    title: "أول شريط بلون الخوخ",
    desc: "بدأت شارلوت هالي بصنع شرائط بلون الخوخ يدوياً للتذكير بقلة تمويل الأبحاث. وفي العام نفسه وزّعت مؤسسة كومن شرائط وردية في سباق نيويورك.",
    icon: Heart,
  },
  {
    year: "1992",
    title: "الشريط الوردي يصبح رمزاً",
    desc: "تعاونت مجلة «سيلف» مع «إستي لودر»، ووُزّع نحو 1.5 مليون شريط وردي، فصار الوردي لون الحملة.",
    icon: Ribbon,
  },
  {
    year: "2000",
    title: "معالم تتوهج بالوردي",
    desc: "انطلق مشروع «الإضاءة العالمية» الذي تُضاء فيه معالم شهيرة بالضوء الوردي خلال أكتوبر.",
    icon: Sparkles,
  },
  {
    year: "اليوم",
    title: "حملة بلا حدود",
    desc: "يتجدد الشهر كل عام في دول كثيرة، بحملات فحص ومسيرات ومبادرات لدعم المصابات.",
    icon: Users,
  },
];

export default function TimelineHistory() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 55%"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.4,
  });

  return (
    <div ref={ref} className="relative max-w-4xl mx-auto">
      {/* track + progress line (fills as you scroll) */}
      <div
        aria-hidden
        className="absolute top-0 bottom-0 w-0.5 bg-pink-100 start-[calc(1.5rem_-_1px)] md:start-[calc(50%_-_1px)]"
      />
      <motion.div
        aria-hidden
        style={{ scaleY: reduce ? 1 : progress, transformOrigin: "top" }}
        className="absolute top-0 bottom-0 w-0.5 bg-gradient-to-b from-pink-400 via-pink-500 to-rose-500 start-[calc(1.5rem_-_1px)] md:start-[calc(50%_-_1px)]"
      />

      <ol className="space-y-12 md:space-y-16">
        {events.map((e, i) => {
          const Icon = e.icon;
          const last = i === events.length - 1;
          const onEnd = i % 2 === 1; // alternate sides on desktop
          return (
            <li key={e.year} className="relative ps-[4.5rem] md:ps-0">
              {/* node on the line */}
              <span
                className={`absolute top-6 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-rose-500 text-white shadow-lg ring-4 ring-[#FDF8F5] start-[calc(1.5rem_-_24px)] md:start-[calc(50%_-_24px)] ${
                  last ? "ring-pink-200" : ""
                }`}
              >
                <Icon className="w-5 h-5" aria-hidden />
              </span>

              <motion.article
                initial={{ opacity: 0, x: onEnd ? -28 : 28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55 }}
                className={`relative md:w-1/2 ${
                  onEnd ? "md:ms-auto md:ps-14" : "md:pe-14"
                }`}
              >
                <div className="rounded-3xl bg-white p-7 shadow-xl ring-1 ring-pink-100">
                  <p
                    className={`${D} text-6xl font-bold leading-none bg-gradient-to-l from-pink-500 to-rose-500 bg-clip-text text-transparent`}
                  >
                    {e.year}
                  </p>
                  <h3 className={`${D} mt-4 text-2xl font-bold text-gray-900 leading-snug`}>
                    {e.title}
                  </h3>
                  <p className="mt-2 text-gray-700 leading-loose">{e.desc}</p>
                </div>
              </motion.article>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
