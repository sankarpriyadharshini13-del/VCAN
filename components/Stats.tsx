import Reveal from "./Reveal";
import CountUp from "./CountUp";
import { STATS } from "@/lib/data";

export default function Stats() {
  return (
    <div className="container-x relative z-20 bg-navy-dark py-8 sm:py-12">
      <Reveal>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-4">
          {STATS.map((s, i) => (
            <div key={s.label} className="rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-6 text-center backdrop-blur-sm transition-all hover:bg-white/10">
              <p className={`font-display text-2xl font-extrabold sm:text-3xl lg:text-4xl ${i % 2 ? "text-india" : "text-saffron"}`}><CountUp to={s.to} suffix={s.suffix} /></p>
              <p className="mt-1 sm:mt-2 text-[10px] sm:text-xs lg:text-sm text-white/80">{s.label}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
