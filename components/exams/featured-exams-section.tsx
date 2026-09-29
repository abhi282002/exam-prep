import { FeaturedExamsHeader } from "./featured-exams-header";
import { featuredExaminationList } from "./featured-exams-data";
import { ExamItemCard } from "./exam-item-card";

export function FeaturedExamsSection() {
  return (
    <section id="exams" className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        <FeaturedExamsHeader />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredExaminationList.map((individualExamination) => (
            <ExamItemCard
              key={individualExamination.examinationIdentifier}
              examinationData={individualExamination}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
