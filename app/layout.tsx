import type React from "react"
import type { Metadata } from "next"
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google"
import { Analytics } from '@vercel/analytics/react'
import "./globals.css"

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-mono",
  display: "swap",
})

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-sans",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://harshpreet.com"),
  title: {
    default: "Harshpreet Singh",
    template: "%s | Harshpreet Singh",
  },
  description:
    "Harshpreet Singh - SDE Intern at Juspay. 1800+ LeetCode rating, 1200+ problems solved. Expert in React, Node.js, Python, AI/ML.",
  keywords: [
    "Harshpreet Singh",
    "Full Stack Developer",
    "AI Engineer",
    "Software Engineer",
    "React Developer",
    "Node.js Developer",
    "Python Developer",
    "Machine Learning Engineer",
    "LeetCode Expert",
    "Juspay",
    "Payment Systems",
    "Scalable Architecture",
    "Open Source",
    "Computer Science",
    "Chitkara University",
    "SDE Intern",
    "JavaScript",
    "TypeScript",
    "Next.js",
    "MongoDB",
    "PostgreSQL",
    "Docker",
    "Kubernetes",
    "AWS",
    "System Design",
    "Data Structures",
    "Algorithms",
    "Competitive Programming",
    "Software Development",
    "Web Development",
    "Backend Development",
    "Frontend Development",
    "API Development",
    "Microservices",
    "DevOps",
    "Cloud Computing",
    "Database Design",
    "Performance Optimization",
    "Code Review",
    "Agile Development",
    "Scrum",
    "Git",
    "GitHub",
    "LinkedIn",
    "Portfolio",
    "Resume",
    "Hire Developer",
    "Software Jobs",
    "Tech Jobs",
    "Remote Developer",
    "Freelance Developer",
    "Contract Developer",
    "India Developer",
    "Chandigarh Developer",
    "Punjab Developer",
  ],
  authors: [{ name: "Harshpreet Singh", url: "https://harshpreet.com" }],
  creator: "Harshpreet Singh",
  publisher: "Harshpreet Singh",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://harshpreet.com",
    title: "Harshpreet Singh",
    description:
      "SDE Intern at Juspay. 1800+ LeetCode rating, expert in React, Node.js, Python, AI/ML.",
    siteName: "Harshpreet Singh Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Harshpreet Singh - SDE Intern at Juspay",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Harshpreet Singh",
    description:
      "SDE Intern at Juspay. 1800+ LeetCode rating, expert in React, Node.js, Python, AI/ML.",
    images: ["/og-image.jpg"],
    creator: "@harshpreet931",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  alternates: {
    canonical: "https://harshpreet.com",
    languages: {
      "en-US": "https://harshpreet.com",
    },
  },
  category: "technology"
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Harshpreet Singh",
  url: "https://harshpreet.com",
  image: "https://harshpreet.com/profile-image.jpg",
  sameAs: [
    "https://github.com/harshpreet931",
    "https://linkedin.com/in/harshpreet931",
    "https://leetcode.com/u/harshpreet931",
    "https://x.com/2ntotal",
  ],
  jobTitle: "Full Stack Developer & AI Engineer",
  worksFor: {
    "@type": "Organization",
    name: "Juspay",
    url: "https://juspay.in",
  },
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "Chitkara University",
    url: "https://chitkara.edu.in",
  },
  knowsAbout: [
    "Full Stack Development",
    "AI/ML Engineering",
    "React.js",
    "Node.js",
    "Python",
    "JavaScript",
    "TypeScript",
    "System Design",
    "Payment Systems",
    "Scalable Architecture",
    "Open Source Development",
    "Competitive Programming",
    "LeetCode",
    "Data Structures",
    "Algorithms",
  ],
  address: {
    "@type": "PostalAddress",
    addressCountry: "IN",
    addressRegion: "Punjab",
    addressLocality: "Chandigarh",
  },
  hasCredential: [
    {
      "@type": "EducationalOccupationalCredential",
      name: "Bachelor of Engineering in Computer Science",
      educationalLevel: "Undergraduate",
      credentialCategory: "degree",
    },
  ],
  award: ["Smart India Hackathon 2023 Finalist", "LeetCode 1800+ Rating", "Top 5% Global Ranking"],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${ibmPlexMono.variable} ${ibmPlexSans.variable}`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <link rel="canonical" href="https://harshpreet.com" />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Harshpreet Singh" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body>
        {children}
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Harshpreet Singh Portfolio",
              url: "https://harshpreet.com",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://harshpreet.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </body>
    </html>
  )
}
