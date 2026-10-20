"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Stethoscope,
  Scan,
  Waves,
  Magnet,
  AlertCircle,
  Ribbon,
  Calendar,
  ClipboardCheck,
  Sparkles,
} from "lucide-react";
import Reveal from "../about/components/Reveal";
import FloatingRibbon from "../about/components/FloatingRibbon";
import SectionHeading from "../about/components/SectionHeading";
import AgeTimeline from "./components/AgeTimeline";
import ExamCard from "./components/ExamCard";
import ComparisonTable from "./components/ComparisonTable";
import StartCalculator from "./components/StartCalculator";
import RecommendationTable from "./components/RecommendationTable";

export default function MedicalCheckupsPage() {
  return (
    <main className="min-h-screen bg-[#FDF8F5] text-gray-800 overflow-hidden">
      {/* ===== HERO ===== */}
      <section className="relative min-h-[75vh] flex items-center overflow-hidden bg-gradient-to-br from-purple-900 via-pink-800 to-rose-700">
        <FloatingRibbon />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.15),transparent_60%)]" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 px-5 py-2 rounded-full text-sm font-semibold mb-6"
            >
              <Stethoscope className="w-4 h-4" />
              دليل الفحوصات الطبية
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.8 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
            >
              الفحوصات
              <br />
              <span className="italic font-serif text-pink-300">الطبية</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg md:text-xl text-white/90 leading-relaxed mb-8 max-w-md"
            >
              متى تبدأين؟ أي فحص تحتاجينه؟ دليل مبسط لكل مرحلة عمرية.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-3"
            >
              <a
                href="#calculator"
                className="inline-flex items-center gap-2 bg-white text-rose-800 font-bold px-7 py-3.5 rounded-full hover:bg-pink-100 transition shadow-2xl"
              >
                <Sparkles className="w-5 h-5" />
                احسبي موعدك
              </a>
              <a
                href="#exams"
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/30 text-white font-semibold px-7 py-3.5 rounded-full hover:bg-white/20 transition"
              >
                استكشفي الفحوصات
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
              { value: "4", label: "أنواع فحوصات", icon: Stethoscope },
              { value: "1–2", label: "سنة بين الفحوصات (40+)", icon: Calendar },
              { value: "90%", label: "شفاء عند الكشف المبكر", icon: ClipboardCheck },
              { value: "100%", label: "أمان الموجات الصوتية", icon: Waves },
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

      {/* ===== Timeline حسب العمر ===== */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <SectionHeading
          index="01"
          eyebrow="حسب العمر"
          title="ماذا تحتاجين في كل مرحلة؟"
          description="اختاري فئتك العمرية لتعرفي التوصيات."
        />
        <Reveal>
          <AgeTimeline />
        </Reveal>
      </section>

      {/* ===== الفحوصات الأربعة ===== */}
      <section
        id="exams"
        className="bg-gradient-to-b from-white to-pink-50/50 py-24"
      >
        <div className="max-w-4xl mx-auto px-6">
          <SectionHeading
            index="02"
            eyebrow="الفحوصات"
            title="تعرّفي على كل فحص"
            description="اضغطي على كل فحص لاستكشاف تفاصيله."
          />
          <div className="space-y-4">
            <Reveal>
              <ExamCard
                index={0}
                icon={<Scan className="w-7 h-7" />}
                title="الماموجرام"
                subtitle="أشعة سينية للثدي — الأكثر شيوعاً للكشف المبكر"
                color="from-pink-500 to-rose-500"
                duration="20–30 دقيقة"
                what="تصوير الثدي بالأشعة السينية لاكتشاف تغيرات دقيقة قبل أن تُحسّ. يستخدم جرعة إشعاع منخفضة جداً."
                when="عادةً من سن 40 كل 1–2 سنة. قد يبدأ أبكر مع تاريخ عائلي."
                how="قفي أمام جهاز خاص، يضغط الثدي بلطف بين لوحين لثوانٍ قليلة، ثم يُكرر للثدي الآخر. الإجراء سريع لكن قد يكون غير مريح قليلاً."
                pros={[
                  "يكتشف كتل صغيرة جداً قبل أن تُحس",
                  "يُظهر التكلسات الدقيقة",
                  "موثوق في الكشف المبكر",
                ]}
                cons={[
                  "قد يكون غير مريح قليلاً",
                  "يستخدم جرعة إشعاع منخفضة",
                  "أقل فعالية في الأنسجة الكثيفة",
                ]}
              />
            </Reveal>

            <Reveal delay={0.1}>
              <ExamCard
                index={1}
                icon={<Stethoscope className="w-7 h-7" />}
                title="الفحص السريري"
                subtitle="فحص يدوي من طبيب/طبيبة مختصة"
                color="from-teal-500 to-cyan-500"
                duration="10–20 دقيقة"
                what="فحص يدوي للثدي والمنطقة تحت الإبط والغدد الليمفاوية، يبحث عن أي كتل أو تغيرات."
                when="من سن 20 كل 3 سنوات، ثم سنوياً من 40."
                how="يشرح الطبيب ما سيفعل، ثم يفحص الثدي بلطف بأصابعه في حركات دائرية من الخارج للداخل، ثم يفحص منطقة الإبط."
                pros={[
                  "لا يستخدم إشعاعاً",
                  "سريع ومتوفر",
                  "يكتشف التغيرات المبكرة",
                ]}
                cons={[
                  "يعتمد على خبرة الطبيب",
                  "لا يكتشف الكتل العميقة جداً",
                ]}
              />
            </Reveal>

            <Reveal delay={0.2}>
              <ExamCard
                index={2}
                icon={<Waves className="w-7 h-7" />}
                title="الموجات فوق الصوتية"
                subtitle="تصوير بالصوت — آمن تماماً"
                color="from-purple-500 to-fuchsia-500"
                duration="15–30 دقيقة"
                what="استخدام موجات صوتية عالية التردد لتصوير الثدي. لا يستخدم إشعاعاً، ويُظهر إذا كانت الكتلة صلبة أم كيس ماء."
                when="عند الحاجة: كتلة محسوسة، أنسجة كثيفة، أو متابعة. لا يُستخدم عادةً كفحص روتيني وحده."
                how="تستلقين على ظهرك، يضع الطبيب جل شفاف على الثدي، ثم يمرر مسباراً صغيراً. لا ألم، فقط ضغط خفيف."
                pros={[
                  "آمن تماماً — بدون إشعاع",
                  "مناسب للأنسجة الكثيفة",
                  "يميز بين الكيس والكتلة الصلبة",
                  "يمكن تكراره دون قلق",
                ]}
                cons={[
                  "لا يكتشف التكلسات الدقيقة",
                  "يعتمد على خبرة الطبيب",
                ]}
              />
            </Reveal>

            <Reveal delay={0.3}>
              <ExamCard
                index={3}
                icon={<Magnet className="w-7 h-7" />}
                title="الرنين المغناطيسي"
                subtitle="الأكثر دقة — يُستخدم للحالات الخاصة"
                color="from-rose-500 to-orange-400"
                duration="30–60 دقيقة"
                what="تصوير دقيق جداً باستخدام مجال مغناطيسي، يُظهر تفاصيل لا تُرى بالماموجرام أو الموجات."
                when="للنساء عاليات الخطورة (طفرات BRCA، تاريخ عائلي قوي)، أو متابعة بعد العلاج."
                how="تستلقين على بطنك في جهاز أنبوبي، قد يُحقن صبغة في الوريد. الجهاز صاخب لكن لا ألم."
                pros={[
                  "الأكثر دقة",
                  "يكتشف تغيرات دقيقة جداً",
                  "مناسب للأنسجة الكثيفة",
                ]}
                cons={[
                  "غير متوفر في كل المراكز",
                  "مكلف",
                  "يستخدم صبغة قد تسبب حساسية",
                  "صاخب ويستغرق وقتاً",
                ]}
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== جدول التوصيات ===== */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <SectionHeading
          index="03"
          eyebrow="الجدول"
          title="توصيات سريعة حسب العمر"
          description="نظرة شاملة على ما تحتاجينه في كل مرحلة."
        />
        <Reveal>
          <RecommendationTable />
        </Reveal>
      </section>

      {/* ===== المقارنة ===== */}
      <section className="bg-gradient-to-b from-pink-50/50 to-white py-24">
        <div className="max-w-5xl mx-auto px-6">
          <SectionHeading
            index="04"
            eyebrow="المقارنة"
            title="الفرق بين الفحوصات"
            description="مرّري الماوس على كل عمود لإبرازه."
          />
          <Reveal>
            <ComparisonTable />
          </Reveal>
        </div>
      </section>

      {/* ===== الحاسبة ===== */}
      <section id="calculator" className="max-w-4xl mx-auto px-6 py-24">
        <SectionHeading
          index="05"
          eyebrow="الحاسبة"
          title="متى يجب أن أبدأ؟"
          description="أجيبي على 3 أسئلة سريعة لتحصلي على توصية مخصصة."
        />
        <Reveal>
          <StartCalculator />
        </Reveal>
      </section>

      {/* ===== تنبيه ===== */}
      <section className="max-w-4xl mx-auto px-6 pb-10">
        <div className="flex items-start gap-4 bg-amber-50 border-r-4 border-amber-400 p-6 rounded-2xl">
          <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
          <div>
            <p className="font-bold text-amber-900 mb-1">
              التوصيات قد تختلف حسب البلد والتاريخ الطبي
            </p>
            <p className="text-amber-800 text-sm leading-relaxed">
              ما ورد هنا إرشادي عام. طبيبك قد يعدّل التوصيات بناءً على حالتك
              الخاصة والتاريخ العائلي والتوصيات المحلية في بلدك.
            </p>
          </div>
        </div>
      </section>

      {/* ===== CTA ختامي ===== */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <Reveal>
          <div className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-pink-800 to-rose-700 text-white rounded-[2.5rem] p-12 md:p-16 text-center shadow-2xl">
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
              <h2 className="text-3xl md:text-5xl font-bold mb-5 leading-tight">
                الفحص المبكر
                <br />
                <span className="italic font-serif text-pink-200">
                  يعني حياة أطول
                </span>
              </h2>
              <p className="text-lg opacity-90 mb-8 max-w-xl mx-auto leading-relaxed">
                لا تنتظري الأعراض — الفحص المبكر هو أفضل حماية.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link
                  href="/self-exam"
                  className="inline-flex items-center gap-3 bg-white text-rose-800 font-bold px-8 py-4 rounded-full hover:bg-pink-100 transition-all shadow-2xl hover:scale-105"
                >
                  تعلّمي الفحص الذاتي
                  <ArrowLeft className="w-5 h-5" />
                </Link>
                <Link
                  href="/prevention"
                  className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/30 text-white font-semibold px-8 py-4 rounded-full hover:bg-white/20 transition"
                >
                  الوقاية
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