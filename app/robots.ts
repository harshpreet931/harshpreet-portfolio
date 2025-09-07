import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/private/", "/admin/", "/_next/", "/api/"],
    },
    sitemap: "https://harshpreet.com/sitemap.xml",
    host: "https://harshpreet.com",
  }
}
