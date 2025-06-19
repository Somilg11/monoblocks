"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useMotionValue, useTransform } from "framer-motion"
import { useGSAP } from "@/hooks/use-gsap"
import { gsap } from "gsap"
import { Eye, MousePointer, Layers, Zap } from "lucide-react"

export default function CreativeShowcase() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-300, 300], [30, -30])
  const rotateY = useTransform(x, [-300, 300], [-30, 30])

  const showcaseRef = useGSAP(() => {
    gsap.fromTo(
      ".showcase-title",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".showcase-section",
          start: "top 80%",
          end: "bottom 20%",
        },
      },
    )

    // Floating animation for cards
    gsap.to(".float-card", {
      y: -10,
      duration: 2,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1,
      stagger: 0.3,
    })

    // Pulse animation for interactive elements
    gsap.to(".pulse-element", {
      scale: 1.05,
      duration: 1.5,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1,
      stagger: 0.2,
    })
  })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        setMousePosition({
          x: e.clientX - centerX,
          y: e.clientY - centerY,
        })
        x.set(e.clientX - centerX)
        y.set(e.clientY - centerY)
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [x, y])

  const features = [
    {
      icon: Eye,
      title: "3D Perspective",
      description: "Mouse-following 3D transformations",
    },
    {
      icon: MousePointer,
      title: "Magnetic Interactions",
      description: "Elements that respond to cursor",
    },
    {
      icon: Layers,
      title: "Layered Animations",
      description: "Complex multi-layer effects",
    },
    {
      icon: Zap,
      title: "Performance First",
      description: "Smooth 60fps animations",
    },
  ]

  return (
    <section ref={showcaseRef} className="showcase-section py-20 md:py-28 border-t border-border overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="showcase-title text-3xl md:text-5xl font-bold mb-4 tracking-tight">Advanced Frontend Magic</h2>
          <p className="showcase-title text-lg text-foreground max-w-2xl mx-auto">
            Experience cutting-edge web technologies with smooth animations and interactive elements.
          </p>
        </div>

        <div
          ref={containerRef}
          className="relative"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* 3D Perspective Container */}
          <motion.div
            className="relative perspective-1000"
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }}
          >
            {/* Main Interactive Card */}
            <motion.div
              className="relative bg-card border border-border rounded-2xl p-8 mb-12"
              whileHover={{ scale: 1.02 }}
              style={{
                transform: `translateZ(50px)`,
              }}
            >
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Interactive 3D Elements</h3>
                  <p className="text-foreground mb-6">
                    Move your mouse around to see the 3D perspective effect. Our components respond to user interactions
                    in real-time.
                  </p>
                  <div className="flex items-center space-x-4">
                    <div className="pulse-element w-4 h-4 bg-foreground rounded-full"></div>
                    <span className="text-sm">
                      Mouse Position: X: {Math.round(mousePosition.x)}, Y: {Math.round(mousePosition.y)}
                    </span>
                  </div>
                </div>

                <div className="relative">
                  <motion.div
                    className="float-card bg-foreground text-background rounded-xl p-6 transform-gpu"
                    style={{
                      transform: `translateZ(100px) rotateY(${mousePosition.x * 0.1}deg)`,
                    }}
                  >
                    <div className="text-center">
                      <div className="text-4xl mb-2">🎯</div>
                      <div className="font-semibold">Target Locked</div>
                    </div>
                  </motion.div>

                  {/* Floating particles */}
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-foreground rounded-full"
                      style={{
                        left: `${20 + i * 15}%`,
                        top: `${10 + (i % 2) * 80}%`,
                        transform: `translateZ(${20 + i * 10}px)`,
                      }}
                      animate={{
                        y: [-10, 10, -10],
                        opacity: [0.3, 1, 0.3],
                      }}
                      transition={{
                        duration: 2 + i * 0.5,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Feature Grid */}
            <div className="grid md:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="float-card bg-card border border-border rounded-xl p-6 text-center"
                  style={{
                    transform: `translateZ(${30 + index * 10}px)`,
                  }}
                  whileHover={{
                    scale: 1.05,
                    rotateY: 10,
                    rotateX: 5,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <feature.icon className="w-8 h-8 mx-auto mb-4" />
                  <h4 className="font-semibold mb-2">{feature.title}</h4>
                  <p className="text-sm text-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Mouse Follower */}
          <motion.div
            className="fixed pointer-events-none z-50 w-6 h-6 border-2 border-foreground rounded-full"
            animate={{
              x: mousePosition.x - 12,
              y: mousePosition.y - 12,
              scale: isHovering ? 1.5 : 1,
            }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            style={{
              left: "50%",
              top: "50%",
            }}
          />
        </div>

        {/* Performance Metrics */}
        <div className="mt-16 grid grid-cols-3 gap-6 text-center">
          <div className="pulse-element">
            <div className="text-3xl font-bold">60</div>
            <div className="text-sm text-foreground">FPS</div>
          </div>
          <div className="pulse-element">
            <div className="text-3xl font-bold">0.1</div>
            <div className="text-sm text-foreground">MS Delay</div>
          </div>
          <div className="pulse-element">
            <div className="text-3xl font-bold">∞</div>
            <div className="text-sm text-foreground">Smooth</div>
          </div>
        </div>
      </div>
    </section>
  )
}
