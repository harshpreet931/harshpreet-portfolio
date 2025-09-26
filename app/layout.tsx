import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
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
  title: "Harshpreet Singh - SDE Intern @ Juspay",
  description: "SDE Intern @ Juspay with a passion for building innovative AI solutions.",
  icons: {
    icon: [
      { url: "/logo.svg", type: "image/svg+xml" },
    ],
    apple: "/logo.svg",
    shortcut: "/logo.svg",
  },
  openGraph: {
    title: "Harshpreet Singh - SDE Intern @ Juspay",
    description: "SDE Intern @ Juspay with a passion for building innovative AI solutions.",
    images: [
      {
        url: "/logo.svg",
        width: 1200,
        height: 630,
        alt: "Harshpreet Singh Portfolio",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Harshpreet Singh - SDE Intern @ Juspay",
    description: "SDE Intern @ Juspay with a passion for building innovative AI solutions.",
    images: ["/logo.svg"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
