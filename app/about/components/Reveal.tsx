"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

/**
 * يُظهر المحتوى بنعومة عند دخوله الشاشة.
 * direction = الاتجاه الذي يأتي منه العنصر (up = يصعد من الأسفل).
 * الاستخدام القديم <Reveal delay y> يعمل كما كان.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 40,
  direction = "up",
  blur = true,
  scale = 0.97,
  duration = 0.8,
  once = true,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  direction?: Direction;
  blur?: boolean;
  scale?: number;
  duration?: number;
  once?: boolean;
  className?: string;
}) {
  const reduce = useReducedMotion();

  const from = {
    up: { x: 0, y },
    down: { x: 0, y: -y },
    left: { x: -y, y: 0 },
    right: { x: y, y: 0 },
    none: { x: 0, y: 0 },
  }[direction];

  return (
    <motion.div
      className={className}
      initial={
        reduce
          ? { opacity: 0 }
          : {
              opacity: 0,
              ...from,
              scale,
              filter: blur ? "blur(10px)" : "blur(0px)",
            }
      }
      whileInView={
        reduce
          ? { opacity: 1 }
          : { opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" }
      }
      viewport={{ once, margin: "-80px" }}
      transition={{
        duration: reduce ? 0.2 : duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
