// Every theme in the switcher. `hand` themes preview their own typeface in
// the menu, which is also what starts that font's download.
export const THEMES = [
  { id: 'handwritten', label: 'Handwritten', color: '#1f2f8c', hand: true },
  { id: 'dark', label: 'Midnight', color: '#0ea5e9' },
  { id: 'obsidian', label: 'Obsidian', color: '#0085FF' },
  { id: 'cerulean', label: 'Cerulean', color: '#635BFF' },
  { id: 'dawn', label: 'Dawn', color: '#A84376' },
  { id: 'cyberpunk', label: 'Cyberpunk', color: '#0ABDC6' },
  { id: 'cocoa', label: 'Cocoa', color: '#D4A574' },
  { id: 'sunshine', label: 'Sunshine', color: '#FFB6C1' },
  { id: 'lavender', label: 'Lavender', color: '#e9d5ff' },
  { id: 'sand', label: 'Sand', color: '#C8956C' },
  { id: 'rose', label: 'Rose', color: '#DE5D83' },
  { id: 'arctic', label: 'Arctic', color: '#0070F3' },
  { id: 'monochrome', label: 'Monochrome', color: '#a3a3a3' },
  { id: 'paper', label: 'Paper', color: '#fdf6e3' },
  { id: 'terminal', label: 'Terminal', color: '#33ff33' },
];

// What a ?theme= link may name: an id or a menu label, lowercased, so
// ?theme=handwritten, ?theme=Midnight and ?theme=dark all work.
export const THEME_BY_NAME = Object.fromEntries(
  THEMES.flatMap((t) => [[t.id, t.id], [t.label.toLowerCase(), t.id]])
);
