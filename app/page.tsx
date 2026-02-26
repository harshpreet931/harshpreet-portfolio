"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import CommandPalette from "../components/command-palette"
import { SwissClock } from "../components/swiss-clock"
import { RollingText } from "../components/rolling-text"

export default function Home() {
  const [isDark, setIsDark] = useState(true)
  const [paletteOpen, setPaletteOpen] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark)
  }, [isDark])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const isMac = navigator.userAgent.toUpperCase().includes("MAC")
      if ((isMac ? e.metaKey : e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setPaletteOpen((v) => !v)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative selection:bg-accent selection:text-accent-foreground">
      <nav className="fixed top-0 left-0 w-full z-40 bg-background/95 backdrop-blur-sm border-b border-border px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="font-heading font-bold text-lg tracking-tight text-foreground">Harshpreet Singh</div>
          <div className="hidden md:block w-px h-4 bg-border"></div>
          <div className="hidden md:block">
            <SwissClock />
          </div>
        </div>
        <div className="flex gap-8 text-xs font-medium uppercase tracking-wide items-center">
          <Link href="#work" className="text-muted-foreground hover:text-foreground transition-colors hidden sm:block">Work</Link>
          <Link href="#projects" className="text-muted-foreground hover:text-foreground transition-colors hidden sm:block">Projects</Link>
          <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors hidden sm:block">Blog</Link>
          <Link href="#connect" className="text-muted-foreground hover:text-foreground transition-colors hidden sm:block">Connect</Link>
          <button 
            onClick={toggleTheme} 
            className="text-muted-foreground hover:text-foreground transition-colors font-mono text-xs uppercase tracking-wide"
            aria-label="Toggle theme"
          >
            {isDark ? "Light" : "Dark"}
          </button>
        </div>
      </nav>

      <main className="pt-32 px-6 sm:px-8 lg:px-12 max-w-[1600px] mx-auto">
        <header className="min-h-[60vh] flex flex-col justify-between border-b border-border pb-16">
          <div>
            <h1 className="text-huge font-heading font-bold leading-[0.95] tracking-tight mb-6 text-foreground">
              <div className="reveal-container">
                <div className="reveal-text" style={{ animationDelay: "0.1s" }}>
                  <RollingText text="Harshpreet" />
                </div>
              </div>
              <div className="reveal-container">
                <div className="reveal-text" style={{ animationDelay: "0.2s" }}>
                  <RollingText text="Singh" />
                </div>
              </div>
            </h1>
            
            <div className="reveal-text max-w-2xl" style={{ animationDelay: "0.3s" }}>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Software Development Engineer specializing in agentic AI systems. Currently building at Juspay, exploring the intersection of intelligent automation and practical product design.
              </p>
            </div>
          </div>
          
          <div className="grid lg:grid-cols-12 gap-8 items-end reveal-text" style={{ animationDelay: "0.4s" }}>
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 bg-secondary/50 px-4 py-2 rounded-sm mb-6">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span className="text-xs font-medium text-foreground">Currently</span>
              </div>
              <div className="text-xl font-semibold text-foreground mb-2">SDE Intern @ Juspay</div>
              <div className="text-sm text-muted-foreground">Bengaluru, India</div>
            </div>

            <div className="lg:col-span-6 text-right">
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">Available for</div>
              <div className="flex flex-wrap gap-2 justify-end">
                <span className="text-sm px-3 py-1 bg-secondary/50 text-foreground rounded-sm">AI Systems</span>
                <span className="text-sm px-3 py-1 bg-secondary/50 text-foreground rounded-sm">Full Stack</span>
                <span className="text-sm px-3 py-1 bg-secondary/50 text-foreground rounded-sm">Consulting</span>
              </div>
            </div>
          </div>
        </header>

        <section id="work" className="py-20 border-b border-border">
          <div className="mb-16">
            <h2 className="text-sm font-bold uppercase tracking-wide text-foreground flex items-center gap-2 mb-12">
              <span className="w-1 h-1 bg-accent rounded-full"></span>
              Experience
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                year: "2025 — Present",
                role: "SDE Intern",
                company: "Juspay",
                desc: "Designed Agentic AutoRCA for automated root cause analysis. Built Juspay Agentic Framework to enable rapid agent development.",
                tags: ["AI", "Python", "MCP"]
              },
              {
                year: "2024",
                role: "Internship Trainee",
                company: "SCL (Govt. of India)",
                desc: "Developed ARIMA-based forecasting for predicting claims and financial requirements. Worked on data analytics and ML pipelines.",
                tags: ["ML", "ARIMA", "Python"]
              }
            ].map((job, i) => (
              <div key={i} className="group border border-border bg-white rounded-sm p-6 hover:bg-secondary/50 transition-all duration-300">
                <div className="grid lg:grid-cols-12 gap-6 mb-4">
                  <div className="lg:col-span-2 font-mono text-sm text-muted-foreground">{job.year}</div>
                  <div className="lg:col-span-10">
                    <h3 className="text-lg font-semibold text-foreground mb-1">{job.role}</h3>
                    <div className="text-base text-accent font-medium">{job.company}</div>
                  </div>
                </div>
                <p className="text-base text-muted-foreground leading-relaxed mb-4">{job.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {job.tags.map(t => (
                    <span key={t} className="text-xs font-medium bg-secondary text-foreground px-2 py-1 rounded-sm">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="projects" className="py-20 border-b border-border">
          <div className="mb-16">
            <h2 className="text-sm font-bold uppercase tracking-wide text-foreground flex items-center gap-2">
              <span className="w-1 h-1 bg-accent rounded-full"></span>
              Selected Works
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: "Agent Spotlight",
                desc: "Cross-platform desktop AI agent built with Rust and Tauri. MCP integration.",
                tech: "Rust / Tauri"
              },
              {
                title: "Let's Help Everyone",
                desc: "Platform for CSE students. 200k+ views. Community driven.",
                tech: "TypeScript / Postgres"
              },
              {
                title: "Spam Classifier",
                desc: "Lightweight Naive Bayes spam classifier implemented entirely in C.",
                tech: "C / ML"
              }
            ].map((project, i) => (
              <div key={i} className="bg-white border border-border rounded-sm p-6 h-full hover:shadow-md hover:border-accent transition-all duration-300 flex flex-col justify-between group">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="font-mono text-xs text-muted-foreground font-medium">0{i+1}</span>
                    <span className="font-mono text-xs text-accent font-medium">{project.tech}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3 leading-snug">{project.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{project.desc}</p>
                </div>
                <div className="mt-6 flex items-center text-accent group-hover:translate-x-2 transition-transform font-medium text-sm">
                  View Project
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2">
                    <path d="M3 13L13 3M13 3H3M13 3V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="border-b border-foreground py-8 overflow-hidden bg-foreground text-background">
          <div className="marquee-container">
            <div className="marquee-content text-4xl font-heading font-bold uppercase tracking-tight">
              {["PYTHON", "TYPESCRIPT", "RUST", "JAVA", "AI AGENTS", "MACHINE LEARNING", "SYSTEM DESIGN", "NEXT.JS", "POSTGRESQL"].map((tech, i) => (
                <span key={i} className="whitespace-nowrap">
                  {tech}<span className="text-accent mx-6">•</span>
                </span>
              ))}
            </div>
            <div className="marquee-content text-4xl font-heading font-bold uppercase tracking-tight" aria-hidden="true">
              {["PYTHON", "TYPESCRIPT", "RUST", "JAVA", "AI AGENTS", "MACHINE LEARNING", "SYSTEM DESIGN", "NEXT.JS", "POSTGRESQL"].map((tech, i) => (
                <span key={i} className="whitespace-nowrap">
                  {tech}<span className="text-accent mx-6">•</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        <section id="connect" className="py-20 border-t border-border">
          <div className="grid lg:grid-cols-12 gap-12 mb-16">
            <div className="lg:col-span-3">
              <h2 className="text-sm font-bold uppercase tracking-wide text-foreground flex items-center gap-2">
                <span className="w-1 h-1 bg-accent rounded-full"></span>
                Contact
              </h2>
            </div>
            <div className="lg:col-span-9">
              <a href="mailto:harshpreet.singh.0402@gmail.com" className="block text-2xl sm:text-4xl font-semibold text-foreground hover:text-accent transition-colors mb-8 leading-snug">
                Let's talk about building something great together.
              </a>
              <a href="mailto:harshpreet.singh.0402@gmail.com" className="text-base font-medium text-accent hover:underline inline-flex items-center gap-2 group">
                harshpreet.singh.0402@gmail.com
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          </div>
          
          <div className="border-t border-border pt-12">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
              {[
                { name: "LinkedIn", url: "https://www.linkedin.com/in/harshpreet931/" },
                { name: "GitHub", url: "https://github.com/harshpreet931" },
                { name: "LeetCode", url: "https://leetcode.com/u/harshpreet931/" },
                { name: "Medium", url: "https://medium.com/@harshpreet0402" },
                { name: "YouTube", url: "https://youtube.com/@ThatNotesGuy" }
              ].map((link) => (
                <a 
                  key={link.name} 
                  href={link.url} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-foreground hover:text-accent transition-colors flex items-center gap-1 group"
                >
                  {link.name}
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs">↗</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <CommandPalette
        open={paletteOpen}
        onOpenChange={setPaletteOpen}
        items={[
          { id: "home", label: "HOME", onSelect: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
          { id: "work", label: "WORK", onSelect: () => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' }) },
          { id: "projects", label: "PROJECTS", onSelect: () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) },
          { id: "blog", label: "BLOG", onSelect: () => window.location.href = "/blog" },
        ]}
      />
      
      <div className="fixed bottom-8 right-8 z-50">
        <button 
          onClick={() => setPaletteOpen(true)}
          className="bg-white text-foreground px-4 py-2 font-medium uppercase tracking-wide hover:bg-accent hover:text-white transition-all border border-border rounded-sm shadow-sm"
        >
          Menu (⌘K)
        </button>
      </div>
    </div>
  )
}
