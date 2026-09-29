import { ExamSetCard } from "./exam-set-card";

interface ExamSetListProperties {
  examinationSlug: string;
}

export function ExamSetList({ examinationSlug }: ExamSetListProperties) {
  const mockSetList = [
    { setIdentifier: "set-ugc-net-01", setTitle: "Demo Set 1: UGC NET 2026 Authentic Paper", questionQuantity: 50 },
    { setIdentifier: "set-ugc-net-02", setTitle: "Demo Set 2: High Yield Teaching Aptitude", questionQuantity: 50 },
    { setIdentifier: "set-ugc-net-03", setTitle: "Demo Set 3: Research Methodology & Higher Education", questionQuantity: 50 },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-neutral-900">Available Practice Sets ({examinationSlug})</h2>
        <span className="text-xs text-neutral-500">Select any set to start</span>
      </div>
      <div className="space-y-3">
        {mockSetList.map((individualSet) => (
          <ExamSetCard
            key={individualSet.setIdentifier}
            setIdentifier={individualSet.setIdentifier}
            setTitle={individualSet.setTitle}
            questionQuantity={individualSet.questionQuantity}
          />
        ))}
      </div>
    </div>
  );
}
