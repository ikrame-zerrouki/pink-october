"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Clock, CheckCircle2, Info } from "lucide-react";

export default function ExamCard({
  icon,
  title,
  subtitle,
  color,
  duration,
  what,
  when,
  how,
  pros,
  cons,
  index,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  color: string;
  duration: string;
  what: string;
  when: string;
  how: string;
  pros: string[];
  cons: string[];
  index: number;
}) {
  const [open, setOpen] = useState(index === 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className={`bg-white rounded-2xl border-2 transition-all overflow-hidden ${
        open ? "border-pink-300 shadow-xl" : "border-gray-100 shadow-md"
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-4 p-6 text-right"
      >
        <div
          className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} text-white flex items-center justify-center flex-shrink-0 shadow-lg`}
        >
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900">
            {title}
          </h3>
          <p className="text-sm text-gray-600 mt-0.5">{subtitle}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden md:inline-flex items-center gap-1.5 text-xs font-semibold bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full">
            <Clock className="w-3.5 h-3.5" />
            {duration}
          </span>
          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            className="text-gray-400"
          >
            <ChevronDown className="w-6 h-6" />
          </motion.div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-0 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-pink-50/50 rounded-xl p-4">
                  <p className="text-xs uppercase tracking-widest text-pink-600 font-bold mb-1">
                    ما هو؟
                  </p>
                  <p className="text-gray-800 text-sm leading-relaxed">
                    {what}
                  </p>
                </div>
                <div className="bg-purple-50/50 rounded-xl p-4">
                  <p className="text-xs uppercase tracking-widest text-purple-600 font-bold mb-1">
                    متى يُجرى؟
                  </p>
                  <p className="text-gray-800 text-sm leading-relaxed">
                    {when}
                  </p>
                </div>
              </div>

              <div className="bg-teal-50/50 rounded-xl p-4">
                <p className="text-xs uppercase tracking-widest text-teal-600 font-bold mb-1">
                  كيف يتم؟
                </p>
                <p className="text-gray-800 text-sm leading-relaxed">{how}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-50 rounded-xl p-4">
                  <p className="text-xs uppercase tracking-widest text-green-700 font-bold mb-2">
                    المميزات
                  </p>
                  <ul className="space-y-1.5">
                    {pros.map((p) => (
                      <li
                        key={p}
                        className="flex items-start gap-2 text-sm text-gray-800"
                      >
                        <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-amber-50 rounded-xl p-4">
                  <p className="text-xs uppercase tracking-widest text-amber-700 font-bold mb-2">
                    ملاحظات
                  </p>
                  <ul className="space-y-1.5">
                    {cons.map((c) => (
                      <li
                        key={c}
                        className="flex items-start gap-2 text-sm text-gray-800"
                      >
                        <Info className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}