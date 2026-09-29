import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { JourneyMilestoneItem } from "./journey-data";

interface JourneyStepCardProperties {
  journeyMilestone: JourneyMilestoneItem;
}

export function JourneyStepCard({ journeyMilestone }: JourneyStepCardProperties) {
  const IconComponent = journeyMilestone.milestoneIconElement;

  return (
    <Card className="relative flex flex-col justify-between border-neutral-200 bg-white transition-all hover:shadow-md hover:border-blue-300">
      <CardContent className="flex flex-col space-y-3 p-5">
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="font-mono text-xs">
            Step 0{journeyMilestone.milestoneStepNumber}
          </Badge>
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
            <IconComponent className="h-4 w-4" />
          </div>
        </div>
        <h4 className="text-base font-bold text-neutral-900">
          {journeyMilestone.milestoneTitle}
        </h4>
        <p className="text-xs text-neutral-500 leading-relaxed">
          {journeyMilestone.milestoneDescription}
        </p>
      </CardContent>
    </Card>
  );
}
