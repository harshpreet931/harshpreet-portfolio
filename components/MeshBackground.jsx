'use client';

import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';

const MeshGradient = dynamic(
  () => import('@paper-design/shaders-react').then(mod => mod.MeshGradient),
  { ssr: false }
);

export function MeshBackground() {
  const pathname = usePathname();

  const accentColor = pathname === '/' ? '#002244' : pathname === '/work' ? '#001133' : '#003366';

  return (
    <div className="bg absolute inset-0 z-0">
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #000000 0%, #001122 50%, #000000 100%)' }} />
      <MeshGradient
        width={1280}
        height={720}
        style={{ width: '100vw', height: '100vh' }}
        colors={['#000000', accentColor, '#000000', '#0a0a0a']}
        distortion={0.3}
        swirl={0.35}
        grainMixer={0.15}
        grainOverlay={0.25}
        speed={0.8}
        scale={1.4}
        rotation={240}
      />
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.4)_100%)]" />
    </div>
  );
}
