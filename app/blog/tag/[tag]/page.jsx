import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllTags, getPostsByTag } from '@/lib/blog';
import { BlogItem } from '@/components/BlogItem';
import { PageTransition } from '@/components/PageTransition';
import { FadeIn } from '@/components/FadeIn';

export async function generateStaticParams() {
  const tags = await getAllTags();
  return tags.map(({ slug }) => ({ tag: slug }));
}

export async function generateMetadata({ params }) {
  const { tag: tagSlug } = await params;
  const tags = await getAllTags();
  const match = tags.find((t) => t.slug === tagSlug);
  if (!match) return { title: 'Tag Not Found' };

  const title = `${match.tag} — Blog`;
  const description = `Posts tagged "${match.tag}" by Harshpreet Singh.`;
  const url = `https://harshpreet.com/blog/tag/${tagSlug}`;

  return {
    title,
    description,
    openGraph: {
      type: 'website',
      locale: 'en_US',
      siteName: 'Harshpreet Singh',
      title,
      description,
      url,
      images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-image.png'],
    },
    alternates: { canonical: url },
  };
}

export default async function BlogTagPage({ params }) {
  const { tag: tagSlug } = await params;
  const tags = await getAllTags();
  const match = tags.find((t) => t.slug === tagSlug);
  if (!match) notFound();

  const posts = await getPostsByTag(tagSlug);

  return (
    <PageTransition>
      <h1 className="sr-only">Blog posts tagged {match.tag}</h1>
      <div className="absolute inset-0 overflow-y-auto pr-4 scrollbar-hide">
        <FadeIn delay={0.02}>
          <div className="flex items-center gap-3 mb-10">
            <Link
              href="/blog"
              className="font-mono text-[9px] uppercase tracking-widest text-dimmer hover:text-dim transition-colors duration-400"
            >
              ← All posts
            </Link>
            <span className="font-mono text-[9px] uppercase tracking-widest text-dimmer">/</span>
            <span className="font-mono text-[9px] uppercase tracking-widest text-dim">{match.tag}</span>
          </div>
        </FadeIn>
        <div className="grid grid-cols-2 gap-12 w-full max-md:grid-cols-1 max-sm:gap-10 pb-20">
          <div className="flex flex-col gap-10">
            {posts.slice(0, Math.ceil(posts.length / 2)).map((post, idx) => (
              <FadeIn key={post.slug} delay={0.1 + idx * 0.08}>
                <BlogItem {...post} />
              </FadeIn>
            ))}
          </div>

          <div className="flex flex-col gap-10">
            {posts.slice(Math.ceil(posts.length / 2)).map((post, idx) => (
              <FadeIn key={post.slug} delay={0.14 + idx * 0.08}>
                <BlogItem {...post} />
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
