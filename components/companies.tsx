"use client"

import { motion } from "framer-motion"
import { useGSAP } from "@/hooks/use-gsap"
import { gsap } from "gsap"

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
]

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
          end: "bottom 20%",
        },
      },
    )

    // Infinite scroll animation
    gsap.to(".logo-track", {
      x: "-50%",
      duration: 20,
      ease: "none",
      repeat: -1,
    })

    gsap.to(".logo-track-reverse", {
      x: "50%",
      duration: 25,
      ease: "none",
      repeat: -1,
    })
  })

  return (
    <section ref={companiesRef} className="companies-section py-20 md:py-28 border-t border-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="companies-title text-3xl md:text-5xl font-bold mb-4 tracking-tight">
            Trusted by industry leaders
          </h2>
          <p className="companies-title text-lg text-foreground max-w-2xl mx-auto">
            Join thousands of companies building with our components
          </p>
        </div>

        {/* First row - moving left */}
        <div className="relative overflow-hidden mb-8">
          <div className="logo-track flex space-x-16 whitespace-nowrap">
            {[...companies, ...companies].map((company, index) => (
              <motion.div
                key={`${company.name}-${index}`}
                className="flex-shrink-0 w-32 h-20 border border-border rounded-xl flex items-center justify-center bg-card hover:bg-foreground hover:text-background transition-all duration-300 group"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-center">
                  <div className="text-2xl mb-1 group-hover:scale-110 transition-transform">{company.logo}</div>
                  <div className="text-xs font-medium">{company.name}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Second row - moving right */}
        <div className="relative overflow-hidden">
          <div
            className="logo-track-reverse flex space-x-16 whitespace-nowrap"
            style={{ transform: "translateX(-50%)" }}
          >
            {[...companies.slice().reverse(), ...companies.slice().reverse()].map((company, index) => (
              <motion.div
                key={`${company.name}-reverse-${index}`}
                className="flex-shrink-0 w-32 h-20 border border-border rounded-xl flex items-center justify-center bg-card hover:bg-foreground hover:text-background transition-all duration-300 group"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-center">
                  <div className="text-2xl mb-1 group-hover:scale-110 transition-transform">{company.logo}</div>
                  <div className="text-xs font-medium">{company.name}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
