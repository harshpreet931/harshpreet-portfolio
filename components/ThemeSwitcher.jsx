'use client';

import { useState, useRef, useEffect } from 'react';
import { useTheme } from '@/hooks/ThemeContext';

const THEMES = [
  { id: 'dark', label: 'Midnight' },
  { id: 'sunshine', label: 'Sunshine' },
  { id: 'oceanic', label: 'Oceanic' },
  { id: 'lavender', label: 'Lavender' },
  { id: 'sunset', label: 'Sunset' },
  { id: 'emerald', label: 'Emerald' },
  { id: 'monochrome', label: 'Monochrome' },
];

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const activeThemeLabel = THEMES.find((t) => t.id === theme)?.label || 'Theme';

  return (
    <div className="fixed sm:bottom-6 sm:right-6 max-sm:top-6 max-sm:right-6 z-50 flex max-sm:flex-col-reverse flex-col items-end" ref={menuRef}>
      {isOpen && (
        <div 
          className="sm:mb-2 max-sm:mt-2 flex flex-col items-stretch overflow-hidden rounded-xl border shadow-lg"
          style={{
            borderColor: 'var(--border-color, rgba(128,128,128,0.2))',
            backgroundColor: 'var(--bg-glass, rgba(255,255,255,0.1))',
            backdropFilter: 'blur(16px)',
          }}
        >
          {THEMES.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setTheme(t.id);
                setIsOpen(false);
              }}
              className={`px-4 py-2 text-left text-[11px] font-mono transition-colors ${theme === t.id ? 'font-bold underline' : 'opacity-70 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/5'}`}
            >
              {t.label}
            </button>
          ))}
        </div>
      )}

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full px-4 py-2 border text-[11px] font-mono transition-colors opacity-70 hover:opacity-100"
        style={{
          borderColor: 'var(--border-color, rgba(128,128,128,0.2))',
          backgroundColor: 'var(--bg-glass, rgba(255,255,255,0.1))',
          backdropFilter: 'blur(10px)',
        }}
        aria-label="Toggle theme menu"
      >
        {activeThemeLabel}
      </button>
    </div>
  );
}
