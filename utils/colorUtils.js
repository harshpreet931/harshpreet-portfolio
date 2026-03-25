export function hexToRgb(hex) {
  const h = hex.replace('#', '');
  return {
    r: parseInt(h.substring(0, 2), 16),
    g: parseInt(h.substring(2, 4), 16),
    b: parseInt(h.substring(4, 6), 16),
  };
}

export function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map(c => Math.max(0, Math.min(255, Math.round(c))).toString(16).padStart(2, '0')).join('');
}

export function hexToHsl(hex) {
  const { r, g, b } = hexToRgb(hex);
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  if (max === min) return { h: 0, s: 0, l };
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h;
  if (max === rn) h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6;
  else if (max === gn) h = ((bn - rn) / d + 2) / 6;
  else h = ((rn - gn) / d + 4) / 6;
  return { h: h * 360, s, l };
}

export function hslToHex(h, s, l) {
  h = ((h % 360) + 360) % 360;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l - c / 2;
  let r, g, b;
  if (h < 60) { r = c; g = x; b = 0; }
  else if (h < 120) { r = x; g = c; b = 0; }
  else if (h < 180) { r = 0; g = c; b = x; }
  else if (h < 240) { r = 0; g = x; b = c; }
  else if (h < 300) { r = x; g = 0; b = c; }
  else { r = c; g = 0; b = x; }
  return rgbToHex((r + m) * 255, (g + m) * 255, (b + m) * 255);
}

export function isColorDark(hex) {
  const { r, g, b } = hexToRgb(hex);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance < 0.5;
}

export function generateDimColors(textHex) {
  const { r, g, b } = hexToRgb(textHex);
  return {
    dim: `rgba(${r}, ${g}, ${b}, 0.65)`,
    dimmer: `rgba(${r}, ${g}, ${b}, 0.35)`,
  };
}

export function generateMeshColors(bgHex) {
  const { h, s, l } = hexToHsl(bgHex);
  const dark = isColorDark(bgHex);

  if (dark) {
    return [
      bgHex,
      hslToHex(h + 15, Math.min(s + 0.15, 1), Math.min(l + 0.08, 0.4)),
      hslToHex(h - 10, Math.min(s + 0.2, 1), Math.min(l + 0.12, 0.45)),
      hslToHex(h + 30, Math.min(s + 0.1, 1), Math.min(l + 0.05, 0.35)),
    ];
  }
  return [
    bgHex,
    hslToHex(h + 20, Math.max(s - 0.05, 0), Math.max(l - 0.05, 0.7)),
    hslToHex(h - 15, Math.min(s + 0.1, 1), Math.max(l - 0.03, 0.75)),
    hslToHex(h + 40, Math.max(s - 0.1, 0), l),
  ];
}
