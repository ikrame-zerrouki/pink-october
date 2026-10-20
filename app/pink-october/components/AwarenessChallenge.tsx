"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Check, Share2, Sparkles } from "lucide-react";

const challenges = [
  "غيّرتِ صورة بروفايلك لشريط وردي",
  "تحدثتِ مع أمك/أختك/صديقتك عن الفحص الذاتي",
  "علقتِ شريطاً وردياً في مكان بارز",
  "شاركتِ منشوراً توعوياً موثوقاً",
  "قرأتِ مقالاً عن سرطان الثدي",
  "حجزتِ موعد فحص طبي",
  "تبرعتِ لجمعية توعية",
  "حضرتِ فعالية أو ندوة توعية",
];

export default function AwarenessChallenge() {
  const [done, setDone] = useState<number[]>([]);
  const [shared, setShared] = useState(false);

  const toggle = (i: number) => {
    setDone((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
    );
  };

  const progress = (done.length / challenges.length) * 100;

  const handleShare = async () => {
    const text = `أكملت ${done.length}/${challenges.length} من تحديات أكتوبر الوردي 🎗️\nهل تجرؤين على التحدي؟`;
    if (navigator.share) {
      try {
        await navigator.share({ title: "تحدي أكتوبر الوردي", text });
      } catch {}
    } else {
      await navigator.clipboard.writeText(text);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 border border-pink-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 text-white flex items-center justify-center shadow-lg">
            <Trophy className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">تحدي التوعية</h3>
            <p className="text-sm text-gray-600">أكملي التحديات وشاركي</p>
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-pink-600">
            {done.length}/{challenges.length}
          </div>
          <div className="text-xs text-gray-600">مكتملة</div>
        </div>
      </div>

      <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden mb-6">
        <motion.div
          className="h-full bg-gradient-to-l from-pink-500 to-rose-400 rounded-full"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      <ul className="space-y-2 mb-6">
        {challenges.map((c, i) => {
          const isDone = done.includes(i);
          return (
            <li key={c}>
              <button
                onClick={() => toggle(i)}
                className={`w-full flex items-center gap-3 text-right p-3 rounded-xl transition-all ${
                  isDone
                    ? "bg-green-50 border border-green-200"
                    : "hover:bg-gray-50 border border-transparent"
                }`}
              >
                <span
                  className={`flex-shrink-0 w-6 h-6 rounded-md border-2 flex items-center justify-center transition ${
                    isDone ? "bg-green-500 border-green-500" : "border-gray-300"
                  }`}
                >
                  {isDone && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
                </span>
                <span
                  className={`text-sm ${
                    isDone ? "text-green-900 line-through" : "text-gray-800"
                  }`}
                >
                  {c}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <button
        onClick={handleShare}
        className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-l from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold py-3.5 rounded-xl transition shadow-lg"
      >
        {shared ? (
          <>
            <Check className="w-5 h-5" />
            تم النسخ!
          </>
        ) : (
          <>
            <Share2 className="w-5 h-5" />
            شاركي نتيجتك
          </>
        )}
      </button>

      <AnimatePresence>
        {done.length === challenges.length && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 bg-gradient-to-l from-amber-500 to-yellow-400 text-white rounded-2xl p-5 text-center"
          >
            <Sparkles className="w-8 h-8 mx-auto mb-2" />
            <p className="font-bold">🏆 تحدٍّ مكتمل!</p>
            <p className="text-sm opacity-90">أنتِ سفيرة توعية حقيقية</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}