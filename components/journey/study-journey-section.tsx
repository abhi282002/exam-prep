import { JourneyHeader } from "./journey-header";
import { examinationJourneyMilestones } from "./journey-data";
import { JourneyStepCard } from "./journey-step-card";

export function StudyJourneySection() {
  return (
    <section id="journey" className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        <JourneyHeader />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {examinationJourneyMilestones.map((individualMilestone) => (
            <JourneyStepCard
              key={individualMilestone.milestoneStepNumber}
              journeyMilestone={individualMilestone}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
