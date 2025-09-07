const Contact = () => (
  <div id="contact" className="fade-up">
    <h2 className="section-title">Contact</h2>

    <div className="glass-card text-center">
      <div className="space-y-8">
        <p className="text-xl">
          <strong className="font-mono">Email:</strong>{" "}
          <a href="mailto:harshpreet0402@gmail.com" className="text-white">
            harshpreet0402@gmail.com
          </a>
        </p>

        <div className="flex gap-8 justify-center text-lg font-mono uppercase tracking-wider">
          <a href="https://github.com/harshpreet931" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href="https://linkedin.com/in/harshpreet931" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href="https://leetcode.com/u/harshpreet931" target="_blank" rel="noopener noreferrer">
            LeetCode
          </a>
        </div>

        <div className="pt-8 border-t border-white border-opacity-20">
          <p className="text-sm opacity-60 font-mono">© 2025 Harshpreet Singh</p>
        </div>
      </div>
    </div>
  </div>
)

export default Contact
