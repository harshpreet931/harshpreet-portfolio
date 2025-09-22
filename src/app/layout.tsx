import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Harshpreet Singh - Software Development Engineer Intern | AI & Full-Stack Developer",
  description: "Harshpreet Singh - SDE Intern at Juspay specializing in AI systems, agentic frameworks, and full-stack development. Building innovative solutions with React, Next.js, and modern technologies.",
  keywords: [
    "Harshpreet Singh", 
    "Software Engineer", 
    "SDE", 
    "Juspay", 
    "AI Developer", 
    "Full-stack Developer", 
    "React", 
    "Next.js", 
    "TypeScript", 
    "JavaScript", 
    "Machine Learning",
    "Agentic AI",
    "Web Development",
    "Portfolio"
  ],
  authors: [{ name: "Harshpreet Singh" }],
  creator: "Harshpreet Singh",
  publisher: "Harshpreet Singh",
  metadataBase: new URL('https://harshpreet.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Harshpreet Singh - Software Development Engineer Intern",
    description: "SDE Intern at Juspay specializing in AI systems and full-stack development. Expert in React, Next.js, and modern web technologies.",
    type: "website",
    siteName: "Harshpreet Singh Portfolio",
    url: "https://harshpreet.com",
    locale: "en_US",
    images: [
      {
        url: "https://harshpreet.com/logo.svg",
        width: 1200,
        height: 630,
        alt: "Harshpreet Singh - Software Development Engineer Intern",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Harshpreet Singh - Software Development Engineer Intern",
    description: "SDE Intern at Juspay specializing in AI systems and full-stack development",
    creator: "@harshpreet931",
    site: "@harshpreet931",
    images: ["https://harshpreet.com/logo.svg"],
  },
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/favicon-16.png" sizes="16x16" type="image/png" />
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="canonical" href="https://harshpreet.com" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
