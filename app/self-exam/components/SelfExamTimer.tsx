
"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowLeft,
  AlertCircle,
  ShieldCheck,
  Stethoscope,
  Calendar,
  Heart,
} from "lucide-react";

import Reveal from "../../about/components/Reveal";
import FloatingRibbon from "../../about/components/FloatingRibbon";
import SectionHeading from "../../about/components/SectionHeading";
import { RibbonIcon } from "../../about/components/icons";

import StepCarousel from "./StepCarousel";
import TimingCards from "./TimingCards";
import ChecklistCard from "./ChecklistCard";
import ReminderForm from "./ReminderForm";

const EASE = [0.22, 1, 0.36, 1] as const;

const heroContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13, delayChildren: 0.2 } },
};
const heroItem = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: EASE },
  },
};

const heroStats = [
  { value: "5", label: "دقائق فقط", icon: Calendar },
  { value: "5", label: "خطوات بسيطة", icon: Heart },
  { value: "1", label: "مرة شهرياً", icon: Stethoscope },
  { value: "90%", label: "شفاء عند الكشف المبكر", icon: ShieldCheck },
];

const nextSteps = [
  {
    num: "1",
    emoji: "🧘",
    title: "لا تقلقي",
    desc: "أكثر من 80% من الكتل التي تكتشفها النساء حميدة (غير سرطانية).",
  },
  {
    num: "2",
    emoji: "📝",
    title: "سجّلي ما وجدتِه",
    desc: "المكان، الحجم، الإحساس (صلبة/طرية)، وهل تتحرك أم ثابتة.",
  },
  {
    num: "3",
    emoji: "🩺",
    title: "احجزي موعداً مع طبيب",
    desc: "اطلبي فحصاً سريرياً، وقد يطلب الطبيب ماموجرام أو أشعة تلفزيونية.",
  },
  {
    num: "4",
    emoji: "⏱️",
    title: "لا تؤجلي",
    desc: "الكشف المبكر يرفع فرص النجاح، التأجيل قد يضيع الوقت الثمين.",
  },
];

