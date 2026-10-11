"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { QUOTE_URL } from "@/lib/data";

const words: { t: string; c?: string }[] = [
  { t: "3D" }, { t: "Printing," }, { t: "Vacuum" }, { t: "Casting", c: "text-saffron" }, { t: "&" },
  { t: "Rapid", c: "text-[#2fbf3a]" }, { t: "Prototyping", c: "text-[#2fbf3a]" },
];

export default function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden bg-navy-dark pb-20 pt-24 sm:pb-32 sm:pt-32 text-white">
      <div className="grid-bg absolute inset-0" />
      <div className="absolute -right-24 -top-24 h-96 w-96 animate-drift rounded-full bg-saffron/40 blur-[110px]" />
      <div className="absolute -bottom-24 left-0 h-80 w-80 animate-drift rounded-full bg-india/40 blur-[110px] [animation-delay:-6s]" />
      <div className="absolute left-1/3 top-1/3 h-72 w-72 animate-drift rounded-full bg-navy/50 blur-[110px] [animation-delay:-3s]" />

      <div className="container-x relative z-10 grid items-center gap-8 lg:gap-14 lg:grid-cols-2">
        <div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-4 hidden sm:inline-flex sm:items-center sm:gap-2.5 rounded-full border border-saffron/40 bg-saffron/10 px-4 py-1.5 text-xs font-medium text-saffron sm:text-sm">
            <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-india opacity-75" /><span className="relative inline-flex h-2 w-2 rounded-full bg-india" /></span>
            15+ Years of Expertise · Chennai, India
          </motion.div>

          <h1 className="font-display text-[1.8rem] font-extrabold leading-[1.15] sm:text-[2.5rem] sm:leading-[1.1] lg:text-5xl xl:text-[4.2rem]">
            {words.map((w, i) => (
              <span key={i} className="mr-[.15em] sm:mr-[.25em] inline-block overflow-hidden py-1 align-bottom">
                <motion.span className={`inline-block ${w.c ?? ""}`} initial={{ y: "115%" }} animate={{ y: 0 }} transition={{ duration: 0.8, delay: 0.15 * i + 0.2, ease: [0.2, 0.7, 0.2, 1] }}>{w.t}</motion.span>
              </span>
            ))}
          </h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3 }} className="mt-4 max-w-xl text-sm leading-relaxed text-white/70 sm:mt-6 sm:text-base sm:leading-relaxed lg:text-lg">
            <span className="font-semibold text-white">Design. Print. Inspire.</span> 3D Printing, Vacuum Casting and Rapid Prototyping solutions in Chennai, India with over 15 years of expertise. We bring your ideas to life with precision and speed.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5 }} className="mt-6 flex flex-wrap gap-3 sm:mt-9 sm:gap-4">
            <a href={QUOTE_URL} target="_blank" rel="noopener" className="btn btn-saffron group text-sm sm:text-base">GET A QUOTE <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></a>
            <a href="#services" className="btn btn-ghost text-sm sm:text-base">OUR SERVICES</a>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.9, rotate: 3 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 1, delay: 0.4 }} className="relative mx-auto w-full max-w-lg sm:max-w-xl mt-8 sm:mt-0">
          <div className="absolute -inset-3 sm:-inset-4 rounded-[1.8rem] sm:rounded-[2.2rem] bg-saffron/40 blur-2xl" />
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] border border-white/15 shadow-2xl">
            <Image src="/assets/home.jpeg" alt="3D printer building a model car at VCAN 3D" fill priority sizes="(max-width:640px) 85vw, (max-width:1024px) 90vw, 560px" className="object-cover" />
            <div className="absolute inset-0 bg-navy-dark/50" />
            <div className="absolute inset-x-0 h-[2px] animate-scan bg-saffron shadow-[0_0_24px_5px_#FF9933]" />
            {["left-2 top-2 border-l-2 border-t-2 sm:left-3 sm:top-3", "right-2 top-2 border-r-2 border-t-2 sm:right-3 sm:top-3", "bottom-2 left-2 border-b-2 border-l-2 sm:bottom-3 sm:left-3", "bottom-2 right-2 border-b-2 border-r-2 sm:bottom-3 sm:right-3"].map((c) => (
              <span key={c} className={`absolute h-5 w-5 sm:h-6 sm:w-6 border-saffron ${c}`} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
