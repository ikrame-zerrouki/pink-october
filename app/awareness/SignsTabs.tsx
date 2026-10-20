"use client";

import { useRef, useState } from "react";

const signs = [
  {
    title: "كتلة أو تورم جديد",
    text: "ظهور كتلة أو تورم لم يكن موجودًا من قبل في الثدي أو في منطقة الإبط.",
    action: "لا تنتظري، احجزي موعدًا للتقييم الطبي.",
  },
  {
    title: "تغيّر في الجلد أو الشكل",
    text: "انكماش أو تجعّد أو احمرار في جلد الثدي، أو تغيّر غير معتاد في شكله أو حجمه.",
    action: "صوّري التغيّر إن أمكن، واعرضيه على الطبيب.",
  },
  {
    title: "تغيّر في الحلمة",
    text: "انسحاب الحلمة إلى الداخل، أو تقشّر في جلدها، أو إفراز غير معتاد، خاصة إن كان دمويًا.",
    action: "استشيري مختصًا في أقرب وقت.",
  },
];

export default function SignsTabs() {
  const [active, setActive] = useState(0);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(e: React.KeyboardEvent, i: number) {
    const last = signs.length - 1;
    let next: number | null = null;

    if (e.key === "ArrowLeft") next = i === last ? 0 : i + 1; // RTL: يسار = التالي
    else if (e.key === "ArrowRight") next = i === 0 ? last : i - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;

    if (next !== null) {
      e.preventDefault();
      setActive(next);
      tabsRef.current[next]?.focus();
    }
  }

  return (
    <section id="signs" className="mx-auto max-w-6xl px-6 py-24">
      <h2 className="display text-3xl font-bold md:text-5xl">علامات تستحق الانتباه</h2>
      <p className="mt-4 max-w-xl leading-8 text-ink/70">
        اختاري علامة لتعرفي المزيد عنها وماذا تفعلين عند ملاحظتها.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-[1fr_1.4fr]">
        <div role="tablist" aria-label="العلامات" className="flex flex-col gap-3">
          {signs.map((s, i) => (
            <button
              key={s.title}
              ref={(el) => {
                tabsRef.current[i] = el;
              }}
              role="tab"
              id={`tab-${i}`}
              aria-selected={active === i}
              aria-controls="sign-panel"
              tabIndex={active === i ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={`rounded-2xl border px-6 py-5 text-right text-lg font-bold transition ${
                active === i
                  ? "border-rose-deep bg-rose-deep text-white"
                  : "border-ink/15 bg-white hover:border-rose-deep"
              }`}
            >
              {s.title}
            </button>
          ))}
        </div>

        <div
          id="sign-panel"
          role="tabpanel"
          aria-labelledby={`tab-${active}`}
          aria-live="polite"
          className="flex flex-col justify-between rounded-3xl bg-white p-8 md:p-10"
        >
          <div>
            <h3 className="display text-3xl font-bold text-rose-deep">
              {signs[active].title}
            </h3>
            <p className="mt-5 text-lg leading-9 text-ink/80">
              {signs[active].text}
            </p>
          </div>
          <p className="mt-10 border-r-4 border-rose-deep pr-4 font-bold">
            {signs[active].action}
          </p>
        </div>
      </div>

      <p className="mt-8 max-w-3xl text-sm leading-7 text-ink/70">
        هذه العلامات لا تعني بالضرورة وجود سرطان، لكن من المهم استشارة مختص
        صحي عند ملاحظة تغيّر جديد أو غير معتاد.
      </p>
    </section>
  );
}