"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Header from "@/components/header"
import Loader from "@/components/loader"
import Hero from "@/components/hero"
import Features from "@/components/features"
import VideoSection from "@/components/video-section"
import TrendingBlocks from "@/components/trending-blocks"
import Stats from "@/components/stats"
import Testimonials from "@/components/testimonials"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { useLenis } from "@/hooks/use-lenis"
import Companies from "@/components/companies"
import Playground from "@/components/playground"
import CreativeShowcase from "@/components/creative-showcase"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useLenis()

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground transition-colors duration-500">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <Loader key="loader" onComplete={() => setIsLoading(false)} />
          ) : (
            <motion.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              <Header />
              <main>
                <Hero />
                <Features />
                <Companies />
                <VideoSection />
                <Playground />
                <CreativeShowcase />
                <TrendingBlocks />
                <Stats />
                <Testimonials />
              </main>
              <Footer />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ThemeProvider>
  )
}
