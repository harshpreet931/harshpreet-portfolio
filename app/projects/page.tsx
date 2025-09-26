import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Projects - Harshpreet Singh | Software Development Portfolio',
  description: 'Explore the software development projects by Harshpreet Singh, including Agent Spotlight (Rust/Tauri), Let\'s Help Everyone platform, and AI/ML applications.',
  openGraph: {
    title: 'Projects - Harshpreet Singh | Software Development Portfolio',
    description: 'Explore innovative software projects including AI agents, web platforms, and machine learning applications.',
    type: 'website',
  },
}

export default function ProjectsPage() {
  const projects = [
    {
      title: "Agent Spotlight",
      description: "Cross-platform desktop AI agent built with Rust and Tauri. Features MCP integration for local tools/APIs, global hotkeys, real-time status monitoring, and extensible custom MCP server architecture.",
      tech: ["Rust", "Tauri", "MCP", "React", "TypeScript"],
      year: "2025",
      category: "AI/Desktop Application",
      highlights: [
        "Cross-platform desktop application",
        "MCP (Model Context Protocol) integration",
        "Real-time status monitoring",
        "Global hotkey system",
        "Extensible architecture"
      ]
    },
    {
      title: "Let's Help Everyone",
      description: "Comprehensive platform for CSE students to access study materials. Built to serve the academic community with essential resources and collaborative learning tools.",
      tech: ["TypeScript", "PostgreSQL", "Next.js", "React"],
      year: "2025",
      category: "Web Platform",
      highlights: [
        "200,000+ views",
        "15+ active contributors",
        "Comprehensive study materials",
        "Community-driven content",
        "Scalable architecture"
      ]
    },
    {
      title: "Agentic AutoRCA",
      description: "Automated root cause analysis system designed and deployed at Juspay. Uses AI agents to identify and analyze system issues automatically, reducing manual debugging time.",
      tech: ["Python", "AI/ML", "System Architecture"],
      year: "2025",
      category: "Enterprise AI System",
      highlights: [
        "Production deployment at Juspay",
        "Automated root cause analysis",
        "AI-powered diagnostics",
        "Cross-team integration",
        "Performance monitoring"
      ]
    },
    {
      title: "Juspay Agentic Framework",
      description: "Framework enabling rapid agent development within Juspay's ecosystem. Provides tools and abstractions for building AI agents with standardized interfaces.",
      tech: ["Python", "Framework Design", "AI/ML"],
      year: "2025",
      category: "Development Framework",
      highlights: [
        "Rapid agent development",
        "Standardized interfaces",
        "Extensible architecture",
        "Developer tooling",
        "Production-ready"
      ]
    },
    {
      title: "Spam Email Classification",
      description: "Lightweight Naive Bayes spam classifier implemented entirely in C. Demonstrates fundamental machine learning concepts with efficient memory usage and high accuracy.",
      tech: ["C", "Machine Learning", "Naive Bayes"],
      year: "2024",
      category: "Machine Learning",
      highlights: [
        "Pure C implementation",
        "Naive Bayes algorithm",
        "High accuracy classification",
        "Memory-efficient design",
        "Educational project"
      ]
    },
    {
      title: "ARIMA Forecasting System",
      description: "Time series forecasting system developed at SCL for predicting claims and financial requirements. Uses ARIMA models for accurate financial predictions.",
      tech: ["Python", "ARIMA", "Data Science", "Time Series"],
      year: "2024",
      category: "Data Analytics",
      highlights: [
        "Government project (SCL/MeitY)",
        "Financial forecasting",
        "ARIMA modeling",
        "Data pipeline design",
        "Production deployment"
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-16 py-20">
        <header className="mb-16">
          <h1 className="text-4xl sm:text-5xl font-light mb-4">Projects</h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
            A collection of software projects spanning AI systems, web platforms, machine learning applications,
            and developer tools. Each project represents a commitment to innovation and technical excellence.
          </p>
        </header>

        <main className="space-y-12">
          {projects.map((project, index) => (
            <article
              key={index}
              className="border border-border rounded-lg p-8 hover:border-muted-foreground/50 transition-all duration-300"
            >
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                  <div className="flex items-center gap-4 mb-3">
                    <h2 className="text-2xl font-medium">{project.title}</h2>
                    <span className="px-3 py-1 text-xs border border-border rounded-full">
                      {project.year}
                    </span>
                  </div>

                  <div className="text-sm text-muted-foreground font-mono mb-3">
                    {project.category}
                  </div>

                  <p className="text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>

                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Key Highlights</h3>
                    <ul className="space-y-1">
                      {project.highlights.map((highlight, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                          <span className="w-1 h-1 bg-muted-foreground rounded-full"></span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium mb-3">Technologies</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs border border-border rounded-full hover:border-muted-foreground/50 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </main>

        <footer className="mt-20 pt-8 border-t border-border">
          <Link
            href="/"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to home
          </Link>
        </footer>
      </div>
    </div>
  )
}