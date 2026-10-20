import { CheckIcon, DNAIcon, GlobeIcon, HeartIcon } from "./icons";

const styles = {
  genetic: {
    Icon: DNAIcon,
    gradient: "from-purple-500 to-pink-500",
    halo: "bg-fuchsia-400/30",
    hover: "hover:shadow-fuchsia-200/70",
  },
  environmental: {
    Icon: GlobeIcon,
    gradient: "from-teal-500 to-cyan-500",
    halo: "bg-cyan-400/30",
    hover: "hover:shadow-cyan-200/70",
  },
  lifestyle: {
    Icon: HeartIcon,
    gradient: "from-rose-500 to-orange-400",
    halo: "bg-rose-400/30",
    hover: "hover:shadow-rose-200/70",
  },
};

export default function RiskCard({
  title,
  items,
  variant,
}: {
  title: string;
  items: string[];
  variant: "genetic" | "environmental" | "lifestyle";
}) {
  const { Icon, gradient, halo, hover } = styles[variant];

  return (
    <div
      className={`group relative h-full overflow-hidden rounded-3xl border border-gray-100 bg-white p-7 shadow-md transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl ${hover}`}
    >
      {/* خط لوني في الأعلى */}
      <span
        aria-hidden
        className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-l ${gradient}`}
      />

      {/* أيقونة كبيرة شفافة في الخلفية */}
      <Icon className="pointer-events-none absolute -bottom-8 -left-8 h-40 w-40 -rotate-12 text-gray-200/60 transition-all duration-700 group-hover:rotate-0 group-hover:scale-110" />

      {/* توهج لوني */}
      <span
        aria-hidden
        className={`pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${halo}`}
      />

      <div className="relative">
        <div className="relative mb-5 inline-flex">
          <span
            aria-hidden
            className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${gradient} blur-lg opacity-40 transition-opacity duration-500 group-hover:opacity-70`}
          />
          <span
            className={`relative inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} text-white shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6`}
          >
            <Icon className="h-7 w-7" />
          </span>
        </div>

        <h3 className="mb-4 text-xl font-bold text-gray-900">{title}</h3>
        <div
          aria-hidden
          className="mb-5 h-px bg-gradient-to-l from-gray-200 to-transparent"
        />

        <ul className="space-y-3.5">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-3 text-gray-700">
              <span
                className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${gradient} text-white shadow-sm`}
              >
                <CheckIcon className="h-3 w-3" />
              </span>
              <span className="text-sm leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
