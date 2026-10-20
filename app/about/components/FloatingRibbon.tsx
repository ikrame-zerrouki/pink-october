"use client";

import { useEffect, useId } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

/* ───────────────────────── الإعدادات ───────────────────────── */

type DropConfig = {
  size: number;
  top: string;
  left: string;
  depth: number; // قوة تأثير حركة الماوس (Parallax)
  duration: number;
  delay: number;
  from: string;
  to: string;
};

const DROPS: DropConfig[] = [
  { size: 70, top: "8%", left: "6%", depth: 14, duration: 7, delay: 0, from: "#a78bfa", to: "#f0abfc" },
  { size: 110, top: "22%", left: "78%", depth: 28, duration: 9, delay: 0.6, from: "#67e8f9", to: "#a5b4fc" },
  { size: 55, top: "62%", left: "12%", depth: 10, duration: 6, delay: 1.2, from: "#fda4af", to: "#fcd34d" },
  { size: 140, top: "58%", left: "62%", depth: 36, duration: 11, delay: 0.3, from: "#c4b5fd", to: "#67e8f9" },
  { size: 80, top: "80%", left: "36%", depth: 18, duration: 8, delay: 1.8, from: "#f0abfc", to: "#fda4af" },
  { size: 48, top: "38%", left: "40%", depth: 8, duration: 7.5, delay: 2.2, from: "#a5b4fc", to: "#f0abfc" },
];

const SPARKLES = [
  { top: "14%", left: "30%", s: 3, d: 3.2 },
  { top: "28%", left: "88%", s: 2, d: 4.1 },
  { top: "46%", left: "8%", s: 4, d: 3.6 },
  { top: "70%", left: "52%", s: 3, d: 4.8 },
  { top: "86%", left: "84%", s: 2, d: 3.9 },
  { top: "10%", left: "62%", s: 2, d: 5.2 },
  { top: "54%", left: "92%", s: 3, d: 4.4 },
  { top: "92%", left: "14%", s: 2, d: 3.4 },
];

const DROP_PATH = "M12 2c-3 4-6 7-6 11a6 6 0 0 0 12 0c0-4-3-7-6-11z";

/* ───────────────────────── قطرة عائمة ───────────────────────── */

function Drop({
  cfg,
  mx,
  my,
  still,
}: {
  cfg: DropConfig;
  mx: MotionValue<number>;
  my: MotionValue<number>;
  still: boolean;
}) {
  const uid = useId().replace(/:/g, "");
  const x = useTransform(mx, (v) => v * cfg.depth);
  const y = useTransform(my, (v) => v * cfg.depth);

  return (
    <motion.div
      className="absolute"
      style={{ top: cfg.top, left: cfg.left, width: cfg.size, height: cfg.size, x, y }}
    >
      <motion.svg
        viewBox="0 0 24 24"
        className="h-full w-full"
        style={{ filter: `drop-shadow(0 0 ${cfg.size / 6}px ${cfg.from}66)` }}
        fill="none"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={
          still
            ? { opacity: 0.7, scale: 1 }
            : {
                opacity: [0.35, 0.8, 0.35],
                scale: [1, 1.08, 1],
                y: [0, -26, 0],
                rotate: [-4, 6, -4],
              }
        }
        transition={{
          duration: cfg.duration,
          delay: cfg.delay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <defs>
          <linearGradient id={`s-${uid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={cfg.from} />
            <stop offset="100%" stopColor={cfg.to} />
          </linearGradient>
          <radialGradient id={`f-${uid}`} cx="35%" cy="30%" r="80%">
            <stop offset="0%" stopColor={cfg.to} stopOpacity="0.45" />
            <stop offset="60%" stopColor={cfg.from} stopOpacity="0.12" />
            <stop offset="100%" stopColor={cfg.from} stopOpacity="0" />
          </radialGradient>
        </defs>
        <path d={DROP_PATH} fill={`url(#f-${uid})`} stroke={`url(#s-${uid})`} strokeWidth="0.6" />
        {/* لمعة زجاجية */}
        <path
          d="M9 8.5c-1 1.6-1.8 2.9-1.8 4.3"
          stroke="#fff"
          strokeOpacity="0.55"
          strokeWidth="0.5"
          strokeLinecap="round"
        />
      </motion.svg>
    </motion.div>
  );
}

/* ───────────────────────── المكوّن الرئيسي ───────────────────────── */

export default function FloatingRibbon() {
  const reduce = !!useReducedMotion();

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mx = useSpring(rawX, { stiffness: 40, damping: 18 });
  const my = useSpring(rawY, { stiffness: 40, damping: 18 });

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX / window.innerWidth - 0.5);
      rawY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduce, rawX, rawY]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* 1) توهّج الأورورا في الخلفية */}
      <motion.div
        className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-violet-500/25 blur-3xl"
        animate={reduce ? undefined : { x: [0, 60, 0], y: [0, 40, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-20 top-1/3 h-[26rem] w-[26rem] rounded-full bg-cyan-400/20 blur-3xl"
        animate={reduce ? undefined : { x: [0, -50, 0], y: [0, -30, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 17, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="absolute -bottom-28 left-1/3 h-80 w-80 rounded-full bg-fuchsia-500/20 blur-3xl"
        animate={reduce ? undefined : { x: [0, 40, 0], y: [0, -50, 0], scale: [1, 1.25, 1] }}
        transition={{ duration: 19, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* 2) شريط متدفّق يرسم نفسه */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1200 800"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          <linearGradient id="ribbon-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#a78bfa" stopOpacity="0" />
            <stop offset="35%" stopColor="#f0abfc" stopOpacity="0.7" />
            <stop offset="70%" stopColor="#67e8f9" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#67e8f9" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0, 1].map((n) => (
          <motion.path
            key={n}
            d={
              n === 0
                ? "M-50 430 C 150 220, 350 620, 560 390 S 920 190, 1250 430"
                : "M-50 500 C 180 330, 380 700, 600 470 S 940 290, 1250 520"
            }
            stroke="url(#ribbon-grad)"
            strokeWidth={n === 0 ? 1.6 : 0.9}
            strokeLinecap="round"
            initial={{ pathLength: 0, pathOffset: 0, opacity: 0 }}
            animate={
              reduce
                ? { pathLength: 1, opacity: 0.5 }
                : { pathLength: [0, 0.6, 0.6], pathOffset: [0, 0, 1], opacity: [0, 0.9, 0] }
            }
            transition={{
              duration: 9,
              delay: n * 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>

      {/* 3) القطرات الزجاجية مع تأثير العمق */}
      {DROPS.map((cfg, i) => (
        <Drop key={i} cfg={cfg} mx={mx} my={my} still={reduce} />
      ))}

      {/* 4) نجيمات متلألئة */}
      {SPARKLES.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            top: p.top,
            left: p.left,
            width: p.s,
            height: p.s,
            boxShadow: "0 0 8px 2px rgba(255,255,255,0.6)",
          }}
          animate={reduce ? { opacity: 0.5 } : { opacity: [0, 1, 0], scale: [0.6, 1.4, 0.6] }}
          transition={{ duration: p.d, delay: i * 0.45, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
