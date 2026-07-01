'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
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

// Determined synchronously at state-init time (not in an effect) so there's
// a single source of truth for the initial theme — no race between a
// "load from localStorage" effect and an "apply theme" effect that would
// otherwise briefly apply/persist the wrong (default) theme first.
function getInitialTheme() {
  if (typeof window === 'undefined') return getMonthlyTheme();
  try {
    const saved = localStorage.getItem('theme-preference');
    if (!saved) return getMonthlyTheme();
    const { theme: savedTheme, month: savedMonth } = JSON.parse(saved);
    return savedMonth === new Date().getMonth() ? savedTheme : getMonthlyTheme();
  } catch {
    return getMonthlyTheme();
  }
}

function getInitialCustomColors() {
  if (typeof window === 'undefined') return DEFAULT_CUSTOM;
  try {
    const saved = localStorage.getItem('custom-theme');
    return saved ? JSON.parse(saved) : DEFAULT_CUSTOM;
  } catch {
    return DEFAULT_CUSTOM;
  }
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(getInitialTheme);
  const [customColors, setCustomColorsState] = useState(getInitialCustomColors);

  useEffect(() => {
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
  }, [theme, customColors]);

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
