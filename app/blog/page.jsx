import { BLOG_DATA } from '@/data/blogs';
import { BlogItem } from '@/components/BlogItem';
import { PageTransition } from '@/components/PageTransition';

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

export default function BlogPage() {
  return (
    <PageTransition>
      <div className="absolute inset-0 overflow-y-auto pr-4 scrollbar-hide">
        <div className="grid grid-cols-2 gap-12 w-full max-md:grid-cols-1 max-sm:gap-10 pb-20">
          <div className="flex flex-col gap-10">
            {BLOG_DATA.slice(0, Math.ceil(BLOG_DATA.length / 2)).map((blog, idx) => (
              <BlogItem key={idx} {...blog} />
            ))}
          </div>

          <div className="flex flex-col gap-10">
            {BLOG_DATA.slice(Math.ceil(BLOG_DATA.length / 2)).map((blog, idx) => (
              <BlogItem key={idx} {...blog} />
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
