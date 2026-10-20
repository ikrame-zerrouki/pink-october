"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Check } from "lucide-react";

export default function ReminderForm() {
  const [email, setEmail] = useState("");
  const [day, setDay] = useState("1");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSent(true);
    // هنا يمكنك ربط API حقيقي لاحقاً
  };

  return (
    <div className="relative bg-gradient-to-br from-pink-600 via-rose-500 to-pink-500 text-white rounded-3xl p-8 md:p-10 shadow-2xl overflow-hidden">
      <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
      <div className="relative">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl mb-5">
          <Bell className="w-7 h-7" />
        </div>
        <h3 className="text-2xl md:text-3xl font-bold mb-2">
          تذكير شهري بالفحص
        </h3>
        <p className="opacity-90 mb-6 leading-relaxed">
          سنرسل لكِ تذكيراً ودياً كل شهر في اليوم الذي تختارينه.
        </p>

        <AnimatePresence mode="wait">
          {!sent ? (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="space-y-3"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="بريدك الإلكتروني"
                className="w-full px-5 py-3.5 rounded-xl bg-white/95 text-gray-900 placeholder-gray-500 outline-none focus:ring-4 focus:ring-white/30"
              />
              <div className="flex gap-3">
                <select
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                  className="px-4 py-3.5 rounded-xl bg-white/95 text-gray-900 outline-none focus:ring-4 focus:ring-white/30 font-semibold"
                >
                  {Array.from({ length: 28 }, (_, i) => i + 1).map((d) => (
                    <option key={d} value={d}>
                      يوم {d}
                    </option>
                  ))}
                </select>
                <button
                  type="submit"
                  className="flex-1 bg-white text-pink-600 font-bold py-3.5 rounded-xl hover:bg-pink-100 transition shadow-lg"
                >
                  فعّلي التذكير
                </button>
              </div>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/20 backdrop-blur-md rounded-2xl p-6 flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-white text-pink-600 flex items-center justify-center flex-shrink-0">
                <Check className="w-6 h-6" strokeWidth={3} />
              </div>
              <div>
                <p className="font-bold text-lg">تم التفعيل ✓</p>
                <p className="text-sm opacity-90">
                  سنذكّركِ يوم {day} من كل شهر
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}