"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { QUOTE_URL, SERVICES } from "@/lib/data";

const links = [["Home", "/"], ["About", "/#about"], ["Services", "/#services"], ["Process", "/#process"], ["Contact", "/#contact"]];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false); // desktop dropdown
  const [menuOpen, setMenuOpen] = useState(false); // mobile drawer
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const pathname = usePathname();

  // Scroll state
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  // Close everything on route change
  useEffect(() => {
    setMenuOpen(false);
    setServicesOpen(false);
    setMobileServicesOpen(false);
  }, [pathname]);

  // Lock body scroll + Escape to close while the drawer is open
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  // Auto-close drawer if the viewport grows to desktop size
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const on = () => mq.matches && setMenuOpen(false);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const solid = scrolled || menuOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid ? "border-b border-white/10 bg-navy-dark/90 py-2.5 backdrop-blur-xl" : "py-4 sm:py-5"
      }`}
    >
      <div className="container-x flex items-center justify-between gap-3">
        {/* Logo */}
        <Link href="/" className="flex min-w-0 items-center gap-2.5 sm:gap-3" onClick={closeMenu}>
          <Image
            src="/assets/logo.png"
            alt="VCAN 3D logo"
            width={44}
            height={49}
            className="h-9 w-auto shrink-0 transition-transform duration-500 hover:rotate-[-8deg] hover:scale-110 sm:h-11"
            priority
          />
          <span className="font-display text-lg font-bold tracking-wide text-white sm:text-xl">
            VCAN <span className="text-saffron">3D</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 xl:gap-9 lg:flex" aria-label="Main">
          {links.map(([l, h]) => {
            if (l === "Services") {
              return (
                <div
                  key={l}
                  className="relative"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                  onFocus={() => setServicesOpen(true)}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node)) setServicesOpen(false);
                  }}
                >
                  <Link
                    href={h}
                    aria-haspopup="true"
                    aria-expanded={servicesOpen}
                    className="group relative flex items-center gap-1 text-sm font-medium text-white/80 transition-colors hover:text-white"
                  >
                    {l}
                    <ChevronDown size={16} className={`transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
                    <span className="absolute -bottom-1.5 left-0 h-0.5 w-0 bg-saffron transition-all duration-300 group-hover:w-full" />
                  </Link>
                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-1/2 top-full -translate-x-1/2 pt-4"
                      >
                        <div className="w-[min(500px,calc(100vw-2rem))] rounded-2xl border border-white/10 bg-navy-dark/95 p-5 shadow-2xl backdrop-blur-xl xl:p-6">
                          <div className="grid grid-cols-2 gap-3 xl:gap-4">
                            {SERVICES.map((service) => (
                              <Link
                                key={service.slug}
                                href={`/services/${service.slug}`}
                                className="group flex items-start gap-3 rounded-xl border border-white/5 bg-white/5 p-3 transition-all hover:border-saffron/30 hover:bg-white/10 xl:p-4"
                              >
                                <div className="shrink-0 rounded-lg bg-saffron/10 p-2 text-saffron">{service.icon}</div>
                                <div className="min-w-0">
                                  <h3 className="text-sm font-semibold text-white transition-colors group-hover:text-saffron">
                                    {service.title}
                                  </h3>
                                  <p className="mt-1 line-clamp-2 text-xs text-white/60">{service.desc}</p>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }
            return (
              <Link key={l} href={h} className="group relative text-sm font-medium text-white/80 transition-colors hover:text-white">
                {l}
                <span className="absolute -bottom-1.5 left-0 h-0.5 w-0 bg-saffron transition-all duration-300 group-hover:w-full" />
              </Link>
            );
          })}
        </nav>

        {/* Right side: CTA + hamburger */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={QUOTE_URL}
            target="_blank"
            rel="noopener"
            className="btn btn-saffron hidden !px-6 !py-2.5 sm:inline-flex"
          >
            GET A QUOTE
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 text-white transition-colors hover:border-saffron/40 hover:text-saffron focus-visible:outline focus-visible:outline-2 focus-visible:outline-saffron lg:hidden"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile / tablet drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden lg:hidden"
          >
            <nav
              aria-label="Mobile"
              className="container-x max-h-[calc(100dvh-4.5rem)] overflow-y-auto overscroll-contain pb-6 pt-4"
            >
              <ul className="flex flex-col">
                {links.map(([l, h]) => {
                  if (l === "Services") {
                    return (
                      <li key={l} className="border-b border-white/10">
                        <div className="flex items-center justify-between py-4">
                          <Link
                            href={h}
                            onClick={closeMenu}
                            className="flex-1 text-base font-medium text-white/90 transition-colors hover:text-saffron"
                          >
                            {l}
                          </Link>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setMobileServicesOpen((o) => !o);
                            }}
                            aria-expanded={mobileServicesOpen}
                            className="ml-2 p-1 text-white/90 transition-colors hover:text-white"
                          >
                            <ChevronDown size={18} className={`transition-transform duration-300 ${mobileServicesOpen ? "rotate-180" : ""}`} />
                          </button>
                        </div>
                        <AnimatePresence initial={false}>
                          {mobileServicesOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25 }}
                              className="overflow-hidden"
                            >
                              <div className="grid gap-2 pb-4 sm:grid-cols-2">
                                {SERVICES.map((service) => (
                                  <Link
                                    key={service.slug}
                                    href={`/services/${service.slug}`}
                                    onClick={closeMenu}
                                    className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/5 p-3 transition-colors hover:border-saffron/30 hover:bg-white/10"
                                  >
                                    <div className="shrink-0 rounded-lg bg-saffron/10 p-2 text-saffron">{service.icon}</div>
                                    <div className="min-w-0">
                                      <h3 className="text-sm font-semibold text-white">{service.title}</h3>
                                      <p className="mt-0.5 line-clamp-2 text-xs text-white/60">{service.desc}</p>
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </li>
                    );
                  }
                  return (
                    <li key={l} className="border-b border-white/10">
                      <Link
                        href={h}
                        onClick={closeMenu}
                        className="block py-4 text-base font-medium text-white/90 transition-colors hover:text-saffron"
                      >
                        {l}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              {/* CTA is hidden in the top bar on very small screens, so show it here */}
              <a
                href={QUOTE_URL}
                target="_blank"
                rel="noopener"
                onClick={closeMenu}
                className="btn btn-saffron mt-6 w-full justify-center sm:hidden"
              >
                GET A QUOTE
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}