'use client';

import { motion } from 'framer-motion';
import { useClock } from '@/hooks/useClock';

export function HomeContent() {
  const time = useClock();

  return (
    <motion.div
      key="home"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-0"
    >
      <div className="relative z-10 grid grid-cols-[1fr_1fr_2fr_1fr] gap-5 w-full max-md:grid-cols-2 max-md:gap-y-6 max-sm:grid-cols-1 max-sm:gap-5 max-sm:pb-10">
        <div className="flex flex-col">
          <span className="text-[11px] text-white">BENGALURU</span>
          <span className="text-[11px] text-white leading-tight font-normal">{time}</span>
        </div>

        <div className="flex flex-col">
          <span className="text-[11px] text-white">Harshpreet Singh</span>
          <p className="text-[11px] text-white leading-tight font-normal">
            Software Development Engineer.
          </p>
        </div>

        <div className="flex flex-col">
          <span className="text-[11px] text-white">Building AI-Native Systems</span>
          <p className="text-[11px] text-white leading-tight font-normal">
            I build systems with<br />
            depth and design.
          </p>
        </div>

        <div className="flex flex-col">
          <span className="text-[11px] text-white">CURRENTLY</span>
          <p className="text-[11px] text-white leading-tight font-normal">SDE Intern @ JUSPAY</p>
        </div>
      </div>
    </motion.div>
  );
}