export default function SelfExamPage() {
  const reduce = !!useReducedMotion();

  // شريط تقدم القراءة
  const { scrollYProgress: pageProgress } = useScroll();
  const progressX = useSpring(pageProgress, { stiffness: 120, damping: 30 });

  // تأثير عمق في الواجهة
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroProgress, [0, 1], [0, 100]);
  const heroOpacity = useTransform(heroProgress, [0, 0.75], [1, 0]);

  return (
    <main className="min-h-screen overflow-hidden bg-[#FDF8F5] text-gray-800">
      <motion.div
        aria-hidden
        style={{ scaleX: progressX }}
        className="fixed inset-x-0 top-0 z-50 h-1 origin-right bg-gradient-to-l from-pink-400 via-rose-500 to-pink-400"
      />

      {/* ===== HERO ===== */}
      <section
        ref={heroRef}
        className="relative flex min-h-[75vh] items-center overflow-hidden bg-gradient-to-br from-rose-900 via-pink-800 to-rose-700"
      >
        <FloatingRibbon />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.15),transparent_60%)]" />
        <div
          aria-hidden
          className="absolute inset-0 opacity-60 [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
        />
        <motion.div
          aria-hidden
          className="absolute -left-32 top-10 h-96 w-96 rounded-full bg-pink-400/30 blur-3xl"
          animate={reduce ? undefined : { x: [0, 60, 0], y: [0, 40, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="absolute -right-24 bottom-10 h-[26rem] w-[26rem] rounded-full bg-rose-400/25 blur-3xl"
          animate={reduce ? undefined : { x: [0, -50, 0], y: [0, -40, 0] }}
          transition={{ duration: 19, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        <motion.div
          style={reduce ? undefined : { y: heroY, opacity: heroOpacity }}
          className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 px-6 py-24 md:grid-cols-2"
        >
          <motion.div
            variants={heroContainer}
            initial={reduce ? false : "hidden"}
            animate="show"
            className="text-white"
          >
            <motion.div
              variants={heroItem}
              className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-semibold backdrop-blur-xl"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pink-300 opacity-70" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-pink-300" />
              </span>
              <ShieldCheck className="h-4 w-4" />
              دليل تفاعلي خطوة بخطوة
            </motion.div>

            <motion.h1
              variants={heroItem}
              className="mb-6 text-5xl font-bold leading-tight md:text-6xl lg:text-7xl"
            >
              تعلّمي
              <br />
              <span className="relative inline-block bg-gradient-to-l from-pink-200 via-white to-pink-300 bg-clip-text font-serif italic text-transparent">
                الفحص الذاتي
                <svg
                  aria-hidden
                  viewBox="0 0 200 12"
                  preserveAspectRatio="none"
                  className="absolute inset-x-0 -bottom-3 h-3 w-full"
                  fill="none"
                >
                  <motion.path
                    d="M2 8 Q 25 0 50 7 T 100 7 T 150 7 T 198 6"
                    stroke="#f9a8d4"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    initial={{ pathLength: reduce ? 1 : 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.1, delay: 1.2, ease: "easeInOut" }}
                  />
                </svg>
              </span>
            </motion.h1>

            <motion.p
              variants={heroItem}
              className="mb-8 max-w-md text-lg leading-relaxed text-white/90 md:text-xl"
            >
              5 دقائق شهرياً قد تنقذ حياتك. خطوات بسيطة يمكنكِ تعلمها اليوم.
            </motion.p>

            <motion.div variants={heroItem} className="flex flex-wrap gap-3">
              <a
                href="#steps"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-7 py-3.5 font-bold text-rose-800 shadow-2xl shadow-rose-950/30 transition hover:bg-pink-50"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-pink-200/70 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                />
                <span className="relative">ابدئي الدرس</span>
                <ArrowLeft className="relative h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1.5" />
              </a>
              <a
                href="#checklist"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-3.5 font-semibold text-white backdrop-blur-md transition hover:bg-white/20"
              >
                قائمة التحقق
              </a>
            </motion.div>
          </motion.div>

          {/* إحصائيات سريعة */}
          <div className="grid grid-cols-2 gap-4">
            {heroStats.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.label}
                  initial={reduce ? false : { opacity: 0, scale: 0.85, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.7, ease: EASE }}
                >
                  <motion.div
                    animate={reduce ? undefined : { y: [0, -6, 0] }}
                    transition={{ duration: 4 + i * 0.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
                    whileHover={reduce ? undefined : { scale: 1.05 }}
                    className="group relative overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-5 text-center text-white backdrop-blur-md transition-colors hover:bg-white/15"
                  >
                    <span
                      aria-hidden
                      className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                    />
                    <span className="relative mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 ring-4 ring-white/10">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="relative text-3xl font-bold">{s.value}</div>
                    <div className="relative mt-1 text-xs leading-tight opacity-90">
                      {s.label}
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <svg
          aria-hidden
          viewBox="0 0 1440 64"
          preserveAspectRatio="none"
          className="absolute inset-x-0 bottom-0 h-14 w-full text-[#FDF8F5]"
          fill="currentColor"
        >
          <path d="M0 32c240 40 480 40 720 16S1200 8 1440 32v32H0z" />
        </svg>
      </section>

      {/* ===== متى تفحصين؟ ===== */}
      <section className="relative mx-auto max-w-5xl px-6 py-24">
        <span
          aria-hidden
          className="pointer-events-none absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-pink-200/30 blur-3xl"
        />
        <div className="relative">
          <SectionHeading
            index="01"
            eyebrow="التوقيت"
            title="متى تفحصين؟"
            description="التوقيت الصحيح يسهّل اكتشاف أي تغير."
          />
          <TimingCards />
        </div>
      </section>

      {/* ===== الخطوات الخمس ===== */}
      <section id="steps" className="relative bg-gradient-to-b from-white to-pink-50/50 py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60 [background-image:radial-gradient(#fbcfe8_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)]"
        />
        <div className="relative mx-auto max-w-6xl px-6">
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
      <section id="checklist" className="relative mx-auto max-w-4xl px-6 py-24">
        <span
          aria-hidden
          className="pointer-events-none absolute -right-40 top-1/4 h-96 w-96 rounded-full bg-rose-200/30 blur-3xl"
        />
        <div className="relative">
          <SectionHeading
            index="03"
            eyebrow="قائمة التحقق"
            title="افحصي بثقة"
            description="حددي كل بند أثناء قيامك بالفحص."
          />
          <Reveal>
            <ChecklistCard />
          </Reveal>
        </div>
      </section>

      {/* ===== ماذا لو وجدتِ كتلة؟ ===== */}
      <section className="relative bg-gradient-to-b from-pink-50/50 to-white py-24">
        <div className="mx-auto max-w-4xl px-6">
          <SectionHeading
            index="04"
            eyebrow="الخطوة التالية"
            title="ماذا لو وجدتِ كتلة؟"
            description="لا تقلقي — معظم الكتل حميدة، لكن الفحص ضروري."
          />
          <Reveal>
            <div className="rounded-3xl bg-gradient-to-br from-pink-300 via-rose-200 to-pink-100 p-px shadow-xl shadow-pink-200/50">
              <div className="relative overflow-hidden rounded-[23px] bg-white p-8 md:p-10">
                <RibbonIcon className="pointer-events-none absolute -bottom-10 -left-10 h-56 w-56 -rotate-12 text-pink-100/70" />

                <div className="relative space-y-5">
                  {/* الخط الرابط بين الخطوات */}
                  <span
                    aria-hidden
                    className="absolute bottom-8 right-[23px] top-8 w-0.5 rounded-full bg-gradient-to-b from-pink-300 via-rose-300 to-pink-100"
                  />
                  {nextSteps.map((s, i) => (
                    <motion.div
                      key={s.num}
                      initial={{ opacity: 0, x: reduce ? 0 : 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
                      className="relative flex items-start gap-5"
                    >
                      <span className="relative z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-rose-500 text-lg font-bold text-white shadow-lg shadow-pink-300/50 ring-4 ring-white">
                        {s.num}
                      </span>
                      <div className="group flex-1 rounded-2xl border border-pink-100 bg-gradient-to-l from-pink-50/70 to-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-pink-200/50">
                        <div className="mb-1 flex items-center gap-2">
                          <span className="text-xl transition-transform duration-300 group-hover:scale-125">
                            {s.emoji}
                          </span>
                          <h4 className="text-xl font-bold text-gray-900">{s.title}</h4>
                        </div>
                        <p className="leading-relaxed text-gray-700">{s.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="relative mt-8 flex items-start gap-4 rounded-2xl border border-red-100 border-r-4 border-r-red-400 bg-gradient-to-l from-red-50 to-rose-50 p-5">
                  <span className="relative mt-1 flex h-7 w-7 flex-shrink-0 items-center justify-center">
                    {!reduce && (
                      <span className="absolute inset-0 animate-ping rounded-full bg-red-300/60" />
                    )}
                    <AlertCircle className="relative h-6 w-6 text-red-600" />
                  </span>
                  <p className="font-semibold leading-relaxed text-red-800">
                    إذا لاحظتِ كتلة جديدة أو تغيراً مستمراً، استشيري الطبيب فوراً.
                    لا تنتظري الدورة القادمة.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== التذكير الشهري ===== */}
      <section className="relative mx-auto max-w-3xl px-6 py-24">
        <span
          aria-hidden
          className="pointer-events-none absolute -left-32 top-1/3 h-80 w-80 rounded-full bg-pink-200/30 blur-3xl"
        />
        <div className="relative">
          <SectionHeading
            index="05"
            eyebrow="المتابعة"
            title="لا تنسي الفحص القادم"
            description="فعّلي تذكيراً شهرياً يصل لبريدكِ."
          />
          <Reveal>
            <ReminderForm />
          </Reveal>
        </div>
      </section>

      {/* ===== CTA ختامي ===== */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-rose-800 via-pink-700 to-rose-700 p-12 text-center text-white shadow-2xl shadow-rose-900/30 md:p-16">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-pink-300 blur-3xl" />
              <div className="absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-rose-300 blur-3xl" />
            </div>

            {[
              { t: "12%", l: "8%", d: 5 },
              { t: "70%", l: "11%", d: 6.5 },
              { t: "18%", l: "89%", d: 7 },
              { t: "76%", l: "85%", d: 5.5 },
              { t: "46%", l: "3%", d: 8 },
              { t: "52%", l: "95%", d: 6 },
            ].map((p, i) => (
              <motion.span
                key={i}
                aria-hidden
                className="absolute text-white/25"
                style={{ top: p.t, left: p.l }}
                animate={reduce ? undefined : { y: [0, -16, 0], rotate: [-8, 8, -8] }}
                transition={{ duration: p.d, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
              >
                <RibbonIcon className="h-7 w-7" />
              </motion.span>
            ))}

            <div className="relative">
              <div className="relative mb-8 inline-flex h-20 w-20 items-center justify-center">
                {!reduce &&
                  [0, 1].map((n) => (
                    <motion.span
                      key={n}
                      aria-hidden
                      className="absolute inset-0 rounded-3xl border-2 border-white/30"
                      initial={{ scale: 1, opacity: 0.6 }}
                      animate={{ scale: 1.9, opacity: 0 }}
                      transition={{ duration: 2.8, repeat: Infinity, delay: n * 1.4, ease: "easeOut" }}
                    />
                  ))}
                <motion.div
                  animate={reduce ? undefined : { rotate: [0, 8, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-white/15 backdrop-blur-md"
                >
                  <RibbonIcon className="h-10 w-10" />
                </motion.div>
              </div>

              <h2 className="mb-5 text-3xl font-bold leading-tight md:text-5xl">
                الفحص الذاتي عادة،
                <br />
                <span className="bg-gradient-to-l from-pink-100 via-white to-pink-200 bg-clip-text font-serif italic text-transparent">
                  والعادة تحمي
                </span>
              </h2>
              <p className="mx-auto mb-8 max-w-xl text-lg leading-relaxed opacity-90">
                اجعلي الفحص جزءاً من روتينكِ الشهري — أنتِ تستحقين العناية.
              </p>

              <div className="relative inline-block">
                {!reduce && (
                  <motion.span
                    aria-hidden
                    className="absolute inset-0 rounded-full bg-white/50 blur-xl"
                    animate={{ opacity: [0.25, 0.6, 0.25], scale: [1, 1.12, 1] }}
                    transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                  />
                )}
                <Link
                  href="/medical-checkups"
                  className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-white px-8 py-4 font-bold text-rose-800 shadow-2xl transition-all hover:scale-105 hover:bg-pink-50"
                >
                  <span
                    aria-hidden
                    className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-pink-200/70 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                  />
                  <span className="relative">الفحوصات الطبية</span>
                  <ArrowLeft className="relative h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1.5" />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* تنبيه */}
      <div className="mx-auto max-w-3xl px-6 pb-16">
        <Reveal>
          <p className="flex items-center justify-center gap-3 rounded-2xl border border-pink-100 bg-white/80 px-5 py-4 text-center text-sm text-gray-500 shadow-sm backdrop-blur">
            <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-pink-50 text-base">
              ⚕️
            </span>
            هذا المحتوى توعوي فقط ولا يغني عن استشارة الطبيب المختص.
          </p>
        </Reveal>
      </div>
    </main>
  );
}
