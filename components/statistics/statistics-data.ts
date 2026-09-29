import { Users, FileQuestion, Award, Clock } from "@/components/icons";

export interface StatisticMetricItem {
  metricIdentifier: string;
  metricNumericValue: string;
  metricPrimaryLabel: string;
  metricDescriptionText: string;
  metricIconElement: React.ElementType;
}

export const platformStatisticMetrics: StatisticMetricItem[] = [
  {
    metricIdentifier: "active-aspirants",
    metricNumericValue: "50,000+",
    metricPrimaryLabel: "Active Aspirants",
    metricDescriptionText: "Preparing daily for competitive exams",
    metricIconElement: Users,
  },
  {
    metricIdentifier: "questions-practiced",
    metricNumericValue: "1,000,000+",
    metricPrimaryLabel: "Questions Solved",
    metricDescriptionText: "With comprehensive answer keys",
    metricIconElement: FileQuestion,
  },
  {
    metricIdentifier: "success-rate",
    metricNumericValue: "95%",
    metricPrimaryLabel: "Retention Rate",
    metricDescriptionText: "Report higher retention & speed",
    metricIconElement: Award,
  },
  {
    metricIdentifier: "exam-simulation",
    metricNumericValue: "100%",
    metricPrimaryLabel: "Exam Simulation",
    metricDescriptionText: "Accurate NTA CBT environment",
    metricIconElement: Clock,
  },
];
