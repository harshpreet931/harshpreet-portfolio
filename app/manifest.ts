import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Harshpreet Singh - SDE Intern @Juspay",
    short_name: "Harshpreet Singh",
    description:
      "SDE Intern at Juspay. Expert in React, Node.js, Python, AI/ML. 1800+ LeetCode rating.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    categories: ["business", "productivity", "technology"],
    lang: "en",
    orientation: "portrait-primary",
  }
}
