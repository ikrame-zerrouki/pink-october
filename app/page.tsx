"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Ribbon,
  ShieldCheck,      // للوقاية
  CalendarHeart,    // للشهر الوردي
  Stethoscope,
  Sparkles,
  Heart,
  BookOpen,
  Users,
  Calendar,
  Quote,
} from "lucide-react";
import Reveal from "./about/components/Reveal";
import FloatingRibbon from "./about/components/FloatingRibbon";

const features = [
  {
    icon: BookOpen,
    title: "عن المرض",
    desc: "تعرّفي على سرطان الثدي بلغة بسيطة وموثوقة.",
    href: "/about",
    color: "from-pink-500 to-rose-500",
  },
  {
    icon: ShieldCheck,
    title: "الفحص الذاتي",
    desc: "5 خطوات تفاعلية قد تنقذ حياتك.",
    href: "/self-exam",
    color: "from-purple-500 to-fuchsia-500",
  },
  {
    icon: Stethoscope,
    title: "الفحوصات الطبية",
    desc: "متى تبدأين؟ وأي فحص تحتاجينه؟",
    href: "/medical-checkups",
    color: "from-teal-500 to-cyan-500",
  },
  {
  icon: ShieldCheck,
  title: "الوقاية",
  desc: "عادات يومية تحمي صحتك على المدى الطويل.",
  href: "/prevention",
  color: "from-emerald-500 to-teal-500",
},
{
  icon: CalendarHeart,
  title: "الشهر الوردي",
  desc: "احتفالي بالتوعية — تاريخ، أفكار، وتحديات للمشاركة.",
  href: "/pink-october",
  color: "from-pink-500 to-fuchsia-500",
},
];

const stats = [
  { value: "2.3M+", label: "حالة جديدة سنوياً عالمياً" },
  { value: "90%", label: "نسبة الشفاء عند الكشف المبكر" },
  { value: "1 من 8", label: "نساء معرضات للإصابة" },
  { value: "99%", label: "بقاء 5 سنوات عند الكشف المبكر" },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#FDF8F5] text-gray-800 overflow-hidden">
      {/* ============ HERO ============ */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-rose-900 via-pink-800 to-rose-700">
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
            صحتكِ
            <br />
            <span className="italic font-serif text-pink-300">تبدأ بوعيكِ</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="text-lg md:text-2xl max-w-2xl mx-auto text-white/90 leading-relaxed mb-10 font-light"
          >
            منصة توعوية شاملة عن سرطان الثدي — المعرفة، الوقاية، والدعم في مكان
            واحد.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap gap-3 justify-center"
          >
            <Link
              href="/self-exam"
              className="inline-flex items-center gap-2 bg-white text-rose-800 font-bold px-8 py-4 rounded-full hover:bg-pink-100 transition shadow-2xl hover:scale-105"
            >
              <ShieldCheck className="w-5 h-5" />
              ابدئي الفحص الذاتي
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/30 text-white font-semibold px-8 py-4 rounded-full hover:bg-white/20 transition"
            >
              تعرّفي على المرض
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
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-pink-100 grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-b from-pink-600 to-rose-400 bg-clip-text text-transparent">
                  {s.value}
                </div>
                <p className="mt-2 text-gray-600 text-xs md:text-sm font-medium leading-tight">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ============ رسالة ============ */}
      <section className="max-w-4xl mx-auto px-6 py-24 text-center">
        <Reveal>
          <Quote className="w-12 h-12 text-pink-300 mx-auto mb-6" />
          <p className="text-2xl md:text-3xl text-gray-800 font-light leading-relaxed italic mb-6">
            &ldquo;الاكتشاف المبكر لا يطيل الحياة فقط، بل يحفظها.{" "}
            <span className="text-pink-600 font-semibold not-italic">
              الفحص اليوم
            </span>{" "}
            قد يكون الفارق بين قصة حزينة وقصة نجاح.&rdquo;
          </p>
          <div className="h-1 w-16 bg-pink-400 rounded-full mx-auto" />
        </Reveal>
      </section>

      {/* ============ الأقسام ============ */}
      <section className="bg-gradient-to-b from-white to-pink-50/50 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-14">
              <span className="inline-block bg-pink-100 text-pink-700 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
                استكشفي
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                كل ما تحتاجين معرفته
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                من التعريف إلى الوقاية — رحلة توعوية متكاملة في مكان واحد.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                >
                  <Link
                    href={f.href}
                    className="group block bg-white rounded-3xl p-7 shadow-md hover:shadow-2xl border border-gray-100 hover:border-pink-200 transition-all hover:-translate-y-1"
                  >
                    <div
                      className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${f.color} text-white mb-5 shadow-lg group-hover:scale-110 transition`}
                    >
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-pink-600 transition">
                      {f.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {f.desc}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-bold text-pink-600 group-hover:gap-3 transition-all">
                      اقرئي المزيد
                      <ArrowLeft className="w-4 h-4" />
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ 3 خطوات ============ */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <Reveal>
          <div className="text-center mb-14">
            <span className="inline-block bg-pink-100 text-pink-700 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
              رحلتك
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              3 خطوات نحو الطمأنينة
            </h2>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              num: "1",
              title: "تعلّمي",
              desc: "افهمي المرض والفحص الذاتي والفحوصات الطبية.",
              icon: BookOpen,
              color: "from-pink-500 to-rose-500",
            },
            {
              num: "2",
              title: "افحصي",
              desc: "اجعلي الفحص الذاتي عادة شهرية والفحص الطبي منتظماً.",
              icon: ShieldCheck,
              color: "from-purple-500 to-fuchsia-500",
            },
            {
              num: "3",
              title: "شاركي",
              desc: "انشري الوعي بين أمك وأختك وصديقاتك — قد تنقذين حياة.",
              icon: Users,
              color: "from-teal-500 to-cyan-500",
            },
          ].map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="relative bg-white rounded-3xl p-8 shadow-lg border border-pink-100 text-center"
              >
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 text-white font-bold text-lg flex items-center justify-center shadow-lg">
                  {s.num}
                </div>
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${s.color} text-white mb-5 mt-3 shadow-lg`}
                >
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {s.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{s.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ============ CTA ختامي ============ */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <Reveal>
          <div className="relative overflow-hidden bg-gradient-to-br from-rose-800 via-pink-700 to-rose-700 text-white rounded-[2.5rem] p-12 md:p-16 text-center shadow-2xl">
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
                ابدئي اليوم،
                <br />
                <span className="italic font-serif text-pink-200">
                  لأجل غدٍ أفضل
                </span>
              </h2>
              <p className="text-lg opacity-90 mb-8 max-w-xl mx-auto leading-relaxed">
                5 دقائق شهرياً للفحص الذاتي قد تكون أفضل استثمار في صحتك.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link
                  href="/self-exam"
                  className="inline-flex items-center gap-3 bg-white text-rose-800 font-bold px-8 py-4 rounded-full hover:bg-pink-100 transition-all shadow-2xl hover:scale-105"
                >
                  ابدئي الفحص الذاتي
                  <ArrowLeft className="w-5 h-5" />
                </Link>
                <Link
                  href="/quiz"
                  className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/30 text-white font-semibold px-8 py-4 rounded-full hover:bg-white/20 transition"
                >
                  اختبر معلوماتك
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