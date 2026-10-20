import Reveal from "./Reveal";

export default function SectionHeading({
  index,
  eyebrow,
  title,
  description,
}: {
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="relative isolate mb-14 max-w-3xl">
      {/* توهج ناعم خلف العنوان */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-12 -z-10 h-52 w-52 rounded-full bg-pink-200/40 blur-3xl"
      />

      <Reveal>
        <div className="mb-6 flex items-center gap-5">
          <span className="select-none bg-gradient-to-b from-pink-400 to-pink-100 bg-clip-text font-serif text-7xl font-light leading-none text-transparent md:text-8xl">
            {index}
          </span>
          <div className="flex flex-1 flex-col gap-3">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-pink-200 bg-white/70 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-pink-600 backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pink-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-pink-500" />
              </span>
              {eyebrow}
            </span>
            <span
              aria-hidden
              className="h-px w-full bg-gradient-to-l from-pink-300 via-pink-200 to-transparent"
            />
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.12}>
        <h2 className="text-4xl font-bold leading-tight text-gray-900 md:text-5xl">
          {title}
        </h2>
        <div
          aria-hidden
          className="mb-5 mt-5 h-1.5 w-20 rounded-full bg-gradient-to-l from-pink-500 to-rose-400"
        />
      </Reveal>

      {description && (
        <Reveal delay={0.24}>
          <p className="text-lg leading-relaxed text-gray-600 md:text-xl">
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
