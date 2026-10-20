"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Ribbon,
  ArrowLeft,
  Sparkles,
  Calendar,
  Heart,
  Megaphone,
  AlertCircle,
  Users,
  Globe,
  Trophy,
} from "lucide-react";
import Reveal from "../about/components/Reveal";
import FloatingRibbon from "../about/components/FloatingRibbon";
import SectionHeading from "../about/components/SectionHeading";
import CountdownTimer from "./components/CountdownTimer";
import TimelineHistory from "./components/TimelineHistory";
import ShareIdeas from "./components/ShareIdeas";
import WorldCelebrations from "./components/WorldCelebrations";
import AwarenessChallenge from "./components/AwarenessChallenge";

export default function PinkOctoberPage() {
  return (
    <main className="min-h-screen bg-[#FDF8F5] text-gray-800 overflow-hidden">
      {/* ===== HERO ===== */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-rose-900 via-pink-800 to-fuchsia-800">
        <FloatingRibbon />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.15),transparent_60%)]" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 py-20 text-center text-white">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 px-5 py-2.5 rounded-full text-sm font-semibold mb-8"
          >
            <Calendar className="w-4 h-4" />
            أكتوبر الوردي — شهر التوعية العالمي
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] mb-8"
          >
            الشهر
            <br />
            <span className="italic font-serif text-pink-300">الوردي</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="text-lg md:text-2xl max-w-2xl mx-auto text-white/90 leading-relaxed mb-10 font-light"
          >
            شهر عالمي للتوعية بسرطان الثدي — نشارك، نتعلّم، وندعم.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap gap-3 justify-center mb-12"
          >
            <a
              href="#challenge"
              className="inline-flex items-center gap-2 bg-white text-rose-800 font-bold px-8 py-4 rounded-full hover:bg-pink-100 transition shadow-2xl hover:scale-105"
            >
              <Trophy className="w-5 h-5" />
              ابدئي التحدي
            </a>
            <a
              href="#history"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/30 text-white font-semibold px-8 py-4 rounded-full hover:bg-white/20 transition"
            >
              تاريخ الشهر
              <ArrowLeft className="w-5 h-5" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto"
          >
            {[
              { value: "100+", label: "دولة تشارك" },
              { value: "2.3M+", label: "حالة سنوياً" },
              { value: "1985", label: "بداية الحملة" },
              { value: "🎗️", label: "رمز عالمي" },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4"
              >
                <div className="text-2xl md:text-3xl font-bold">{s.value}</div>
                <div className="text-xs opacity-90 mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== العدّاد ===== */}
      <section className="max-w-3xl mx-auto px-6 -mt-12 relative z-20">
        <Reveal>
          <CountdownTimer />
        </Reveal>
      </section>

      {/* ===== لماذا أكتوبر؟ ===== */}
      <section className="max-w-4xl mx-auto px-6 py-24 text-center">
        <Reveal>
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 text-white mb-6 shadow-lg">
            <Heart className="w-8 h-8" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5">
            لماذا أكتوبر؟
          </h2>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto">
            اختير أكتوبر ليكون شهر التوعية عالمياً لأنه شهر بداية الخريف، حيث
            تنشط المجتمعات بعد الصيف. اليوم، أصبح الشريط الوردي رمزاً عالمياً
            للأمل والتضامن مع المصابات والناجيات.
          </p>
        </Reveal>
      </section>

      {/* ===== التاريخ ===== */}
      <section id="history" className="bg-gradient-to-b from-white to-pink-50/50 py-24">
        <div className="max-w-4xl mx-auto px-6">
          <SectionHeading
            index="01"
            eyebrow="التاريخ"
            title="كيف بدأ الشهر الوردي؟"
            description="رحلة من فكرة صغيرة إلى حملة عالمية."
          />
          <Reveal>
            <TimelineHistory />
          </Reveal>
        </div>
      </section>

      {/* ===== حول العالم ===== */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <SectionHeading
          index="02"
          eyebrow="حول العالم"
          title="كيف يُحتفل به؟"
          description="من الشرق إلى الغرب — طقوس ومبادرات."
        />
        <Reveal>
          <WorldCelebrations />
        </Reveal>
      </section>

      {/* ===== أفكار للمشاركة ===== */}
      <section className="bg-gradient-to-b from-pink-50/50 to-white py-24">
        <div className="max-w-5xl mx-auto px-6">
          <SectionHeading
            index="03"
            eyebrow="شاركي"
            title="أفكار للمشاركة"
            description="اضغطي على كل فكرة لتحديدها كمُنجزة."
          />
          <Reveal>
            <ShareIdeas />
          </Reveal>
        </div>
      </section>

      {/* ===== تحدي التوعية ===== */}
      <section id="challenge" className="max-w-3xl mx-auto px-6 py-24">
        <SectionHeading
          index="04"
          eyebrow="التحدي"
          title="تحدي التوعية"
          description="أكملي التحديات وشاركي نتيجتك."
        />
        <Reveal>
          <AwarenessChallenge />
        </Reveal>
      </section>

      {/* ===== أهداف الشهر ===== */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <SectionHeading
          index="05"
          eyebrow="الأهداف"
          title="أهداف الشهر الوردي"
          description="ما نسعى إليه في هذا الشهر."
        />
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: Megaphone,
              title: "نشر الوعي",
              desc: "تعريف النساء بأهمية الفحص المبكر والفحص الذاتي.",
              color: "from-pink-500 to-rose-500",
            },
            {
              icon: Users,
              title: "دعم المصابات",
              desc: "توفير الدعم النفسي والمادي للمصابات وعائلاتهن.",
              color: "from-purple-500 to-fuchsia-500",
            },
            {
              icon: Globe,
              title: "تعزيز البحث",
              desc: "دعم الأبحاث العلمية للوصول إلى علاجات أفضل.",
              color: "from-teal-500 to-cyan-500",
            },
          ].map((g, i) => {
            const Icon = g.icon;
            return (
              <Reveal key={g.title} delay={i * 0.1}>
                <div className="bg-white rounded-3xl p-8 shadow-lg border border-pink-100 text-center h-full">
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${g.color} text-white mb-5 shadow-lg`}
                  >
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {g.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {g.desc}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ===== تنبيه ===== */}
      <section className="max-w-4xl mx-auto px-6 pb-10">
        <div className="flex items-start gap-4 bg-amber-50 border-r-4 border-amber-400 p-6 rounded-2xl">
          <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
          <div>
            <p className="font-bold text-amber-900 mb-1">
              التوعية لا تتوقف في أكتوبر
            </p>
            <p className="text-amber-800 text-sm leading-relaxed">
              الشهر الوردي فرصة للبدء، لكن الفحص الدوري والتوعية مستمرة طوال
              السنة. اجعلي أكتوبر نقطة انطلاق.
            </p>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <Reveal>
          <div className="relative overflow-hidden bg-gradient-to-br from-rose-900 via-pink-800 to-fuchsia-800 text-white rounded-[2.5rem] p-12 md:p-16 text-center shadow-2xl">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute -top-20 -right-20 w-96 h-96 bg-pink-300 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-fuchsia-300 rounded-full blur-3xl" />
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
                اجعلي أكتوبر
                <br />
                <span className="italic font-serif text-pink-200">
                  بداية، لا نهاية
                </span>
              </h2>
              <p className="text-lg opacity-90 mb-8 max-w-xl mx-auto leading-relaxed">
                الشهر ينتهي، لكن التوعية مستمرة. ابدئي اليوم بعادة الفحص
                الذاتي.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link
                  href="/self-exam"
                  className="inline-flex items-center gap-3 bg-white text-rose-800 font-bold px-8 py-4 rounded-full hover:bg-pink-100 transition-all shadow-2xl hover:scale-105"
                >
                  الفحص الذاتي
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