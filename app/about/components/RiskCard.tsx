import { DNAIcon, GlobeIcon, HeartIcon } from "./icons";

const iconMap = {
  genetic: DNAIcon,
  environmental: GlobeIcon,
  lifestyle: HeartIcon,
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
  const Icon = iconMap[variant];
  const gradients = {
    genetic: "from-purple-500 to-pink-500",
    environmental: "from-teal-500 to-cyan-500",
    lifestyle: "from-rose-500 to-orange-400",
  };

  return (
    <div className="bg-white rounded-2xl p-7 shadow-md hover:shadow-xl transition-shadow border border-gray-100">
      <div
        className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${gradients[variant]} text-white mb-5 shadow-lg`}
      >
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-gray-700">
            <span
              className={`mt-1.5 w-2 h-2 rounded-full bg-gradient-to-br ${gradients[variant]} flex-shrink-0`}
            />
            <span className="text-sm leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}