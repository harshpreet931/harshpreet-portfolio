"use client"

import { useState, useEffect } from "react"

export function SwissClock() {
  const [time, setTime] = useState<string>("")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const update = () => {
      const now = new Date()
      // Swiss format: HH:MM:SS (24h)
      setTime(now.toLocaleTimeString('en-GB', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
      }))
    }
    update()
    const i = setInterval(update, 1000)
    return () => clearInterval(i)
  }, [])

  if (!mounted) return <div className="w-[4.5rem]" /> // Prevent hydration mismatch

  return (
    <div className="font-mono text-xs font-bold tracking-widest tabular-nums opacity-50 hover:opacity-100 transition-opacity cursor-default">
      BENGALURU {time}
    </div>
  )
}