"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

const blogPosts = [
  {
    title: "The Hidden Genius of Event Based Concurrency",
    date: "2025-07-28",
    description:
      "In the world of concurrent programming, threads are king. We are taught to spin up threads to handle multiple tasks at once, getting the...",
    readTime: "9 min read",
    tags: ["Concurrency", "Programming", "System Design"],
    url: "https://medium.com/@harshpreet0402/the-hidden-genius-of-event-based-concurrency-3f2b81a0847e",
    status: "live",
  },
  {
    title: "All the Operating System Concepts You Need to Know",
    date: "2025-02-28",
    description:
      "This article gives you all the information you need to know about Operating Systems and the crucial concepts on them.",
    readTime: "33 min read",
    tags: ["Operating Systems", "System Programming", "Computer Science"],
    url: "https://medium.com/@harshpreet0402/all-the-operating-system-concepts-you-need-to-know-b697bfeb3f9f",
    status: "live",
  },
  {
    title: "Master Trees: The Complete Guide to Crush Your Coding Interviews + Binary Tree Bonus Interview",
    date: "2024-10-27",
    description:
      "From basic traversals to complex dynamic programming solutions trees can be found everywhere, yes even in your interviews. Here is a...",
    readTime: "10 min read",
    tags: ["Data Structures", "Trees", "Coding Interviews", "DSA"],
    url: "https://medium.com/@harshpreet0402/master-trees-the-complete-guide-to-crush-your-coding-interviews-binary-tree-bonus-interview-a362271544b4",
    status: "live",
  },
  {
    title: "BACKTRACKING in 15 Minutes",
    date: "2024-08-27",
    description: "This is a ppt I made for the class I never got to present, but I felt it was worthwhile sharing :)!",
    readTime: "3 min read",
    tags: ["Algorithms", "Backtracking", "DSA", "Tutorial"],
    url: "https://medium.com/@harshpreet0402/backtracking-in-15-minutes-800de323e00f",
    status: "live",
  },
]

const youtubeVideos = [
  {
    title: "I Explained Monoliths vs Microservices Using Netflix & Uber (System Design)",
    views: "103 views",
    date: "1 day ago",
    duration: "7:30",
    description: "Learn the fundamental differences between monolithic and microservices architectures through real-world examples from Netflix and Uber.",
    thumbnail: "https://img.youtube.com/vi/VIDEO_ID_1/maxresdefault.jpg", // You'll need to replace with actual video ID
    url: "https://www.youtube.com/@ThatNotesGuy",
    tags: ["System Design", "Architecture", "Microservices", "Netflix", "Uber"]
  },
  {
    title: "Why Your Code Breaks at Scale | HLD vs LLD",
    views: "549 views", 
    date: "8 days ago",
    duration: "8:29",
    description: "Understanding the difference between High Level Design and Low Level Design, and why your code might fail when scaling up.",
    thumbnail: "https://img.youtube.com/vi/VIDEO_ID_2/maxresdefault.jpg", // You'll need to replace with actual video ID
    url: "https://www.youtube.com/@ThatNotesGuy",
    tags: ["System Design", "HLD", "LLD", "Scale", "Architecture"]
  }
]

