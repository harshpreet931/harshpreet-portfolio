import { useEffect, useState } from 'react';
import { MeshGradient } from '@paper-design/shaders-react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

function useClock() {
  const [time, setTime] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return time.toLocaleTimeString('en-IN', {
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    hour12: false, timeZone: 'Asia/Kolkata',
  });
}


const navCls =
  'bg-transparent border-none font-sans text-[11px] text-white no-underline font-medium cursor-pointer opacity-40 transition-opacity duration-300 p-0 uppercase hover:opacity-100';

const EXPERIENCE_DATA = [
  {
    date: '2025 — Present',
    role: 'SDE Intern @ Juspay',
    description: 'Designed Agentic AutoRCA for automated root cause analysis. Built Juspay Agentic Framework to enable rapid agent development.',
    tags: ['AI', 'Python', 'MCP']
  },
  {
    date: '2024',
    role: 'Internship Trainee @ SCL (Govt. of India)',
    description: 'Developed ARIMA-based forecasting for predicting claims and financial requirements. Worked on data analytics and ML pipelines.',
    tags: ['ML', 'ARIMA', 'Python']
  }
];
const PROJECTS_DATA = [
  {
    id: '01',
    tech: 'Rust / Tauri',
    title: 'Agent Spotlight',
    description: 'Cross-platform desktop AI agent built with Rust and Tauri. MCP integration.',
    link: 'https://github.com/harshpreet931/agent-spotlight'
  },
  {
    id: '02',
    tech: 'TypeScript / Postgres',
    title: "Let's Help Everyone",
    description: 'Platform for CSE students. 200k+ views. Community driven.',
    link: 'https://www.letshelp.co.in/'
  },
  {
    id: '03',
    tech: 'C / ML',
    title: 'Spam Classifier',
    description: 'Lightweight Naive Bayes spam classifier implemented entirely in C.',
    link: 'https://github.com/harshpreet931/Spam-Email-Classification-In-C'
  }
];
const BLOG_DATA = [
  {
    date: 'Feb 28, 2025',
    title: 'All the Operating System Concepts You Need to Know',
    description: 'This article gives you all the information you need to know about Operating Systems and the crucial concepts on them.',
    link: 'https://medium.com/@harshpreet0402/all-the-operating-system-concepts-you-need-to-know-b697bfeb3f9f'
  },
  {
    date: 'Aug 27, 2024',
    title: 'BACKTRACKING in 15 Minutes',
    description: 'This is a ppt I made for the class I never got to present, but I felt it was worthwhile sharing :)!',
    link: 'https://medium.com/@harshpreet0402/backtracking-in-15-minutes-800de323e00f'
  },
  {
    date: 'Jan 6, 2025',
    title: 'Dijkstra’s Algorithm is Actually Super Simple',
    description: 'in short: dijkstra is like BFS, but instead of a queue, we use a priority queue to always expand the node with the smallest current…',
    link: 'https://medium.com/@harshpreet0402/dijkstras-algorithm-is-actually-super-simple-72ad10e3b52b'
  },
  {
    date: 'Jan 3, 2025',
    title: 'why matrix multiplication uses rows and columns?',
    description: 'you know how in school we learn matrix multiplication as taking rows from the first matrix and dotting them with columns from the second…',
    link: 'https://medium.com/@harshpreet0402/why-matrix-multiplication-uses-rows-and-columns-77636880c0b6'
  },
  {
    date: 'Jul 28, 2025',
    title: 'The Hidden Genius of Event Based Concurrency',
    description: 'In the world of concurrent programming, threads are king. We are taught to spin up threads to handle multiple tasks at once…',
    link: 'https://medium.com/@harshpreet0402/the-hidden-genius-of-event-based-concurrency-3f2b81a0847e'
  },
  {
    date: 'Oct 27, 2024',
    title: 'Master Trees: The Complete Guide to Coding Interviews',
    description: 'From basic traversals to complex dynamic programming solutions trees can be found everywhere, yes even in your interviews 😊.',
    link: 'https://medium.com/@harshpreet0402/master-trees-the-complete-guide-to-crush-your-coding-interviews-binary-tree-bonus-interview-a362271544b4'
  }
];

