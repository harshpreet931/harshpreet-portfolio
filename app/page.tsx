"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Sun, Moon } from "lucide-react"
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
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.02] hidden lg:grid grid-cols-12 gap-4 px-6 sm:px-8 lg:px-12 max-w-[1600px] mx-auto">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="h-full border-x border-foreground"></div>
        ))}
      </div>

      <nav className="fixed top-0 left-0 w-full z-40 bg-background/90 backdrop-blur-sm border-b border-foreground px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="font-heading font-bold text-lg tracking-tighter">HS/{new Date().getFullYear().toString().slice(-2)}</div>
          <div className="hidden md:block w-px h-4 bg-foreground/20"></div>
          <div className="hidden md:block">
            <SwissClock />
          </div>
        </div>
        <div className="flex gap-8 text-xs font-bold uppercase tracking-widest items-center">
          <Link href="#work" className="hover:text-accent transition-colors hidden sm:block">Work</Link>
          <Link href="#projects" className="hover:text-accent transition-colors hidden sm:block">Projects</Link>
          <Link href="/blog" className="hover:text-accent transition-colors hidden sm:block">Blog</Link>
          <Link href="#connect" className="hover:text-accent transition-colors hidden sm:block">Connect</Link>
          <button 
            onClick={toggleTheme} 
            className="hover:text-accent transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      <main className="pt-32 px-6 sm:px-8 lg:px-12 max-w-[1600px] mx-auto">
        <header className="min-h-[70vh] flex flex-col justify-between border-b border-foreground pb-12">
          <div className="grid lg:grid-cols-12 gap-4">
            <div className="lg:col-span-12">
              <h1 className="text-huge font-heading font-bold uppercase leading-[0.8] tracking-tighter mb-8">
                <div className="reveal-container">
                  <div className="reveal-text" style={{ animationDelay: "0.1s" }}>
                    <RollingText text="Harshpreet" />
                  </div>
                </div>
                <div className="reveal-container">
                  <div className="reveal-text text-foreground" style={{ animationDelay: "0.2s" }}>
                    <RollingText text="Singh" />
                  </div>
                </div>
              </h1>
            </div>
          </div>
          
          <div className="grid lg:grid-cols-12 gap-4 items-end reveal-text" style={{ animationDelay: "0.4s" }}>
            <div className="lg:col-span-4">
               <div className="w-12 h-1 bg-accent mb-6"></div>
               <p className="text-lg font-medium leading-tight max-w-xs">
                Software Development Engineer.<br/>
                Building agentic AI systems.
               </p>
            </div>

            <div className="hidden lg:flex lg:col-span-4 justify-center items-center opacity-20">
              <div className="relative w-24 h-24 animate-[spin_10s_linear_infinite]">
                <div className="absolute top-1/2 left-0 w-full h-1 bg-foreground -translate-y-1/2"></div>
                <div className="absolute left-1/2 top-0 h-full w-1 bg-foreground -translate-x-1/2"></div>
              </div>
            </div>

            <div className="lg:col-span-4 text-right">
              <div className="font-mono text-xs text-muted-foreground mb-2">CURRENTLY</div>
              <div className="text-xl font-bold uppercase">SDE Intern @ Juspay</div>
              <div className="text-sm text-muted-foreground mt-1">Bengaluru, India</div>
            </div>
          </div>
        </header>

        <section id="work" className="py-24 border-b border-foreground">
          <div className="grid lg:grid-cols-12 gap-8 mb-16">
            <div className="lg:col-span-3">
              <h2 className="text-sm font-bold uppercase tracking-widest text-accent flex items-center gap-2">
                <span className="w-2 h-2 bg-accent rounded-full"></span>
                Experience
              </h2>
            </div>
          </div>

          <div className="space-y-0">
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
              <div key={i} className="group border-t border-foreground py-12 px-6 hover:bg-foreground hover:text-background transition-colors duration-300">
                <div className="grid lg:grid-cols-12 gap-8">
                  <div className="lg:col-span-3 font-mono text-sm text-muted-foreground pt-1 group-hover:text-background/60 transition-colors">{job.year}</div>
                  <div className="lg:col-span-4">
                    <h3 className="text-2xl font-heading font-bold uppercase mb-1">{job.role}</h3>
                    <div className="text-lg">{job.company}</div>
                  </div>
                  <div className="lg:col-span-5">
                    <p className="text-lg text-muted-foreground leading-relaxed mb-4 group-hover:text-background/80 transition-colors">{job.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {job.tags.map(t => (
                        <span key={t} className="text-xs font-mono border border-border px-2 py-1 text-muted-foreground group-hover:border-background group-hover:text-background transition-colors">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="projects" className="py-24 border-b border-foreground">
          <div className="grid lg:grid-cols-12 gap-8 mb-16">
            <div className="lg:col-span-3">
               <h2 className="text-sm font-bold uppercase tracking-widest text-accent flex items-center gap-2">
                <span className="w-2 h-2 bg-accent rounded-full"></span>
                Selected Works
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-foreground border border-foreground">
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
              <div key={i} className="bg-background p-8 h-full hover:bg-foreground hover:text-background transition-colors duration-300 flex flex-col justify-between gap-12 group">
                <div>
                  <div className="flex justify-between items-start mb-8">
                    <span className="font-mono text-xs text-muted-foreground group-hover:text-background/60 transition-colors">0{i+1}</span>
                    <span className="font-mono text-xs text-muted-foreground group-hover:text-accent transition-colors">{project.tech}</span>
                  </div>
                  <h3 className="text-3xl font-heading font-bold uppercase mb-4 leading-none">{project.title}</h3>
                  <p className="text-base text-muted-foreground leading-relaxed group-hover:text-background/80 transition-colors">{project.desc}</p>
                </div>
                <div className="w-8 h-8 border border-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all group-hover:border-background">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 11L11 1M11 1H1M11 1V11" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="connect" className="py-24">
          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-3">
              <h2 className="text-sm font-bold uppercase tracking-widest text-accent flex items-center gap-2">
                <span className="w-2 h-2 bg-accent rounded-full"></span>
                Contact
              </h2>
            </div>
            <div className="lg:col-span-9">
              <a href="mailto:harshpreet.singh.0402@gmail.com" className="block text-4xl sm:text-6xl font-heading font-bold uppercase hover:text-accent transition-colors mb-16 leading-none">
                harshpreet.singh<br/>.0402@gmail.com
              </a>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 border-t border-foreground pt-8">
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
                    className="text-sm font-bold uppercase tracking-widest hover:text-accent transition-colors flex items-center gap-2 group"
                  >
                    {link.name}
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                  </a>
                ))}
              </div>
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
          className="bg-background text-foreground px-4 py-2 font-bold uppercase tracking-widest hover:bg-accent hover:text-accent-foreground transition-colors border border-foreground shadow-sm"
        >
          Menu (⌘K)
        </button>
      </div>
    </div>
  )
}
