"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, ChevronDown } from "lucide-react";

export default function MythCard({
  myth,
  fact,
  index,
}: {
  myth: string;
  fact: string;
  index: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow border border-gray-100 overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-right p-6 flex items-start gap-4"
      >
        <span className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
          <X className="w-5 h-5" strokeWidth={3} />
        </span>
        <div className="flex-1">
          <span className="text-xs font-bold tracking-widest uppercase text-red-500 block mb-1">
            خرافة
          </span>
          <p className="text-lg text-gray-800 font-medium leading-relaxed">
            {myth}
          </p>
        </div>
        <motion.div animate={{ rotate: open ? 180 : 0 }} className="flex-shrink-0 text-gray-400 mt-2">
          <ChevronDown className="w-5 h-5" />
        </motion.div>
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
            <div className="px-6 pb-6 pt-0">
              <div className="flex items-start gap-4 bg-gradient-to-l from-green-50 to-emerald-50 rounded-xl p-5 border border-green-200">
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center">
                  <Check className="w-5 h-5" strokeWidth={3} />
                </span>
                <div>
                  <span className="text-xs font-bold tracking-widest uppercase text-green-600 block mb-1">
                    الحقيقة
                  </span>
                  <p className="text-gray-800 leading-relaxed">{fact}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}