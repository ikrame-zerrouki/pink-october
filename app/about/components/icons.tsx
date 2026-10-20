import type { ReactNode } from "react";

type IconProps = { className?: string };

/**
 * غلاف مشترك: خطوط ناعمة بحواف دائرية + تعبئة خفيفة (Duotone)
 * تأخذ لونها من currentColor فتتوافق مع أي ثيم (text-pink-400 …).
 */
function Svg({
  className,
  strokeWidth = 1.75,
  children,
}: {
  className: string;
  strokeWidth?: number;
  children: ReactNode;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

const SOFT = 0.16; // شفافية التعبئة الخفيفة

/* شريط التوعية */
export function RibbonIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <Svg className={className}>
      <path
        d="M12 13C9 11 7.5 9 7.5 6.5A4.5 4.5 0 0 1 12 2a4.5 4.5 0 0 1 4.5 4.5C16.5 9 15 11 12 13z"
        fill="currentColor"
        fillOpacity={SOFT}
      />
      <path d="M12 13l-4.6 8.6 3.1-.6M12 13l4.6 8.6-3.1-.6" />
      <circle cx="12" cy="6.6" r="1" fill="currentColor" stroke="none" />
    </Svg>
  );
}

/* الحمض النووي: لولب مزدوج بدرجات متقاطعة */
export function DNAIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M7 3c0 5 10 4 10 9s-10 4-10 9" />
      <path d="M17 3c0 5-10 4-10 9s10 4 10 9" />
      <path d="M8.2 4.6h7.6M7.6 12h8.8M8.2 19.4h7.6" strokeOpacity={0.55} />
      <circle cx="7" cy="3" r="1" fill="currentColor" stroke="none" />
      <circle cx="17" cy="21" r="1" fill="currentColor" stroke="none" />
    </Svg>
  );
}

/* الكرة الأرضية */
export function GlobeIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <Svg className={className}>
      <circle cx="12" cy="12" r="10" fill="currentColor" fillOpacity={SOFT} />
      <ellipse cx="12" cy="12" rx="4.2" ry="10" />
      <path d="M2 12h20M3.4 7h17.2M3.4 17h17.2" strokeOpacity={0.6} />
    </Svg>
  );
}

/* القلب مع نبض */
export function HeartIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <Svg className={className}>
      <path
        d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"
        fill="currentColor"
        fillOpacity={SOFT}
      />
      <path d="M7.5 12h2l1.5-2.6 2 5.2 1.5-2.6h2" strokeWidth={1.5} />
    </Svg>
  );
}

/* صح */
export function CheckIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <Svg className={className} strokeWidth={2.6}>
      <path d="M20 6 9.5 17 4 11.5" />
    </Svg>
  );
}

/* إغلاق */
export function XIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <Svg className={className} strokeWidth={2.6}>
      <path d="M18 6 6 18M6 6l12 12" />
    </Svg>
  );
}

/* تنبيه */
export function AlertIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <Svg className={className}>
      <path
        d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"
        fill="currentColor"
        fillOpacity={SOFT}
      />
      <path d="M12 9v4.2" strokeWidth={2.2} />
      <circle cx="12" cy="17" r="1.1" fill="currentColor" stroke="none" />
    </Svg>
  );
}

/* سهم لليسار */
export function ArrowLeftIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <Svg className={className} strokeWidth={2.2}>
      <path d="M20 12H4M10.5 5.5 4 12l6.5 6.5" />
    </Svg>
  );
}

/* لمعة: نجمة رئيسية + نجمتان صغيرتان */
export function SparkleIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <Svg className={className}>
      <path
        d="M10.5 3.5l1.9 5.6 5.6 1.9-5.6 1.9-1.9 5.6-1.9-5.6L3 11l5.6-1.9 1.9-5.6z"
        fill="currentColor"
        fillOpacity={SOFT}
      />
      <path d="M19 3v4M17 5h4" strokeOpacity={0.8} />
      <path d="M18.5 16.5v3.5M16.75 18.25h3.5" strokeOpacity={0.6} />
    </Svg>
  );
}
