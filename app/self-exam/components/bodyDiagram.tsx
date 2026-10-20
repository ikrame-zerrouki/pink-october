"use client";

import { motion } from "framer-motion";

/**
 * رسم SVG توضيحي للثدي والحلمة والغدد الليمفاوية
 * يتحرك حسب الخطوة النشطة
 */
export default function BodyDiagram({ step }: { step: number }) {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <svg viewBox="0 0 300 380" className="w-full h-auto">
        {/* خلفية ناعمة */}
        <defs>
          <radialGradient id="bgGrad" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#FCE7F3" />
            <stop offset="100%" stopColor="#FDF2F8" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FBCFE8" />
            <stop offset="100%" stopColor="#F9A8D4" />
          </linearGradient>
        </defs>

        <ellipse cx="150" cy="180" rx="140" ry="160" fill="url(#bgGrad)" />

        {/* الجذع */}
        <path
          d="M100 60 Q100 40 150 40 Q200 40 200 60 L210 300 Q150 320 90 300 Z"
          fill="url(#bodyGrad)"
          opacity="0.4"
        />

        {/* الثدي الأيمن */}
        <motion.ellipse
          cx="110"
          cy="180"
          rx="48"
          ry="52"
          fill="#F9A8D4"
          opacity="0.7"
          animate={{
            opacity: step >= 1 ? 0.7 : 0.4,
            scale: step === 1 ? [1, 1.05, 1] : 1,
          }}
          transition={{
            duration: 1.5,
            repeat: step === 1 ? Infinity : 0,
          }}
        />

        {/* الثدي الأيسر */}
        <motion.ellipse
          cx="190"
          cy="180"
          rx="48"
          ry="52"
          fill="#F9A8D4"
          opacity="0.7"
          animate={{
            opacity: step >= 1 ? 0.7 : 0.4,
            scale: step === 1 ? [1, 1.05, 1] : 1,
          }}
          transition={{
            duration: 1.5,
            repeat: step === 1 ? Infinity : 0,
            delay: 0.3,
          }}
        />

        {/* الحلمة اليمنى */}
        <motion.circle
          cx="110"
          cy="180"
          r="8"
          fill="#DB2777"
          animate={{
            r: step === 2 ? [8, 11, 8] : 8,
          }}
          transition={{ duration: 1.2, repeat: step === 2 ? Infinity : 0 }}
        />

        {/* الحلمة اليسرى */}
        <motion.circle
          cx="190"
          cy="180"
          r="8"
          fill="#DB2777"
          animate={{
            r: step === 2 ? [8, 11, 8] : 8,
          }}
          transition={{
            duration: 1.2,
            repeat: step === 2 ? Infinity : 0,
            delay: 0.3,
          }}
        />

        {/* خطوط الفحص الدائرية */}
        {step === 3 && (
          <>
            <motion.path
              d="M110 180 m -40 0 a 40 40 0 1 1 80 0 a 40 40 0 1 1 -80 0"
              stroke="#DB2777"
              strokeWidth="2"
              fill="none"
              strokeDasharray="4 4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.path
              d="M190 180 m -40 0 a 40 40 0 1 1 80 0 a 40 40 0 1 1 -80 0"
              stroke="#DB2777"
              strokeWidth="2"
              fill="none"
              strokeDasharray="4 4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
            />
          </>
        )}

        {/* الغدد الليمفاوية */}
        {[0, 1, 2].map((i) => (
          <motion.circle
            key={i}
            cx={i === 0 ? 70 : i === 1 ? 230 : 150}
            cy={i === 2 ? 250 : 140 + i * 10}
            r="6"
            fill="#BE185D"
            animate={{
              opacity: step === 4 ? [0.3, 1, 0.3] : 0.5,
              r: step === 4 ? [6, 9, 6] : 6,
            }}
            transition={{
              duration: 1.5,
              repeat: step === 4 ? Infinity : 0,
              delay: i * 0.3,
            }}
          />
        ))}

        {/* عناوين */}
        <text x="110" y="290" textAnchor="middle" fontSize="9" fill="#9D174D" fontWeight="600">
          الثدي الأيمن
        </text>
        <text x="190" y="290" textAnchor="middle" fontSize="9" fill="#9D174D" fontWeight="600">
          الثدي الأيسر
        </text>
        <text x="150" y="340" textAnchor="middle" fontSize="8" fill="#BE185D">
          ⬆ منطقة الغدد الليمفاوية
        </text>
      </svg>

      {/* مؤشر الخطوة الحالية */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-xs font-bold text-pink-600 shadow-lg">
        خطوة {step} من 5
      </div>
    </div>
  );
}