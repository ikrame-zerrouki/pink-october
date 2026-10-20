"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, ChevronDown, X } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

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
  const reduce = !!useReducedMotion();
  const panelId = useId();
  const number = String(index + 1).padStart(2, "0");

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={reduce ? undefined : { y: -4 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.6, ease: EASE }}
      className={`group relative overflow-hidden rounded-3xl border bg-white transition-shadow duration-500 ${
        open
          ? "border-emerald-200 shadow-xl shadow-emerald-100/70"
          : "border-gray-100 shadow-md hover:shadow-xl hover:shadow-rose-100/70"
      }`}
    >
      {/* شريط جانبي يتحول من الأحمر إلى الأخضر */}
      <span
        aria-hidden
        className={`absolute inset-y-0 right-0 w-1.5 bg-gradient-to-b from-rose-400 to-red-500 transition-opacity duration-500 ${
          open ? "opacity-0" : "opacity-100"
        }`}
      />
      <span
        aria-hidden
        className={`absolute inset-y-0 right-0 w-1.5 bg-gradient-to-b from-emerald-400 to-teal-500 transition-opacity duration-500 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* توهج خلفي + رقم شفاف */}
      <span
        aria-hidden
        className={`pointer-events-none absolute -left-12 -top-12 h-44 w-44 rounded-full blur-3xl transition-colors duration-700 ${
          open ? "bg-emerald-300/30" : "bg-rose-300/20"
        }`}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-5 select-none text-7xl font-black leading-none tabular-nums text-gray-100/90"
      >
        {number}
      </span>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={panelId}
        className="relative z-10 flex w-full items-start gap-4 rounded-3xl p-6 pr-7 text-right focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-rose-400"
      >
        {/* الأيقونة تنقلب من ✕ إلى ✓ */}
        <span
          className={`relative mt-0.5 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full text-white shadow-lg ring-4 transition-all duration-500 ${
            open
              ? "bg-gradient-to-br from-emerald-400 to-teal-500 shadow-emerald-500/30 ring-emerald-100"
              : "bg-gradient-to-br from-rose-500 to-red-600 shadow-red-500/30 ring-red-100"
          }`}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={open ? "check" : "x"}
              initial={reduce ? false : { scale: 0, rotate: -90, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={reduce ? undefined : { scale: 0, rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex"
            >
              {open ? (
                <Check className="h-5 w-5" strokeWidth={3} />
              ) : (
                <X className="h-5 w-5" strokeWidth={3} />
              )}
            </motion.span>
          </AnimatePresence>
        </span>

        <div className="flex-1">
          <span
            className={`mb-2 inline-block rounded-full px-3 py-0.5 text-xs font-bold tracking-wide transition-colors duration-500 ${
              open ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-600"
            }`}
          >
            {open ? "خرافة مُفنَّدة" : "خرافة"}
          </span>

          {/* تُشطَب الخرافة عند كشف الحقيقة */}
          <p
            className={`text-lg font-medium leading-relaxed transition-colors duration-500 ${
              open
                ? "text-gray-400 line-through decoration-red-400/60 decoration-2"
                : "text-gray-800"
            }`}
          >
            {myth}
          </p>

          <span
            className={`block overflow-hidden text-xs text-gray-400 transition-all duration-300 ${
              open ? "mt-0 h-0 opacity-0" : "mt-2 h-4 opacity-100"
            }`}
          >
            اضغط لكشف الحقيقة
          </span>
        </div>

        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: reduce ? 0 : 0.35, ease: EASE }}
          className="mt-1.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-50 text-gray-400 transition-colors group-hover:bg-gray-100"
        >
          <ChevronDown className="h-5 w-5" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            aria-label="الحقيقة"
            key="fact"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.45, ease: EASE }}
            className="relative z-10 overflow-hidden"
          >
            <div className="px-6 pb-6">
              <motion.div
                initial={reduce ? false : { y: 14, scale: 0.97 }}
                animate={{ y: 0, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.5, ease: EASE }}
                className="relative flex items-start gap-4 overflow-hidden rounded-2xl border border-emerald-200 bg-gradient-to-l from-emerald-50 via-green-50 to-white p-5"
              >
                {/* لمعة تعبر البطاقة مرة واحدة */}
                {!reduce && (
                  <motion.span
                    aria-hidden
                    initial={{ x: "-120%" }}
                    animate={{ x: "450%" }}
                    transition={{ delay: 0.35, duration: 1, ease: "easeInOut" }}
                    className="pointer-events-none absolute inset-y-0 left-0 w-1/3 skew-x-12 bg-gradient-to-r from-transparent via-white/80 to-transparent"
                  />
                )}

                <span className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-white shadow-md shadow-emerald-500/30">
                  <Check className="h-5 w-5" strokeWidth={3} />
                </span>
                <div className="relative">
                  <span className="mb-1 block text-xs font-bold uppercase tracking-widest text-emerald-600">
                    الحقيقة
                  </span>
                  <p className="leading-relaxed text-gray-800">{fact}</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}
