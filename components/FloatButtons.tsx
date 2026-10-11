"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { SITE } from "@/lib/data";

export default function FloatButtons() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <>
      <motion.div style={{ scaleX, transformOrigin: "0 50%" }} className="fixed inset-x-0 top-0 z-[60] h-[3px] bg-saffron" />
      <div className="fixed bottom-24 right-5 z-[20] flex flex-col-reverse items-center gap-4">
        <a href={SITE.whatsapp} target="_blank" rel="noopener" aria-label="Chat on WhatsApp" className="grid h-14 w-14 place-items-center rounded-full bg-white shadow-xl transition hover:scale-110">
          <Image src="/assets/whatsapp.png" alt="" width={34} height={34} />
        </a>
        <AnimatePresence>
          {show && (
            <motion.button initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Scroll to top" className="grid h-14 w-14 place-items-center rounded-full bg-saffron text-white shadow-lg transition hover:scale-110">
              <ArrowUp size={24} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
