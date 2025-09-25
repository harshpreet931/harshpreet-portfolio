'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import TypingAnimation from '@/components/TypingAnimation'
import FloatingParticles from '@/components/FloatingParticles'
import MouseTrail from '@/components/MouseTrail'

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('hero')
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isMobileDevice, setIsMobileDevice] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // Detect mobile devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobileDevice('ontouchstart' in window || navigator.maxTouchPoints > 0)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Smooth cursor animation using requestAnimationFrame (desktop only)
  useEffect(() => {
    if (isMobileDevice) return
    
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [isMobileDevice])

  // Keyboard shortcuts for navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.altKey) {
        switch (e.key) {
          case '1':
            setActiveSection('hero')
            e.preventDefault()
            break
          case '2':
            setActiveSection('about')
            e.preventDefault()
            break
          case '3':
            setActiveSection('experience')
            e.preventDefault()
            break
          case '4':
            setActiveSection('projects')
            e.preventDefault()
            break
          case '5':
            setActiveSection('skills')
            e.preventDefault()
            break
          case '6':
            setActiveSection('achievements')
            e.preventDefault()
            break
        }
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  // Smooth scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = (scrollTop / docHeight) * 100
      setScrollProgress(scrollPercent)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigation = [
    { id: 'hero', label: '' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Work' },
    { id: 'skills', label: 'Skills' },
    { id: 'achievements', label: 'Achievements' }
  ]

  const education = [
    {
      institution: 'Chitkara University, Rajpura, Punjab',
      degree: 'Bachelor of Engineering',
      details: 'CGPA: 9.93 (till date)',
      period: '2022 -- Present'
    },
    {
      institution: 'Delhi Public School, Chandigarh',
      degree: 'XII CBSE',
      details: 'Percentage: 82.2%',
      period: '2020 -- 2022'
    },
    {
      institution: 'Learning Paths School, Mohali',
      degree: 'X CBSE',
      details: 'Percentage: 88.4%',
      period: '2010 -- 2020'
    }
  ]

  const experience = [
    {
      company: 'Juspay',
      position: 'SDE Intern',
      location: 'Bengaluru, Karnataka',
      period: 'April 2025 -- Present',
      achievements: [
        'Designed and deployed Agentic AutoRCA, a production-grade multi-agent AI system, automating root cause analysis for failed transactions across Juspay\'s platforms.',
        'Developed the Juspay Agentic Framework, enabling rapid creation of AI-driven agents and internal tooling adopted across teams.',
        'Led cross-team integrations with Xyne, delivering scalable tooling using MCP and Xyne platforms to enhance system observability and collaboration.'
      ]
    },
    {
      company: 'Semi Conductor Laboratory (SCL), MeitY, Government of India',
      position: 'Internship Trainee',
      location: 'Mohali, Punjab',
      period: 'June 2024 - July 2024',
      achievements: [
        'Worked on data analytics and implemented machine learning algorithms.',
        'Developed a robust forecasting model using the ARIMA technique to predict future claims and financial needs.'
      ]
    }
  ]

  const projects = [
    {
      name: 'Let\'s Help Everyone',
      technologies: 'Typescript, Postgres',
      link: 'https://letshelp.co.in/',
      achievements: [
        'Comprehensive solution for CSE Students to get all of their study material.',
        'More than 200,000+ views and 15+ contributors in between May - September 2025.'
      ]
    },
    {
      name: 'Spam Email Classification',
      technologies: 'C, Naive Bayes Algorithm',
      link: 'https://github.com/harshpreet931/Spam-Email-Classification',
      achievements: [
        'Developed a lightweight and efficient spam email classifier using the Naive Bayes algorithm, entirely in C.',
        'Achieved high accuracy in email classification, demonstrating the effectiveness of the Naive Bayes approach in spam detection.'
      ]
    },
    {
      name: 'Agent Spotlight',
      technologies: 'Rust, Tauri, Next.js, React, Tailwind, MCP',
      link: 'https://github.com/harshpreet931/agent-spotlight',
      achievements: [
        'Built a cross-platform desktop AI agent that integrates with local tools, files, and APIs using the Model Context Protocol (MCP).',
        'Delivered native performance with Rust + Tauri, featuring global hotkey access, real-time status updates, and tool automation.',
        'Implemented extensibility for custom MCP servers (e.g., filesystem, Git, databases), enabling seamless developer workflows.'
      ]
    }
  ]

  const skills = {
    languages: 'Java, Python, C, C++, JavaScript, HTML, CSS',
    frameworks: 'React, Node.js, Next.js, Express',
    others: 'Git, Operating Systems, Computer Networks, DataBase Management System',
    softSkills: 'Communication, Leadership, Team Management, Critical Thinking, Problem Solving'
  }

  const achievements = [
    'Honored as Star Programmer and Dean\'s List Member',
    'Recognized as an Academic Achiever in 1st and 2nd Year of Engineering',
    'Admitted into University Coding Academy (Top 3% out of 2400 students)',
    '1850+ LeetCode Rating and Leetcode Knight with 1200+ Questions Solved based on Data structures and Algorithms, 700+ in Java.'
  ]

  const renderSection = () => {
    switch (activeSection) {
      case 'hero':
        return (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="min-h-screen flex items-center justify-center relative overflow-hidden"
          >
            {/* Background elements */}
            <div className="absolute inset-0">
              <div className="absolute top-1/4 left-1/4 w-64 h-64 border border-black/10 rounded-full" />
              <div className="absolute bottom-1/3 right-1/3 w-96 h-96 border border-black/5 rounded-full" />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-black/3 rounded-full" />
            </div>
            
            <div className="relative z-10 text-center max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pt-20 sm:pt-24 md:pt-28">
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.2 }}
              >
                {/* Large decorative elements */}
                <div className="mb-8 sm:mb-10 md:mb-12">
                  <div className="w-16 sm:w-24 md:w-32 h-px bg-black mx-auto mb-6 sm:mb-8" />
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-thin tracking-tighter leading-none mb-2 sm:mb-4 break-words overflow-hidden">
                    <TypingAnimation text="HARSHPREET" delay={800} speed={120} />
                  </h1>
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold tracking-tight leading-none mb-6 sm:mb-8 md:mb-12 break-words overflow-hidden">
                    <TypingAnimation text="SINGH" delay={2000} speed={150} showCursor={false} />
                  </h2>
                  <div className="w-16 sm:w-24 md:w-32 lg:w-48 h-px bg-black mx-auto mb-6 sm:mb-8 md:mb-12 lg:mb-16" />
                </div>
                
                {/* Subtitle with decorative elements */}
                <div className="relative mb-8 sm:mb-12 md:mb-16 lg:mb-20">
                  <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 sm:w-16 md:w-20 h-12 sm:h-16 md:h-20 border border-black/10 rounded-full" />
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl font-light tracking-widest uppercase relative z-10">
                    SDE Intern @ Juspay
                  </p>
                </div>
                
                {/* Social links with minimal presentation */}
                <div className="flex justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-12 mt-6 sm:mt-8 md:mt-12 lg:mt-16">
                  {['LinkedIn', 'GitHub', 'LeetCode'].map((platform, index) => (
                    <motion.a
                      key={platform}
                      href={`https://${
                        platform === 'LinkedIn' ? 'linkedin.com/in/harshpreet931' :
                        platform === 'GitHub' ? 'github.com/harshpreet931' :
                        'leetcode.com/harshpreet931/'
                      }`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-light tracking-widest opacity-60 hover:opacity-100 transition-all duration-300 relative group px-3 py-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 0.6, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                      whileHover={{ 
                        opacity: 1,
                        scale: 1.05,
                        transition: { duration: 0.2 }
                      }}
                      onMouseEnter={() => setIsHovering(true)}
                      onMouseLeave={() => setIsHovering(false)}
                    >
                      <span className="relative z-10">{platform}</span>
                      <div className="absolute inset-0 border border-transparent group-hover:border-black/20 rounded transition-all duration-300"></div>
                    </motion.a>
                  ))}
                </div>
                
                {/* Decorative bottom element with interaction */}
                <div className="mt-8 sm:mt-12 md:mt-16 lg:mt-24">
                  <motion.div 
                    className="w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 border border-black/20 rounded-full mx-auto flex items-center justify-center cursor-pointer group"
                    whileHover={{ scale: 1.1, borderColor: 'rgba(0,0,0,0.4)' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
                    }}
                  >
                    <motion.div 
                      className="w-2 h-2 bg-black rounded-full"
                      whileHover={{ scale: 1.5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )
      
      case 'about':
        return (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="py-16 sm:py-20 md:py-24 lg:py-32"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16">
              {/* Section header with dramatic spacing */}
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-24 text-center"
              >
                <div className="mb-8">
                  <div className="w-24 h-px bg-black mx-auto mb-6" />
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-thin tracking-tight">EDUCATION</h2>
                  <div className="w-32 h-px bg-black mx-auto mt-6" />
                </div>
              </motion.div>
              
              {/* Education cards with sophisticated layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 md:gap-16">
                {education.map((edu, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: index * 0.2 }}
                    className="group relative"
                  >
                    {/* Decorative corner elements */}
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-black/20" />
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-black/20" />
                    
                    <Card className="border-0 shadow-none bg-transparent hover:bg-black/5 transition-all duration-300 p-4 sm:p-6 md:p-8 h-full flex flex-col justify-between">
                      <div>
                        <div className="mb-6">
                          <div className="w-12 h-12 border border-black/10 rounded-full mb-4 flex items-center justify-center">
                            <span className="text-xs font-bold">{index + 1}</span>
                          </div>
                          <h3 className="text-lg sm:text-xl md:text-2xl font-light tracking-wide mb-2">{edu.institution}</h3>
                          <p className="text-sm font-light opacity-70 uppercase tracking-wider mb-1">{edu.degree}</p>
                          <p className="text-xs font-light opacity-50">{edu.period}</p>
                        </div>
                        <p className="text-sm font-light leading-relaxed opacity-80">{edu.details}</p>
                      </div>
                      <div className="mt-8 pt-4 border-t border-black/10">
                        <div className="w-full h-px bg-black opacity-20 group-hover:opacity-60 transition-opacity" />
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )
      
      case 'experience':
        return (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="py-16 sm:py-20 md:py-24 lg:py-32"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16">
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-24 text-center"
              >
                <div className="mb-8">
                  <div className="w-24 h-px bg-black mx-auto mb-6" />
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-thin tracking-tight">EXPERIENCE</h2>
                  <div className="w-32 h-px bg-black mx-auto mt-6" />
                </div>
              </motion.div>
              
              <div className="space-y-12 sm:space-y-16 md:space-y-24">
                {experience.map((exp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.25 }}
                    className="relative group"
                  >
                    {/* Timeline element */}
                    <div className="absolute left-0 top-0 bottom-0 w-px bg-black/10" />
                    
                    <div className="flex flex-col lg:flex-row gap-8 sm:gap-12 md:gap-16 items-start">
                      <div className="lg:w-1/3 relative">
                        <div className="absolute -left-2 top-8 w-4 h-4 bg-black rounded-full" />
                        <div className="bg-black/5 p-4 sm:p-6 md:p-8 rounded-sm">
                          <h3 className="text-xl sm:text-2xl md:text-3xl font-light mb-3 tracking-wide">{exp.position}</h3>
                          <p className="text-base sm:text-lg font-light opacity-80 mb-2">{exp.company}</p>
                          <p className="text-sm font-light opacity-60 mb-1">{exp.location}</p>
                          <p className="text-xs font-light opacity-40 tracking-wider">{exp.period}</p>
                        </div>
                      </div>
                      <div className="lg:w-2/3">
                        <div className="border-l-2 border-black/10 pl-6 sm:pl-8 md:pl-12">
                          <ul className="space-y-6">
                            {exp.achievements.map((achievement, achIndex) => (
                              <li key={achIndex} className="text-sm font-light leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                                <div className="flex items-start gap-4">
                                  <div className="w-1 h-1 bg-black rounded-full mt-2 flex-shrink-0" />
                                  <span>{achievement}</span>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )
      
      case 'projects':
        return (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="py-16 sm:py-20 md:py-24 lg:py-32"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16">
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-24 text-center"
              >
                <div className="mb-8">
                  <div className="w-24 h-px bg-black mx-auto mb-6" />
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-thin tracking-tight">WORK</h2>
                  <div className="w-32 h-px bg-black mx-auto mt-6" />
                </div>
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
                {projects.map((project, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.15 }}
                    className="group cursor-pointer relative"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => window.open(project.link, '_blank')}
                  >
                    <Card className="border-0 shadow-none bg-transparent group-hover:bg-black/3 transition-all duration-500 h-full relative overflow-hidden">
                      <CardContent className="p-4 sm:p-6 md:p-8 relative z-10">
                        {/* Number indicator with enhanced animation */}
                        <div className="mb-6">
                          <motion.div 
                            className="w-16 h-16 border-2 border-black/10 rounded-full flex items-center justify-center group-hover:border-black/30 transition-colors relative"
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                          >
                            <span className="text-lg font-light">{index + 1}</span>
                          </motion.div>
                        </div>
                        
                        {/* Project title with enhanced hover */}
                        <h3 className="text-lg sm:text-xl md:text-2xl font-light tracking-wide mb-3">
                          <span className="relative group-hover:text-black/80 transition-colors">
                            {project.name}
                          </span>
                        </h3>
                        
                        {/* Technologies with subtle animation */}
                        <motion.p 
                          className="text-xs font-light uppercase tracking-wider opacity-50 mb-6 group-hover:opacity-70 transition-opacity"
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 0.5 }}
                          transition={{ delay: 0.2 + index * 0.1 }}
                        >
                          {project.technologies}
                        </motion.p>
                        
                        {/* Achievements with stagger animation */}
                        <ul className="space-y-3 mb-8">
                          {project.achievements.map((achievement, achIndex) => (
                            <motion.li 
                              key={achIndex}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 0.7, x: 0 }}
                              transition={{ delay: 0.3 + achIndex * 0.1 + index * 0.05 }}
                              className="text-xs font-light leading-relaxed opacity-70 group-hover:opacity-90 transition-opacity"
                            >
                              {achievement}
                            </motion.li>
                          ))}
                        </ul>
                        
                        {/* Enhanced arrow indicator */}
                        <div className="flex justify-end">
                          <motion.div 
                            className="w-8 h-8 border border-black/20 rounded-full flex items-center justify-center group-hover:border-black/40 transition-colors"
                            whileHover={{ 
                              scale: 1.2, 
                              rotate: -45,
                              transition: { duration: 0.2 }
                            }}
                          >
                            <span className="text-xs">→</span>
                          </motion.div>
                        </div>
                      </CardContent>
                      
                      {/* Subtle background gradient on hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )
      
      case 'skills':
        return (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="py-16 sm:py-20 md:py-24 lg:py-32"
          >
            <div className="max-w-6xl mx-auto px-4 sm:px-8 md:px-16">
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-24 text-center"
              >
                <div className="mb-8">
                  <div className="w-24 h-px bg-black mx-auto mb-6" />
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-thin tracking-tight">SKILLS</h2>
                  <div className="w-32 h-px bg-black mx-auto mt-6" />
                </div>
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 md:gap-20">
                {Object.entries(skills).map(([key, value], index) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: index * 0.2 }}
                    className="group"
                  >
                    <div className="relative">
                      {/* Decorative line */}
                      <div className="absolute left-0 top-0 w-12 h-px bg-black group-hover:w-24 transition-all duration-400" />
                      
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-light tracking-wide uppercase mb-6 sm:mb-8 mt-4">
                        {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                      </h3>
                      
                      <p className="text-lg font-light leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                        {value}
                      </p>
                      
                      {/* Bottom decorative element */}
                      <div className="mt-12 pt-6 border-t border-black/10">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-px bg-black opacity-30" />
                          <div className="w-2 h-2 bg-black rounded-full opacity-30" />
                          <div className="w-6 h-px bg-black opacity-30" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )
      
      case 'achievements':
        return (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="py-16 sm:py-20 md:py-24 lg:py-32"
          >
            <div className="max-w-5xl mx-auto px-16">
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-24 text-center"
              >
                <div className="mb-8">
                  <div className="w-24 h-px bg-black mx-auto mb-6" />
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-thin tracking-tight">ACHIEVEMENTS</h2>
                  <div className="w-32 h-px bg-black mx-auto mt-6" />
                </div>
              </motion.div>
              
              <div className="space-y-8 sm:space-y-10 md:space-y-12">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, delay: index * 0.15 }}
                    className="group flex items-start gap-8"
                  >
                    {/* Number indicator */}
                    <div className="flex-shrink-0 w-12 h-12 border-2 border-black/20 rounded-full flex items-center justify-center group-hover:border-black/50 transition-colors">
                      <span className="text-sm font-light">{index + 1}</span>
                    </div>
                    
                    {/* Achievement text */}
                    <div className="flex-1 pt-2">
                      <p className="text-lg font-light leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                        {achievement}
                      </p>
                      
                      {/* Decorative line */}
                      <div className="mt-6 w-full h-px bg-black opacity-10 group-hover:opacity-30 transition-opacity" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )
      
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-white text-black overflow-x-hidden relative">
      {/* Floating particles background */}
      <FloatingParticles count={20} />
      
      {/* Mouse trail effect */}
      <MouseTrail />
      
      {/* Smooth cursor using CSS transforms (desktop only) */}
      {!isMobileDevice && (
        <div 
          className="fixed w-8 h-8 border border-black rounded-full pointer-events-none z-50 transition-transform duration-100 ease-out"
          style={{
            left: cursorPosition.x - 16,
            top: cursorPosition.y - 16,
            transform: isHovering ? 'scale(1.3)' : 'scale(1)',
            opacity: isHovering ? 0.4 : 0.15
          }}
        />
      )}
      
      {/* Scroll progress indicator with pulse */}
      <div className="fixed top-0 left-0 w-full h-0.5 bg-black/10 z-40">
        <motion.div 
          className="h-full bg-black transition-all duration-100 ease-out relative"
          style={{ width: `${scrollProgress}%` }}
        >
          {/* Glowing tip */}
          <div className="absolute right-0 top-0 w-2 h-full bg-gradient-to-r from-transparent to-black opacity-60"></div>
        </motion.div>
      </div>
      
      {/* Navigation with keyboard shortcuts */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-b border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16 py-3 sm:py-4 md:py-6">
          <div className="flex justify-between items-center">
            <button 
              onClick={() => setActiveSection('hero')}
              className="text-xs font-light tracking-widest opacity-40 hover:opacity-100 transition-all duration-300 cursor-pointer relative group"
              title="Alt+1"
            >
              <span className="relative z-10">H.S.</span>
              <div className="absolute inset-0 w-8 h-8 border border-transparent group-hover:border-black/20 rounded-full transition-all duration-300 -translate-x-2 -translate-y-1"></div>
            </button>
            <div className="flex gap-2 sm:gap-3 md:gap-6 lg:gap-8 overflow-x-auto">
              {navigation.filter(item => item.label).map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  title={`Alt+${index + 2}`}
                  className={`text-xs font-light tracking-wider transition-all duration-300 relative pb-2 whitespace-nowrap px-2 py-1 group ${
                    activeSection === item.id 
                      ? 'opacity-100' 
                      : 'opacity-30 hover:opacity-100'
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>
                  {activeSection !== item.id && (
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded"></div>
                  )}
                  {activeSection === item.id && (
                    <motion.div 
                      layoutId="navUnderline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"
                      initial={false}
                      transition={{ 
                        type: "spring", 
                        stiffness: 500, 
                        damping: 30 
                      }}
                    />
                  )}
                </button>
              ))}
            </div>
            
            {/* Keyboard shortcut hint */}
            {!isMobileDevice && (
              <div className="hidden lg:block text-xs font-light opacity-20 tracking-wider">
                Alt + 1-6
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main ref={containerRef}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ 
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1]
            }}
          >
            {renderSection()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="py-12 sm:py-16 md:py-20 border-t border-black/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 text-center">
          <div className="mb-8">
            <div className="w-16 h-px bg-black mx-auto mb-4" />
            <p className="text-xs font-light tracking-widest opacity-30">
              2025 Harshpreet Singh
            </p>
          </div>
          <div className="w-8 h-8 border border-black/20 rounded-full mx-auto flex items-center justify-center">
            <div className="w-1 h-1 bg-black rounded-full" />
          </div>
        </div>
      </footer>
    </div>
  )
}