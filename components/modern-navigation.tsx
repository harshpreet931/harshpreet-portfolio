"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Link from "next/link"

export default function ModernNavigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const lastScrollY = useRef(0)

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY
    
    if (Math.abs(currentScrollY - lastScrollY.current) > 5) {
      setIsScrolled(currentScrollY > 50)
      lastScrollY.current = currentScrollY
    }
  }, [])

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
    
    const sections = ["home", "about", "projects", "contact"]
    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [activeSection])

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  const smoothScrollTo = useCallback((elementId: string) => {
    const element = document.getElementById(elementId)
    if (element) {
      const rect = element.getBoundingClientRect()
      const offsetTop = window.pageYOffset + rect.top - 80
      
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth"
      })
    }
  }, [])

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault()
    setActiveSection(sectionId)
    smoothScrollTo(sectionId)
  }, [smoothScrollTo])

  return (
    <nav className={`modern-nav ${isScrolled ? "scrolled" : ""}`}>
      <div className="nav-container">
        <button onClick={scrollToTop} className="nav-logo">
          HARSHPREET
        </button>

        <ul className="nav-links">
          <li>
            <a 
              href="#home" 
              className={`nav-link ${activeSection === "home" ? "active" : ""}`}
              onClick={(e) => handleNavClick(e, "home")}
            >
              Home
            </a>
          </li>
          <li>
            <a 
              href="#about" 
              className={`nav-link ${activeSection === "about" ? "active" : ""}`}
              onClick={(e) => handleNavClick(e, "about")}
            >
              About
            </a>
          </li>
          <li>
            <a 
              href="#projects" 
              className={`nav-link ${activeSection === "projects" ? "active" : ""}`}
              onClick={(e) => handleNavClick(e, "projects")}
            >
              Projects
            </a>
          </li>
          <li>
            <Link href="/blog" className="nav-link">
              Blog
            </Link>
          </li>
          <li>
            <a 
              href="#contact" 
              className={`nav-link ${activeSection === "contact" ? "active" : ""}`}
              onClick={(e) => handleNavClick(e, "contact")}
            >
              Contact
            </a>
          </li>
        </ul>

        <button className="mobile-menu-btn">☰</button>
      </div>
    </nav>
  )
}
