"use client"

import { useRef, useState } from "react"

const CYCLES_PER_LETTER = 2
const SHUFFLE_TIME = 50
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"

export function InteractiveHoverText({ text, className }: { text: string; className?: string }) {
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const [displayText, setDisplayText] = useState(text)

  const stopScramble = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    setDisplayText(text)
  }

  const scramble = () => {
    let pos = 0

    if (intervalRef.current) clearInterval(intervalRef.current)

    intervalRef.current = setInterval(() => {
      const scrambled = text.split("").map((char, index) => {
        if (pos / CYCLES_PER_LETTER > index) {
          return char
        }

        const randomChar = CHARS[Math.floor(Math.random() * CHARS.length)]
        return randomChar
      }).join("")

      setDisplayText(scrambled)
      pos++

      if (pos >= text.length * CYCLES_PER_LETTER) {
        stopScramble()
      }
    }, SHUFFLE_TIME)
  }

  return (
    <span
      onMouseEnter={scramble}
      className={`cursor-default inline-block ${className || ""}`}
    >
      {displayText}
    </span>
  )
}
