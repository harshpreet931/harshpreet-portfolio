'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface TypingAnimationProps {
  text: string
  className?: string
  delay?: number
  speed?: number
  showCursor?: boolean
}

export default function TypingAnimation({ 
  text, 
  className = '', 
  delay = 0, 
  speed = 50,
  showCursor = true 
}: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [showCursorState, setShowCursorState] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => {
      let index = 0
      const typeInterval = setInterval(() => {
        if (index < text.length) {
          setDisplayedText(text.slice(0, index + 1))
          index++
        } else {
          clearInterval(typeInterval)
        }
      }, speed)

      return () => clearInterval(typeInterval)
    }, delay)

    return () => clearTimeout(timeout)
  }, [text, delay, speed])

  useEffect(() => {
    if (showCursor) {
      const cursorInterval = setInterval(() => {
        setShowCursorState(prev => !prev)
      }, 530)

      return () => clearInterval(cursorInterval)
    }
  }, [showCursor])

  return (
    <span className={className}>
      {displayedText}
      {showCursor && (
        <motion.span
          animate={{ opacity: showCursorState ? 1 : 0 }}
          transition={{ duration: 0.1 }}
          className="inline-block ml-1 w-0.5 h-[1em] bg-black"
        />
      )}
    </span>
  )
}