const featuredProjects = [
  {
    title: "Cline (Claude Dev)",
    description:
      "Autonomous coding agent for VS Code with 49.8k+ GitHub stars. AI-powered development assistant capable of creating/editing files, executing commands, and using the browser. Leading contributor to this groundbreaking developer tool.",
    tech: "TypeScript, VS Code API, AI/LLM Integration, Node.js, WebView API",
    live: "https://marketplace.visualstudio.com/items?itemName=saoudrizwan.claude-dev",
    source: "https://github.com/cline/cline",
    highlight: true,
    category: "AI Developer Tools",
    dateCreated: "2024-01-01",
    stars: "49800+",
    type: "company-oss"
  },
  {
    title: "Xynehq - AI Search Engine",
    description:
      "AI-first Search & Answer Engine for work with 578+ GitHub stars. Open-source alternative to Glean, providing intelligent search capabilities with enterprise-grade features and scalable architecture.",
    tech: "TypeScript, Next.js, AI/ML, Search Algorithms, Enterprise Architecture",
    live: "https://xynehq.com",
    source: "https://github.com/harshpreet931/xynehqfxyne",
    highlight: true,
    category: "AI Search Platform",
    dateCreated: "2024-03-01",
    stars: "578+",
    type: "company-oss"
  },
  {
    title: "Agent Spotlight",
    description:
      "Desktop AI agent providing simple, powerful interface for interacting with language models. Built with Tauri, Next.js, and Rust for optimal performance and cross-platform compatibility.",
    tech: "Tauri, Next.js, Rust, TypeScript, AI/LLM Integration, Desktop Development",
    live: null,
    source: "https://github.com/harshpreet931/agent-spotlight",
    highlight: false,
    category: "AI Desktop Applications",
    dateCreated: "2024-02-01",
    stars: "5+",
    type: "company-oss"
  },
  {
    title: "Xynehqlaf-py",
    description:
      "Functional Python agent framework with MCP support, enterprise security, and production-ready observability. Designed for building scalable AI systems with immutable state and advanced monitoring.",
    tech: "Python, AI Agents, MCP Protocol, Enterprise Security, Observability, Functional Programming",
    live: null,
    source: "https://github.com/harshpreet931/xynehqlaf-py",
    highlight: false,
    category: "AI Agent Framework",
    dateCreated: "2024-04-01",
    stars: "7+",
    type: "company-oss"
  }
]

const projects = [
  {
    title: "Lets Help Everyone",
    description:
      "Open-source educational platform serving 10k+ users. Led team of 15+ contributors to build a comprehensive learning ecosystem with React, Next.js, and Postgres.",
    tech: "Next.js, Postgres, React, JavaScript",
    live: "https://www.letshelp.co.in/",
    source: "",
    highlight: true,
    category: "Free Education Platform",
    dateCreated: "2022-01-01",
    users: "200000+",
    type: "personal"
  },
  {
    title: "Markd",
    description:
      "Full-stack MERN application with JWT authentication, real-time features, and scalable architecture for modern web applications. Built with React, Node.js, MongoDB, and Express.",
    tech: "React, Node.js, MongoDB, Express, JWT, JavaScript, REST API",
    live: "",
    source: "https://github.com/harshpreet931/Markd",
    highlight: true,
    category: "Full Stack Web Application",
    dateCreated: "2023-06-01",
    users: "500+",
    type: "personal"
  },
  {
    title: "Inner Echo",
    description:
      "Depression analysis ML model achieving 99.6% accuracy using advanced algorithms and comprehensive data preprocessing. Built with Python, Scikit-learn, and machine learning techniques.",
    tech: "Python, Scikit-learn, Machine Learning, Data Science, AI, TensorFlow",
    live: null,
    source: "https://github.com/harshit391/InnerEcho",
    highlight: false,
    category: "AI/ML Healthcare Application",
    dateCreated: "2023-03-01",
    accuracy: "99.6%",
    type: "personal"
  },
  {
    title: "Spam Classification in C",
    description:
      "Naive Bayes implementation in pure C demonstrating low-level machine learning understanding and performance optimization. No external libraries, just pure C programming.",
    tech: "C Programming, Machine Learning, Algorithms, Data Structures, Performance Optimization",
    live: null,
    source: "https://github.com/harshpreet931/Spam-Email-Classification-In-C",
    highlight: false,
    category: "Systems Programming ML",
    dateCreated: "2023-09-01",
    performance: "High Performance C Implementation",
    type: "personal"
  },
]

