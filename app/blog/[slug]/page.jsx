import { readFileSync } from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import { compileMDX } from 'next-mdx-remote/rsc';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import Image from 'next/image';
import { imageSize } from 'image-size';
import { PageTransition } from '@/components/PageTransition';
import { BlogPostLayout } from '@/components/BlogPostLayout';
import { getPost, getAdjacentPosts, getAllPosts } from '@/lib/blog';

function MdxImage({ src, alt }) {
  if (!src?.startsWith('/')) {
    return <img src={src} alt={alt} loading="lazy" decoding="async" />;
  }
  const { width, height } = imageSize(readFileSync(path.join(process.cwd(), 'public', src)));
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes="(max-width: 768px) 100vw, 860px"
      style={{ width: '100%', height: 'auto' }}
    />
  );
}

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

function getOgImage(frontmatter) {
  if (!frontmatter.image) return [{ url: '/og-image.png', width: 1200, height: 630 }];
  try {
    const { width, height } = imageSize(readFileSync(path.join(process.cwd(), 'public', frontmatter.image)));
    return [{ url: frontmatter.image, width, height }];
  } catch {
    return [{ url: '/og-image.png', width: 1200, height: 630 }];
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    const { frontmatter } = await getPost(slug);
    const url = `https://harshpreet.com/blog/${slug}`;
    const publishedISO = new Date(frontmatter.date).toISOString();
    const images = getOgImage(frontmatter);

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
        images,
      },
      twitter: {
        card: 'summary_large_image',
        title: frontmatter.title,
        description: frontmatter.description,
        creator: '@harshpreet931',
        images: images.map((img) => img.url),
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
    components: {
      img: MdxImage,
    },
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

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://harshpreet.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://harshpreet.com/blog' },
      { '@type': 'ListItem', position: 3, name: frontmatter.title, item: `https://harshpreet.com/blog/${slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
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
