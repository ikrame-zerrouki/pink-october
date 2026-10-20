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
    <Reveal>
      <div className="max-w-3xl mb-14">
        <div className="flex items-center gap-4 mb-5">
          <span className="text-6xl md:text-7xl font-serif font-light text-pink-200 leading-none">
            {index}
          </span>
          <div>
            <div className="h-px w-12 bg-pink-400 mb-2" />
            <span className="text-xs tracking-[0.3em] uppercase text-pink-600 font-semibold">
              {eyebrow}
            </span>
          </div>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
          {title}
        </h2>
        {description && (
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </Reveal>
  );
}