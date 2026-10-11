"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, Copy, Instagram, Mail, Phone } from "lucide-react";
import { SERVICES, SITE } from "@/lib/data";

// For an exact pin, replace with the URL from Google Maps -> Share -> Embed a map.
const MAP_SRC = `https://www.google.com/maps?q=${encodeURIComponent(`VCAN 3D, ${SITE.address}`)}&z=16&output=embed`;

// Custom WhatsApp icon that changes color on hover
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} group-hover:fill-[#2fbf3a]`}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const QUICK_LINKS: [string, string][] = [
  ["Home", "/"],
  ["About", "/#about"],
  ["Services", "/#services"],
  ["Contact", "/#contact"],
];

const delay = (n: number) => ({ transitionDelay: `${n * 100}ms` });

const socialCls =
  "group grid h-11 w-11 place-items-center rounded-full border border-white/15 transition-all duration-300 hover:-translate-y-1 text-white/65";

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const magnetRef = useRef<HTMLAnchorElement>(null);
  const [shown, setShown] = useState(false);
  const [hot, setHot] = useState<number | null>(null); // hovered service row
  const [tab, setTab] = useState<"reach" | "find">("reach");
  const [copied, setCopied] = useState<string | null>(null);

  // Reveal on scroll
  useEffect(() => {
    const el = footerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Cursor spotlight: pass the pointer position to CSS
  const onFooterMove = (e: MouseEvent<HTMLElement>) => {
    const el = footerRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
    el.dataset.hover = "true";
  };

  // Magnetic button
  const onMagnetMove = (e: MouseEvent<HTMLDivElement>) => {
    const btn = magnetRef.current;
    if (!btn) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * 0.35;
    const y = (e.clientY - (r.top + r.height / 2)) * 0.35;
    btn.style.transform = `translate(${x}px, ${y}px)`;
  };
  const onMagnetLeave = () => {
    if (magnetRef.current) magnetRef.current.style.transform = "";
  };

  // Copy to clipboard with feedback
  const copy = async (value: string, key: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(key);
      setTimeout(() => setCopied((c) => (c === key ? null : c)), 1600);
    } catch {
      /* clipboard not available */
    }
  };

  const contactRows = [
    { key: "phone", value: SITE.phone, href: SITE.phoneHref, Icon: Phone },
    ...SITE.emails.map((email) => ({ key: email, value: email, href: `mailto:${email}`, Icon: Mail })),
  ];

  return (
    <footer
      ref={footerRef}
      data-ft={shown ? "in" : "out"}
      onMouseMove={onFooterMove}
      onMouseLeave={() => {
        if (footerRef.current) footerRef.current.dataset.hover = "false";
      }}
      className="relative overflow-hidden bg-navy-dark text-sm text-white/65"
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .ft-rv{opacity:0;transform:translateY(24px);transition:opacity .9s cubic-bezier(.22,1,.36,1),transform .9s cubic-bezier(.22,1,.36,1)}
        [data-ft="in"] .ft-rv{opacity:1;transform:none}
        .ft-bar{transform:scaleX(0);transform-origin:left;transition:transform 1.4s cubic-bezier(.22,1,.36,1)}
        [data-ft="in"] .ft-bar{transform:scaleX(1)}
        @keyframes ft-spin{to{transform:rotate(360deg)}}
        .ft-spin{animation:ft-spin 4s linear infinite}
        @keyframes ft-pop{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
        .ft-pop{animation:ft-pop .45s cubic-bezier(.22,1,.36,1)}

        /* Cursor spotlight + print-layer lines that appear under the pointer */
        .ft-spot,.ft-grid{opacity:0;transition:opacity .5s}
        [data-hover="true"] .ft-spot,[data-hover="true"] .ft-grid{opacity:1}
        .ft-spot{background:radial-gradient(460px circle at var(--mx,50%) var(--my,50%),color-mix(in srgb,currentColor 15%,transparent),transparent 65%)}
        .ft-grid{background:linear-gradient(0deg,rgba(255,255,255,.16) 1px,transparent 1px) 0 0/100% 9px;
          -webkit-mask-image:radial-gradient(280px circle at var(--mx,50%) var(--my,50%),#000,transparent 70%);
          mask-image:radial-gradient(280px circle at var(--mx,50%) var(--my,50%),#000,transparent 70%)}

        @media (prefers-reduced-motion:reduce){
          .ft-rv{opacity:1;transform:none;transition:none}
          .ft-bar{transform:none;transition:none}
          .ft-spin,.ft-pop{animation:none}
        }
      `,
        }}
      />

      {/* Tricolour bar draws in */}
      <div className="h-1 overflow-hidden">
        <div className="ft-bar h-full bg-saffron" />
      </div>

      {/* Interactive cursor layers */}
      <div aria-hidden="true" className="ft-spot pointer-events-none absolute inset-0 text-saffron" />
      <div aria-hidden="true" className="ft-grid pointer-events-none absolute inset-0" />

      <div className="container-x relative">
        {/* 1. Headline + magnetic button */}
        <div className="ft-rv flex flex-col gap-8 pt-16 sm:pt-24 md:flex-row md:items-center md:justify-between" style={delay(0)}>
          <div className="max-w-2xl">
            <h3 className="font-display text-4xl font-bold leading-[1.05] text-white sm:text-6xl">
              Got an idea? Let&apos;s print it.
            </h3>
            <p className="mt-5 max-w-xl text-base leading-relaxed">
              Send your design files or tell us about your project. Get a detailed quote and fast turnaround from VCAN 3D, Chennai.
            </p>
          </div>
          <div className="self-start p-6 md:self-auto" onMouseMove={onMagnetMove} onMouseLeave={onMagnetLeave}>
            <a
              ref={magnetRef}
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener"
              className="group grid h-32 w-32 place-items-center rounded-full bg-saffron text-center font-semibold text-navy-dark shadow-lg shadow-saffron/20 transition-[transform,box-shadow] duration-200 ease-out hover:shadow-2xl hover:shadow-saffron/40 sm:h-36 sm:w-36"
            >
              <span className="flex flex-col items-center gap-1">
                Get a quote
                <ArrowUpRight size={20} aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
              </span>
            </a>
          </div>
        </div>

        {/* 2. Services (interactive list) + Contact (tabs) */}
        <div className="grid gap-12 py-14 sm:py-20 lg:grid-cols-12 lg:gap-16">
          <div className="ft-rv flex flex-col lg:col-span-7" style={delay(1)}>
            <p className="mb-2 font-display font-semibold text-white">Services</p>
            <ul className="flex flex-1 flex-col border-t border-white/10" onMouseLeave={() => setHot(null)}>
              {SERVICES.map((service, i) => (
                <li
                  key={service.slug}
                  onMouseEnter={() => setHot(i)}
                  onFocus={() => setHot(i)}
                  onBlur={() => setHot(null)}
                  className={`flex flex-1 flex-col transition-opacity duration-300 ${hot !== null && hot !== i ? "opacity-35" : "opacity-100"}`}
                >
                  <Link
                    href={`/services/${service.slug}`}
                    className="group relative flex flex-1 items-center justify-between border-b border-white/10 py-2.5 font-display text-lg font-semibold text-white/85 transition-all duration-300 hover:pl-3 hover:text-white sm:text-xl"
                  >
                    <span>{service.title}</span>
                    <span className="grid h-7 w-7 flex-none place-items-center rounded-full border border-white/15 transition-all duration-300 group-hover:border-saffron group-hover:bg-saffron group-hover:text-navy-dark">
                      <ArrowUpRight size={14} aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                    <span aria-hidden="true" className="absolute -bottom-px left-0 h-px w-0 bg-saffron transition-all duration-500 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="ft-rv lg:col-span-5" style={delay(2)}>
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur sm:p-6">
              <p className="mb-4 font-display font-semibold text-white">Contact Info</p>

              {/* Segmented tabs with sliding indicator */}
              <div role="tablist" aria-label="Contact options" className="relative grid grid-cols-2 rounded-full border border-white/10 bg-white/5 p-1">
                <span
                  aria-hidden="true"
                  className="absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-saffron transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)]"
                  style={{ transform: tab === "reach" ? "translateX(0)" : "translateX(100%)" }}
                />
                {([["reach", "Reach us"], ["find", "Find us"]] as const).map(([id, label]) => (
                  <button
                    key={id}
                    type="button"
                    role="tab"
                    aria-selected={tab === id}
                    onClick={() => setTab(id)}
                    className={`relative z-10 rounded-full py-2 text-sm font-semibold transition-colors duration-300 ${tab === id ? "text-navy-dark" : "text-white/70 hover:text-white"}`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className="mt-5 min-h-[17rem]">
                {/* Reach us: phone + 3 emails with copy buttons */}
                <ul role="tabpanel" className={`space-y-2.5 ${tab === "reach" ? "ft-pop" : "hidden"}`}>
                  {contactRows.map(({ key, value, href, Icon }) => (
                    <li key={key} className="group flex items-center gap-2 rounded-2xl border border-transparent px-2 py-1.5 transition-colors duration-300 hover:border-white/10 hover:bg-white/5">
                      <a href={href} className="flex min-w-0 flex-1 items-center gap-3 transition-colors hover:text-white">
                        <span className="grid h-10 w-10 flex-none place-items-center rounded-xl border border-white/10 bg-white/5 text-saffron transition-all duration-300 group-hover:border-saffron group-hover:bg-saffron group-hover:text-navy-dark">
                          <Icon size={17} aria-hidden="true" />
                        </span>
                        <span className="truncate">{value}</span>
                      </a>
                      <button
                        type="button"
                        onClick={() => copy(value, key)}
                        aria-label={`Copy ${value}`}
                        className="inline-flex flex-none items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-xs transition-all duration-300 hover:border-saffron hover:text-saffron"
                      >
                        {copied === key ? <Check size={13} aria-hidden="true" /> : <Copy size={13} aria-hidden="true" />}
                        {copied === key ? "Copied" : "Copy"}
                      </button>
                    </li>
                  ))}
                </ul>

                {/* Find us: map with animated tricolour border */}
                <div role="tabpanel" className={tab === "find" ? "ft-pop" : "hidden"}>
                  <div className="relative flex h-[17rem] overflow-hidden rounded-2xl p-[2px] shadow-lg shadow-black/30">
                    <span aria-hidden="true" className="ft-spin absolute -inset-[100%] bg-saffron" />
                    <div className="relative flex-1 overflow-hidden rounded-[14px] bg-navy-dark">
                      <iframe
                        title="VCAN 3D location"
                        src={MAP_SRC}
                        className="absolute inset-x-0 -top-24 h-[calc(100%+6rem)] w-full border-0 opacity-90 [filter:grayscale(1)_invert(0.92)_contrast(0.9)] transition duration-300 hover:opacity-100 hover:[filter:none]"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        allowFullScreen
                      />
                      <a
                        href={SITE.maps}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-navy-dark/90 px-3 py-1.5 text-xs font-medium text-white backdrop-blur transition-colors duration-300 hover:border-saffron hover:text-saffron"
                      >
                        Open in Maps
                        <ArrowUpRight size={13} aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Brand strip: logo, quick links, socials */}
        <div className="ft-rv flex flex-col gap-8 border-t border-white/10 py-8 lg:flex-row lg:items-center lg:justify-between lg:pr-28" style={delay(3)}>
          <Link href="/" className="inline-flex items-center gap-3">
            <Image src="/assets/logo.png" alt="VCAN 3D" width={40} height={45} className="h-11 w-auto" />
            <span>
              <span className="block font-display text-xl font-bold text-white">
                VCAN <span className="text-saffron">3D</span>
              </span>
              <span className="block text-xs font-semibold text-white/80">Design. Print. Inspire.</span>
            </span>
          </Link>

          <nav aria-label="Footer" className="flex flex-wrap gap-2">
            {QUICK_LINKS.map(([label, href]) => (
              <Link
                key={label}
                href={href}
                className="rounded-full border border-white/10 px-4 py-1.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-saffron hover:bg-saffron hover:text-navy-dark"
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex gap-3">
            <a href={SITE.instagram} target="_blank" rel="noopener" aria-label="Instagram" className={`${socialCls} hover:border-saffron hover:text-saffron`}>
              <Instagram size={18} className="transition-transform duration-300 group-hover:scale-110" />
            </a>
            <a href={SITE.whatsapp} target="_blank" rel="noopener" aria-label="WhatsApp" className={`${socialCls} hover:border-[#2fbf3a] hover:text-[#2fbf3a]`}>
              <WhatsAppIcon className="h-[18px] w-[18px] transition-transform duration-300 group-hover:scale-110" />
            </a>
          </div>
        </div>

        {/* 4. Bottom bar (right padding clears the floating WhatsApp button) */}
        <div
          className="ft-rv flex flex-col items-center justify-between gap-2 border-t border-white/10 py-6 text-center text-xs sm:flex-row sm:pr-24 sm:text-left"
          style={delay(4)}
        >
          <p>© 2026 VCAN 3D. All Rights Reserved</p>
          <p>
            Designed and developed by{" "}
            <a href="http://www.innoapptechnologies.in" target="_blank" rel="noopener" className="text-saffron transition-opacity hover:opacity-80">
              InnoApp Technologies
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}