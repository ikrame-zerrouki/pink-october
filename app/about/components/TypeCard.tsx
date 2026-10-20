"use client";

import { motion } from "framer-motion";
import { RibbonIcon } from "./icons";

export default function TypeCard({
  title,
  desc,
  percentage,
  color,
}: {
  title: string;
  desc: string;
  percentage?: string;
  color: string;
}) {
  // الشريط يظهر فقط للنسبة الدقيقة مثل "80%" وليس للمدى مثل "1-5%"
  const exact = percentage?.match(/^(\d+(?:\.\d+)?)%$/);
  const pct = exact ? parseFloat(exact[1]) : null;

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-6 shadow-md transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl">
      {/* توهج لوني */}
      <div
        aria-hidden
        className={`absolute -right-8 -top-8 h-40 w-40 rounded-full opacity-15 blur-2xl transition-all duration-500 group-hover:scale-125 group-hover:opacity-30 ${color}`}
      />
      {/* شريط توعية كبير شفاف في الخلفية */}
      <RibbonIcon className="pointer-events-none absolute -bottom-8 -left-8 h-36 w-36 -rotate-12 text-gray-100 transition-all duration-700 group-hover:rotate-0 group-hover:scale-110" />

      <div className="relative">
        <div className="mb-5 flex items-start justify-between">
          <div className="relative">
            <span
              aria-hidden
              className={`absolute inset-0 rounded-2xl opacity-40 blur-lg transition-opacity duration-500 group-hover:opacity-70 ${color}`}
            />
            <span
              className={`relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl text-white shadow-lg transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110 ${color}`}
            >
              <span
                aria-hidden
                className="absolute inset-0 bg-gradient-to-br from-white/35 via-transparent to-black/10"
              />
              <RibbonIcon className="relative h-7 w-7" />
            </span>
          </div>

          {percentage && (
            <span className="rounded-full border border-pink-200 bg-pink-50 px-3 py-1 text-xs font-bold text-pink-700 shadow-sm">
              {percentage}
            </span>
          )}
        </div>

        <h3 className="mb-2 text-xl font-bold text-gray-900">{title}</h3>
        <p className="text-sm leading-relaxed text-gray-600">{desc}</p>

        {pct !== null && (
          <div className="mt-5">
            <div className="h-1.5 overflow-hidden rounded-full bg-gray-100">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: pct / 100 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className={`h-full origin-right rounded-full ${color}`}
              />
            </div>
            <span className="mt-1.5 block text-xs text-gray-400">
              من إجمالي الحالات
            </span>
          </div>
        )}
      </div>
    </div>
  );
}