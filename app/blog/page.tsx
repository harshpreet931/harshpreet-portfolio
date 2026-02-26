"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { SwissClock } from "../../components/swiss-clock"
import CommandPalette from "../../components/command-palette"
import { AsciiClouds } from "../../components/ascii-clouds"

export default function Blog() {
  const [contentTab, setContentTab] = useState<"articles" | "videos">("articles")
  const [paletteOpen, setPaletteOpen] = useState(false)

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

  return (
    <div className="min-h-screen bg-background text-foreground relative selection:bg-accent selection:text-accent-foreground overflow-x-hidden">
      <AsciiClouds />

      <nav className="fixed top-0 left-0 w-full z-40 bg-background/80 backdrop-blur-xl border-b border-border px-6 py-4 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-4">
          <Link href="/" className="font-heading font-bold text-lg tracking-tighter hover:text-accent transition-colors">HS/{new Date().getFullYear().toString().slice(-2)}</Link>
          <div className="hidden md:block w-px h-4 bg-foreground/20"></div>
          <div className="hidden md:block">
            <SwissClock />
          </div>
        </div>
        <div className="flex gap-8 text-xs font-bold uppercase tracking-widest items-center">
          <Link href="/#work" className="hover:text-accent transition-colors hidden sm:block">Work</Link>
          <Link href="/#projects" className="hover:text-accent transition-colors hidden sm:block">Projects</Link>
          <Link href="/#connect" className="hover:text-accent transition-colors hidden sm:block">Connect</Link>
        </div>
      </nav>

      <main className="pt-32 px-6 sm:px-8 lg:px-12 max-w-[1600px] mx-auto relative z-10">
        <header className="min-h-[40vh] flex flex-col justify-end border-b border-border pb-12">
          <div className="grid lg:grid-cols-12 gap-4">
            <div className="lg:col-span-12">
              <h1 className="text-huge font-heading font-bold uppercase leading-[0.8] tracking-tighter mb-8">
                <div className="reveal-container">
                  <div className="reveal-text" style={{ animationDelay: "0.1s" }}>Writing</div>
                </div>
                <div className="reveal-container">
                  <div className="reveal-text text-foreground" style={{ animationDelay: "0.2s" }}>& Media</div>
                </div>
              </h1>
            </div>
          </div>
          
          <div className="grid lg:grid-cols-12 gap-4 items-end reveal-text" style={{ animationDelay: "0.4s" }}>
            <div className="lg:col-span-4">
               <div className="w-12 h-1 bg-accent mb-6"></div>
               <p className="text-lg font-medium leading-tight max-w-xs">
                Thoughts on software engineering,<br/>
                system design, and scaling.
               </p>
            </div>
          </div>
        </header>

        <div className="sticky top-[73px] z-30 bg-background/80 backdrop-blur-xl border-b border-border">
          <div className="flex">
            <button
              onClick={() => setContentTab("articles")}
              className={`flex-1 py-6 text-sm font-bold uppercase tracking-widest transition-colors ${
                contentTab === "articles" 
                  ? "bg-primary text-primary-foreground" 
                  : "hover:bg-secondary/50"
              }`}
            >
              Articles (4)
            </button>
            <div className="w-px bg-foreground"></div>
            <button
              onClick={() => setContentTab("videos")}
              className={`flex-1 py-6 text-sm font-bold uppercase tracking-widest transition-colors ${
                contentTab === "videos" 
                  ? "bg-foreground text-background" 
                  : "hover:bg-secondary/50"
              }`}
            >
              Videos (5)
            </button>
          </div>
        </div>

        <div className="min-h-[50vh]">
          {contentTab === "articles" && (
            <div className="space-y-0">
              {[
                {
                  title: "Master Trees: The Complete Guide to Crush Your Coding Interviews",
                  excerpt: "From basic traversals to complex dynamic programming solutions trees can be found everywhere.",
                  date: "2024-10-27",
                  readTime: "10 MIN",
                  url: "https://medium.com/@harshpreet0402/master-trees-the-complete-guide-to-crush-your-coding-interviews-binary-tree-bonus-interview-a362271544b4",
                  tags: ["DSA", "INTERVIEWS"]
                },
                {
                  title: "BACKTRACKING in 15 Minutes",
                  excerpt: "A comprehensive guide to understanding backtracking algorithms efficiently.",
                  date: "2024-08-27",
                  readTime: "15 MIN",
                  url: "https://medium.com/@harshpreet0402/backtracking-in-15-minutes-800de323e00f",
                  tags: ["ALGORITHMS"]
                },
                {
                  title: "The Hidden Genius of Event Based Concurrency",
                  excerpt: "Why threads aren't always the answer. Exploring event loops and async programming.",
                  date: "2024-07-28",
                  readTime: "09 MIN",
                  url: "https://medium.com/@harshpreet0402/the-hidden-genius-of-event-based-concurrency-3f2b81a0847e",
                  tags: ["SYSTEMS", "CONCURRENCY"]
                },
                {
                  title: "All the Operating System Concepts You Need to Know",
                  excerpt: "Crucial OS concepts explained simply for developers and students.",
                  date: "2024-02-28",
                  readTime: "33 MIN",
                  url: "https://medium.com/@harshpreet0402/all-the-operating-system-concepts-you-need-to-know-b697bfeb3f9f",
                  tags: ["OS", "CS FUNDAMENTALS"]
                },
              ].map((article, index) => (
                <a
                  key={index}
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block border-b border-foreground py-12 hover:bg-foreground hover:text-background transition-colors duration-300"
                >
                  <div className="grid lg:grid-cols-12 gap-8 items-baseline">
                    <div className="lg:col-span-2 font-mono text-sm text-muted-foreground group-hover:text-background/60 transition-colors">
                      0{index + 1}
                    </div>
                    <div className="lg:col-span-7">
                      <div className="flex items-center gap-4 mb-2 text-xs font-bold uppercase tracking-widest text-muted-foreground group-hover:text-accent transition-colors">
                        <span>{article.date}</span>
                        <span>•</span>
                        <span>{article.readTime}</span>
                      </div>
                      <h3 className="text-3xl font-heading font-bold uppercase mb-4 leading-tight group-hover:translate-x-2 transition-transform duration-300">
                        {article.title}
                      </h3>
                      <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl group-hover:text-background/80 transition-colors">
                        {article.excerpt}
                      </p>
                    </div>
                    <div className="lg:col-span-3 flex flex-wrap gap-2 justify-end content-start">
                      {article.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs font-mono border border-border text-muted-foreground group-hover:border-background group-hover:text-background transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}

          {contentTab === "videos" && (
            <div className="space-y-0">
              {[
                {
                  title: "Stateless vs Stateful Architecture at Scale",
                  excerpt: "Deep dive into stateless vs stateful systems and their implications for scaling.",
                  duration: "11:03",
                  url: "https://youtube.com/@ThatNotesGuy",
                  tags: ["SYSTEM DESIGN", "ARCHITECTURE"]
                },
                {
                  title: "Horizontal vs Vertical Scaling Explained",
                  excerpt: "Learn the difference between horizontal and vertical scaling with practical examples.",
                  duration: "11:46",
                  url: "https://youtube.com/@ThatNotesGuy",
                  tags: ["SCALABILITY"]
                },
                {
                  title: "Functional vs Non-Functional Requirements",
                  excerpt: "Understanding the critical difference between functional and non-functional requirements.",
                  duration: "07:23",
                  url: "https://youtube.com/@ThatNotesGuy",
                  tags: ["BASICS"]
                },
                {
                  title: "Monolith vs Microservices (Netflix & Uber)",
                  excerpt: "Real-world examples of when to use monolithic architecture vs microservices.",
                  duration: "09:27",
                  url: "https://youtube.com/@ThatNotesGuy",
                  tags: ["MICROSERVICES"]
                },
                {
                  title: "Why Your Code Breaks at Scale",
                  excerpt: "The secret blueprint to understanding why code that works locally breaks at scale.",
                  duration: "11:37",
                  url: "https://youtube.com/@ThatNotesGuy",
                  tags: ["DEBUGGING"]
                },
              ].map((video, index) => (
                <a
                  key={index}
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block border-b border-foreground py-12 hover:bg-foreground hover:text-background transition-colors duration-300"
                >
                  <div className="grid lg:grid-cols-12 gap-8 items-baseline">
                    <div className="lg:col-span-2 font-mono text-sm text-muted-foreground group-hover:text-background/60 transition-colors">
                      0{index + 1}
                    </div>
                    <div className="lg:col-span-7">
                      <div className="flex items-center gap-4 mb-2 text-xs font-bold uppercase tracking-widest text-muted-foreground group-hover:text-accent transition-colors">
                        <span>{video.duration}</span>
                        <span>•</span>
                        <span>VIDEO</span>
                      </div>
                      <h3 className="text-3xl font-heading font-bold uppercase mb-4 leading-tight group-hover:translate-x-2 transition-transform duration-300">
                        {video.title}
                      </h3>
                      <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl group-hover:text-background/80 transition-colors">
                        {video.excerpt}
                      </p>
                    </div>
                    <div className="lg:col-span-3 flex flex-wrap gap-2 justify-end content-start">
                      {video.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs font-mono border border-border text-muted-foreground group-hover:border-background group-hover:text-background transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>

        <footer className="py-24 border-t border-foreground mt-0">
          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-3">
              <h2 className="text-sm font-bold uppercase tracking-widest text-accent flex items-center gap-2">
                <span className="w-2 h-2 bg-accent rounded-full"></span>
                Connect
              </h2>
            </div>
            <div className="lg:col-span-9">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
                {[
                  { name: "LinkedIn", url: "https://www.linkedin.com/in/harshpreet931/" },
                  { name: "GitHub", url: "https://github.com/harshpreet931" },
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
        </footer>
      </main>

      <CommandPalette
        open={paletteOpen}
        onOpenChange={setPaletteOpen}
        items={[
          { id: "home", label: "HOME", onSelect: () => window.location.href = "/" },
          { id: "articles", label: "ARTICLES", onSelect: () => setContentTab("articles") },
          { id: "videos", label: "VIDEOS", onSelect: () => setContentTab("videos") },
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
