"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Sparkles } from "lucide-react";

function getNextOctober() {
  const now = new Date();
  const year = now.getMonth() > 9 ? now.getFullYear() + 1 : now.getFullYear();
  return new Date(year, 9, 1); // 1 أكتوبر
}

function isOctober() {
  return new Date().getMonth() === 9;
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [celebrating, setCelebrating] = useState(false);

  useEffect(() => {
    const calc = () => {
      const now = new Date();
      if (isOctober()) {
        setCelebrating(true);
        return;
      }
      const target = getNextOctober();
      const diff = target.getTime() - now.getTime();
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    calc();
    const interval = setInterval(calc, 1000);
    return () => clearInterval(interval);
  }, []);

  if (celebrating) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-l from-pink-500 to-rose-500 text-white rounded-3xl p-8 text-center shadow-2xl max-w-2xl mx-auto"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-6xl mb-4"
        >
          🎉
        </motion.div>
        <h3 className="text-3xl font-bold mb-2">نحن في شهر أكتوبر الوردي!</h3>
        <p className="text-lg opacity-95">
          شهر التوعية العالمي بسرطان الثدي — شاركي، تعلّمي، وادعمي.
        </p>
      </motion.div>
    );
  }

  const units = [
    { value: timeLeft.days, label: "يوم" },
    { value: timeLeft.hours, label: "ساعة" },
    { value: timeLeft.minutes, label: "دقيقة" },
    { value: timeLeft.seconds, label: "ثانية" },
  ];

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 border border-pink-100 max-w-2xl mx-auto text-center">
      <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
        <Calendar className="w-4 h-4" />
        العد التنازلي لأكتوبر الوردي
      </div>
      <div className="grid grid-cols-4 gap-3 mt-6">
        {units.map((u) => (
          <div
            key={u.label}
            className="bg-gradient-to-br from-pink-500 to-rose-500 text-white rounded-2xl p-4"
          >
            <div className="text-3xl md:text-4xl font-bold tabular-nums">
              {String(u.value).padStart(2, "0")}
            </div>
            <div className="text-xs opacity-90 mt-1">{u.label}</div>
          </div>
        ))}
      </div>
      <p className="text-sm text-gray-600 mt-6 flex items-center justify-center gap-2">
        <Sparkles className="w-4 h-4 text-pink-500" />
        استعدّي للمشاركة في الشهر الوردي القادم
      </p>
    </div>
  );
}