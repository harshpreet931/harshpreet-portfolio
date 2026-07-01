import Link from 'next/link';
import { PageTransition } from '@/components/PageTransition';
import { FadeIn } from '@/components/FadeIn';

export default function NotFound() {
  return (
    <PageTransition>
      <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
        <FadeIn delay={0.05}>
          <h2 className="text-2xl font-display font-bold uppercase">Not Found</h2>
        </FadeIn>
        <FadeIn delay={0.12}>
          <p className="text-sm text-dim">The page you're looking for doesn't exist.</p>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div className="flex items-center gap-4 mt-2">
            <Link href="/" className="text-sm underline underline-offset-4 hover:opacity-70 transition-opacity">
              Go Home
            </Link>
            <Link href="/work" className="text-sm underline underline-offset-4 hover:opacity-70 transition-opacity">
              Work
            </Link>
            <Link href="/blog" className="text-sm underline underline-offset-4 hover:opacity-70 transition-opacity">
              Blog
            </Link>
          </div>
        </FadeIn>
      </div>
    </PageTransition>
  );
}
