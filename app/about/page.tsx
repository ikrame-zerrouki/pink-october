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
import { ArrowLeft, AlertCircle, BookOpen } from "lucide-react";
import Reveal from "./components/Reveal";
import FloatingRibbon from "./components/FloatingRibbon";
import SectionHeading from "./components/SectionHeading";
import StatItem from "./components/StatItem";
import TabTypes from "./components/TabTypes";
import RiskAccordion from "./components/RiskAccordion";
import SymptomsTimeline from "./components/Timeline";
import MythCard from "./components/MythCard";
import { RibbonIcon } from "./components/icons";

const EASE = [0.22, 1, 0.36, 1] as const;

/* تمييز الكلمات المهمة بخط وردي تحتها */
const HL =
  "font-bold text-pink-600 [background:linear-gradient(transparent_62%,#fbcfe8_62%)]";

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

const stats = [
  { value: 2300000, suffix: "+", label: "حالة جديدة سنوياً" },
  { value: 90, suffix: "%", label: "نسبة الشفاء مبكراً" },
  { value: 1, suffix: " من 8", label: "نساء يُصبن خلال حياتهن" },
  { value: 99, suffix: "%", label: "بقاء 5 سنوات عند الاكتشاف المبكر" },
];

/* ───────── رسم توضيحي: خلايا منتظمة مقابل نمو عشوائي ───────── */
const healthyCells = Array.from({ length: 15 }, (_, i) => ({
  x: 30 + 35 * (i % 5),
  y: 25 + 35 * Math.floor(i / 5),
}));

const abnormalCells = [
  { x: 30, y: 30, r: 14 }, { x: 62, y: 22, r: 10 }, { x: 95, y: 35, r: 18 },
  { x: 130, y: 25, r: 11 }, { x: 165, y: 38, r: 15 }, { x: 45, y: 68, r: 17 },
  { x: 82, y: 78, r: 12 }, { x: 115, y: 72, r: 20 }, { x: 150, y: 85, r: 13 },
  { x: 176, y: 68, r: 9 }, { x: 60, y: 102, r: 9 }, { x: 100, y: 106, r: 11 },
];

