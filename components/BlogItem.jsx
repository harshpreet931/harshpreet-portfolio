export function BlogItem({ date, title, description, link }) {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className="flex flex-col gap-2 group no-underline">
      <span className="font-mono text-[9px] text-dimmer uppercase tracking-widest">{date}</span>
      <h3 className="text-sm font-semibold mb-0.5 tracking-tight uppercase group-hover:text-white transition-colors">{title}</h3>
      <p className="text-[11px] text-dim leading-snug">{description}</p>
    </a>
  );
}
