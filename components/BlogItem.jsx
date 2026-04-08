import Link from 'next/link';

export function BlogItem({ date, title, description, link, slug }) {
  const href = slug ? `/blog/${slug}` : link;
  const isInternal = Boolean(slug);

  const inner = (
    <>
      <span className="font-mono text-[9px] text-dimmer uppercase tracking-widest transition-colors duration-500">{date}</span>
      <h3 className="text-sm font-semibold mb-0.5 tracking-tight uppercase transition-all duration-500 ease-out group-hover:translate-x-0.5">
        {title}
        <span className="inline-block ml-1.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out">→</span>
      </h3>
      <p className="text-[11px] text-dim leading-snug transition-colors duration-500">{description}</p>
    </>
  );

  const className = "flex flex-col gap-2 group no-underline border-l-2 border-transparent hover:border-current pl-3 transition-all duration-500 ease-out hover:pl-4";

  if (isInternal) {
    return (
      <Link href={href} className={className}>
        {inner}
      </Link>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {inner}
    </a>
  );
}
