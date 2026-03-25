'use client';

import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

export function Footer() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <footer className="absolute bottom-0 left-0 right-0 z-10 flex flex-col p-6" style={{ pointerEvents: isHome ? 'auto' : 'none' }}>
      <h1 className="font-display text-[8.4vw] font-extrabold leading-[0.78] tracking-[-0.04em] uppercase w-full flex flex-col max-sm:text-[7.2vw] max-sm:leading-[0.9] max-sm:tracking-[-0.03em]" style={{ opacity: isHome ? 1 : 0.05, transition: 'opacity 0.5s' }}>
        <motion.span
          className="headline-line"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
        >
          Harshpreet
        </motion.span>
        <motion.span
          className="headline-line"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
        >
          Singh
        </motion.span>
      </h1>
    </footer>
  );
}
