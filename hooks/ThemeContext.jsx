'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
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
  el.style.setProperty('--dimmer-text', `rgba(${tr}, ${tg}, ${tb}, 0.35)`);
}

function clearCustomColors() {
  const el = document.documentElement;
  el.style.removeProperty('--bg-color');
  el.style.removeProperty('--text-color');
  el.style.removeProperty('--dim-text');
  el.style.removeProperty('--dimmer-text');
}

const DEFAULT_CUSTOM = { bg: '#0B0C10', text: '#E0F7FA', accent: '#0ABDC6' };

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(getMonthlyTheme);
  const [customColors, setCustomColorsState] = useState(DEFAULT_CUSTOM);

  useEffect(() => {
    const savedCustom = localStorage.getItem('custom-theme');
    if (savedCustom) {
      try { setCustomColorsState(JSON.parse(savedCustom)); } catch {}
    }

    const saved = localStorage.getItem('theme-preference');
    if (!saved) {
      setThemeState(getMonthlyTheme());
      return;
    }

    try {
      const { theme: savedTheme, month: savedMonth } = JSON.parse(saved);
      const currentMonth = new Date().getMonth();

      if (savedMonth !== currentMonth) {
        setThemeState(getMonthlyTheme());
        localStorage.setItem('theme-preference', JSON.stringify({
          theme: getMonthlyTheme(),
          month: currentMonth,
        }));
      } else {
        setThemeState(savedTheme);
      }
    } catch {
      setThemeState(getMonthlyTheme());
    }
  }, []);

  useEffect(() => {
    if (theme === 'custom') {
      document.documentElement.setAttribute('data-theme', 'custom');
      applyCustomColors(customColors);
    } else {
      clearCustomColors();
      document.documentElement.setAttribute('data-theme', theme);
    }
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

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
