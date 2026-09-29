import { Card, CardContent } from "@/components/ui/card";
import { PlatformFeatureItem } from "./features-data";

interface FeatureItemProperties {
  featureData: PlatformFeatureItem;
}

export function FeatureItem({ featureData }: FeatureItemProperties) {
  const IconComponent = featureData.featureIconElement;

  return (
    <Card className="border-neutral-200 bg-white transition-all hover:border-neutral-300 hover:shadow-md">
      <CardContent className="flex items-start gap-4 p-5">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <IconComponent className="h-5 w-5" />
        </div>
        <div className="space-y-1">
          <h3 className="text-base font-semibold text-neutral-900">
            {featureData.featureTitle}
          </h3>
          <p className="text-sm leading-relaxed text-neutral-500">
            {featureData.featureDescription}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
