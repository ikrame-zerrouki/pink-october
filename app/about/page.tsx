"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Ribbon, AlertCircle, BookOpen } from "lucide-react";
import Reveal from "./components/Reveal";
import FloatingRibbon from "./components/FloatingRibbon";
import SectionHeading from "./components/SectionHeading";
import StatItem from "./components/StatItem";
import TabTypes from "./components/TabTypes";
import RiskAccordion from "./components/RiskAccordion";
import SymptomsTimeline from "./components/Timeline";
import MythCard from "./components/MythCard";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#FDF8F5] text-gray-800 overflow-hidden">
      {/* ============ HERO سينمائي ============ */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-rose-900 via-pink-800 to-rose-700">
        {/* خلفية متحركة */}
        <FloatingRibbon />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.15),transparent_60%)]" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 px-5 py-2.5 rounded-full text-sm font-semibold mb-8"
          >
            <Ribbon className="w-4 h-4" />
            أكتوبر الوردي — شهر التوعية العالمي
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] mb-8"
          >
            عن <span className="text-pink-300 italic font-serif">سرطان</span>
            <br />
            الثدي
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="text-lg md:text-2xl max-w-2xl mx-auto text-white/90 leading-relaxed mb-10 font-light"
          >
            كل ما تحتاجين معرفته بلغة بسيطة، موثوقة، وبعيدة عن التعقيد الطبي.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap gap-3 justify-center"
          >
            <Link
              href="#intro"
              className="inline-flex items-center gap-2 bg-white text-rose-800 font-bold px-7 py-3.5 rounded-full hover:bg-pink-100 transition shadow-2xl"
            >
              <BookOpen className="w-5 h-5" />
              ابدئي القراءة
            </Link>
            <Link
              href="/self-exam"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/30 text-white font-semibold px-7 py-3.5 rounded-full hover:bg-white/20 transition"
            >
              الفحص الذاتي
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>

        {/* مؤشر التمرير */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60"
        >
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/60 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* ============ إحصائيات ============ */}
      <section className="relative -mt-16 z-20 max-w-5xl mx-auto px-6">
        <Reveal>
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-pink-100 grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatItem value={2300000} suffix="+" label="حالة جديدة سنوياً" />
            <StatItem value={90} suffix="%" label="نسبة الشفاء مبكراً" />
            <StatItem value={8} suffix=" = 1" label="امرأة من كل 8" />
            <StatItem value={99} suffix="%" label="بقاء 5 سنوات" />
          </div>
        </Reveal>
      </section>

      {/* ============ 1. التعريف ============ */}
      <section id="intro" className="max-w-5xl mx-auto px-6 py-24">
        <SectionHeading
          index="01"
          eyebrow="التعريف"
          title="ما هو سرطان الثدي؟"
          description="فهم المرض هو الخطوة الأولى للتعامل معه بشجاعة ووعي."
        />
        <Reveal delay={0.2}>
          <div className="relative">
            <div className="absolute -top-6 -right-6 text-9xl text-pink-100 font-serif leading-none select-none">
              &ldquo;
            </div>
            <div className="relative bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-pink-100">
              <p className="text-xl md:text-2xl text-gray-800 leading-relaxed mb-6 font-light">
                <strong className="font-bold text-pink-600">سرطان الثدي</strong>{" "}
                هو نمو غير طبيعي لخلايا الثدي، تنقسم فيه الخلايا بشكل عشوائي دون
                توقف، وتتجمع مكوّنةً كتلة أو ورماً.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                يمكن أن يبدأ السرطان في أجزاء مختلفة من الثدي، وغالباً ما ينشأ
                في <strong className="text-pink-600">القنوات اللبنية</strong> أو{" "}
                <strong className="text-pink-600">الفصيصات</strong>. وإذا لم
                يُعالج مبكراً، قد ينتشر إلى أجزاء أخرى من الجسم.
              </p>
              <div className="flex items-start gap-4 bg-gradient-to-l from-pink-50 to-rose-50 border-r-4 border-pink-500 p-6 rounded-2xl">
                <AlertCircle className="w-6 h-6 text-pink-600 flex-shrink-0 mt-1" />
                <p className="text-pink-900 font-semibold leading-relaxed text-lg">
                  الاكتشاف المبكر يرفع نسبة الشفاء إلى أكثر من 90%، لذلك الفحص
                  الدوري ضروري حتى في غياب الأعراض.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ============ 2. الأنواع ============ */}
      <section className="bg-gradient-to-b from-white to-pink-50/50 py-24">
        <div className="max-w-5xl mx-auto px-6">
          <SectionHeading
            index="02"
            eyebrow="الأنواع"
            title="أنواع سرطان الثدي"
            description="اضغطي على كل نوع لاستكشاف تفاصيله."
          />
          <Reveal delay={0.2}>
            <TabTypes />
          </Reveal>
        </div>
      </section>

      {/* ============ 3. عوامل الخطر ============ */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <SectionHeading
          index="03"
          eyebrow="عوامل الخطر"
          title="ما الذي يزيد الاحتمالية؟"
          description="وجود عامل خطر لا يعني الإصابة، لكنه يرفع الاحتمالية."
        />
        <Reveal delay={0.2}>
          <RiskAccordion />
        </Reveal>
      </section>

      {/* ============ 4. الأعراض (Timeline) ============ */}
      <section className="bg-gradient-to-b from-pink-50/50 to-white py-24">
        <div className="max-w-5xl mx-auto px-6">
          <SectionHeading
            index="04"
            eyebrow="الأعراض"
            title="علامات يجب الانتباه لها"
            description="الانتباه لهذه العلامات قد ينقذ حياتك."
          />
          <SymptomsTimeline />
          <Reveal delay={0.3}>
            <div className="flex items-start gap-4 bg-red-50 border-r-4 border-red-400 p-6 rounded-2xl mt-12">
              <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
              <p className="text-red-800 font-semibold leading-relaxed">
                وجود أي من هذه العلامات لا يعني بالضرورة وجود سرطان، لكن يجب
                استشارة الطبيب فوراً للتأكد.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ 5. خرافات وحقائق ============ */}
      <section className="max-w-4xl mx-auto px-6 py-24">
        <SectionHeading
          index="05"
          eyebrow="خرافات وحقائق"
          title="افصلي بين الخرافة والحقيقة"
          description="اضغطي على كل خرافة لكشف الحقيقة خلفها."
        />
        <div className="space-y-4">
          {myths.map((m, i) => (
            <MythCard key={i} myth={m.myth} fact={m.fact} index={i} />
          ))}
        </div>
      </section>

      {/* ============ CTA ختامي ============ */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <Reveal>
          <div className="relative overflow-hidden bg-gradient-to-br from-rose-800 via-pink-700 to-rose-700 text-white rounded-[2.5rem] p-12 md:p-20 text-center shadow-2xl">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute -top-20 -right-20 w-96 h-96 bg-pink-300 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-rose-300 rounded-full blur-3xl" />
            </div>
            <div className="relative">
              <motion.div
                animate={{ rotate: [0, 8, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="inline-flex items-center justify-center w-20 h-20 bg-white/15 backdrop-blur-md rounded-3xl mb-8"
              >
                <Ribbon className="w-10 h-10" />
              </motion.div>
              <h2 className="text-4xl md:text-5xl font-bold mb-5 leading-tight">
                الخطوة التالية:
                <br />
                <span className="italic font-serif text-pink-200">
                  تعلّمي الفحص الذاتي
                </span>
              </h2>
              <p className="text-lg md:text-xl opacity-90 mb-10 max-w-xl mx-auto leading-relaxed">
                5 خطوات بسيطة، 5 دقائق شهرياً، يمكنها أن تنقذ حياتك.
              </p>
              <Link
                href="/self-exam"
                className="inline-flex items-center gap-3 bg-white text-rose-800 font-bold px-10 py-4 rounded-full hover:bg-pink-100 transition-all shadow-2xl hover:scale-105 text-lg"
              >
                ابدئي الآن
                <ArrowLeft className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* تنبيه */}
      <div className="max-w-3xl mx-auto px-6 pb-16">
        <p className="text-center text-sm text-gray-500 bg-white py-4 rounded-xl border border-gray-200">
          ⚕️ هذا المحتوى توعوي فقط ولا يغني عن استشارة الطبيب المختص.
        </p>
      </div>
    </main>
  );
}

/* ---------- البيانات ---------- */
const myths = [
  {
    myth: "سرطان الثدي يصيب النساء فقط.",
    fact: "الرجال أيضاً يمكن أن يصابوا بسرطان الثدي، وإن كان بنسبة أقل بكثير (حوالي 1% من الحالات).",
  },
  {
    myth: "وجود كتلة في الثدي يعني سرطان.",
    fact: "معظم الكتل (حوالي 80%) حميدة غير سرطانية، لكن يجب فحصها دائماً للاطمئنان.",
  },
  {
    myth: "لا يوجد تاريخ عائلي، إذن أنا في أمان.",
    fact: "أغلب حالات سرطان الثدي (حوالي 85%) تحدث لدى نساء دون تاريخ عائلي، لذلك الفحص ضروري للجميع.",
  },
  {
    myth: "مضاد التعرق يسبب سرطان الثدي.",
    fact: "لا توجد أي أدلة علمية تربط بين مضادات التعرق وسرطان الثدي. هذه خرافة منتشرة.",
  },
  {
    myth: "الفحص الذاتي غير مفيد.",
    fact: "الفحص الذاتي لا يغني عن الطبيب، لكنه يساعد على معرفة الطبيعي من غير الطبيعي والاكتشاف المبكر.",
  },
  {
    myth: "الرضاعة الطبيعية تشوه شكل الثدي فقط.",
    fact: "الرضاعة الطبيعية تقلل من خطر الإصابة بسرطان الثدي، خاصةً إذا استمرت لأكثر من سنة.",
  },
];