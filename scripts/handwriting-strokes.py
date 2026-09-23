#!/usr/bin/env python3
"""Render text as the pen strokes of Harshpreet Hand, for a writing animation.

The font in public/fonts is a round nib run along these same centrelines, so an
SVG stroke of the right width over them draws exactly what the font draws. This
script shapes the text with HarfBuzz against the real font (so the calt variant
rotation and kerning match what the browser would render), then emits each
glyph's centrelines as paths with a start delay and duration for every stroke.

Usage (from the repo root; needs numpy, fonttools, uharfbuzz):
  python3 scripts/handwriting-strokes.py ../myHandwriting \
      components/handwriting/nameStrokes.js "Harshpreet Singh"
"""
import json
import os
import sys

import numpy as np
import uharfbuzz as hb
from fontTools.agl import UV2AGL
from fontTools.ttLib import TTFont

# Mirrors pipeline/build_font.py: font units per x-height, side bearings, pens.
S = 440
SB = 0.13 * S
TIGHT = set(".,:;'’‘\"“”!")
PEN = {"Regular": 0.13, "Bold": 0.20}
WEIGHT = "Regular"

# Pen timing, in ms. SPEED is font units per ms (~2 x-heights per 100 ms).
SPEED = 9.0
MIN_STROKE = 55
PEN_UP = 35          # lift between strokes of one letter
LETTER_GAP = 50      # lift between letters
WORD_GAP = 180
DOT_GAP = 90         # travel back to dot the i's once the word is done


def glyph_name(ch):
    cp = ord(ch)
    return UV2AGL.get(cp) or f"uni{cp:04X}"


def rdp(pts, eps):
    """Ramer-Douglas-Peucker: drop points within eps of the simplified line."""
    if len(pts) < 3:
        return pts
    a, b = pts[0], pts[-1]
    ab = b - a
    n = np.hypot(*ab)
    if n == 0:
        d = np.hypot(*(pts - a).T)
    else:
        d = np.abs(ab[0] * (pts[:, 1] - a[1]) - ab[1] * (pts[:, 0] - a[0])) / n
    i = int(np.argmax(d))
    if d[i] <= eps:
        return np.array([a, b])
    return np.vstack([rdp(pts[: i + 1], eps)[:-1], rdp(pts[i:], eps)])


def orient(p):
    """Point a stroke the way a hand would draw it.

    The centrelines come from skeleton tracing, so their direction is arbitrary.
    Mostly-vertical strokes start at the top, mostly-horizontal ones at the left,
    curves at whichever end sits higher. Closed loops keep their direction.
    """
    a, b = p[0], p[-1]
    if np.hypot(*(a - b)) < 0.05 * S:
        return p
    dx, dy = abs(b[0] - a[0]), abs(b[1] - a[1])
    if dx > 2.5 * dy:
        return p if a[0] <= b[0] else p[::-1]
    return p if a[1] >= b[1] else p[::-1]


def main(src_dir, out_path, text):
    glyphs = json.load(open(os.path.join(src_dir, "design", "glyphs.json")))
    ttf = os.path.join(src_dir, "dist", f"HarshpreetHand-{WEIGHT}.ttf")
    tt = TTFont(ttf)
    order = tt.getGlyphOrder()

    variants = {}
    for ch, vs in glyphs.items():
        base = glyph_name(ch)
        for i, v in enumerate(vs):
            variants[base if i == 0 else f"{base}.alt{i}"] = (ch, v["paths"])

    face = hb.Face(hb.Blob.from_file_path(ttf))
    font = hb.Font(face)
    buf = hb.Buffer()
    buf.add_str(text)
    buf.guess_segment_properties()
    hb.shape(font, buf, {"calt": True, "kern": True})

    pen = PEN[WEIGHT] * S
    words, cur, pending, x = [], [], [], 0.0
    for info, pos in zip(buf.glyph_infos, buf.glyph_positions):
        name = order[info.codepoint]
        if name in ("space", "uni00A0"):
            if cur:
                words.append(cur + [pending] if pending else cur)
            cur, pending, x = [], [], 0.0
            continue
        ch, paths = variants[name]
        P = [np.asarray(p, float) * S for p in paths]
        x0 = min(p[:, 0].min() for p in P)
        lsb = SB * (0.45 if ch in TIGHT else 1.0)
        dx = x + pos.x_offset - x0 + lsb
        strokes = [orient(np.c_[p[:, 0] + dx, p[:, 1] + pos.y_offset]) for p in P]
        # Left to right, then top to bottom within a letter (x binned so a stem
        # and the crossbar that starts beside it still go stem-first).
        strokes.sort(key=lambda p: (round(p[0][0] / (0.15 * S)), -p[0][1]))
        # i and j get dotted after the whole word is written, like a real hand.
        dots = [p for p in strokes if ch in "ij" and p[:, 1].min() > 1.2 * S]
        cur.append([p for p in strokes if not any(p is d for d in dots)])
        pending.extend(dots)
        x += pos.x_advance
    if cur:
        words.append(cur + [pending] if pending else cur)

    allpts = np.vstack([p for w in words for g in w for p in g])
    top = allpts[:, 1].max() + pen / 2
    bottom = allpts[:, 1].min() - pen / 2
    height = top - bottom

    t = 0.0
    out_words = []
    for wi, w in enumerate(words):
        if wi:
            t += WORD_GAP
        pts = np.vstack([p for g in w for p in g])
        left = pts[:, 0].min() - pen / 2
        right = pts[:, 0].max() + pen / 2
        strokes = []
        for gi, g in enumerate(w):
            if gi:
                t += LETTER_GAP
            if gi and all(p[:, 1].min() > 1.2 * S for p in g):
                t += DOT_GAP
            for si, p in enumerate(g):
                if si:
                    t += PEN_UP
                length = float(np.sum(np.hypot(*np.diff(p, axis=0).T)))
                dur = max(MIN_STROKE, length / SPEED)
                q = rdp(p, 1.2)
                # SVG space: origin at the top-left of the word's box, y down.
                q = np.c_[q[:, 0] - left, top - q[:, 1]].round().astype(int)
                d = f"M{q[0][0]} {q[0][1]}" + "".join(
                    f"l{b[0] - a[0]} {b[1] - a[1]}" for a, b in zip(q[:-1], q[1:])
                )
                strokes.append([d, round(t), round(dur)])
                t += dur
        out_words.append({"width": round(right - left), "strokes": strokes})

    # Gap between words: the font's space plus the side bearings it sits between.
    gap = 0.72 * S + 2 * SB
    data = {
        "height": round(height),
        "baseline": round(top),
        "strokeWidth": round(pen, 1),
        "gap": round(gap),
        "duration": round(t),
        "words": out_words,
    }
    with open(out_path, "w") as f:
        f.write(
            "// Generated by scripts/handwriting-strokes.py from the pen centrelines of\n"
            f"// Harshpreet Hand {WEIGHT}, text {json.dumps(text)}. Do not edit by hand.\n"
            "// Units are font units (440 per x-height); strokes are [path, delayMs, durationMs].\n"
            f"export const NAME_STROKES = {json.dumps(data, separators=(',', ':'))};\n"
        )
    kb = os.path.getsize(out_path) / 1024
    n = sum(len(w["strokes"]) for w in out_words)
    print(f"{out_path}: {n} strokes, {round(t)} ms, {kb:.1f} KB", file=sys.stderr)


if __name__ == "__main__":
    if len(sys.argv) != 4:
        sys.exit(__doc__)
    main(*sys.argv[1:])
