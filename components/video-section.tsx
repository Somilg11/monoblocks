"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Play } from "lucide-react"

export default function VideoSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-24 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-foreground/5 to-foreground/10 border border-border"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1 }}
        >
          {/* Video Container */}
          <div className="relative aspect-video bg-foreground/5">
            {/* Placeholder for video */}
            <div className="absolute inset-0 bg-gradient-to-br from-foreground/10 to-foreground/5" />

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_49%,rgba(255,255,255,0.1)_50%,transparent_51%)] bg-[length:40px_40px]" />
            </div>

            {/* Play Button */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <motion.button
                className="w-20 h-20 bg-foreground/90 rounded-full flex items-center justify-center text-background hover:bg-foreground transition-colors group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  boxShadow: ["0 0 0 0 rgba(255, 255, 255, 0.4)", "0 0 0 20px rgba(255, 255, 255, 0)"],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: 1,
                }}
              >
                <Play className="w-8 h-8 ml-1 group-hover:scale-110 transition-transform" fill="currentColor" />
              </motion.button>
            </motion.div>

            {/* Overlay Text */}
            <motion.div
              className="absolute bottom-8 left-8 right-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">See Monoblocks in Action</h3>
              <p className="text-white/80 text-lg">Watch how easy it is to build beautiful interfaces</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
