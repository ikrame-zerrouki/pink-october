"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import { ArrowLeft, Menu, Ribbon, X } from "lucide-react";
import { Aref_Ruqaa, IBM_Plex_Sans_Arabic } from "next/font/google";

/* The header sits outside page <main>, so it loads the site fonts itself. */
const display = Aref_Ruqaa({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-display",
  display: "swap",
});
const body = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
  variable: "--font-body",
  display: "swap",
});

const D = "font-[family-name:var(--font-display)]";
const B = "font-[family-name:var(--font-body)]";
const FOCUS =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-2";

const navLinks = [
  { href: "/", label: "الرئيسية" },
  { href: "/about", label: "عن المرض" },
  { href: "/self-exam", label: "الفحص الذاتي" },
  { href: "/medical-checkups", label: "الفحوصات الطبية" },
  { href: "/prevention", label: "الوقاية" },
  { href: "/pink-october", label: "الشهر الوردي" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const pathname = usePathname();
  const reduce = useReducedMotion();

  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    mass: 0.3,
  });

  // hide while reading down, come back as soon as the reader scrolls up
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 20);
    if (reduce || open) {
      setHidden(false);
      return;
    }
    if (y > prev && y > 240) setHidden(true);
    else if (y < prev) setHidden(false);
  });

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <motion.header
      dir="rtl"
      animate={{ y: hidden ? "-130%" : 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={`${display.variable} ${body.variable} ${B} pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6`}
    >
      {/* click-away layer for the mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.button
            aria-label="إغلاق القائمة"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="pointer-events-auto fixed inset-0 -z-10 cursor-default bg-rose-950/25 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      <div className="pointer-events-auto mx-auto max-w-6xl">
        {/* ===== the pill ===== */}
        <div
          className={`relative flex h-14 items-center justify-between rounded-full ps-3 pe-2.5 ring-1 backdrop-blur-xl transition-all duration-300 md:h-16 md:ps-4 ${
            scrolled
              ? "bg-white/90 ring-pink-200 shadow-[0_18px_50px_-18px_rgba(190,24,93,0.35)]"
              : "bg-white/70 ring-pink-100 shadow-lg shadow-pink-500/5"
          }`}
        >
          {/* logo */}
          <Link href="/" className={`group flex items-center gap-3 rounded-full ${FOCUS}`}>
            <span className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-500/30 transition duration-300 group-hover:-rotate-6 group-hover:scale-110 md:h-11 md:w-11">
              <Ribbon className="h-5 w-5" aria-hidden />
            </span>
            <span className="leading-tight">
              <span className={`${D} block text-xl font-bold text-gray-900 md:text-2xl`}>
                أكتوبر وردي
              </span>
              <span className="block text-[10px] font-semibold text-pink-600 md:text-xs">
                توعية • وقاية • أمل
              </span>
            </span>
          </Link>

          {/* desktop nav */}
          <nav
            aria-label="التنقل الرئيسي"
            className="relative hidden items-center gap-0.5 lg:flex"
            onMouseLeave={() => setHovered(null)}
          >
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  onMouseEnter={() => setHovered(link.href)}
                  onFocus={() => setHovered(link.href)}
                  className={`relative rounded-full px-4 py-2 text-sm font-semibold transition-colors ${FOCUS} ${
                    active ? "text-white" : "text-gray-700 hover:text-pink-700"
                  }`}
                >
                  {hovered === link.href && !active && (
                    <motion.span
                      layoutId="navHover"
                      className="absolute inset-0 rounded-full bg-pink-50"
                      transition={{ type: "spring", stiffness: 500, damping: 36 }}
                    />
                  )}
                  {active && (
                    <motion.span
                      layoutId="activeNav"
                      className="absolute inset-0 rounded-full bg-gradient-to-l from-pink-500 to-rose-500 shadow-md shadow-pink-500/30"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative">{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* actions */}
          <div className="flex items-center gap-2">
            <Link
              href="/self-exam"
              className={`group relative hidden items-center gap-2 overflow-hidden rounded-full bg-gradient-to-l from-pink-500 to-rose-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-pink-500/30 transition hover:from-pink-600 hover:to-rose-600 md:inline-flex lg:hidden xl:inline-flex ${FOCUS}`}
            >
              <span
                aria-hidden
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 group-hover:translate-x-full"
              />
              <span className="relative">ابدئي الفحص</span>
              <ArrowLeft className="relative h-4 w-4 transition-transform group-hover:-translate-x-1" aria-hidden />
            </Link>

            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className={`flex h-10 w-10 items-center justify-center rounded-full bg-pink-50 text-pink-600 transition hover:bg-pink-100 lg:hidden md:h-11 md:w-11 ${FOCUS}`}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={open ? "x" : "menu"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="flex"
                >
                  {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>

          {/* reading progress: a pink thread along the bottom of the pill */}
          <motion.span
            aria-hidden
            style={{ scaleX: progress, transformOrigin: "right" }}
            className={`absolute inset-x-8 -bottom-px h-[3px] rounded-full bg-gradient-to-l from-pink-500 to-rose-500 transition-opacity duration-300 ${
              scrolled ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>

        {/* ===== mobile sheet ===== */}
        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="mt-2 overflow-hidden rounded-[2rem] bg-white/95 p-3 shadow-2xl shadow-pink-500/20 ring-1 ring-pink-100 backdrop-blur-xl lg:hidden"
            >
              <motion.nav
                aria-label="القائمة"
                className="flex flex-col gap-1"
                initial="hidden"
                animate="show"
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
                }}
              >
                {navLinks.map((link) => {
                  const active = isActive(link.href);
                  return (
                    <motion.div
                      key={link.href}
                      variants={{
                        hidden: { opacity: 0, x: 16 },
                        show: { opacity: 1, x: 0 },
                      }}
                    >
                      <Link
                        href={link.href}
                        aria-current={active ? "page" : undefined}
                        className={`flex items-center justify-between rounded-2xl px-5 py-3.5 transition ${FOCUS} ${
                          active
                            ? "bg-gradient-to-l from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-500/25"
                            : "text-gray-800 hover:bg-pink-50"
                        }`}
                      >
                        <span className={`${D} text-xl font-bold`}>{link.label}</span>
                        <ArrowLeft
                          className={`h-4 w-4 ${active ? "text-white" : "text-pink-400"}`}
                          aria-hidden
                        />
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.nav>

              <Link
                href="/self-exam"
                className={`mt-3 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-l from-pink-500 to-rose-500 px-4 py-3.5 font-bold text-white shadow-lg shadow-pink-500/30 ${FOCUS}`}
              >
                ابدئي الفحص الذاتي
                <ArrowLeft className="h-4 w-4" aria-hidden />
              </Link>
              <p className="mt-3 pb-1 text-center text-xs text-pink-600/80">
                توعية • وقاية • أمل
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
