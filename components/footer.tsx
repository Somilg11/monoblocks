"use client"

import { motion } from "framer-motion"
import { Github, Twitter, Linkedin, ArrowUpRight, Heart } from "lucide-react"
import MagneticButton from "./magnetic-button"
import { useGSAP } from "@/hooks/use-gsap"
import { gsap } from "gsap"

const footerLinks = {
  Product: [
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "Changelog", href: "#changelog" },
    { name: "Documentation", href: "#docs" },
  ],
  Company: [
    { name: "About", href: "#about" },
    { name: "Blog", href: "#blog" },
    { name: "Careers", href: "#careers" },
    { name: "Contact", href: "#contact" },
  ],
  Resources: [
    { name: "Community", href: "#community" },
    { name: "Help Center", href: "#help" },
    { name: "Partners", href: "#partners" },
    { name: "Status", href: "#status" },
  ],
  Legal: [
    { name: "Privacy", href: "#privacy" },
    { name: "Terms", href: "#terms" },
    { name: "Security", href: "#security" },
    { name: "Cookies", href: "#cookies" },
  ],
}

const socialLinks = [
  { icon: Github, href: "https://github.com/Somilg11", label: "GitHub" },
  { icon: Twitter, href: "https://x.com/somil_1101", label: "Twitter" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/somil-1101s/", label: "LinkedIn" },
]

export default function Footer() {
  const footerRef = useGSAP(() => {
    gsap.fromTo(
      ".footer-content",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".footer-section",
          start: "top 90%",
          end: "bottom 20%",
        },
      },
    )
  })

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <footer ref={footerRef} className="footer-section relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-muted/50 to-transparent" />

      <div className="relative border-t border-border/50">
        <div className="container mx-auto px-4 md:px-6 py-16">
          {/* Main Footer Content */}
          <div className="grid lg:grid-cols-6 gap-8 mb-12">
            {/* Brand Section */}
            <div className="footer-content lg:col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 bg-foreground rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 bg-background rounded-sm" />
                </div>
                <span className="text-xl font-bold tracking-tight">Monoblocks</span>
              </div>
              <p className="text-foreground/70 mb-8 max-w-sm leading-relaxed text-sm">
                Beautiful, responsive UI components for modern web applications. Build faster, launch sooner, scale
                better.
              </p>

              {/* Newsletter Signup */}
              <div className="glass rounded-xl p-4 border border-border/50 mb-6">
                <h4 className="font-semibold mb-3 text-sm">Stay updated</h4>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 bg-background/50 border border-border/50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20"
                  />
                  <MagneticButton size="sm" className="px-4 text-xs">
                    Subscribe
                  </MagneticButton>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 glass rounded-lg flex items-center justify-center hover:border-border transition-all duration-200 border border-border/30"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Links Sections */}
            {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
              <div key={category} className="footer-content">
                <h3 className="font-semibold mb-4 text-sm tracking-tight">{category}</h3>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.name}>
                      <button
                        onClick={() => scrollToSection(link.href)}
                        className="text-foreground/70 hover:text-foreground transition-colors text-sm flex items-center group"
                      >
                        {link.name}
                        <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Section */}
          <div className="footer-content border-t border-border/50 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center space-x-4 text-sm text-foreground/60">
                <span>© {new Date().getFullYear()} Monoblocks. All rights reserved.</span>
                <div className="flex items-center space-x-1">
                  <span>Made with</span>
                  <Heart className="w-3 h-3 text-red-500 fill-current" />
                  <span>for developers</span>
                </div>
              </div>

              <div className="flex items-center space-x-6 text-sm">
                <button
                  onClick={() => scrollToSection("#privacy")}
                  className="text-foreground/60 hover:text-foreground transition-colors"
                >
                  Privacy Policy
                </button>
                <button
                  onClick={() => scrollToSection("#terms")}
                  className="text-foreground/60 hover:text-foreground transition-colors"
                >
                  Terms of Service
                </button>
                <div className="flex items-center space-x-2 text-foreground/40">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs">All systems operational</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
