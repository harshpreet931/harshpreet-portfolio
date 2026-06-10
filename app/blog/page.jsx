import { getAllPosts } from '@/lib/blog';
import { BlogItem } from '@/components/BlogItem';
import { PageTransition } from '@/components/PageTransition';
import { FadeIn } from '@/components/FadeIn';

export const metadata = {
  title: 'Blog',
  description: 'Technical articles by Harshpreet Singh on operating systems, algorithms, data structures, concurrency, and AI.',
  openGraph: {
    title: 'Blog: Harshpreet Singh',
    description: 'Technical articles on algorithms, systems, and AI.',
    url: 'https://harshpreet.com/blog',
  },
  alternates: {
    canonical: 'https://harshpreet.com/blog',
  },
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <PageTransition>
      <div className="absolute inset-0 overflow-y-auto pr-4 scrollbar-hide">
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
