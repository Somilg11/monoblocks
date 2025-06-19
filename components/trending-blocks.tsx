"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Sparkles } from "lucide-react"

const trendingBlocks = [
  {
    title: "Card Carousel",
    description: "Seamless images carousel animation.",
    preview: (
      <div className="flex space-x-2 overflow-hidden">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="w-16 h-20 bg-gradient-to-br from-foreground/20 to-foreground/5 rounded-lg flex-shrink-0 border border-border"
          />
        ))}
      </div>
    ),
  },
  {
    title: "Stats Counter",
    description: "Animated number counters with smooth transitions.",
    preview: (
      <div className="text-center">
        <div className="text-2xl font-bold mb-1">1,234</div>
        <div className="text-xs text-foreground/60">Active Users</div>
      </div>
    ),
  },
  {
    title: "Feature Grid",
    description: "Responsive grid layout with hover effects.",
    preview: (
      <div className="grid grid-cols-2 gap-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="w-6 h-6 bg-foreground/10 rounded border border-border" />
        ))}
      </div>
    ),
  },
]

export default function TrendingBlocks() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-24 md:py-32" id="showcase">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Trending blocks</h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Discover the most popular blocks used by our community and get inspired to build your own.
          </p>
        </motion.div>

        {/* Featured Block */}
        <motion.div
          className="bg-card border border-border rounded-3xl p-8 md:p-12 mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex items-center mb-6">
            <Sparkles className="w-5 h-5 mr-2 text-foreground/60" />
            <span className="text-sm font-medium text-foreground/80">Latest component</span>
          </div>

          <h3 className="text-2xl md:text-3xl font-bold mb-4">Card Carousel</h3>
          <p className="text-foreground/70 mb-8 text-lg">Seamless images carousel animation.</p>

          {/* Carousel Preview */}
          <div className="bg-foreground/5 rounded-2xl p-8 border border-border">
            <div className="flex space-x-4 overflow-hidden">
              {[1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  className="w-32 h-40 bg-gradient-to-br from-foreground/20 to-foreground/5 rounded-xl flex-shrink-0 border border-border"
                  initial={{ x: 100, opacity: 0 }}
                  animate={isInView ? { x: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.4 + i * 0.1 }}
                  whileHover={{ y: -5 }}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Trending Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {trendingBlocks.map((block, index) => (
            <motion.div
              key={block.title}
              className="bg-card border border-border rounded-2xl p-6 hover:border-foreground/20 transition-all duration-300 group"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="mb-4">{block.preview}</div>
              <h4 className="font-semibold mb-2">{block.title}</h4>
              <p className="text-sm text-foreground/70">{block.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
