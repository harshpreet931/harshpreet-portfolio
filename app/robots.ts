import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/', '/admin/', '/.git/', '/.next/', '/node_modules/'],
    },
    sitemap: 'https://www.harshpreet.com/sitemap.xml',
  }
}