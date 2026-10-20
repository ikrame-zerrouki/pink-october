"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  AlertCircle,
  Ribbon,
  ShieldCheck,
  Stethoscope,
  Calendar,
  Heart,
} from "lucide-react";
import Reveal from "../about/components/Reveal";
import FloatingRibbon from "../about/components/FloatingRibbon";
import SectionHeading from "../about/components/SectionHeading";
import StepCarousel from "./components/StepCarousel";
import TimingCards from "./components/TimingCards";
import ChecklistCard from "./components/ChecklistCard";
import ReminderForm from "./components/ReminderForm";

export default function SelfExamPage() {
  return (
    <main className="min-h-screen bg-[#FDF8F5] text-gray-800 overflow-hidden">
      {/* ===== HERO ===== */}
      <section className="relative min-h-[75vh] flex items-center overflow-hidden bg-gradient-to-br from-rose-900 via-pink-800 to-rose-700">
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
              دليل تفاعلي خطوة بخطوة
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.8 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
            >
              تعلّمي
              <br />
              <span className="italic font-serif text-pink-300">
                الفحص الذاتي
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg md:text-xl text-white/90 leading-relaxed mb-8 max-w-md"
            >
              5 دقائق شهرياً قد تنقذ حياتك. خطوات بسيطة يمكنكِ تعلمها اليوم.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-3"
            >
              <a
                href="#steps"
                className="inline-flex items-center gap-2 bg-white text-rose-800 font-bold px-7 py-3.5 rounded-full hover:bg-pink-100 transition shadow-2xl"
              >
                ابدئي الدرس
                <ArrowLeft className="w-5 h-5" />
              </a>
              <a
                href="#checklist"
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/30 text-white font-semibold px-7 py-3.5 rounded-full hover:bg-white/20 transition"
              >
                قائمة التحقق
              </a>
            </motion.div>
          </div>

          {/* إحصائيات سريعة */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { value: "5", label: "دقائق فقط", icon: Calendar },
              { value: "5", label: "خطوات بسيطة", icon: Heart },
              { value: "1", label: "مرة شهرياً", icon: Stethoscope },
              { value: "90%", label: "شفاء عند الكشف المبكر", icon: ShieldCheck },
            ].map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.label}
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 text-white text-center"
                >
                  <Icon className="w-6 h-6 mx-auto mb-2 opacity-80" />
                  <div className="text-3xl font-bold">{s.value}</div>
                  <div className="text-xs opacity-90 mt-1 leading-tight">
                    {s.label}
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ===== متى تفحصين؟ ===== */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <SectionHeading
          index="01"
          eyebrow="التوقيت"
          title="متى تفحصين؟"
          description="التوقيت الصحيح يسهّل اكتشاف أي تغير."
        />
        <TimingCards />
      </section>

      {/* ===== الخطوات الخمس ===== */}
      <section id="steps" className="bg-gradient-to-b from-white to-pink-50/50 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeading
            index="02"
            eyebrow="الخطوات"
            title="5 خطوات تفاعلية"
            description="اتبعي المؤقت والرسم التوضيحي خطوة بخطوة."
          />
          <Reveal>
            <StepCarousel />
          </Reveal>
        </div>
      </section>

      {/* ===== قائمة التحقق ===== */}
      <section id="checklist" className="max-w-4xl mx-auto px-6 py-24">
        <SectionHeading
          index="03"
          eyebrow="قائمة التحقق"
          title="افحصي بثقة"
          description="حددي كل بند أثناء قيامك بالفحص."
        />
        <Reveal>
          <ChecklistCard />
        </Reveal>
      </section>

      {/* ===== ماذا لو وجدتِ كتلة؟ ===== */}
      <section className="bg-gradient-to-b from-pink-50/50 to-white py-24">
        <div className="max-w-4xl mx-auto px-6">
          <SectionHeading
            index="04"
            eyebrow="الخطوة التالية"
            title="ماذا لو وجدتِ كتلة؟"
            description="لا تقلقي — معظم الكتل حميدة، لكن الفحص ضروري."
          />
          <Reveal>
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-pink-100">
              <div className="space-y-6">
                {[
                  {
                    num: "1",
                    title: "لا تقلقي",
                    desc: "أكثر من 80% من الكتل التي تكتشفها النساء حميدة (غير سرطانية).",
                  },
                  {
                    num: "2",
                    title: "سجّلي ما وجدتِه",
                    desc: "المكان، الحجم، الإحساس (صلبة/طرية)، وهل تتحرك أم ثابتة.",
                  },
                  {
                    num: "3",
                    title: "احجزي موعداً مع طبيب",
                    desc: "اطلبي فحصاً سريرياً، وقد يطلب الطبيب ماموجرام أو أشعة تلفزيونية.",
                  },
                  {
                    num: "4",
                    title: "لا تؤجلي",
                    desc: "الكشف المبكر يرفع فرص النجاح، التأجيل قد يضيع الوقت الثمين.",
                  },
                ].map((s) => (
                  <div key={s.num} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 text-white flex items-center justify-center font-bold text-lg shadow-lg">
                      {s.num}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 mb-1">
                        {s.title}
                      </h4>
                      <p className="text-gray-700 leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-start gap-4 bg-red-50 border-r-4 border-red-400 p-5 rounded-2xl mt-8">
                <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <p className="text-red-800 font-semibold leading-relaxed">
                  إذا لاحظتِ كتلة جديدة أو تغيراً مستمراً، استشيري الطبيب فوراً.
                  لا تنتظري الدورة القادمة.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== التذكير الشهري ===== */}
      <section className="max-w-3xl mx-auto px-6 py-24">
        <SectionHeading
          index="05"
          eyebrow="المتابعة"
          title="لا تنسي الفحص القادم"
          description="فعّلي تذكيراً شهرياً يصل لبريدكِ."
        />
        <Reveal>
          <ReminderForm />
        </Reveal>
      </section>

      {/* ===== CTA ختامي ===== */}
      <section className="max-w-5xl mx-auto px-6 py-20">
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
                الفحص الذاتي عادة،
                <br />
                <span className="italic font-serif text-pink-200">
                  والعادة تحمي
                </span>
              </h2>
              <p className="text-lg opacity-90 mb-8 max-w-xl mx-auto leading-relaxed">
                اجعلي الفحص جزءاً من روتينكِ الشهري — أنتِ تستحقين العناية.
              </p>
              <Link
                href="/medical-checkups"
                className="inline-flex items-center gap-3 bg-white text-rose-800 font-bold px-8 py-4 rounded-full hover:bg-pink-100 transition-all shadow-2xl hover:scale-105"
              >
                الفحوصات الطبية
                <ArrowLeft className="w-5 h-5" />
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