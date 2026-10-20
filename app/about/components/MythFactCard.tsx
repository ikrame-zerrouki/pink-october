import { CheckIcon, XIcon } from "./icons";

export default function MythFactCard({
  myth,
  fact,
}: {
  myth: string;
  fact: string;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow overflow-hidden border border-gray-100">
      <div className="grid md:grid-cols-2">
        {/* Myth */}
        <div className="p-6 bg-gradient-to-br from-red-50 to-red-100/50">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0">
              <XIcon className="w-4 h-4" />
            </span>
            <span className="text-red-700 font-bold text-sm uppercase tracking-wide">
              خرافة
            </span>
          </div>
          <p className="text-gray-800 leading-relaxed">{myth}</p>
        </div>

        {/* Fact */}
        <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-100/50 border-t md:border-t-0 md:border-r border-gray-100">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center flex-shrink-0">
              <CheckIcon className="w-4 h-4" />
            </span>
            <span className="text-green-700 font-bold text-sm uppercase tracking-wide">
              حقيقة
            </span>
          </div>
          <p className="text-gray-800 leading-relaxed">{fact}</p>
        </div>
      </div>
    </div>
  );
}