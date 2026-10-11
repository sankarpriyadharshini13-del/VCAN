import dynamic from "next/dynamic";
import { Suspense } from "react";

const Hero = dynamic(() => import("@/components/Hero"), { loading: () => <div className="h-screen bg-navy-dark" /> });
const Stats = dynamic(() => import("@/components/Stats"));
const About = dynamic(() => import("@/components/About"));
const Services = dynamic(() => import("@/components/Services"));
const Process = dynamic(() => import("@/components/Process"));
const Industries = dynamic(() => import("@/components/Industries"));
const WhyUs = dynamic(() => import("@/components/WhyUs"));
const Contact = dynamic(() => import("@/components/Contact"));

export default function Home() {
  return (
    <>
      <Suspense fallback={<div className="h-screen bg-navy-dark" />}>
        <Hero />
      </Suspense>
      <Stats />
      <About />
      <Services />
      <Process />
      <Industries />
      <WhyUs />
      <Contact />
    </>
  );
}
