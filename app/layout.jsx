import { Inter, Syne, Space_Mono, Kalam, VT323 } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { Navigation } from '@/components/Navigation';
import { MeshBackground } from '@/components/MeshBackground';
import { Footer } from '@/components/Footer';
import { ThemeProvider } from '@/hooks/ThemeContext';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';

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

const kalam = Kalam({
  subsets: ['latin'],
  variable: '--font-kalam',
  display: 'swap',
  weight: ['300', '400', '700'],
});

const vt323 = VT323({
  subsets: ['latin'],
  variable: '--font-vt323',
  display: 'swap',
  weight: ['400'],
});

export const metadata = {
  metadataBase: new URL('https://harshpreet.com'),
  title: {
    default: 'Harshpreet Singh — Software Engineer',
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
    title: 'Harshpreet Singh — Software Engineer',
    description: 'Software Development Engineer building agentic AI systems. Explore my work in AI, ML, and high-performance systems.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Harshpreet Singh — Software Engineer',
    description: 'Software Development Engineer building agentic AI systems. Explore my work in AI, ML, and high-performance systems.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://harshpreet.com',
    types: {
      'application/rss+xml': 'https://harshpreet.com/feed.xml',
    },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Harshpreet Singh',
  url: 'https://harshpreet.com',
  jobTitle: 'Software Development Engineer',
  worksFor: {
    '@type': 'Organization',
    name: 'Juspay',
  },
  sameAs: [
    'https://linkedin.com/in/harshpreet931',
    'https://github.com/harshpreet931',
    'https://youtube.com/@ThatNotesGuy',
    'https://medium.com/@harshpreet0402',
  ],
  description: 'Software Development Engineer building agentic AI systems and high-performance applications.',
};

// Runs before first paint so the page never flashes the default theme
// while ThemeProvider waits for hydration. Theme list must match
// MONTHLY_THEMES in hooks/ThemeContext.jsx.
const themeInitScript = `(function(){try{var m=['arctic','rose','lavender','sand','sunshine','cyberpunk','cerulean','dark','cocoa','dawn','obsidian','monochrome'];var t=m[new Date().getMonth()];var s=localStorage.getItem('theme-preference');if(s){var p=JSON.parse(s);if(p&&p.theme&&p.month===new Date().getMonth())t=p.theme;}var el=document.documentElement;el.setAttribute('data-theme',t);if(t==='custom'){var c=JSON.parse(localStorage.getItem('custom-theme'));if(c&&c.bg&&c.text){var n=parseInt(c.text.slice(1),16);var r=(n>>16)&255,g=(n>>8)&255,b=n&255;el.style.setProperty('--bg-color',c.bg);el.style.setProperty('--text-color',c.text);el.style.setProperty('--dim-text','rgba('+r+','+g+','+b+',0.65)');el.style.setProperty('--dimmer-text','rgba('+r+','+g+','+b+',0.45)');}}var bg=getComputedStyle(el).getPropertyValue('--bg-color').trim();var mt=document.querySelector('meta[name="theme-color"]');if(mt&&bg)mt.setAttribute('content',bg);}catch(e){}})()`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${syne.variable} ${spaceMono.variable} ${kalam.variable} ${vt323.variable}`}>
      <head>
        <meta name="theme-color" content="#000000" />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
          strategy="afterInteractive"
        />
        <ThemeProvider>
          <a href="#main" className="skip-link">Skip to content</a>
          <div className="relative w-screen h-dvh flex flex-col overflow-hidden p-6 max-sm:p-4">
            <MeshBackground />
            <Navigation />
            <main id="main" className="relative z-10 mt-[4vh] grow">
              {children}
            </main>
            <Footer />
            <ThemeSwitcher />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
