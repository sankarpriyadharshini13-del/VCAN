import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  MoveUpRight,
  Zap,
  Layers,
  Sparkles,
  TrendingUp,
  Box,
  Lightbulb,
  AlertTriangle,
  Images,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import ServicePageEnter from "@/components/ServicePageEnter";
import SectionNav from "@/components/SectionNav";
import content from "@/lib/services-content.json";
import { SERVICES, QUOTE_URL } from "@/lib/data";

type Block = { t: string; x?: string; items?: string[] };
type Page = { title: string; subtitle: string; blocks: Block[]; images: { src: string; alt: string }[] };
type Section = { id: string; title: string; blocks: Block[] };
const pages = content as Record<string, Page>;

export const generateStaticParams = () => Object.keys(pages).map((slug) => ({ slug }));
export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const page = pages[params.slug];
  return page ? { title: `${page.title} in Chennai | VCAN 3D`, description: page.subtitle } : {};
}

/* ---------------- helpers ---------------- */

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
// strip leading emoji/symbols and trailing colon from headings
const clean = (s = "") => s.replace(/^[^\p{L}\p{N}]+/u, "").replace(/:\s*$/, "").trim();

const COLON = /^([^:]{1,30}):\s+(.+)$/;
const DASH = /^(.{2,40}?)\s[-–]\s(.+)$/;
const splitItem = (item: string) => {
  const m = item.match(DASH) || item.match(COLON);
  return m ? { title: m[1].trim(), desc: m[2].trim() } : null;
};

const shortLabel = (title: string) => {
  const t = title.toLowerCase();
  if (t === "gallery") return "Gallery";
  if (t.startsWith("what is")) return "Overview";
  if (/^how\b/.test(t)) return "How it works";
  if (t.includes("material")) return "Materials";
  if (t.includes("advantage") || t.includes("benefit")) return "Advantages";
  if (t.includes("drawback") || t.includes("limitation")) return "Drawbacks";
  if (t.includes("compar")) return "Comparison";
  return title;
};

const iconFor = (title: string, size = "h-5 w-5") => {
  const t = title.toLowerCase();
  if (t === "gallery") return <Images className={size} />;
  if (t.includes("when")) return <Lightbulb className={size} />;
  if (/\b(how|process)\b/.test(t)) return <Zap className={size} />;
  if (t.includes("material")) return <Layers className={size} />;
  if (t.includes("advantage") || t.includes("benefit")) return <Sparkles className={size} />;
  if (t.includes("drawback") || t.includes("limitation")) return <AlertTriangle className={size} />;
  if (t.includes(" vs ") || t.includes("compar")) return <TrendingUp className={size} />;
  return <Box className={size} />;
};

