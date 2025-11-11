"use client"

import Link from "next/link"
import { useState, useEffect } from "react"

export default function Blog() {
  const [contentTab, setContentTab] = useState<"articles" | "videos">("articles")
  const [isLoaded, setIsLoaded] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)

  // Set dark mode on mount and trigger animations
  useEffect(() => {
    document.documentElement.classList.add("dark")
    // Trigger fade-in animation after mount
    setTimeout(() => setIsLoaded(true), 100)
  }, [])

  // Handle scroll-to-top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Add structured data for SEO
  useEffect(() => {
    // Remove any existing structured data
    const existingScript = document.getElementById('blog-structured-data')
    if (existingScript) {
      existingScript.remove()
    }

    // Add new structured data
    const script = document.createElement('script')
    script.id = 'blog-structured-data'
    script.type = 'application/ld+json'
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "Harshpreet Singh's Blog",
      "description": "Technical articles and video content on AI, system design, and software engineering",
      "url": "https://harshpreet.com/blog",
      "author": {
        "@type": "Person",
        "name": "Harshpreet Singh",
        "url": "https://harshpreet.com",
        "jobTitle": "SDE Intern @ Juspay",
        "worksFor": {
          "@type": "Organization",
          "name": "Juspay"
        }
      },
      "blogPost": [
        {
          "@type": "BlogPosting",
          "headline": "Master Trees: The Complete Guide to Crush Your Coding Interviews",
          "description": "From basic traversals to complex dynamic programming solutions trees can be found everywhere, yes even in your interviews.",
          "datePublished": "2024-10-27",
          "author": {
            "@type": "Person",
            "name": "Harshpreet Singh"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Medium"
          },
          "url": "https://medium.com/@harshpreet0402/master-trees-the-complete-guide-to-crush-your-coding-interviews-binary-tree-bonus-interview-a362271544b4"
        },
        {
          "@type": "BlogPosting",
          "headline": "BACKTRACKING in 15 Minutes",
          "description": "This is a ppt I made for the class I never got to present, but I felt it was worthwhile sharing :)!",
          "datePublished": "2024-08-27",
          "author": {
            "@type": "Person",
            "name": "Harshpreet Singh"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Medium"
          },
          "url": "https://medium.com/@harshpreet0402/backtracking-in-15-minutes-800de323e00f"
        },
        {
          "@type": "BlogPosting",
          "headline": "The Hidden Genius of Event Based Concurrency",
          "description": "In the world of concurrent programming, threads are king. We are taught to spin up threads to handle multiple tasks at once...",
          "datePublished": "2024-07-28",
          "author": {
            "@type": "Person",
            "name": "Harshpreet Singh"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Medium"
          },
          "url": "https://medium.com/@harshpreet0402/the-hidden-genius-of-event-based-concurrency-3f2b81a0847e"
        },
        {
          "@type": "BlogPosting",
          "headline": "All the Operating System Concepts You Need to Know",
          "description": "This article gives you all the information you need to know about Operating Systems and the crucial concepts on them.",
          "datePublished": "2024-02-28",
          "author": {
            "@type": "Person",
            "name": "Harshpreet Singh"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Medium"
          },
          "url": "https://medium.com/@harshpreet0402/all-the-operating-system-concepts-you-need-to-know-b697bfeb3f9f"
        }
      ],
      "video": [
        {
          "@type": "VideoObject",
          "name": "Understanding Stateless vs Stateful Architecture Matters at Scale",
          "description": "Why Architecture Matters at Scale - Deep dive into stateless vs stateful systems and their implications.",
          "thumbnailUrl": "https://i.ytimg.com/vi/placeholder/maxresdefault.jpg",
          "uploadDate": "2024-01-01",
          "duration": "PT11M3S",
          "contentUrl": "https://youtube.com/@ThatNotesGuy"
        },
        {
          "@type": "VideoObject",
          "name": "Horizontal vs Vertical Scaling Explained with Real Examples",
          "description": "System Design fundamentals: Learn the difference between horizontal and vertical scaling with practical examples.",
          "thumbnailUrl": "https://i.ytimg.com/vi/placeholder/maxresdefault.jpg",
          "uploadDate": "2024-01-01",
          "duration": "PT11M46S",
          "contentUrl": "https://youtube.com/@ThatNotesGuy"
        }
      ]
    })
    document.head.appendChild(script)

    // Update meta tags
    document.title = "Blog - Harshpreet Singh | Technical Articles & Videos"

    const updateMetaTag = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement
      if (!meta) {
        meta = document.createElement('meta')
        meta.setAttribute('property', property)
        document.head.appendChild(meta)
      }
      meta.content = content
    }

    const updateNameMetaTag = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement
      if (!meta) {
        meta = document.createElement('meta')
        meta.setAttribute('name', name)
        document.head.appendChild(meta)
      }
      meta.content = content
    }

    // Open Graph tags
    updateMetaTag('og:title', 'Blog - Harshpreet Singh | Technical Articles & Videos')
    updateMetaTag('og:description', 'Technical articles on AI, system design, data structures, and software engineering. Plus video tutorials on system design fundamentals.')
    updateMetaTag('og:type', 'website')
    updateMetaTag('og:url', 'https://harshpreet.com/blog')
    updateMetaTag('og:site_name', 'Harshpreet Singh Portfolio')

    // Twitter Card tags
    updateNameMetaTag('twitter:card', 'summary_large_image')
    updateNameMetaTag('twitter:title', 'Blog - Harshpreet Singh | Technical Articles & Videos')
    updateNameMetaTag('twitter:description', 'Technical articles on AI, system design, data structures, and software engineering. Plus video tutorials on system design fundamentals.')

    // Standard meta tags
    updateNameMetaTag('description', 'Technical articles on AI, system design, data structures, and software engineering. Plus video tutorials on system design fundamentals.')
    updateNameMetaTag('keywords', 'software engineering, system design, AI, machine learning, data structures, algorithms, coding interviews, tutorials, harshpreet singh, backtracking, trees, concurrency, operating systems')
    updateNameMetaTag('author', 'Harshpreet Singh')

    return () => {
      const scriptToRemove = document.getElementById('blog-structured-data')
      if (scriptToRemove) {
        scriptToRemove.remove()
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Subtle grain texture overlay */}
      <div className="fixed inset-0 opacity-[0.015] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]"></div>

      {/* Header */}
      <header className={`border-b border-border/50 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-16 py-12 sm:py-16">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-pink-400 transition-all duration-300 mb-12 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded"
          >
            <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-mono tracking-wide">Back</span>
          </Link>

          <div className="space-y-6 max-w-3xl">
            <div className="space-y-2">
              <div className="text-xs font-mono text-muted-foreground tracking-widest uppercase">Writing & Videos</div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight">
                Content
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Thoughts on software engineering, system design, and building products that scale.
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={`max-w-6xl mx-auto px-6 sm:px-8 lg:px-16 py-16 sm:py-20 transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        {/* Tab Navigation */}
        <div className="flex items-center gap-8 border-b border-border/30 mb-16">
          <button
            onClick={() => setContentTab("articles")}
            className={`group pb-4 text-sm font-mono tracking-wide transition-all duration-300 relative focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded ${
              contentTab === "articles"
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
            aria-label="View articles"
          >
            <span className="relative z-10">Articles</span>
            <span className="ml-2 text-xs opacity-60">(4)</span>
            {contentTab === "articles" && (
              <>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-red-400 via-pink-400 to-rose-400"></div>
                <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-red-500/20 via-pink-500/20 to-rose-500/20 blur-sm"></div>
              </>
            )}
          </button>
          <button
            onClick={() => setContentTab("videos")}
            className={`group pb-4 text-sm font-mono tracking-wide transition-all duration-300 relative focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded ${
              contentTab === "videos"
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
            aria-label="View videos"
          >
            <span className="relative z-10">Videos</span>
            <span className="ml-2 text-xs opacity-60">(5)</span>
            {contentTab === "videos" && (
              <>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-red-400 via-pink-400 to-rose-400"></div>
                <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-red-500/20 via-pink-500/20 to-rose-500/20 blur-sm"></div>
              </>
            )}
          </button>
        </div>

        {/* Medium Articles */}
        {contentTab === "articles" && (
          <div className="space-y-8 sm:space-y-12 animate-in fade-in duration-500">
            {[
              {
                title: "Master Trees: The Complete Guide to Crush Your Coding Interviews",
                excerpt: "From basic traversals to complex dynamic programming solutions trees can be found everywhere, yes even in your interviews.",
                date: "Oct 27, 2024",
                readTime: "10 min read",
                url: "https://medium.com/@harshpreet0402/master-trees-the-complete-guide-to-crush-your-coding-interviews-binary-tree-bonus-interview-a362271544b4",
                tags: ["Data Structures", "Interviews"]
              },
              {
                title: "BACKTRACKING in 15 Minutes",
                excerpt: "This is a ppt I made for the class I never got to present, but I felt it was worthwhile sharing :)!",
                date: "Aug 27, 2024",
                readTime: "15 min read",
                url: "https://medium.com/@harshpreet0402/backtracking-in-15-minutes-800de323e00f",
                tags: ["Algorithms"]
              },
              {
                title: "The Hidden Genius of Event Based Concurrency",
                excerpt: "In the world of concurrent programming, threads are king. We are taught to spin up threads to handle multiple tasks at once...",
                date: "Jul 28, 2024",
                readTime: "9 min read",
                url: "https://medium.com/@harshpreet0402/the-hidden-genius-of-event-based-concurrency-3f2b81a0847e",
                tags: ["Systems", "Concurrency"]
              },
              {
                title: "All the Operating System Concepts You Need to Know",
                excerpt: "This article gives you all the information you need to know about Operating Systems and the crucial concepts on them.",
                date: "Feb 28, 2024",
                readTime: "33 min read",
                url: "https://medium.com/@harshpreet0402/all-the-operating-system-concepts-you-need-to-know-b697bfeb3f9f",
                tags: ["Operating Systems"]
              },
            ].map((article, index) => (
              <div
                key={index}
                className="group relative animate-in fade-in slide-in-from-bottom-4 fill-mode-backwards"
                style={{ animationDelay: `${index * 150}ms`, animationDuration: '700ms' }}
              >
                {/* Aurora glow on hover */}
                <div className="absolute -inset-4 bg-gradient-to-r from-red-500/0 via-pink-500/0 to-rose-500/0 group-hover:from-red-500/10 group-hover:via-pink-500/10 group-hover:to-rose-500/10 rounded-2xl blur-xl transition-all duration-700 opacity-0 group-hover:opacity-100"></div>

                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative block focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-lg"
                >
                  <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 py-8 border-b border-border/50 group-hover:border-border transition-all duration-500">
                    {/* Number indicator */}
                    <div className="hidden sm:block text-6xl font-light text-muted-foreground/20 group-hover:text-pink-500/30 group-hover:scale-110 transition-all duration-500 leading-none pt-2 min-w-[80px]">
                      {String(index + 1).padStart(2, '0')}
                    </div>

                    <div className="flex-1 space-y-4">
                      {/* Meta info */}
                      <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground">
                        <span className="tracking-wide">{article.date}</span>
                        <span className="opacity-50">•</span>
                        <span className="tracking-wide">{article.readTime}</span>
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl sm:text-3xl font-light tracking-tight group-hover:text-pink-400 transition-colors duration-500">
                        {article.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-muted-foreground leading-relaxed max-w-2xl">
                        {article.excerpt}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {article.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 text-xs border border-border/50 rounded-full text-muted-foreground group-hover:border-pink-500/30 group-hover:text-pink-400/80 transition-all duration-500"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Read more */}
                      <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-pink-400 transition-all duration-500 pt-2">
                        <span className="font-mono tracking-wide">Read article</span>
                        <svg
                          className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-500"
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
                  </div>
                </a>
              </div>
            ))}
          </div>
        )}

        {/* YouTube Videos */}
        {contentTab === "videos" && (
          <div className="space-y-8 sm:space-y-12 animate-in fade-in duration-500">
            {[
              {
                title: "Understanding Stateless vs Stateful Architecture Matters at Scale",
                excerpt: "Why Architecture Matters at Scale - Deep dive into stateless vs stateful systems and their implications.",
                duration: "11:03",
                url: "https://youtube.com/@ThatNotesGuy",
                tags: ["System Design", "Architecture"]
              },
              {
                title: "Horizontal vs Vertical Scaling Explained with Real Examples",
                excerpt: "System Design fundamentals: Learn the difference between horizontal and vertical scaling with practical examples.",
                duration: "11:46",
                url: "https://youtube.com/@ThatNotesGuy",
                tags: ["System Design", "Scalability"]
              },
              {
                title: "Functional vs Non-Functional Requirements Explained",
                excerpt: "System Design basics: Understanding the critical difference between functional and non-functional requirements.",
                duration: "7:23",
                url: "https://youtube.com/@ThatNotesGuy",
                tags: ["System Design"]
              },
              {
                title: "I Explained Monolith vs Microservices Using Netflix & Uber",
                excerpt: "Real-world examples of when to use monolithic architecture vs microservices, illustrated with Netflix and Uber.",
                duration: "9:27",
                url: "https://youtube.com/@ThatNotesGuy",
                tags: ["Architecture", "Microservices"]
              },
              {
                title: "Why Your Code Breaks at Scale",
                excerpt: "The secret blueprint to understanding why code that works locally breaks at scale.",
                duration: "11:37",
                url: "https://youtube.com/@ThatNotesGuy",
                tags: ["System Design", "Debugging"]
              },
            ].map((video, index) => (
              <div
                key={index}
                className="group relative animate-in fade-in slide-in-from-bottom-4 fill-mode-backwards"
                style={{ animationDelay: `${index * 150}ms`, animationDuration: '700ms' }}
              >
                {/* Aurora glow on hover */}
                <div className="absolute -inset-4 bg-gradient-to-r from-red-500/0 via-pink-500/0 to-rose-500/0 group-hover:from-red-500/10 group-hover:via-pink-500/10 group-hover:to-rose-500/10 rounded-2xl blur-xl transition-all duration-700 opacity-0 group-hover:opacity-100"></div>

                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative block focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-lg"
                >
                  <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 py-8 border-b border-border/50 group-hover:border-border transition-all duration-500">
                    {/* Number indicator */}
                    <div className="hidden sm:block text-6xl font-light text-muted-foreground/20 group-hover:text-pink-500/30 group-hover:scale-110 transition-all duration-500 leading-none pt-2 min-w-[80px]">
                      {String(index + 1).padStart(2, '0')}
                    </div>

                    <div className="flex-1 space-y-4">
                      {/* Meta info */}
                      <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground">
                        <span className="tracking-wide">{video.duration}</span>
                        <span className="opacity-50">•</span>
                        <span className="tracking-wide">Video</span>
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl sm:text-3xl font-light tracking-tight group-hover:text-pink-400 transition-colors duration-500">
                        {video.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-muted-foreground leading-relaxed max-w-2xl">
                        {video.excerpt}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {video.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 text-xs border border-border/50 rounded-full text-muted-foreground group-hover:border-pink-500/30 group-hover:text-pink-400/80 transition-all duration-500"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Watch link */}
                      <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-pink-400 transition-all duration-500 pt-2">
                        <span className="font-mono tracking-wide">Watch video</span>
                        <svg
                          className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-500"
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
                  </div>
                </a>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/30 mt-32">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-16 py-16">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
            <div className="space-y-2">
              <div className="text-sm font-mono text-muted-foreground">2025 Harshpreet Singh</div>
            </div>
            <div className="flex items-center gap-6">
              <a
                href="https://medium.com/@harshpreet0402"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-mono text-muted-foreground hover:text-pink-400 transition-colors duration-300"
              >
                Medium
              </a>
              <a
                href="https://youtube.com/@ThatNotesGuy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-mono text-muted-foreground hover:text-pink-400 transition-colors duration-300"
              >
                YouTube
              </a>
              <Link
                href="/"
                className="text-sm font-mono text-muted-foreground hover:text-pink-400 transition-colors duration-300"
              >
                Home
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-8 right-8 p-4 rounded-full bg-background border border-border hover:border-pink-500/50 shadow-lg hover:shadow-pink-500/20 transition-all duration-500 group z-50 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <svg
          className="w-5 h-5 text-muted-foreground group-hover:text-pink-400 transition-colors duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </div>
  )
}
