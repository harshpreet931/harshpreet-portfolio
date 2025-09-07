const Prologue = () => (
  <div id="about" className="fade-up" itemScope itemType="https://schema.org/AboutPage">
    <h2 className="section-title">About</h2>

    <div className="glass-card">
      <p className="text-xl leading-relaxed mb-8" itemProp="description">
        Final-year Computer Science student at{" "}
        <span itemScope itemType="https://schema.org/EducationalOrganization">
          <span itemProp="name" className="text-white font-semibold">
            Chitkara University
          </span>
        </span>
        , Currently building at{" "}
        <span itemScope itemType="https://schema.org/Organization">
          <span itemProp="name" className="text-white font-semibold">
            Juspay
          </span>
        </span>{" "}
        . Apart from that, Love Anime, Music, and Gaming ;)
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8" itemScope itemType="https://schema.org/ItemList">
        <div itemScope itemType="https://schema.org/ListItem" className="fade-up stagger-1">
          <h3 className="text-xl font-semibold mb-4 font-mono" itemProp="name">
            Production Ready
          </h3>
          <p className="opacity-80" itemProp="description">
            Building high volume AI infrastructure at Juspay & Xyne 
          </p>
          <meta itemProp="position" content="1" />
        </div>

        <div itemScope itemType="https://schema.org/ListItem" className="fade-up stagger-2">
          <h3 className="text-xl font-semibold mb-4 font-mono" itemProp="name">
            Problem Solver
          </h3>
          <p className="opacity-80" itemProp="description">
            1850+ LeetCode rating, 1200+ problems solved, top 5% globally in competitive programming
          </p>
          <meta itemProp="position" content="2" />
        </div>

        <div itemScope itemType="https://schema.org/ListItem" className="fade-up stagger-3">
          <h3 className="text-xl font-semibold mb-4 font-mono" itemProp="name">
            Open Source
          </h3>
          <p className="opacity-80" itemProp="description">
            Co-founded educational platform with 200k+ views, with a team of 15+ contributors
          </p>
          <meta itemProp="position" content="3" />
        </div>

        <div itemScope itemType="https://schema.org/ListItem" className="fade-up stagger-4">
          <h3 className="text-xl font-semibold mb-4 font-mono" itemProp="name">
            Full Stack & AI Systems
          </h3>
          <p className="opacity-80" itemProp="description">
            Expert in React, Node.js, Python, AI/ML, System Design, and Cloud
          </p>
          <meta itemProp="position" content="4" />
        </div>
      </div>
    </div>
  </div>
)

export default Prologue