const monogram = (title: string) => {
  const paren = title.match(/\(([A-Z]{2,4})\)/);
  return paren ? paren[1] : title.split(/[\s(]/)[0].slice(0, 4).toUpperCase();
};

/* ---------------- building blocks ---------------- */

function SubHeading({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid h-9 w-9 flex-none place-items-center rounded-xl bg-india/10 text-india">
        {iconFor(title, "h-[18px] w-[18px]")}
      </span>
      <h3 className="font-display text-lg font-bold text-navy sm:text-xl">{title}</h3>
      <span className="h-px flex-1 bg-black/10" />
    </div>
  );
}

function Timeline({ items }: { items: string[] }) {
  return (
    <ol className="relative ml-4 space-y-3 border-l-2 border-dashed border-saffron/30 pl-9 sm:ml-5 sm:pl-10">
      {items.map((item, i) => (
        <li key={i} className="relative">
          <span className="absolute -left-[3.2rem] top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-saffron text-sm font-bold text-white ring-4 ring-surface sm:-left-[3.45rem] sm:h-9 sm:w-9">
            {i + 1}
          </span>
          <div className="rounded-2xl border border-black/5 bg-white px-5 py-4 text-sm font-medium leading-relaxed text-navy shadow-sm sm:text-base">
            {item}
          </div>
        </li>
      ))}
    </ol>
  );
}

function Checklist({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map((item, i) => (
        <li
          key={i}
          className={`flex items-center gap-4 rounded-2xl border border-black/5 bg-white px-5 py-4 text-sm font-medium text-navy shadow-sm sm:text-base ${
            items.length % 2 === 1 && i === items.length - 1 ? "sm:col-span-2" : ""
          }`}
        >
          <span className="grid h-7 w-7 flex-none place-items-center rounded-full bg-india text-white">
            <Check size={15} />
          </span>
          <span className="leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  );
}

// the one dark "moment": when-to-choose
function Callout({ items }: { items: string[] }) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-navy-dark p-7 text-white sm:p-10">
      <div className="grid-bg absolute inset-0 opacity-40" />
      <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-saffron/30 blur-3xl" />
      <div className="absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-india/30 blur-3xl" />
      <div className="absolute inset-x-0 top-0 h-1 bg-saffron" />
      <ul className="relative grid gap-x-10 gap-y-5 sm:grid-cols-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-4 text-sm leading-relaxed text-white/90 sm:text-base">
            <span className="mt-0.5 grid h-6 w-6 flex-none place-items-center rounded-full bg-saffron text-white">
              <Check size={14} />
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Versus({ items }: { items: string[] }) {
  const parsed = items.map((i) => {
    const m = i.match(COLON)!;
    return { label: m[1].trim(), text: m[2].trim() };
  });
  const labels = Array.from(new Set(parsed.map((p) => p.label)));
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {labels.map((label, li) => (
        <div
          key={label}
          className={`overflow-hidden rounded-2xl border bg-white shadow-sm ${
            li === 0 ? "border-saffron/30" : "border-india/30"
          }`}
        >
          <div className={`flex items-center justify-between px-6 py-3 ${li === 0 ? "bg-saffron/10" : "bg-india/10"}`}>
            <span className={`font-display text-lg font-extrabold ${li === 0 ? "text-saffron" : "text-india"}`}>
              {label}
            </span>
            <span className={`h-2.5 w-2.5 rounded-full ${li === 0 ? "bg-saffron" : "bg-india"}`} />
          </div>
          <ul className="space-y-3 p-6">
            {parsed
              .filter((p) => p.label === label)
              .map((p, i) => (
                <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-navy sm:text-base">
                  <Check size={16} className={`mt-1 flex-none ${li === 0 ? "text-saffron" : "text-india"}`} />
                  {p.text}
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function CardGrid({ items, ctx }: { items: string[]; ctx: string }) {
  const c = ctx.toLowerCase();
  const isMaterial = c.includes("material");
  const isWarn = /drawback|limitation/.test(c);

  // materials: vertical spec cards (3 across)
  if (isMaterial) {
    return (
      <div className="grid gap-4 sm:grid-cols-3">
        {items.map((item, i) => {
          const p = splitItem(item);
          return (
            <div
              key={i}
              className="flex h-full flex-col rounded-2xl border border-black/5 bg-white p-5 shadow-sm transition-colors duration-300 hover:border-saffron/40 sm:p-6"
            >
              <span className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-saffron/15 font-display text-sm font-extrabold text-navy">
                {monogram(p ? p.title : item)}
              </span>
              <h4 className="font-display text-base font-bold text-navy">{p ? p.title : item}</h4>
              {p && <p className="mt-2 text-sm leading-relaxed text-muted">{p.desc}</p>}
            </div>
          );
        })}
      </div>
    );
  }

  // benefits / limitations / generic: horizontal cards, 2 across
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {items.map((item, i) => {
        const p = splitItem(item);
        const span = items.length % 2 === 1 && i === items.length - 1 ? "sm:col-span-2" : "";
        return (
          <div
            key={i}
            className={`flex h-full items-start gap-4 rounded-2xl border p-5 shadow-sm transition-colors duration-300 sm:p-6 ${span} ${
              isWarn
                ? "border-saffron/25 bg-saffron/[.06] hover:border-saffron/50"
                : "border-black/5 bg-white hover:border-india/40"
            }`}
          >
            <span
              className={`grid h-9 w-9 flex-none place-items-center rounded-xl text-white ${
                isWarn ? "bg-saffron" : "bg-india"
              }`}
            >
              {isWarn ? <AlertTriangle size={17} /> : <Check size={17} />}
            </span>
            <div className="min-w-0">
              {p ? (
                <>
                  <h4 className="font-display text-base font-bold leading-snug text-navy">{p.title}</h4>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{p.desc}</p>
                </>
              ) : (
                <p className="py-1.5 text-sm font-medium leading-relaxed text-navy sm:text-base">{item}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function SectionBody({ blocks }: { blocks: Block[] }) {
  let ctx = "";
  let seenLead = false;
  return (
    <div className="space-y-6">
      {blocks.map((b, i) => {
        if (b.t === "h3") {
          ctx = clean(b.x);
          return (
            <Reveal key={i} className="pt-6 first:pt-0">
              <SubHeading title={ctx} />
            </Reveal>
          );
        }
        if (b.t === "p") {
          const lead = !seenLead;
          seenLead = true;
          return (
            <Reveal key={i}>
              <p
                className={`text-muted ${
                  lead ? "text-lg leading-9 sm:text-xl sm:leading-9" : "text-base leading-8 sm:text-lg"
                }`}
              >
                {b.x}
              </p>
            </Reveal>
          );
        }
        const items = b.items || [];
        if (b.t === "list") {
          const node = /\b(how|process)\b/i.test(ctx) ? (
            <Timeline items={items} />
          ) : /when/i.test(ctx) ? (
            <Callout items={items} />
          ) : (
            <Checklist items={items} />
          );
          return <Reveal key={i}>{node}</Reveal>;
        }
        const allColon = items.length > 0 && items.every((it) => COLON.test(it));
        const labelCount = allColon ? new Set(items.map((it) => it.match(COLON)![1].trim())).size : 0;
        return (
          <Reveal key={i}>
            {allColon && labelCount === 2 && /\bvs\b/i.test(ctx) ? (
              <Versus items={items} />
            ) : (
              <CardGrid items={items} ctx={ctx} />
            )}
          </Reveal>
        );
      })}
    </div>
  );
}

// shared two-column section shell: title on the left, content on the right
function SectionShell({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-36 border-t border-black/5 py-14 first:border-t-0 sm:py-20">
      <div className="container-x">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)] lg:gap-16">
          <div>
            <div className="lg:sticky lg:top-44">
              <span className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-saffron text-white shadow-lg shadow-saffron/20">
                {iconFor(title, "h-6 w-6")}
              </span>
              <h2 className="font-display text-2xl font-bold leading-tight text-navy sm:text-3xl">{title}</h2>
              <div className="mt-4 h-1 w-20 rounded-full bg-saffron" />
            </div>
          </div>
          <div className="min-w-0">{children}</div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- page ---------------- */

export default function ServicePage({ params }: { params: { slug: string } }) {
  const page = pages[params.slug];
  if (!page) notFound();
  const others = SERVICES.filter((service) => service.slug !== params.slug);

  // group flat blocks into sections (each h2 starts a section)
  const sections: Section[] = [];
  for (const b of page.blocks) {
    if (b.t === "h2") {
      sections.push({ id: slugify(b.x || ""), title: b.x || "", blocks: [] });
    } else {
      if (!sections.length) sections.push({ id: "overview", title: page.title, blocks: [] });
      sections[sections.length - 1].blocks.push(b);
    }
  }
  const hasGallery = page.images.length > 1;
  const navItems = [
    ...sections.map((s) => ({ id: s.id, label: shortLabel(s.title) })),
    ...(hasGallery ? [{ id: "gallery", label: "Gallery" }] : []),
  ];

  return (
    <ServicePageEnter>
      <>
        {/* Enhanced Hero Section */}
        <section className="relative overflow-hidden bg-navy-dark pb-20 pt-32 text-white sm:pb-24 sm:pt-36">
          <div className="grid-bg absolute inset-0" />
          <div className="absolute -left-24 top-12 h-72 w-72 animate-drift rounded-full bg-saffron/25 blur-[110px]" />
          <div className="absolute -bottom-20 right-1/4 h-72 w-72 animate-drift rounded-full bg-india/25 blur-[110px]" />
          <div className="absolute left-1/3 top-1/3 h-72 w-72 animate-drift rounded-full bg-navy/50 blur-[110px] [animation-delay:-3s]" />

          <div className="container-x relative grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <Reveal className="relative z-10 order-2 lg:order-1">
              <Link href="/#services" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-saffron transition hover:-translate-x-1">
                <ArrowLeft size={16} /> Back to Services
              </Link>

              <div className="mb-6 space-y-2">
                <div className="inline-flex items-center gap-2 rounded-full border border-saffron/40 bg-saffron/10 px-4 py-1.5 text-xs font-medium text-saffron">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-india opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-india" />
                  </span>
                  Premium Manufacturing Service
                </div>
              </div>

              <h1 className="font-display text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
                {page.title}
              </h1>

              <div className="my-6 h-1 w-24 rounded-full bg-saffron" />

              <p className="max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
                {page.subtitle}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a href={QUOTE_URL} target="_blank" rel="noopener" className="btn btn-saffron group inline-flex items-center gap-2">
                  GET A QUOTE <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </Reveal>

            {page.images[0] && (
              <Reveal delay={0.12} x={35} y={0} className="order-1 lg:order-2">
                <div className="group relative mx-auto aspect-[4/3] w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl">
                  <div className="absolute -inset-4 rounded-3xl bg-saffron/30 blur-2xl" />
                  <div className="relative h-full w-full">
                    <Image
                      src={`/assets/${page.images[0].src}`}
                      alt={page.images[0].alt || page.title}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-navy-dark/50" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-saffron" />

                  {/* Corner accents */}
                  <div className="absolute left-3 top-3 h-6 w-6 border-l-2 border-t-2 border-saffron" />
                  <div className="absolute right-3 top-3 h-6 w-6 border-r-2 border-t-2 border-saffron" />
                  <div className="absolute left-3 bottom-3 h-6 w-6 border-l-2 border-b-2 border-india" />
                  <div className="absolute right-3 bottom-3 h-6 w-6 border-r-2 border-b-2 border-india" />
                </div>
              </Reveal>
            )}
          </div>
        </section>

        {/* Section tab bar (only when the page has several sections) */}
        {navItems.length > 1 && <SectionNav items={navItems} />}

        {/* Content */}
        <div className="bg-surface">
          {sections.map((section) => (
            <SectionShell key={section.id} id={section.id} title={section.title}>
              <SectionBody blocks={section.blocks} />
            </SectionShell>
          ))}

          {hasGallery && (
            <SectionShell id="gallery" title="Gallery">
              <div className="grid gap-5 sm:grid-cols-2">
                {page.images.slice(1).map((image, index) => (
                  <Reveal key={image.src} delay={index * 0.1}>
                    <div className="group overflow-hidden rounded-3xl border border-black/5 bg-white p-2 shadow-md">
                      <div className="overflow-hidden rounded-[1.25rem]">
                        <Image
                          src={`/assets/${image.src}`}
                          alt={image.alt || page.title}
                          width={1280}
                          height={934}
                          className="h-auto w-full transition-transform duration-700 group-hover:scale-[1.03]"
                        />
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </SectionShell>
          )}

          {/* CTA */}
          <section className="border-t border-black/5 pb-20 pt-14 sm:pb-24 sm:pt-20">
            <div className="container-x">
              <Reveal className="mx-auto max-w-7xl">
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
        </div>

        {/* Explore More Services */}
        <section className="relative overflow-hidden bg-navy-dark py-16 sm:py-24 text-white">
          <div className="grid-bg absolute inset-0 opacity-70" />
          <div className="absolute -left-10 sm:-left-20 top-5 sm:top-10 h-48 sm:h-72 w-48 sm:w-72 rounded-full bg-saffron/25 blur-[110px]" />
          <div className="absolute -right-10 sm:-right-20 bottom-0 h-48 sm:h-72 w-48 sm:w-72 rounded-full bg-india/30 blur-[110px]" />

          <div className="container-x relative">
            <Reveal className="mx-auto max-w-2xl text-center">
              <p className="eyebrow">Explore More</p>
              <h2 className="section-title">Other Services</h2>
              <div className="tricolor-bar mx-auto" />
            </Reveal>

            <div className="mt-12 sm:mt-16 grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {others.map((service) => (
                <Reveal key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="group flex min-h-28 flex-col items-center justify-center gap-4 rounded-2xl border border-white/10 bg-white/[.04] p-6 backdrop-blur transition-all duration-500 hover:-translate-y-1.5 hover:border-saffron/60 hover:bg-white/[.07]"
                  >
                    <span className="rounded-xl bg-saffron/10 p-3 text-saffron group-hover:bg-saffron group-hover:text-white transition-colors">
                      {service.icon}
                    </span>
                    <span className="text-center font-medium">{service.title}</span>
                    <MoveUpRight size={18} className="mt-auto transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-white/50 group-hover:text-saffron" />
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </>
    </ServicePageEnter>
  );
}