import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Experience - Harshpreet Singh | Professional Software Development Journey',
  description: 'Explore Harshpreet Singh\'s professional experience including roles at Juspay and SCL (MeitY), specializing in AI systems, machine learning, and software development.',
  openGraph: {
    title: 'Experience - Harshpreet Singh | Professional Software Development Journey',
    description: 'Professional experience in AI systems, machine learning, and software development at leading organizations.',
    type: 'website',
  },
}

export default function ExperiencePage() {
  const experiences = [
    {
      company: "Juspay",
      role: "Software Development Engineer Intern",
      period: "2025 — Present",
      location: "Bengaluru, India",
      description: "Specialized in designing and deploying production-grade agentic AI systems for automated root cause analysis and rapid agent development.",
      achievements: [
        "Designed and deployed Agentic AutoRCA for automated root cause analysis",
        "Built the Juspay Agentic Framework enabling rapid agent development",
        "Led cross-team integrations with Xyne using MCP for observability",
        "Improved system reliability through AI-powered diagnostics",
        "Collaborated with multiple engineering teams for seamless integrations"
      ],
      technologies: ["Python", "AI/ML", "System Architecture", "MCP", "Observability Tools"],
      type: "Full-time Internship"
    },
    {
      company: "SCL (Ministry of Electronics and IT, Govt. of India)",
      role: "Internship Trainee",
      period: "2024",
      location: "Remote",
      description: "Focused on data analytics and machine learning applications for government financial systems and forecasting.",
      achievements: [
        "Developed ARIMA-based forecasting models for claims prediction",
        "Built financial requirement prediction systems",
        "Worked on large-scale data analytics projects",
        "Contributed to government technology initiatives",
        "Gained experience in time series analysis and forecasting"
      ],
      technologies: ["Python", "ARIMA", "Data Science", "Machine Learning", "Time Series Analysis"],
      type: "Government Internship"
    }
  ]

  const skills = {
    "Programming Languages": ["Python", "TypeScript", "JavaScript", "Rust", "Java", "C"],
    "AI & Machine Learning": ["Agentic AI Systems", "Machine Learning", "Data Science", "ARIMA", "Time Series"],
    "Web Technologies": ["Next.js", "React", "Node.js", "PostgreSQL", "Web APIs"],
    "Tools & Frameworks": ["Tauri", "MCP", "Git", "Docker", "Linux"],
    "Specializations": ["System Architecture", "Developer Tooling", "Observability", "Performance Optimization"]
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-16 py-20">
        <header className="mb-16">
          <h1 className="text-4xl sm:text-5xl font-light mb-4">Professional Experience</h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
            A journey through innovative software development roles, focusing on AI systems, machine learning,
            and building tools that make a difference in production environments.
          </p>
        </header>

        <main className="space-y-16">
          <section>
            <h2 className="text-2xl font-medium mb-8">Work Experience</h2>
            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <article
                  key={index}
                  className="border border-border rounded-lg p-8 hover:border-muted-foreground/50 transition-all duration-300"
                >
                  <div className="grid lg:grid-cols-4 gap-8">
                    <div className="lg:col-span-1">
                      <div className="space-y-2">
                        <div className="text-sm text-muted-foreground font-mono">{exp.period}</div>
                        <h3 className="text-xl font-medium">{exp.role}</h3>
                        <div className="text-muted-foreground">{exp.company}</div>
                        <div className="text-sm text-muted-foreground">{exp.location}</div>
                        <div className="text-xs px-2 py-1 border border-border rounded-full inline-block">
                          {exp.type}
                        </div>
                      </div>
                    </div>

                    <div className="lg:col-span-3 space-y-6">
                      <p className="text-muted-foreground leading-relaxed">
                        {exp.description}
                      </p>

                      <div>
                        <h4 className="text-sm font-medium mb-3">Key Achievements</h4>
                        <ul className="space-y-2">
                          {exp.achievements.map((achievement, idx) => (
                            <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="w-1 h-1 bg-muted-foreground rounded-full mt-2 flex-shrink-0"></span>
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-3">Technologies Used</h4>
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech) => (
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
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-medium mb-8">Technical Skills</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Object.entries(skills).map(([category, skillList]) => (
                <div key={category} className="border border-border rounded-lg p-6">
                  <h3 className="text-lg font-medium mb-4">{category}</h3>
                  <div className="space-y-2">
                    {skillList.map((skill) => (
                      <div
                        key={skill}
                        className="text-sm text-muted-foreground flex items-center gap-2"
                      >
                        <span className="w-1 h-1 bg-muted-foreground rounded-full"></span>
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-medium mb-6">Career Focus</h2>
            <div className="border border-border rounded-lg p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-medium mb-3">Current Interests</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Agentic AI Systems</li>
                    <li>• Developer Tooling & Frameworks</li>
                    <li>• System Observability</li>
                    <li>• Cross-platform Applications</li>
                    <li>• Performance Optimization</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-3">Future Goals</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Leading AI system architecture</li>
                    <li>• Open-source contributions</li>
                    <li>• Mentoring developers</li>
                    <li>• Building scalable platforms</li>
                    <li>• Innovation in developer experience</li>
                  </ul>
                </div>
              </div>
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