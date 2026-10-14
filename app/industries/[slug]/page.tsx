import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowRight, Check, Zap, Layers, Cpu, Gauge, ShieldCheck, ArrowLeft, Package, Ruler } from "lucide-react";
import Reveal from "@/components/Reveal";
import { QUOTE_URL, INDUSTRIES } from "@/lib/data";
import content from "@/lib/industries-content.json";

type IndustryContent = {
  title: string;
  subtitle: string;
  applications: string[];
  lifecycle: Array<{ stage: string; title: string; description: string }>;
  materials: Array<{ name: string; description: string; maxSize: string; tolerance: string }>;
  finishes: Array<{ name: string; description: string }>;
};

const pages = content as Record<string, IndustryContent>;

export const generateStaticParams = () => Object.keys(pages).map((slug) => ({ slug }));

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const page = pages[params.slug];
  return page ? { title: `${page.title} | VCAN 3D`, description: page.subtitle } : {};
}

export default function IndustryPage({ params }: { params: { slug: string } }) {
  const page = pages[params.slug];
  if (!page) notFound();

  const iconFor = (index: number) => {
    const icons = [Zap, Layers, Cpu, Gauge, ShieldCheck];
    return icons[index % icons.length];
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-navy-dark pb-20 pt-32 text-white sm:pb-24 sm:pt-36">
        <div className="grid-bg absolute inset-0" />
        <div className="absolute -left-24 top-12 h-72 w-72 animate-drift rounded-full bg-saffron/25 blur-[110px]" />
        <div className="absolute -bottom-20 right-1/4 h-72 w-72 animate-drift rounded-full bg-india/25 blur-[110px]" />

        <div className="container-x relative">
          <Reveal className="mx-auto max-w-4xl text-center">
            <Link href="/#industries" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-saffron transition hover:-translate-x-1">
              <ArrowLeft size={16} /> Back to Industries
            </Link>

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
              {page.title}
            </h1>

            <div className="my-6 h-1 w-24 rounded-full bg-saffron mx-auto" />

            <p className="max-w-3xl mx-auto text-base leading-relaxed text-white/80 sm:text-lg">
              {page.subtitle}
            </p>

            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <a href={QUOTE_URL} target="_blank" rel="noopener" className="btn btn-saffron group inline-flex items-center gap-2">
                GET A QUOTE <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Applications Section */}
      <section className="bg-surface py-16 sm:py-24">
        <div className="container-x">
          <Reveal className="mx-auto max-w-2xl text-center mb-12">
            <p className="eyebrow">Applications</p>
            <h2 className="section-title">What We Make</h2>
            <div className="tricolor-bar mx-auto" />
          </Reveal>

          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {page.applications.map((app, index) => (
              <Reveal key={index} delay={index * 0.05}>
                <div className="flex items-center gap-3 rounded-xl border border-black/5 bg-white p-4 shadow-sm transition-all hover:border-saffron/30 hover:shadow-md">
                  <span className="grid h-8 w-8 flex-none place-items-center rounded-full bg-saffron text-white">
                    <Check size={16} />
                  </span>
                  <span className="font-medium text-navy">{app}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Lifecycle Section */}
      <section className="bg-navy-dark py-16 sm:py-24 text-white">
        <div className="container-x">
          <Reveal className="mx-auto max-w-2xl text-center mb-12">
            <p className="eyebrow">Process</p>
            <h2 className="section-title">Engineering Lifecycle</h2>
            <div className="tricolor-bar mx-auto" />
            <p className="mt-4 text-white/70">Our journey from concept to production-ready excellence</p>
          </Reveal>

          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {page.lifecycle.map((item, index) => {
              const Icon = iconFor(index);
              return (
                <Reveal key={index} delay={index * 0.1}>
                  <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition-all hover:border-saffron/30 hover:bg-white/10">
                    <div className="mb-4 inline-flex rounded-xl bg-saffron/10 p-3 text-saffron">
                      <Icon size={24} />
                    </div>
                    <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-saffron">{item.stage}</div>
                    <h3 className="font-display text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-sm text-white/70 leading-relaxed flex-grow">{item.description}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Materials Section */}
      <section className="bg-surface py-16 sm:py-24">
        <div className="container-x">
          <Reveal className="mx-auto max-w-2xl text-center mb-12">
            <p className="eyebrow">Materials</p>
            <h2 className="section-title">Available Materials</h2>
            <div className="tricolor-bar mx-auto" />
          </Reveal>

          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            {page.materials.map((material, index) => (
              <Reveal key={index} delay={index * 0.05}>
                <div className="flex flex-col gap-4 rounded-2xl border border-black/5 bg-white p-6 shadow-sm transition-all hover:border-saffron/30 hover:shadow-md">
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 rounded-xl bg-india/10 p-3 text-india">
                      <Package size={24} />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-display text-lg font-bold text-navy mb-2">{material.name}</h3>
                      <p className="text-sm text-muted leading-relaxed">{material.description}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-black/5">
                    <div className="flex items-center gap-2">
                      <Ruler size={16} className="text-india" />
                      <div>
                        <p className="text-xs text-muted">Max Size</p>
                        <p className="text-sm font-semibold text-navy">{material.maxSize}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck size={16} className="text-saffron" />
                      <div>
                        <p className="text-xs text-muted">Tolerance</p>
                        <p className="text-sm font-semibold text-navy">{material.tolerance}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Finishes Section */}
      <section className="bg-navy-dark py-16 sm:py-24 text-white">
        <div className="container-x">
          <Reveal className="mx-auto max-w-2xl text-center mb-12">
            <p className="eyebrow">Finishing Options</p>
            <h2 className="section-title">Surface Finishes</h2>
            <div className="tricolor-bar mx-auto" />
          </Reveal>

          <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {page.finishes.map((finish, index) => (
              <Reveal key={index} delay={index * 0.1}>
                <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 text-center transition-all hover:border-saffron/30 hover:bg-white/10">
                  <div className="mb-4 h-24 w-full rounded-xl bg-gradient-to-br from-india/20 to-saffron/20 flex items-center justify-center">
                    <Layers size={32} className="text-white/70" />
                  </div>
                  <h3 className="font-display text-lg font-bold mb-2">{finish.name}</h3>
                  <p className="text-sm text-white/70 flex-grow">{finish.description}</p>
                </div>
              </Reveal>
            ))}
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
                    Get a free quote for your {page.title.toLowerCase()} project with fast turnaround times.
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

      {/* Other Industries */}
      <section className="bg-navy-dark py-16 sm:py-24 text-white">
        <div className="container-x">
          <Reveal className="mx-auto max-w-2xl text-center mb-12">
            <p className="eyebrow">Explore More</p>
            <h2 className="section-title">Other Industries</h2>
            <div className="tricolor-bar mx-auto" />
          </Reveal>

          <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {INDUSTRIES.filter((ind) => ind.slug !== params.slug).map((industry) => (
              <Reveal key={industry.slug}>
                <Link
                  href={`/industries/${industry.slug}`}
                  className="group flex min-h-28 flex-col items-center justify-center gap-4 rounded-2xl border border-white/10 bg-white/[.04] p-6 backdrop-blur transition-all duration-500 hover:-translate-y-1.5 hover:border-saffron/60 hover:bg-white/[.07]"
                >
                  <span className="rounded-xl bg-saffron/10 p-3 text-saffron group-hover:bg-saffron group-hover:text-white transition-colors">
                    {industry.icon}
                  </span>
                  <span className="text-center font-medium">{industry.name}</span>
                  <ArrowRight size={18} className="mt-auto transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-white/50 group-hover:text-saffron" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
