import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from '@vercel/analytics/react'
import "./globals.css"

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.harshpreet.com'),
  title: {
    default: "Harshpreet Singh - SDE Intern @Juspay | AI & Data Systems Expert",
    template: "%s | Harshpreet Singh"
  },
  description: "Software Development Engineer specializing in production-grade agentic AI systems, developer tooling, and data-driven solutions. Expert in Python, TypeScript, Rust, and Java with experience at Juspay.",
  keywords: [
    "SDE Intern @Juspay",
    "Full Stack Developer",
    "AI Engineer",
    "Machine Learning",
    "Python Developer",
    "TypeScript Developer",
    "Rust Developer",
    "Java Developer",
    "Data Science",
    "Agentic AI",
    "MCP",
    "Developer Tools",
    "Bengaluru",
    "India",
    "Juspay",
    "Portfolio",
    "Backend Developer",
    "Frontend Developer",
    "Web Development",
    "Software Development",
    "Programming",
    "Technology",
    "Computer Science",
    "Engineer",
    "Tech Professional",
    "System Design",
    "Data Structures",
    "Algorithms",
    "Coding Interviews",
    "Technical Blog",
    "Programming Tutorials",
    "Software Engineering Blog",
    "Tech Articles",
    "YouTube Tutorials",
    "Medium Articles",
    "Backtracking Algorithm",
    "Binary Trees",
    "Event-Driven Concurrency",
    "Operating Systems",
    "Microservices",
    "Scalability",
    "ThatNotesGuy"
  ],
  authors: [{ name: "Harshpreet Singh", url: "https://www.harshpreet.com" }],
  creator: "Harshpreet Singh",
  publisher: "Harshpreet Singh",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: "/logo.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "32x32" }
    ],
    apple: "/logo.svg",
    shortcut: "/logo.svg",
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.harshpreet.com",
    siteName: "Harshpreet Singh Portfolio",
    title: "Harshpreet Singh - SDE Intern @Juspay | AI & Data Systems Expert",
    description: "Software Development Engineer specializing in production-grade agentic AI systems, developer tooling, and data-driven solutions. Expert in Python, TypeScript, Rust, and Java.",
    images: [
      {
        url: "https://www.harshpreet.com/logo.svg",
        width: 1200,
        height: 630,
        alt: "Harshpreet Singh - SDE Intern @Juspay Portfolio",
        type: "image/svg+xml",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@harshpreet931",
    creator: "@harshpreet931",
    title: "Harshpreet Singh - SDE Intern @Juspay | AI & Data Systems Expert",
    description: "Software Development Engineer specializing in production-grade agentic AI systems, developer tooling, and data-driven solutions.",
    images: ["https://www.harshpreet.com/logo.svg"],
  },
  verification: {
    google: "your-google-verification-code",
  },
  category: "Technology",
  classification: "Portfolio Website",
  alternates: {
    canonical: "https://www.harshpreet.com",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Harshpreet Singh",
    "url": "https://www.harshpreet.com",
    "image": "https://www.harshpreet.com/og-image.jpg",
    "jobTitle": "Software Development Engineer",
    "worksFor": {
      "@type": "Organization",
      "name": "Juspay",
      "url": "https://juspay.in"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Bengaluru",
      "addressCountry": "India"
    },
    "email": "harshpreet.singh.0402@gmail.com",
    "sameAs": [
      "https://www.linkedin.com/in/harshpreet931/",
      "https://github.com/harshpreet931",
      "https://leetcode.com/u/harshpreet931/",
      "https://medium.com/@harshpreet0402",
      "https://youtube.com/@ThatNotesGuy"
    ],
    "knowsAbout": [
      "Software Development",
      "Artificial Intelligence",
      "Machine Learning",
      "Python Programming",
      "TypeScript",
      "Rust Programming",
      "Java Programming",
      "Data Science",
      "Agentic AI Systems",
      "Web Development",
      "Developer Tools"
    ],
    "description": "Software Development Engineer specializing in production-grade agentic AI systems, developer tooling, and data-driven solutions.",
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "Educational Institution"
    }
  }

  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
