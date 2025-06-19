"use client";

import { motion } from "framer-motion";
import { useGSAP } from "@/hooks/use-gsap";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SparklesCore } from "@/components/ui/sparkles";

gsap.registerPlugin(ScrollTrigger);

const companies = [
  { name: "Apple", logo: "🍎" },
  { name: "Google", logo: "G" },
  { name: "Microsoft", logo: "⊞" },
  { name: "Meta", logo: "f" },
  { name: "Netflix", logo: "N" },
  { name: "Spotify", logo: "♪" },
  { name: "Uber", logo: "U" },
  { name: "Airbnb", logo: "A" },
  { name: "Tesla", logo: "T" },
  { name: "Amazon", logo: "a" },
  { name: "Stripe", logo: "S" },
  { name: "GitHub", logo: "⚡" },
];

export default function Companies() {
  const companiesRef = useGSAP(() => {
    gsap.fromTo(
      ".companies-title",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".companies-section",
          start: "top 80%",
        },
      }
    );

    gsap.to(".logo-track", {
      x: "-50%",
      duration: 20,
      ease: "none",
      repeat: -1,
    });

    gsap.to(".logo-track-reverse", {
      x: "50%",
      duration: 25,
      ease: "none",
      repeat: -1,
    });
  });

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black text-white">
      {/* Sparkling radial background effect */}
      <div className="absolute inset-0 z-0 overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,#e60a64,transparent_70%)] before:opacity-40 after:absolute after:-left-1/2 after:top-1/2 after:aspect-[1/0.7] after:w-[200%] after:rounded-[100%] after:border-t after:border-[#c5769066] after:bg-zinc-900">
        <SparklesCore
          id="tsparticles"
          background="transparent"
          particleDensity={200}
          className="absolute inset-0 w-full h-full"
        />
      </div>

      {/* Company content */}
      <section
        ref={companiesRef}
        className="companies-section relative z-10 py-32 w-full max-w-7xl mx-auto"
      >
        <div className="text-center mb-20">
          <h2 className="companies-title text-3xl md:text-5xl font-bold tracking-tight">
            <span className="text-rose-200">Trusted by experts.</span>
            <br />
            <span>Used by the leaders.</span>
          </h2>
        </div>

        {/* Row 1 */}
        <div className="relative overflow-hidden mb-12">
          <div className="logo-track flex space-x-16 whitespace-nowrap">
            {[...companies, ...companies].map((company, index) => (
              <motion.div
                key={`${company.name}-${index}`}
                className="flex-shrink-0 w-32 h-20 border border-white/20 rounded-xl flex items-center justify-center bg-white/5 hover:bg-white/10 transition-all duration-300 group backdrop-blur"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-center">
                  <div className="text-2xl mb-1 group-hover:scale-110 transition-transform">
                    {company.logo}
                  </div>
                  <div className="text-xs font-medium">{company.name}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Row 2 */}
        <div className="relative overflow-hidden">
          <div
            className="logo-track-reverse flex space-x-16 whitespace-nowrap"
            style={{ transform: "translateX(-50%)" }}
          >
            {[...companies.slice().reverse(), ...companies.slice().reverse()].map(
              (company, index) => (
                <motion.div
                  key={`${company.name}-reverse-${index}`}
                  className="flex-shrink-0 w-32 h-20 border border-white/20 rounded-xl flex items-center justify-center bg-white/5 hover:bg-white/10 transition-all duration-300 group backdrop-blur"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-1 group-hover:scale-110 transition-transform">
                      {company.logo}
                    </div>
                    <div className="text-xs font-medium">{company.name}</div>
                  </div>
                </motion.div>
              )
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
