"use client"

import { useEffect, useState } from "react"

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  if (!isLoading) return null

  return (
    <div className={`loading-screen ${!isLoading ? "fade-out" : ""}`}>
      <div className="loader"></div>
    </div>
  )
}
