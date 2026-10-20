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
    <div className="mb-10 text-center">
      {eyebrow && (
        <span className="inline-flex items-center gap-2 bg-pink-100 text-pink-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
          <SparkleIcon className="w-4 h-4" />
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
        {title}
      </h2>
      {description && (
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          {description}
        </p>
      )}
      <div className="mt-5 mx-auto w-24 h-1.5 rounded-full bg-gradient-to-l from-pink-500 to-rose-400" />
    </div>
  );
}