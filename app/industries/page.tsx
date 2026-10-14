import { INDUSTRIES } from "@/lib/data";
import Reveal from "@/components/Reveal";
import { ArrowRight, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { QUOTE_URL } from "@/lib/data";

export default function IndustriesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-navy-dark pb-20 pt-32 text-white sm:pb-24 sm:pt-36">
        <div className="grid-bg absolute inset-0" />
        <div className="absolute -left-24 top-12 h-72 w-72 animate-drift rounded-full bg-saffron/25 blur-[110px]" />
        <div className="absolute -bottom-20 right-1/4 h-72 w-72 animate-drift rounded-full bg-india/25 blur-[110px]" />

        <div className="container-x relative">
          <Reveal className="mx-auto max-w-4xl text-center">
            <div className="mb-6 space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-saffron/40 bg-saffron/10 px-4 py-1.5 text-xs font-medium text-saffron">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-india opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-india" />
                </span>
                Industry Solutions
              </div>
            </div>

            <h1 className="font-display text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
              Industries We Serve
            </h1>

            <div className="my-6 h-1 w-24 rounded-full bg-saffron mx-auto" />

            <p className="max-w-3xl mx-auto text-base leading-relaxed text-white/80 sm:text-lg">
              Delivering precision 3D printing solutions across diverse industries. From aerospace to consumer products, we provide rapid prototyping and manufacturing services tailored to your specific needs.
            </p>

            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <a href={QUOTE_URL} target="_blank" rel="noopener" className="btn btn-saffron group inline-flex items-center gap-2">
                GET A QUOTE <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="bg-surface py-16 sm:py-24">
        <div className="container-x">
          <Reveal className="mx-auto max-w-2xl text-center mb-12">
            <p className="eyebrow">Our Expertise</p>
            <h2 className="section-title">3D Printing Solutions Across Industries</h2>
            <div className="tricolor-bar mx-auto" />
          </Reveal>

          <div className="mt-12 sm:mt-16 grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {INDUSTRIES.map((industry, index) => (
              <Reveal key={industry.slug} delay={index * 0.1}>
                <Link
                  href={`/industries/${industry.slug}`}
                  className="group relative overflow-hidden rounded-2xl border border-black/5 bg-white p-6 shadow-sm transition-all duration-300 hover:border-india/30 hover:shadow-lg hover:shadow-india/5"
                >
                  <div className="mb-4 inline-flex rounded-xl bg-india/10 p-3 text-india transition-colors group-hover:bg-india group-hover:text-white">
                    {industry.icon}
                  </div>
                  <h3 className="font-display text-xl font-bold text-navy mb-2">{industry.name}</h3>
                  <p className="text-sm text-muted mb-4 leading-relaxed">{industry.desc}</p>
                  <ul className="space-y-2">
                    {industry.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-navy">
                        <span className="grid h-4 w-4 flex-none place-items-center rounded-full bg-india/10 text-india">
                          <Check size={10} />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-india opacity-0 transition-opacity group-hover:opacity-100">
                    Learn More <ArrowRight size={16} />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why VCAN 3D Section */}
      <section className="bg-navy-dark py-16 sm:py-24 text-white">
        <div className="container-x">
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <Reveal className="order-2 lg:order-1">
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-india/10 to-saffron/10" />
                <Image
                  src="/assets/process-image.png"
                  alt="Our Best Works"
                  width={600}
                  height={400}
                  className="relative h-auto w-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-navy-dark/90 to-transparent p-6">
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
              <p className="text-white/70 text-base leading-relaxed mb-8">
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
                    <p className="text-sm text-white/90 leading-relaxed">{item}</p>
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

      {/* CTA Section */}
      <section className="bg-surface py-16 sm:py-24">
        <div className="container-x">
          <Reveal className="mx-auto max-w-4xl">
            <div className="relative overflow-hidden rounded-3xl border border-saffron/20 bg-white shadow-xl shadow-saffron/5">
              <div className="h-1.5 bg-saffron" />
              <div className="absolute -left-10 top-10 h-48 w-48 rounded-full bg-saffron/15 blur-3xl" />
              <div className="absolute -right-10 bottom-0 h-48 w-48 rounded-full bg-india/15 blur-3xl" />
              <div className="relative flex flex-col gap-8 p-8 sm:p-12 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-xl">
                  <h3 className="font-display text-2xl font-bold text-navy sm:text-4xl">Ready to get started?</h3>
                  <p className="mt-3 text-base leading-relaxed text-muted sm:text-lg">
                    Get a free quote for your project with fast turnaround times.
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-navy">
                    {["Free quote", "Fast turnaround", "Made in Chennai"].map((t) => (
                      <li key={t} className="flex items-center gap-2">
                        <span className="grid h-5 w-5 place-items-center rounded-full bg-india text-white">
                          <Check size={12} />
                        </span>
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
                <a href={QUOTE_URL} target="_blank" rel="noopener" className="btn btn-saffron group inline-flex flex-none items-center justify-center gap-2">
                  GET A QUOTE <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
