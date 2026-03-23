import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <h2 className="text-2xl font-display font-bold uppercase">Not Found</h2>
      <p className="text-sm text-dim">The page you're looking for doesn't exist.</p>
      <Link href="/" className="text-sm text-white underline underline-offset-4 hover:opacity-70 transition-opacity">
        Go Home
      </Link>
    </div>
  );
}
