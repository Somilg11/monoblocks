"use client"

import type React from "react"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"

interface InteractiveCardProps {
  children: React.ReactNode
  className?: string
  glowEffect?: boolean
}

export default function InteractiveCard({ children, className = "", glowEffect = false }: InteractiveCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!cardRef.current) return

    const card = cardRef.current
    const glow = glowRef.current

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = (y - centerY) / 10
      const rotateY = (centerX - x) / 10

      gsap.to(card, {
        rotationX: rotateX,
        rotationY: rotateY,
        transformPerspective: 1000,
        duration: 0.3,
        ease: "power2.out",
      })

      if (glow && glowEffect) {
        gsap.to(glow, {
          x: x - 100,
          y: y - 100,
          opacity: 0.3,
          duration: 0.3,
          ease: "power2.out",
        })
      }
    }

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.5,
        ease: "power2.out",
      })

      if (glow && glowEffect) {
        gsap.to(glow, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
        })
      }
    }

    card.addEventListener("mousemove", handleMouseMove)
    card.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      card.removeEventListener("mousemove", handleMouseMove)
      card.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [glowEffect])

  return (
    <motion.div
      ref={cardRef}
      className={`relative ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {glowEffect && (
        <div
          ref={glowRef}
          className="absolute w-48 h-48 bg-gradient-radial from-white/20 to-transparent rounded-full pointer-events-none opacity-0"
          style={{ transform: "translate(-50%, -50%)" }}
        />
      )}
      {children}
    </motion.div>
  )
}
