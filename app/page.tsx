"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import CommandPalette from "../components/command-palette"
import CopyEmailButton from "../components/copy-email-button"

export default function Home() {
  const [isDark, setIsDark] = useState(true)
  const [activeSection, setActiveSection] = useState("")
  const sectionsRef = useRef<(HTMLElement | null)[]>([])
  const [paletteOpen, setPaletteOpen] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark)
  }, [isDark])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3, rootMargin: "0px 0px -20% 0px" },
    )

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().includes("MAC")
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
    <div className="min-h-screen bg-background text-foreground relative">
      <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-10 hidden md:block">
        <div className="flex flex-col gap-3">
          {[
            { id: "intro", label: "Intro" },
            { id: "work", label: "Work" },
            { id: "thoughts", label: "Projects" },
            { id: "connect", label: "Connect" }
          ].map((section) => (
            <div key={section.id} className="relative group">
              {/* Enhanced aurora glow with multiple layers */}
              {activeSection === section.id && (
                <>
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 rounded-xl blur-md animate-pulse"></div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400/20 via-violet-500/20 to-fuchsia-500/20 rounded-lg blur-sm animate-pulse delay-300"></div>
                </>
              )}
              
              <button
                onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth" })}
                className={`relative w-2 h-8 rounded-full transition-all duration-700 ease-out transform ${
                  activeSection === section.id 
                    ? "bg-gradient-to-b from-blue-400 via-purple-400 to-pink-400 shadow-2xl scale-110 shadow-purple-500/50" 
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/60 hover:shadow-lg hover:scale-105 hover:shadow-blue-500/20"
                }`}
                aria-label={`Navigate to ${section.label}`}
              >
                {/* Enhanced active indicator with shimmer */}
                {activeSection === section.id && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-400 via-purple-400 to-pink-400 rounded-full animate-pulse opacity-70"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-transparent rounded-full animate-shimmer"></div>
                  </>
                )}
                
                {/* Ripple effect on click */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/0 via-purple-400/0 to-pink-400/0 group-active:from-blue-400/30 group-active:via-purple-400/30 group-active:to-pink-400/30 transition-all duration-300 animate-ping opacity-0 group-active:opacity-100"></div>
              </button>
              
              {/* Enhanced tooltip with smooth entrance */}
              <div className="absolute left-12 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out transform translate-x-2 group-hover:translate-x-0 pointer-events-none z-50">
                <div className="bg-background/95 backdrop-blur-md border border-border/50 rounded-lg px-3 py-2 text-xs text-foreground whitespace-nowrap shadow-xl shadow-black/20 min-w-max">
                  <div className="relative">
                    {section.label}
                    {/* Tooltip arrow */}
                    <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-background/95 border-l border-b border-border/50 rotate-45 backdrop-blur-md"></div>
                  </div>
                </div>
              </div>
              
              {/* Connecting line animation */}
              {activeSection === section.id && (
                <div className="absolute left-4 top-1/2 w-8 h-px bg-gradient-to-r from-purple-400/60 to-transparent animate-pulse"></div>
              )}
            </div>
          ))}
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16">
        <header
          id="intro"
          ref={(el) => { sectionsRef.current[0] = el }}
          className="min-h-screen flex items-center opacity-0"
        >
          <div className="grid lg:grid-cols-5 gap-12 sm:gap-16 w-full">
            <div className="lg:col-span-3 space-y-6 sm:space-y-8">
              <div className="space-y-3 sm:space-y-2">
                <div className="text-sm text-muted-foreground font-mono tracking-wider">PORTFOLIO / 2025</div>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight">
                  Harshpreet
                  <br />
                  <span className="text-muted-foreground">Singh</span>
                </h1>
              </div>

              <div className="space-y-6 max-w-md">
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  SDE Intern building production grade agentic AI systems, developer tooling, and data driven solutions
                  with a focus on reliability and performance.
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 text-sm text-muted-foreground">
                  <div>Bengaluru, India</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 flex flex-col justify-end space-y-6 sm:space-y-8 mt-8 lg:mt-0">
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground font-mono">CURRENTLY</div>
                <div className="space-y-2">
                  <div className="text-foreground">SDE Intern</div>
                  <div className="text-muted-foreground">@ Juspay</div>
                  <div className="text-xs text-muted-foreground">2025 — Present</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-sm text-muted-foreground font-mono">FOCUS</div>
                <div className="flex flex-wrap gap-2">
                  {["Python", "Java", "C", "TypeScript", "Rust"].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-xs border border-border rounded-full hover:border-muted-foreground/50 transition-colors duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </header>

        <section
          id="work"
          ref={(el) => { sectionsRef.current[1] = el }}
          className="min-h-screen py-20 sm:py-32 opacity-0"
        >
          <div className="space-y-12 sm:space-y-16">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <h2 className="text-3xl sm:text-4xl font-light">Experience</h2>
              <div className="text-sm text-muted-foreground font-mono">2024 — 2025</div>
            </div>

            {(() => {
              const jobs = [
                {
                  year: "2025",
                  role: "SDE Intern",
                  company: "Juspay",
                  description:
                    "Designed and deployed Agentic AutoRCA for automated root cause analysis; built the Juspay Agentic Framework to enable rapid agent development; led cross-team integrations with Xyne using MCP for observability and collaboration.",
                  tech: ["Agentic AI", "MCP", "Xyne"],
                },
                {
                  year: "2024",
                  role: "Internship Trainee",
                  company: "SCL (MeitY, Govt. of India)",
                  description:
                    "Worked on data analytics and ML; developed ARIMA-based forecasting for predicting claims and financial requirements.",
                  tech: ["ARIMA", "ML", "Python"],
                },
              ]

              return (
                <div className="space-y-8 sm:space-y-12">
                  {jobs.map((job, index) => (
                    <div
                      key={index}
                      className="group grid lg:grid-cols-12 gap-4 sm:gap-8 py-6 sm:py-8 border-b border-border/50 hover:border-border transition-colors duration-500"
                    >
                      <div className="lg:col-span-2">
                        <div className="text-xl sm:text-2xl font-light text-muted-foreground group-hover:text-foreground transition-colors duration-500">
                          {job.year}
                        </div>
                      </div>

                      <div className="lg:col-span-6 space-y-3">
                        <div>
                          <h3 className="text-lg sm:text-xl font-medium">{job.role}</h3>
                          <div className="text-muted-foreground">{job.company}</div>
                        </div>
                        <p className="text-muted-foreground leading-relaxed max-w-lg">{job.description}</p>
                      </div>

                      <div className="lg:col-span-4 flex flex-wrap gap-2 lg:justify-end mt-2 lg:mt-0">
                        {job.tech.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 text-xs text-muted-foreground rounded group-hover:border-muted-foreground/50 transition-colors duration-500"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )
            })()}
          </div>
        </section>

        <section
          id="thoughts"
          ref={(el) => { sectionsRef.current[2] = el }}
          className="min-h-screen py-20 sm:py-32 opacity-0"
        >
          <div className="space-y-12 sm:space-y-16">
            <h2 className="text-3xl sm:text-4xl font-light">Projects</h2>

            <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
              {[
                {
                  title: "Let’s Help Everyone",
                  excerpt:
                    "Comprehensive platform for CSE students to access study materials; 200,000+ views and 15+ contributors (May–Sep 2025).",
                  date: "2025",
                  readTime: "TypeScript • Postgres",
                },
                {
                  title: "Spam Email Classification",
                  excerpt:
                    "Lightweight Naive Bayes spam classifier implemented entirely in C; achieved high accuracy for spam detection.",
                  date: "2024",
                  readTime: "C • Naive Bayes",
                },
                {
                  title: "Agent Spotlight",
                  excerpt:
                    "Cross-platform desktop AI agent built with Rust and Tauri. Features MCP integration for local tools/APIs, global hotkeys, real-time status monitoring, and extensible custom MCP server architecture.",
                  date: "2025",
                  readTime: "Rust • Tauri • MCP • React",
                },
              ].map((post, index) => (
                <article
                  key={index}
                  className="group p-6 sm:p-8 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-500 hover:shadow-lg cursor-pointer"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-medium group-hover:text-muted-foreground transition-colors duration-300">
                      {post.title}
                    </h3>

                    <p className="text-muted-foreground leading-relaxed">{post.excerpt}</p>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                      <span>Read more</span>
                      <svg
                        className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="connect" ref={(el) => { sectionsRef.current[3] = el }} className="py-20 sm:py-32 opacity-0">
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16">
            <div className="space-y-6 sm:space-y-8">
              <h2 className="text-3xl sm:text-4xl font-light">Let's Connect</h2>

              <div className="space-y-6">
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  Always interested in new opportunities, collaborations, and conversations about technology and design.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <span className="text-base sm:text-lg font-mono">harshpreet.singh.0402@gmail.com</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6 sm:space-y-8">
              <div className="text-sm text-muted-foreground font-mono">ELSEWHERE</div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: "LinkedIn", handle: "View profile", url: "https://www.linkedin.com/in/harshpreet931/" },
                  { name: "GitHub", handle: "View repositories", url: "https://github.com/harshpreet931" },
                  { name: "LeetCode", handle: "View stats", url: "https://leetcode.com/u/harshpreet931/" },
                ].map((social) => (
                  <Link
                    key={social.name}
                    href={social.url}
                    aria-label={`${social.name} - ${social.handle}`}
                    title={`${social.name} — ${social.handle}`}
                    className="group p-4 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300 hover:shadow-sm"
                  >
                    <div className="space-y-2">
                      <div className="text-foreground group-hover:text-muted-foreground transition-colors duration-300">
                        {social.name}
                      </div>
                      <div className="text-sm text-muted-foreground">{social.handle}</div>
                    </div>
                  </Link>
                ))}

                {/* Email card: split actions for accessibility */}
                <div
                  className="group p-4 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300 hover:shadow-sm"
                  aria-label="Email actions"
                  title="Email actions"
                >
                  <div className="space-y-2">
                    <div className="text-foreground group-hover:text-muted-foreground transition-colors duration-300">
                      Email
                    </div>
                    <div className="text-sm text-muted-foreground">Send email</div>
                    <div className="mt-2 flex items-center gap-3">
                      <Link
                        href={`mailto:harshpreet.singh.0402@gmail.com?subject=${encodeURIComponent(
                          "Hello Harshpreet",
                        )}&body=${encodeURIComponent("Hi Harshpreet,\n\n")}`}
                        className="rounded-md border border-border px-2.5 py-1.5 text-xs text-foreground/90 hover:text-foreground hover:border-muted-foreground/50 transition-colors"
                        aria-label="Compose new email"
                        title="Compose new email"
                      >
                        Compose
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="fixed bottom-6 right-6 z-40">
          <button
            onClick={() => setPaletteOpen(true)}
            className="flex items-center gap-2 rounded-lg border border-border bg-card/80 px-3 py-2 text-sm backdrop-blur hover:border-muted-foreground/50"
            aria-label="Open command palette"
            title="Open Command Palette"
          >
            <span className="text-muted-foreground">Jump anywhere</span>
            <span className="hidden sm:inline-flex items-center gap-1 text-xs text-muted-foreground">
              <kbd className="rounded border border-border px-1.5 py-0.5">⌘</kbd>
              <kbd className="rounded border border-border px-1.5 py-0.5">K</kbd>
            </span>
          </button>
        </div>

        <footer className="py-12 sm:py-16 border-t border-border">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 sm:gap-8">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Made with ❤️ by Harshpreet Singh.</div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="group p-3 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <svg
                    className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </footer>
      </main>

      <CommandPalette
        open={paletteOpen}
        onOpenChange={setPaletteOpen}
        items={[
          {
            id: "go-intro",
            label: "Go to Intro",
            sub: "Jump to the top section",
            onSelect: () => document.getElementById("intro")?.scrollIntoView({ behavior: "smooth" }),
          },
          {
            id: "go-experience",
            label: "Go to Experience",
            sub: "Work experience",
            onSelect: () => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" }),
          },
          {
            id: "go-projects",
            label: "Go to Projects",
            sub: "Selected projects",
            onSelect: () => document.getElementById("thoughts")?.scrollIntoView({ behavior: "smooth" }),
          },
          {
            id: "go-connect",
            label: "Go to Connect",
            sub: "Contact and links",
            onSelect: () => document.getElementById("connect")?.scrollIntoView({ behavior: "smooth" }),
          },
          {
            id: "open-email",
            label: "Email: harshpreet.singh.0402@gmail.com",
            sub: "Compose a new email",
            onSelect: () => (window.location.href = "mailto:harshpreet.singh.0402@gmail.com"),
          },
          { id: "open-linkedin", label: "LinkedIn", sub: "Open profile", onSelect: () => window.open("#", "_blank") },
          { id: "open-github", label: "GitHub", sub: "View repositories", onSelect: () => window.open("#", "_blank") },
          { id: "open-leetcode", label: "LeetCode", sub: "View stats", onSelect: () => window.open("#", "_blank") },
        ]}
      />

      <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none"></div>
    </div>
  )
}
