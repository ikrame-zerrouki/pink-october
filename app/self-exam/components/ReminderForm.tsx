"use client";

import { useId, useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Bell, Check, Mail } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const DOTS = Array.from({ length: 10 }, (_, i) => {
  const a = (i * 360) / 10;
  return {
    x: Math.round(Math.cos((a * Math.PI) / 180) * 56),
    y: Math.round(Math.sin((a * Math.PI) / 180) * 56),
    s: 5 + (i % 3) * 2,
  };
});

type Status = "idle" | "loading" | "sent" | "error";

export default function ReminderForm({
  onSubmit,
}: {
  /** اختياري: اربطيه بالـ API الحقيقي لاحقاً. إذا رمى خطأً تظهر رسالة فشل. */
  onSubmit?: (data: { email: string; day: number }) => void | Promise<void>;
}) {
  const reduce = !!useReducedMotion();
  const uid = useId();
  const [email, setEmail] = useState("");
  const [day, setDay] = useState("1");
  const [status, setStatus] = useState<Status>("idle");
  const [touched, setTouched] = useState(false);

  const validEmail = /^\S+@\S+\.\S+$/.test(email.trim());
  const showEmailError = touched && !validEmail;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!validEmail) return;
    setStatus("loading");
    try {
      // هنا يمكنك ربط API حقيقي لاحقاً
      await onSubmit?.({ email: email.trim(), day: Number(day) });
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  const edit = () => setStatus("idle");

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-pink-600 via-rose-500 to-pink-500 p-8 text-white shadow-2xl shadow-pink-500/30 md:p-10">
      {/* خلفية متحركة */}
      <motion.span
        aria-hidden
        className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/15 blur-3xl"
        animate={reduce ? undefined : { x: [0, -30, 0], y: [0, 24, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.span
        aria-hidden
        className="absolute -bottom-20 -left-16 h-64 w-64 rounded-full bg-rose-300/30 blur-3xl"
        animate={reduce ? undefined : { x: [0, 30, 0], y: [0, -24, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <span
        aria-hidden
        className="absolute inset-0 opacity-40 [background-image:radial-gradient(rgba(255,255,255,0.25)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]"
      />

      <div className="relative">
        {/* الجرس */}
        <div className="relative mb-5 inline-flex">
          <motion.div
            animate={reduce ? undefined : { rotate: [0, -16, 14, -10, 6, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 3.2, ease: "easeInOut" }}
            style={{ transformOrigin: "50% 15%" }}
            className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/30 bg-white/20 shadow-lg backdrop-blur-md"
          >
            <Bell className="h-7 w-7" />
          </motion.div>
          <span className="absolute -right-1 -top-1 flex h-3.5 w-3.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-70" />
            <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-pink-500 bg-white" />
          </span>
        </div>

        <h3 className="mb-2 text-2xl font-bold md:text-3xl">تذكير شهري بالفحص</h3>
        <p className="mb-7 leading-relaxed opacity-90">
          سنرسل لكِ تذكيراً ودياً كل شهر في اليوم الذي تختارينه.
        </p>

        <AnimatePresence mode="wait">
          {status !== "sent" ? (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              noValidate
              className="space-y-5"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              {/* البريد */}
              <div>
                <label htmlFor={`${uid}-email`} className="mb-2 block text-sm font-semibold">
                  بريدك الإلكتروني
                </label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-pink-400" />
                  <input
                    id={`${uid}-email`}
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => setTouched(true)}
                    aria-invalid={showEmailError}
                    aria-describedby={showEmailError ? `${uid}-err` : undefined}
                    placeholder="name@example.com"
                    className={`w-full rounded-2xl bg-white/95 py-3.5 pl-5 pr-12 text-gray-900 outline-none transition placeholder:text-gray-400 focus:ring-4 ${
                      showEmailError ? "ring-4 ring-red-300/70" : "focus:ring-white/40"
                    }`}
                  />
                </div>
                <AnimatePresence>
                  {showEmailError && (
                    <motion.p
                      id={`${uid}-err`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-2 overflow-hidden text-sm font-medium text-white"
                    >
                      من فضلك أدخلي بريداً إلكترونياً صحيحاً.
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* اختيار اليوم: تقويم مصغر */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-semibold">اختاري يوم التذكير</span>
                  <span className="rounded-full bg-white/20 px-3 py-0.5 text-xs font-bold">
                    يوم {day} من كل شهر
                  </span>
                </div>
                <div
                  role="group"
                  aria-label="يوم التذكير"
                  className="grid grid-cols-7 gap-1.5 rounded-2xl border border-white/15 bg-white/10 p-2.5 backdrop-blur-sm"
                >
                  {Array.from({ length: 28 }, (_, i) => i + 1).map((d) => {
                    const active = Number(day) === d;
                    return (
                      <button
                        key={d}
                        type="button"
                        aria-pressed={active}
                        onClick={() => setDay(String(d))}
                        className={`relative aspect-square rounded-xl text-sm font-bold tabular-nums transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                          active ? "text-pink-600" : "text-white/90 hover:bg-white/20"
                        }`}
                      >
                        {active && (
                          <motion.span
                            layoutId={`${uid}-daypill`}
                            className="absolute inset-0 rounded-xl bg-white shadow-lg"
                            transition={{ type: "spring", stiffness: 450, damping: 32 }}
                          />
                        )}
                        <span className="relative">{d}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {status === "error" && (
                <p role="alert" className="rounded-xl bg-white/20 px-4 py-3 text-sm font-medium">
                  تعذّر تفعيل التذكير الآن، حاولي مرة أخرى.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="group relative flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-2xl bg-white py-4 font-bold text-pink-600 shadow-xl shadow-pink-900/20 transition hover:bg-pink-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50 disabled:opacity-80"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-pink-200/70 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                />
                {status === "loading" ? (
                  <>
                    <span className="relative h-5 w-5 animate-spin rounded-full border-2 border-pink-300 border-t-pink-600" />
                    <span className="relative">جارٍ التفعيل…</span>
                  </>
                ) : (
                  <>
                    <Bell className="relative h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
                    <span className="relative">فعّلي التذكير</span>
                  </>
                )}
              </button>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 14, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="rounded-3xl border border-white/20 bg-white/15 p-7 text-center backdrop-blur-md"
            >
              <div className="relative mx-auto mb-5 h-20 w-20">
                {!reduce &&
                  DOTS.map((d, i) => (
                    <motion.span
                      key={i}
                      aria-hidden
                      className="absolute left-1/2 top-1/2 rounded-full bg-white"
                      style={{ width: d.s, height: d.s, marginLeft: -d.s / 2, marginTop: -d.s / 2 }}
                      initial={{ x: 0, y: 0, opacity: 0 }}
                      animate={{ x: d.x, y: d.y, opacity: [0, 1, 0] }}
                      transition={{ duration: 1, delay: 0.35 + i * 0.02, ease: "easeOut" }}
                    />
                  ))}
                <svg viewBox="0 0 80 80" className="relative h-full w-full" aria-hidden>
                  <circle cx="40" cy="40" r="34" fill="white" fillOpacity="0.15" />
                  <motion.circle
                    cx="40"
                    cy="40"
                    r="34"
                    fill="none"
                    stroke="white"
                    strokeWidth="4"
                    strokeLinecap="round"
                    transform="rotate(-90 40 40)"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                  />
                  <motion.path
                    d="M26 41l10 10 19-21"
                    fill="none"
                    stroke="white"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.4, delay: 0.55 }}
                  />
                </svg>
              </div>

              <p className="mb-1 inline-flex items-center gap-2 text-xl font-bold">
                تم التفعيل
                <Check className="h-5 w-5" strokeWidth={3} />
              </p>
              <p className="text-sm opacity-90">سنذكّركِ يوم {day} من كل شهر</p>
              <p dir="ltr" className="mx-auto mt-3 w-fit max-w-full truncate rounded-full bg-white/20 px-4 py-1 text-xs font-medium">
                {email}
              </p>

              <button
                type="button"
                onClick={edit}
                className="mt-5 text-sm font-semibold underline decoration-white/50 underline-offset-4 transition hover:decoration-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                تعديل البريد أو اليوم
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