function CellsVisual({ reduce }: { reduce: boolean }) {
  return (
    <div className="mb-8 grid gap-4 md:grid-cols-2">
      {/* سليمة */}
      <div className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-4">
        <svg viewBox="0 0 200 120" className="h-auto w-full" aria-hidden>
          {healthyCells.map((c, i) => (
            <g key={i}>
              <circle cx={c.x} cy={c.y} r="14" fill="#d1fae5" stroke="#34d399" strokeWidth="1.5" />
              <circle cx={c.x} cy={c.y} r="5" fill="#10b981" fillOpacity="0.55" />
            </g>
          ))}
        </svg>
        <p className="mt-2 text-center text-sm font-bold text-emerald-700">
          خلايا سليمة
          <span className="mr-2 font-normal text-emerald-600/80">— تنقسم بانتظام</span>
        </p>
      </div>

      {/* غير منتظمة */}
      <div className="rounded-2xl border border-rose-100 bg-gradient-to-br from-rose-50 to-white p-4">
        <svg viewBox="0 0 200 120" className="h-auto w-full" aria-hidden>
          {abnormalCells.map((c, i) => (
            <motion.g
              key={i}
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
              animate={reduce ? undefined : { scale: [1, 1.14, 1] }}
              transition={{
                duration: 2.4 + (i % 4) * 0.4,
                delay: i * 0.15,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <circle cx={c.x} cy={c.y} r={c.r} fill="#fecdd3" stroke="#f43f5e" strokeWidth="1.5" />
              <circle cx={c.x + 1} cy={c.y - 1} r={c.r * 0.5} fill="#e11d48" fillOpacity="0.6" />
            </motion.g>
          ))}
        </svg>
        <p className="mt-2 text-center text-sm font-bold text-rose-700">
          نمو غير طبيعي
          <span className="mr-2 font-normal text-rose-600/80">— تنقسم بلا توقف</span>
        </p>
      </div>
    </div>
  );
}

export default function AboutPage() {
  const reduce = !!useReducedMotion();

  // شريط تقدم القراءة
  const { scrollYProgress: pageProgress } = useScroll();
  const progressX = useSpring(pageProgress, { stiffness: 120, damping: 30 });

  // تأثير عمق في الواجهة الرئيسية
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroProgress, [0, 1], [0, 120]);
  const heroOpacity = useTransform(heroProgress, [0, 0.7], [1, 0]);

  return (
    <main className="min-h-screen overflow-hidden bg-[#FDF8F5] text-gray-800">
      {/* شريط تقدم القراءة */}
      <motion.div
        aria-hidden
        style={{ scaleX: progressX }}
        className="fixed inset-x-0 top-0 z-50 h-1 origin-right bg-gradient-to-l from-pink-400 via-rose-500 to-pink-400"
      />

      {/* ============ HERO سينمائي ============ */}
      <section
        ref={heroRef}
        className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-gradient-to-br from-rose-900 via-pink-800 to-rose-700 py-28"
      >
        {/* خلفية متحركة */}
        <FloatingRibbon />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.15),transparent_60%)]" />
        {/* شبكة دقيقة تتلاشى نحو الأطراف */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-60 [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
        />
        {/* كرات ضوء كبيرة */}
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
          className="relative z-10 mx-auto max-w-5xl px-6 text-center text-white"
        >
          <motion.div
            variants={heroContainer}
            initial={reduce ? false : "hidden"}
            animate="show"
          >
            <motion.div
              variants={heroItem}
              className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-semibold backdrop-blur-xl"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pink-300 opacity-70" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-pink-300" />
              </span>
              <RibbonIcon className="h-4 w-4" />
              أكتوبر الوردي — شهر التوعية العالمي
            </motion.div>

            <motion.h1
              variants={heroItem}
              className="mb-8 text-5xl font-bold leading-[1.1] md:text-7xl lg:text-8xl"
            >
              عن{" "}
              <span className="relative inline-block bg-gradient-to-l from-pink-200 via-white to-pink-300 bg-clip-text font-serif italic text-transparent">
                سرطان
                <svg
                  aria-hidden
                  viewBox="0 0 200 12"
                  preserveAspectRatio="none"
                  className="absolute -bottom-3 inset-x-0 h-3 w-full"
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
              <br />
              الثدي
            </motion.h1>

            <motion.p
              variants={heroItem}
              className="mx-auto mb-10 max-w-2xl text-lg font-light leading-relaxed text-white/90 md:text-2xl"
            >
              كل ما تحتاجين معرفته بلغة بسيطة، موثوقة، وبعيدة عن التعقيد الطبي.
            </motion.p>

            <motion.div
              variants={heroItem}
              className="flex flex-wrap justify-center gap-3"
            >
              <Link
                href="#intro"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-7 py-3.5 font-bold text-rose-800 shadow-2xl shadow-rose-950/30 transition hover:bg-pink-50"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-pink-200/70 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                />
                <BookOpen className="relative h-5 w-5" />
                <span className="relative">ابدئي القراءة</span>
              </Link>
              <Link
                href="/self-exam"
                className="group inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-3.5 font-semibold text-white backdrop-blur-md transition hover:bg-white/20"
              >
                الفحص الذاتي
                <ArrowLeft className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1.5" />
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* مؤشر التمرير */}
        <motion.div
          animate={reduce ? undefined : { y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-24 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-white/60"
        >
          <div className="flex h-10 w-6 justify-center rounded-full border-2 border-white/40 pt-2">
            <div className="h-2 w-1 rounded-full bg-white/60" />
          </div>
          <span className="text-[10px] tracking-[0.3em]">اكتشفي</span>
        </motion.div>

        {/* موجة تنتقل بالواجهة إلى لون الصفحة */}
        <svg
          aria-hidden
          viewBox="0 0 1440 64"
          preserveAspectRatio="none"
          className="absolute inset-x-0 bottom-0 h-16 w-full text-[#FDF8F5]"
          fill="currentColor"
        >
          <path d="M0 32c240 40 480 40 720 16S1200 8 1440 32v32H0z" />
        </svg>
      </section>

      {/* ============ إحصائيات ============ */}
      <section className="relative z-20 mx-auto -mt-16 max-w-5xl px-6">
        <Reveal>
          <div className="rounded-3xl bg-gradient-to-l from-pink-300 via-rose-300 to-pink-300 p-px shadow-2xl shadow-pink-300/40">
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[23px] bg-pink-100 md:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="bg-white px-4 py-8 md:py-10">
                  <StatItem value={s.value} suffix={s.suffix} label={s.label} />
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ============ 1. التعريف ============ */}
      <section id="intro" className="relative mx-auto max-w-5xl px-6 py-24">
        <SectionHeading
          index="01"
          eyebrow="التعريف"
          title="ما هو سرطان الثدي؟"
          description="فهم المرض هو الخطوة الأولى للتعامل معه بشجاعة ووعي."
        />
        <Reveal delay={0.2}>
          <div className="relative">
            <div
              aria-hidden
              className="absolute -right-6 -top-10 select-none font-serif text-9xl leading-none text-pink-200/80"
            >
              &ldquo;
            </div>
            <div className="relative rounded-3xl bg-gradient-to-br from-pink-300 via-rose-200 to-pink-100 p-px shadow-xl shadow-pink-200/50">
              <div className="relative overflow-hidden rounded-[23px] bg-white p-8 md:p-12">
                <RibbonIcon className="pointer-events-none absolute -bottom-10 -left-10 h-56 w-56 -rotate-12 text-pink-100/70" />

                <div className="relative">
                  <p className="mb-6 text-xl font-light leading-relaxed text-gray-800 md:text-2xl">
                    <strong className={HL}>سرطان الثدي</strong> هو نمو غير طبيعي
                    لخلايا الثدي، تنقسم فيه الخلايا بشكل عشوائي دون توقف، وتتجمع
                    مكوّنةً كتلة أو ورماً.
                  </p>

                  <CellsVisual reduce={reduce} />

                  <p className="mb-8 text-lg leading-relaxed text-gray-700">
                    يمكن أن يبدأ السرطان في أجزاء مختلفة من الثدي، وغالباً ما
                    ينشأ في <strong className={HL}>القنوات اللبنية</strong> أو{" "}
                    <strong className={HL}>الفصيصات</strong>. وإذا لم يُعالج
                    مبكراً، قد ينتشر إلى أجزاء أخرى من الجسم.
                  </p>

                  <div className="relative flex items-start gap-4 overflow-hidden rounded-2xl border-r-4 border-pink-500 bg-gradient-to-l from-pink-50 to-rose-50 p-6">
                    <span className="relative mt-1 flex h-7 w-7 flex-shrink-0 items-center justify-center">
                      {!reduce && (
                        <span className="absolute inset-0 animate-ping rounded-full bg-pink-300/60" />
                      )}
                      <AlertCircle className="relative h-6 w-6 text-pink-600" />
                    </span>
                    <p className="text-lg font-semibold leading-relaxed text-pink-900">
                      الاكتشاف المبكر يرفع نسبة الشفاء إلى أكثر من 90%، لذلك
                      الفحص الدوري ضروري حتى في غياب الأعراض.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ============ 2. الأنواع ============ */}
      <section className="relative bg-gradient-to-b from-white to-pink-50/50 py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60 [background-image:radial-gradient(#fbcfe8_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,transparent,black_30%,black_70%,transparent)]"
        />
        <div className="relative mx-auto max-w-5xl px-6">
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
      <section className="relative mx-auto max-w-5xl px-6 py-24">
        <span
          aria-hidden
          className="pointer-events-none absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-pink-200/30 blur-3xl"
        />
        <div className="relative">
          <SectionHeading
            index="03"
            eyebrow="عوامل الخطر"
            title="ما الذي يزيد الاحتمالية؟"
            description="وجود عامل خطر لا يعني الإصابة، لكنه يرفع الاحتمالية."
          />
          <Reveal delay={0.2}>
            <RiskAccordion />
          </Reveal>
        </div>
      </section>

      {/* ============ 4. الأعراض (Timeline) ============ */}
      <section className="relative bg-gradient-to-b from-pink-50/50 to-white py-24">
        <div className="mx-auto max-w-5xl px-6">
          <SectionHeading
            index="04"
            eyebrow="الأعراض"
            title="علامات يجب الانتباه لها"
            description="الانتباه لهذه العلامات قد ينقذ حياتك."
          />
          <SymptomsTimeline />
          <Reveal delay={0.3}>
            <div className="relative mt-14 flex items-start gap-4 overflow-hidden rounded-2xl border border-red-100 border-r-4 border-r-red-400 bg-gradient-to-l from-red-50 to-rose-50 p-6 shadow-lg shadow-red-100/60">
              <span className="relative mt-1 flex h-7 w-7 flex-shrink-0 items-center justify-center">
                {!reduce && (
                  <span className="absolute inset-0 animate-ping rounded-full bg-red-300/60" />
                )}
                <AlertCircle className="relative h-6 w-6 text-red-600" />
              </span>
              <p className="font-semibold leading-relaxed text-red-800">
                وجود أي من هذه العلامات لا يعني بالضرورة وجود سرطان، لكن يجب
                استشارة الطبيب فوراً للتأكد.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ 5. خرافات وحقائق ============ */}
      <section className="relative mx-auto max-w-4xl px-6 py-24">
        <span
          aria-hidden
          className="pointer-events-none absolute -right-40 top-1/4 h-96 w-96 rounded-full bg-rose-200/30 blur-3xl"
        />
        <div className="relative">
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
        </div>
      </section>

      {/* ============ CTA ختامي ============ */}
      <section className="mx-auto max-w-5xl px-6 py-24">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-rose-800 via-pink-700 to-rose-700 p-12 text-center text-white shadow-2xl shadow-rose-900/30 md:p-20">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-pink-300 blur-3xl" />
              <div className="absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-rose-300 blur-3xl" />
            </div>

            {/* أشرطة توعية عائمة */}
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

              <h2 className="mb-5 text-4xl font-bold leading-tight md:text-5xl">
                الخطوة التالية:
                <br />
                <span className="bg-gradient-to-l from-pink-100 via-white to-pink-200 bg-clip-text font-serif italic text-transparent">
                  تعلّمي الفحص الذاتي
                </span>
              </h2>
              <p className="mx-auto mb-10 max-w-xl text-lg leading-relaxed opacity-90 md:text-xl">
                <strong className="font-bold text-pink-200">5 خطوات</strong>{" "}
                بسيطة،{" "}
                <strong className="font-bold text-pink-200">5 دقائق</strong>{" "}
                شهرياً، يمكنها أن تنقذ حياتك.
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
                  href="/self-exam"
                  className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-white px-10 py-4 text-lg font-bold text-rose-800 shadow-2xl transition-all hover:scale-105 hover:bg-pink-50"
                >
                  <span
                    aria-hidden
                    className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-pink-200/70 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                  />
                  <span className="relative">ابدئي الآن</span>
                  <ArrowLeft className="relative h-6 w-6 transition-transform duration-300 group-hover:-translate-x-1.5" />
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
