"use client";

import { motion } from "framer-motion";

const countries = [
  { flag: "🇸🇦", country: "السعودية", event: "حملات توعية في المراكز التجارية والمستشفيات، إضاءة المباني بالوردي." },
  { flag: "🇦🇪", country: "الإمارات", event: "فعاليات «وردي دبي» مع مبادرات فحص مجانية." },
  { flag: "🇪🇬", country: "مصر", event: "حملات «الكشف المبكر» في الجامعات والميادين العامة." },
  { flag: "🇲🇦", country: "المغرب", event: "مسيرات توعوية وإضاءة معالم بالوردي." },
  { flag: "🇯🇴", country: "الأردن", event: "مبادرات «زهرة» و«شجاعة» لدعم المصابات." },
  { flag: "🇫🇷", country: "فرنسا", event: "«أكتوبر الوردي» — إضاءة برج إيفل بالوردي." },
  { flag: "🇺🇸", country: "أمريكا", event: "شراكة مع NFL وNBA لارتداء الوردي." },
  { flag: "🇬🇧", country: "بريطانيا", event: "«Wear It Pink» — يوم وطني لارتداء الوردي." },
];

export default function WorldCelebrations() {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {countries.map((c, i) => (
        <motion.div
          key={c.country}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05 }}
          className="flex items-start gap-4 bg-white rounded-2xl p-5 shadow-md border border-pink-100"
        >
          <span className="text-4xl flex-shrink-0">{c.flag}</span>
          <div>
            <h3 className="font-bold text-gray-900 mb-1">{c.country}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{c.event}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}