"use client"

import { useState } from "react"

export default function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      const t = setTimeout(() => setCopied(false), 1200)
      return () => clearTimeout(t)
    } catch {
      const el = document.createElement("textarea")
      el.value = email
      document.body.appendChild(el)
      el.select()
      document.execCommand("copy")
      document.body.removeChild(el)
      setCopied(true)
      setTimeout(() => setCopied(false), 1200)
    }
  }

  return (
    <div className="relative inline-flex items-center">
      <button
        type="button"
        onClick={copy}
        className="rounded-md border border-border px-2.5 py-1.5 text-xs font-mono text-muted-foreground hover:text-foreground hover:border-muted-foreground/50 transition-colors"
        aria-label={`Copy email address ${email}`}
        title="Copy email address"
      >
        Copy
      </button>
      <span
        aria-live="polite"
        className={`pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 rounded-md border border-border bg-card px-2 py-1 text-[11px] font-mono text-muted-foreground shadow-sm transition-opacity ${
          copied ? "opacity-100" : "opacity-0"
        }`}
      >
        Copied
      </span>
    </div>
  )
}
