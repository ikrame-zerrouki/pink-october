import { CheckIcon } from "./icons";

export default function SymptomItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3 bg-gradient-to-l from-pink-50 to-rose-50 border border-pink-100 rounded-xl p-4 hover:border-pink-300 hover:shadow-md transition-all">
      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-pink-500 text-white flex items-center justify-center">
        <CheckIcon className="w-4 h-4" />
      </span>
      <span className="text-gray-800 text-sm font-medium leading-relaxed">
        {text}
      </span>
    </li>
  );
}