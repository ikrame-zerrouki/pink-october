"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function StatCard({
  value,
  label,
  suffix = "",
}: {
  value: string;
  label: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = !!useReducedMotion();

  // نفصل الرقم الأول عن بقية النص ليُعَدّ تصاعدياً: "85%" → ["", "85", "%"]
  const match = /^(\D*?)(\d+(?:[.,]\d+)?)(.*)$/.exec(value);
  const prefix = match?.[1] ?? "";
  const raw = match?.[2];
  const rest = match?.[3] ?? "";

  const [shown, setShown] = useState<string>(() => {
    if (!raw) return value;
    const decimals = raw.match(/[.,](\d+)$/)?.[1].length ?? 0;
    return (0).toFixed(decimals).replace(".", raw.includes(",") ? "," : ".");
  });

  useEffect(() => {
    if (!raw || !inView) return;
    if (reduce) {
      setShown(raw);
      return;
    }
    const decimals = raw.match(/[.,](\d+)$/)?.[1].length ?? 0;
    const sep = raw.includes(",") ? "," : ".";
    const target = parseFloat(raw.replace(",", "."));
    const controls = animate(0, target, {
      duration: 1.6,
      ease: EASE,
      onUpdate: (v) => setShown(v.toFixed(decimals).replace(".", sep)),
      onComplete: () => setShown(raw),
    });
    return () => controls.stop();
  }, [inView, raw, reduce]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      whileHover={reduce ? undefined : { y: -6 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="group relative rounded-2xl bg-gradient-to-br from-pink-300 via-rose-200 to-pink-100 p-px shadow-lg shadow-pink-200/50 transition-shadow duration-300 hover:shadow-xl hover:shadow-pink-300/60"
    >
      <div className="relative h-full overflow-hidden rounded-[15px] bg-white/80 p-6 text-center backdrop-blur-md">
        {/* توهجات لونية */}
        <span
          aria-hidden
          className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-pink-300/30 blur-2xl transition-transform duration-700 group-hover:scale-150"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute -bottom-10 -left-10 h-28 w-28 rounded-full bg-rose-300/25 blur-2xl"
        />
        {/* لمعة تعبر البطاقة عند التمرير */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/70 to-transparent transition-transform duration-700 group-hover:translate-x-full"
        />

        <div className="relative inline-block bg-gradient-to-l from-pink-600 to-rose-500 bg-clip-text text-4xl font-extrabold tabular-nums text-transparent md:text-5xl">
          {raw ? prefix : null}
          {shown}
          <span className="text-2xl">
            {raw ? rest : ""}
            {suffix}
          </span>
        </div>

        <motion.span
          aria-hidden
          initial={{ scaleX: 0 }}
          animate={{ scaleX: inView ? 1 : 0 }}
          transition={{ delay: 0.4, duration: 0.7, ease: EASE }}
          className="mx-auto mt-3 block h-1 w-12 origin-center rounded-full bg-gradient-to-l from-pink-500 to-rose-400"
        />

        <p className="relative mt-3 text-sm font-medium text-gray-600 md:text-base">
          {label}
        </p>
      </div>
    </motion.div>
  );
}