function ExperienceItem({ date, role, description, tags }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="font-mono text-[9px] text-dimmer uppercase tracking-widest">{date}</span>
      <div className="flex flex-col">
        <h3 className="text-sm font-semibold mb-0.5 tracking-tight uppercase">{role}</h3>
        <p className="text-[11px] text-dim leading-snug mb-3">{description}</p>
        <div className="flex gap-2">
          {tags.map(tag => (
            <span key={tag} className="text-[9px] font-mono border border-dimmer/30 px-1.5 py-0.5 rounded text-dimmer uppercase">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectItem({ id, tech, title, description, link }) {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className="flex gap-4 group no-underline">
      <span className="font-mono text-[11px] text-dimmer pt-1">{id}</span>
      <div className="flex flex-col">
        <span className="text-[9px] font-mono text-dimmer uppercase mb-1">{tech}</span>
        <h3 className="text-sm font-semibold mb-1 uppercase tracking-tight group-hover:text-white transition-colors">{title}</h3>
        <p className="text-[11px] text-dim leading-snug">{description}</p>
      </div>
    </a>
  );
}

function BlogItem({ date, title, description, link }) {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className="flex flex-col gap-2 group no-underline">
      <span className="font-mono text-[9px] text-dimmer uppercase tracking-widest">{date}</span>
      <h3 className="text-sm font-semibold mb-0.5 tracking-tight uppercase group-hover:text-white transition-colors">{title}</h3>
      <p className="text-[11px] text-dim leading-snug">{description}</p>
    </a>
  );
}

export default function App() {
  const time = useClock();
  const [view, setView] = useState('home');

  return (
    <>
      <div className="relative w-screen h-screen flex flex-col overflow-hidden p-6 max-sm:p-4">
        <div className="bg absolute inset-0 z-0">
          <MeshGradient
            width={1280}
            height={720}
            style={{ width: '100vw', height: '100vh' }}
            colors={[
              "#000000", 
              view === 'home' ? "#002244" : view === 'work' ? "#001133" : "#003366", 
              "#000000", 
              "#0a0a0a"
            ]}
            distortion={0.3}
            swirl={0.35}
            grainMixer={0.15}
            grainOverlay={0.25}
            speed={0.8}
            scale={1.4}
            rotation={240}
          />
          <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.4)_100%)]" />
        </div>

        <header className="relative z-10 flex justify-between items-start w-full mb-[5vh] max-sm:flex-wrap max-sm:gap-3">
          <motion.div 
            className="text-[11px] font-medium text-white flex-1 max-sm:flex-none max-sm:w-full cursor-pointer"
            onClick={() => setView('home')}
          >
            HS
          </motion.div>

          <nav className="flex items-center gap-4 flex-1 justify-center max-sm:flex-none max-sm:w-full max-sm:justify-start">
            <button 
              className={`${navCls} ${view === 'work' ? '!opacity-100' : ''}`}
              onClick={() => setView(v => v === 'work' ? 'home' : 'work')}
            >
              WORK
            </button>
            <button 
              className={`${navCls} ${view === 'blog' ? '!opacity-100' : ''}`}
              onClick={() => setView(v => v === 'blog' ? 'home' : 'blog')}
            >
              BLOG
            </button>
            <a className={navCls} href="https://www.youtube.com/@ThatNotesGuy" target="_blank" rel="noopener noreferrer">
              VIDEOS ↗
            </a>
          </nav>

          <div className="hidden sm:flex justify-end gap-2 flex-1">
            <a className="text-[8px] text-white no-underline font-medium" href="https://www.linkedin.com/in/harshpreet931" target="_blank" rel="noopener noreferrer">LI</a>
            <a className="text-[8px] text-white no-underline font-medium" href="https://github.com/harshpreet931" target="_blank" rel="noopener noreferrer">GH</a>
            <a className="text-[8px] text-white no-underline font-medium" href="https://leetcode.com/harshpreet931" target="_blank" rel="noopener noreferrer">LC</a>
            <a className="text-[8px] text-white no-underline font-medium" href="https://www.youtube.com/@ThatNotesGuy" target="_blank" rel="noopener noreferrer">YT</a>
            <a className="text-[8px] text-white no-underline font-medium" href="https://medium.com/@harshpreet0402" target="_blank" rel="noopener noreferrer">MD</a> 
          </div>
        </header>

        <div className="relative z-10 mt-[4vh] grow">
          {view === 'home' && (
            <motion.div 
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute inset-0"
            >
              <div className="relative z-10 grid grid-cols-[1fr_1fr_2fr_1fr] gap-5 w-full max-md:grid-cols-2 max-md:gap-y-6 max-sm:grid-cols-1 max-sm:gap-5 max-sm:pb-10">
                <div className="flex flex-col">
                  <span className="text-[11px] text-white">BENGALURU</span>
                  <span className="text-[11px] text-white leading-tight font-normal">{time}</span>
                </div>

                <div className="flex flex-col">
                  <span className="text-[11px] text-white">Harshpreet Singh</span>
                  <p className="text-[11px] text-white leading-tight font-normal">
                    Software Development Engineer.
                  </p>
                </div>

                <div className="flex flex-col">
                  <span className="text-[11px] text-white">Building AI-Native Systems</span>
                  <p className="text-[11px] text-white leading-tight font-normal">
                    I build systems with<br />
                    depth and design.
                  </p>
                </div>

                <div className="flex flex-col">
                  <span className="text-[11px] text-white">CURRENTLY</span>
                  <p className="text-[11px] text-white leading-tight font-normal">SDE Intern @ JUSPAY</p>
                </div>
              </div>
            </motion.div>
          )}

          {view === 'work' && (
            <motion.div 
              key="work"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute inset-0 overflow-y-auto pr-4 scrollbar-hide"
            >
              <div className="grid grid-cols-2 gap-12 w-full max-md:grid-cols-1 max-sm:gap-10 pb-20">
                <div className="flex flex-col gap-10">
                  {EXPERIENCE_DATA.map((exp, idx) => (
                    <ExperienceItem key={idx} {...exp} />
                  ))}
                </div>

                <div className="flex flex-col gap-10">
                  <span className="font-mono text-[9px] text-white uppercase tracking-widest border-b border-dimmer/20 pb-2">Selected Works</span>
                  {PROJECTS_DATA.map((project, idx) => (
                    <ProjectItem key={idx} {...project} />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {view === 'blog' && (
            <motion.div 
              key="blog"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute inset-0 overflow-y-auto pr-4 scrollbar-hide"
            >
              <div className="grid grid-cols-2 gap-12 w-full max-md:grid-cols-1 max-sm:gap-10 pb-20">
                <div className="flex flex-col gap-10">
                  {BLOG_DATA.slice(0, Math.ceil(BLOG_DATA.length / 2)).map((blog, idx) => (
                    <BlogItem key={idx} {...blog} />
                  ))}
                </div>

                <div className="flex flex-col gap-10">
                  {BLOG_DATA.slice(Math.ceil(BLOG_DATA.length / 2)).map((blog, idx) => (
                    <BlogItem key={idx} {...blog} />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>

        <footer className="absolute bottom-0 left-0 right-0 z-10 flex flex-col p-6 max-sm:p-5" style={{ pointerEvents: view === 'home' ? 'auto' : 'none' }}>
          <h1 className="font-display text-[8.4vw] font-extrabold leading-[0.78] tracking-[-0.04em] uppercase text-white w-full flex flex-col max-sm:text-[7.2vw] max-sm:leading-[0.9] max-sm:tracking-[-0.03em]" style={{ opacity: view === 'home' ? 1 : 0.05, transition: 'opacity 0.5s' }}>
            <motion.span
              className="headline-line"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            >
              Harshpreet
            </motion.span>
            <motion.span
              className="headline-line"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            >
              Singh
            </motion.span>
          </h1>
        </footer>
      </div>
    </>
  );
}
