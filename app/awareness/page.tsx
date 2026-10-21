import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "الرئيسية | مشروعي",
  description: "مرحبًا بك في مشروعي. اكتشف صفحاتنا التوعوية والمحتوى الهادف.",
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-blush text-ink">
      {/* التنقل */}
      <header className="sticky top-0 z-20 border-b border-ink/10 bg-blush/90 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="display text-xl font-bold text-rose-deep">
            مشروعي
          </Link>
          <div className="hidden items-center gap-8 text-sm font-medium md:flex">
            <Link href="/" className="hover:text-rose-deep">الرئيسية</Link>
            <Link href="/awareness" className="hover:text-rose-deep">أكتوبر الوردي</Link>
            <a
              href="#contact"
              className="rounded-full bg-ink px-5 py-2 text-white transition hover:bg-rose-deep"
            >
              تواصل معنا
            </a>
          </div>
        </nav>
      </header>

      {/* الواجهة الرئيسية */}
      <section
        id="top"
        className="mx-auto grid max-w-6xl items-center gap-10 px-6 pb-20 pt-14 md:grid-cols-[1.2fr_1fr] md:pt-20"
      >
        <div>
          <p className="inline-block rounded-full border border-rose-deep/40 px-4 py-1.5 text-sm text-rose-deep">
            مرحبًا بك في مشروعي
          </p>
          <h1 className="display mt-6 text-5xl font-bold leading-[1.25] md:text-7xl">
            محتوى هادف،
            <span className="block text-rose-deep">وتجربة تُلهم</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-9 text-ink/75">
            نقدّم صفحات توعوية ومحتوى يهتم بالإنسان. ابدأ رحلتك من هنا، واكتشف
            ما نقدّمه لك.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              href="/awareness"
              className="rounded-full bg-rose-deep px-8 py-4 font-bold text-white shadow-lg shadow-rose-deep/25 transition hover:bg-rose-deep-hover focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-ink"
            >
              زُر صفحة أكتوبر الوردي 🎀
            </Link>
            <a
              href="#features"
              className="rounded-full border border-ink/25 px-8 py-4 font-medium transition hover:border-ink focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-ink"
            >
              تعرّف على المزيد
            </a>
          </div>
        </div>

        {/* بطاقة زخرفية بسيطة بدل الشريط */}
        <div className="relative mx-auto w-full max-w-sm">
          <div className="absolute inset-6 rounded-full bg-blush-mid" aria-hidden="true" />
          <div className="relative flex aspect-square items-center justify-center rounded-3xl bg-white p-8 shadow-xl shadow-rose-deep/10">
            <div className="text-center">
              <span className="text-7xl" aria-hidden="true">🎀</span>
              <p className="display mt-4 text-2xl font-bold text-rose-deep">
                أكتوبر الوردي
              </p>
              <p className="mt-2 text-sm text-ink/60">
                صفحة توعوية جديدة
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* المميزات / الأقسام */}
      <section id="features" className="bg-ink px-6 py-20 text-white">
        <div className="mx-auto max-w-6xl">
          <h2 className="display text-3xl font-bold md:text-5xl">ماذا تجد هنا؟</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              {
                title: "محتوى توعوي",
                text: "صفحات مخصصة لنشر الوعي حول قضايا تهم المجتمع.",
                href: "/awareness",
                cta: "أكتوبر الوردي",
              },
              {
                title: "مصادر موثوقة",
                text: "معلومات مستند إليها من جهات صحية معتمدة.",
                href: "/awareness",
                cta: "اعرف المزيد",
              },
              {
                title: "مشاركة سهلة",
                text: "شارك الرسائل التوعوية مع من تحب بضغطة واحدة.",
                href: "/awareness#share",
                cta: "شارك الآن",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="rounded-3xl border border-white/15 bg-white/5 p-8 transition hover:border-[#ff8fb3]/50"
              >
                <h3 className="display text-2xl font-bold text-[#ff8fb3]">
                  {f.title}
                </h3>
                <p className="mt-4 leading-8 text-white/75">{f.text}</p>
                <Link
                  href={f.href}
                  className="mt-6 inline-block text-sm font-bold text-white underline underline-offset-4 hover:text-[#ff8fb3]"
                >
                  {f.cta} ←
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* دعوة للتواصل */}
      <section id="contact" className="px-6 py-24 text-center">
        <h2 className="display mx-auto max-w-3xl text-4xl font-bold leading-[1.3] md:text-6xl">
          هل لديك سؤال أو اقتراح؟
        </h2>
        <p className="mx-auto mt-6 max-w-xl leading-9 text-ink/75">
          نرحّب بتواصلك معنا في أي وقت.
        </p>
        <a
          href="mailto:contact@example.com"
          className="mt-9 inline-block rounded-full bg-ink px-10 py-4 font-bold text-white transition hover:bg-rose-deep focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-rose-deep"
        >
          راسلنا
        </a>
      </section>

      {/* التذييل */}
      <footer className="border-t border-ink/10 px-6 py-8 text-center text-sm text-ink/70">
        <p className="display text-base font-bold text-rose-deep">
          مشروعي | محتوى يهتم بالإنسان
        </p>
       <p className="mt-2">© 2026  جميع الحقوق محفوظة.</p>
      </footer>
    </main>
  );
}