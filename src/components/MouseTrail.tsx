'use client'

import { useEffect, useRef } from 'react'

interface MouseTrailProps {
  className?: string
}

export default function MouseTrail({ className = '' }: MouseTrailProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const trailRef = useRef<Array<{ x: number; y: number; opacity: number }>>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
      
      // Add new trail point
      trailRef.current.unshift({
        x: e.clientX,
        y: e.clientY,
        opacity: 0.3
      })

      // Keep only recent trail points
      if (trailRef.current.length > 15) {
        trailRef.current.pop()
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw trail
      trailRef.current.forEach((point, index) => {
        point.opacity *= 0.95 // Fade out
        
        if (point.opacity > 0.01) {
          ctx.save()
          ctx.globalAlpha = point.opacity
          ctx.beginPath()
          ctx.arc(point.x, point.y, 3 - (index * 0.1), 0, Math.PI * 2)
          ctx.fillStyle = '#000000'
          ctx.fill()
          ctx.restore()
        }
      })

      // Clean up faded points
      trailRef.current = trailRef.current.filter(point => point.opacity > 0.01)

      animationFrameId = requestAnimationFrame(animate)
    }

    // Check if it's not a mobile device
    if (!('ontouchstart' in window)) {
      window.addEventListener('mousemove', handleMouseMove)
      animate()
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-5 ${className}`}
    />
  )
}