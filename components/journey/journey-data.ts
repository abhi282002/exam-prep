import { BookOpen, BarChart3, Clock, TrendingUp, Trophy } from "@/components/icons";

export interface JourneyMilestoneItem {
  milestoneStepNumber: number;
  milestoneTitle: string;
  milestoneDescription: string;
  milestoneIconElement: React.ElementType;
}

export const examinationJourneyMilestones: JourneyMilestoneItem[] = [
  {
    milestoneStepNumber: 1,
    milestoneTitle: "Practice",
    milestoneDescription: "Begin with topic-wise and chapter-wise question sets.",
    milestoneIconElement: BookOpen,
  },
  {
    milestoneStepNumber: 2,
    milestoneTitle: "Analyze",
    milestoneDescription: "Review mistakes immediately with in-depth solutions.",
    milestoneIconElement: BarChart3,
  },
  {
    milestoneStepNumber: 3,
    milestoneTitle: "Take Mock Tests",
    milestoneDescription: "Sit for full 180-minute timed mock exams with autosave.",
    milestoneIconElement: Clock,
  },
  {
    milestoneStepNumber: 4,
    milestoneTitle: "Track Progress",
    milestoneDescription: "Monitor your percentile and speed improvement weekly.",
    milestoneIconElement: TrendingUp,
  },
  {
    milestoneStepNumber: 5,
    milestoneTitle: "Achieve Goals",
    milestoneDescription: "Enter the real exam hall with maximum confidence.",
    milestoneIconElement: Trophy,
  },
];
