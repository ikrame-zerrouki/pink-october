"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const D = "font-[family-name:var(--font-display)]";
const FOCUS =
  "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-pink-300";

type Region = "arab" | "world";

/* Country codes replace flag emojis: flags don't render on Windows. */
const countries: { code: string; country: string; region: Region; event: string }[] = [
  { code: "SA", country: "السعودية", region: "arab", event: "حملات توعية في المراكز التجارية والمستشفيات، وإضاءة المباني بالوردي." },
  { code: "AE", country: "الإمارات", region: "arab", event: "فعاليات «وردي دبي» مع مبادرات فحص مجانية." },
  { code: "EG", country: "مصر", region: "arab", event: "حملات «الكشف المبكر» في الجامعات والميادين العامة." },
  { code: "MA", country: "المغرب", region: "arab", event: "مسيرات توعوية وإضاءة معالم بالوردي." },
  { code: "JO", country: "الأردن", region: "arab", event: "مبادرات «زهرة» و«شجاعة» لدعم المصابات." },
  { code: "FR", country: "فرنسا", region: "world", event: "«أكتوبر الوردي»: إضاءة برج إيفل بالوردي." },
  { code: "US", country: "أمريكا", region: "world", event: "لاعبون وحكام في دوري كرة القدم الأمريكية يرتدون الوردي طوال الشهر." },
  { code: "GB", country: "بريطانيا", region: "world", event: "«Wear It Pink»: يوم وطني لارتداء الوردي." },
];

const TABS: { id: "all" | Region; label: string }[] = [
  { id: "all", label: "الكل" },
  { id: "arab", label: "العالم العربي" },
  { id: "world", label: "حول العالم" },
];

/* a passport-style stamp */
function Stamp({ code }: { code: string }) {
  return (
    <span
      aria-hidden
      className="relative flex h-[72px] w-[72px] flex-shrink-0 -rotate-6 items-center justify-center rounded-full border-2 border-dashed border-pink-300 transition-transform duration-300 group-hover:rotate-0 group-hover:scale-105"
    >
      <span className="flex h-[58px] w-[58px] items-center justify-center rounded-full border-2 border-pink-500 bg-pink-50">
        <span className={`${D} text-2xl font-bold leading-none text-pink-600`} dir="ltr">
          {code}
        </span>
      </span>
    </span>
  );
}

export default function WorldCelebrations() {
  const [tab, setTab] = useState<"all" | Region>("all");
  const list = countries.filter((c) => tab === "all" || c.region === tab);

  return (
    <div>
      {/* filter */}
      <div
        role="tablist"
        aria-label="تصفية الدول"
        className="mx-auto mb-10 flex w-fit gap-1 rounded-full bg-white p-1.5 shadow-lg ring-1 ring-pink-100"
      >
        {TABS.map((t) => {
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              role="tab"
              aria-selected={active}
              onClick={() => setTab(t.id)}
              className={`relative rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${FOCUS} ${
                active ? "text-white" : "text-gray-600 hover:text-pink-700"
              }`}
            >
              {active && (
                <motion.span
                  layoutId="world-tab"
                  className="absolute inset-0 rounded-full bg-gradient-to-l from-pink-500 to-rose-500 shadow-md"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative">{t.label}</span>
            </button>
          );
        })}
      </div>

      <motion.div layout className="grid md:grid-cols-2 gap-4">
        <AnimatePresence mode="popLayout">
          {list.map((c) => (
            <motion.article
              key={c.country}
              layout
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.3 }}
              className="group relative flex items-center gap-5 overflow-hidden rounded-3xl bg-white p-5 ps-7 shadow-md ring-1 ring-pink-100 transition-shadow hover:shadow-xl"
            >
              <span
                aria-hidden
                className="absolute inset-y-4 start-0 w-1.5 rounded-full bg-gradient-to-b from-pink-400 to-rose-500"
              />
              <Stamp code={c.code} />
              <div>
                <h3 className={`${D} text-2xl font-bold text-gray-900 leading-snug`}>
                  {c.country}
                </h3>
                <p className="mt-1 text-sm text-gray-600 leading-loose">{c.event}</p>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