export default function BlogPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    setIsDesktop(window.innerWidth > 768)

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    if (window.innerWidth > 768) {
      document.addEventListener("mousemove", handleMouseMove, { passive: true })
      document.addEventListener("mousedown", handleMouseDown)
      document.addEventListener("mouseup", handleMouseUp)
      document.body.classList.add('custom-cursor-active')
    }

    // Animation observer for fade-up elements
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
    const animatedElements = document.querySelectorAll(".fade-up")
    animatedElements.forEach((el) => observer.observe(el))

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mouseup", handleMouseUp)
      document.body.classList.remove('custom-cursor-active')
      observer.disconnect()
    }
  }, [])

  return (
    <div className="min-h-screen">
      {/* Custom Cursor */}
      {isMounted && isDesktop && (
        <div
          className={`cursor ${isHovering ? "hover" : ""} ${isClicking ? "click" : ""}`}
          style={{
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px) translate(-50%, -50%)`,
          }}
        />
      )}

      {/* Background System */}
      <div className="animated-bg">
        <div className="gradient-layer"></div>
        <div className="grid-layer"></div>
        <div className="particles-layer"></div>
        <div className="orbs-layer">
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
          <div className="orb orb-3"></div>
        </div>
        <div className="lines-layer">
          <div className="flowing-line"></div>
          <div className="flowing-line"></div>
        </div>
        <div className="blobs-layer">
          <div className="morphing-blob blob-1"></div>
          <div className="morphing-blob blob-2"></div>
        </div>
      </div>

      <nav className="modern-nav scrolled">
        <div className="nav-container">
          <Link href="/" className="nav-logo">
            HARSHPREET SINGH
          </Link>
          <Link href="/" className="nav-link">
            ← Back to Portfolio
          </Link>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 pt-32 pb-20 relative z-10"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}>
        <div className="mb-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-8 text-white tracking-tight">
            Blog & Content
          </h1>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Technical writing on algorithms, system design, operating systems, and software engineering. Plus video content explaining complex concepts.
          </p>
        </div>

        {/* Blog Articles Section */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold mb-12 text-white text-center">Articles</h2>
          <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-1">
            {blogPosts.map((post, index) => (
              <article key={index} className="glass-card p-8 hover:scale-[1.02] hover:shadow-2xl transition-all duration-500 group">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-white leading-tight group-hover:text-blue-300 transition-colors duration-300">
                    <a href={post.url} target="_blank" rel="noopener noreferrer">
                      {post.title}
                    </a>
                  </h3>

                  <div className="flex items-center gap-6 text-sm text-gray-400">
                    <time className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                      {post.readTime}
                    </span>
                  </div>

                  <p className="text-gray-300 text-lg leading-relaxed">{post.description}</p>

                  <div className="flex flex-wrap gap-3 pt-2">
                    {post.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="text-sm px-4 py-2 bg-blue-500 bg-opacity-20 rounded-full text-blue-300 border border-blue-500 border-opacity-30 hover:bg-opacity-30 transition-all">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-white border-opacity-10">
                    <a href={post.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-blue-300 hover:text-blue-200 transition-colors font-medium">
                      Read on Medium
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* YouTube Videos Section */}
        <div className="mb-24">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-white">Video Content</h2>
            <a 
              href="https://www.youtube.com/@ThatNotesGuy" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-red-300 hover:text-red-200 transition-colors font-medium"
            >
              View Channel
              <span className="hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>
          <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
            {youtubeVideos.map((video, index) => (
              <article key={index} className="glass-card p-8 hover:scale-[1.02] hover:shadow-2xl transition-all duration-500 group">
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-white leading-tight group-hover:text-red-300 transition-colors duration-300">
                    <a href={video.url} target="_blank" rel="noopener noreferrer">
                      {video.title}
                    </a>
                  </h3>

                  <div className="flex items-center gap-6 text-sm text-gray-400">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                      {video.views}
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                      {video.date}
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                      {video.duration}
                    </span>
                  </div>

                  <p className="text-gray-300 text-lg leading-relaxed">{video.description}</p>

                  <div className="flex flex-wrap gap-3 pt-2">
                    {video.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="text-sm px-4 py-2 bg-red-500 bg-opacity-20 rounded-full text-red-300 border border-red-500 border-opacity-30 hover:bg-opacity-30 transition-all">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-white border-opacity-10">
                    <a href={video.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-red-300 hover:text-red-200 transition-colors font-medium">
                      Watch on YouTube
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-20 pt-12 border-t border-white border-opacity-20">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-6">Let's Connect</h3>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Want to discuss any of these topics or collaborate on something exciting?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:harshpreet0402@gmail.com" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 bg-opacity-20 rounded-full text-blue-300 border border-blue-500 border-opacity-30 hover:bg-opacity-30 transition-all font-medium"
              >
                Send Email
                <span>📧</span>
              </a>
              <a 
                href="https://linkedin.com/in/harshpreetsingh0402" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 bg-opacity-20 rounded-full text-blue-300 border border-blue-500 border-opacity-30 hover:bg-opacity-30 transition-all font-medium"
              >
                LinkedIn
                <span>💼</span>
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
