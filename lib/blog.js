import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';

const CONTENT_DIR = path.join(process.cwd(), 'content/blog');

export function calculateReadingTime(content) {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} min read`;
}

export function extractHeadings(content) {
  const lines = content.split('\n');
  const headings = [];
  const counts = {};

  for (const line of lines) {
    const match = line.match(/^(#{1,3})\s+(.+)$/);
    if (!match) continue;
    const level = match[1].length;
    const text = match[2].trim();
    const base = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
    counts[base] = (counts[base] || 0) + 1;
    const id = counts[base] > 1 ? `${base}-${counts[base] - 1}` : base;
    headings.push({ level, text, id });
  }
  return headings;
}

export async function getAllPosts() {
  try {
    const files = await fs.readdir(CONTENT_DIR);
    const posts = await Promise.all(
      files
        .filter((f) => f.endsWith('.mdx'))
        .map(async (file) => {
          const slug = file.replace('.mdx', '');
          const raw = await fs.readFile(path.join(CONTENT_DIR, file), 'utf-8');
          const { data } = matter(raw);
          return { slug, ...data };
        })
    );
    return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  } catch {
    return [];
  }
}

export async function getPost(slug) {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  const raw = await fs.readFile(filePath, 'utf-8');
  const { data: frontmatter, content } = matter(raw);
  const readingTime = calculateReadingTime(content);
  const headings = extractHeadings(content);
  return { frontmatter, content, readingTime, headings };
}

export async function getAdjacentPosts(slug) {
  const all = await getAllPosts();
  const idx = all.findIndex((p) => p.slug === slug);
  return {
    prevPost: idx < all.length - 1 ? all[idx + 1] : null,
    nextPost: idx > 0 ? all[idx - 1] : null,
  };
}
