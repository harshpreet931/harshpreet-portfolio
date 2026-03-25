'use client';

import { motion } from 'framer-motion';
import { useClock } from '@/hooks/useClock';

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.1,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] },
  },
};

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
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="relative z-10 grid grid-cols-[1fr_1fr_2fr_1fr] gap-5 w-full max-md:grid-cols-2 max-md:gap-y-6 max-sm:grid-cols-1 max-sm:gap-5 max-sm:pb-10"
      >
        <motion.div variants={fadeUp} className="flex flex-col">
          <span className="text-[11px] ">BENGALURU</span>
          <span className="text-[11px]  leading-tight font-normal">{time}</span>
        </motion.div>

        <motion.div variants={fadeUp} className="flex flex-col">
          <span className="text-[11px] ">Harshpreet Singh</span>
          <p className="text-[11px]  leading-tight font-normal">
            Software Development Engineer.
          </p>
        </motion.div>

        <motion.div variants={fadeUp} className="flex flex-col">
          <span className="text-[11px] ">Building AI-Native Systems</span>
          <p className="text-[11px]  leading-tight font-normal">
            I build systems with<br />
            depth and design.
          </p>
        </motion.div>

        <motion.div variants={fadeUp} className="flex flex-col">
          <span className="text-[11px] ">CURRENTLY</span>
          <p className="text-[11px]  leading-tight font-normal">SDE Intern @ JUSPAY</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
