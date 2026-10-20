"use client";

import { motion } from "framer-motion";

const data = [
  {
    age: "20–29",
    color: "from-teal-500 to-cyan-500",
    exams: ["فحص ذاتي شهري", "فحص سريري كل 3 سنوات", "—"],
  },
  {
    age: "30–39",
    color: "from-pink-500 to-rose-500",
    exams: ["فحص ذاتي شهري", "فحص سريري كل 1–3 سنوات", "موجات صوتية عند الحاجة"],
  },
  {
    age: "40–49",
    color: "from-purple-500 to-fuchsia-500",
    exams: ["فحص ذاتي شهري", "فحص سريري سنوي", "ماموجرام كل 1–2 سنة"],
  },
  {
    age: "50+",
    color: "from-rose-500 to-orange-400",
    exams: ["فحص ذاتي شهري", "فحص سريري سنوي", "ماموجرام كل 1–2 سنة"],
  },
];

export default function RecommendationTable() {
  return (
    <div className="bg-white rounded-3xl shadow-xl border border-pink-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="bg-gradient-to-l from-pink-600 to-rose-500 text-white">
              <th className="p-4 text-right font-bold">الفئة العمرية</th>
              <th className="p-4 text-right font-bold">الفحص الذاتي</th>
              <th className="p-4 text-right font-bold">الفحص السريري</th>
              <th className="p-4 text-right font-bold">الماموجرام</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <motion.tr
                key={row.age}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`${i % 2 === 0 ? "bg-white" : "bg-pink-50/30"} hover:bg-pink-50 transition`}
              >
                <td className="p-4">
                  <span
                    className={`inline-block bg-gradient-to-l ${row.color} text-white text-sm font-bold px-4 py-2 rounded-full`}
                  >
                    {row.age}
                  </span>
                </td>
                {row.exams.map((e, j) => (
                  <td
                    key={j}
                    className="p-4 text-sm font-medium text-gray-800 text-right"
                  >
                    {e === "—" ? (
                      <span className="text-gray-400">—</span>
                    ) : (
                      e
                    )}
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-gray-500 p-4 text-center bg-gray-50">
        * قد تختلف التوصيات حسب البلد والتاريخ العائلي — استشيري طبيبك
      </p>
    </div>
  );
}