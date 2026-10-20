import { ArrowLeftIcon, CheckIcon, XIcon } from "./icons";

export default function MythFactCard({
  myth,
  fact,
}: {
  myth: string;
  fact: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className="grid md:grid-cols-2">
        {/* ───── الخرافة ───── */}
        <div className="relative bg-gradient-to-br from-rose-50 via-red-50 to-orange-50/60 p-7 md:p-8">
          <div aria-hidden className="absolute inset-0 overflow-hidden">
            <span className="absolute -right-4 -top-12 select-none font-serif text-[9rem] leading-none text-red-200/50">
              “
            </span>
            <span className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-red-300/20 blur-2xl" />
          </div>

          <div className="relative mb-4 flex items-center gap-3">
            <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-red-600 text-white shadow-lg shadow-red-500/30 ring-4 ring-red-100">
              <XIcon className="h-4 w-4" />
            </span>
            <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-bold tracking-wide text-red-700">
              خرافة
            </span>
          </div>

          <p className="relative text-lg leading-loose text-gray-500 line-through decoration-red-300/70 decoration-[1.5px]">
            {myth}
          </p>
        </div>

        {/* ───── الحقيقة ───── */}
        <div className="relative border-t border-gray-100 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50/60 p-7 md:border-r md:border-t-0 md:p-8">
          <div aria-hidden className="absolute inset-0 overflow-hidden">
            <span className="absolute -left-4 -top-12 select-none font-serif text-[9rem] leading-none text-emerald-200/50">
              ”
            </span>
            <span className="absolute -bottom-8 -right-8 h-32 w-32 rounded-full bg-emerald-300/25 blur-2xl" />
          </div>

          {/* شارة الانتقال من الخرافة إلى الحقيقة */}
          <div
            aria-hidden
            className="absolute left-1/2 top-0 z-20 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-amber-300 to-orange-400 text-white shadow-lg transition-transform duration-500 group-hover:scale-110 md:left-auto md:right-0 md:top-1/2 md:translate-x-1/2"
          >
            <ArrowLeftIcon className="h-5 w-5 -rotate-90 md:rotate-0" />
          </div>

          <div className="relative mb-4 flex items-center gap-3">
            <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-white shadow-lg shadow-emerald-500/30 ring-4 ring-emerald-100">
              <CheckIcon className="h-4 w-4" />
            </span>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold tracking-wide text-emerald-700">
              حقيقة
            </span>
          </div>

          <p className="relative text-lg font-medium leading-loose text-gray-900">
            {fact}
          </p>
        </div>
      </div>
    </div>
  );
}
