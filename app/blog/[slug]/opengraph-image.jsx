import { ImageResponse } from 'next/og';
import { getPost, calculateReadingTime, getAllPosts } from '@/lib/blog';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

async function loadSyne() {
  try {
    // Use an old browser UA — Google Fonts returns TTF (truetype) instead of
    // WOFF2 for legacy browsers, which is the only format satori / next/og accepts.
    const css = await fetch(
      'https://fonts.googleapis.com/css2?family=Syne:wght@800&display=swap',
      { headers: { 'User-Agent': 'Mozilla/4.0' } }
    ).then((r) => r.text());

    const fontUrl = css.match(/src: url\(([^)]+)\) format\('truetype'\)/)?.[1];
    if (!fontUrl) return null;
    return await fetch(fontUrl).then((r) => r.arrayBuffer());
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function OGImage({ params }) {
  const { slug } = await params;

  let title = 'Blog Post';
  let description = '';
  let date = '';
  let tags = [];
  let readingTime = '';

  try {
    const { frontmatter, content } = await getPost(slug);
    title = frontmatter.title ?? title;
    description = frontmatter.description ?? '';
    date = frontmatter.date ?? '';
    tags = frontmatter.tags ?? [];
    readingTime = calculateReadingTime(content);
  } catch {
    /* fallback to defaults */
  }

  const fontData = await loadSyne();

  // Adaptive title size
  const titleSize = title.length > 65 ? 48 : title.length > 45 ? 58 : 68;

  // Truncate description for OG image
  const shortDesc =
    description.length > 110 ? description.slice(0, 107) + '…' : description;

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: '#080808',
          display: 'flex',
          flexDirection: 'column',
          padding: '56px 72px 52px',
          position: 'relative',
          fontFamily: fontData ? 'Syne' : 'sans-serif',
          overflow: 'hidden',
        }}
      >
        {/* Top-right corner ambient glow */}
        <div
          style={{
            position: 'absolute',
            top: '-120px',
            right: '-120px',
            width: '520px',
            height: '520px',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(255,255,255,0.055) 0%, transparent 65%)',
            display: 'flex',
          }}
        />

        {/* Bottom-left faint glow */}
        <div
          style={{
            position: 'absolute',
            bottom: '-80px',
            left: '-80px',
            width: '320px',
            height: '320px',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(255,255,255,0.025) 0%, transparent 70%)',
            display: 'flex',
          }}
        />

        {/* Left accent bar */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: '72px',
            bottom: '72px',
            width: '2.5px',
            background: 'rgba(255,255,255,0.1)',
            display: 'flex',
          }}
        />

        {/* ── Top row: HS + site URL ── */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              fontSize: '22px',
              fontWeight: '800',
              color: '#ffffff',
              letterSpacing: '-0.03em',
              opacity: 0.9,
            }}
          >
            HS
          </div>
          <div
            style={{
              fontSize: '11px',
              color: 'rgba(255,255,255,0.28)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              fontFamily: 'sans-serif',
            }}
          >
            harshpreet.com / blog
          </div>
        </div>

        {/* ── Tags ── */}
        {tags.length > 0 && (
          <div
            style={{
              display: 'flex',
              gap: '8px',
              marginBottom: '26px',
              flexWrap: 'nowrap',
            }}
          >
            {tags.slice(0, 4).map((tag) => (
              <div
                key={tag}
                style={{
                  fontSize: '10px',
                  color: 'rgba(255,255,255,0.38)',
                  letterSpacing: '0.13em',
                  textTransform: 'uppercase',
                  border: '1px solid rgba(255,255,255,0.12)',
                  padding: '5px 14px',
                  borderRadius: '999px',
                  fontFamily: 'sans-serif',
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        )}

        {/* ── Title ── */}
        <div
          style={{
            fontSize: `${titleSize}px`,
            fontWeight: '800',
            color: '#ffffff',
            lineHeight: 1.14,
            letterSpacing: '-0.028em',
            maxWidth: '1020px',
            flex: 1,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {title}
        </div>

        {/* ── Description ── */}
        {shortDesc && (
          <div
            style={{
              fontSize: '16px',
              color: 'rgba(255,255,255,0.38)',
              lineHeight: 1.55,
              maxWidth: '820px',
              marginTop: '16px',
              marginBottom: '28px',
              fontFamily: 'sans-serif',
              fontWeight: '400',
            }}
          >
            {shortDesc}
          </div>
        )}

        {/* ── Divider ── */}
        <div
          style={{
            width: '100%',
            height: '1px',
            background: 'rgba(255,255,255,0.07)',
            marginBottom: '22px',
            display: 'flex',
          }}
        />

        {/* ── Bottom row: date · time | author ── */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              fontSize: '12px',
              color: 'rgba(255,255,255,0.3)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              fontFamily: 'sans-serif',
            }}
          >
            {[date, readingTime].filter(Boolean).join('  ·  ')}
          </div>
          <div
            style={{
              fontSize: '14px',
              fontWeight: '800',
              color: 'rgba(255,255,255,0.55)',
              letterSpacing: '-0.01em',
            }}
          >
            Harshpreet Singh
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: fontData
        ? [{ name: 'Syne', data: fontData, weight: 800, style: 'normal' }]
        : [],
    }
  );
}
