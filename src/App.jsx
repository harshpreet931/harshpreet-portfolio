import { useState } from 'react';
import { MeshGradient } from '@paper-design/shaders-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useClock } from './hooks/useClock';
import { EXPERIENCE_DATA } from './data/experience';
import { PROJECTS_DATA } from './data/projects';
import { BLOG_DATA } from './data/blogs';
import { ExperienceItem } from './components/ExperienceItem';
import { ProjectItem } from './components/ProjectItem';
import { BlogItem } from './components/BlogItem';

const navCls =
  'bg-transparent border-none font-sans text-[11px] text-white no-underline font-medium cursor-pointer opacity-40 transition-opacity duration-300 p-0 uppercase hover:opacity-100';

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
            role="button"
            tabIndex={0}
            aria-label="Go to home"
            onKeyDown={(e) => e.key === 'Enter' && setView('home')}
          >
            HS
          </motion.div>

          <nav className="flex items-center gap-4 flex-1 justify-center max-sm:flex-none max-sm:w-full max-sm:justify-start">
            <button
              className={`${navCls} ${view === 'work' ? '!opacity-100' : ''}`}
              onClick={() => setView(v => v === 'work' ? 'home' : 'work')}
              aria-label="Toggle work section"
              aria-pressed={view === 'work'}
            >
              WORK
            </button>
            <button
              className={`${navCls} ${view === 'blog' ? '!opacity-100' : ''}`}
              onClick={() => setView(v => v === 'blog' ? 'home' : 'blog')}
              aria-label="Toggle blog section"
              aria-pressed={view === 'blog'}
            >
              BLOG
            </button>
            <a className={navCls} href="https://www.youtube.com/@ThatNotesGuy" target="_blank" rel="noopener noreferrer" aria-label="Videos on YouTube (opens in new tab)">
              VIDEOS ↗
            </a>
          </nav>

          <div className="hidden sm:flex justify-end gap-2 flex-1">
            <a className="text-[8px] text-white no-underline font-medium" href="https://www.linkedin.com/in/harshpreet931" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">LI</a>
            <a className="text-[8px] text-white no-underline font-medium" href="https://github.com/harshpreet931" target="_blank" rel="noopener noreferrer" aria-label="GitHub">GH</a>
            <a className="text-[8px] text-white no-underline font-medium" href="https://leetcode.com/harshpreet931" target="_blank" rel="noopener noreferrer" aria-label="LeetCode">LC</a>
            <a className="text-[8px] text-white no-underline font-medium" href="https://www.youtube.com/@ThatNotesGuy" target="_blank" rel="noopener noreferrer" aria-label="YouTube">YT</a>
            <a className="text-[8px] text-white no-underline font-medium" href="https://medium.com/@harshpreet0402" target="_blank" rel="noopener noreferrer" aria-label="Medium">MD</a>
          </div>
        </header>

        <div className="relative z-10 mt-[4vh] grow">
          <AnimatePresence mode="wait">
          {view === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
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
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
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
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
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
          </AnimatePresence>
        </div>

        <footer className="absolute bottom-0 left-0 right-0 z-10 flex flex-col p-6" style={{ pointerEvents: view === 'home' ? 'auto' : 'none' }}>
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
