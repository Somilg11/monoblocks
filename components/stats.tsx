"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const stats = [
  { label: "Components", value: 150, suffix: "+" },
  { label: "Downloads", value: 50000, suffix: "+" },
  { label: "Developers", value: 10000, suffix: "+" },
  { label: "Countries", value: 80, suffix: "+" },
]

const chartData = [
  { name: "Jan", value: 2800 },
  { name: "Feb", value: 2700 },
  { name: "Mar", value: 4400 },
  { name: "Apr", value: 2100 },
  { name: "May", value: 1400 },
  { name: "Jun", value: 2900 },
  { name: "Jul", value: 5000 },
  { name: "Aug", value: 2600 },
  { name: "Sep", value: 3200 },
  { name: "Oct", value: 1800 },
  { name: "Nov", value: 1700 },
  { name: "Dec", value: 1500 },
]

function AnimatedCounter({ value, duration = 2000 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)

      setCount(Math.floor(progress * value))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [isInView, value, duration])

  return <span ref={ref}>{count.toLocaleString()}</span>
}

export default function Stats() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-24 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Trusted by developers</h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Join thousands of developers who are building faster with Monoblocks
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <div className="text-3xl md:text-4xl font-bold mb-2">
                <AnimatedCounter value={stat.value} />
                {stat.suffix}
              </div>
              <div className="text-foreground/70">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <Card className="w-full shadow-xl">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Overview</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="name" stroke="hsl(var(--foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(var(--foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                  <Tooltip cursor={{ fill: "transparent" }} formatter={(v) => `$${v}`} contentStyle={{ backgroundColor: "hsl(var(--background))", borderColor: "hsl(var(--border))" }} />
                  <Bar dataKey="value" fill="#c8f560" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}