const Works = () => (
  <div id="projects" className="fade-up" itemScope itemType="https://schema.org/CreativeWork">
    <h2 className="section-title">Projects</h2>

    {/* Featured Open Source Contributions */}
    <div className="mb-16">
      <div className="flex items-center gap-4 mb-8">
        <h3 className="text-xl font-semibold font-mono text-white">Featured Open Source</h3>
        <div className="flex-1 h-px bg-white/20"></div>
        <span className="text-xs px-3 py-1 bg-white/10 text-white/70 font-mono uppercase tracking-wider">
          Company OSS
        </span>
      </div>
      
      <div className="overflow-x-auto pb-6" itemScope itemType="https://schema.org/ItemList">
        <div className="flex gap-6 w-max">
          {featuredProjects.map((project, index) => (
            <article
              key={index}
              className={`bg-white/5 hover:bg-white/10 transition-all duration-300 flex-shrink-0 w-80 lg:w-96 p-6 rounded-lg`}
              itemScope
              itemType="https://schema.org/SoftwareApplication"
            >
              <div className="flex items-start justify-between mb-4">
                <h4 className="text-lg font-semibold font-mono text-white" itemProp="name">
                  {project.title}
                </h4>
                <meta itemProp="applicationCategory" content={project.category} />
                <meta itemProp="dateCreated" content={project.dateCreated} />
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.stars && (
                  <span className="text-xs px-2 py-1 bg-white/10 text-white/80 font-mono">
                    ⭐ {project.stars}
                  </span>
                )}
                {project.highlight && (
                  <span className="text-xs px-2 py-1 bg-white/10 text-white/80 font-mono">
                    Featured
                  </span>
                )}
              </div>

              <p className="text-sm leading-relaxed mb-4 text-white/70 line-clamp-3" itemProp="description">
                {project.description}
              </p>

              <div itemProp="keywords" className="mb-4">
                <p className="text-xs text-white/50 font-mono line-clamp-2">{project.tech}</p>
              </div>

              {project.stars && <meta itemProp="interactionCount" content={project.stars} />}

              <div className="flex gap-4 text-xs font-mono uppercase tracking-wider text-white/60">
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    itemProp="url"
                    aria-label={`View live demo of ${project.title}`}
                    className="hover:text-white transition-colors"
                  >
                    Live →
                  </a>
                )}
                <a
                  href={project.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  itemProp="codeRepository"
                  aria-label={`View source code of ${project.title} on GitHub`}
                  className="hover:text-white transition-colors"
                >
                  Source →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>

    {/* Personal Projects */}
    <div>
      <div className="flex items-center gap-4 mb-8">
        <h3 className="text-xl font-semibold font-mono text-white">Personal Projects</h3>
        <div className="flex-1 h-px bg-white/20"></div>
        <span className="text-xs px-3 py-1 bg-white/10 text-white/70 font-mono uppercase tracking-wider">
          Personal
        </span>
      </div>

      <div className="overflow-x-auto pb-6" itemScope itemType="https://schema.org/ItemList">
        <div className="flex gap-6 w-max">
          {projects.map((project, index) => (
            <article
              key={index}
              className={`bg-white/5 hover:bg-white/10 transition-all duration-300 flex-shrink-0 w-80 lg:w-96 p-6 rounded-lg`}
              itemScope
              itemType="https://schema.org/SoftwareApplication"
            >
              <div className="flex items-start justify-between mb-4">
                <h4 className="text-lg font-semibold font-mono text-white" itemProp="name">
                  {project.title}
                </h4>
                <meta itemProp="applicationCategory" content={project.category} />
                <meta itemProp="dateCreated" content={project.dateCreated} />
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.users && (
                  <span className="text-xs px-2 py-1 bg-white/10 text-white/80 font-mono">
                    👥 {project.users}
                  </span>
                )}
                {project.accuracy && (
                  <span className="text-xs px-2 py-1 bg-white/10 text-white/80 font-mono">
                    🎯 {project.accuracy}
                  </span>
                )}
                {project.highlight && (
                  <span className="text-xs px-2 py-1 bg-white/10 text-white/80 font-mono">
                    Featured
                  </span>
                )}
              </div>

              <p className="text-sm leading-relaxed mb-4 text-white/70 line-clamp-3" itemProp="description">
                {project.description}
              </p>

              <div itemProp="keywords" className="mb-4">
                <p className="text-xs text-white/50 font-mono line-clamp-2">{project.tech}</p>
              </div>

              {project.users && <meta itemProp="interactionCount" content={project.users} />}
              {project.accuracy && <meta itemProp="featureList" content={`${project.accuracy} accuracy`} />}

              <div className="flex gap-4 text-xs font-mono uppercase tracking-wider text-white/60">
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    itemProp="url"
                    aria-label={`View live demo of ${project.title}`}
                    className="hover:text-white transition-colors"
                  >
                    Live →
                  </a>
                )}
                <a
                  href={project.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  itemProp="codeRepository"
                  aria-label={`View source code of ${project.title} on GitHub`}
                  className="hover:text-white transition-colors"
                >
                  Source →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>

    <div className="mt-12 text-center fade-up stagger-4">
      <p className="opacity-70 font-mono">
        <strong>More projects:</strong> View all 50+ repositories on{" "}
        <a
          href="https://github.com/harshpreet931"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View all projects on Harshpreet Singh's GitHub profile"
          className="text-white"
        >
          GitHub →
        </a>
      </p>
    </div>
  </div>
)

export default Works
