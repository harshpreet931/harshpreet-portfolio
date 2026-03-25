'use client';

import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/hooks/ThemeContext';

const MeshGradient = dynamic(
  () => import('@paper-design/shaders-react').then(mod => mod.MeshGradient),
  { ssr: false }
);

export function MeshBackground() {
  const pathname = usePathname();
  const { theme } = useTheme();

  const darkAccent = pathname === '/' ? '#002244' : pathname === '/work' ? '#001133' : '#003366';

  const themeConfig = {
    dark: {
      colors: ['#000000', '#0ea5e9', '#020617', '#111827'],
      bg: '#000',
      grainMixer: 0.1,
      grainOverlay: 0.1,
      hasDarkOverlay: false,
    },
    sunshine: {
      colors: ['#87CEFA', '#FFB6C1', '#FFFACD', '#FFFFFF'],
      bg: '#f8fafc',
      grainMixer: 0.03,
      grainOverlay: 0.05,
      hasDarkOverlay: false,
    },
    oceanic: {
      colors: ['#0f172a', '#0369a1', '#0891b2', '#1e3a8a'],
      bg: '#020617',
      grainMixer: 0.1,
      grainOverlay: 0.15,
      hasDarkOverlay: true,
    },
    lavender: {
      colors: ['#e9d5ff', '#f3e8ff', '#fbcfe8', '#ffffff'],
      bg: '#faf5ff',
      grainMixer: 0.03,
      grainOverlay: 0.05,
      hasDarkOverlay: false,
    },
    sunset: {
      colors: ['#4c0519', '#be123c', '#f59e0b', '#7c2d12'],
      bg: '#2e090a',
      grainMixer: 0.1,
      grainOverlay: 0.15,
      hasDarkOverlay: true,
    },
    emerald: {
      colors: ['#064e3b', '#047857', '#065f46', '#022c22'],
      bg: '#022c22',
      grainMixer: 0.1,
      grainOverlay: 0.15,
      hasDarkOverlay: true,
    },
    monochrome: {
      colors: ['#e5e5e5', '#f5f5f5', '#d4d4d4', '#ffffff'],
      bg: '#ffffff',
      grainMixer: 0.08,
      grainOverlay: 0.1,
      hasDarkOverlay: false,
    }
  };

  const config = themeConfig[theme] || themeConfig['sunshine'];

  return (
    <div className="bg absolute inset-0 z-0 transition-colors duration-500" style={{ backgroundColor: config.bg }}>
      {config.hasDarkOverlay && <div className="absolute inset-0 z-[1]" style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.8) 100%)' }} />}
      <MeshGradient
        width={1280}
        height={720}
        style={{ width: '100vw', height: '100vh', transition: 'all 0.5s ease' }}
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
