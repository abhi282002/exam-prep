import { Timer, CheckSquare, BrainCircuit, BarChart2 } from "@/components/icons";

export interface PlatformFeatureItem {
  featureIdentifier: string;
  featureTitle: string;
  featureDescription: string;
  featureIconElement: React.ElementType;
}

export const platformFeaturesList: PlatformFeatureItem[] = [
  {
    featureIdentifier: "server-authoritative-timer",
    featureTitle: "Server-Controlled Timer",
    featureDescription: "Deadline managed strictly on the server to recreate high-stakes examination discipline.",
    featureIconElement: Timer,
  },
  {
    featureIdentifier: "question-palette-autosave",
    featureTitle: "Question Palette & Autosave",
    featureDescription: "Every response autosaves instantly with clear visited, answered, and review states.",
    featureIconElement: CheckSquare,
  },
  {
    featureIdentifier: "intelligent-extraction",
    featureTitle: "Smart PDF Extraction",
    featureDescription: "Admin uploads original question paper PDFs and answer keys for automatic parsing.",
    featureIconElement: BrainCircuit,
  },
  {
    featureIdentifier: "detailed-scorecard",
    featureTitle: "Granular Performance Review",
    featureDescription: "Get instant scores, negative marking calculations, and question-by-question explanations.",
    featureIconElement: BarChart2,
  },
];
