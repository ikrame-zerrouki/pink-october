"use client";

import { useState } from "react";

type Status = "idle" | "copied" | "error";

export default function ShareButton({ message }: { message: string }) {
  const [status, setStatus] = useState<Status>("idle");

  async function share() {
    setStatus("idle");

    // محاولة المشاركة الأصلية إن كانت مدعومة
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        if (!navigator.canShare || navigator.canShare({ text: message })) {
          await navigator.share({ text: message });
          return;
        }
      } catch (e) {
        if ((e as Error).name === "AbortError") return;
        // نفشل بهدوء ونكمل إلى النسخ
      }
    }

    // fallback: النسخ
    try {
      await navigator.clipboard.writeText(message);
      setStatus("copied");
      setTimeout(() => setStatus("idle"), 2500);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  }

  return (
    <>
      <button
        onClick={share}
        className="mt-9 rounded-full bg-ink px-10 py-4 font-bold text-white transition hover:bg-rose-deep focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-rose-deep"
      >
        {status === "copied"
          ? "تم نسخ الرسالة ✓"
          : status === "error"
          ? "تعذّرت المشاركة"
          : "شاركي الرسالة"}
      </button>
      <p aria-live="polite" className="sr-only">
        {status === "copied"
          ? "تم نسخ الرسالة"
          : status === "error"
          ? "تعذّرت المشاركة، حاولي مرة أخرى"
          : ""}
      </p>
    </>
  );
}