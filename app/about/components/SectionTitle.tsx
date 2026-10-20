import Reveal from "./Reveal";
import { SparkleIcon } from "./icons";

export default function SectionTitle({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <Reveal>
      <div className="relative isolate mb-12 text-center">
        {/* توهج ناعم خلف العنوان */}
        <span
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 -z-10 h-40 w-72 -translate-x-1/2 rounded-full bg-pink-200/40 blur-3xl"
        />

        {eyebrow && (
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-pink-200 bg-gradient-to-l from-pink-50 to-white px-4 py-1.5 text-sm font-semibold text-pink-700 shadow-sm shadow-pink-100">
            <SparkleIcon className="h-4 w-4" />
            {eyebrow}
          </span>
        )}

        <h2 className="mb-4 bg-gradient-to-l from-gray-900 via-gray-800 to-pink-700 bg-clip-text text-3xl font-extrabold leading-tight text-transparent md:text-4xl">
          {title}
        </h2>

        {description && (
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-600">
            {description}
          </p>
        )}

        {/* فاصل: خط – معيّن – خط */}
        <div
          aria-hidden
          dir="ltr"
          className="mx-auto mt-7 flex items-center justify-center gap-3"
        >
          <span className="h-px w-16 bg-gradient-to-r from-transparent to-pink-400" />
          <span className="h-2.5 w-2.5 rotate-45 rounded-sm bg-gradient-to-br from-pink-500 to-rose-400 shadow shadow-pink-300" />
          <span className="h-px w-16 bg-gradient-to-r from-pink-400 to-transparent" />
        </div>
      </div>
    </Reveal>
  );
}
