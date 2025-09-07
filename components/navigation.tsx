"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Link from "next/link"

// Map navigation labels to their corresponding section IDs
const navLinks = [
  { label: "About", id: "about" },
  { label: "Projects", id: "projects" },
  { label: "Experience", id: "experience" },
  { label: "Skills", id: "skills" },
  { label: "Contact", id: "contact" }
]

export default function Navigation() {
  const [activeSection, setActiveSection] = useState("")
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)
  const lastScrollY = useRef(0)
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null)

  const handleScroll = useCallback(() => {
    // Don't update active section during programmatic scrolling
    if (isScrolling) return
    
    const currentScrollY = window.scrollY
    
    // Only update if scroll position changed significantly
    if (Math.abs(currentScrollY - lastScrollY.current) > 5) {
      const scrollPosition = currentScrollY + 200
      const sections = navLinks.map((link) => document.getElementById(link.id)).filter(Boolean)

      // Update active section
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navLinks[i].id)
          break
        }
      }

      // Update scroll state for nav styling
      setIsScrolled(currentScrollY > 100)
      lastScrollY.current = currentScrollY
    }
  }, [isScrolling])

  useEffect(() => {
    let ticking = false
    
    const optimizedScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", optimizedScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", optimizedScroll)
  }, [handleScroll])

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id
          if (sectionId && sectionId !== activeSection) {
            setActiveSection(sectionId)
          }
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)
    
    const sections = ["about", "projects", "experience", "skills", "contact"]
    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [activeSection])

  useEffect(() => {
    return () => {
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }
    }
  }, [])

  const smoothScrollTo = useCallback((targetY: number, duration: number = 1000) => {
    setIsScrolling(true)
    
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current)
    }

    const startY = window.pageYOffset
    const distance = targetY - startY
    const startTime = performance.now()

    // Ultra-smooth easing function
    const easeInOutQuart = (t: number): number => {
      return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t
    }

    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easeProgress = easeInOutQuart(progress)
      
      window.scrollTo(0, startY + distance * easeProgress)
      
      if (progress < 1) {
        requestAnimationFrame(animateScroll)
      } else {
        // Mark scrolling as complete after a short delay
        scrollTimeout.current = setTimeout(() => {
          setIsScrolling(false)
        }, 100)
      }
    }

    requestAnimationFrame(animateScroll)
  }, [])

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      // Immediately set active section for instant feedback
      setActiveSection(sectionId)
      
      const rect = element.getBoundingClientRect()
      const offsetTop = window.pageYOffset + rect.top - 90
      
      smoothScrollTo(offsetTop, 1000)
    }
    setIsMobileMenuOpen(false)
  }, [smoothScrollTo])

  return (
    <>
      <nav className={`modern-nav ${isScrolled ? "scrolled" : ""}`}>
        <div className="nav-container">
          <button onClick={() => smoothScrollTo(0, 800)} className="nav-logo">
            HARSHPREET SINGH
          </button>

          {/* Desktop Navigation */}
          <ul className="nav-links">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id
              return (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className={`nav-link ${isActive ? "active" : ""}`}
                  >
                    {link.label}
                  </button>
                </li>
              )
            })}
            <li>
              <Link href="/blog" className="nav-link">
                Blog
              </Link>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="fixed inset-0 bg-black bg-opacity-90 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed top-0 right-0 h-full w-64 bg-black border-l border-white border-opacity-20 p-8">
            <div className="flex flex-col gap-6 mt-16">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id
                return (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className={`nav-link mobile-nav-link text-left ${isActive ? "active" : ""}`}
                  >
                    {link.label}
                  </button>
                )
              })}
              <Link 
                href="/blog" 
                className="nav-link mobile-nav-link text-left"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Blog
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
