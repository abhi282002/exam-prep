import { SiteHeader } from "@/components/navigation/site-header";
import { HeroSection } from "@/components/hero/hero-section";
import { StatisticsSection } from "@/components/statistics/statistics-section";
import { FeaturedExamsSection } from "@/components/exams/featured-exams-section";
import { FeaturesSection } from "@/components/features/features-section";
import { StudyJourneySection } from "@/components/journey/study-journey-section";
import { CallToActionSection } from "@/components/cta/call-to-action-section";
import { SiteFooter } from "@/components/footer/site-footer";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-neutral-100 text-neutral-900">
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <StatisticsSection />
        <FeaturedExamsSection />
        <FeaturesSection />
        <StudyJourneySection />
        <CallToActionSection />
      </main>
      <SiteFooter />
    </div>
  );
}
