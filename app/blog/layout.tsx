import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog - Harshpreet Singh | Software Engineering Articles & Tutorials",
  description: "Technical blog by Harshpreet Singh covering software engineering, system design, data structures, algorithms, and AI systems. Articles on backtracking, trees, operating systems, and event-driven concurrency.",
  keywords: [
    "Harshpreet Singh Blog",
    "Harsh Blog",
    "Software Engineering Blog",
    "Technical Articles",
    "DSA Tutorials",
    "System Design Articles",
    "Programming Tutorials",
    "ThatNotesGuy",
    "Coding Interviews",
    "Algorithm Tutorials",
  ],
  openGraph: {
    title: "Blog - Harshpreet Singh | Software Engineering Articles & Tutorials",
    description: "Technical articles on software engineering, system design, DSA, and AI by Harshpreet Singh.",
    type: "website",
  },
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
