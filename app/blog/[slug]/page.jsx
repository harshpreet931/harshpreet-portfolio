import { notFound } from 'next/navigation';
import { compileMDX } from 'next-mdx-remote/rsc';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { PageTransition } from '@/components/PageTransition';
import { BlogPostLayout } from '@/components/BlogPostLayout';
import { getPost, getAdjacentPosts, getAllPosts } from '@/lib/blog';

const prettyCodeOptions = {
  theme: {
    dark: 'github-dark-dimmed',
    light: 'github-light',
  },
  keepBackground: true,
  defaultLang: 'plaintext',
};

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    const { frontmatter } = await getPost(slug);
    const url = `https://harshpreet.com/blog/${slug}`;
    const publishedISO = new Date(frontmatter.date).toISOString();

    return {
      title: frontmatter.title,
      description: frontmatter.description,
      keywords: frontmatter.tags,
      authors: [{ name: 'Harshpreet Singh', url: 'https://harshpreet.com' }],
      openGraph: {
        title: frontmatter.title,
        description: frontmatter.description,
        url,
        type: 'article',
        publishedTime: publishedISO,
        authors: ['Harshpreet Singh'],
        tags: frontmatter.tags,
        siteName: 'Harshpreet Singh',
      },
      twitter: {
        card: 'summary_large_image',
        title: frontmatter.title,
        description: frontmatter.description,
        creator: '@harshpreet931',
      },
      alternates: { canonical: url },
    };
  } catch {
    return { title: 'Post Not Found' };
  }
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;

  let post;
  try {
    post = await getPost(slug);
  } catch {
    notFound();
  }

  const { frontmatter, content, readingTime, headings } = post;
  const { prevPost, nextPost } = await getAdjacentPosts(slug);

  const { content: renderedContent } = await compileMDX({
    source: content,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug, [rehypePrettyCode, prettyCodeOptions]],
      },
    },
  });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: frontmatter.title,
    description: frontmatter.description,
    datePublished: new Date(frontmatter.date).toISOString(),
    dateModified: new Date(frontmatter.date).toISOString(),
    author: {
      '@type': 'Person',
      name: 'Harshpreet Singh',
      url: 'https://harshpreet.com',
      sameAs: [
        'https://linkedin.com/in/harshpreet931',
        'https://github.com/harshpreet931',
        'https://medium.com/@harshpreet0402',
      ],
    },
    publisher: {
      '@type': 'Person',
      name: 'Harshpreet Singh',
      url: 'https://harshpreet.com',
    },
    keywords: frontmatter.tags?.join(', '),
    url: `https://harshpreet.com/blog/${slug}`,
    mainEntityOfPage: `https://harshpreet.com/blog/${slug}`,
    ...(frontmatter.mediumUrl && { sameAs: frontmatter.mediumUrl }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageTransition>
        <BlogPostLayout
          frontmatter={frontmatter}
          readingTime={readingTime}
          prevPost={prevPost}
          nextPost={nextPost}
          headings={headings}
        >
          {renderedContent}
        </BlogPostLayout>
      </PageTransition>
    </>
  );
}
