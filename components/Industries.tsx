import { INDUSTRIES } from "@/lib/data";

export default function Industries() {
  const row = [...INDUSTRIES, ...INDUSTRIES, ...INDUSTRIES, ...INDUSTRIES];
  return (
    <section aria-label="Industries We Serve" className="overflow-hidden bg-navy-dark py-8 sm:py-12">
      <p className="mb-4 sm:mb-6 text-center text-[10px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-saffron">Industries We Serve</p>
      <div className="group flex w-max animate-marquee gap-4 sm:gap-6 hover:[animation-play-state:paused]">
        {row.map((x, i) => (
          <div key={i} className="flex items-center gap-2 sm:gap-3 rounded-full border border-white/10 bg-white/5 px-4 sm:px-5 lg:px-7 py-3 sm:py-4 text-white transition-colors hover:border-saffron hover:bg-saffron/10">
            <span className={`h-5 w-5 sm:h-6 sm:w-6 ${i % 2 ? "text-[#2fbf3a]" : "text-saffron"}`}>{x.icon}</span>
            <span className="whitespace-nowrap font-display text-sm sm:text-base lg:text-lg font-semibold">{x.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
