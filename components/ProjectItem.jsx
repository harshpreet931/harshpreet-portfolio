export function ProjectItem({ id, tech, title, description, link }) {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className="flex gap-4 group no-underline">
      <span className="font-mono text-[11px] text-dimmer pt-1">{id}</span>
      <div className="flex flex-col">
        <span className="text-[9px] font-mono text-dimmer uppercase mb-1">{tech}</span>
        <h3 className="text-sm font-semibold mb-1 uppercase tracking-tight transition-colors">{title}</h3>
        <p className="text-[11px] text-dim leading-snug">{description}</p>
      </div>
    </a>
  );
}
