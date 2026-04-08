'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { TableOfContents } from '@/components/TableOfContents';

export function BlogPostLayout({ frontmatter, readingTime, prevPost, nextPost, headings, children }) {
  const [progress, setProgress]     = useState(0);
  const [isReading, setIsReading]   = useState(false);
  const [mounted, setMounted]       = useState(false);
  const containerRef                = useRef(null);
  const readingRef                  = useRef(null);

  useEffect(() => { setMounted(true); }, []);

  // Keep body non-scrollable behind overlay (already true globally, but belt-and-suspenders)
  useEffect(() => {
    if (isReading) {
      document.documentElement.classList.add('reading-mode-active');
    } else {
      document.documentElement.classList.remove('reading-mode-active');
    }
    return () => document.documentElement.classList.remove('reading-mode-active');
  }, [isReading]);

  const handleScroll = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const pct = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
    setProgress(Math.min(100, isNaN(pct) ? 0 : pct));
  }, []);

  const handleReadingScroll = useCallback(() => {
    const el = readingRef.current;
    if (!el) return;
    const pct = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
    setProgress(Math.min(100, isNaN(pct) ? 0 : pct));
  }, []);

  const enterReading  = useCallback(() => { setIsReading(true);  setProgress(0); }, []);
  const exitReading   = useCallback(() => { setIsReading(false); setProgress(0); }, []);

  // ─── Shared pieces ────────────────────────────────────────────────────────

  const tagList = (color = 'var(--dimmer-text)', borderColor = 'var(--dimmer-text)') =>
    frontmatter.tags?.length > 0 && (
      <div className="flex flex-wrap gap-2 mb-4">
        {frontmatter.tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-[8px] uppercase tracking-widest px-2 py-0.5 rounded-full border"
            style={{ borderColor, color }}
          >
            {tag}
          </span>
        ))}
      </div>
    );

  const prevNext = (dimColor, textColor, onClick) =>
    (prevPost || nextPost) && (
      <div
        className="mt-20 pt-8 flex justify-between items-start gap-8"
        style={{ borderTop: `1px solid ${dimColor}` }}
      >
        {prevPost ? (
          <Link href={`/blog/${prevPost.slug}`} onClick={onClick}
            className="group flex flex-col gap-1 max-w-[45%]">
            <span className="font-mono text-[8px] uppercase tracking-widest"
              style={{ color: dimColor }}>← Previous</span>
            <span className="text-[11px] transition-transform duration-300 group-hover:translate-x-0.5"
              style={{ color: textColor }}>{prevPost.title}</span>
          </Link>
        ) : <div />}
        {nextPost && (
          <Link href={`/blog/${nextPost.slug}`} onClick={onClick}
            className="group flex flex-col gap-1 text-right max-w-[45%] ml-auto">
            <span className="font-mono text-[8px] uppercase tracking-widest"
              style={{ color: dimColor }}>Next →</span>
            <span className="text-[11px] transition-transform duration-300 group-hover:translate-x-0.5"
              style={{ color: textColor }}>{nextPost.title}</span>
          </Link>
        )}
      </div>
    );

  // ─── Normal view ──────────────────────────────────────────────────────────

  return (
    <>
      <div ref={containerRef} onScroll={handleScroll} className="absolute inset-0 overflow-y-auto">

        {/* Progress bar */}
        <div className="sticky top-0 left-0 right-0 z-50 h-[1.5px]"
          style={{ background: 'var(--dimmer-text)' }}>
          <div className="h-full"
            style={{ width: `${progress}%`, background: 'var(--text-color)', transition: 'width 80ms linear' }} />
        </div>

        <div className="max-w-215 mx-auto px-4 pb-24 pt-8">

          <Link href="/blog"
            className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-widest transition-opacity duration-300 hover:opacity-100 mb-10"
            style={{ color: 'var(--dimmer-text)' }}>
            ← Blog
          </Link>

          <header className="mb-8">
            {tagList()}
            <h1 className="font-display font-bold text-2xl leading-tight tracking-tight mb-3 max-sm:text-xl"
              style={{ color: 'var(--text-color)' }}>
              {frontmatter.title}
            </h1>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 font-mono text-[9px] uppercase tracking-widest"
                style={{ color: 'var(--dimmer-text)' }}>
                <span>{frontmatter.date}</span>
                <span>·</span>
                <span>{readingTime}</span>
              </div>

              {/* Reading mode toggle */}
              <button
                onClick={enterReading}
                className="reading-mode-btn"
                title="Enter focus reading mode"
              >
                Focus Mode
              </button>
            </div>
          </header>

          <div className="mb-10" style={{ borderTop: '1px solid var(--dimmer-text)', opacity: 0.3 }} />

          <div className="flex gap-12 items-start">
            <article className="blog-prose min-w-0 flex-1">{children}</article>
            {headings.filter(h => h.level <= 2).length > 2 && (
              <aside className="hidden lg:block w-45 shrink-0 sticky top-6">
                <TableOfContents headings={headings.filter(h => h.level <= 3)} scrollContainerRef={containerRef} />
              </aside>
            )}
          </div>

          {prevNext('var(--dimmer-text)', 'var(--text-color)', null)}
        </div>
      </div>

      {/* ─── Reading mode overlay (portal) ───────────────────────────────── */}
      {mounted && createPortal(
        <AnimatePresence mode="sync">
          {isReading && (
            <motion.div
              key="reading-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.38, ease: [0.25, 0.1, 0.25, 1] }}
              style={{
                position: 'fixed', inset: 0, zIndex: 9999,
                background: '#0a0a0a',
              }}
            >
              {/* Vignette */}
              <div style={{
                position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1,
                background: 'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 40%, rgba(0,0,0,0.55) 100%)',
              }} />

              {/* Reading progress */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0,
                height: '1.5px', background: 'rgba(255,255,255,0.07)', zIndex: 10,
              }}>
                <div style={{
                  height: '100%', width: `${progress}%`,
                  background: 'rgba(255,255,255,0.5)',
                  transition: 'width 80ms linear',
                }} />
              </div>

              {/* Scrollable content */}
              <motion.div
                ref={readingRef}
                onScroll={handleReadingScroll}
                initial={{ opacity: 0, y: 36, scale: 0.965 }}
                animate={{ opacity: 1, y: 0,  scale: 1 }}
                exit={{    opacity: 0, y: 18,  scale: 0.975 }}
                transition={{ duration: 0.6, delay: 0.04, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position: 'absolute', inset: 0,
                  overflowY: 'auto', zIndex: 2,
                  scrollbarWidth: 'none',
                }}
              >
                <div style={{ maxWidth: '680px', margin: '0 auto', padding: '52px 28px 96px' }}>

                  {/* Exit button */}
                  <motion.button
                    onClick={exitReading}
                    className="reading-mode-exit-btn"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1,  y: 0  }}
                    exit={{    opacity: 0,  y: -8  }}
                    transition={{ delay: 0.18, duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    ← Exit reading mode
                  </motion.button>

                  {/* Tags */}
                  {frontmatter.tags?.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '18px' }}>
                      {frontmatter.tags.map(tag => (
                        <span key={tag} style={{
                          fontFamily: 'var(--font-mono)', fontSize: '8px',
                          textTransform: 'uppercase', letterSpacing: '0.1em',
                          padding: '4px 10px', borderRadius: '999px',
                          border: '1px solid rgba(255,255,255,0.1)',
                          color: 'rgba(255,255,255,0.25)',
                        }}>{tag}</span>
                      ))}
                    </div>
                  )}

                  {/* Title */}
                  <h1 style={{
                    fontFamily: 'var(--font-display)', fontWeight: 800,
                    fontSize: 'clamp(1.45rem, 3.5vw, 2rem)',
                    color: '#f2f2f2', lineHeight: 1.2,
                    letterSpacing: '-0.025em', marginBottom: '12px',
                  }}>
                    {frontmatter.title}
                  </h1>

                  {/* Meta + exit btn */}
                  <div style={{
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'space-between', marginBottom: '40px',
                  }}>
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: '9px',
                      textTransform: 'uppercase', letterSpacing: '0.1em',
                      color: 'rgba(255,255,255,0.22)',
                    }}>
                      {frontmatter.date} · {readingTime}
                    </span>
                  </div>

                  {/* Divider */}
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', marginBottom: '44px' }} />

                  {/* Prose */}
                  <article className="blog-prose blog-prose--reading">
                    {children}
                  </article>

                  {/* Prev / Next */}
                  {prevNext('rgba(255,255,255,0.1)', 'rgba(255,255,255,0.55)', exitReading)}

                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
