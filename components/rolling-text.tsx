"use client"

interface RollingTextProps {
  text: string
  className?: string
}

export function RollingText({ text, className = "" }: RollingTextProps) {
  return (
    <div className={`relative flex overflow-hidden cursor-default group ${className}`}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="relative flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full"
          style={{ transitionDelay: `${i * 0.03}s` }}
        >
          <span className="h-full flex items-center">{char === " " ? "\u00A0" : char}</span>
          <span className="absolute top-full h-full flex items-center text-accent">
            {char === " " ? "\u00A0" : char}
          </span>
        </span>
      ))}
    </div>
  )
}
