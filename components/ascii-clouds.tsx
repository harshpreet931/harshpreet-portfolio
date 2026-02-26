'use client'

import { useEffect, useRef } from 'react'

interface Cloud {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  chars: string[]
}

export function AsciiClouds() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const cloudsRef = useRef<Cloud[]>([])
  const frameRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()

    // Cloud ASCII patterns
    const cloudPatterns = [
      ['(', '•', ')'],
      ['(', '~', ')'],
      ['[', '~', ']'],
      ['{', '•', '}'],
    ]

    // Initialize clouds
    const initClouds = () => {
      cloudsRef.current = Array.from({ length: 12 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * (canvas.height * 0.6),
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.1,
        size: Math.random() * 40 + 20,
        opacity: Math.random() * 0.4 + 0.3,
        chars: cloudPatterns[Math.floor(Math.random() * cloudPatterns.length)],
      }))
    }

    initClouds()

    // ASCII cloud rendering function
    const drawCloud = (
      x: number,
      y: number,
      size: number,
      opacity: number,
      chars: string[]
    ) => {
      ctx.save()
      ctx.globalAlpha = opacity
      ctx.font = `${size}px monospace`
      ctx.fillStyle = '#06b6d4'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      // Draw cloud with multiple characters for effect
      const spacing = size * 0.8
      for (let i = -2; i <= 2; i++) {
        const charIndex = Math.abs(i) % chars.length
        ctx.fillText(chars[charIndex], x + i * spacing, y)
      }

      ctx.restore()
    }

    // Animation loop
    const animate = () => {
      // Clear canvas with gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      
      if (document.documentElement.classList.contains('dark')) {
        gradient.addColorStop(0, 'rgba(15, 23, 41, 0.8)')
        gradient.addColorStop(0.5, 'rgba(30, 58, 138, 0.4)')
        gradient.addColorStop(1, 'rgba(15, 23, 41, 0.8)')
      } else {
        gradient.addColorStop(0, 'rgba(240, 247, 255, 0)')
        gradient.addColorStop(0.5, 'rgba(224, 242, 254, 0.2)')
        gradient.addColorStop(1, 'rgba(240, 247, 255, 0)')
      }
      
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw clouds
      cloudsRef.current.forEach((cloud) => {
        // Update position
        cloud.x += cloud.vx
        cloud.y += cloud.vy

        // Wrap around screen
        if (cloud.x < -100) cloud.x = canvas.width + 100
        if (cloud.x > canvas.width + 100) cloud.x = -100
        if (cloud.y < -100) cloud.y = canvas.height + 100
        if (cloud.y > canvas.height + 100) cloud.y = -100

        // Gentle bobbing
        cloud.vy += Math.sin(frameRef.current * 0.001 + cloud.x) * 0.01
        cloud.vy *= 0.98

        // Draw cloud
        drawCloud(cloud.x, cloud.y, cloud.size, cloud.opacity, cloud.chars)
      })

      frameRef.current++
      requestAnimationFrame(animate)
    }

    animate()

    // Handle window resize
    window.addEventListener('resize', resizeCanvas)
    return () => window.removeEventListener('resize', resizeCanvas)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ filter: 'drop-shadow(0 0 30px rgba(6, 182, 212, 0.1))' }}
    />
  )
}
