"use client";

import { useEffect, useRef, useState } from "react";

type Item = { id: string; label: string };

export default function SectionNav({ items }: { items: Item[] }) {
  const [active, setActive] = useState(items[0]?.id);
  const barRef = useRef<HTMLDivElement>(null);

  // highlight the section currently in view
  useEffect(() => {
    const els = items
      .map((i) => document.getElementById(i.id))
      .filter(Boolean) as HTMLElement[];
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-25% 0px -60% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  // keep the active chip visible in the horizontal scroller (mobile)
  useEffect(() => {
    const chip = barRef.current?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    const bar = barRef.current;
    if (chip && bar) {
      bar.scrollTo({
        left: chip.offsetLeft - bar.clientWidth / 2 + chip.clientWidth / 2,
        behavior: "smooth",
      });
    }
  }, [active]);

  return (
    <div className="sticky top-16 z-30 border-b border-black/5 bg-white/85 backdrop-blur-md sm:top-20">
      <div className="container-x">
        <nav
          ref={barRef}
          aria-label="Page sections"
          className="mx-auto flex max-w-7xl gap-2 overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item) => {
            const isActive = item.id === active;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                data-id={item.id}
                aria-current={isActive ? "true" : undefined}
                className={`flex-none rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  isActive
                    ? "bg-saffron text-white shadow-sm"
                    : "text-navy/70 hover:bg-saffron/10 hover:text-navy"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
