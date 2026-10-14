import { INDUSTRIES } from "@/lib/data";
import Reveal from "@/components/Reveal";
import { ArrowRight, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Industries() {
  return (
    <section id="industries" className="bg-surface py-16 sm:py-24">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Industries We Serve</p>
          <h2 className="section-title">3D Printing Solutions Across Industries</h2>
          <div className="tricolor-bar mx-auto" />
        </Reveal>

        <div className="mt-12 sm:mt-16 grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map((industry, index) => (
            <Reveal key={industry.slug} delay={index * 0.1}>
              <Link
                href={`/industries/${industry.slug}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-black/5 bg-white p-6 shadow-sm transition-all duration-300 hover:border-india/30 hover:shadow-lg hover:shadow-india/5"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="shrink-0 inline-flex rounded-xl bg-india/10 p-3 text-india transition-colors group-hover:bg-india group-hover:text-white">
                    {industry.icon}
                  </div>
                  <h3 className="font-display text-xl font-bold text-navy">{industry.name}</h3>
                </div>
                <p className="text-sm text-muted mb-4 leading-relaxed flex-grow">{industry.desc}</p>
                <ul className="space-y-2.5 mt-auto">
                  {industry.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-navy">
                      <span className="mt-0.5 grid h-4 w-4 flex-none shrink-0 place-items-center rounded-full bg-india/10 text-india">
                        <Check size={10} />
                      </span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 pt-4 border-t border-black/5 flex items-center gap-2 text-sm font-semibold text-india transition-opacity group-hover:opacity-100">
                  Learn More <ArrowRight size={16} />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 text-center">
          <Link
            href="/#services"
            className="inline-flex items-center gap-2 rounded-full border-2 border-india px-6 py-3 font-semibold text-india transition-all hover:bg-india hover:text-white"
          >
            Explore all materials & finishes
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>

        {/* Why VCAN 3D Section */}
        <div className="mt-20 sm:mt-24 grid gap-8 lg:grid-cols-2 items-center">
          <Reveal className="order-2 lg:order-1">
            <div className="relative overflow-hidden rounded-3xl border border-black/5 bg-white shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-india/5 to-saffron/5" />
              <Image
                src="/assets/process-image.png"
                alt="Our Best Works"
                width={600}
                height={400}
                className="relative h-auto w-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-navy-dark/80 to-transparent p-6">
                <p className="font-display text-lg font-bold text-white">Our Best Works</p>
                <p className="text-sm text-white/80">Showcasing excellence in manufacturing</p>
              </div>
              <Link
                href="/#services"
                className="absolute bottom-6 right-6 inline-flex items-center gap-2 rounded-full bg-saffron px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-saffron-hover"
              >
                View Gallery
                <ArrowRight size={16} />
              </Link>
            </div>
          </Reveal>

          <Reveal className="order-1 lg:order-2">
            <p className="eyebrow">Why VCAN 3D?</p>
            <h2 className="section-title mt-4">Your Trusted Manufacturing Partner</h2>
            <div className="tricolor-bar mb-6" />
            <p className="text-muted text-base leading-relaxed mb-8">
              With over 15 years of expertise, VCAN 3D delivers precision manufacturing solutions tailored to your needs. From rapid prototyping to mass production, we ensure quality, speed, and cost-effectiveness in every project.
            </p>
            <div className="space-y-4">
              {[
                "Advanced 3D printing technologies (FDM, SLA, SLS, MJF, DLP)",
                "Wide range of materials from standard to engineering grades",
                "Quick turnaround times - parts in as little as 1 day",
                "Precision engineering with tight tolerances",
                "Competitive pricing for all production volumes"
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="mt-1 grid h-5 w-5 flex-none place-items-center rounded-full bg-saffron text-white">
                    <Check size={12} />
                  </span>
                  <p className="text-sm text-navy leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
            <Link
              href="/#contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-india px-6 py-3 font-semibold text-white transition-all hover:bg-india/90"
            >
              Get Started
              <ArrowRight size={18} />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
