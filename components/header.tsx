"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Github, Menu, X } from "lucide-react"
import MagneticButton from "./magnetic-button"
import ThemeToggle from "./theme-toggle"
import { useGSAP } from "@/hooks/use-gsap"
import { gsap } from "gsap"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const headerRef = useGSAP(() => {
    gsap.fromTo(
      ".nav-item",
      { y: -20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        delay: 2.5,
        ease: "power2.out",
      },
    )
  })

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Docs", href: "#docs" },
    { name: "About", href: "#about" },
    { name: "Features", href: "#features" },
    { name: "Showcase", href: "#showcase" },
  ]

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  return (
    <motion.header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? "glass border-b border-border/50 backdrop-blur-lg" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, delay: 2.5 }}
    >
      <div className="container mx-auto px-4 lg:px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          className="nav-item flex items-center space-x-2 cursor-pointer"
          onClick={() => scrollToSection("#hero")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="w-8 h-8 bg-foreground rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 bg-background rounded-sm" />
                </div>
          <span className="text-lg font-semibold tracking-tight">Monoblocks</span>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item, index) => (
            <button
              key={item.name}
              onClick={() => scrollToSection(item.href)}
              className="nav-item px-3 py-2 text-sm font-medium hover:text-foreground/80 transition-colors rounded-lg hover:bg-muted/50"
            >
              {item.name}
            </button>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-3">
          <div className="nav-item">
            <ThemeToggle />
          </div>
          <div className="nav-item">
            <MagneticButton
              size="sm"
              className="hidden md:flex text-xs px-4 py-2"
              onClick={() => window.open("https://github.com/Somilg11/monoblocks", "_blank")}
            >
              <Github className="w-3 h-3 mr-2" />
              Github
            </MagneticButton>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="nav-item md:hidden p-2 hover:bg-muted/50 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        className="md:hidden glass backdrop-blur-lg border-t border-border/50"
        initial={false}
        animate={{ height: isMenuOpen ? "auto" : 0 }}
        transition={{ duration: 0.3 }}
        style={{ overflow: "hidden" }}
      >
        <div className="px-4 py-4">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => scrollToSection(item.href)}
              className="block w-full text-left py-2 text-sm font-medium hover:text-foreground/80 transition-colors"
            >
              {item.name}
            </button>
          ))}
          <MagneticButton
            size="sm"
            className="mt-4 w-full text-xs"
            onClick={() => window.open("https://github.com/Somilg11/monoblocks", "_blank")}
          >
            <Github className="w-3 h-3 mr-2" />
            Github
          </MagneticButton>
        </div>
      </motion.div>
    </motion.header>
  )
}
