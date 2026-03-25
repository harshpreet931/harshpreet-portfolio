'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navCls =
  'bg-transparent border-none font-sans text-[11px]  no-underline font-medium cursor-pointer opacity-40 transition-opacity duration-300 p-0 uppercase hover:opacity-100';

export function Navigation() {
  const pathname = usePathname();

  return (
    <header className="relative z-10 flex justify-between items-start w-full mb-[5vh] max-sm:flex-wrap max-sm:gap-3">
      <Link
        href="/"
        className="text-[11px] font-medium  flex-1 max-sm:flex-none max-sm:w-full no-underline"
        aria-label="Go to home"
      >
        HS
      </Link>

      <nav className="flex items-center gap-4 flex-1 justify-center max-sm:flex-none max-sm:w-full max-sm:justify-start">
        <Link
          href={pathname === '/work' ? '/' : '/work'}
          className={`${navCls} ${pathname === '/work' ? '!opacity-100' : ''}`}
          aria-label="Toggle work section"
        >
          WORK
        </Link>
        <Link
          href={pathname === '/blog' ? '/' : '/blog'}
          className={`${navCls} ${pathname === '/blog' ? '!opacity-100' : ''}`}
          aria-label="Toggle blog section"
        >
          BLOG
        </Link>
        <a className={navCls} href="https://www.youtube.com/@ThatNotesGuy" target="_blank" rel="noopener noreferrer" aria-label="Videos on YouTube (opens in new tab)">
          VIDEOS ↗
        </a>
      </nav>

      <div className="flex justify-end gap-2 flex-1 max-sm:w-full max-sm:justify-start">
        <a className="text-[8px]  no-underline font-medium" href="https://www.linkedin.com/in/harshpreet931" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">LI</a>
        <a className="text-[8px]  no-underline font-medium" href="https://github.com/harshpreet931" target="_blank" rel="noopener noreferrer" aria-label="GitHub">GH</a>
        <a className="text-[8px]  no-underline font-medium" href="https://leetcode.com/harshpreet931" target="_blank" rel="noopener noreferrer" aria-label="LeetCode">LC</a>
        <a className="text-[8px]  no-underline font-medium" href="https://www.youtube.com/@ThatNotesGuy" target="_blank" rel="noopener noreferrer" aria-label="YouTube">YT</a>
        <a className="text-[8px]  no-underline font-medium" href="https://medium.com/@harshpreet0402" target="_blank" rel="noopener noreferrer" aria-label="Medium">MD</a>
      </div>
    </header>
  );
}
