import TerminalHero from '@/components/Home/TerminalHero';
import StatsSection from '@/components/Home/StatsSection';
import SkillsSection from '@/components/Home/SkillsSection';
import WorkSection from '@/components/Home/WorkSection';
import AboutSection from '@/components/Home/AboutSection';
import ContactSection from '@/components/Home/ContactSection';
import CommandPalette from '@/components/Home/CommandPalette';
import ScrollProgress from '@/components/Home/ScrollProgress';

export default function Home() {
  return (
    <div className="relative w-full">
      {/* warm + cool ambient wash + grain */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
        <div
          className="absolute -left-40 -top-40 h-[36rem] w-[36rem] rounded-full opacity-20 blur-[130px]"
          style={{ background: 'radial-gradient(circle, #c8791f, transparent 70%)' }}
        />
        <div
          className="absolute -right-40 bottom-10 h-[36rem] w-[36rem] rounded-full opacity-[0.15] blur-[130px]"
          style={{ background: 'radial-gradient(circle, #1793d1, transparent 70%)' }}
        />
        <div className="grain absolute inset-0" />
      </div>

      <ScrollProgress />
      <TerminalHero />
      <StatsSection />
      <WorkSection />
      <SkillsSection />
      <AboutSection />
      <ContactSection />
      <CommandPalette />
    </div>
  );
}
