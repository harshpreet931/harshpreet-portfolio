'use client';

import dynamic from 'next/dynamic';
import { useTheme } from '@/hooks/ThemeContext';
import { generateMeshColors, isColorDark } from '@/utils/colorUtils';

const MeshGradient = dynamic(
  () => import('@paper-design/shaders-react').then(mod => mod.MeshGradient),
  { ssr: false }
);

const themeConfig = {
  dark: {
    colors: ['#000814', '#001d3d', '#003566', '#0ea5e9'],
    bg: '#000',
    grainMixer: 0.1,
    grainOverlay: 0.1,
    hasDarkOverlay: false,
  },
  sunshine: {
    colors: ['#f0f4ff', '#e0e7ff', '#fce7f3', '#fffbeb'],
    bg: '#f8fafc',
    grainMixer: 0.03,
    grainOverlay: 0.05,
    hasDarkOverlay: false,
  },
  lavender: {
    colors: ['#ede9fe', '#e0c3fc', '#f5d0fe', '#fae8ff'],
    bg: '#faf5ff',
    grainMixer: 0.03,
    grainOverlay: 0.05,
    hasDarkOverlay: false,
  },
  monochrome: {
    colors: ['#e5e5e5', '#f5f5f5', '#d4d4d4', '#ffffff'],
    bg: '#ffffff',
    grainMixer: 0.08,
    grainOverlay: 0.1,
    hasDarkOverlay: false,
  },
  obsidian: {
    colors: ['#14171D', '#1a2744', '#0085FF', '#0a1628'],
    bg: '#14171D',
    grainMixer: 0.1,
    grainOverlay: 0.12,
    hasDarkOverlay: false,
  },
  cerulean: {
    colors: ['#0A2540', '#0d3a66', '#635BFF', '#061a30'],
    bg: '#0A2540',
    grainMixer: 0.1,
    grainOverlay: 0.12,
    hasDarkOverlay: true,
  },
  dawn: {
    colors: ['#2A222E', '#4a2d52', '#A84376', '#1e1622'],
    bg: '#2A222E',
    grainMixer: 0.1,
    grainOverlay: 0.12,
    hasDarkOverlay: true,
  },
  cyberpunk: {
    colors: ['#0B0C10', '#711C91', '#0ABDC6', '#EA00D9'],
    bg: '#0B0C10',
    grainMixer: 0.08,
    grainOverlay: 0.1,
    hasDarkOverlay: false,
  },
  sand: {
    colors: ['#F0EEE9', '#e8dfd0', '#d4c5a9', '#f5efe6'],
    bg: '#F0EEE9',
    grainMixer: 0.04,
    grainOverlay: 0.06,
    hasDarkOverlay: false,
  },
  rose: {
    colors: ['#FFF5F5', '#fce7f3', '#f9a8d4', '#fdf2f8'],
    bg: '#FFF5F5',
    grainMixer: 0.03,
    grainOverlay: 0.05,
    hasDarkOverlay: false,
  },
  cocoa: {
    colors: ['#1A1210', '#3d2a1e', '#D4A574', '#2a1c14'],
    bg: '#1A1210',
    grainMixer: 0.1,
    grainOverlay: 0.12,
    hasDarkOverlay: true,
  },
  arctic: {
    colors: ['#F8FAFC', '#e0e7ff', '#bae6fd', '#f0f9ff'],
    bg: '#F8FAFC',
    grainMixer: 0.03,
    grainOverlay: 0.05,
    hasDarkOverlay: false,
  },
  paper: {
    colors: ['#fdf6e3', '#f5e8c7', '#eaf2d3', '#ffffff'],
    bg: '#fdf6e3',
    grainMixer: 0.05,
    grainOverlay: 0.05,
    hasDarkOverlay: false,
  },
  terminal: {
    colors: ['#050505', '#0a0a0a', '#111111', '#001100'],
    bg: '#050505',
    grainMixer: 0.15,
    grainOverlay: 0.15,
    hasDarkOverlay: true,
  },
};

function getCustomConfig(customColors) {
  if (!customColors) return themeConfig.dark;
  const bg = customColors.bg || '#000000';
  const dark = isColorDark(bg);
  return {
    colors: generateMeshColors(bg),
    bg,
    grainMixer: dark ? 0.1 : 0.04,
    grainOverlay: dark ? 0.12 : 0.06,
    hasDarkOverlay: dark,
  };
}

export function MeshBackground() {
  const { theme, customColors } = useTheme();

  const config = theme === 'custom'
    ? getCustomConfig(customColors)
    : (themeConfig[theme] || themeConfig.dark);

  return (
    <div className="bg absolute inset-0 z-0 transition-colors duration-500" style={{ backgroundColor: config.bg }}>
      {config.hasDarkOverlay && <div className="absolute inset-0 z-[1]" style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.8) 100%)' }} />}
      <MeshGradient
        width={1280}
        height={720}
        style={{ width: '100vw', height: '100dvh', transition: 'all 0.5s ease' }}
        colors={config.colors}
        distortion={0.3}
        swirl={0.35}
        grainMixer={config.grainMixer}
        grainOverlay={config.grainOverlay}
        speed={0.8}
        scale={1.4}
        rotation={240}
      />
      {config.hasDarkOverlay && <div className="absolute inset-0 z-[2] bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.4)_100%)]" />}
    </div>
  );
}
