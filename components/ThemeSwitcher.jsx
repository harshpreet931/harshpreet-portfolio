'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/hooks/ThemeContext';

const THEMES = [
  { id: 'dark', label: 'Midnight', color: '#0ea5e9' },
  { id: 'obsidian', label: 'Obsidian', color: '#0085FF' },
  { id: 'cerulean', label: 'Cerulean', color: '#635BFF' },
  { id: 'dawn', label: 'Dawn', color: '#A84376' },
  { id: 'cyberpunk', label: 'Cyberpunk', color: '#0ABDC6' },
  { id: 'cocoa', label: 'Cocoa', color: '#D4A574' },
  { id: 'sunshine', label: 'Sunshine', color: '#FFB6C1' },
  { id: 'lavender', label: 'Lavender', color: '#e9d5ff' },
  { id: 'sand', label: 'Sand', color: '#C8956C' },
  { id: 'rose', label: 'Rose', color: '#DE5D83' },
  { id: 'arctic', label: 'Arctic', color: '#0070F3' },
  { id: 'monochrome', label: 'Monochrome', color: '#a3a3a3' },
];

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function ColorPicker({ label, value, onChange }) {
  return (
    <label className="flex items-center justify-between gap-2 px-4 py-1.5">
      <span className="text-[10px] font-mono opacity-60 uppercase">{label}</span>
      <div className="relative">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-6 h-6 rounded-full cursor-pointer border border-dimmer/30 appearance-none bg-transparent [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:rounded-full [&::-webkit-color-swatch]:border-none [&::-moz-color-swatch]:rounded-full [&::-moz-color-swatch]:border-none"
        />
      </div>
    </label>
  );
}

export function ThemeSwitcher() {
  const { theme, setTheme, customColors, setCustomColors, monthlyTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [showCustom, setShowCustom] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const menuRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
        setShowCustom(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isCustom = theme === 'custom';
  const activeTheme = THEMES.find((t) => t.id === theme);
  const activeThemeLabel = isCustom ? 'Custom' : (activeTheme?.label || 'Theme');
  const activeThemeColor = isCustom ? customColors.accent : (activeTheme?.color || '#a3a3a3');
  const currentMonthName = MONTH_NAMES[new Date().getMonth()];
  const monthlyThemeLabel = THEMES.find((t) => t.id === monthlyTheme)?.label || 'Theme';

  return (
    <div className="fixed bottom-6 right-6 max-sm:bottom-4 max-sm:right-4 z-50 flex flex-col items-end" ref={menuRef}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 4 }}
            transition={{ duration: 0.15 }}
            className="mb-2 flex flex-col items-stretch overflow-hidden rounded-xl border shadow-lg max-h-[70vh] overflow-y-auto scrollbar-hide min-w-[180px]"
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
                  setShowCustom(false);
                  setIsOpen(false);
                }}
                className={`flex items-center w-full px-4 py-2 text-left text-[11px] font-mono transition-all duration-300 ${theme === t.id ? 'font-bold' : 'opacity-70 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/5'}`}
              >
                <span
                  className="w-2 h-2 rounded-full shrink-0 mr-2.5"
                  style={{ backgroundColor: t.color }}
                />
                <span className="flex-1">{t.label}</span>
                {t.id === monthlyTheme && (
                  <span className="text-[8px] opacity-40 font-normal ml-3 shrink-0">{currentMonthName}</span>
                )}
              </button>
            ))}

            <div className="border-t border-dimmer/20 my-1" />

            <button
              onClick={() => {
                if (!showCustom) {
                  setShowCustom(true);
                  setCustomColors(customColors);
                } else {
                  setShowCustom(false);
                }
              }}
              className={`flex items-center px-4 py-2 text-left text-[11px] font-mono transition-all duration-300 ${isCustom ? 'font-bold' : 'opacity-70 hover:opacity-100'}`}
            >
              <span
                className="w-2 h-2 rounded-full shrink-0 mr-2.5"
                style={{
                  background: `conic-gradient(#f44, #f0f, #44f, #0ff, #4f4, #ff0, #f44)`,
                }}
              />
              Custom
            </button>

            <AnimatePresence>
              {showCustom && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-dimmer/10 py-1">
                    <ColorPicker
                      label="BG"
                      value={customColors.bg}
                      onChange={(bg) => setCustomColors({ ...customColors, bg })}
                    />
                    <ColorPicker
                      label="Text"
                      value={customColors.text}
                      onChange={(text) => setCustomColors({ ...customColors, text })}
                    />
                    <ColorPicker
                      label="Accent"
                      value={customColors.accent}
                      onChange={(accent) => setCustomColors({ ...customColors, accent })}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => { setIsOpen(!isOpen); setShowIntro(false); }}
        className="flex items-center rounded-full max-sm:w-8 max-sm:h-8 max-sm:justify-center max-sm:p-0 px-4 py-2 border text-[11px] font-mono transition-colors duration-500 opacity-70 hover:opacity-100 overflow-hidden"
        style={{
          borderColor: 'var(--border-color, rgba(128,128,128,0.2))',
          backgroundColor: 'var(--bg-glass, rgba(255,255,255,0.1))',
          backdropFilter: 'blur(10px)',
        }}
        layout
        transition={{ layout: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } }}
        aria-label="Toggle theme menu"
      >
        <span
          className="w-2 h-2 rounded-full shrink-0 max-sm:mr-0 mr-2 transition-colors duration-300"
          style={{ backgroundColor: activeThemeColor }}
        />
        <span className="whitespace-nowrap flex items-center overflow-hidden max-sm:hidden">
          <motion.span
            animate={{
              width: showIntro ? 'auto' : 0,
              opacity: showIntro ? 1 : 0,
              marginRight: showIntro ? 4 : 0,
            }}
            initial={false}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="inline-block overflow-hidden whitespace-nowrap"
          >
            This month&apos;s theme is
          </motion.span>
          <span>{showIntro ? monthlyThemeLabel + '!' : activeThemeLabel}</span>
        </span>
      </motion.button>
    </div>
  );
}
