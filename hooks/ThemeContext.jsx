'use client';

import React, { createContext, useContext, useEffect, useLayoutEffect, useState, useCallback } from 'react';
import { MotionConfig } from 'framer-motion';
import { hexToRgb } from '@/utils/colorUtils';

const ThemeContext = createContext();

const MONTHLY_THEMES = [
  'arctic',
  'rose',
  'lavender',
  'sand',
  'sunshine',
  'cyberpunk',
  'cerulean',
  'dark',
  'cocoa',
  'dawn',
  'obsidian',
  'monochrome',
];

function getMonthlyTheme() {
  return MONTHLY_THEMES[new Date().getMonth()];
}

function applyCustomColors(colors) {
  const el = document.documentElement;
  const { r: tr, g: tg, b: tb } = hexToRgb(colors.text);
  el.style.setProperty('--bg-color', colors.bg);
  el.style.setProperty('--text-color', colors.text);
  el.style.setProperty('--dim-text', `rgba(${tr}, ${tg}, ${tb}, 0.65)`);
  el.style.setProperty('--dimmer-text', `rgba(${tr}, ${tg}, ${tb}, 0.45)`);
}

function clearCustomColors() {
  const el = document.documentElement;
  el.style.removeProperty('--bg-color');
  el.style.removeProperty('--text-color');
  el.style.removeProperty('--dim-text');
  el.style.removeProperty('--dimmer-text');
}

function updateThemeColorMeta() {
  const meta = document.querySelector('meta[name="theme-color"]');
  if (!meta) return;
  const bg = getComputedStyle(document.documentElement).getPropertyValue('--bg-color').trim();
  if (bg) meta.setAttribute('content', bg);
}

const DEFAULT_CUSTOM = { bg: '#0B0C10', text: '#E0F7FA', accent: '#0ABDC6' };

function getSavedTheme() {
  try {
    const saved = localStorage.getItem('theme-preference');
    if (!saved) return getMonthlyTheme();
    const { theme: savedTheme, month: savedMonth } = JSON.parse(saved);
    return savedMonth === new Date().getMonth() ? savedTheme : getMonthlyTheme();
  } catch {
    return getMonthlyTheme();
  }
}

function getSavedCustomColors() {
  try {
    const saved = localStorage.getItem('custom-theme');
    return saved ? JSON.parse(saved) : DEFAULT_CUSTOM;
  } catch {
    return DEFAULT_CUSTOM;
  }
}

export function ThemeProvider({ children }) {
  // The first client render has to reproduce the server's HTML, and the server
  // knows neither the saved theme nor today's month (pages are prerendered at
  // build time). So state starts neutral and `ready` stays false until the
  // layout effect below loads the real values, which happens before the first
  // paint. Consumers render theme-neutral output while !ready. The CSS is right
  // all along: themeInitScript in app/layout.jsx set data-theme before paint.
  const [theme, setThemeState] = useState(getMonthlyTheme);
  const [customColors, setCustomColorsState] = useState(DEFAULT_CUSTOM);
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    setThemeState(getSavedTheme());
    setCustomColorsState(getSavedCustomColors());
    setReady(true);
  }, []);

  useEffect(() => {
    // Gated so the placeholder state is never applied or persisted.
    if (!ready) return;
    if (theme === 'custom') {
      document.documentElement.setAttribute('data-theme', 'custom');
      applyCustomColors(customColors);
    } else {
      clearCustomColors();
      document.documentElement.setAttribute('data-theme', theme);
    }
    updateThemeColorMeta();
    localStorage.setItem('theme-preference', JSON.stringify({
      theme,
      month: new Date().getMonth(),
    }));
  }, [theme, customColors, ready]);

  const setTheme = useCallback((t) => {
    setThemeState(t);
  }, []);

  const setCustomColors = useCallback((colors) => {
    setCustomColorsState(colors);
    localStorage.setItem('custom-theme', JSON.stringify(colors));
    setThemeState('custom');
  }, []);

  const value = {
    theme,
    setTheme,
    customColors,
    setCustomColors,
    monthlyTheme: getMonthlyTheme(),
    ready,
  };

  return (
    <ThemeContext.Provider value={value}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
