const skillCategories = [
  { category: "Languages", skills: "JavaScript, Python, Java, C++, C" },
  { category: "Web", skills: "React, Node.js, Next.js, Express, HTML/CSS" },
  { category: "AI/ML", skills: "TensorFlow, PyTorch, Scikit-learn, Pandas, NumPy" },
  { category: "Tools", skills: "Git, VS Code, Firebase, Vercel, Docker, Linux" },
]

const Skills = () => (
  <div id="skills" className="fade-up">
    <h2 className="section-title">Skills</h2>

    <div className="glass-card">
      <div className="space-y-8">
        {skillCategories.map((item, index) => (
          <div key={index} className={`fade-up stagger-${index + 1}`}>
            <div className="flex flex-col md:flex-row gap-4 md:gap-8">
              <div className="md:w-32 flex-shrink-0">
                <span className="text-xl font-semibold font-mono text-white">{item.category}</span>
              </div>
              <div className="flex-1">
                <span className="text-lg opacity-80">{item.skills}</span>
              </div>
            </div>
            {index < skillCategories.length - 1 && <div className="mt-8 h-px bg-white bg-opacity-10"></div>}
          </div>
        ))}
      </div>
    </div>
  </div>
)

export default Skills
