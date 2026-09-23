'use client';

import { useEffect, useState } from 'react';

// My name, written stroke by stroke with the same pen centrelines the font
// was built from (see scripts/handwriting-strokes.py). When the last stroke
// lands it is pixel-identical to the name set in Harshpreet Hand Regular.
export function HandwrittenName() {
  const [data, setData] = useState(null);

  // Loaded on demand so no other theme pays for the path data.
  useEffect(() => {
    let live = true;
    import('./nameStrokes').then((m) => {
      if (live) setData(m.NAME_STROKES);
    });
    return () => {
      live = false;
    };
  }, []);

  if (!data) return null;

  const { height, baseline, strokeWidth, gap, words } = data;
  const total = words.reduce((w, word) => w + word.width, 0) + gap * (words.length - 1);
  const widest = Math.max(...words.map((word) => word.width));

  return (
    <div
      className="hw-name"
      aria-hidden="true"
      style={{
        '--hw-name-aspect': total / height,
        '--hw-name-word-aspect': widest / height,
        '--hw-name-gap': gap / height,
        '--hw-name-descent': (height - baseline) / height,
      }}
    >
      {words.map((word, i) => (
        <svg key={i} viewBox={`0 0 ${word.width} ${height}`} strokeWidth={strokeWidth}>
          {word.strokes.map(([d, delay, duration], j) => (
            <path
              key={j}
              d={d}
              pathLength={1}
              style={{ animationDelay: `${delay}ms`, animationDuration: `${duration}ms` }}
            />
          ))}
        </svg>
      ))}
    </div>
  );
}
