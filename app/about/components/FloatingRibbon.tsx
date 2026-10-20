"use client";

import { motion } from "framer-motion";

export default function FloatingRibbon() {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden
    >
      {[...Array(6)].map((_, i) => (
        <motion.svg
          key={i}
          viewBox="0 0 24 24"
          className="absolute text-white/10"
          style={{
            width: 60 + i * 30,
            height: 60 + i * 30,
            top: `${10 + i * 12}%`,
            left: `${5 + i * 15}%`,
          }}
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          initial={{ y: 0, rotate: 0 }}
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{
            duration: 6 + i,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <path d="M12 2c-3 4-6 7-6 11a6 6 0 0 0 12 0c0-4-3-7-6-11z" />
        </motion.svg>
      ))}
    </motion.div>
  );
}