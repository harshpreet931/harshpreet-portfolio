"use client"

import { useEffect, useState, useCallback } from "react"
import Navigation from "@/components/navigation"
import Hero from "@/components/hero"
import Prologue from "@/components/prologue"
import Works from "@/components/works"
import Experience from "@/components/experience"
import Skills from "@/components/skills"
import Contact from "@/components/contact"

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  // Simplified scroll handler
  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY)
  }, [])

  // Custom cursor tracking
  const handleMouseMove = useCallback((e: MouseEvent) => {
    // Use requestAnimationFrame for smoother cursor movement
    requestAnimationFrame(() => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    })
    
    // Magnetic effect for particles - throttle this operation for better performance
    // Only process every 3rd mouse movement to reduce calculations
    if (e.timeStamp % 3 < 1) {
      const particles = document.querySelectorAll(".particle")
      particles.forEach((particle, index) => {
        const rect = particle.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const distance = Math.sqrt(Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2))

        if (distance < 100) {
          const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX)
          const force = (100 - distance) / 100
          const moveX = Math.cos(angle) * force * 10
          const moveY = Math.sin(angle) * force * 10
          ;(particle as HTMLElement).style.transform += ` translate(${moveX}px, ${moveY}px)`
        }
      })
    }
  }, [])

  const handleMouseDown = useCallback(() => {
    setIsClicking(true)
  }, [])

  const handleMouseUp = useCallback(() => {
    setIsClicking(false)
  }, [])

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false)
  }, [])

  useEffect(() => {
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    )

    // Observe all animated elements
    const animatedElements = document.querySelectorAll(".fade-up, .fade-in, .slide-in-left, .slide-in-right")
    animatedElements.forEach((el) => observer.observe(el))

    // Throttled scroll handler for performance
    let ticking = false
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    // Generate enhanced particles - reduced number for better performance
    const generateEnhancedParticles = () => {
      const particlesLayer = document.querySelector(".particles-layer")
      if (particlesLayer && particlesLayer.children.length === 0) {
        const particleCount = window.innerWidth < 768 ? 4 : 8  // Reduced count

        for (let i = 0; i < particleCount; i++) {
          const particle = document.createElement("div")
          particle.className = "particle"

          // Enhanced sizing with more variation
          const size = 4 + (i % 4) * 2 // 4px, 6px, 8px, 10px
          particle.style.width = `${size}px`
          particle.style.height = `${size}px`

          // Random positioning
          particle.style.left = `${Math.random() * 100}%`
          
          // Set initial position with random starting heights for variety
          const startHeight = 100 + Math.random() * 20  // Between 100vh and 120vh
          particle.style.top = `${startHeight}vh`

          // Staggered timing for liquid motion with more variety
          particle.style.animationDelay = `${(i * 6) + Math.random() * 3}s`  // Random delays

          particlesLayer.appendChild(particle)
        }
      }
    }

    // Only run client-side code in the browser
    if (typeof window !== 'undefined') {
      // Initialize enhanced particles
      generateEnhancedParticles()

      // Custom cursor events
      if (window.innerWidth > 768) {
        document.addEventListener("mousemove", handleMouseMove, { passive: true })
        document.addEventListener("mousedown", handleMouseDown)
        document.addEventListener("mouseup", handleMouseUp)

        // Add global click handler to reset states
        const globalClickHandler = () => {
          setTimeout(() => {
            setIsClicking(false)
          }, 100)
        }
        document.addEventListener("click", globalClickHandler)

        // Add hover listeners to interactive elements
        const interactiveElements = document.querySelectorAll("a, button, .glass-card, .nav-link, .nav-logo, .mobile-menu-btn")
        interactiveElements.forEach((el) => {
          el.addEventListener("mouseenter", handleMouseEnter)
          el.addEventListener("mouseleave", handleMouseLeave)
        })
        
        // Store cleanup function for global click handler
        window._globalClickHandler = globalClickHandler
      }
    }

    return () => {
      observer.disconnect()
      
      // Only run cleanup for client-side listeners
      if (typeof window !== 'undefined') {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mousedown", handleMouseDown)
        document.removeEventListener("mouseup", handleMouseUp)
        
        // Clean up global click handler
        if (window._globalClickHandler) {
          document.removeEventListener("click", window._globalClickHandler)
          delete window._globalClickHandler
        }
        
        // Clean up interactive element listeners
        const interactiveElements = document.querySelectorAll("a, button, .glass-card, .nav-link, .nav-logo, .mobile-menu-btn")
        interactiveElements.forEach((el) => {
          el.removeEventListener("mouseenter", handleMouseEnter)
          el.removeEventListener("mouseleave", handleMouseLeave)
        })
      }
    }
  }, [handleScroll, handleMouseMove, handleMouseDown, handleMouseUp, handleMouseEnter, handleMouseLeave])

  // Use a state to track if we're on client-side
  const [isMounted, setIsMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  
  // Handle client-side only operations
  useEffect(() => {
    setIsMounted(true);
    setIsDesktop(window.innerWidth > 768);
    
    // Apply custom cursor class only on desktop
    if (window.innerWidth > 768) {
      document.body.classList.add('custom-cursor-active');
    }
    
    const handleResize = () => {
      const isDesktopView = window.innerWidth > 768;
      setIsDesktop(isDesktopView);
      
      // Toggle cursor class based on viewport width
      if (isDesktopView) {
        document.body.classList.add('custom-cursor-active');
      } else {
        document.body.classList.remove('custom-cursor-active');
      }
    };

    const handleWindowFocus = () => {
      // Re-apply custom cursor when window regains focus
      if (window.innerWidth > 768) {
        document.body.classList.add('custom-cursor-active');
        // Reset cursor states
        setIsHovering(false);
        setIsClicking(false);
      }
    };

    const handleWindowBlur = () => {
      // Remove custom cursor when window loses focus to prevent conflicts
      document.body.classList.remove('custom-cursor-active');
      // Reset cursor states
      setIsHovering(false);
      setIsClicking(false);
    };

    const handleMouseEnterDocument = () => {
      // Re-apply custom cursor when mouse re-enters the document
      if (window.innerWidth > 768) {
        document.body.classList.add('custom-cursor-active');
        // Reset hover state when re-entering
        setIsHovering(false);
        setIsClicking(false);
      }
    };

    const handleMouseLeaveDocument = () => {
      // Remove custom cursor when mouse leaves the document
      document.body.classList.remove('custom-cursor-active');
      // Reset states when leaving
      setIsHovering(false);
      setIsClicking(false);
    };
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('focus', handleWindowFocus);
    window.addEventListener('blur', handleWindowBlur);
    document.addEventListener('mouseenter', handleMouseEnterDocument);
    document.addEventListener('mouseleave', handleMouseLeaveDocument);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('focus', handleWindowFocus);
      window.removeEventListener('blur', handleWindowBlur);
      document.removeEventListener('mouseenter', handleMouseEnterDocument);
      document.removeEventListener('mouseleave', handleMouseLeaveDocument);
      document.body.classList.remove('custom-cursor-active');
    };
  }, []);
  
  return (
    <div className="min-h-screen">
      {/* Custom Cursor - only rendered on client-side */}
      {isMounted && isDesktop && (
        <div
          className={`cursor ${isHovering ? "hover" : ""} ${isClicking ? "click" : ""}`}
          style={{
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px) translate(-50%, -50%)`,
          }}
        />
      )}

      {/* Enhanced Background System - reduced complexity for better performance */}
      <div className="animated-bg">
        {/* Ultra-smooth gradient layer */}
        <div className="gradient-layer"></div>

        {/* Liquid grid */}
        <div className="grid-layer"></div>

        {/* Magnetic particles */}
        <div className="particles-layer"></div>

        {/* Liquid orbs */}
        <div className="orbs-layer">
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
          <div className="orb orb-3"></div>
        </div>

        {/* Flowing lines with curves - reduced to 2 */}
        <div className="lines-layer">
          <div className="flowing-line"></div>
          <div className="flowing-line"></div>
        </div>

        {/* Liquid morphing blobs */}
        <div className="blobs-layer">
          <div className="morphing-blob blob-1"></div>
          <div className="morphing-blob blob-2"></div>
        </div>
      </div>

      <Navigation />

      <main role="main">
        <Hero />

        <div className="scroll-indicator">Scroll to explore</div>

        <section id="about" className="content-section">
          <div className="max-w-4xl mx-auto">
            <Prologue />
          </div>
        </section>

        <section id="projects" className="content-section">
          <div className="max-w-4xl mx-auto">
            <Works />
          </div>
        </section>

        <section id="experience" className="content-section">
          <div className="max-w-4xl mx-auto">
            <Experience />
          </div>
        </section>

        <section id="skills" className="content-section">
          <div className="max-w-4xl mx-auto">
            <Skills />
          </div>
        </section>

        <section id="contact" className="content-section">
          <div className="max-w-4xl mx-auto">
            <Contact />
          </div>
        </section>
      </main>
    </div>
  )
}
