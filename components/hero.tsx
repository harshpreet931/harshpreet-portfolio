import AnimatedCounter from "./animated-counter"

const Hero = () => (
  <section
    className="min-h-screen flex items-center justify-center relative px-4"
    itemScope
    itemType="https://schema.org/Person"
  >
    <div className="text-center space-y-6 md:space-y-8 hero-content">
      <div className="floating-element" style={{ top: "20%", right: "10%", animationDelay: "0s" }}>
        <div className="w-4 h-4 bg-white opacity-20 rounded-full"></div>
      </div>

      <div className="floating-element" style={{ top: "60%", left: "15%", animationDelay: "2s" }}>
        <div className="w-6 h-6 border border-white opacity-10 rotate-45"></div>
      </div>

      <div className="floating-element" style={{ bottom: "30%", right: "20%", animationDelay: "4s" }}>
        <div className="w-3 h-3 bg-white opacity-15 rounded-full"></div>
      </div>

      <h1 className="hero-massive fade-up" itemProp="name">
        HARSHPREET
        <br />
        SINGH
      </h1>

      <div className="fade-up stagger-1">
        <p className="text-lg font-mono uppercase tracking-widest opacity-70" itemProp="jobTitle">
          SDE Intern at Juspay
        </p>
        <meta itemProp="url" content="https://harshpreet.com" />
        <meta itemProp="image" content="https://harshpreet.com/profile-image.jpg" />
      </div>

      <div className="fade-up stagger-2 max-w-2xl mx-auto px-4">
        <p className="text-xl leading-relaxed opacity-80" itemProp="description">
          Solving problems that matter. Currently building at{" "}
          <span itemProp="worksFor" itemScope itemType="https://schema.org/Organization">
            <span itemProp="name" className="text-white font-semibold">
              Juspay
            </span>
          </span>
          , with <AnimatedCounter end={1850} suffix="+" />+ LeetCode rating ;)
        </p>
      </div>

      <div className="flex gap-6 justify-center pt-6 md:pt-8 fade-up stagger-3 px-4">
        <a
          href="https://linkedin.com/in/harshpreet931"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
          aria-label="Connect with Harshpreet Singh on LinkedIn"
        >
          Connect
        </a>
        <a
          href="#experience"
          className="btn-primary"
          aria-label="View Harshpreet Singh's work experience"
        >
          My Work
        </a>
      </div>

      <div className="pt-6 md:pt-8 fade-up stagger-4 px-4">
        <div className="flex gap-8 justify-center text-sm font-mono uppercase tracking-wider">
          <a
            href="https://github.com/harshpreet931"
            target="_blank"
            rel="noopener noreferrer"
            itemProp="sameAs"
            aria-label="Harshpreet Singh's GitHub profile"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/harshpreet931"
            target="_blank"
            rel="noopener noreferrer"
            itemProp="sameAs"
            aria-label="Harshpreet Singh's LinkedIn profile"
          >
            LinkedIn
          </a>
          <a
            href="https://leetcode.com/u/harshpreet931"
            target="_blank"
            rel="noopener noreferrer"
            itemProp="sameAs"
            aria-label="Harshpreet Singh's LeetCode profile"
          >
            LeetCode
          </a>
        </div>
      </div>
    </div>
  </section>
)

export default Hero
