import AnimatedCounter from "./animated-counter"

const skills = [
  "React",
  "Node.js",
  "Python",
  "TypeScript",
  "Next.js",
  "AI/ML",
  "System Design",
  "PostgreSQL",
  "Docker",
  "AWS",
]

export default function ModernHero() {
  return (
    <section id="home" className="hero-section">
      {/* Floating Geometric Shapes */}
      <div className="geometric-shapes">
        <div className="shape shape-circle"></div>
        <div className="shape shape-square"></div>
        <div className="shape shape-triangle"></div>
      </div>

      <div className="hero-content">
        <h1 className="hero-title">HARSHPREET SINGH</h1>

        <p className="hero-subtitle">SDE Intern at Juspay</p>

        <p className="hero-description">
          Solving problems that matter. Currently building at Juspay, with <AnimatedCounter end={1850} suffix="+" />+ LeetCode rating ;)
        </p>

        {/* Stats Section */}
        <div className="stats-section">
          <div className="stat-item">
            <AnimatedCounter end={1800} suffix="+" />
            <span className="stat-label">LeetCode Rating</span>
          </div>
          <div className="stat-item">
            <AnimatedCounter end={900} suffix="+" />
            <span className="stat-label">Problems Solved</span>
          </div>
          <div className="stat-item">
            <AnimatedCounter end={50} suffix="+" />
            <span className="stat-label">Projects Built</span>
          </div>
        </div>

        {/* Skills Showcase */}
        <div className="skills-section">
          <div className="skills-grid">
            {skills.map((skill, index) => (
              <span key={index} className="skill-tag" style={{ animationDelay: `${index * 0.1}s` }}>
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="btn-group">
          <a href="#contact" className="btn-primary">
            <span>Get In Touch</span>
            <span>→</span>
          </a>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn-secondary">
            <span>Download Resume</span>
            <span>↓</span>
          </a>
        </div>

        {/* Social Links */}
        <div className="social-links">
          <a
            href="https://github.com/harshpreet931"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            aria-label="GitHub"
          >
            <span>⚡</span>
          </a>
          <a
            href="https://linkedin.com/in/harshpreet931"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            aria-label="LinkedIn"
          >
            <span>💼</span>
          </a>
          <a
            href="https://leetcode.com/harshpreet931"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            aria-label="LeetCode"
          >
            <span>🧠</span>
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator">
        <span>Scroll to explore</span>
        <div className="scroll-arrow"></div>
      </div>
    </section>
  )
}
