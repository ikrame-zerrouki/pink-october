"use client";

export default function Ribbon() {
  return (
    <div className="relative mx-auto w-full max-w-sm">
      <div
        className="absolute inset-6 rounded-full bg-blush-mid"
        aria-hidden="true"
      />
      <svg
        viewBox="0 0 200 260"
        className="relative w-full"
        role="img"
        aria-label="الشريط الوردي رمز التوعية"
      >
        <style>{`
          .ribbon-line {
            stroke-dasharray: 1;
            stroke-dashoffset: 1;
            animation: draw 2.6s cubic-bezier(.65,0,.35,1) .2s forwards;
          }
          .ribbon-fill {
            opacity: 0;
            animation: fill 1s ease 2.4s forwards;
          }
          @keyframes draw { to { stroke-dashoffset: 0; } }
          @keyframes fill { to { opacity: 1; } }
          @media (prefers-reduced-motion: reduce) {
            .ribbon-line { animation: none; stroke-dashoffset: 0; }
            .ribbon-fill { animation: none; opacity: 1; }
          }
        `}</style>
        <path
          className="ribbon-fill"
          fill="#c2185b"
          fillOpacity=".18"
          d="M100 140C40 90 55 20 100 20s60 70 0 120Z"
        />
        <g
          fill="none"
          stroke="#c2185b"
          strokeWidth="13"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            className="ribbon-line"
            pathLength={1}
            d="M100 140C40 90 55 20 100 20s60 70 0 120"
          />
          <path
            className="ribbon-line"
            pathLength={1}
            d="M100 140C90 180 70 210 45 240"
          />
          <path
            className="ribbon-line"
            pathLength={1}
            d="M100 140C110 180 130 210 155 240"
          />
        </g>
      </svg>
    </div>
  );
}