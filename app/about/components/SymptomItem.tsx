"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";

const symptoms = [
  { emoji: "🔍", title: "كتلة في الثدي", detail: "قد تكون صلبة أو طرية، غالباً غير مؤلمة. أكثر العلامات شيوعاً." },
  { emoji: "💧", title: "تغير في الحلمة", detail: "انقلاب للداخل، تشقق، أو إفرازات غير طبيعية (خاصة الدموية)." },
  { emoji: "🍊", title: "تغير في الجلد", detail: "احمرار، تقشر، تجاعيد تشبه قشر البرتقال، أو تقرحات." },
  { emoji: "⚖️", title: "تغير في الحجم", detail: "اختلاف واضح بين الثديين لم يكن موجوداً سابقاً." },
  { emoji: "📍", title: "تورم تحت الإبط", detail: "كتل صغيرة في الغدد الليمفاوية تحت الإبط أو فوق الترقوة." },
  { emoji: "⚡", title: "ألم مستمر", detail: "ألم في الثدي أو الحلمة لا يزول بعد الدورة الشهرية." },
];

function TimelineItem({
  s,
  i,
  reduce,
}: {
  s: (typeof symptoms)[number];
  i: number;
  reduce: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // تُضاء العقدة عندما يعبر العنصر منتصف الشاشة
  const reached = useInView(ref, { once: true, margin: "-40% 0px -40% 0px" });
  const even = i % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: reduce ? 0 : even ? 40 : -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
      className={`relative flex items-start gap-6 ${
        even ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      {/* البطاقة */}
      <div
        className={`min-w-0 flex-1 pr-16 ${
          even ? "md:pl-14 md:pr-0" : "md:pl-0 md:pr-14"
        }`}
      >
        <div className="group relative overflow-hidden rounded-2xl border border-pink-100 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-pink-200/60">
          <span
            aria-hidden
            className="absolute inset-x-0 top-0 h-1 bg-gradient-to-l from-pink-400 to-rose-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute -bottom-6 -left-2 select-none text-8xl font-black leading-none text-pink-50 transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-110"
          >
            {String(i + 1).padStart(2, "0")}
          </span>

          <div className="relative flex items-start gap-4">
            <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-100 to-rose-100 text-2xl shadow-inner transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
              {s.emoji}
            </span>
            <div className="min-w-0">
              <h3 className="mb-1.5 text-xl font-bold text-pink-600">
                {s.title}
              </h3>
              <p className="leading-relaxed text-gray-700">{s.detail}</p>
            </div>
          </div>
        </div>
      </div>

      {/* العقدة المرقمة */}
      <div className="absolute right-1 top-5 z-10 md:right-1/2 md:translate-x-1/2">
        <span className="relative flex h-10 w-10 items-center justify-center">
          {reached && !reduce && (
            <span className="absolute inset-0 animate-ping rounded-full bg-pink-400/40 [animation-iteration-count:2]" />
          )}
          <span
            className={`relative flex h-10 w-10 items-center justify-center rounded-full border-4 text-sm font-bold shadow-lg transition-all duration-700 ${
              reached
                ? "border-pink-300 bg-gradient-to-br from-pink-500 to-rose-500 text-white shadow-pink-300/60"
                : "border-pink-100 bg-white text-pink-300"
            }`}
          >
            {i + 1}
          </span>
        </span>
      </div>

      {/* فراغ للجهة الأخرى */}
      <div className="hidden flex-1 md:block" />
    </motion.div>
  );
}

export default function SymptomsTimeline() {
  const reduce = !!useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 60%"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    mass: 0.4,
  });

  return (
    <div ref={containerRef} className="relative">
      {/* الخط: مسار باهت + تعبئة تتبع التمرير */}
      <div
        aria-hidden
        className="absolute bottom-0 right-[23px] top-0 w-0.5 rounded-full bg-pink-100 md:right-1/2 md:translate-x-1/2"
      >
        <motion.div
          style={{ scaleY: reduce ? 1 : progress }}
          className="h-full w-full origin-top rounded-full bg-gradient-to-b from-pink-400 via-rose-500 to-pink-400 shadow-[0_0_12px_rgba(244,63,94,0.5)]"
        />
      </div>

      <div className="space-y-12">
        {symptoms.map((s, i) => (
          <TimelineItem key={s.title} s={s} i={i} reduce={reduce} />
        ))}
      </div>
    </div>
  );
}
