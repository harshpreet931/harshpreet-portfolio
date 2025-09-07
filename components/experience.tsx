const experiences = [
  {
    role: "SDE Intern",
    company: "Juspay",
    period: "March 2025–Present",
    description:
      "Building AI Applications for Juspay. Making applications smarter.",
    achievements: [
      "Building Agentic Framework for Juspay",
      "MCPs & Agents for Juspay Internal & External",
      "Building Xyne",
    ],
  },
  {
    role: "Co-Founder",
    company: "Lets Help Everyone",
    period: "2022–Present",
    description: "Leading free educational initiatives in CS & more with 15+ contributors and 200k+ platform views.",
    achievements: ["Built platform from scratch", "Serving 30+ Subjects in CS", "Achieved 200k+ user engagement"],
  },
  {
    role: "Intern",
    company: "SCL (Govt. of India)",
    period: "Summer 2023",
    description: "Developed an ARIMA prediction model for Medical Reimbursements.",
    achievements: [
      "Implemented time series forecasting",
      "Developed an End to End ARIMA model",
      "Achieved high accuracy in predictions",
    ],
  },
]

const Experience = () => (
  <div id="experience" className="fade-up">
    <h2 className="section-title">Experience</h2>

    <div className="space-y-8">
      {experiences.map((exp, index) => (
        <div key={index} className={`glass-card fade-up stagger-${index + 1}`}>
          <div className="mb-6">
            <h3 className="text-2xl font-semibold font-mono mb-2">{exp.role}</h3>
            <div className="flex items-center gap-4 text-lg opacity-80">
              <span className="font-semibold">{exp.company}</span>
              <span className="font-mono text-sm">{exp.period}</span>
            </div>
          </div>

          <p className="text-lg leading-relaxed mb-6 opacity-90">{exp.description}</p>

          <ul className="space-y-3">
            {exp.achievements.map((achievement, i) => (
              <li key={i} className="opacity-80 flex items-start">
                <span className="text-white mr-3">→</span>
                {achievement}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </div>
)

export default Experience
