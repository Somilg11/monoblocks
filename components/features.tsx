"use client"

import { Smartphone, Terminal, Globe } from "lucide-react"
import InteractiveCard from "./interactive-card"
import { useGSAP } from "@/hooks/use-gsap"
import { gsap } from "gsap"

const features = [
  {
    icon: Smartphone,
    title: "Pixel-Perfect Styling",
    description:
      "Every block comes perfectly styled and optimized for all screen sizes — so your UI looks great out of the box.",
    mockup: (
      <div className="border border-border rounded-xl p-4">
        <div className="bg-background border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs text-foreground font-medium">9:41</div>
            <div className="flex space-x-1">
              <div className="w-1 h-1 bg-foreground rounded-full" />
              <div className="w-1 h-1 bg-foreground rounded-full" />
              <div className="w-1 h-1 bg-foreground rounded-full" />
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm">Dashboard</span>
              <div className="bg-foreground text-background px-3 py-1 rounded-lg text-xs font-medium">Download</div>
            </div>
            <div className="flex space-x-2 text-xs">
              <span className="bg-foreground text-background px-2 py-1 rounded-md font-medium">Overview</span>
              <span className="text-foreground border border-border px-2 py-1 rounded-md">Analytics</span>
              <span className="text-foreground border border-border px-2 py-1 rounded-md">Reports</span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    icon: Terminal,
    title: "CLI & Manual Support",
    description: "Integrate your landing page directly in the product while using your favorite tools.",
    mockup: (
      <div className="grid grid-cols-2 gap-2">
        {[
          { label: "N", color: "bg-foreground/10" },
          { label: "TS", color: "bg-foreground/15" },
          { label: "~", color: "bg-foreground/10" },
          { label: "⚡", color: "bg-foreground/15" },
        ].map((item, i) => (
          <div
            key={i}
            className={`${item.color} rounded-lg p-3 border border-border/30 flex items-center justify-center transition-all duration-200 hover:scale-105`}
          >
            <span className="text-xs font-bold">{item.label}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: Globe,
    title: "Globally Usable",
    description:
      "Blocks are available everywhere but ours are the best. Use them in your favorite framework or even in plain HTML.",
    mockup: (
      <div className="relative overflow-hidden rounded-lg">
        <div className="text-2xl font-bold text-foreground/20 mb-2 tracking-tight">Monoblocks</div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/5 to-transparent rounded-lg blur-sm" />
      </div>
    ),
  },
]

export default function Features() {
  const featuresRef = useGSAP(() => {
    gsap.fromTo(
      ".feature-title",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".features-section",
          start: "top 80%",
          end: "bottom 20%",
        },
      },
    )

    gsap.fromTo(
      ".feature-card",
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".features-grid",
          start: "top 80%",
          end: "bottom 20%",
        },
      },
    )
  })

  return (
    <section ref={featuresRef} className="features-section py-20 md:py-28" id="features">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="feature-title text-3xl md:text-5xl font-bold mb-4 tracking-tight">Features</h2>
          <p className="feature-title text-lg text-foreground/70 max-w-2xl mx-auto">
            Everything you need to build beautiful interfaces faster than ever before.
          </p>
        </div>

        {/* Features Grid */}
        <div className="features-grid grid md:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <InteractiveCard key={feature.title} className="feature-card" glowEffect={true}>
              <div className="glass rounded-2xl p-6 h-full border border-border/50 hover:border-border transition-all duration-300">
                {/* Icon & Title */}
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 glass rounded-xl flex items-center justify-center mr-4 border border-border/30">
                    <feature.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight">{feature.title}</h3>
                </div>

                {/* Description */}
                <p className="text-foreground/70 mb-8 leading-relaxed text-sm">{feature.description}</p>

                {/* Mockup */}
                <div className="mt-auto">{feature.mockup}</div>
              </div>
            </InteractiveCard>
          ))}
        </div>
      </div>
    </section>
  )
}
