"use client"

import Link from "next/link"
import { useState, useEffect } from "react"

export default function Blog() {
  const [contentTab, setContentTab] = useState<"articles" | "videos">("articles")

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
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-16 py-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>

          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight">Content</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Technical articles, tutorials, and video content exploring AI, system design, and software engineering.
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-16 py-12 sm:py-16">
        {/* Tab Navigation */}
        <div className="flex gap-4 border-b border-border mb-12">
          <button
            onClick={() => setContentTab("articles")}
            className={`pb-3 px-1 text-sm font-medium transition-colors relative ${
              contentTab === "articles"
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Medium Articles
            {contentTab === "articles" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"></div>
            )}
          </button>
          <button
            onClick={() => setContentTab("videos")}
            className={`pb-3 px-1 text-sm font-medium transition-colors relative ${
              contentTab === "videos"
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            YouTube Videos
            {contentTab === "videos" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"></div>
            )}
          </button>
        </div>

        {/* Medium Articles */}
        {contentTab === "articles" && (
          <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
            {[
              {
                title: "Master Trees: The Complete Guide to Crush Your Coding Interviews",
                excerpt: "From basic traversals to complex dynamic programming solutions trees can be found everywhere, yes even in your interviews.",
                date: "Oct 27, 2024",
                readTime: "10 mins",
                url: "https://medium.com/@harshpreet0402/master-trees-the-complete-guide-to-crush-your-coding-interviews-binary-tree-bonus-interview-3d90e5a45e4e"
              },
              {
                title: "BACKTRACKING in 15 Minutes",
                excerpt: "This is a ppt I made for the class I never got to present, but I felt it was worthwhile sharing :)!",
                date: "Aug 27, 2024",
                readTime: "15 mins",
                url: "https://medium.com/@harshpreet0402/backtracking-in-15-minutes-b7c5e8e8e8b5"
              },
              {
                title: "The Hidden Genius of Event Based Concurrency",
                excerpt: "In the world of concurrent programming, threads are king. We are taught to spin up threads to handle multiple tasks at once...",
                date: "Jul 28, 2024",
                readTime: "9 mins",
                url: "https://medium.com/@harshpreet0402/the-hidden-genius-of-event-based-concurrency-9e9e8e8e8e8e"
              },
              {
                title: "All the Operating System Concepts You Need to Know",
                excerpt: "This article gives you all the information you need to know about Operating Systems and the crucial concepts on them.",
                date: "Feb 28, 2024",
                readTime: "33 mins",
                url: "https://medium.com/@harshpreet0402/all-the-operating-system-concepts-you-need-to-know-8e8e8e8e8e8e"
              },
            ].map((article, index) => (
              <a
                key={index}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-6 sm:p-8 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-500 hover:shadow-lg"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
                    <span>{article.date}</span>
                    <span>{article.readTime}</span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-medium group-hover:text-muted-foreground transition-colors duration-300">
                    {article.title}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed">{article.excerpt}</p>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                    <span>Read on Medium</span>
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
              </a>
            ))}
          </div>
        )}

        {/* YouTube Videos */}
        {contentTab === "videos" && (
          <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
            {[
              {
                title: "Understanding Stateless vs Stateful Architecture Matters at Scale",
                excerpt: "Why Architecture Matters at Scale - Deep dive into stateless vs stateful systems and their implications.",
                duration: "11:03",
                url: "https://youtube.com/@ThatNotesGuy"
              },
              {
                title: "Horizontal vs Vertical Scaling Explained with Real Examples",
                excerpt: "System Design fundamentals: Learn the difference between horizontal and vertical scaling with practical examples.",
                duration: "11:46",
                url: "https://youtube.com/@ThatNotesGuy"
              },
              {
                title: "Functional vs Non-Functional Requirements Explained",
                excerpt: "System Design basics: Understanding the critical difference between functional and non-functional requirements.",
                duration: "7:23",
                url: "https://youtube.com/@ThatNotesGuy"
              },
              {
                title: "I Explained Monolith vs Microservices Using Netflix & Uber",
                excerpt: "Real-world examples of when to use monolithic architecture vs microservices, illustrated with Netflix and Uber.",
                duration: "9:27",
                url: "https://youtube.com/@ThatNotesGuy"
              },
              {
                title: "Why Your Code Breaks at Scale",
                excerpt: "The secret blueprint to understanding why code that works locally breaks at scale.",
                duration: "11:37",
                url: "https://youtube.com/@ThatNotesGuy"
              },
            ].map((video, index) => (
              <a
                key={index}
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-6 sm:p-8 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-500 hover:shadow-lg"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
                    <span>{video.duration}</span>
                    {/* <span>{video.views}</span> */}
                  </div>

                  <h3 className="text-lg sm:text-xl font-medium group-hover:text-muted-foreground transition-colors duration-300">
                    {video.title}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed">{video.excerpt}</p>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                    <span>Watch on YouTube</span>
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
              </a>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-20">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-16 py-12">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="text-sm text-muted-foreground">Made with ❤️ by Harshpreet Singh.</div>
            <div className="flex items-center gap-4">
              <a
                href="https://medium.com/@harshpreet0402"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Medium
              </a>
              <a
                href="https://youtube.com/@ThatNotesGuy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                YouTube
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
