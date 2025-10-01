import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/private/', '/admin/', '/.git/', '/.next/', '/node_modules/', '/api/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/private/', '/admin/'],
        // Crawl the blog page more frequently for fresh content
        crawlDelay: 1,
      },
      {
        userAgent: 'Googlebot-Image',
        allow: '/',
        crawlDelay: 1,
      },
    ],
    sitemap: 'https://www.harshpreet.com/sitemap.xml',
  }
}