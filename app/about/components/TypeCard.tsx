import { RibbonIcon } from "./icons";

export default function TypeCard({
  title,
  desc,
  percentage,
  color,
}: {
  title: string;
  desc: string;
  percentage?: string;
  color: string;
}) {
  return (
    <div className="group relative bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
      <div
        className={`absolute top-0 right-0 w-32 h-32 rounded-full opacity-10 blur-2xl group-hover:opacity-20 transition ${color}`}
      />
      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-xl ${color} text-white`}>
            <RibbonIcon className="w-6 h-6" />
          </div>
          {percentage && (
            <span className="text-xs font-bold bg-pink-100 text-pink-700 px-3 py-1 rounded-full">
              {percentage}
            </span>
          )}
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 leading-relaxed text-sm">{desc}</p>
      </div>
    </div>
  );
}