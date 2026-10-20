"use client";

import { motion } from "framer-motion";

const symptoms = [
  { title: "كتلة في الثدي", detail: "قد تكون صلبة أو طرية، غالباً غير مؤلمة. أكثر العلامات شيوعاً." },
  { title: "تغير في الحلمة", detail: "انقلاب للداخل، تشقق، أو إفرازات غير طبيعية (خاصة الدموية)." },
  { title: "تغير في الجلد", detail: "احمرار، تقشر، تجاعيد تشبه قشر البرتقال، أو تقرحات." },
  { title: "تغير في الحجم", detail: "اختلاف واضح بين الثديين لم يكن موجوداً سابقاً." },
  { title: "تورم تحت الإبط", detail: "كتل صغيرة في الغدد الليمفاوية تحت الإبط أو فوق الترقوة." },
  { title: "ألم مستمر", detail: "ألم في الثدي أو الحلمة لا يزول بعد الدورة الشهرية." },
];

export default function SymptomsTimeline() {
  return (
    <div className="relative">
      {/* الخط العمودي */}
      <div className="absolute right-6 md:right-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-pink-200 via-pink-400 to-pink-200" />

      <div className="space-y-10">
        {symptoms.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, x: i % 2 === 0 ? 40 : -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className={`relative flex items-start gap-6 ${
              i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            }`}
          >
            {/* المحتوى */}
            <div className={`flex-1 pr-16 md:pr-0 ${i % 2 === 0 ? "md:text-left md:pl-12" : "md:text-right md:pr-12"}`}>
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-pink-100 hover:shadow-2xl hover:-translate-y-1 transition-all">
                <h3 className="text-xl font-bold text-pink-600 mb-2">{s.title}</h3>
                <p className="text-gray-700 leading-relaxed">{s.detail}</p>
              </div>
            </div>

            {/* النقطة */}
            <div className="absolute right-4 md:right-1/2 md:translate-x-1/2 top-6 w-5 h-5 rounded-full bg-white border-4 border-pink-500 shadow-lg z-10" />

            {/* فراغ للجهة الأخرى */}
            <div className="hidden md:block flex-1" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}