import Link from 'next/link';
import { getAllPosts, getAllTags } from '@/lib/blog';
import { BlogItem } from '@/components/BlogItem';
import { PageTransition } from '@/components/PageTransition';
import { FadeIn } from '@/components/FadeIn';

export const metadata = {
  title: 'Blog',
  description: 'Technical articles by Harshpreet Singh on operating systems, algorithms, data structures, concurrency, and AI.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Harshpreet Singh',
    title: 'Blog: Harshpreet Singh',
    description: 'Technical articles on algorithms, systems, and AI.',
    url: 'https://harshpreet.com/blog',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog: Harshpreet Singh',
    description: 'Technical articles on algorithms, systems, and AI.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://harshpreet.com/blog',
  },
};

export default async function BlogPage() {
  const [posts, tags] = await Promise.all([getAllPosts(), getAllTags()]);

  return (
    <PageTransition>
      <h1 className="sr-only">Blog</h1>
      <div className="absolute inset-0 overflow-y-auto pr-4 scrollbar-hide">
        {tags.length > 0 && (
          <FadeIn delay={0.02}>
            <div className="flex flex-wrap gap-2 mb-10">
              {tags.map(({ slug, tag }) => (
                <Link
                  key={slug}
                  href={`/blog/tag/${slug}`}
                  className="text-[9px] font-mono border border-dimmer/30 px-1.5 py-0.5 rounded text-dimmer uppercase hover:border-current hover:text-dim transition-all duration-400 ease-out"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </FadeIn>
        )}
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
