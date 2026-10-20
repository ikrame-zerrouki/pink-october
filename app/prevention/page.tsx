"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Ribbon,
  AlertCircle,
  Apple,
  Dumbbell,
  Scale,
  Cigarette,
  Baby,
  Brain,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import Reveal from "../about/components/Reveal";
import FloatingRibbon from "../about/components/FloatingRibbon";
import SectionHeading from "../about/components/SectionHeading";
import PreventionPillars from "./components/PreventionPillars";
import FoodCards from "./components/FoodCards";
import ExerciseCalculator from "./components/ExerciseCalculator";
import BMICalculator from "./components/BMICalculator";
import HabitChecklist from "./components/HabitChecklist";

export default function PreventionPage() {
  return (
    <main className="min-h-screen bg-[#FDF8F5] text-gray-800 overflow-hidden">
      {/* ===== HERO ===== */}
      <section className="relative min-h-[75vh] flex items-center overflow-hidden bg-gradient-to-br from-emerald-900 via-teal-800 to-green-700">
        <FloatingRibbon />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.15),transparent_60%)]" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 px-5 py-2 rounded-full text-sm font-semibold mb-6"
            >
              <ShieldCheck className="w-4 h-4" />
              الوقاية تبدأ اليوم
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.8 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
            >
              الوقاية
              <br />
              <span className="italic font-serif text-emerald-200">
                أسلوب حياة
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg md:text-xl text-white/90 leading-relaxed mb-8 max-w-md"
            >
              نحو 30% من حالات سرطان الثدي يمكن الوقاية منها بتغيير نمط الحياة.
              إليك دليلك العملي.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-3"
            >
              <a
                href="#pillars"
                className="inline-flex items-center gap-2 bg-white text-emerald-800 font-bold px-7 py-3.5 rounded-full hover:bg-emerald-50 transition shadow-2xl"
              >
                <Sparkles className="w-5 h-5" />
                ابدئي الآن
              </a>
              <a
                href="#checklist"
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/30 text-white font-semibold px-7 py-3.5 rounded-full hover:bg-white/20 transition"
              >
                تحدي اليوم
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { value: "30%", label: "يمكن الوقاية منها", icon: ShieldCheck },
              { value: "150", label: "دقيقة رياضة أسبوعياً", icon: Dumbbell },
              { value: "5", label: "حصص خضار/فواكه يومياً", icon: Apple },
              { value: "20%", label: "خطر أقل مع الرياضة", icon: Scale },
            ].map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.label}
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 text-white text-center"
                >
                  <Icon className="w-6 h-6 mx-auto mb-2 opacity-80" />
                  <div className="text-2xl md:text-3xl font-bold">{s.value}</div>
                  <div className="text-xs opacity-90 mt-1 leading-tight">
                    {s.label}
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ===== الأعمدة الستة ===== */}
      <section id="pillars" className="max-w-6xl mx-auto px-6 py-24">
        <SectionHeading
          index="01"
          eyebrow="الأساسيات"
          title="6 أعمدة للوقاية"
          description="كل عمود يقلل الخطر بطريقته — ابدئي بواحد تدريجياً."
        />
        <Reveal>
          <PreventionPillars />
        </Reveal>
      </section>

      {/* ===== التغذية ===== */}
      <section id="nutrition" className="bg-gradient-to-b from-white to-green-50/50 py-24">
        <div className="max-w-5xl mx-auto px-6">
          <SectionHeading
            index="02"
            eyebrow="التغذية"
            title="طعامك دواؤك"
            description="أطعمة تحمي، وأخرى تضر — اعرفي الفرق."
          />
          <Reveal>
            <FoodCards />
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-8 bg-green-50 border-r-4 border-green-400 p-5 rounded-2xl">
              <p className="text-green-900 font-semibold leading-relaxed">
                💡 قاعدة بسيطة: نصف طبقك خضار، ربع بروتين، ربع حبوب كاملة.
                وأضيفي الفواكه كوجبة خفيفة.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== الرياضة ===== */}
      <section id="exercise" className="max-w-4xl mx-auto px-6 py-24">
        <SectionHeading
          index="03"
          eyebrow="الرياضة"
          title="الحركة حماية"
          description="150 دقيقة أسبوعياً — أي 30 دقيقة × 5 أيام."
        />
        <Reveal>
          <ExerciseCalculator />
        </Reveal>
      </section>

      {/* ===== الوزن ===== */}
      <section id="bmi" className="bg-gradient-to-b from-purple-50/50 to-white py-24">
        <div className="max-w-4xl mx-auto px-6">
          <SectionHeading
            index="04"
            eyebrow="الوزن"
            title="وزنك وصحتك"
            description="حافظي على وزن صحي — especialmente بعد سن اليأس."
          />
          <Reveal>
            <BMICalculator />
          </Reveal>
        </div>
      </section>

      {/* ===== التدخين والكحول ===== */}
      <section id="smoking" className="max-w-4xl mx-auto px-6 py-24">
        <SectionHeading
          index="05"
          eyebrow="التدخين والكحول"
          title="ما تتجنبينه"
          description="أكبر عاملين يمكن التحكم بهما."
        />
        <div className="grid md:grid-cols-2 gap-6">
          <Reveal>
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-red-100">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500 to-rose-500 text-white flex items-center justify-center mb-5 shadow-lg">
                <Cigarette className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">التدخين</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                التدخين مرتبط بزيادة خطر سرطان الثدي، خاصة لدى النساء قبل سن
                اليأس. الإقلاع في أي عمر مفيد.
              </p>
              <ul className="space-y-2">
                {[
                  "الإقلاع يقلل الخطر تدريجياً",
                  "تجنبي التدخين السلبي",
                  "اطلبي الدعم عند الحاجة",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2 text-sm text-gray-800">
                    <CheckCircle2 className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-amber-100">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-400 text-white flex items-center justify-center mb-5 shadow-lg">
                <AlertCircle className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">الكحول</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                حتى الكميات الصغيرة من الكحول ترفع خطر سرطان الثدي. الأفضل
                تجنبه تماماً.
              </p>
              <ul className="space-y-2">
                {[
                  "لا يوجد مستوى آمن تماماً",
                  "كلما قللتِ كان أفضل",
                  "بدائل صحية: ماء، شاي أعشاب، عصائر طبيعية",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2 text-sm text-gray-800">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== الرضاعة ===== */}
      <section id="breastfeeding" className="bg-gradient-to-b from-pink-50/50 to-white py-24">
        <div className="max-w-4xl mx-auto px-6">
          <SectionHeading
            index="06"
            eyebrow="الرضاعة"
            title="حماية مزدوجة"
            description="للأم والطفل — خاصةً إذا استمرت لأكثر من سنة."
          />
          <Reveal>
            <div className="bg-gradient-to-br from-pink-500 to-rose-500 text-white rounded-3xl p-8 md:p-10 shadow-2xl">
              <div className="flex items-start gap-5">
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center flex-shrink-0">
                  <Baby className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-3">
                    الرضاعة الطبيعية تقلل الخطر
                  </h3>
                  <p className="opacity-95 leading-relaxed mb-5">
                    الدراسات تُظهر أن الرضاعة الطبيعية لمدة سنة أو أكثر تقلل
                    خطر سرطان الثدي بنسبة 4–5%. كل شهر إضافي يضيف حماية.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {[
                      "تقلل خطر سرطان الثدي قبل سن اليأس",
                      "تحمي من سرطان المبيض",
                      "تقوي مناعة الطفل",
                      "تعزز الرابطة بين الأم والطفل",
                    ].map((t) => (
                      <div
                        key={t}
                        className="flex items-start gap-2 bg-white/15 backdrop-blur rounded-xl p-3"
                      >
                        <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" />
                        <span className="text-sm leading-relaxed">{t}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== الصحة النفسية ===== */}
      <section id="mental" className="max-w-4xl mx-auto px-6 py-24">
        <SectionHeading
          index="07"
          eyebrow="الصحة النفسية"
          title="العقل والجسد"
          description="التوتر المزمن يؤثر على صحتك — تعلمي إدارته."
        />
        <Reveal>
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-indigo-100">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white flex items-center justify-center mb-6 shadow-lg">
              <Brain className="w-7 h-7" />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { emoji: "🧘‍♀️", title: "التأمل والتنفس", desc: "10 دقائق يومياً تقلل التوتر." },
                { emoji: "😴", title: "النوم الجيد", desc: "7–8 ساعات — النوم يصلح الخلايا." },
                { emoji: "👭", title: "الدعم الاجتماعي", desc: "العلاقات الصحية تحمي نفسياً." },
                { emoji: "🎨", title: "الهوايات", desc: "خصصي وقتاً لما تحبينه." },
                { emoji: "☀️", title: "التعرض للشمس", desc: "15 دقيقة صباحاً لفيتامين D." },
                { emoji: "🩺", title: "طلب المساعدة", desc: "لا تترددي في استشارة مختص." },
              ].map((t) => (
                <div
                  key={t.title}
                  className="flex items-start gap-3 bg-indigo-50/50 rounded-xl p-4"
                >
                  <span className="text-2xl">{t.emoji}</span>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{t.title}</p>
                    <p className="text-xs text-gray-600 leading-relaxed">{t.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ===== تحدي اليوم ===== */}
      <section id="checklist" className="bg-gradient-to-b from-amber-50/50 to-white py-24">
        <div className="max-w-3xl mx-auto px-6">
          <SectionHeading
            index="08"
            eyebrow="تحدي اليوم"
            title="عاداتك اليومية"
            description="حددي ما أنجزتِه اليوم — واجعليها عادة."
          />
          <Reveal>
            <HabitChecklist />
          </Reveal>
        </div>
      </section>

      {/* ===== تنبيه ===== */}
      <section className="max-w-4xl mx-auto px-6 pb-10">
        <div className="flex items-start gap-4 bg-amber-50 border-r-4 border-amber-400 p-6 rounded-2xl">
          <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
          <div>
            <p className="font-bold text-amber-900 mb-1">
              الوقاية تقلل الخطر — لكنها لا تلغيه
            </p>
            <p className="text-amber-800 text-sm leading-relaxed">
              حتى مع أسلوب حياة صحي، الفحص الدوري ضروري. الوقاية والفحص
              المكملان لبعضهما.
            </p>
          </div>
        </div>
      </section>

      {/* ===== CTA ختامي ===== */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <Reveal>
          <div className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-teal-800 to-green-700 text-white rounded-[2.5rem] p-12 md:p-16 text-center shadow-2xl">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute -top-20 -right-20 w-96 h-96 bg-emerald-300 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-teal-300 rounded-full blur-3xl" />
            </div>
            <div className="relative">
              <motion.div
                animate={{ rotate: [0, 8, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="inline-flex items-center justify-center w-20 h-20 bg-white/15 backdrop-blur-md rounded-3xl mb-8"
              >
                <Ribbon className="w-10 h-10" />
              </motion.div>
              <h2 className="text-3xl md:text-5xl font-bold mb-5 leading-tight">
                ابدئي اليوم
                <br />
                <span className="italic font-serif text-emerald-200">
                  بعادة واحدة
                </span>
              </h2>
              <p className="text-lg opacity-90 mb-8 max-w-xl mx-auto leading-relaxed">
                لا تحتاجين لتغيير كل شيء — ابدئي بعادة صغيرة، وستصنع الفرق.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link
                  href="/self-exam"
                  className="inline-flex items-center gap-3 bg-white text-emerald-800 font-bold px-8 py-4 rounded-full hover:bg-emerald-50 transition-all shadow-2xl hover:scale-105"
                >
                  الفحص الذاتي
                  <ArrowLeft className="w-5 h-5" />
                </Link>
                <Link
                  href="/medical-checkups"
                  className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/30 text-white font-semibold px-8 py-4 rounded-full hover:bg-white/20 transition"
                >
                  الفحوصات الطبية
                </Link>
              </div>
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