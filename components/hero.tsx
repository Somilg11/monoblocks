"use client"

import { motion } from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"
import MagneticButton from "./magnetic-button"
import { useGSAP } from "@/hooks/use-gsap"
import { gsap } from "gsap"
import { VelocityScroll } from "./ui/scrollbasedvelocity"
import { useRef, useState } from "react"
import { HoverBorderGradient } from "./ui/hover-border-gradient"

export default function Hero() {
  const heroRef = useGSAP(() => {
    const tl = gsap.timeline({ delay: 3 })

    tl.fromTo(".hero-badge", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" })
      .fromTo(".hero-title", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power2.out" }, "-=0.4")
      .fromTo(".hero-subtitle", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, "-=0.6")
      .fromTo(".hero-buttons", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, "-=0.4")
      .fromTo(".hero-tech", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }, "-=0.2")

    // Parallax effect for background
    gsap.to(".hero-bg", {
      yPercent: -50,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    })
  })

  const [ripples, setRipples] = useState<any[]>([])
  const rippleContainerRef = useRef<HTMLDivElement>(null)

  const handleRipple = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = rippleContainerRef.current
    if (!container) return

    const rect = container.getBoundingClientRect()
    const size = rect.width
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const newRipple = (
      <span
        key={Date.now()}
        className="ripple"
        style={{
          left: x - size / 2,
          top: y - size / 2,
          width: size,
          height: size,
        }}
      />
    )

    setRipples((prev) => [...prev, newRipple])

    // Remove ripple after animation ends
    setTimeout(() => {
      setRipples((prev) => prev.slice(1))
    }, 900)
  }

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      ref={heroRef}
      onClick={handleRipple}
      className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden pt-14 cursor-pointer"
      id="hero"
    >
      {/* Water ripple container */}
      <div ref={rippleContainerRef} className="absolute inset-0 z-0 overflow-hidden">
        {ripples}
      </div>
      {/* Background Pattern */}
      <div className="hero-bg absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.1),transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_49%,rgba(0,0,0,0.01)_50%,transparent_51%)] bg-[length:60px_60px]" />
      </div>

      <div className="container mx-auto px-4 md:px-6 text-center relative mt-5 z-10 max-w-4xl">
        {/* Badge */}
        <div className="hero-badge inline-flex items-center space-x-2 glass rounded-full px-4 py-2 mb-8 text-sm font-medium border">
          <Sparkles className="w-4 h-4 text-foreground/60 text-yellow-400" />
          <span className="text-foreground/80">Zero Style Stress</span>
          <ArrowRight className="w-3 h-3 text-foreground/60" />
        </div>

        {/* Main Headline */}
        <h1 className="hero-title text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6 tracking-tight">
          Prebuilt UI{" "}
          <motion.span
            className="inline-block"
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 3,
            }}
          >
            ⚫
          </motion.span>{" "}
          blocks to ship
          <br />
          <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            beautiful MVPs fast
          </span>
        </h1>

        {/* Subheading */}
        <p className="hero-subtitle text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto mb-12 leading-relaxed">
          Copy-paste beautiful, responsive components without worrying about styling or animations. Build faster, launch
          sooner.
        </p>

        {/* CTA Buttons */}
        <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <MagneticButton
            size="lg"
            className="text-base px-8 py-3 h-12 font-medium"
            onClick={() => scrollToSection("#features")}
          >
            Get started
            <ArrowRight className="w-4 h-4 ml-2" />
          </MagneticButton>
          <HoverBorderGradient
        containerClassName="rounded-lg"
        as="button"
        className="dark:bg-black p-0 bg-white text-black dark:text-white flex items-center space-x-2"
      >
          <MagneticButton
            variant="ghost"
            size="sm"
            className="text-base px-8 py-3 h-12 font-medium glass"
            onClick={() => scrollToSection("#about")}
          >
            Learn more
            <ArrowRight className="w-4 h-4 ml-2" />
          </MagneticButton>
          </HoverBorderGradient>
        </div>

        {/* Tech Stack */}
        <div className="hero-tech flex flex-wrap justify-center items-center gap-6 text-sm text-foreground">
          <div className="flex flex-col">
          <span>Built with industry standards</span>
          <span className="text-foreground/60">open for contributions</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-foreground text-background rounded-lg flex items-center justify-center">
              <span className="text-xs font-bold">N</span>
            </div>
            <div className="w-8 h-8 border border-foreground rounded-lg flex items-center justify-center">
              <span className="text-xs font-bold">~</span>
            </div>
            <div className="w-8 h-8 bg-foreground text-background rounded-lg flex items-center justify-center">
              <span className="text-xs font-bold">M</span>
            </div>
          </div>
        </div>
        <div className="mt-10 w-full">
        <VelocityScroll
      className="px-6 text-center text-4xl font-bold tracking-tight md:text-7xl md:leading-[5rem]"
      text="Welcome to Monoblocks"
      default_velocity={5}
    />
      </div>
      </div>
    </section>
  )
}
