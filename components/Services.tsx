"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Reveal from "./Reveal";
import { SERVICES } from "@/lib/data";

/**
 * Optional fields on each service (everything else you already have):
 *   images?: string[]   -> extra photos; shows the dots + cycles on hover
 *   category?: string   -> used for the filter pills (hidden if none exist)
 */
type ServiceItem = (typeof SERVICES)[number] & {
  images?: string[];
  category?: string;
};

function ServiceCard({ service }: { service: ServiceItem }) {
  const gallery = service.images?.length ? service.images : [service.image];
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);

  // Auto-cycle photos while hovering (only if there is more than one)
  useEffect(() => {
    if (!hovered || gallery.length < 2) return;
    const id = setInterval(() => setActive((i) => (i + 1) % gallery.length), 1800);
    return () => clearInterval(id);
  }, [hovered, gallery.length]);

  return (
    <Link
      href={`/services/${service.slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setActive(0);
      }}
      className="group relative block aspect-[3/4] w-[85%] shrink-0 snap-start overflow-hidden rounded-2xl sm:rounded-3xl bg-navy-dark shadow-[0_18px_40px_-22px_rgba(15,23,42,.55)] transition duration-500 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)] xl:w-[calc((100%-4.5rem)/4)]"
    >
      {/* Images: scaled from the bottom so any black bar at the top of the source is cropped */}
      {gallery.map((img, i) => (
        <Image
          key={img + i}
          src={`/assets/${img}`}
          alt={`${service.title} ${i + 1}`}
          fill
          sizes="(max-width: 640px) 78vw, (max-width: 1024px) 50vw, 25vw"
          className={`origin-bottom scale-[1.1] object-cover object-bottom transition-all duration-700 group-hover:scale-[1.16] ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Bottom navy gradient */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-navy-dark/80" />

      {/* Dots */}
      {gallery.length > 1 && (
        <div className="absolute inset-x-0 top-4 flex items-center justify-center gap-1.5">
          {gallery.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show image ${i + 1}`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setActive(i);
              }}
              className={`h-1.5 rounded-full bg-white transition-all duration-300 ${
                i === active ? "w-5 opacity-100" : "w-1.5 opacity-60"
              }`}
            />
          ))}
        </div>
      )}

      {/* Title + subtitle + arrow */}
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 sm:gap-3 p-4 sm:p-5">
        <div className="min-w-0">
          <h3 className="font-display text-sm font-bold uppercase leading-tight tracking-wide text-white sm:text-base lg:text-lg xl:text-xl">
            {service.title}
          </h3>
          <p className="mt-0.5 sm:mt-1 line-clamp-1 text-xs sm:text-sm text-white/80">{service.desc}</p>
        </div>
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/25 text-white backdrop-blur-md transition duration-300 group-hover:bg-saffron sm:h-11 sm:w-11">
          <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
        </span>
      </div>
    </Link>
  );
}

export default function Services() {
  const items = SERVICES as ServiceItem[];

  const categories = useMemo(() => {
    const set = new Set<string>();
    items.forEach((s) => s.category && set.add(s.category));
    return set.size ? ["All", ...Array.from(set)] : [];
  }, [items]);

  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? items : items.filter((s) => s.category === filter);

  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateArrows = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: 0 });
    updateArrows();
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [filter, updateArrows]);

  const scrollByCard = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el || !el.firstElementChild) return;
    const card = el.firstElementChild as HTMLElement;
    el.scrollBy({ left: dir * (card.offsetWidth + 24), behavior: "smooth" });
  };

  return (
    <section id="services" className="bg-surface py-16 pb-20">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">What We Do</p>
          <h2 className="section-title">Our Services</h2>
          <div className="tricolor-bar mx-auto" />
          <p className="mt-5 text-muted">Comprehensive 3D Manufacturing Solutions in Chennai</p>
        </Reveal>

        {/* Filter pills */}
        {categories.length > 0 && (
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                className={`rounded-xl border px-6 py-2.5 text-sm font-semibold transition duration-300 ${
                  filter === cat
                    ? "border-navy bg-navy text-white"
                    : "border-slate-200 bg-white text-navy hover:border-navy"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Carousel */}
        <div className="relative mt-12 px-3 sm:px-0">
          <button
            type="button"
            aria-label="Previous"
            onClick={() => scrollByCard(-1)}
            disabled={!canPrev}
            className="absolute left-0 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white text-navy shadow-[0_8px_24px_-8px_rgba(15,23,42,.45)] transition hover:scale-105 disabled:pointer-events-none disabled:opacity-0 sm:-left-4 sm:h-12 sm:w-12 lg:-left-5"
          >
            <ChevronLeft size={22} />
          </button>

          <div
            ref={trackRef}
            className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-1 py-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {filtered.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>

          <button
            type="button"
            aria-label="Next"
            onClick={() => scrollByCard(1)}
            disabled={!canNext}
            className="absolute right-0 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white text-navy shadow-[0_8px_24px_-8px_rgba(15,23,42,.45)] transition hover:scale-105 disabled:pointer-events-none disabled:opacity-0 sm:-right-4 sm:h-12 sm:w-12 lg:-right-5"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      </div>
    </section>
  );
}