"use client"

import { motion } from "framer-motion"
import { useEffect } from "react"

interface LoaderProps {
  onComplete: () => void
}

export default function Loader({ onComplete }: LoaderProps) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2000)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="relative w-full h-full overflow-hidden">
        {/* Left Panel */}
        <motion.div
          className="absolute top-0 left-0 w-1/2 h-full bg-black border-r border-white/20"
          initial={{ x: 0 }}
          animate={{ x: "-100%" }}
          transition={{
            duration: 1.5,
            delay: 0.5,
            ease: [0.76, 0, 0.24, 1],
          }}
        />

        {/* Right Panel */}
        <motion.div
          className="absolute top-0 right-0 w-1/2 h-full bg-black border-l border-white/20"
          initial={{ x: 0 }}
          animate={{ x: "100%" }}
          transition={{
            duration: 1.5,
            delay: 0.5,
            ease: [0.76, 0, 0.24, 1],
          }}
        />

        {/* Logo/Text */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 1.5 }}
        >
          <div className="text-center">
            <motion.h1
              className="text-4xl md:text-6xl font-bold text-white mb-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Monoblocks
            </motion.h1>
            <motion.div
              className="w-16 h-0.5 bg-white mx-auto"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  )
}
