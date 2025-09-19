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
  title: "Harshpreet Singh - SDE Intern @ Juspay",
  description: "Portfolio of Harshpreet Singh, Software Development Engineer Intern at Juspay. Specializing in AI systems, full-stack development, and innovative tech solutions.",
  keywords: ["Harshpreet Singh", "Software Engineer", "Juspay", "AI", "Full-stack", "React", "Next.js", "TypeScript"],
  authors: [{ name: "Harshpreet Singh" }],
  openGraph: {
    title: "Harshpreet Singh - Portfolio",
    description: "SDE Intern @ Juspay",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Harshpreet Singh - Portfolio",
    description: "SDE Intern @ Juspay",
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
