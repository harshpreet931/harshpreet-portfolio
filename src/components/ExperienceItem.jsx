export function ExperienceItem({ date, role, description, tags }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="font-mono text-[9px] text-dimmer uppercase tracking-widest">{date}</span>
      <div className="flex flex-col">
        <h3 className="text-sm font-semibold mb-0.5 tracking-tight uppercase">{role}</h3>
        <p className="text-[11px] text-dim leading-snug mb-3">{description}</p>
        <div className="flex gap-2">
          {tags.map(tag => (
            <span key={tag} className="text-[9px] font-mono border border-dimmer/30 px-1.5 py-0.5 rounded text-dimmer uppercase">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
