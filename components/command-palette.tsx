"use client"

import { useEffect, useMemo, useRef, useState } from "react"

type CommandItem = {
  id: string
  label: string
  sub?: string
  onSelect: () => void
}

export function CommandPalette({
  open,
  onOpenChange,
  items,
}: {
  open: boolean
  onOpenChange: (v: boolean) => void
  items: CommandItem[]
}) {
  const [query, setQuery] = useState("")
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const listRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        onOpenChange(false)
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [open, onOpenChange])

  useEffect(() => {
    if (open) {
      setQuery("")
      setActiveIndex(0)
      // Focus search on open
      requestAnimationFrame(() => {
        inputRef.current?.focus()
      })
    }
  }, [open])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return items
    return items.filter((it) => it.label.toLowerCase().includes(q) || (it.sub?.toLowerCase().includes(q) ?? false))
  }, [items, query])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!open) return
      if (e.key === "ArrowDown") {
        e.preventDefault()
        setActiveIndex((i) => Math.min(i + 1, Math.max(filtered.length - 1, 0)))
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        setActiveIndex((i) => Math.max(i - 1, 0))
      } else if (e.key === "Enter") {
        e.preventDefault()
        const it = filtered[activeIndex]
        if (it) {
          it.onSelect()
          onOpenChange(false)
        }
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [open, filtered, activeIndex, onOpenChange])

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
      className="fixed inset-0 z-50 flex items-start justify-center bg-background/80 backdrop-blur-sm"
      onClick={() => onOpenChange(false)}
    >
      <div
        className="mt-24 w-full max-w-xl rounded-lg border border-border bg-card shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-b border-border px-4 py-3">
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type to search — jump to a section or open a link"
            className="w-full bg-transparent text-base outline-none placeholder:text-muted-foreground"
            aria-label="Search commands"
          />
        </div>
        <div
          ref={listRef}
          className="max-h-[50vh] overflow-auto py-2"
          role="listbox"
          aria-activedescendant={filtered[activeIndex]?.id}
        >
          {filtered.length === 0 ? (
            <div className="px-4 py-6 text-sm text-muted-foreground">No matches. Try another term.</div>
          ) : (
            filtered.map((it, i) => (
              <button
                key={it.id}
                id={it.id}
                role="option"
                aria-selected={i === activeIndex}
                onMouseEnter={() => setActiveIndex(i)}
                onClick={() => {
                  it.onSelect()
                  onOpenChange(false)
                }}
                className={`w-full text-left px-4 py-3 transition-colors ${
                  i === activeIndex ? "bg-secondary text-foreground" : "hover:bg-secondary/70"
                }`}
              >
                <div className="text-sm">{it.label}</div>
                {it.sub ? <div className="text-xs text-muted-foreground">{it.sub}</div> : null}
              </button>
            ))
          )}
        </div>
        <div className="flex items-center justify-between border-t border-border px-4 py-2 text-xs text-muted-foreground">
          <div>Press Enter to select • Escape to close</div>
          <div className="flex items-center gap-2">
            <kbd className="rounded border border-border px-1.5 py-0.5">↑</kbd>
            <kbd className="rounded border border-border px-1.5 py-0.5">↓</kbd>
            <span>to navigate</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommandPalette
