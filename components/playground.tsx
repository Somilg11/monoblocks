"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useGSAP } from "@/hooks/use-gsap"
import { gsap } from "gsap"
import { Draggable } from "gsap/Draggable"
import { Code, Sparkles, RotateCcw } from "lucide-react"
import MagneticButton from "./magnetic-button"

if (typeof window !== "undefined") {
  gsap.registerPlugin(Draggable)
}

const playgroundItems = [
  { id: 1, icon: "🎨", label: "Design", color: "bg-foreground text-background" },
  { id: 2, icon: "⚡", label: "Speed", color: "bg-background text-foreground border border-border" },
  { id: 3, icon: "🚀", label: "Deploy", color: "bg-foreground text-background" },
  { id: 4, icon: "💎", label: "Quality", color: "bg-background text-foreground border border-border" },
]

export default function Playground() {
  const [droppedItems, setDroppedItems] = useState<any[]>([])
  const [draggedItem, setDraggedItem] = useState<any>(null)
  const playgroundRef = useRef<HTMLDivElement>(null)

  const containerRef = useGSAP(() => {
    gsap.fromTo(
      ".playground-title",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".playground-section",
          start: "top 80%",
          end: "bottom 20%",
        },
      },
    )

    gsap.fromTo(
      ".playground-item",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".playground-grid",
          start: "top 80%",
          end: "bottom 20%",
        },
      },
    )

    // Matrix effect animation
    gsap.to(".matrix-char", {
      opacity: 0.3,
      duration: 0.1,
      stagger: {
        amount: 2,
        repeat: -1,
        yoyo: true,
      },
    })
  })

  const handleDragStart = (item: any) => {
    setDraggedItem(item)
  }

  const handleDragEnd = () => {
    setDraggedItem(null)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    if (draggedItem) {
      const rect = e.currentTarget.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      setDroppedItems((prev) => [
        ...prev,
        {
          ...draggedItem,
          x: x - 40,
          y: y - 40,
          id: Date.now(),
        },
      ])
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const resetPlayground = () => {
    setDroppedItems([])
    gsap.fromTo(
      ".drop-zone",
      { scale: 1.1, rotation: 5 },
      { scale: 1, rotation: 0, duration: 0.5, ease: "back.out(1.7)" },
    )
  }

  return (
    <section ref={containerRef} className="playground-section py-20 md:py-28 bg-muted border-t border-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="playground-title text-3xl md:text-5xl font-bold mb-4 tracking-tight">
            Interactive Playground
          </h2>
          <p className="playground-title text-lg text-foreground max-w-2xl mx-auto">
            Drag and drop elements to see our components in action. Experience the magic of interactive design.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Draggable Items */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-6">Drag these elements</h3>
            <div className="playground-grid grid grid-cols-2 gap-4">
              {playgroundItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  className={`playground-item draggable ${item.color} rounded-xl p-6 cursor-grab active:cursor-grabbing select-none`}
                  draggable
                  onDragStart={() => handleDragStart(item)}
                  onDragEnd={handleDragEnd}
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="text-center">
                    <div className="text-3xl mb-2">{item.icon}</div>
                    <div className="font-medium">{item.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Code Preview */}
            <div className="matrix bg-card border border-border rounded-xl p-6 font-mono text-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Code className="w-4 h-4" />
                  <span className="font-semibold">Live Code</span>
                </div>
                <div className="flex space-x-1">
                  <div className="w-3 h-3 bg-foreground rounded-full"></div>
                  <div className="w-3 h-3 bg-foreground rounded-full"></div>
                  <div className="w-3 h-3 bg-foreground rounded-full"></div>
                </div>
              </div>
              <div className="space-y-2 text-foreground">
                <div>
                  <span className="matrix-char">const</span> <span className="matrix-char">magic</span> ={" "}
                  <span className="matrix-char">{`{`}</span>
                </div>
                <div className="pl-4">
                  <span className="matrix-char">interactive:</span> <span className="matrix-char">true</span>,
                </div>
                <div className="pl-4">
                  <span className="matrix-char">responsive:</span> <span className="matrix-char">true</span>,
                </div>
                <div className="pl-4">
                  <span className="matrix-char">beautiful:</span> <span className="matrix-char">true</span>
                </div>
                <div>
                  <span className="matrix-char">{`}`}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Drop Zone */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Drop zone</h3>
              <MagneticButton variant="outline" size="sm" onClick={resetPlayground}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </MagneticButton>
            </div>

            <div
              ref={playgroundRef}
              className="drop-zone relative h-96 border-2 border-dashed border-border rounded-xl bg-card/50 flex items-center justify-center transition-all duration-300"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragEnter={(e) => {
                e.currentTarget.classList.add("drag-over")
              }}
              onDragLeave={(e) => {
                e.currentTarget.classList.remove("drag-over")
              }}
            >
              {droppedItems.length === 0 ? (
                <div className="text-center">
                  <Sparkles className="w-12 h-12 mx-auto mb-4 text-foreground/50" />
                  <p className="text-foreground/70">Drop elements here to see the magic</p>
                </div>
              ) : null}

              <AnimatePresence>
                {droppedItems.map((item) => (
                  <motion.div
                    key={item.id}
                    className={`absolute ${item.color} rounded-lg p-4 cursor-pointer select-none`}
                    style={{ left: item.x, top: item.y }}
                    initial={{ scale: 0, rotate: 180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: -180 }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    drag
                    dragMomentum={false}
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-1">{item.icon}</div>
                      <div className="text-xs font-medium">{item.label}</div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-card border border-border rounded-lg">
                <div className="text-2xl font-bold">{droppedItems.length}</div>
                <div className="text-sm text-foreground">Dropped</div>
              </div>
              <div className="text-center p-4 bg-card border border-border rounded-lg">
                <div className="text-2xl font-bold">∞</div>
                <div className="text-sm text-foreground">Possibilities</div>
              </div>
              <div className="text-center p-4 bg-card border border-border rounded-lg">
                <div className="text-2xl font-bold">100%</div>
                <div className="text-sm text-foreground">Interactive</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
