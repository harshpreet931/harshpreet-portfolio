'use client';

import { useEffect, useRef, useState } from 'react';

export function TableOfContents({ headings, scrollContainerRef }) {
  const [activeId, setActiveId] = useState('');
  const navRef = useRef(null);
  const itemRefs = useRef({});

  // Track active heading by listening to the scroll container
  useEffect(() => {
    if (!headings.length) return;

    const getContainer = () => scrollContainerRef?.current ?? window;

    const handleScroll = () => {
      const container = scrollContainerRef?.current;
      // Threshold: 30% down from the top of the scroll container
      const threshold = container
        ? container.getBoundingClientRect().top + container.clientHeight * 0.3
        : window.innerHeight * 0.3;

      let active = headings[0]?.id ?? '';
      for (const { id } of headings) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= threshold) {
          active = id;
        } else {
          break;
        }
      }
      setActiveId(active);
    };

    const container = getContainer();
    container.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // set initial active on mount

    return () => container.removeEventListener('scroll', handleScroll);
  }, [headings, scrollContainerRef]);

  // Auto-scroll the TOC to keep active item visible
  useEffect(() => {
    if (!activeId || !navRef.current || !itemRefs.current[activeId]) return;
    const nav = navRef.current;
    const item = itemRefs.current[activeId];
    const navTop = nav.scrollTop;
    const navBottom = navTop + nav.clientHeight;
    const itemTop = item.offsetTop;
    const itemBottom = itemTop + item.clientHeight;

    if (itemTop < navTop || itemBottom > navBottom) {
      nav.scrollTo({ top: itemTop - nav.clientHeight / 2, behavior: 'smooth' });
    }
  }, [activeId]);

  if (!headings.length) return null;

  return (
    <nav>
      <p className="font-mono text-[8px] uppercase tracking-widest mb-3" style={{ color: 'var(--dimmer-text)' }}>
        On this page
      </p>
      <div
        ref={navRef}
        className="flex flex-col gap-2"
        style={{ maxHeight: 'calc(100vh - 120px)', overflowY: 'auto', scrollbarWidth: 'none' }}
      >
        {headings.map(({ id, text, level }) => (
          <a
            key={id}
            ref={(el) => { itemRefs.current[id] = el; }}
            href={`#${id}`}
            className="block font-mono text-[8px] uppercase tracking-wide leading-relaxed transition-all duration-300 hover:opacity-100"
            style={{
              paddingLeft: level === 3 ? '0.75rem' : '0',
              opacity: activeId === id ? 1 : 0.35,
              color: 'var(--text-color)',
            }}
          >
            {text}
          </a>
        ))}
      </div>
    </nav>
  );
}
