export default function StatCard({
  value,
  label,
  suffix = "",
}: {
  value: string;
  label: string;
  suffix?: string;
}) {
  return (
    <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 text-center shadow-lg border border-pink-100 hover:scale-105 transition-transform duration-300">
      <div className="text-4xl md:text-5xl font-extrabold bg-gradient-to-l from-pink-600 to-rose-500 bg-clip-text text-transparent">
        {value}
        <span className="text-2xl">{suffix}</span>
      </div>
      <p className="mt-2 text-gray-600 font-medium text-sm md:text-base">
        {label}
      </p>
    </div>
  );
}