import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Technical Blog - Harshpreet Singh | DSA, System Design, AI/ML Articles",
  description:
    "Technical blog by Harshpreet Singh covering Data Structures & Algorithms, System Design, AI/ML, and Software Engineering. Learn from real-world experience at Juspay and competitive programming insights.",
  keywords: [
    "Technical Blog",
    "Data Structures and Algorithms",
    "System Design",
    "Machine Learning",
    "AI Engineering",
    "Software Engineering",
    "LeetCode Solutions",
    "Programming Tutorials",
    "Backend Development",
    "Payment Systems",
    "Scalable Architecture",
    "Competitive Programming",
    "DSA Tutorial",
    "System Design Interview",
    "ML Algorithms",
    "Python Programming",
    "JavaScript Tutorial",
    "React Development",
    "Node.js Backend",
    "Database Design",
  ],
  openGraph: {
    title: "Technical Blog - Harshpreet Singh | DSA, System Design, AI/ML",
    description:
      "Technical articles on algorithms, system design, and software engineering by Harshpreet Singh, SDE at Juspay with 1800+ LeetCode rating.",
    url: "https://harshpreet.dev/blog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Technical Blog - Harshpreet Singh",
    description: "Technical articles on DSA, System Design, and AI/ML",
  },
  alternates: {
    canonical: "https://harshpreet.dev/blog",
  },
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
