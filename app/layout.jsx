import { Inter, Syne, Space_Mono } from 'next/font/google';
import './globals.css';
import { Navigation } from '@/components/Navigation';
import { MeshBackground } from '@/components/MeshBackground';
import { Footer } from '@/components/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500'],
});

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
  weight: ['700', '800'],
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  variable: '--font-space-mono',
  display: 'swap',
  weight: ['400'],
});

export const metadata = {
  metadataBase: new URL('https://harshpreet.com'),
  title: {
    default: 'Harshpreet Singh: SDE Intern @Juspay',
    template: '%s: Harshpreet Singh',
  },
  description: 'Harshpreet Singh, Software Development Engineer building agentic AI systems. Explore my work in AI, ML, and high-performance systems.',
  keywords: ['Harshpreet Singh', 'SDE', 'Software Engineer', 'Portfolio', 'AI', 'Machine Learning', 'Juspay', 'Agentic AI', 'Bengaluru'],
  authors: [{ name: 'Harshpreet Singh' }],
  creator: 'Harshpreet Singh',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://harshpreet.com',
    siteName: 'Harshpreet Singh',
    title: 'Harshpreet Singh: SDE Intern @Juspay',
    description: 'Software Development Engineer building agentic AI systems. Explore my work in AI, ML, and high-performance systems.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Harshpreet Singh: SDE Intern @Juspay',
    description: 'Software Development Engineer building agentic AI systems. Explore my work in AI, ML, and high-performance systems.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/logo.svg',
    apple: '/logo.svg',
  },
  alternates: {
    canonical: 'https://harshpreet.com',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Harshpreet Singh',
  url: 'https://harshpreet.com',
  jobTitle: 'Software Development Engineer',
  alumniOf: 'Juspay',
  sameAs: [
    'https://linkedin.com/in/harshpreet931',
    'https://github.com/harshpreet931',
    'https://youtube.com/@ThatNotesGuy',
    'https://medium.com/@harshpreet0402',
  ],
  description: 'Software Development Engineer building agentic AI systems and high-performance applications.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable} ${spaceMono.variable}`}>
      <head>
        <meta name="theme-color" content="#000000" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <div className="relative w-screen h-screen flex flex-col overflow-hidden p-6 max-sm:p-4">
          <MeshBackground />
          <Navigation />
          <div className="relative z-10 mt-[4vh] grow">
            {children}
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
