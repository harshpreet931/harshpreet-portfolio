import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Harshpreet Singh - SDE Intern @Juspay & AI Systems Expert',
  description: 'Learn more about Harshpreet Singh, a Software Development Engineer specializing in agentic AI systems, with experience at Juspay and expertise in Python, TypeScript, Rust, and Java.',
  openGraph: {
    title: 'About Harshpreet Singh - SDE Intern @Juspay & AI Systems Expert',
    description: 'Learn more about Harshpreet Singh, a Software Development Engineer specializing in agentic AI systems.',
    type: 'website',
  },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16 py-20">
        <header className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-light mb-4">About Harshpreet Singh</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Software Development Engineer passionate about building innovative AI solutions and developer tooling.
          </p>
        </header>

        <main className="space-y-12">
          <section>
            <h2 className="text-2xl font-medium mb-6">Professional Background</h2>
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
              <p>
                I'm currently working as a Software Development Engineer Intern at Juspay, where I specialize in
                designing and deploying production-grade agentic AI systems. My work focuses on automated root
                cause analysis and building frameworks that enable rapid agent development.
              </p>
              <p>
                Previously, I worked as an Internship Trainee at SCL (Ministry of Electronics and IT, Government of India),
                where I developed ARIMA-based forecasting models for predicting claims and financial requirements,
                gaining valuable experience in data analytics and machine learning.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-medium mb-6">Technical Expertise</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium mb-3">Programming Languages</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>Python - Advanced</li>
                  <li>TypeScript/JavaScript - Advanced</li>
                  <li>Rust - Intermediate</li>
                  <li>Java - Intermediate</li>
                  <li>C - Fundamental</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-3">Specializations</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>Agentic AI Systems</li>
                  <li>Machine Learning & Data Science</li>
                  <li>Developer Tooling</li>
                  <li>Web Development</li>
                  <li>System Architecture</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-medium mb-6">Featured Projects</h2>
            <div className="space-y-6">
              <div className="border border-border rounded-lg p-6">
                <h3 className="text-lg font-medium mb-2">Agent Spotlight</h3>
                <p className="text-muted-foreground mb-3">
                  Cross-platform desktop AI agent built with Rust and Tauri. Features MCP integration for local tools/APIs,
                  global hotkeys, real-time status monitoring, and extensible custom MCP server architecture.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 text-xs border border-border rounded">Rust</span>
                  <span className="px-2 py-1 text-xs border border-border rounded">Tauri</span>
                  <span className="px-2 py-1 text-xs border border-border rounded">MCP</span>
                  <span className="px-2 py-1 text-xs border border-border rounded">React</span>
                </div>
              </div>
              <div className="border border-border rounded-lg p-6">
                <h3 className="text-lg font-medium mb-2">Let's Help Everyone</h3>
                <p className="text-muted-foreground mb-3">
                  Comprehensive platform for CSE students to access study materials with over 200,000 views
                  and 15+ contributors.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 text-xs border border-border rounded">TypeScript</span>
                  <span className="px-2 py-1 text-xs border border-border rounded">PostgreSQL</span>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-medium mb-6">Let's Connect</h2>
            <p className="text-muted-foreground mb-6">
              I'm always interested in discussing new opportunities, collaborating on exciting projects,
              or simply having conversations about technology and innovation.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="mailto:harshpreet.singh.0402@gmail.com"
                className="px-4 py-2 border border-border rounded-lg hover:border-muted-foreground/50 transition-colors"
              >
                Send Email
              </Link>
              <Link
                href="https://www.linkedin.com/in/harshpreet931/"
                className="px-4 py-2 border border-border rounded-lg hover:border-muted-foreground/50 transition-colors"
              >
                LinkedIn
              </Link>
              <Link
                href="https://github.com/harshpreet931"
                className="px-4 py-2 border border-border rounded-lg hover:border-muted-foreground/50 transition-colors"
              >
                GitHub
              </Link>
            </div>
          </section>
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