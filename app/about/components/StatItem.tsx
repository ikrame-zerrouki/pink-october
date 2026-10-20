"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function StatItem({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = !!useReducedMotion();
  const [count, setCount] = useState(0);

  // النسب المئوية تملأ الشريط بقدرها، وغيرها يملؤه كاملاً
  const isPercent = suffix.trim() === "%";
  const progress = isPercent ? Math.min(value / 100, 1) : 1;

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setCount(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.8,
      ease: EASE,
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => setCount(value),
    });
    return () => controls.stop();
  }, [inView, value, reduce]);

  const formatted = count.toLocaleString("en-US");
  const isLong = value.toLocaleString("en-US").length > 6;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.7, ease: EASE }}
      className="group relative isolate text-center"
    >
      {/* توهج يتنفس خلف الرقم */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-2 -z-10 h-24 w-24 -translate-x-1/2 rounded-full bg-pink-300/30 blur-2xl transition-transform duration-700 group-hover:scale-150"
      />

      <div
        className={`font-bold tabular-nums leading-tight bg-gradient-to-b from-pink-600 to-rose-400 bg-clip-text text-transparent ${
          isLong
            ? "text-[clamp(1.75rem,3.2vw,3.25rem)]"
            : "text-5xl md:text-6xl"
        }`}
      >
        {formatted}
        <span className="text-3xl">{suffix}</span>
      </div>

      {/* شريط تقدم يمتلئ مع العدّ */}
      <div
        aria-hidden
        className="mx-auto mt-4 h-1.5 w-full max-w-[8rem] overflow-hidden rounded-full bg-pink-100"
      >
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: inView ? progress : 0 }}
          transition={{ duration: reduce ? 0 : 1.8, ease: EASE }}
          className="relative h-full origin-right overflow-hidden rounded-full bg-gradient-to-l from-pink-500 to-rose-400"
        >
          {!reduce && (
            <motion.span
              className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-white/70 to-transparent"
              initial={{ x: "-120%" }}
              animate={{ x: "320%" }}
              transition={{
                duration: 1.6,
                delay: 1.8,
                repeat: Infinity,
                repeatDelay: 3,
                ease: "easeInOut",
              }}
            />
          )}
        </motion.div>
      </div>

      <p className="mt-3 text-sm font-medium text-gray-600 md:text-base">
        {label}
      </p>
    </motion.div>
  );
}
