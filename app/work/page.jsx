import { EXPERIENCE_DATA } from '@/data/experience';
import { PROJECTS_DATA } from '@/data/projects';
import { ExperienceItem } from '@/components/ExperienceItem';
import { ProjectItem } from '@/components/ProjectItem';
import { PageTransition } from '@/components/PageTransition';
import { FadeIn } from '@/components/FadeIn';

export const metadata = {
  title: 'Work',
  description: 'Experience and selected projects by Harshpreet Singh: SDE Intern at Juspay, building agentic AI systems, Rust tools, and ML pipelines.',
  openGraph: {
    title: 'Work: Harshpreet Singh',
    description: 'Experience and selected projects by Harshpreet Singh.',
    url: 'https://harshpreet.com/work',
  },
  alternates: {
    canonical: 'https://harshpreet.com/work',
  },
};

export default function WorkPage() {
  return (
    <PageTransition>
      <div className="absolute inset-0 overflow-y-auto pr-4 scrollbar-hide">
        <div className="grid grid-cols-2 gap-12 w-full max-md:grid-cols-1 max-sm:gap-10 pb-20">
          <div className="flex flex-col gap-10">
            {EXPERIENCE_DATA.map((exp, idx) => (
              <FadeIn key={idx} delay={0.1 + idx * 0.08}>
                <ExperienceItem {...exp} />
              </FadeIn>
            ))}
          </div>

          <div className="flex flex-col gap-10">
            <FadeIn delay={0.05}>
              <span className="font-mono text-[9px] text-dimmer uppercase tracking-widest border-b border-dimmer/20 pb-2">Selected Works</span>
            </FadeIn>
            {PROJECTS_DATA.map((project, idx) => (
              <FadeIn key={idx} delay={0.15 + idx * 0.08}>
                <ProjectItem {...project} />
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
